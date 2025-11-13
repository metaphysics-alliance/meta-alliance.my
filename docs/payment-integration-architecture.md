# Payment Integration Architecture

Complete payment system design for Meta Alliance subscription platform supporting Malaysian payment methods (Stripe, FPX, Touch 'n Go).

---

## 🎯 Payment Flow Overview

```
User Profile Complete → Service Selection → Subscription Creation → Payment Processing → Webhook Confirmation → Active Subscription
```

---

## 💳 Payment Providers Strategy

### Provider Matrix

| Provider | Payment Methods | Fee | Settlement | Priority |
|----------|----------------|-----|------------|----------|
| **Stripe** | • Credit/Debit Cards<br>• FPX (Online Banking) | 2.9% + RM1.50 | T+7 days | ⭐⭐⭐⭐⭐ |
| **Revenue Monster** | • Touch 'n Go eWallet<br>• GrabPay<br>• Boost | 2.5-3% | T+3 days | ⭐⭐⭐⭐ |
| **Billplz** (Backup) | • FPX<br>• Online Banking | 1.5% + RM1 | T+3 days | ⭐⭐⭐ |

### Recommendation: **Stripe Primary + Revenue Monster Secondary**

**Why Stripe First:**
- Supports both international cards AND FPX Malaysia
- Mature API with excellent docs
- Built-in subscription management
- Automatic retry logic for failed payments
- Strong fraud detection
- Single integration covers 80% of users

**Why Revenue Monster Second:**
- Best eWallet coverage in Malaysia
- TNG Digital is the #1 eWallet
- Lower fees than Stripe for local transactions
- Faster settlement

---

## 🏗️ Database Schema Extensions

### Add Payment Method Tracking

```sql
-- Add to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN default_payment_method text,
ADD COLUMN stripe_customer_id text,
ADD COLUMN rm_customer_id text;

-- Create payment methods table
CREATE TABLE public.payment_methods (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  provider text NOT NULL, -- 'stripe', 'revenue_monster'
  provider_payment_method_id text NOT NULL,
  type text NOT NULL, -- 'card', 'fpx', 'ewallet'
  last_four text,
  brand text, -- 'visa', 'mastercard', 'maybank', 'tng', etc.
  is_default boolean DEFAULT false,
  expires_at date,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT timezone('utc', now()),
  updated_at timestamptz DEFAULT timezone('utc', now())
);

CREATE INDEX payment_methods_user_idx ON public.payment_methods(user_id);
CREATE INDEX payment_methods_provider_idx ON public.payment_methods(provider_payment_method_id);

-- Enable RLS
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payment methods"
  ON public.payment_methods FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access payment methods"
  ON public.payment_methods FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

---

## 🔧 Supabase Edge Functions

### Function: `create-stripe-payment`

```typescript
// supabase/functions/create-stripe-payment/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@13.0.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

serve(async (req) => {
  try {
    const { userId, subscriptionId, paymentMethodType } = await req.json()
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    // Get or create Stripe customer
    let customerId = profile.stripe_customer_id
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile.email,
        name: profile.full_name,
        metadata: { supabase_user_id: userId },
      })
      
      customerId = customer.id
      
      await supabase
        .from('user_profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId)
    }
    
    // Get subscription details
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', subscriptionId)
      .single()
    
    // Create Stripe subscription or payment intent based on billing cycle
    if (subscription.billing_cycle === 'one-time') {
      // One-time payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(subscription.price_myr * 100), // Convert to cents
        currency: 'myr',
        customer: customerId,
        payment_method_types: [paymentMethodType], // 'card', 'fpx'
        metadata: {
          supabase_user_id: userId,
          subscription_id: subscriptionId,
        },
      })
      
      return new Response(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      // Recurring subscription
      const stripeSubscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price_data: {
            currency: 'myr',
            product_data: {
              name: subscription.service_name,
            },
            unit_amount: Math.round(subscription.price_myr * 100),
            recurring: {
              interval: subscription.billing_cycle === 'annual' ? 'year' : 'month',
            },
          },
        }],
        payment_settings: {
          payment_method_types: [paymentMethodType],
        },
        metadata: {
          supabase_user_id: userId,
          subscription_id: subscriptionId,
        },
      })
      
      // Update subscription with provider ID
      await supabase
        .from('subscriptions')
        .update({
          provider_subscription_id: stripeSubscription.id,
          status: 'active',
          current_period_start: new Date(stripeSubscription.current_period_start * 1000),
          current_period_end: new Date(stripeSubscription.current_period_end * 1000),
        })
        .eq('id', subscriptionId)
      
      return new Response(
        JSON.stringify({
          subscriptionId: stripeSubscription.id,
          clientSecret: stripeSubscription.latest_invoice.payment_intent.client_secret,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

### Function: `stripe-webhook`

Handles Stripe webhook events (payment success, subscription updates, etc.)

```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@13.0.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    )
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object
        
        // Record payment
        await supabase.from('subscription_payments').insert({
          subscription_id: paymentIntent.metadata.subscription_id,
          user_id: paymentIntent.metadata.supabase_user_id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency.toUpperCase(),
          payment_provider: 'stripe',
          provider_payment_id: paymentIntent.id,
          status: 'succeeded',
        })
        
        break
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        
        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status === 'active' ? 'active' : 'paused',
            current_period_start: new Date(subscription.current_period_start * 1000),
            current_period_end: new Date(subscription.current_period_end * 1000),
          })
          .eq('provider_subscription_id', subscription.id)
        
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        
        await supabase
          .from('subscriptions')
          .update({
            status: 'cancelled',
            cancelled_at: new Date(),
          })
          .eq('provider_subscription_id', subscription.id)
        
        break
      }
    }
    
    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

---

## 🎨 Frontend Payment Component

```typescript
// src/components/PaymentMethodSelector.tsx
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

type PaymentMethod = 'card' | 'fpx' | 'tng'

export default function PaymentMethodSelector({ 
  subscriptionId, 
  onSuccess 
}: { 
  subscriptionId: string
  onSuccess: () => void 
}) {
  const [method, setMethod] = useState<PaymentMethod>('card')
  
  return (
    <Elements stripe={stripePromise}>
      <div className="space-y-6">
        {/* Payment Method Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setMethod('card')}
            className={`flex-1 rounded-lg border-2 p-4 ${
              method === 'card' ? 'border-gold bg-gold/10' : 'border-white/20'
            }`}
          >
            💳 Card
          </button>
          <button
            onClick={() => setMethod('fpx')}
            className={`flex-1 rounded-lg border-2 p-4 ${
              method === 'fpx' ? 'border-gold bg-gold/10' : 'border-white/20'
            }`}
          >
            🏦 FPX
          </button>
          <button
            onClick={() => setMethod('tng')}
            className={`flex-1 rounded-lg border-2 p-4 ${
              method === 'tng' ? 'border-gold bg-gold/10' : 'border-white/20'
            }`}
          >
            📱 Touch 'n Go
          </button>
        </div>
        
        {/* Payment Form */}
        {method === 'card' && <CardPaymentForm subscriptionId={subscriptionId} onSuccess={onSuccess} />}
        {method === 'fpx' && <FPXPaymentForm subscriptionId={subscriptionId} onSuccess={onSuccess} />}
        {method === 'tng' && <TNGPaymentForm subscriptionId={subscriptionId} onSuccess={onSuccess} />}
      </div>
    </Elements>
  )
}
```

---

## 📦 Required Environment Variables

```bash
# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Revenue Monster
VITE_RM_MERCHANT_ID=...
RM_CLIENT_ID=...
RM_CLIENT_SECRET=...
RM_PRIVATE_KEY=...

# Supabase (existing)
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## ✅ Implementation Checklist

### Phase 1: Stripe Card Payments (Week 1)
- [ ] Install `@stripe/stripe-js` and `@stripe/react-stripe-js`
- [ ] Create Stripe account and get API keys
- [ ] Deploy `create-stripe-payment` Edge Function
- [ ] Deploy `stripe-webhook` Edge Function
- [ ] Build `PaymentMethodSelector` component
- [ ] Test card payment flow end-to-end

### Phase 2: FPX Integration (Week 2)
- [ ] Enable FPX in Stripe dashboard
- [ ] Update payment method selector
- [ ] Test with Malaysian bank accounts

### Phase 3: Touch 'n Go via Revenue Monster (Week 3)
- [ ] Sign up for Revenue Monster merchant account
- [ ] Create `create-rm-payment` Edge Function
- [ ] Create `rm-webhook` Edge Function
- [ ] Build TNG payment UI
- [ ] Test with TNG eWallet

### Phase 4: Subscription Management (Week 4)
- [ ] Build user dashboard
- [ ] Add pause/resume subscription
- [ ] Add cancel subscription
- [ ] Add update payment method
- [ ] Send email notifications

---

## 🐛 Testing Strategy

1. **Test Cards** (Stripe):
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0025 0000 3155`

2. **Test FPX** (Stripe Test Mode)
3. **Test TNG** (Revenue Monster Sandbox)

---

**Work ID**: MA-PAYMENT-INTEGRATION-ARCHITECTURE-2025-11-13T13:00:00+08:00
