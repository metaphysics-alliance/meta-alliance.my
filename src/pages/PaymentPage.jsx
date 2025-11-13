/**
 * Payment Page - Guest checkout with payment processing
 * 
 * Flow:
 * 1. Guest fills in contact/address info
 * 2. Selects payment method (Stripe/FPX/TNG)
 * 3. Processes payment
 * 4. Redirects to success/pending/failed page
 */

import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCreditCard, FiDollarSign, FiSmartphone } from 'react-icons/fi'

import SectionDivider from '../components/SectionDivider.jsx'
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

  const [paymentMethod, setPaymentMethod] = useState('stripe') // stripe, fpx, tng
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCancelModal, setShowCancelModal] = useState(false)

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

      // TODO: Initialize payment with selected provider (Stripe/FPX/TNG)
      // TODO: Process payment
      // TODO: Generate magic link token
      // TODO: Send confirmation email
      
      // Temporary: Redirect to success page
      console.log('Processing payment:', { formData, paymentMethod, items, totals })
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      navigate('/checkout/success')
    } catch (err) {
      setError(err.message || (locale === 'CN' ? '付款失败' : 'Payment failed'))
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
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

      <form onSubmit={handleSubmit} className="mx-auto max-w-6xl">
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
                  <option value="" className="bg-[#0a1025]">{locale === 'CN' ? '选择州' : 'Select state'}</option>
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
                    ? '订阅我们的新闻简报以获取更新和优惠'
                    : 'Subscribe to our newsletter for updates and offers'}
                </span>
              </label>
            </div>

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
                type="submit"
                disabled={loading}
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
                    {loading
                      ? (locale === 'CN' ? '处理中...' : 'Processing...')
                      : (locale === 'CN' ? '立即付款' : 'Pay Now')}
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
                  ? '您的付款信息安全加密'
                  : 'Your payment information is securely encrypted'}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}
