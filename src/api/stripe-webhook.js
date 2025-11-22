import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY);
const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET;

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  console.log('✅ Stripe webhook received:', event.type);

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;

    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;

    case 'charge.refunded':
      await handleRefund(event.data.object);
      break;

    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object);
      break;

    case 'customer.subscription.deleted':
      await handleSubscriptionCancelled(event.data.object);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}

// Handle successful payment
async function handlePaymentSuccess(paymentIntent) {
  console.log('💰 Payment succeeded:', paymentIntent.id);

  const { metadata } = paymentIntent;
  const { guest_email, guest_name, cart_items } = metadata;

  try {
    // 1. Create or update guest order
    const { data: guestOrder, error: guestError } = await supabase
      .from('guest_orders')
      .upsert({
        guest_email,
        guest_name,
        cart_items: JSON.parse(cart_items),
        total_amount_myr: paymentIntent.amount / 100, // Convert cents to MYR
        payment_status: 'succeeded',
        payment_provider: 'stripe',
        payment_provider_id: paymentIntent.id,
        magic_link_token: generateMagicToken(),
        magic_link_sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (guestError) throw guestError;

    // 2. Send magic link email
    await sendMagicLinkEmail(guestOrder);

    // 3. Send receipt email
    await sendReceiptEmail(guestOrder, paymentIntent);

    console.log('✅ Payment processed successfully for:', guest_email);
  } catch (error) {
    console.error('❌ Error processing payment success:', error);
  }
}

// Handle failed payment
async function handlePaymentFailed(paymentIntent) {
  console.log('❌ Payment failed:', paymentIntent.id);

  const { metadata } = paymentIntent;
  const { guest_email } = metadata;

  try {
    // Update guest order status
    await supabase
      .from('guest_orders')
      .update({
        payment_status: 'failed',
        payment_provider_id: paymentIntent.id,
      })
      .eq('guest_email', guest_email)
      .eq('payment_provider_id', paymentIntent.id);

    // Send failed payment email
    await sendPaymentFailedEmail(guest_email, paymentIntent);

    console.log('✅ Failed payment recorded for:', guest_email);
  } catch (error) {
    console.error('❌ Error processing payment failure:', error);
  }
}

// Handle refund
async function handleRefund(charge) {
  console.log('💸 Refund processed:', charge.id);

  try {
    // Find and update the payment record
    await supabase
      .from('subscription_payments')
      .update({
        status: 'refunded',
        refunded_at: new Date().toISOString(),
      })
      .eq('payment_provider_id', charge.payment_intent);

    console.log('✅ Refund recorded for charge:', charge.id);
  } catch (error) {
    console.error('❌ Error processing refund:', error);
  }
}

// Handle subscription created
async function handleSubscriptionCreated(subscription) {
  console.log('🔄 Subscription created:', subscription.id);

  try {
    // Create subscription record
    await supabase.from('subscriptions').insert({
      user_id: subscription.metadata.user_id,
      service_id: subscription.metadata.service_id,
      status: 'active',
      billing_cycle: subscription.items.data[0].price.recurring.interval,
      payment_provider: 'stripe',
      payment_provider_id: subscription.id,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    });

    console.log('✅ Subscription record created');
  } catch (error) {
    console.error('❌ Error creating subscription:', error);
  }
}

// Handle subscription cancellation
async function handleSubscriptionCancelled(subscription) {
  console.log('🚫 Subscription cancelled:', subscription.id);

  try {
    await supabase
      .from('subscriptions')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
      })
      .eq('payment_provider_id', subscription.id);

    console.log('✅ Subscription cancelled in database');
  } catch (error) {
    console.error('❌ Error cancelling subscription:', error);
  }
}

// Generate secure magic link token
function generateMagicToken() {
  return `ml_${Math.random().toString(36).substring(2, 15)}${Date.now().toString(36)}`;
}

// Send magic link email
async function sendMagicLinkEmail(guestOrder) {
  const magicLink = `https://master.meta-alliance.my/auth/magic/${guestOrder.magic_link_token}?email=${encodeURIComponent(guestOrder.guest_email)}`;

  // Call your email API
  const response = await fetch('/api/send-email.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: guestOrder.guest_email,
      subject: 'Complete Your Metaphysics Alliance Account Setup',
      type: 'magic-link',
      data: {
        name: guestOrder.guest_name,
        magicLink,
      },
    }),
  });

  if (!response.ok) {
    console.error('Failed to send magic link email');
  }
}

// Send receipt email
async function sendReceiptEmail(guestOrder, paymentIntent) {
  const response = await fetch('/api/send-email.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: guestOrder.guest_email,
      subject: 'Payment Confirmation - Metaphysics Alliance',
      type: 'receipt',
      data: {
        name: guestOrder.guest_name,
        orderNumber: guestOrder.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        items: guestOrder.cart_items,
        paymentDate: new Date().toLocaleDateString('en-MY'),
      },
    }),
  });

  if (!response.ok) {
    console.error('Failed to send receipt email');
  }
}

// Send payment failed email
async function sendPaymentFailedEmail(email, paymentIntent) {
  await fetch('/api/send-email.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: email,
      subject: 'Payment Failed - Action Required',
      type: 'payment-failed',
      data: {
        reason: paymentIntent.last_payment_error?.message || 'Payment declined',
        retryLink: 'https://meta-alliance.my/checkout/payment',
      },
    }),
  });
}
