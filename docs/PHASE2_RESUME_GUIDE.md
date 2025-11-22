# Phase 2 Payment Integration - Resume Guide
**Last Updated:** 2025-11-14T14:48:34+08:00  
**Work ID:** MA-PHASE2-STRIPE-WEBHOOK-TODO-2025-11-14T14:48:34+08:00

---

## 📊 Current Progress: 95% Complete

### ✅ What's Already Done

#### 1. Database Infrastructure
- **guest_orders table**: Fully deployed with payment tracking fields
  - `payment_status` (pending/processing/succeeded/failed/cancelled/abandoned)
  - `payment_attempts`, `last_payment_attempt_at`
  - `payment_failure_reason`
  - `stripe_payment_intent_id`
  - `order_expires_at` (24-hour expiry)
  - `resume_token`, `resume_token_expires_at` (7-day recovery window)

- **SQL Functions Created:**
  - `generate_resume_token()` - Creates secure recovery tokens
  - `create_resume_token(order_id)` - Assigns token to order
  - `validate_resume_token(token)` - Verifies token validity
  - `get_resumable_order(email)` - Finds latest resumable order
  - `mark_abandoned_orders()` - Auto-marks expired orders (for cron)

#### 2. Payment Integration
- **Stripe SDK**: Installed and configured
  - `@stripe/stripe-js`, `@stripe/react-stripe-js`, `stripe`
  - Environment variables set (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET)

- **Payment Components:**
  - `StripePayment.jsx` - PaymentElement wrapper with 3D Secure support
  - `PaymentPage.jsx` - Complete checkout form with guest info collection
  - API endpoint: `/api/create-payment-intent` (creates Stripe payment intent)

#### 3. Email Service
- **Resend API**: Configured and ready
  - API key: `RESEND_API_KEY` in .env.local
  - Email templates designed:
    - Order Resume Email (with resume token link)
    - Payment Success Email (with magic link for account creation)
    - Payment Failed Email (with retry instructions)
    - Abandoned Cart Recovery Email

- **Email API Endpoint:**
  - `/api/send-email` - Handles all email types with template processing

#### 4. Checkout Flow Pages
- **CheckoutSuccessPage.jsx** - Payment confirmation with magic link CTA
- **CheckoutFailedPage.jsx** - Retry instructions and support links
- **CheckoutPendingPage.jsx** - For async payments (FPX/TNG)
- **ResumeOrderPage.jsx** - Validates resume tokens and restores orders

#### 5. Account Creation Flow
- **MagicLinkHandler.jsx** - Validates magic links, creates Supabase Auth accounts
- **ProfileCompletion.jsx** - 4-step onboarding wizard
  - Step 1: Basic info (pre-filled from order)
  - Step 2: Preferences (language, currency, timezone)
  - Step 3: Marketing consent
  - Step 4: Success & redirect to dashboard

---

## ⚠️ What's Remaining (5%)

### Critical Task: Stripe Webhook Implementation

**Why This Matters:**
- Without webhooks, payment status won't update automatically
- Users won't receive confirmation emails after successful payment
- Magic links won't be sent to create accounts
- Order recovery won't trigger for failed payments

**What Needs to Be Done:**

#### 1. Create Webhook Endpoint
**File:** `app/api/webhooks/stripe/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  
  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 })
  }

  // Handle events
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      
      // Update order status
      const { error: updateError } = await supabase
        .from('guest_orders')
        .update({
          payment_status: 'succeeded',
          payment_attempts: 1,
          last_payment_attempt_at: new Date().toISOString(),
          stripe_payment_intent_id: paymentIntent.id
        })
        .eq('id', paymentIntent.metadata.orderId)
      
      if (updateError) {
        console.error('Failed to update order:', updateError)
      } else {
        console.log(`✅ Order ${paymentIntent.metadata.orderId} marked as succeeded`)
        
        // Send success email with magic link
        // (This is already handled in PaymentPage.jsx onSuccess callback,
        //  but webhook provides backup in case client-side callback fails)
      }
      break

    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object as Stripe.PaymentIntent
      
      await supabase
        .from('guest_orders')
        .update({
          payment_status: 'failed',
          payment_attempts: 1,
          last_payment_attempt_at: new Date().toISOString(),
          payment_failure_reason: failedIntent.last_payment_error?.message || 'Payment declined'
        })
        .eq('id', failedIntent.metadata.orderId)
      
      // Send failure email with retry link
      // TODO: Call /api/send-email with type: 'payment-failed'
      
      console.log(`❌ Payment failed for order ${failedIntent.metadata.orderId}`)
      break

    case 'charge.refunded':
      const refund = event.data.object as Stripe.Charge
      
      await supabase
        .from('guest_orders')
        .update({
          payment_status: 'refunded',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', refund.payment_intent as string)
      
      console.log(`💸 Refund processed for payment intent ${refund.payment_intent}`)
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
```

#### 2. Test Webhook Locally
```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local dev server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# In another terminal, trigger test events
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
stripe trigger charge.refunded
```

#### 3. Configure Production Webhook
**Stripe Dashboard Steps:**
1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add Destination"
3. Select events to listen for:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`
4. Enter production endpoint:
   - URL: `https://meta-alliance.my/api/webhooks/stripe`
   - Description: "Meta Alliance Payment Webhooks"
5. Copy the signing secret → Save as `STRIPE_WEBHOOK_SECRET` in production .env

**⚠️ IMPORTANT:** You'll need TWO webhook secrets:
- One for local development (from `stripe listen`)
- One for production (from Stripe Dashboard)

---

## 🧪 Testing Checklist

### 1. Stripe Test Cards
```
✅ Successful Payment:
   4242 4242 4242 4242 (any future expiry, any CVC)

✅ 3D Secure Required:
   4000 0027 6000 3184 (triggers authentication flow)

❌ Card Declined:
   4000 0000 0000 0002 (payment fails)

💳 Other Scenarios:
   4000 0000 0000 9995 (insufficient funds)
   4000 0000 0000 0341 (fraud declined)
```

### 2. End-to-End Flow Test
- [ ] Add service to cart from /pricing
- [ ] Navigate to /pricing/checkout
- [ ] Verify cart items display correctly
- [ ] Click "Proceed to Payment"
- [ ] Fill in guest checkout form
  - [ ] Name, email, phone
  - [ ] Full billing address
  - [ ] Accept terms & conditions
- [ ] Select Stripe payment method
- [ ] Click "Proceed to Payment" → Stripe form appears
- [ ] Enter test card: 4242 4242 4242 4242
- [ ] Submit payment
- [ ] Verify webhook updates order status to "succeeded"
- [ ] Check email inbox for:
  - [ ] Payment confirmation email received
  - [ ] Magic link present in email
- [ ] Click magic link
- [ ] Verify account auto-created
- [ ] Complete profile wizard
- [ ] Redirect to dashboard

### 3. Resume Order Flow Test
- [ ] Start checkout but don't complete payment
- [ ] Close browser tab
- [ ] Wait 5 minutes
- [ ] Check email for resume token link
- [ ] Click resume link → /checkout/resume/{token}
- [ ] Verify form pre-filled with saved data
- [ ] Complete payment successfully

### 4. Failed Payment Recovery
- [ ] Use declined card (4000 0000 0000 0002)
- [ ] Submit payment
- [ ] Verify order status = "failed"
- [ ] Check email for failure notice with retry link
- [ ] Click retry link → returns to /checkout/payment
- [ ] Use successful card this time
- [ ] Verify payment completes

---

## 🔑 Environment Variables Required

### Local Development (.env.local)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # From `stripe listen`

# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@meta-alliance.my
EMAIL_REPLY_TO=support@meta-alliance.my
```

### Production (.env.production)
```env
# Same as above, but with LIVE keys:
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... # From Stripe Dashboard
RESEND_API_KEY=re_... # Production key
```

---

## 📂 File Structure Reference

```
meta-alliance-mvp/
├── app/
│   └── api/
│       ├── create-payment-intent/
│       │   └── route.ts ✅ (exists)
│       ├── send-email/
│       │   └── route.ts ✅ (exists)
│       └── webhooks/
│           └── stripe/
│               └── route.ts ❌ (TODO: create this)
│
├── src/
│   ├── components/
│   │   ├── StripePayment.jsx ✅
│   │   └── PricingCartContext.jsx ✅
│   ├── pages/
│   │   ├── PaymentPage.jsx ✅
│   │   ├── CheckoutSuccessPage.jsx ✅
│   │   ├── CheckoutFailedPage.jsx ✅
│   │   ├── CheckoutPendingPage.jsx ✅
│   │   ├── ResumeOrderPage.jsx ✅
│   │   ├── MagicLinkHandler.jsx ✅
│   │   └── ProfileCompletion.jsx ✅
│   └── services/
│       └── emailService.js ✅
│
├── supabase/
│   └── sql/
│       ├── guest_orders_payment_tracking.sql ✅ (deployed)
│       └── user_profiles_subscriptions.sql ✅ (deployed)
│
└── docs/
    ├── PHASE2_RESUME_GUIDE.md ✅ (this file)
    └── STRIPE_WEBHOOK_SETUP.md ✅ (exists)
```

---

## 🚀 How to Resume Work

### Step 1: Verify Environment
```bash
# Check .env.local has all keys
cat .env.local | grep "STRIPE\|RESEND"

# Should see:
# VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
# STRIPE_SECRET_KEY=sk_live_...
# STRIPE_WEBHOOK_SECRET=whsec_...
# RESEND_API_KEY=re_...
```

### Step 2: Create Webhook Endpoint
```bash
# Create the file
New-Item -Path "app\api\webhooks\stripe\route.ts" -ItemType File -Force

# Copy the webhook code from above section
# Test locally with Stripe CLI
```

### Step 3: Test Locally
```bash
# Terminal 1: Start dev servers
npm run dev

# Terminal 2: Forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Terminal 3: Trigger test events
stripe trigger payment_intent.succeeded
```

### Step 4: Verify Database Updates
```bash
# Check order status changed
node scripts/check-order-status.mjs {order_id}
```

### Step 5: Test End-to-End
1. Open http://localhost:5173/#/pricing
2. Add a service (e.g., "Essential Destiny Blueprint")
3. Go to checkout
4. Fill form, select Stripe
5. Use test card: 4242 4242 4242 4242
6. Submit → Watch webhook logs
7. Check email inbox for confirmation
8. Click magic link → verify account created

---

## 📞 Support Resources

### Documentation
- **Stripe Webhooks:** https://stripe.com/docs/webhooks
- **Stripe CLI:** https://stripe.com/docs/stripe-cli
- **Resend API:** https://resend.com/docs/send-with-nodejs
- **Supabase Functions:** https://supabase.com/docs/guides/database/functions

### Internal Files
- **PAYMENT_IMPLEMENTATION_PLAN.md** - Complete payment system blueprint
- **STRIPE_WEBHOOK_SETUP.md** - Webhook configuration guide
- **AGENTS.md** - Build rules and DB Admin super agent profile

### Database Scripts
```bash
# Test newsletter table
node scripts/check-newsletter-setup.mjs

# Test contact enquiries
node scripts/test-contact-enquiries.mjs

# Verify payment tracking schema
node scripts/verify-payment-schema.mjs
```

---

## ✅ Success Criteria

Phase 2 is considered complete when:

1. ✅ Stripe webhook endpoint exists at `/api/webhooks/stripe`
2. ✅ Webhook signature verification works
3. ✅ Payment success updates order status to "succeeded"
4. ✅ Payment failure updates status to "failed"
5. ✅ Success email with magic link sends automatically
6. ✅ Magic link creates Supabase Auth account
7. ✅ Profile completion wizard works end-to-end
8. ✅ Resume token emails deliver correctly
9. ✅ Resume links restore cart and pre-fill form
10. ✅ All test cards work (success, 3D Secure, declined)

---

## 🎯 Next Phase Preview (Phase 3)

After completing webhooks, Phase 3 will add:
- FPX integration (Malaysian online banking)
- Touch 'n Go E-Wallet support
- Recurring subscription billing
- User dashboard with payment history
- Admin panel for order management
- Abandoned cart email automation (cron job)

---

**Last Updated:** 2025-11-14T14:48:34+08:00  
**Ready to Resume:** User can start with webhook endpoint creation immediately  
**Estimated Time to Complete:** 30-45 minutes  
**Work ID:** MA-PHASE2-RESUME-GUIDE-2025-11-14T14:48:34+08:00
