/**
 * API: Send Email
 * Handles sending transactional emails via Resend
 */

import { 
  sendOrderResumeEmail,
  sendPaymentFailedEmail,
  sendPaymentSuccessEmail,
  sendAbandonedCartEmail,
  sendMagicLinkEmail
} from '../lib/emailService.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { type, ...params } = req.body

    let result

    switch (type) {
      case 'order-resume':
        result = await sendOrderResumeEmail(params)
        break
      
      case 'payment-failed':
        result = await sendPaymentFailedEmail(params)
        break
      
      case 'payment-success':
      case 'receipt':
        result = await sendPaymentSuccessEmail(params)
        break
      
      case 'abandoned-cart':
        result = await sendAbandonedCartEmail(params)
        break
      
      case 'magic-link':
        result = await sendMagicLinkEmail(params)
        break
      
      default:
        return res.status(400).json({ error: 'Invalid email type' })
    }

    res.status(200).json({ success: true, emailId: result.id })
  } catch (error) {
    console.error('Send email error:', error)
    res.status(500).json({ error: error.message })
  }
}
