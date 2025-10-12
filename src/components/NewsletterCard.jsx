import { useMemo, useState } from 'react'

import { useI18n } from '../i18n.jsx'

/**
 * NewsletterCard - 3D transparent card with email subscribe.
 * - i18n aware (uses t('newsletter.*'))
 * - Client-side validation
 * - Honeypot anti-bot
 * - Integration hooks:
 *    1) Direct endpoint via `actionUrl`
 *    2) Mailchimp form POST (set `actionUrl` to MC endpoint)
 *    3) Local fallback (stores in localStorage) when no endpoint is set
 *
 * Props:
 *   actionUrl?: string   // e.g., '/api/newsletter' or your Mailchimp POST URL
 *   method?: 'POST'|'GET'  // default 'POST'
 *   className?: string
 */
export default function NewsletterCard({ actionUrl = '', method = 'POST', className = '' }){
  const { t, lang } = useI18n()

  const labels = useMemo(() => ({
    title: t?.('newsletter.title') ?? (lang === 'EN' ? 'Newsletter' : '订阅资讯'),
    sub: t?.('newsletter.sub') ?? (lang === 'EN' ? 'Insights, timing windows & case studies. No spam.' : '洞察、时机窗口与案例分享，不做垃圾推送。'),
    placeholder: t?.('newsletter.placeholder') ?? (lang === 'EN' ? 'Enter your email' : '输入你的邮箱'),
    button: t?.('newsletter.button') ?? (lang === 'EN' ? 'Subscribe' : '立即订阅'),
    success: t?.('newsletter.success') ?? (lang === 'EN' ? 'Thank you! You are subscribed.' : '感谢订阅！'),
    invalid: lang === 'EN' ? 'Please enter a valid email.' : '请输入有效的邮箱地址。',
    fail: lang === 'EN' ? 'Subscription failed. Please try again.' : '订阅失败，请稍后再试。'
  }), [t, lang])

  const [email, setEmail] = useState('')
  const [hp, setHp] = useState('')    // honeypot
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  function isValidEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  }

  async function handleSubmit(e){
    e.preventDefault()
    if (hp) return // bot
    if (!isValidEmail(email)) { setMessage(labels.invalid); return }
    setLoading(true); setMessage('')

    try {
      if (actionUrl){
        const res = await fetch(actionUrl, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: method === 'POST' ? JSON.stringify({ email, lang }) : undefined
        })
        if (!res.ok) throw new Error('bad status')
      } else {
        // local fallback: store to localStorage and simulate success
        const key = 'ml_newsletter_emails'
        const arr = JSON.parse(localStorage.getItem(key) || '[]')
        arr.push({ email, lang, ts: Date.now() })
        localStorage.setItem(key, JSON.stringify(arr))
      }
      setMessage(labels.success)
      setEmail('')
    } catch {
      setMessage(labels.fail)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="newsletter" className={`container py-12 ${className}`}>
      <div className="card-3d p-6 md:p-8 rounded-2xl ring-1 ring-white/10">
        <h3 className="text-2xl md:text-3xl font-semibold mb-2">{labels.title}</h3>
        <p className="text-white/70 mb-4">{labels.sub}</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          {/* Honeypot */}
          <input
            type="text"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={labels.placeholder}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 focus:outline-none focus:ring-gold/40 placeholder:text-white/40"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-500/80 to-yellow-300/80 text-black font-semibold shadow-soft-xl hover:from-yellow-500 hover:to-yellow-300 disabled:opacity-60"
          >
            {loading ? (lang === 'EN' ? 'Submitting...' : '提交中...') : labels.button}
          </button>
        </form>

        {message && <p className="mt-3 text-sm text-white/80">{message}</p>}
      </div>
    </section>
  )
}
