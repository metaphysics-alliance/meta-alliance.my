import { useEffect, useMemo, useRef, useState } from 'react'

import { useI18n } from '../i18n.jsx'
import sharedDictionary from '../../shared/i18n/dictionary.js'
import Dropdown from './Dropdown.jsx'

export default function ContactForm(){
  const { lang } = useI18n()
  const initialState = { name: '', email: '', phoneCode: '+60', phone: '', companyRole: '', country: 'MY', malaysiaState: '', topic: 'Sales', budget: '', timeline: 'Immediate', message: '', consent: false, hp: '' }
  const [state, setState] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const t = useMemo(() => ({
    name: lang === 'CN' ? '姓名*' : 'Full name*',
    email: lang === 'CN' ? '邮箱*' : 'Email*',
    phone: lang === 'CN' ? '电话（国家码 + 号码）' : 'Phone (country code + number)',
    company: lang === 'CN' ? '公司 / 职位' : 'Company / Role',
    country: lang === 'CN' ? '国家/地区' : 'Country/Region',
    state: lang === 'CN' ? '选择州属（仅限马来西亚）' : 'Select State (Malaysia Only)',
    topic: lang === 'CN' ? '主题' : 'Topic',
    budget: lang === 'CN' ? '预算（可选）' : 'Budget (optional)',
    timeline: lang === 'CN' ? '时间线' : 'Timeline',
    message: lang === 'CN' ? '留言*' : 'Message*',
    consent: lang === 'CN' ? '我同意按照隐私政策处理数据*' : 'I consent to data processing per privacy policy*',
    submit: lang === 'CN' ? '提交' : 'Submit',
    successTitle: lang === 'CN' ? '已收到您的咨询' : 'Thanks — we’ve received your inquiry',
    successBody: lang === 'CN' ? '我们已生成案件编号并发送确认邮件。后续会在1个工作日内联系您。' : 'We’ve generated a case ID and sent an auto‑reply. We’ll follow up within 1 business day.',
  }), [lang])

  const dict = sharedDictionary[lang]

  const topicItems = useMemo(() => {
    const items = []
    // General
    items.push({ type: 'heading', label: lang === 'CN' ? '常规' : 'General' })
    items.push({ type: 'option', label: lang === 'CN' ? '销售/咨询' : 'Sales', value: 'Sales' })
    items.push({ type: 'option', label: lang === 'CN' ? '合作' : 'Partnership', value: 'Partnership' })
    items.push({ type: 'option', label: lang === 'CN' ? '媒体' : 'Media', value: 'Media' })
    items.push({ type: 'option', label: lang === 'CN' ? '其他' : 'Other', value: 'Other' })

    // Services groups from dictionary
    const groups = (dict?.nav?.celestial_groups || [])
    for (const g of groups){
      if (!g || !g.title || !Array.isArray(g.items)) continue
      items.push({ type: 'heading', label: g.title })
      for (const it of g.items){
        if (!it?.title) continue
        items.push({ type: 'option', label: it.title, value: it.title })
      }
    }

    // VIP / Holistic services
    const navAny = dict?.nav || {}
    const vipLabels = [navAny.vip_report, navAny.vip_essential, navAny.vip_advanced, navAny.vip_supreme].filter(Boolean)
    if (vipLabels.length){
      items.push({ type: 'heading', label: 'VIP' })
      for (const label of vipLabels){
        items.push({ type: 'option', label: String(label), value: String(label) })
      }
    }

    // Enterprise services
    const entHeading = navAny.enterprise || (lang === 'CN' ? '企业咨询' : 'Enterprise')
    const entItems = [navAny.enterprise, navAny.audit, navAny.site, navAny.cycles].filter(Boolean)
    if (entItems.length){
      items.push({ type: 'heading', label: String(entHeading) })
      for (const label of entItems){
        items.push({ type: 'option', label: String(label), value: String(label) })
      }
    }

    // Academy courses
    items.push({ type: 'heading', label: lang === 'CN' ? '学院课程' : 'Academy Courses' })
    const nav = dict?.nav || {}
    const courseList = [nav.courses, nav.beginner, nav.advanced || 'Advanced', nav.pro].filter(Boolean)
    for (const label of courseList){
      items.push({ type: 'option', label: String(label), value: String(label) })
    }

    return items
  }, [dict, lang])

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

  // Clear Malaysia state if country changes away from MY
  useEffect(() => {
    try{
      if (state.country !== 'MY' && state.malaysiaState){
        setState(s => ({ ...s, malaysiaState: '' }))
      }
    }catch{}
  }, [state.country])

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
    const emailTo = (import.meta.env.VITE_EMAIL_SALES || 'sales@meta-alliance.my')
    const subject = `[${id}] ${state.topic} Inquiry — ${state.name}`
    const payload = { ...state, id, locale: lang, phone: `${state.phoneCode} ${state.phone}`.trim(), to: emailTo, from: state.email, fromEmail: state.email, replyTo: state.email, subject }

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
      const endpointToUse = endpoint || (import.meta.env.DEV ? 'http://localhost:3000/api/contact' : '/api/contact')
      if (endpointToUse){
        const res = await fetch(endpointToUse, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok){
          let msg = `HTTP ${res.status}`
          try{
            const data = await res.json()
            if (data?.error) msg = data.error
          }catch{}
          throw new Error(msg)
        }
      } else {
        const mail = emailTo
        const encSubject = encodeURIComponent(subject)
        const body = encodeURIComponent(
          `Name: ${state.name}\nEmail: ${state.email}\nPhone: ${state.phone}\nCompany/Role: ${state.companyRole}\nCountry: ${state.country}\nTopic: ${state.topic}\nBudget: ${state.budget}\nTimeline: ${state.timeline}\n\nMessage:\n${state.message}\n\nConsent: ${state.consent ? 'Yes' : 'No'}\nLocale: ${lang}`
        )
        const cc = encodeURIComponent(import.meta.env.VITE_EMAIL_ADMIN || 'admin@meta-alliance.my')
        window.location.href = `mailto:${mail}?subject=${encSubject}&cc=${cc}&body=${body}`
      }
      setSuccess({ id })
      // keep data for context in the modal; reset on close
    }catch(err){
      setError((lang === 'CN' ? '提交失败：' : 'Submission failed: ') + (err?.message || 'Unknown error'))
    }finally{
      setSubmitting(false)
    }
  }

  const onCloseSuccess = () => {
    setSuccess(null)
    setState(initialState)
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 relative">
      {success ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-black/80 p-6 text-white shadow-2xl backdrop-blur-md relative">
            <button type="button" aria-label={lang === 'CN' ? '关闭' : 'Close'} onClick={onCloseSuccess} className="absolute right-3 top-3 rounded-md bg-white/10 px-2 py-1 text-white hover:bg-white/20">×</button>
            <div className="text-xl font-semibold">{t.successTitle}</div>
            <div className="mt-2 text-white/80 text-sm">
              {lang === 'CN'
                ? '谢谢您的联系！我们已收到您的咨询并生成案件编号。顾问会在1个工作日内（通常更快）回复您。如需加急，请在留言中补充关键信息，以便我们优先处理。'
                : 'Thanks for reaching out. Your inquiry is received and assigned a case ID. A specialist will review and reply within one business day (often sooner). If it’s time‑sensitive, include any critical context so we can prioritise and guide you to the fastest, safest next step.'}
            </div>
            <div className="mt-3 text-white/70 text-sm">Case ID: <span className="font-mono">{success.id}</span></div>
            <div className="mt-5 text-right">
              <button type="button" onClick={onCloseSuccess} className="inline-flex items-center rounded-lg bg-gold px-4 py-2 text-sm font-medium text-black hover:bg-gold-soft">{lang === 'CN' ? '关闭窗口' : 'Close Window'}</button>
            </div>
          </div>
        </div>
      ) : null}
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
            <div className="w-40 shrink-0">
              <Dropdown
                value={state.phoneCode}
                onChange={(v) => setState(s => ({ ...s, phoneCode: v }))}
                items={[
                  { type: 'heading', label: 'Asia' },
                  { type: 'option', label: 'Malaysia (+60)', value: '+60' },
                  { type: 'option', label: 'Singapore (+65)', value: '+65' },
                  { type: 'option', label: 'Hong Kong (+852)', value: '+852' },
                  { type: 'option', label: 'Macau (+853)', value: '+853' },
                  { type: 'option', label: 'China (+86)', value: '+86' },
                  { type: 'option', label: 'Japan (+81)', value: '+81' },
                  { type: 'option', label: 'South Korea (+82)', value: '+82' },
                  { type: 'option', label: 'Thailand (+66)', value: '+66' },
                  { type: 'option', label: 'Vietnam (+84)', value: '+84' },
                  { type: 'option', label: 'Indonesia (+62)', value: '+62' },
                  { type: 'option', label: 'Philippines (+63)', value: '+63' },
                  { type: 'option', label: 'Laos (+856)', value: '+856' },
                  { type: 'option', label: 'Cambodia (+855)', value: '+855' },
                  { type: 'option', label: 'Myanmar (+95)', value: '+95' },
                  { type: 'option', label: 'Brunei (+673)', value: '+673' },
                  { type: 'option', label: 'India (+91)', value: '+91' },
                  { type: 'option', label: 'Pakistan (+92)', value: '+92' },
                  { type: 'option', label: 'Bangladesh (+880)', value: '+880' },
                  { type: 'option', label: 'Sri Lanka (+94)', value: '+94' },
                  { type: 'option', label: 'Nepal (+977)', value: '+977' },
                  { type: 'option', label: 'Maldives (+960)', value: '+960' },
                  { type: 'heading', label: 'Rest of World' },
                  { type: 'option', label: 'USA/Canada (+1)', value: '+1' },
                  { type: 'option', label: 'UK (+44)', value: '+44' },
                  { type: 'option', label: 'Australia (+61)', value: '+61' },
                  { type: 'option', label: 'New Zealand (+64)', value: '+64' },
                  { type: 'option', label: 'Germany (+49)', value: '+49' },
                  { type: 'option', label: 'France (+33)', value: '+33' },
                  { type: 'option', label: 'Italy (+39)', value: '+39' },
                  { type: 'option', label: 'Spain (+34)', value: '+34' },
                  { type: 'option', label: 'Switzerland (+41)', value: '+41' },
                  { type: 'option', label: 'UAE (+971)', value: '+971' },
                ]}
              />
            </div>
            <select name="phoneCode" value={state.phoneCode} onChange={handleChange} className="hidden">
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

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.country}</label>
          <Dropdown
            value={state.country}
            onChange={(v) => setState(s => ({ ...s, country: v }))}
            items={[
              { type: 'heading', label: lang === 'CN' ? '马来西亚' : 'Malaysia' },
              { type: 'option', label: lang === 'CN' ? '马来西亚' : 'Malaysia', value: 'MY' },
              { type: 'heading', label: lang === 'CN' ? '亚洲' : 'Asia' },
              { type: 'option', label: lang === 'CN' ? '新加坡' : 'Singapore', value: 'SG' },
              { type: 'option', label: lang === 'CN' ? '香港' : 'Hong Kong', value: 'HK' },
              { type: 'option', label: lang === 'CN' ? '澳门' : 'Macau', value: 'MO' },
              { type: 'option', label: lang === 'CN' ? '中国' : 'China', value: 'CN' },
              { type: 'option', label: lang === 'CN' ? '日本' : 'Japan', value: 'JP' },
              { type: 'option', label: lang === 'CN' ? '韩国' : 'South Korea', value: 'KR' },
              { type: 'option', label: lang === 'CN' ? '泰国' : 'Thailand', value: 'TH' },
              { type: 'option', label: lang === 'CN' ? '越南' : 'Vietnam', value: 'VN' },
              { type: 'option', label: lang === 'CN' ? '印度尼西亚' : 'Indonesia', value: 'ID' },
              { type: 'option', label: lang === 'CN' ? '菲律宾' : 'Philippines', value: 'PH' },
              { type: 'option', label: lang === 'CN' ? '老挝' : 'Laos', value: 'LA' },
              { type: 'option', label: lang === 'CN' ? '柬埔寨' : 'Cambodia', value: 'KH' },
              { type: 'option', label: lang === 'CN' ? '缅甸' : 'Myanmar', value: 'MM' },
              { type: 'option', label: lang === 'CN' ? '文莱' : 'Brunei', value: 'BN' },
              { type: 'option', label: lang === 'CN' ? '印度' : 'India', value: 'IN' },
              { type: 'option', label: lang === 'CN' ? '巴基斯坦' : 'Pakistan', value: 'PK' },
              { type: 'option', label: lang === 'CN' ? '孟加拉国' : 'Bangladesh', value: 'BD' },
              { type: 'option', label: lang === 'CN' ? '斯里兰卡' : 'Sri Lanka', value: 'LK' },
              { type: 'option', label: lang === 'CN' ? '尼泊尔' : 'Nepal', value: 'NP' },
              { type: 'option', label: lang === 'CN' ? '马尔代夫' : 'Maldives', value: 'MV' },
              { type: 'option', label: lang === 'CN' ? '阿联酋' : 'United Arab Emirates', value: 'AE' },
              { type: 'heading', label: lang === 'CN' ? '世界其他地区' : 'Rest of World' },
              { type: 'option', label: lang === 'CN' ? '美国' : 'United States', value: 'US' },
              { type: 'option', label: lang === 'CN' ? '加拿大' : 'Canada', value: 'CA' },
              { type: 'option', label: lang === 'CN' ? '英国' : 'United Kingdom', value: 'GB' },
              { type: 'option', label: lang === 'CN' ? '澳大利亚' : 'Australia', value: 'AU' },
              { type: 'option', label: lang === 'CN' ? '新西兰' : 'New Zealand', value: 'NZ' },
              { type: 'option', label: lang === 'CN' ? '德国' : 'Germany', value: 'DE' },
              { type: 'option', label: lang === 'CN' ? '法国' : 'France', value: 'FR' },
              { type: 'option', label: lang === 'CN' ? '意大利' : 'Italy', value: 'IT' },
              { type: 'option', label: lang === 'CN' ? '西班牙' : 'Spain', value: 'ES' },
              { type: 'option', label: lang === 'CN' ? '瑞士' : 'Switzerland', value: 'CH' },
              { type: 'option', label: lang === 'CN' ? '沙特阿拉伯' : 'Saudi Arabia', value: 'SA' },
              { type: 'option', label: lang === 'CN' ? '卡塔尔' : 'Qatar', value: 'QA' },
              { type: 'option', label: lang === 'CN' ? '科威特' : 'Kuwait', value: 'KW' },
              { type: 'option', label: lang === 'CN' ? '阿曼' : 'Oman', value: 'OM' },
              { type: 'option', label: lang === 'CN' ? '巴林' : 'Bahrain', value: 'BH' },
            ]}
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.state}</label>
          <Dropdown
            value={state.malaysiaState || ''}
            onChange={(v) => setState(s => ({ ...s, malaysiaState: v }))}
            disabled={state.country !== 'MY'}
            placeholder={lang === 'CN' ? '请选择州属' : 'Select state'}
            items={[
              { type: 'option', label: lang === 'CN' ? '柔佛' : 'Johor', value: 'Johor' },
              { type: 'option', label: lang === 'CN' ? '吉打' : 'Kedah', value: 'Kedah' },
              { type: 'option', label: lang === 'CN' ? '吉兰丹' : 'Kelantan', value: 'Kelantan' },
              { type: 'option', label: lang === 'CN' ? '马六甲' : 'Melaka', value: 'Melaka' },
              { type: 'option', label: lang === 'CN' ? '森美兰' : 'Negeri Sembilan', value: 'Negeri Sembilan' },
              { type: 'option', label: lang === 'CN' ? '彭亨' : 'Pahang', value: 'Pahang' },
              { type: 'option', label: lang === 'CN' ? '霹雳' : 'Perak', value: 'Perak' },
              { type: 'option', label: lang === 'CN' ? '玻璃市' : 'Perlis', value: 'Perlis' },
              { type: 'option', label: lang === 'CN' ? '槟城（槟榔屿）' : 'Penang (Pulau Pinang)', value: 'Penang (Pulau Pinang)' },
              { type: 'option', label: lang === 'CN' ? '沙巴' : 'Sabah', value: 'Sabah' },
              { type: 'option', label: lang === 'CN' ? '砂拉越' : 'Sarawak', value: 'Sarawak' },
              { type: 'option', label: lang === 'CN' ? '雪兰莪' : 'Selangor', value: 'Selangor' },
              { type: 'option', label: lang === 'CN' ? '登嘉楼' : 'Terengganu', value: 'Terengganu' },
              { type: 'option', label: lang === 'CN' ? '吉隆坡' : 'Kuala Lumpur', value: 'Kuala Lumpur' },
              { type: 'option', label: lang === 'CN' ? '纳闽' : 'Labuan', value: 'Labuan' },
              { type: 'option', label: lang === 'CN' ? '布城' : 'Putrajaya', value: 'Putrajaya' },
            ]}
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.topic}</label>
          <Dropdown
            value={state.topic}
            onChange={(v) => setState(s => ({ ...s, topic: v }))}
            items={topicItems}
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.budget}</label>
          <Dropdown
            value={state.budget}
            onChange={(v) => setState(s => ({ ...s, budget: v }))}
            items={[
              { type: 'option', label: lang === 'CN' ? '未指定' : 'Not specified', value: '' },
              { type: 'option', label: '< RM 1k', value: '<1k' },
              { type: 'option', label: 'RM 1-5k', value: '1-5k' },
              { type: 'option', label: 'RM 5-15k', value: '5-15k' },
              { type: 'option', label: lang === 'CN' ? 'RM 15k 以上' : 'RM 15k+', value: '>15k' },
            ]}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-white/80 mb-1">{t.timeline}</label>
          <Dropdown
            value={state.timeline}
            onChange={(v) => setState(s => ({ ...s, timeline: v }))}
            items={[
              { type: 'option', label: lang === 'CN' ? '立即' : 'Immediate', value: 'Immediate' },
              { type: 'option', label: lang === 'CN' ? '1-3 个月' : '1-3 months', value: '1-3 months' },
              { type: 'option', label: lang === 'CN' ? '3-6 个月' : '3-6 months', value: '3-6 months' },
            ]}
          />
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
