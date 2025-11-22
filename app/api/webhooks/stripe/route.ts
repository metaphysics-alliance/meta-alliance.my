import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import {
  sendPaymentSuccessEmail,
  sendMagicLinkEmail,
} from '@/lib/emailService.js'

const stripeSecret = process.env.STRIPE_SECRET_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

const emailSendDelayMs = Number(process.env.EMAIL_SEND_DELAY_MS || '1000')

const stripe =
  stripeSecret &&
  new Stripe(stripeSecret, {
    apiVersion: '2023-10-16',
  })

const serverSupabase =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null

export async function POST(req: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe webhook not configured' },
      { status: 500 },
    )
  }

  if (!serverSupabase) {
    return NextResponse.json(
      { error: 'Supabase service role not configured' },
      { status: 500 },
    )
  }

  const sig = req.headers.get('stripe-signature')
  const rawBody = await req.text()

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err: any) {
    console.error('⚠️  Webhook signature verification failed:', err?.message || err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 },
    )
  }

  const obj: any = event.data?.object || {}
  const orderId =
    obj?.metadata?.order_id ||
    obj?.metadata?.orderId ||
    obj?.metadata?.order ||
    null
  const paymentIntentId =
    obj?.id || obj?.payment_intent || obj?.payment_intent_id || null
  const customerEmail = obj?.receipt_email || obj?.metadata?.customer_email || null

  try {
    if (event.type === 'payment_intent.succeeded') {
      if (orderId) {
        const magicToken = `magic_${Math.random().toString(36).slice(2)}${Date.now()}`
        const now = new Date().toISOString()

        // Update order and fetch details
        const { data: order, error: updateError } = await serverSupabase
          .from('guest_orders')
          .update({
            payment_status: 'succeeded',
            payment_attempts: 1,
            last_payment_attempt_at: now,
            payment_provider_id: paymentIntentId,
            magic_link_token: magicToken,
            magic_link_sent_at: now,
          })
          .eq('id', orderId)
          .select('id, guest_email, guest_name, cart_items, currency, total_myr, total_usd')
          .single()

        if (updateError || !order) {
          console.error('[stripe-webhook] failed to update order on success:', updateError)
        } else {
          // Send receipt
          try {
            const currency = order.currency || 'MYR'
            const amount = currency === 'USD' ? order.total_usd ?? 0 : order.total_myr ?? 0
            await sendPaymentSuccessEmail({
              to: order.guest_email,
              name: order.guest_name,
              items: order.cart_items || [],
              currency,
              amount,
              orderNumber: order.id,
              paymentDate: now,
            })
            console.log(
              `[stripe-webhook] receipt sent order=${order.id} to=${order.guest_email}`,
            )
          } catch (err) {
            console.error('[stripe-webhook] receipt email failed:', err)
          }

          // Small delay between emails to respect provider rate limits
          await new Promise((r) => setTimeout(r, emailSendDelayMs))

          // Send magic link with simple retry to handle rate limits
          const magicBase =
            process.env.MAGIC_LINK_APP_URL ||
            process.env.NEXT_PUBLIC_MAGIC_LINK_APP_URL ||
            process.env.VITE_MAGIC_LINK_APP_URL ||
            process.env.VITE_FRONTEND_APP_URL ||
            process.env.NEXT_PUBLIC_SITE_URL ||
            process.env.VERCEL_URL ||
            ''
          const magicLinkBase = magicBase.replace(/\/+$/, '') || 'http://localhost:5173'
          const magicLinkUrl = `${magicLinkBase}/auth/magic/${magicToken}`

          const sendMagic = async (attempt = 1) => {
            try {
              await sendMagicLinkEmail({
                to: order.guest_email,
                name: order.guest_name,
                magicLink: magicLinkUrl,
              })
              console.log(
                `[stripe-webhook] magic-link sent order=${order.id} to=${order.guest_email}`,
              )
            } catch (err: any) {
              const msg = err?.message || String(err)
              if (attempt === 1 && msg.toLowerCase().includes('too many requests')) {
                console.warn(
                  `[stripe-webhook] magic-link rate limited, retrying in 750ms (order=${order.id})`,
                )
                await new Promise((r) => setTimeout(r, Math.max(750, emailSendDelayMs)))
                return sendMagic(attempt + 1)
              }
              console.error('[stripe-webhook] magic-link email failed:', err)
            }
          }

          await sendMagic()
        }
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      if (orderId) {
        const failureReason = obj?.last_payment_error?.message || 'Payment failed'
        await serverSupabase
          .from('guest_orders')
          .update({
            payment_status: 'failed',
            last_payment_attempt_at: new Date().toISOString(),
            payment_provider_id: paymentIntentId,
            payment_failure_reason: failureReason,
          })
          .eq('id', orderId)
      }
    } else if (event.type === 'checkout.session.completed') {
      // Fallback: handle hosted checkout metadata
      if (orderId) {
        await serverSupabase
          .from('guest_orders')
          .update({
            payment_status: 'succeeded',
            last_payment_attempt_at: new Date().toISOString(),
            payment_provider_id: paymentIntentId || obj?.id || null,
          })
          .eq('id', orderId)
      }
    } else {
      // Unhandled event types are acknowledged
      console.log('ℹ️ Unhandled Stripe event type:', event.type)
    }
  } catch (err: any) {
    console.error('Webhook processing error:', err)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    )
  }

  return NextResponse.json({ received: true })
}
