/**
 * Payment Page - Guest checkout with payment processing
 *
 * Flow:
 * 1. Guest fills in contact/address info
 * 2. Selects payment method (Stripe/FPX/TNG)
 * 3. Processes payment
 * 4. Redirects to success/pending/failed page
 */

import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCreditCard, FiDollarSign, FiSmartphone } from 'react-icons/fi'

import SectionDivider from '../components/SectionDivider.jsx'
import StripePayment from '../components/StripePayment.jsx'
import { usePricingCart, summarizeTotals, formatTotalDisplay } from '../components/PricingCartContext.jsx'
import { useI18n } from '../i18n.jsx'
import { supabase } from '../lib/supabaseClient'
import dictAll from '../../shared/i18n/dictionary.js'

const MALAYSIAN_STATES = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Malacca',
  'Negeri Sembilan',
  'Pahang',
  'Penang',
  'Perak',
  'Perlis',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu',
  'Federal Territory of Kuala Lumpur',
  'Federal Territory of Labuan',
  'Federal Territory of Putrajaya',
]

export default function PaymentPage() {
  const { lang } = useI18n()
  const locale = lang === 'CN' ? 'CN' : 'EN'
  const navigate = useNavigate()
  const { items, clear } = usePricingCart()
  const totals = useMemo(() => summarizeTotals(items), [items])
  const apiBase = import.meta.env.VITE_API_BASE
    ? import.meta.env.VITE_API_BASE.replace(/\/+$/, '')
    : ''
  const apiUrl = (path) => `${apiBase}${path.startsWith('/') ? path : `/${path}`}`

  const [paymentMethod, setPaymentMethod] = useState('stripe') // stripe, fpx, tng
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showResumeNotice, setShowResumeNotice] = useState(false)
  const [resumingOrderId, setResumingOrderId] = useState(null)
  const [paymentClientSecret, setPaymentClientSecret] = useState(null)
  const [currentOrderId, setCurrentOrderId] = useState(null)
  const [showStripeForm, setShowStripeForm] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Malaysia',
    preferredLanguage: locale,
    preferredCurrency: 'MYR',
    newsletter: false,
    termsAccepted: false,
  })
  // Check for resumed order and pre-fill form
  useEffect(() => {
    const resumingData = sessionStorage.getItem('resuming_order')

    if (!resumingData) return

    const hydrateFromOrder = async () => {
      try {
        let order = JSON.parse(resumingData)

        // Fallback: fetch full order from Supabase if address fields are missing
        if (
          (!order.addressLine1 || !order.city || !order.state || !order.postcode) &&
          order.orderId
        ) {
          try {
            const { data: extra, error: extraError } = await supabase
              .from('guest_orders')
              .select(
                'address_line1, address_line2, city, state_province, postcode, country',
              )
              .eq('id', order.orderId)
              .single()

            if (!extraError && extra) {
              order = {
                ...order,
                addressLine1: extra.address_line1,
                addressLine2: extra.address_line2,
                city: extra.city,
                state: extra.state_province,
                postcode: extra.postcode,
                country: extra.country,
              }
            }
          } catch (extraErr) {
            console.warn('Failed to load full order for resume on payment page:', extraErr)
          }
        }

        setFormData((prev) => ({
          ...prev,
          fullName: order.name || prev.fullName,
          email: order.email || prev.email,
          phone: order.phone || prev.phone,
          addressLine1: order.addressLine1 || prev.addressLine1,
          addressLine2: order.addressLine2 || prev.addressLine2,
          city: order.city || prev.city,
          state: order.state || prev.state,
          postcode: order.postcode || prev.postcode,
          country: order.country || prev.country || 'Malaysia',
          preferredCurrency: order.currency || prev.preferredCurrency || 'MYR',
        }))

        setPaymentMethod(order.paymentMethod || 'stripe')
        setShowResumeNotice(true)
        setResumingOrderId(order.orderId)
      } catch (err) {
        console.error('Failed to hydrate resumed order on payment page:', err)
      } finally {
        // Clear after use so we don't reapply stale data
        sessionStorage.removeItem('resuming_order')
      }
    }

    void hydrateFromOrder()
  }, [])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError(locale === 'CN' ? '请输入姓名' : 'Please enter your full name')
      return false
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError(locale === 'CN' ? '请输入有效的电子邮件' : 'Please enter a valid email')
      return false
    }
    if (!formData.phone.trim()) {
      setError(locale === 'CN' ? '请输入电话号码' : 'Please enter your phone number')
      return false
    }
    if (!formData.addressLine1.trim()) {
      setError(locale === 'CN' ? '请输入地址' : 'Please enter your address')
      return false
    }
    if (!formData.city.trim()) {
      setError(locale === 'CN' ? '请输入城市' : 'Please enter your city')
      return false
    }
    if (!formData.state.trim()) {
      setError(locale === 'CN' ? '请选择州' : 'Please select your state')
      return false
    }
    if (!formData.postcode.trim()) {
      setError(locale === 'CN' ? '请输入邮编' : 'Please enter your postcode')
      return false
    }
    if (!formData.termsAccepted) {
      setError(locale === 'CN' ? '请接受服务条款' : 'Please accept the terms of service')
      return false
    }
    return true
  }

  const handleCancelOrder = () => {
    setShowCancelModal(true)
  }

  const confirmCancelOrder = async () => {
    try {
      // Clear the cart
      clear()
      // Small delay to ensure state updates
      await new Promise(resolve => setTimeout(resolve, 100))
      // Close modal
      setShowCancelModal(false)
      // Redirect to pricing
      navigate('/pricing')
    } catch (err) {
      console.error('Cancel order error:', err)
      setShowCancelModal(false)
      navigate('/pricing')
    }
  }

  const closeCancelModal = () => {
    setShowCancelModal(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError(null)
    setStatusMessage(null)

    try {
      // 1. Save newsletter opt-in (if checked)
      if (formData.newsletter) {
        await supabase
          .from('newsletter_subscriptions')
          .insert([
            {
              email: formData.email.toLowerCase().trim(),
              full_name: formData.fullName,
              source: 'checkout',
              preferred_language: locale,
              consent_given: true,
            }
          ])
          .select()
          // Ignore duplicate email errors
          .then(({ error }) => {
            if (error && error.code !== '23505') {
              console.warn('Newsletter subscription warning:', error)
            }
          })
      }

      // 2. Create guest order
      const { data: orderData, error: orderError } = await supabase
        .from('guest_orders')
        .insert([
          {
            guest_email: formData.email.toLowerCase().trim(),
            guest_name: formData.fullName,
            guest_phone: formData.phone,
            address_line1: formData.addressLine1,
            address_line2: formData.addressLine2,
            city: formData.city,
            state_province: formData.state,
            postcode: formData.postcode,
            country: formData.country,
            cart_items: items,
            total_myr: totals.find(t => t.currency === 'MYR')?.amount || 0,
            total_usd: totals.find(t => t.currency === 'USD')?.amount || 0,
            currency: formData.preferredCurrency,
            payment_method: paymentMethod,
            newsletter_opt_in: formData.newsletter,
          }
        ])
        .select()
        .single()

      if (orderError) throw orderError

      console.log('Guest order created:', orderData)

      // 3. Generate resume token for order recovery
      const { data: resumeTokenData, error: tokenError } = await supabase
        .rpc('create_resume_token', { order_id: orderData.id })

      if (tokenError) {
        console.warn('Resume token generation failed:', tokenError)
      } else {
        console.log('Resume token generated for order recovery')

        // Send order resume email with token (non-blocking)
        if (resumeTokenData) {
          const resumeUrl = `${window.location.origin}/checkout/resume/${resumeTokenData}`
          const preferredTotal =
            totals.find((t) => t.currency === formData.preferredCurrency)?.amount || 0

          try {
            await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'order-resume',
                to: formData.email,
                guestName: formData.fullName,
                cartItems: items,
                currency: formData.preferredCurrency,
                total: preferredTotal,
                resumeUrl,
              }),
            })
            console.log('📨 Resume email sent')
          } catch (emailError) {
            console.warn('Failed to send resume email:', emailError)
            // Don't block checkout if email fails
          }
        }
      }

      // 4. Update order with payment tracking fields
      await supabase
        .from('guest_orders')
        .update({
          payment_status: 'pending',
          payment_attempts: 0,
          order_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        })
        .eq('id', orderData.id)

      // Store order ID for payment processing
      setCurrentOrderId(orderData.id)

      // 5. Create payment intent based on selected method
      if (paymentMethod === 'stripe') {
        // Create Stripe payment intent via API
        const myrTotal = totals.find(t => t.currency === 'MYR' || t.currency === 'RM')
        const usdTotal = totals.find(t => t.currency === 'USD')
        const amount = formData.preferredCurrency === 'MYR'
          ? myrTotal?.amount || 0
          : usdTotal?.amount || 0

        try {
          const response = await fetch(apiUrl('/api/create-payment-intent'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount,
              currency: formData.preferredCurrency.toLowerCase(),
              orderId: orderData.id,
              customerEmail: formData.email,
              resumeToken: resumeTokenData
            })
          })

          if (!response.ok) {
            let details = null
            try {
              details = await response.json()
            } catch {
              // ignore
            }
            console.error('create-payment-intent failed:', response.status, details)
            throw new Error(details?.error || 'Failed to create payment intent')
          }

          const { clientSecret } = await response.json()
          setPaymentClientSecret(clientSecret)
          setShowStripeForm(true)
        } catch (paymentError) {
          console.error('Payment intent error:', paymentError)
          setError(locale === 'CN' ? '无法初始化付款' : 'Unable to initialize payment')
          setLoading(false)
          const message =
            paymentError && paymentError.message
              ? paymentError.message
              : String(paymentError || 'Unknown error')
          const prefix =
            locale === 'CN'
              ? '无法初始化付款: '
              : 'Unable to initialize payment: '
          setError(prefix + message)
          return
        }
      } else {
        // For FPX/TNG: redirect to external payment page (TODO)
        setError(locale === 'CN'
          ? '此付款方式即将上线'
          : 'This payment method is coming soon')
        setLoading(false)
        return
      }

      setLoading(false)
    } catch (err) {
      setError(err.message || (locale === 'CN' ? '创建订单失败' : 'Failed to create order'))
      setLoading(false)
    }
  }
  const handlePaymentSuccess = async (paymentIntent) => {
    console.log('Payment succeeded:', paymentIntent)

    try {
      // Update order status
      await supabase
        .from('guest_orders')
        .update({
          payment_status: 'succeeded',
          payment_attempts: 1,
          last_payment_attempt_at: new Date().toISOString(),
          payment_provider_id: paymentIntent.id,
        })
        .eq('id', currentOrderId)

      // Send success email
      try {
        const magicLinkUrl = `${window.location.origin}/auth/magic-link?order_id=${currentOrderId}`
        await fetch(apiUrl('/api/send-email'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'payment-success',
            to: formData.email,
            guestName: formData.fullName,
            cartItems: items,
            currency: formData.preferredCurrency,
            total: totals.find(t => t.currency === formData.preferredCurrency)?.amount || 0,
            orderId: currentOrderId,
            magicLinkUrl
          })
        })
        console.log('✅ Success email sent')
      } catch (emailError) {
        console.warn('Failed to send success email:', emailError)
      }

      // Clear cart
      clear()

      // Show short success status before redirect
      setStatusMessage(
        locale === 'CN'
          ? '支付成功，正在跳转确认页。'
          : 'Payment successful, redirecting to confirmation.',
      )

      // Redirect to success page after a brief delay
      setTimeout(() => {
        navigate(`/checkout/success?order_id=${currentOrderId}`)
      }, 1000)
    } catch (err) {
      console.error('Failed to update order status:', err)
      setError(locale === 'CN' ? '支付成功但更新订单失败' : 'Payment succeeded but order update failed')
    }
  }

  const handlePaymentSuccessV2 = async (paymentIntent) => {
    console.log('Payment succeeded (V2):', paymentIntent)

    try {
      const magicToken = `magic_${Math.random().toString(36).slice(2)}${Date.now()}`

      await supabase
        .from('guest_orders')
        .update({
          payment_status: 'succeeded',
          payment_attempts: 1,
          last_payment_attempt_at: new Date().toISOString(),
          payment_provider_id: paymentIntent.id,
          magic_link_token: magicToken,
          magic_link_sent_at: new Date().toISOString(),
        })
        .eq('id', currentOrderId)

      try {
        await fetch(apiUrl('/api/send-email'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'payment-success',
            to: formData.email,
            guestName: formData.fullName,
            cartItems: items,
            currency: formData.preferredCurrency,
            total:
              totals.find(
                (t) => t.currency === formData.preferredCurrency,
              )?.amount || 0,
            orderId: currentOrderId,
            paymentDate: new Date().toISOString(),
          }),
        })
        console.log('✅ Receipt email sent')
      } catch (emailError) {
        console.warn('Failed to send receipt email:', emailError)
      }

      // Magic link email now handled via Stripe webhook to avoid double-send/rate limits

      // Clear cart in context and storage so badge + items reset
      try {
        clear()
        if (typeof window !== 'undefined') {
          const keys = ['EN', 'CN']
          for (const k of keys) {
            window.localStorage.removeItem(`ma-pricing-cart-${k}`)
          }
          window.dispatchEvent(new Event('cart-updated'))
        }
      } catch (clearErr) {
        console.warn('Failed to fully clear pricing cart after payment:', clearErr)
      }

      setStatusMessage(
        locale === 'CN'
          ? '支付成功，正在跳转确认页'
          : 'Payment successful, redirecting to confirmation.',
      )

      setTimeout(() => {
        navigate(`/checkout/success?order_id=${currentOrderId}`)
      }, 1000)
    } catch (err) {
      console.error('Failed to update order status (V2):', err)
      setError(
        locale === 'CN'
          ? '支付成功但更新订单失败'
          : 'Payment succeeded but order update failed',
      )
    }
  }

  const handlePaymentError = async (error) => {
    console.error('Payment failed:', error)

    try {
      // Update order with failure info
      await supabase
        .from('guest_orders')
        .update({
          payment_status: 'failed',
          payment_attempts: 1,
          last_payment_attempt_at: new Date().toISOString(),
          payment_failure_reason: error.message
        })
        .eq('id', currentOrderId)

      const message = error && error.message ? error.message : 'Unknown error'
      setError(
        locale === 'CN'
          ? `支付失败: ${message}`
          : `Payment failed: ${message}`,
      )
    } catch (err) {
      console.error('Failed to update order failure:', err)
    }

    setLoading(false)
  }

  if (items.length === 0 && !currentOrderId) {
    navigate('/pricing')
    return null
  }
  return (
    <>
      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-white/20 bg-gradient-to-br from-[#0b1129] to-[#1a1f3a] p-8 shadow-2xl">
            <h3 className="mb-4 text-2xl font-bold text-white">
              {locale === 'CN' ? '取消订单' : 'Cancel Order'}
            </h3>
            <p className="mb-8 text-white/80">
              {locale === 'CN'
                ? '确定要取消订单并清空购物车吗？此操作无法撤销。'
                : 'Are you sure you want to cancel this order and clear your cart? This action cannot be undone.'}
            </p>
            <div className="flex gap-4">
              <button
                onClick={closeCancelModal}
                className="flex-1 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white"
              >
                {locale === 'CN' ? '返回' : 'Go Back'}
              </button>
              <button
                onClick={confirmCancelOrder}
                className="flex-1 rounded-full border border-red-400/50 bg-gradient-to-br from-red-600 to-red-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
              >
                {locale === 'CN' ? '确认取消' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-16 text-white">
        {/* Header */}
        <header className="mb-12 text-center">
        <Link
          to="/pricing/checkout"
          className="mb-4 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <FiArrowLeft />
          {locale === 'CN' ? '返回购物车' : 'Back to cart'}
        </Link>
        <h1 className="text-4xl font-semibold">
          {locale === 'CN' ? '完成您的订单' : 'Complete Your Order'}
        </h1>
        <p className="mt-2 text-white/70">
          {locale === 'CN'
            ? '填写您的信息并选择付款方式'
            : 'Fill in your details and choose a payment method'}
        </p>
      </header>

      {/* Identity / Account section */}
      <div className="mx-auto mb-8 max-w-6xl">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
          <p className="mb-2">
            {locale === 'CN'
              ? '如果您愿意，可以在付款前先登录/注册，以便订单自动关联到账户（支持 Google、Facebook、Apple ID、邮箱）。'
              : 'If you prefer, you can sign in or sign up (Google, Facebook, Apple ID, or email) before paying so your order is linked to your account.'}
          </p>
          <Link
            to={`/auth?redirect=${encodeURIComponent('/checkout/payment')}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-amber-300 px-4 py-2 text-xs font-semibold text-black shadow-sm hover:shadow-lg"
          >
            {locale === 'CN' ? '登录 / 注册' : 'Sign in / Sign up'}
          </Link>
        </section>
      </div>

      {/* Resume Order Notice */}
      {showResumeNotice && (
        <div className="mx-auto mb-8 max-w-6xl">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">✅</div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-emerald-400">
                  {locale === 'CN' ? '已恢复订单' : 'Order Restored'}
                </h3>
                <p className="text-white/80">
                  {locale === 'CN'
                    ? '我们已恢复您之前的订单，请确认信息后继续付款。'
                    : "We've restored your previous order. Please verify your details and continue to payment."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Left Column: Form */}
          <div className="space-y-8">
            {/* Contact Information */}
            <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <h2 className="text-xl font-semibold">
                {locale === 'CN' ? '联系信息' : 'Contact Information'}
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    {locale === 'CN' ? '全名' : 'Full Name'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                    placeholder={locale === 'CN' ? '输入您的全名' : 'Enter your full name'}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    {locale === 'CN' ? '电子邮件' : 'Email'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                    placeholder={locale === 'CN' ? '您的电子邮件' : 'your@email.com'}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  {locale === 'CN' ? '电话号码' : 'Phone Number'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  placeholder="+60 12-345 6789"
                />
              </div>
            </section>

            {/* Billing Address */}
            <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <h2 className="text-xl font-semibold">
                {locale === 'CN' ? '账单地址' : 'Billing Address'}
              </h2>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  {locale === 'CN' ? '地址第一行' : 'Address Line 1'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) => handleChange('addressLine1', e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  placeholder={locale === 'CN' ? '街道地址' : 'Street address'}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  {locale === 'CN' ? '地址第二行' : 'Address Line 2'}
                </label>
                <input
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) => handleChange('addressLine2', e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  placeholder={locale === 'CN' ? '单元/楼层（可选）' : 'Apt, suite, etc. (optional)'}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    {locale === 'CN' ? '城市' : 'City'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    {locale === 'CN' ? '邮编' : 'Postcode'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.postcode}
                    onChange={(e) => handleChange('postcode', e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  {locale === 'CN' ? '州' : 'State'} <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                >
                  <option value="" className="bg-[#0a1025]">{locale === 'CN' ? '请选择州' : 'Select state'}</option>
                  {MALAYSIAN_STATES.map(state => (
                    <option key={state} value={state} className="bg-[#0a1025]">{state}</option>
                  ))}
                </select>
              </div>
            </section>
            {/* Payment Method */}
            <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <h2 className="text-xl font-semibold">
                {locale === 'CN' ? '付款方式' : 'Payment Method'}
              </h2>

              <div className="grid gap-3 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition ${
                    paymentMethod === 'stripe'
                      ? 'border-gold bg-gold/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <FiCreditCard className="h-8 w-8" />
                  <span className="text-sm font-medium">
                    {locale === 'CN' ? '信用卡/借记卡' : 'Credit/Debit Card'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('fpx')}
                  className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition ${
                    paymentMethod === 'fpx'
                      ? 'border-gold bg-gold/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <FiDollarSign className="h-8 w-8" />
                  <span className="text-sm font-medium">
                    {locale === 'CN' ? 'FPX 网上银行' : 'FPX Online Banking'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('tng')}
                  className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition ${
                    paymentMethod === 'tng'
                      ? 'border-gold bg-gold/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <FiSmartphone className="h-8 w-8" />
                  <span className="text-sm font-medium">Touch 'n Go</span>
                </button>
              </div>
            </section>

            {/* Terms */}
            <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-white/10 text-gold focus:ring-gold"
                />
                <span className="text-sm text-white/80">
                  {locale === 'CN' ? (
                    <>我同意 <Link to="/legal/terms" className="text-gold hover:underline">服务条款</Link> 和 <Link to="/legal/privacy" className="text-gold hover:underline">隐私政策</Link></>
                  ) : (
                    <>I agree to the <Link to="/legal/terms" className="text-gold hover:underline">Terms of Service</Link> and <Link to="/legal/privacy" className="text-gold hover:underline">Privacy Policy</Link></>
                  )}
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => handleChange('newsletter', e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-white/10 text-gold focus:ring-gold"
                />
                <span className="text-sm text-white/80">
                  {locale === 'CN'
                    ? '订阅邮件，获取最新更新与优惠'
                    : 'Subscribe to our newsletter for updates and offers'}
                </span>
              </label>
            </div>

            {/* Stripe Payment Form */}
            {showStripeForm && paymentClientSecret && (
              <section className="space-y-4 rounded-3xl border border-emerald-500/30 bg-white/5 p-6 shadow-2xl">
                <h2 className="mb-6 text-xl font-semibold">
                  {locale === 'CN' ? '完成付款' : 'Complete Payment'}
                </h2>
                <StripePayment
                  clientSecret={paymentClientSecret}
                  amount={totals.find(t => t.currency === formData.preferredCurrency)?.amount || 0}
                  currency={formData.preferredCurrency}
                  orderId={currentOrderId}
                  onSuccess={handlePaymentSuccessV2}
                  onError={handlePaymentError}
                  locale={locale}
                />

                {statusMessage && !error && (
                  <div className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 p-4 text-emerald-300">
                    {statusMessage}
                  </div>
                )}
              </section>
            )}

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-300">
                {error}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <div className="sticky top-8 space-y-6 rounded-3xl border border-white/10 bg-[#0b1129]/90 p-6 shadow-2xl">
              <h2 className="text-xl font-semibold">
                {locale === 'CN' ? '订单摘要' : 'Order Summary'}
              </h2>

              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-white/80">{item.name}</span>
                    <span className="font-semibold text-gold">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4">
                {totals.map(total => (
                  <div key={total.currency} className="flex items-center justify-between text-lg">
                    <span className="font-semibold text-white">Total ({total.currency})</span>
                    <span className="font-bold text-gold">
                      {formatTotalDisplay(total.currency, total.amount, locale)}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button" onClick={handleSubmit}
                disabled={loading || showStripeForm}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-400 px-6 py-4 text-base font-bold text-black shadow-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Glow effects */}
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/70 via-teal-300/70 to-cyan-400/70 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />
                <span className="absolute inset-0 scale-95 rounded-xl border border-emerald-300/40 transition-all duration-300 group-hover:scale-100 group-hover:border-emerald-200/60" />
                <span
                  className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-50"
                  style={{ boxShadow: '0 0 50px 12px rgba(16,185,129,0.35)' }}
                />

                {/* Content */}
                <span className="relative z-10 inline-flex items-center justify-center gap-2 tracking-[0.14em] text-black group-hover:text-white">
                  <span className="tracking-normal">
                    {showStripeForm
                      ? (locale === 'CN' ? '请先完成上方支付表单' : 'Complete payment form above')
                      : loading
                      ? (locale === 'CN' ? '处理中...' : 'Processing...')
                      : (locale === 'CN' ? '继续付款' : 'Proceed to Payment')}
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={handleCancelOrder}
                disabled={loading}
                className="w-full rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
              >
                {locale === 'CN' ? '取消订单' : 'Cancel Order'}
              </button>

              <p className="text-center text-xs text-white/50">
                {locale === 'CN'
                  ? '您的支付信息已加密传输'
                  : 'Your payment information is securely encrypted'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
