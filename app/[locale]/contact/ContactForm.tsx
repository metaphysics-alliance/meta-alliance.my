"use client"

import { useEffect, useMemo, useRef, useState } from 'react'

import type { Locale } from '@/lib/i18n'

interface Props { locale: Locale }

type FormState = {
  name: string
  email: string
  phone: string
  companyRole: string
  country: string
  malaysiaState?: string
  topic: 'Sales' | 'Partnership' | 'Media' | 'Other'
  budget: string
  timeline: 'Immediate' | '1–3 months' | '3–6 months'
  message: string
  consent: boolean
  hp: string
}

export default function ContactForm({ locale }: Props){


    name: '',
    email: '',
    phone: '',
    companyRole: '',
    country: 'MY',
    malaysiaState: '',
    topic: 'Sales',
    budget: '',
    timeline: 'Immediate',
    message: '',
    consent: false,
    hp: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<{ id: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const t = useMemo(() => ({
    name: locale === 'CN' ? '姓名*' : 'Full name*',
    email: locale === 'CN' ? '邮箱*' : 'Email*',
    phone: locale === 'CN' ? '电话（自动识别国家）' : 'Phone (auto-detect country)',
    company: locale === 'CN' ? '公司 / 职位' : 'Company / Role',
    country: locale === 'CN' ? '国家/地区' : 'Country/Region',
    topic: locale === 'CN' ? '主题' : 'Topic',
    budget: locale === 'CN' ? '预算（可选）' : 'Budget (optional)',
    timeline: locale === 'CN' ? '时间规划' : 'Timeline',
    message: locale === 'CN' ? '留言*' : 'Message*',
    consent: locale === 'CN' ? '我同意按照隐私政策处理数据*' : 'I consent to data processing per privacy policy*',
    submit: locale === 'CN' ? '提交' : 'Submit',
    successTitle: locale === 'CN' ? '已收到您的咨询' : 'Thanks — we’ve received your inquiry',
    successBody: locale === 'CN' ? '我们已生成案件编号并发送确认邮件。后续会在1个工作日内联系您。' : 'We’ve generated a case ID and sent an auto‑reply. We’ll follow up within 1 business day.',
  }), [locale])

  useEffect(() => {
    // Auto-detect country by browser locale as a friendly default.
    try{
      const navLang = navigator.language || ''
      if (navLang && !state.country){
        const cc = navLang.split('-')[1]
        if (cc) setState((s) => ({ ...s, country: cc }))
      }
    }catch{}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Clear state if country changes away from Malaysia
  useEffect(() => {
    if (state.country !== 'MY' && state.malaysiaState){
      setState((s) => ({ ...s, malaysiaState: '' }))
    }
  }, [state.country])

  // Country / region options
  const malaysiaStates: { value: string; label: string }[] = [
    { value: 'Johor', label: 'Johor' },
    { value: 'Kedah', label: 'Kedah' },
    { value: 'Kelantan', label: 'Kelantan' },
    { value: 'Melaka', label: 'Melaka' },
    { value: 'Negeri Sembilan', label: 'Negeri Sembilan' },
    { value: 'Pahang', label: 'Pahang' },
    { value: 'Perak', label: 'Perak' },
    { value: 'Perlis', label: 'Perlis' },
    { value: 'Penang (Pulau Pinang)', label: 'Penang (Pulau Pinang)' },
    { value: 'Sabah', label: 'Sabah' },
    { value: 'Sarawak', label: 'Sarawak' },
    { value: 'Selangor', label: 'Selangor' },
    { value: 'Terengganu', label: 'Terengganu' },
    { value: 'Kuala Lumpur', label: 'Kuala Lumpur' },
    { value: 'Labuan', label: 'Labuan' },
    { value: 'Putrajaya', label: 'Putrajaya' },
  ]

  const asiaCountries: { value: string; label: string }[] = [
    { value: 'SG', label: 'Singapore' },
    { value: 'HK', label: 'Hong Kong' },
    { value: 'MO', label: 'Macau' },
    { value: 'CN', label: 'China' },
    { value: 'JP', label: 'Japan' },
    { value: 'KR', label: 'South Korea' },
    { value: 'TH', label: 'Thailand' },
    { value: 'VN', label: 'Vietnam' },
    { value: 'ID', label: 'Indonesia' },
    { value: 'PH', label: 'Philippines' },
    { value: 'LA', label: 'Laos' },
    { value: 'KH', label: 'Cambodia' },
    { value: 'MM', label: 'Myanmar' },
    { value: 'BN', label: 'Brunei' },
    { value: 'IN', label: 'India' },
    { value: 'PK', label: 'Pakistan' },
    { value: 'BD', label: 'Bangladesh' },
    { value: 'LK', label: 'Sri Lanka' },
    { value: 'NP', label: 'Nepal' },
    { value: 'MV', label: 'Maldives' },
    { value: 'AE', label: 'United Arab Emirates' },
  ]

  const worldCountries: { value: string; label: string }[] = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IT', label: 'Italy' },
    { value: 'ES', label: 'Spain' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'QA', label: 'Qatar' },
    { value: 'KW', label: 'Kuwait' },
    { value: 'OM', label: 'Oman' },
    { value: 'BH', label: 'Bahrain' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as any
    setState((s) => ({ ...s, [name]: type === 'checkbox' ? !!checked : value }))
  }

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  // Lazy load reCAPTCHA if site key is configured
  useEffect(() => {
    if (!recaptchaSiteKey) return
    const id = 'recaptcha-script'
    if (document.getElementById(id)) return
    const s = document.createElement('script')
    s.id = id
    s.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
    s.async = true
    document.head.appendChild(s)
  }, [recaptchaSiteKey])

  // Load Turnstile and render widget (invisible) if configured
  useEffect(() => {
    if (!turnstileSiteKey) return
    const id = 'turnstile-script'
    if (!document.getElementById(id)){
      const s = document.createElement('script')
      s.id = id
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      s.async = true
      document.head.appendChild(s)
    }
    const timer = setInterval(() => {
      const anyWin = window as any
      if (anyWin.turnstile && containerRef.current){
        try{
          anyWin.turnstile.render(containerRef.current, {
            sitekey: turnstileSiteKey,
            callback: (token: string) => setTurnstileToken(token),
            'error-callback': () => setTurnstileToken(null),
            'expired-callback': () => setTurnstileToken(null),
            theme: 'auto',
          })
          clearInterval(timer)
        }catch{}
      }
    }, 200)
    return () => clearInterval(timer)
  }, [turnstileSiteKey])

  const generateCaseId = () => {
    const ts = Date.now().toString(36).toUpperCase()
    const rnd = Math.random().toString(36).slice(2, 6).toUpperCase()
    return `MA-${ts}-${rnd}`
  }

  const rateLimited = () => {
    try{
      const k = 'contact:lastSubmit'
      const last = parseInt(localStorage.getItem(k) || '0', 10)
      const now = Date.now()
      if (now - last < 60_000) return true
      localStorage.setItem(k, String(now))
      return false
    }catch{
      return false
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (rateLimited()){
      setError(locale === 'CN' ? '请稍后再试（限流保护）' : 'Please try again shortly (rate limited)')
      return
    }

    if (state.hp){
      setError('') // silently drop
      return
    }

    if (!state.name || !state.email || !state.message || !state.consent){
      setError(locale === 'CN' ? '请填写必填项并勾选同意' : 'Please complete required fields and consent')
      return
    }

    const id = generateCaseId()
    const payload: any = { ...state, id, locale }

    // Fetch reCAPTCHA token if available
    try{
      if (recaptchaSiteKey && (window as any).grecaptcha?.execute){
        await new Promise<void>((resolve) => (window as any).grecaptcha.ready(resolve))
        const token = await (window as any).grecaptcha.execute(recaptchaSiteKey, { action: 'contact_submit' })
        if (token) payload.recaptchaToken = token
      }
      if (turnstileSiteKey && turnstileToken){
        payload.turnstileToken = turnstileToken
      }
    }catch{}

    try{
      setSubmitting(true)

      if (endpoint){
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        const mail = (state.topic === 'Media' ? (process.env.NEXT_PUBLIC_EMAIL_MEDIA || 'press@meta-alliance.my')
          : state.topic === 'Sales' ? (process.env.NEXT_PUBLIC_EMAIL_SALES || 'sales@meta-alliance.my')
          : (process.env.NEXT_PUBLIC_EMAIL_SUPPORT || 'support@meta-alliance.my'))
        const subject = encodeURIComponent(`[${id}] ${state.topic} Inquiry — ${state.name}`)
        const body = encodeURIComponent(
          `Name: ${state.name}\nEmail: ${state.email}\nPhone: ${state.phone}\nCompany/Role: ${state.companyRole}\nCountry: ${state.country}\nTopic: ${state.topic}\nBudget: ${state.budget}\nTimeline: ${state.timeline}\n\nMessage:\n${state.message}\n\nConsent: ${state.consent ? 'Yes' : 'No'}\nLocale: ${locale}`
        )
        window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`
      }

      setSuccess({ id })
      setState((s) => ({ ...s, message: '' }))
    }catch(err: any){
      setError((locale === 'CN' ? '提交失败：' : 'Submission failed: ') + (err?.message || 'Unknown error'))
    }finally{
      setSubmitting(false)
    }
  }

  if (success){
    return (
      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="text-lg font-semibold text-white">{t.successTitle}</div>
        <div className="mt-1 text-white/75 text-sm">{t.successBody}</div>
        <div className="mt-2 text-white/80 text-sm">Case ID: <span className="font-mono">{success.id}</span></div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input type="text" name="hp" value={state.hp} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />
      {/* Turnstile container (renders if configured) */}
      <div ref={containerRef as any} style={{ display: turnstileSiteKey ? 'block' : 'none' }} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.name}</label>
          <input
            name="name"
            value={state.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40"
            placeholder={locale === 'CN' ? '张三' : 'Jane Doe'}
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.email}</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.phone}</label>
          <input
            name="phone"
            value={state.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40"
            placeholder={locale === 'CN' ? '+60 ...' : '+60 ...'}
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.company}</label>
          <input
            name="companyRole"
            value={state.companyRole}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40"
            placeholder={locale === 'CN' ? '公司名 / 职位' : 'Company / Role'}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.country}</label>
          <div className="relative">
            <select
              name="country"
              value={state.country}
              onChange={handleChange}
              className="w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 pr-10 text-white focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="MY">{locale === 'CN' ? '马来西亚' : 'Malaysia'}</option>
              <optgroup label={locale === 'CN' ? '亚洲' : 'Asia'}>
                {asiaCountries.map((o) => (
                  <option key={o.value} value={o.value}>{locale === 'CN' ? (o as any).labelCn : o.label}</option>
                ))}
              </optgroup>
              <optgroup label={locale === 'CN' ? '世界其他地区' : 'Rest of World'}>
                {worldCountries.map((o) => (
                  <option key={o.value} value={o.value}>{locale === 'CN' ? (o as any).labelCn : o.label}</option>
                ))}
              </optgroup>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">▾</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.state}</label>
          <div className="relative">
            <select
              name="malaysiaState"
              value={state.malaysiaState || ''}
              onChange={handleChange}
              disabled={state.country !== 'MY'}
              className="w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 pr-10 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="">{locale === 'CN' ? '请选择州属' : 'Select state'}</option>
              {malaysiaStates.map((o) => (
                <option key={o.value} value={o.value}>{locale === 'CN' ? o.labelCn : o.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">▾</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.topic}</label>
          <div className="relative">
            <select
              name="topic"
              value={state.topic}
              onChange={handleChange}
              className="w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 pr-10 text-white focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="Sales">{locale === 'CN' ? '销售/咨询' : 'Sales'}</option>
              <option value="Partnership">{locale === 'CN' ? '合作' : 'Partnership'}</option>
              <option value="Media">{locale === 'CN' ? '媒体' : 'Media'}</option>
              <option value="Other">{locale === 'CN' ? '其他' : 'Other'}</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">▾</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.budget}</label>
          <div className="relative">
            <select
              name="budget"
              value={state.budget}
              onChange={handleChange}
              className="w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 pr-10 text-white focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="">{locale === 'CN' ? '未指定' : 'Not specified'}</option>
              <option value="<1k">{locale === 'CN' ? '< RM 1k' : '< RM 1k'}</option>
              <option value="1-5k">RM 1-5k</option>
              <option value="5-15k">RM 5-15k</option>
              <option value=">15k">{locale === 'CN' ? 'RM 15k 以上' : 'RM 15k+'}</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">▾</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.timeline}</label>
          <div className="relative">
            <select
              name="timeline"
              value={state.timeline}
              onChange={handleChange}
              className="w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 pr-10 text-white focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="Immediate">{locale === 'CN' ? '立即' : 'Immediate'}</option>
              <option value="1-3 months">{locale === 'CN' ? '1-3 个月' : '1-3 months'}</option>
              <option value="3-6 months">{locale === 'CN' ? '3-6 个月' : '3-6 months'}</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">▾</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/80 mb-1">{t.message}</label>
        <textarea
          name="message"
          value={state.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40"
          placeholder={locale === 'CN' ? '请告诉我们您的需求、预算与时间期望…' : 'Tell us about your goals, budget and timing…'}
        />
      </div>

      <div className="flex items-start gap-2">
        <input id="consent" name="consent" type="checkbox" checked={state.consent} onChange={handleChange} required className="mt-1" />
        <label htmlFor="consent" className="text-sm text-white/80">{t.consent}</label>
      </div>

      {recaptchaSiteKey ? (
        <div className="text-xs text-white/50">Protected by reCAPTCHA</div>
      ) : null}

      {error ? (
        <div className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>
      ) : null}

      <div>
        <button type="submit" disabled={submitting} className="inline-flex items-center rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gold-soft disabled:opacity-60">
          {submitting ? (locale === 'CN' ? '提交中…' : 'Submitting…') : t.submit}
        </button>
      </div>
    </form>
  )
}
