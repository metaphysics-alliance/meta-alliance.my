/**
 * Magic Link Handler Route: /auth/magic/:token
 *
 * Flow:
 * 1. Resolve magic_link_token on the server using service role.
 * 2. Create Supabase Auth user (DB trigger creates user_profiles/users).
 * 3. Create subscriptions + subscription_payments.
 * 4. Mark guest_orders.account_created = true and redirect to profile completion.
 */

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useI18n } from '../i18n'

export default function MagicLinkHandler() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { lang } = useI18n()
  const locale = lang === 'CN' ? 'CN' : 'EN'
  const toolsBaseUrl =
    import.meta.env.VITE_TOOLS_APP_URL || window.location.origin
  const toolsLoginUrl = `${toolsBaseUrl.replace(/\/+$/, '')}/login`
  const apiBase = import.meta.env.VITE_API_BASE
    ? import.meta.env.VITE_API_BASE.replace(/\/+$/, '')
    : ''
  const apiUrl = (path) => `${apiBase}${path.startsWith('/') ? path : `/${path}`}`

  const [status, setStatus] = useState('validating') // validating, creating, success, error
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (token) {
      handleMagicLink(String(token))
    }
  }, [token])

  const handleMagicLink = async (magicToken) => {
    try {
      setProgress(10)
      setStatus('validating')

      // STEP 1: Resolve the magic link via server (service role)
      const resolveUrl = apiUrl(
        `/api/magic-link/resolve?token=${encodeURIComponent(magicToken)}`,
      )
      const response = await fetch(resolveUrl)

      if (!response.ok) {
        const details = await response.json().catch(() => null)
        console.error('Magic link resolve failed:', response.status, details)
        setError(
          locale === 'CN'
            ? '链接无效或已过期，如问题持续请联系支持团队。'
            : 'Invalid or expired magic link. Please contact support if this persists.',
        )
        setStatus('error')
        return
      }

      const payload = await response.json()
      const order = payload?.order

      if (!order) {
        setError(
          locale === 'CN'
            ? '无法解析魔法链接，请联系支持团队。'
            : 'Unable to resolve magic link. Please contact support.',
        )
        setStatus('error')
        return
      }

      if (order.payment_status !== 'succeeded') {
        setError(
          locale === 'CN'
            ? '付款尚未完成，请稍后重试。'
            : 'Payment is not completed yet. Please try again later.',
        )
        setStatus('error')
        return
      }

      if (order.account_created) {
        setError(
          locale === 'CN'
            ? '此链接已被使用，请直接登录。'
            : 'This magic link has already been used. Please sign in to your Metaphysics Alliance account.',
        )
        setStatus('error')
        return
      }

      setProgress(25)
      setStatus('creating')

      // STEP 2: Create Supabase Auth account (user_profiles/users created by DB trigger)
      const randomPassword =
        Math.random().toString(36).slice(-12) +
        Math.random().toString(36).slice(-12)

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: order.guest_email,
        password: randomPassword,
        options: {
          data: {
            full_name: order.guest_name,
            source: 'magic_link',
            order_id: order.id,
          },
          emailRedirectTo: window.location.origin + '/profile/complete',
        },
      })

      if (authError || !authData || !authData.user) {
        console.error('Auth signUp failed:', authError)
        setError(
          locale === 'CN'
            ? '创建账户失败，请稍后重试。'
            : 'Failed to create account. Please try again later.',
        )
        setStatus('error')
        return
      }

      const userId = authData.user.id

      // Send welcome email with login credentials for the Tools portal
      try {
        const toolsBaseUrl =
          import.meta.env.VITE_TOOLS_APP_URL || window.location.origin
        const loginBase = toolsBaseUrl.replace(/\/+$/, '')
        const loginUrl = `${loginBase}/login`

        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'account-welcome',
            to: order.guest_email,
            name: order.guest_name,
            loginEmail: order.guest_email,
            tempPassword: randomPassword,
            loginUrl,
          }),
        })
        console.log('✅ Account welcome email sent')
      } catch (welcomeErr) {
        console.warn('Failed to send account welcome email:', welcomeErr)
      }
      setProgress(60)

      // STEP 3: Create a user_subscriptions row (Tools subscription system)
      try {
        // Try to find a reasonable default plan (essential/advanced/supreme)
        const { data: plans, error: plansError } = await supabase
          .from('subscription_plans')
          .select('id, plan_code')
          .in('plan_code', ['essential', 'advanced', 'supreme'])

        if (plansError) {
          console.warn('Failed to load subscription plans:', plansError)
        } else if (plans && plans.length > 0) {
          // Prefer essential, then advanced, then supreme
          const preferredOrder = ['essential', 'advanced', 'supreme']
          let selected = plans.find((p) => p.plan_code === preferredOrder[0])
          if (!selected) {
            selected = plans.find((p) => p.plan_code === preferredOrder[1]) || plans[0]
          }

          const { error: userSubError } = await supabase
            .from('user_subscriptions')
            .insert([
              {
                user_id: userId,
                plan_id: selected.id,
                status: 'active',
                started_at: new Date().toISOString(),
                auto_renew: false,
              },
            ])

          if (userSubError) {
            console.warn('Failed to create user_subscriptions record:', userSubError)
          }
        }
      } catch (subErr) {
        console.warn('Unexpected error while creating user_subscriptions record:', subErr)
      }

      setProgress(80)

      // STEP 4: Mirror payment into public.payments (Tools ledger)
      try {
        const mirrorResp = await fetch(apiUrl('/api/payments/mirror-from-order'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ magicToken, userId }),
        })

        if (!mirrorResp.ok) {
          const details = await mirrorResp.json().catch(() => null)
          console.warn(
            'Payment mirroring failed:',
            mirrorResp.status,
            details,
          )
        } else {
          const result = await mirrorResp.json().catch(() => null)
          console.log('Payment mirrored to Tools ledger:', result)
        }
      } catch (mirrorErr) {
        console.warn(
          'Unexpected error while mirroring payment to Tools:',
          mirrorErr,
        )
      }

      setProgress(90)

      // STEP 5: Mark order as complete
      const { error: completeError } = await supabase
        .from('guest_orders')
        .update({
          account_created: true,
          user_id: userId,
          magic_link_clicked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id)

      if (completeError) {
        console.warn('Failed to mark order complete:', completeError)
      }

      setProgress(100)
      setStatus('success')

      // Redirect to Tools login with prefilled email
      const loginWithEmail = `${toolsLoginUrl}?email=${encodeURIComponent(
        order.guest_email,
      )}`
      setTimeout(() => {
        window.location.href = loginWithEmail
      }, 1200)
    } catch (err) {
      console.error('Magic link error:', err)
      setError(
        (err && err.message) ||
          (locale === 'CN'
            ? '无法处理该链接，请稍后重试或联系支持团队。'
            : 'Unable to process this magic link. Please try again later or contact support.'),
      )
      setStatus('error')
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl text-white">
          <div className="mb-6">
            {status === 'validating' && (
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-gold" />
            )}
            {status === 'creating' && (
              <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400" />
            )}
            {status === 'success' && (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-4xl">
                ✓
              </div>
            )}
            {status === 'error' && (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-4xl">
                !
              </div>
            )}
          </div>

          <h1 className="mb-4 text-2xl font-bold">
            {status === 'validating' &&
              (locale === 'CN' ? '正在验证您的链接...' : 'Validating your link...')}
            {status === 'creating' &&
              (locale === 'CN' ? '正在创建您的账户...' : 'Creating your account...')}
            {status === 'success' &&
              (locale === 'CN' ? '账户创建成功！' : 'Account Created Successfully!')}
            {status === 'error' &&
              (locale === 'CN' ? '出现错误' : 'Something Went Wrong')}
          </h1>

          <p className="mb-6 text-white/70">
            {status === 'validating' &&
              (locale === 'CN'
                ? '请稍候，我们正在验证您的安全链接。'
                : 'Please wait while we verify your secure link.')}
            {status === 'creating' &&
              (locale === 'CN'
                ? '我们正在为您配置账户与订阅。'
                : 'We are setting up your account and subscriptions.')}
            {status === 'success' &&
              (locale === 'CN'
                ? '即将为您跳转至资料完善页面。'
                : 'Redirecting you to profile completion.')}
            {status === 'error' && (
              <span className="text-red-300">
                {error ||
                  (locale === 'CN'
                    ? '无法处理该链接，请重试或联系支持团队。'
                    : 'Unable to process this magic link. Please try again or contact support.')}
              </span>
            )}
          </p>

          {(status === 'validating' || status === 'creating') && (
            <div className="mx-auto mb-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {status === 'error' && (
            <button
              onClick={() => navigate('/pricing')}
              className="mt-4 rounded-full bg-gradient-to-br from-gold to-amber-300 px-6 py-3 text-sm font-medium text-black transition hover:shadow-lg"
            >
              {locale === 'CN' ? '返回定价页面' : 'Back to Pricing'}
            </button>
          )}
          {status === 'error' &&
            typeof error === 'string' &&
            error.includes('already been used') && (
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={toolsLoginUrl}
                  className="block rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:shadow-lg"
                >
                  {locale === 'CN' ? '??????' : 'Go to Login'}
                </a>
                <button
                  onClick={() => navigate('/pricing')}
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  {locale === 'CN' ? '??????' : 'Back to Pricing'}
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
