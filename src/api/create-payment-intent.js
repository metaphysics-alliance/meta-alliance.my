/**
 * API: Create Stripe Payment Intent
 * This should be deployed as a serverless function or API route
 * For Vite: Use Vercel Serverless Functions or Netlify Functions
 */

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, currency, orderId, customerEmail, resumeToken } = req.body

    // Validate inputs
    if (!amount || !currency || !orderId || !customerEmail) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create payment intent (card payments)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      receipt_email: customerEmail,
      metadata: {
        order_id: orderId,
        customer_email: customerEmail,
        resume_token: resumeToken || '',
      },
      payment_method_types: ['card'],
    })

    // Return client secret
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Create payment intent error:', error)
    res.status(500).json({ error: error.message })
  }
}
