/**
 * Payment Service - Stripe Integration
 * Handles payment intent creation, session management, and webhook processing
 */

import Stripe from 'stripe'

// Initialize Stripe (server-side only)
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  : null

/**
 * Create Stripe Payment Intent
 * @param {Object} params - Payment parameters
 * @param {number} params.amount - Amount in cents (MYR or USD)
 * @param {string} params.currency - Currency code (myr/usd)
 * @param {string} params.customerEmail - Customer email
 * @param {string} params.orderId - Guest order UUID
 * @param {Object} params.metadata - Additional metadata
 * @returns {Promise<Object>} Payment intent with client secret
 */
export async function createPaymentIntent({
  amount,
  currency = 'myr',
  customerEmail,
  orderId,
  metadata = {}
}) {
  if (!stripe) {
    throw new Error('Stripe not configured. Add STRIPE_SECRET_KEY to .env.local')
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      receipt_email: customerEmail,
      metadata: {
        order_id: orderId,
        customer_email: customerEmail,
        ...metadata
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status
    }
  } catch (error) {
    console.error('Stripe Payment Intent Error:', error)
    throw new Error(`Failed to create payment intent: ${error.message}`)
  }
}

/**
 * Retrieve Payment Intent Status
 * @param {string} paymentIntentId - Stripe payment intent ID
 * @returns {Promise<Object>} Payment intent details
 */
export async function getPaymentIntentStatus(paymentIntentId) {
  if (!stripe) {
    throw new Error('Stripe not configured')
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    
    return {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      customer_email: paymentIntent.receipt_email,
      metadata: paymentIntent.metadata
    }
  } catch (error) {
    console.error('Stripe Retrieve Error:', error)
    throw new Error(`Failed to retrieve payment intent: ${error.message}`)
  }
}

/**
 * Create Stripe Checkout Session (alternative to Payment Intent)
 * Better for hosted checkout page
 */
export async function createCheckoutSession({
  lineItems,
  customerEmail,
  orderId,
  successUrl,
  cancelUrl,
  metadata = {}
}) {
  if (!stripe) {
    throw new Error('Stripe not configured')
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'fpx'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: {
        order_id: orderId,
        ...metadata
      },
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
    })

    return {
      sessionId: session.id,
      checkoutUrl: session.url,
      expiresAt: session.expires_at
    }
  } catch (error) {
    console.error('Stripe Checkout Session Error:', error)
    throw new Error(`Failed to create checkout session: ${error.message}`)
  }
}

/**
 * Verify Stripe Webhook Signature
 * @param {string} payload - Raw request body
 * @param {string} signature - Stripe signature header
 * @returns {Object} Verified event object
 */
export function verifyWebhookSignature(payload, signature) {
  if (!stripe) {
    throw new Error('Stripe not configured')
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET not configured')
  }

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    return event
  } catch (error) {
    console.error('Webhook Signature Verification Failed:', error)
    throw new Error(`Webhook verification failed: ${error.message}`)
  }
}

/**
 * Handle Stripe Webhook Event
 * @param {Object} event - Stripe event object
 * @param {Function} onSuccess - Callback for successful payment
 * @param {Function} onFailure - Callback for failed payment
 */
export async function handleWebhookEvent(event, { onSuccess, onFailure }) {
  const { type, data } = event

  switch (type) {
    case 'payment_intent.succeeded':
      console.log('✅ Payment succeeded:', data.object.id)
      if (onSuccess) {
        await onSuccess({
          paymentIntentId: data.object.id,
          amount: data.object.amount / 100,
          currency: data.object.currency,
          customerEmail: data.object.receipt_email,
          orderId: data.object.metadata.order_id
        })
      }
      break

    case 'payment_intent.payment_failed':
      console.log('❌ Payment failed:', data.object.id)
      if (onFailure) {
        await onFailure({
          paymentIntentId: data.object.id,
          orderId: data.object.metadata.order_id,
          failureReason: data.object.last_payment_error?.message || 'Payment declined'
        })
      }
      break

    case 'payment_intent.canceled':
      console.log('🚫 Payment canceled:', data.object.id)
      break

    case 'checkout.session.completed':
      console.log('✅ Checkout session completed:', data.object.id)
      if (onSuccess) {
        await onSuccess({
          sessionId: data.object.id,
          customerEmail: data.object.customer_email,
          orderId: data.object.metadata.order_id
        })
      }
      break

    default:
      console.log('ℹ️ Unhandled webhook event:', type)
  }
}

export default {
  createPaymentIntent,
  getPaymentIntentStatus,
  createCheckoutSession,
  verifyWebhookSignature,
  handleWebhookEvent
}
