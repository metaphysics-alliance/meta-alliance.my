/**
 * Email Service - Resend Integration
 * Handles sending transactional emails with HTML templates
 */

import { Resend } from 'resend'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Initialize Resend
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@meta-alliance.my'
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || 'sales@meta-alliance.my'

/**
 * Load HTML email template
 * @param {string} templateName - Template file name (without extension)
 * @returns {string} HTML template content
 */
function loadTemplate(templateName) {
  try {
    const templatePath = join(__dirname, '..', 'emails', 'templates', `${templateName}.html`)
    return readFileSync(templatePath, 'utf8')
  } catch (error) {
    console.error(`Failed to load email template ${templateName}:`, error)
    throw new Error(`Email template ${templateName} not found`)
  }
}

/**
 * Replace template variables with actual values
 * @param {string} template - HTML template string
 * @param {Object} variables - Key-value pairs to replace
 * @returns {string} Processed HTML
 */
function processTemplate(template, variables) {
  let processed = template
  
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g')
    processed = processed.replace(regex, value == null ? '' : String(value))
  }
  
  // Handle cart_items array (Handlebars-style loop)
  if (variables.cart_items && Array.isArray(variables.cart_items)) {
    const itemsHtml = variables.cart_items.map(item => `
      <div class="order-item">
        <span class="item-name">${item.name}</span>
        <span class="item-price">${item.currency} ${item.price}</span>
      </div>
    `).join('')
    
    processed = processed.replace(
      /{{#each cart_items}}[\s\S]*?{{\/each}}/g,
      itemsHtml
    )
  }

  // Handle generic items array for receipt template
  if (variables.items && Array.isArray(variables.items)) {
    const itemsHtml = variables.items.map(item => {
      const name = item.name || ''
      const description = item.shortDescription || item.description || ''
      const currency = variables.currency || item.currency || ''
      const price =
        item.price ?? item.priceFormatted ?? item.amount ?? ''

      return `
      <div class="order-item">
        <div class="item-details">
          <div class="item-name">${name}</div>
          <div class="item-description">${description}</div>
        </div>
        <div class="item-price">${currency} ${price}</div>
      </div>`
    }).join('')

    processed = processed.replace(
      /{{#each items}}[\s\S]*?{{\/each}}/g,
      itemsHtml
    )
  }
  
  return processed
}

/**
 * Send Order Resume Email
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.guestName - Customer name
 * @param {Array} params.cartItems - Order items
 * @param {string} params.currency - Currency code
 * @param {number} params.total - Total amount
 * @param {string} params.resumeUrl - Resume order URL with token
 * @returns {Promise<Object>} Resend response
 */
export async function sendOrderResumeEmail({ to, guestName, cartItems, currency, total, resumeUrl }) {
  if (!resend) {
    throw new Error('Resend not configured. Add RESEND_API_KEY to .env.local')
  }

  const template = loadTemplate('order-resume')
  const html = processTemplate(template, {
    guest_name: guestName,
    cart_items: cartItems,
    currency,
    total: total.toFixed(2),
    resume_url: resumeUrl,
  })

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      replyTo: EMAIL_REPLY_TO,
      subject: 'Complete Your Order - Metaphysics Alliance',
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error(error.message)
    }

    console.log('✅ Order resume email sent:', data.id)
    return data
  } catch (error) {
    console.error('Failed to send order resume email:', error)
    throw error
  }
}

/**
 * Send Payment Failed Email
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.guestName - Customer name
 * @param {string} params.failureReason - Reason for failure
 * @param {string} params.resumeUrl - Retry payment URL with token
 * @returns {Promise<Object>} Resend response
 */
export async function sendPaymentFailedEmail({ to, guestName, failureReason, resumeUrl }) {
  if (!resend) {
    throw new Error('Resend not configured')
  }

  const template = loadTemplate('payment-failed')
  const html = processTemplate(template, {
    guest_name: guestName,
    failure_reason: failureReason,
    resume_url: resumeUrl,
  })

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      replyTo: EMAIL_REPLY_TO,
      subject: 'Payment Failed - Retry Your Order - Metaphysics Alliance',
      html,
    })

    if (error) throw new Error(error.message)

    console.log('✅ Payment failed email sent:', data.id)
    return data
  } catch (error) {
    console.error('Failed to send payment failed email:', error)
    throw error
  }
}

/**
 * Send Payment Success Email (Receipt)
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.name - Customer name
 * @param {Array} params.items - Order items
 * @param {string} params.currency - Currency code
 * @param {number} params.amount - Total amount
 * @param {string} params.orderNumber - Order UUID
 * @param {string} params.paymentDate - Payment date string
 * @returns {Promise<Object>} Resend response
 */
export async function sendPaymentSuccessEmail({ 
  to, 
  name, 
  items, 
  currency, 
  amount, 
  orderNumber,
  paymentDate 
}) {
  if (!resend) {
    throw new Error('Resend not configured')
  }

  const template = loadTemplate('receipt')
  const html = processTemplate(template, {
    name,
    orderNumber,
    paymentDate,
    currency,
    amount: amount.toFixed(2),
    items,
  })

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      replyTo: EMAIL_REPLY_TO,
      subject: 'Payment Receipt - Metaphysics Alliance',
      html,
    })

    if (error) throw new Error(error.message)

    console.log('✅ Payment receipt email sent:', data.id)
    return data
  } catch (error) {
    console.error('Failed to send payment receipt email:', error)
    throw error
  }
}

/**
 * Send Account Welcome Email (credentials + login link)
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.name - Customer name
 * @param {string} params.loginEmail - Login email (username)
 * @param {string} params.tempPassword - Temporary password
 * @param {string} params.loginUrl - Login URL for the Tools portal
 * @returns {Promise<Object>} Resend response
 */
export async function sendAccountWelcomeEmail({
  to,
  name,
  loginEmail,
  tempPassword,
  loginUrl,
}) {
  if (!resend) {
    throw new Error('Resend not configured')
  }

  const template = loadTemplate('account-welcome')
  const html = processTemplate(template, {
    user_name: name,
    login_email: loginEmail,
    temp_password: tempPassword,
    login_url: loginUrl,
  })

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      replyTo: EMAIL_REPLY_TO,
      subject: 'Welcome to Metaphysics Alliance – Your Access Details',
      html,
    })

    if (error) throw new Error(error.message)

    console.log('? Account welcome email sent:', data.id)
    return data
  } catch (error) {
    console.error('Failed to send account welcome email:', error)
    throw error
  }
}

/**
 * Send Abandoned Cart Recovery Email
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.guestName - Customer name
 * @param {string} params.resumeUrl - Resume order URL
 * @param {string} params.cartSummary - Brief cart summary
 * @param {string} params.createdDate - Order creation date
 * @returns {Promise<Object>} Resend response
 */
export async function sendAbandonedCartEmail({ 
  to, 
  guestName, 
  resumeUrl, 
  cartSummary,
  createdDate 
}) {
  if (!resend) {
    throw new Error('Resend not configured')
  }

  // Use same template as order-resume but different subject
  const template = loadTemplate('order-resume')
  const html = processTemplate(template, {
    guest_name: guestName,
    cart_summary: cartSummary,
    created_date: createdDate,
    resume_url: resumeUrl,
  })

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      replyTo: EMAIL_REPLY_TO,
      subject: 'Your Order is Waiting - Metaphysics Alliance',
      html,
    })

    if (error) throw new Error(error.message)

    console.log('✅ Abandoned cart email sent:', data.id)
    return data
  } catch (error) {
    console.error('Failed to send abandoned cart email:', error)
    throw error
  }
}

/**
 * Send Magic Link Email for Account Creation
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.name - Customer name
 * @param {string} params.magicLink - Magic link URL with token
 * @returns {Promise<Object>} Resend response
 */
export async function sendMagicLinkEmail({ to, name, magicLink }) {
  if (!resend) {
    throw new Error('Resend not configured')
  }

  const template = loadTemplate('magic-link')
  const html = processTemplate(template, {
    guest_name: name,
    magicLink,
  })

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      replyTo: EMAIL_REPLY_TO,
      subject: 'Complete Your Account Setup - Metaphysics Alliance',
      html,
    })

    if (error) throw new Error(error.message)

    console.log('✅ Magic link email sent:', data.id)
    return data
  } catch (error) {
    console.error('Failed to send magic link email:', error)
    throw error
  }
}

export default {
  sendOrderResumeEmail,
  sendPaymentFailedEmail,
  sendPaymentSuccessEmail,
  sendAccountWelcomeEmail,
  sendAbandonedCartEmail,
  sendMagicLinkEmail,
}
