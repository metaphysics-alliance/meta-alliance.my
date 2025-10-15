import { useEffect, useMemo, useRef, useState } from 'react'

import { useI18n } from '../i18n.jsx'

export default function ContactForm(){
  const { lang } = useI18n()
  const [state, setState] = useState({
    name: '', email: '', phoneCode: '+60', phone: '', companyRole: '', country: 'MY',
    topic: 'Sales', budget: '', timeline: 'Immediate', message: '', consent: false, hp: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const t = useMemo(() => ({
    name: lang === 'CN' ? '姓名*' : 'Full name*',
    email: lang === 'CN' ? '邮箱*' : 'Email*',
    phone: lang === 'CN' ? '电话（国家区号 + 号码）' : 'Phone (country code + number)',
    company: lang === 'CN' ? '公司 / 角色' : 'Company / Role',
    country: lang === 'CN' ? '国家/地区' : 'Country/Region',
    topic: lang === 'CN' ? '主题' : 'Topic',
    budget: lang === 'CN' ? '预算（可选）' : 'Budget (optional)',
    timeline: lang === 'CN' ? '时间线' : 'Timeline',
    message: lang === 'CN' ? '留言*' : 'Message*',
    consent: lang === 'CN' ? '我同意贵司依据隐私政策处理我的信息*' : 'I consent to data processing per privacy policy*',
    submit: lang === 'CN' ? '提交' : 'Submit',
    successTitle: lang === 'CN' ? '已收到您的咨询' : 'Thanks — we’ve received your inquiry',
    successBody: lang === 'CN' ? '我们已生成案件编号并发送确认邮件。后续会在1个工作日内联系您。' : 'We’ve generated a case ID and sent an auto‑reply. We’ll follow up within 1 business day.',
  }), [lang])

  useEffect(() => {
    try{
      const navLang = navigator.language || ''
      if (navLang && !state.country){
        const cc = navLang.split('-')[1]
        if (cc) setState((s) => ({ ...s, country: cc }))
      }
    }catch{}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setState((s) => ({ ...s, [name]: type === 'checkbox' ? !!checked : value }))
  }

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY
  const [turnstileToken, setTurnstileToken] = useState(null)
  const containerRef = useRef(null)

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
      if (window.turnstile && containerRef.current){
        try{
          window.turnstile.render(containerRef.current, {
            sitekey: turnstileSiteKey,
            callback: (token) => setTurnstileToken(token),
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

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (rateLimited()){
      setError(lang === 'CN' ? '请稍后再试（限流保护）' : 'Please try again shortly (rate limited)')
      return
    }
    if (state.hp){ setError(''); return }
    if (!state.name || !state.email || !state.message || !state.consent){
      setError(lang === 'CN' ? '请填写必填项并勾选同意' : 'Please complete required fields and consent')
      return
    }

    const id = generateCaseId()
    const payload = { ...state, id, locale: lang, phone: `${state.phoneCode} ${state.phone}`.trim() }

    // Fetch reCAPTCHA token if available
    try{
      if (recaptchaSiteKey && window.grecaptcha?.execute){
        await new Promise((resolve) => window.grecaptcha.ready(resolve))
        const token = await window.grecaptcha.execute(recaptchaSiteKey, { action: 'contact_submit' })
        if (token) payload.recaptchaToken = token
      }
      if (turnstileSiteKey && turnstileToken){
        payload.turnstileToken = turnstileToken
      }
    }catch{}
    try{
      setSubmitting(true)
      if (endpoint){
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        const sales = import.meta.env.VITE_EMAIL_SALES || 'sales@meta-alliance.my'
        const support = import.meta.env.VITE_EMAIL_SUPPORT || 'support@meta-alliance.my'
        const media = import.meta.env.VITE_EMAIL_MEDIA || 'press@meta-alliance.my'
        const mail = (state.topic === 'Media' ? media : state.topic === 'Sales' ? sales : support)
        const subject = encodeURIComponent(`[${id}] ${state.topic} Inquiry — ${state.name}`)
        const body = encodeURIComponent(
          `Name: ${state.name}\nEmail: ${state.email}\nPhone: ${state.phone}\nCompany/Role: ${state.companyRole}\nCountry: ${state.country}\nTopic: ${state.topic}\nBudget: ${state.budget}\nTimeline: ${state.timeline}\n\nMessage:\n${state.message}\n\nConsent: ${state.consent ? 'Yes' : 'No'}\nLocale: ${lang}`
        )
        window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`
      }
      setSuccess({ id })
      setState((s) => ({ ...s, message: '' }))
    }catch(err){
      setError((lang === 'CN' ? '提交失败：' : 'Submission failed: ') + (err?.message || 'Unknown error'))
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
      <div ref={containerRef} style={{ display: turnstileSiteKey ? 'block' : 'none' }} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.name}</label>
          <input name="name" value={state.name} onChange={handleChange} required className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40" placeholder={lang === 'CN' ? '张三' : 'Jane Doe'} />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.email}</label>
          <input type="email" name="email" value={state.email} onChange={handleChange} required className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40" placeholder="name@example.com" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.phone}</label>
          <div className="flex gap-2">
            <select name="phoneCode" value={state.phoneCode} onChange={handleChange} className="w-40 shrink-0 rounded-lg border border-white/15 bg-white text-black px-3 py-2">
              {/* Asia (priority) */}
              <option value="+60">Malaysia (+60)</option>
              <option value="+65">Singapore (+65)</option>
              <option value="+852">Hong Kong (+852)</option>
              <option value="+853">Macau (+853)</option>
              <option value="+86">China (+86)</option>
              <option value="+81">Japan (+81)</option>
              <option value="+82">South Korea (+82)</option>
              <option value="+66">Thailand (+66)</option>
              <option value="+84">Vietnam (+84)</option>
              <option value="+62">Indonesia (+62)</option>
              <option value="+63">Philippines (+63)</option>
              <option value="+856">Laos (+856)</option>
              <option value="+855">Cambodia (+855)</option>
              <option value="+95">Myanmar (+95)</option>
              <option value="+673">Brunei (+673)</option>
              <option value="+91">India (+91)</option>
              <option value="+92">Pakistan (+92)</option>
              <option value="+880">Bangladesh (+880)</option>
              <option value="+94">Sri Lanka (+94)</option>
              <option value="+977">Nepal (+977)</option>
              <option value="+960">Maldives (+960)</option>
              {/* Rest (sample common) */}
              <option value="+1">USA/Canada (+1)</option>
              <option value="+44">UK (+44)</option>
              <option value="+61">Australia (+61)</option>
              <option value="+64">New Zealand (+64)</option>
              <option value="+49">Germany (+49)</option>
              <option value="+33">France (+33)</option>
              <option value="+39">Italy (+39)</option>
              <option value="+34">Spain (+34)</option>
              <option value="+41">Switzerland (+41)</option>
              <option value="+971">UAE (+971)</option>
            </select>
            <input name="phone" value={state.phone} onChange={handleChange} className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40" placeholder={lang === 'CN' ? '电话号码' : 'Phone number'} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.company}</label>
          <input name="companyRole" value={state.companyRole} onChange={handleChange} className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40" placeholder={lang === 'CN' ? '公司名 / 职位' : 'Company / Role'} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.country}</label>
          <input name="country" value={state.country} onChange={handleChange} className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40" placeholder={lang === 'CN' ? '马来西亚' : 'Malaysia'} />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.topic}</label>
          <select name="topic" value={state.topic} onChange={handleChange} className="w-full rounded-lg border border-white/15 bg-white text-black px-3 py-2">
            <option value="Sales">{lang === 'CN' ? '销售/咨询' : 'Sales'}</option>
            <option value="Partnership">{lang === 'CN' ? '合作' : 'Partnership'}</option>
            <option value="Media">{lang === 'CN' ? '媒体' : 'Media'}</option>
            <option value="Other">{lang === 'CN' ? '其他' : 'Other'}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.budget}</label>
          <select name="budget" value={state.budget} onChange={handleChange} className="w-full rounded-lg border border-white/15 bg-white text-black px-3 py-2">
            <option value="">{lang === 'CN' ? '未指定' : 'Not specified'}</option>
            <option value="<1k">{lang === 'CN' ? '< RM 1k' : '< RM 1k'}</option>
            <option value="1–5k">RM 1–5k</option>
            <option value="5–15k">RM 5–15k</option>
            <option value=">15k">{lang === 'CN' ? 'RM 15k 以上' : 'RM 15k+'}</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.timeline}</label>
          <select name="timeline" value={state.timeline} onChange={handleChange} className="w-full rounded-lg border border-white/15 bg-white text-black px-3 py-2">
            <option value="Immediate">{lang === 'CN' ? '立即' : 'Immediate'}</option>
            <option value="1–3 months">{lang === 'CN' ? '1–3 个月' : '1–3 months'}</option>
            <option value="3–6 months">{lang === 'CN' ? '3–6 个月' : '3–6 months'}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/80 mb-1">{t.message}</label>
        <textarea name="message" value={state.message} onChange={handleChange} required rows={5} className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40" placeholder={lang === 'CN' ? '请告诉我们您的需求、预算与时间期望…' : 'Tell us about your goals, budget and timing…'} />
      </div>

      <div className="flex items-start gap-2">
        <input id="consent" name="consent" type="checkbox" checked={state.consent} onChange={handleChange} required className="mt-1" />
        <label htmlFor="consent" className="text-sm text-white/80">{t.consent}</label>
      </div>

      {error ? (<div className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>) : null}

      <div>
        <button type="submit" disabled={submitting} className="inline-flex items-center rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gold-soft disabled:opacity-60">
          {submitting ? (lang === 'CN' ? '提交中…' : 'Submitting…') : t.submit}
        </button>
      </div>
    </form>
  )
}
