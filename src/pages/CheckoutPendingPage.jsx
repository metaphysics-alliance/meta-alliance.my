/**
 * Checkout Pending Page
 * For payments that require async processing (e.g., bank transfers, FPX)
 */

import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FiClock, FiMail, FiCheckCircle, FiRefreshCw } from 'react-icons/fi'
import { supabase } from '../lib/supabaseClient'
import { useI18n } from '../i18n.jsx'

export default function CheckoutPendingPage() {
  const { lang } = useI18n()
  const locale = lang === 'CN' ? 'CN' : 'EN'
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order_id')
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [checking, setChecking] = useState(false)

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

  const handleCheckStatus = async () => {
    setChecking(true)
    
    try {
      const { data, error: fetchError } = await supabase
        .from('guest_orders')
        .select('payment_status')
        .eq('id', orderId)
        .single()

      if (fetchError) throw fetchError

      if (data.payment_status === 'succeeded') {
        window.location.href = `/checkout/success?order_id=${orderId}`
      } else if (data.payment_status === 'failed') {
        window.location.href = `/checkout/failed?order_id=${orderId}`
      } else {
        setOrder(prev => ({ ...prev, payment_status: data.payment_status }))
      }
    } catch (err) {
      console.error('Failed to check payment status:', err)
    } finally {
      setChecking(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-yellow-500"></div>
          <p className="text-white/70">
            {locale === 'CN' ? '正在加载...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Pending Header */}
        <div className="rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-8 text-center shadow-2xl">
          <div className="mb-6 flex justify-center">
            <FiClock className="h-24 w-24 animate-pulse text-yellow-400" />
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-white">
            {locale === 'CN' ? '付款处理中' : 'Payment Processing'}
          </h1>
          
          <p className="mb-6 text-lg text-white/80">
            {locale === 'CN'
              ? '您的付款正在处理中。这可能需要几分钟到几小时。'
              : 'Your payment is being processed. This may take a few minutes to a few hours.'}
          </p>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-2 text-sm text-white/60">
              {locale === 'CN' ? '订单编号' : 'Order ID'}
            </div>
            <div className="font-mono text-lg text-yellow-400">
              {order?.id.slice(0, 8)}...
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            {locale === 'CN' ? '付款状态' : 'Payment Status'}
          </h2>

          <div className="space-y-6">
            {/* Step 1: Submitted */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <FiCheckCircle className="h-5 w-5" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-white">
                  {locale === 'CN' ? '订单已提交' : 'Order Submitted'}
                </h3>
                <p className="text-sm text-white/60">
                  {locale === 'CN'
                    ? '您的订单已成功提交。'
                    : 'Your order has been submitted successfully.'}
                </p>
              </div>
            </div>

            {/* Step 2: Processing */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-black">
                <FiClock className="h-5 w-5 animate-pulse" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-white">
                  {locale === 'CN' ? '付款处理中' : 'Payment Processing'}
                </h3>
                <p className="text-sm text-white/60">
                  {locale === 'CN'
                    ? '等待您的银行或付款提供商确认。'
                    : 'Waiting for confirmation from your bank or payment provider.'}
                </p>
              </div>
            </div>

            {/* Step 3: Confirmation */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/40">
                <FiMail className="h-5 w-5" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-white/50">
                  {locale === 'CN' ? '确认邮件' : 'Confirmation Email'}
                </h3>
                <p className="text-sm text-white/40">
                  {locale === 'CN'
                    ? '付款确认后将发送邮件。'
                    : 'Email will be sent once payment is confirmed.'}
                </p>
              </div>
            </div>
          </div>

          {/* Check Status Button */}
          <button
            onClick={handleCheckStatus}
            disabled={checking}
            className="mt-8 w-full rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 px-6 py-4 font-semibold text-black shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="inline-flex items-center gap-2">
              <FiRefreshCw className={checking ? 'animate-spin' : ''} />
              {checking
                ? (locale === 'CN' ? '检查中...' : 'Checking...')
                : (locale === 'CN' ? '检查付款状态' : 'Check Payment Status')}
            </span>
          </button>
        </div>

        {/* Order Details */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            {locale === 'CN' ? '订单详情' : 'Order Details'}
          </h2>

          <div className="space-y-4">
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
        </div>

        {/* What Happens Next */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            {locale === 'CN' ? '接下来会发生什么？' : 'What Happens Next?'}
          </h2>

          <div className="space-y-4 text-white/70">
            <div className="flex gap-3">
              <div className="shrink-0 text-lg">📧</div>
              <p className="text-sm">
                {locale === 'CN'
                  ? '付款确认后，您将收到一封确认邮件，其中包含订单详情。'
                  : 'Once your payment is confirmed, you\'ll receive a confirmation email with your order details.'}
              </p>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 text-lg">🔐</div>
              <p className="text-sm">
                {locale === 'CN'
                  ? '邮件中将包含创建账户的链接，您可以访问客户门户。'
                  : 'The email will include a link to create your account and access the customer portal.'}
              </p>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 text-lg">⏰</div>
              <p className="text-sm">
                {locale === 'CN'
                  ? '如果超过 24 小时未收到确认，请联系我们的支持团队。'
                  : 'If you don\'t receive confirmation within 24 hours, contact our support team.'}
              </p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="rounded-3xl border border-cyan-500/30 bg-cyan-500/10 p-6">
          <div className="flex items-start gap-4">
            <FiMail className="h-6 w-6 shrink-0 text-cyan-400" />
            <div className="flex-1">
              <h3 className="mb-2 font-semibold text-white">
                {locale === 'CN' ? '需要帮助？' : 'Need Help?'}
              </h3>
              <p className="text-sm text-white/70">
                {locale === 'CN'
                  ? '如有任何疑问，请联系我们的销售团队。'
                  : 'If you have any questions, contact our sales team.'}
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

        {/* Action Button */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="rounded-full border border-white/20 bg-transparent px-8 py-3 font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
          >
            {locale === 'CN' ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  )
}
