/**
 * Resume Order Page
 * Validates resume token and restores abandoned/failed orders
 * Route: /checkout/resume/:token
 */

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { usePricingCart } from '../components/PricingCartContext'
import { useI18n } from '../i18n'

export default function ResumeOrderPage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { setItems } = usePricingCart()
  const { lang } = useI18n()
  const locale = lang === 'CN' ? 'CN' : 'EN'

  const [status, setStatus] = useState('validating') // validating, loading, success, expired, error
  const [orderData, setOrderData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (token) {
      resumeOrder()
    }
  }, [token])

  async function resumeOrder() {
    try {
      setStatus('validating')

      const { data, error } = await supabase
        .rpc('validate_resume_token', { token })

      if (error) throw error

      if (!data || data.length === 0) {
        setStatus('expired')
        return
      }

      // Base order from RPC
      const baseOrder = data[0]

      // Try to fetch full address details from guest_orders (RLS allows by resume_token)
      let order = baseOrder
      try {
        const { data: extra, error: extraError } = await supabase
          .from('guest_orders')
          .select(
            'address_line1, address_line2, city, state_province, postcode, country',
          )
          .eq('id', baseOrder.id)
          .single()

        if (!extraError && extra) {
          order = { ...baseOrder, ...extra }
        }
      } catch (extraErr) {
        console.warn('Failed to load full order details for resume:', extraErr)
      }

      setOrderData(order)
      setStatus('loading')

      // Restore cart items
      setItems(order.cart_items || [])

      // Store order data in sessionStorage for payment form pre-fill
      sessionStorage.setItem(
        'resuming_order',
        JSON.stringify({
          orderId: order.id,
          email: order.guest_email,
          name: order.guest_name,
          phone: order.guest_phone,
          addressLine1: order.address_line1,
          addressLine2: order.address_line2,
          city: order.city,
          state: order.state_province,
          postcode: order.postcode,
          country: order.country,
          paymentMethod: order.payment_method || 'stripe',
          currency: order.currency || 'MYR',
          paymentStatus: order.payment_status,
        }),
      )

      setStatus('success')

      // Redirect to payment page after a short delay
      setTimeout(() => {
        navigate('/checkout/payment')
      }, 2000)
    } catch (err) {
      console.error('Resume order error:', err)
      setError(err.message)
      setStatus('error')
    }
  }

  const renderOrderSummary = () => {
    if (!orderData) return null

    const amount =
      orderData.currency === 'MYR'
        ? orderData.total_myr
        : orderData.total_usd

    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
        <h2 className="mb-3 text-lg font-semibold text-white/90">
          {locale === 'CN' ? '订单摘要' : 'Order Summary'}
        </h2>
        <div className="space-y-2 text-sm text-white/80">
          <div className="font-medium">{orderData.guest_name}</div>
          <div className="text-white/70">{orderData.guest_email}</div>
          <div className="mt-3 text-white/60">
            {locale === 'CN' ? '总额' : 'Total'}:
          </div>
          <div className="text-lg font-semibold text-gold">
            {orderData.currency}{' '}
            {typeof amount === 'number' ? amount.toFixed(2) : '0.00'}
          </div>
        </div>
      </div>
    )
  }

  // VALIDATING
  if (status === 'validating') {
    return (
      <div className="container mx-auto px-4 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <div className="mb-6 inline-block h-16 w-16 animate-spin rounded-full border-4 border-gold border-t-transparent" />
          <h1 className="mb-3 text-2xl font-semibold">
            {locale === 'CN' ? '正在验证订单...' : 'Validating your order...'}
          </h1>
          <p className="text-white/70">
            {locale === 'CN'
              ? '请稍候，我们正在确认您的恢复链接。'
              : 'Please hold while we confirm your secure resume link.'}
          </p>
        </div>
      </div>
    )
  }

  // LOADING / SUCCESS (RESTORED)
  if (status === 'loading' || status === 'success') {
    return (
      <div className="container mx-auto px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-8 text-center shadow-2xl">
            <div className="mb-4 text-5xl">✨</div>
            <h1 className="mb-3 text-3xl font-bold">
              {locale === 'CN' ? '订单已恢复！' : 'Order Restored!'}
            </h1>
            <p className="text-white/80">
              {locale === 'CN'
                ? '我们已恢复您的订单详情，正在为您准备结账页面。'
                : "We've restored your order details and are preparing your checkout."}
            </p>
            <p className="mt-3 text-sm text-white/60">
              {locale === 'CN'
                ? '即将跳转到付款页面，请不要关闭此窗口。'
                : 'You will be redirected to the payment page shortly. Please do not close this window.'}
            </p>
            <div className="mt-6 inline-block h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-emerald-400" />
          </div>

          {renderOrderSummary()}
        </div>
      </div>
    )
  }

  // EXPIRED
  if (status === 'expired') {
    return (
      <div className="container mx-auto px-4 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-red-500/40 bg-red-500/10 p-8 text-center shadow-2xl">
          <div className="mb-4 text-5xl">⏰</div>
          <h1 className="mb-3 text-3xl font-bold text-red-300">
            {locale === 'CN' ? '链接已失效' : 'Link Expired'}
          </h1>
          <p className="mb-6 text-white/80">
            {locale === 'CN'
              ? '此恢复链接已失效或已被使用。请重新选择服务并创建新的订单。'
              : 'This resume link has expired or has already been used. Please start a new order from the pricing page.'}
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="rounded-full bg-gradient-to-br from-gold to-amber-500 px-8 py-3 text-sm font-semibold text-black shadow-lg transition hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]"
          >
            {locale === 'CN' ? '返回方案与定价' : 'Back to Pricing'}
          </button>
        </div>
      </div>
    )
  }

  // ERROR
  if (status === 'error') {
    return (
      <div className="container mx-auto px-4 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-red-500/40 bg-red-500/10 p-8 text-center shadow-2xl">
          <div className="mb-4 text-5xl">⚠️</div>
          <h1 className="mb-3 text-3xl font-bold text-red-300">
            {locale === 'CN' ? '出现问题' : 'Something Went Wrong'}
          </h1>
          <p className="mb-6 text-white/80">
            {error ||
              (locale === 'CN'
                ? '我们暂时无法恢复您的订单。请重试或联系支持团队协助处理。'
                : 'We were unable to restore your order. Please try again or contact support for assistance.')}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              {locale === 'CN' ? '重试' : 'Retry'}
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="flex-1 rounded-full bg-gradient-to-br from-gold to-amber-500 px-6 py-3 text-sm font-semibold text-black shadow-lg transition hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]"
            >
              {locale === 'CN' ? '联系支持团队' : 'Contact Support'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
