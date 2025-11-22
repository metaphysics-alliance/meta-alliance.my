import { NextResponse } from 'next/server'
import {
  sendOrderResumeEmail,
  sendPaymentFailedEmail,
  sendPaymentSuccessEmail,
  sendAccountWelcomeEmail,
  sendAbandonedCartEmail,
  sendMagicLinkEmail,
} from '@/lib/emailService.js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders as any })
}

export async function POST(req: Request) {
  let emailType: string | undefined
  let emailTo: string | undefined

  try {
    const { type, ...params } = await req.json()
    emailType = type
    emailTo = (params as any)?.to

    console.log(
      `[send-email] incoming type=${emailType || 'unknown'} to=${emailTo || 'unknown'}`,
    )

    if (!type) {
      return NextResponse.json(
        { error: 'Missing email type' },
        { status: 400, headers: corsHeaders as any },
      )
    }

    let result

    switch (type) {
      case 'order-resume': {
        result = await sendOrderResumeEmail(params)
        break
      }

      case 'payment-failed': {
        result = await sendPaymentFailedEmail(params)
        break
      }

      case 'account-welcome': {
        const { to, name, loginEmail, tempPassword, loginUrl } = params
        result = await sendAccountWelcomeEmail({
          to,
          name,
          loginEmail,
          tempPassword,
          loginUrl,
        })
        break
      }

      case 'payment-success':
      case 'receipt': {
        // Map generic params from checkout to receipt-specific fields
        const {
          to,
          guestName,
          cartItems,
          currency,
          total,
          orderId,
          paymentDate,
        } = params

        result = await sendPaymentSuccessEmail({
          to,
          name: guestName,
          items: cartItems,
          currency,
          amount: total,
          orderNumber: orderId,
          paymentDate: paymentDate || new Date().toISOString(),
        })
        break
      }

      case 'abandoned-cart': {
        result = await sendAbandonedCartEmail(params)
        break
      }

      case 'magic-link': {
        const { to, name, magicLink } = params
        result = await sendMagicLinkEmail({ to, name, magicLink })
        break
      }

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400, headers: corsHeaders as any },
        )
    }

    const emailId = (result as any)?.id ?? null
    console.log(
      `[send-email] success type=${emailType || 'unknown'} to=${
        emailTo || 'unknown'
      } id=${emailId || 'null'}`,
    )

    return NextResponse.json(
      { success: true, emailId },
      { headers: corsHeaders as any },
    )
  } catch (error: any) {
    console.error(
      `[send-email] error type=${emailType || 'unknown'} to=${emailTo || 'unknown'}`,
      error,
    )
    return NextResponse.json(
      { error: error?.message || 'Failed to send email' },
      { status: 500, headers: corsHeaders as any },
    )
  }
}
