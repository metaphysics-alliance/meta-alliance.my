import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY

const stripe =
  stripeSecret &&
  new Stripe(stripeSecret, {
    apiVersion: '2023-10-16',
  })

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders as any })
}

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured (missing STRIPE_SECRET_KEY)' },
      { status: 500, headers: corsHeaders as any },
    )
  }

  try {
    const { amount, currency, orderId, customerEmail, resumeToken } = await req.json()

    if (!amount || !currency || !orderId || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: corsHeaders as any },
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: String(currency).toLowerCase(),
      receipt_email: customerEmail,
      metadata: {
        order_id: String(orderId),
        customer_email: customerEmail,
        resume_token: resumeToken ? String(resumeToken) : '',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json(
      {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
      { headers: corsHeaders as any },
    )
  } catch (error: any) {
    console.error('Create payment intent error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to create payment intent' },
      { status: 500, headers: corsHeaders as any },
    )
  }
}
