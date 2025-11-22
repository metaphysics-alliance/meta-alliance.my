/**
 * Checkout Failed Page
 * Displays payment failure information and retry options
 */

import { useEffect, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { FiXCircle, FiRefreshCw, FiMail, FiArrowLeft } from 'react-icons/fi'
import { supabase } from '../lib/supabaseClient'
import { useI18n } from '../i18n.jsx'

export default function CheckoutFailedPage() {
  const { lang } = useI18n()
  const locale = lang === 'CN' ? 'CN' : 'EN'
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order_id')
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retrying, setRetrying] = useState(false)

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) {
        setError(locale === 'CN' ? '未找到订单' : 'Order not found')
        setLoading(false)
        return
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('guest_orders')
          .select('*')
          .eq('id', orderId)
          .single()

        if (fetchError) throw fetchError
        setOrder(data)
      } catch (err) {
        console.error('Failed to load order:', err)
        setError(locale === 'CN' ? '加载订单失败' : 'Failed to load order')
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderId, locale])

  const handleRetryPayment = async () => {
    setRetrying(true)
    
    try {
      // Get resume token for this order
      const { data: tokenData, error: tokenError } = await supabase
        .rpc('create_resume_token', { order_id: orderId })
      
      if (tokenError) throw tokenError

      // Redirect to resume page with token
      navigate(`/checkout/resume/${tokenData}`)
    } catch (err) {
      console.error('Failed to create resume token:', err)
      setError(locale === 'CN' ? '无法重试付款' : 'Unable to retry payment')
      setRetrying(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-red-500"></div>
          <p className="text-white/70">
            {locale === 'CN' ? '正在加载...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  if (error && !order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
          <div className="mb-4 text-6xl">❌</div>
          <h1 className="mb-4 text-3xl font-bold text-white">{error}</h1>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
          >
            {locale === 'CN' ? '返回定价' : 'Back to Pricing'}
          </Link>
        </div>
      </div>
    )
  }

  const failureReason = order?.payment_failure_reason || (locale === 'CN' ? '付款处理失败' : 'Payment processing failed')

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Failure Header */}
        <div className="rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 text-center shadow-2xl">
          <div className="mb-6 flex justify-center">
            <FiXCircle className="h-24 w-24 text-red-400" />
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-white">
            {locale === 'CN' ? '付款失败' : 'Payment Failed'}
          </h1>
          
          <p className="mb-6 text-lg text-white/80">
            {locale === 'CN'
              ? '您的付款未能处理。请查看下方详情并重试。'
              : 'Your payment could not be processed. Please review the details below and try again.'}
          </p>

          <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-4">
            <div className="mb-2 text-sm text-white/60">
              {locale === 'CN' ? '失败原因' : 'Failure Reason'}
            </div>
            <div className="text-lg text-red-300">
              {failureReason}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            {locale === 'CN' ? '订单详情' : 'Order Details'}
          </h2>

          <div className="mb-6 space-y-4">
            {order?.cart_items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0"
              >
                <div>
                  <div className="font-medium text-white">{item.name}</div>
                  {item.description && (
                    <div className="text-sm text-white/60">{item.description}</div>
                  )}
                </div>
                <div className="font-semibold text-white">
                  {order.currency} {item.price.toFixed(2)}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t-2 border-white/20 pt-4">
              <div className="text-lg font-bold text-white">
                {locale === 'CN' ? '总计' : 'Total'}
              </div>
              <div className="text-2xl font-bold text-white">
                {order?.currency} {order?.currency === 'MYR' ? order.total_myr.toFixed(2) : order.total_usd.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Retry Button */}
          <button
            onClick={handleRetryPayment}
            disabled={retrying}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-400 px-6 py-4 text-base font-bold text-black shadow-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/70 via-teal-300/70 to-cyan-400/70 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              <FiRefreshCw className={retrying ? 'animate-spin' : ''} />
              {retrying
                ? (locale === 'CN' ? '正在准备...' : 'Preparing...')
                : (locale === 'CN' ? '重试付款' : 'Retry Payment')}
            </span>
          </button>
        </div>

        {/* Common Issues */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            {locale === 'CN' ? '常见问题' : 'Common Issues'}
          </h2>

          <div className="space-y-4 text-white/70">
            <div className="flex gap-3">
              <div className="shrink-0 text-lg">💳</div>
              <div>
                <strong className="text-white">
                  {locale === 'CN' ? '卡片被拒绝' : 'Card Declined'}
                </strong>
                <p className="text-sm">
                  {locale === 'CN'
                    ? '请检查您的卡片详情是否正确，或尝试使用其他付款方式。'
                    : 'Check that your card details are correct or try a different payment method.'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 text-lg">🔒</div>
              <div>
                <strong className="text-white">
                  {locale === 'CN' ? '需要身份验证' : 'Authentication Required'}
                </strong>
                <p className="text-sm">
                  {locale === 'CN'
                    ? '您的银行可能需要额外验证。请确保已启用 3D Secure。'
                    : 'Your bank may require additional verification. Ensure 3D Secure is enabled.'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 text-lg">💰</div>
              <div>
                <strong className="text-white">
                  {locale === 'CN' ? '余额不足' : 'Insufficient Funds'}
                </strong>
                <p className="text-sm">
                  {locale === 'CN'
                    ? '请确保您的账户有足够的余额完成交易。'
                    : 'Ensure your account has sufficient balance to complete the transaction.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="rounded-3xl border border-cyan-500/30 bg-cyan-500/10 p-6">
          <div className="flex items-start gap-4">
            <FiMail className="h-6 w-6 shrink-0 text-cyan-400" />
            <div className="flex-1">
              <h3 className="mb-2 font-semibold text-white">
                {locale === 'CN' ? '需要帮助？' : 'Need Help?'}
              </h3>
              <p className="text-sm text-white/70">
                {locale === 'CN'
                  ? '如果问题仍然存在，请联系我们的销售团队，我们将协助您完成订单。'
                  : 'If the issue persists, contact our sales team and we\'ll help you complete your order.'}
              </p>
              <a
                href="mailto:sales@meta-alliance.my"
                className="mt-2 inline-block font-medium text-cyan-400 hover:underline"
              >
                sales@meta-alliance.my
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/pricing"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
          >
            <FiArrowLeft />
            {locale === 'CN' ? '返回定价' : 'Back to Pricing'}
          </Link>
          
          <Link
            to="/contact"
            className="flex-1 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 px-6 py-3 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          >
            {locale === 'CN' ? '联系支持' : 'Contact Support'}
          </Link>
        </div>
      </div>
    </div>
  )
}
