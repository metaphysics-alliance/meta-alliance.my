/**
 * Checkout Success Page
 * Displays order confirmation and next steps after successful payment
 */

import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FiCheckCircle, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi'
import { supabase } from '../lib/supabaseClient'
import { useI18n } from '../i18n.jsx'
import { usePricingCart } from '../components/PricingCartContext.jsx'

export default function CheckoutSuccessPage() {
  const { lang } = useI18n()
  const locale = lang === 'CN' ? 'CN' : 'EN'
  const { clear } = usePricingCart()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order_id')
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

        if (false && data.payment_status !== 'succeeded') {
          setError(locale === 'CN' ? '付款未完成' : 'Payment not completed')
        } else {
          setOrder(data)
        }
      } catch (err) {
        console.error('Failed to load order:', err)
        setError(locale === 'CN' ? '加载订单失败' : 'Failed to load order')
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderId, locale])

  // Safety net: clear pricing cart when viewing a succeeded order
  useEffect(() => {
    if (!order) return

    try {
      clear()
      if (typeof window !== 'undefined') {
        const keys = ['EN', 'CN']
        for (const k of keys) {
          window.localStorage.removeItem(`ma-pricing-cart-${k}`)
        }
        window.dispatchEvent(new Event('cart-updated'))
      }
    } catch (err) {
      console.warn('Failed to clear pricing cart on success page:', err)
    }
  }, [order, clear])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-emerald-500"></div>
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
        {/* Success Header */}
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-8 text-center shadow-2xl">
          <div className="mb-6 flex justify-center">
            <FiCheckCircle className="h-24 w-24 text-emerald-400" />
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-white">
            {locale === 'CN' ? '付款成功！' : 'Payment Successful!'}
          </h1>
          
          <p className="mb-6 text-lg text-white/80">
            {locale === 'CN'
              ? '感谢您的订购。我们已收到您的付款。'
              : 'Thank you for your order. We have received your payment.'}
          </p>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-2 text-sm text-white/60">
              {locale === 'CN' ? '订单编号' : 'Order ID'}
            </div>
            <div className="font-mono text-lg text-emerald-400">
              {order?.id.slice(0, 8)}...
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            {locale === 'CN' ? '订单详情' : 'Order Details'}
          </h2>

          <div className="space-y-4">
            {order?.cart_items.map((item, index) => {
              const amount =
                typeof item.amount === 'number'
                  ? item.amount
                  : Number.parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || '0') || 0

              return (
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
                  <div className="font-semibold text-emerald-400">
                    {order.currency}{' '}
                    {amount.toFixed(2)}
                  </div>
                </div>
              )
            })}

            <div className="flex items-center justify-between border-t-2 border-emerald-500/30 pt-4">
              <div className="text-lg font-bold text-white">
                {locale === 'CN' ? '总计' : 'Total'}
              </div>
              <div className="text-2xl font-bold text-emerald-400">
                {order?.currency} {order?.currency === 'MYR' ? order.total_myr.toFixed(2) : order.total_usd.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            {locale === 'CN' ? '下一步' : 'Next Steps'}
          </h2>

          <div className="space-y-6">
            {/* Email Confirmation */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                <FiMail className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-white">
                  {locale === 'CN' ? '查看您的邮箱' : 'Check Your Email'}
                </h3>
                <p className="text-sm text-white/70">
                  {locale === 'CN'
                    ? `我们已向 ${order?.guest_email} 发送了订单确认邮件，其中包含您的服务访问详情。`
                    : `We've sent an order confirmation to ${order?.guest_email} with details about accessing your services.`}
                </p>
              </div>
            </div>

            {/* Create Account */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-500/20">
                <FiArrowRight className="h-6 w-6 text-teal-400" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-white">
                  {locale === 'CN' ? '使用魔法链接完成账户创建' : 'Finish setup via your magic link'}
                </h3>
                <p className="mb-3 text-sm text-white/70">
                  {locale === 'CN'
                    ? '点击确认邮件中的链接使用魔法链接完成账户创建，即可访问客户门户并管理您的服务。'
                    : 'We sent a magic link to your email. Use it to create your account and access your tools.'}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-2 text-sm font-semibold text-white/80">
                  {locale === 'CN'
                    ? '请使用邮件中的魔法链接使用邮件中的魔法链接创建账户'
                    : 'Use the magic link from your email to create your account'}
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                <FiDownload className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-white">
                  {locale === 'CN' ? '需要帮助？' : 'Need Help?'}
                </h3>
                <p className="text-sm text-white/70">
                  {locale === 'CN'
                    ? '如有任何疑问，请联系我们的销售团队：'
                    : 'If you have any questions, contact our sales team at:'}{' '}
                  <a
                    href="mailto:sales@meta-alliance.my"
                    className="font-medium text-cyan-400 hover:underline"
                  >
                    sales@meta-alliance.my
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/"
            className="flex-1 rounded-full border border-white/20 bg-transparent px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
          >
            {locale === 'CN' ? '返回首页' : 'Back to Home'}
          </Link>
          
          <Link
            to="/pricing"
            className="flex-1 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 px-6 py-3 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
          >
            {locale === 'CN' ? '浏览更多服务' : 'Explore More Services'}
          </Link>
        </div>
      </div>
    </div>
  )
}

