export interface Env {
  RECAPTCHA_SECRET?: string
  TURNSTILE_SECRET?: string
  MAILCHANNELS_FROM_EMAIL?: string
  MAILCHANNELS_FROM_NAME?: string
  SALES_EMAIL?: string
  SUPPORT_EMAIL?: string
  MEDIA_EMAIL?: string
  RATE_LIMIT?: KVNamespace
  RATE_LIMIT_MAX?: string
  RATE_LIMIT_WINDOW?: string
}

type Payload = {
  id: string
  name: string
  email: string
  phone?: string
  companyRole?: string
  country?: string
  topic?: 'Sales' | 'Partnership' | 'Media' | 'Other'
  budget?: string
  timeline?: string
  message: string
  consent?: boolean
  locale?: string
  hp?: string
  recaptchaToken?: string
  turnstileToken?: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: corsHeaders })

    let data: Payload
    try {
      data = await request.json() as Payload
    } catch {
      return json({ error: 'Invalid JSON' }, 400)
    }

    // Honeypot: silently "succeed"
    if (data.hp) return json({ ok: true, id: data.id || '' })

    const ip = request.headers.get('cf-connecting-ip')
      || request.headers.get('x-forwarded-for')
      || 'unknown'

    // Rate limiting via KV (best-effort)
    const limit = parseInt(env.RATE_LIMIT_MAX || '5', 10)
    const windowSec = parseInt(env.RATE_LIMIT_WINDOW || '300', 10)
    if (env.RATE_LIMIT) {
      const key = `ip:${ip}`
      const currentRaw = await env.RATE_LIMIT.get(key)
      const cur = parseInt(currentRaw || '0', 10)
      if (cur >= limit) return json({ error: 'Rate limited' }, 429)
      const next = String(cur + 1)
      // Set/update with TTL (not atomic, acceptable for low volume)
      await env.RATE_LIMIT.put(key, next, { expirationTtl: windowSec })
    }

    // Verify Captcha (reCAPTCHA or Turnstile) if configured
    if (env.TURNSTILE_SECRET || env.RECAPTCHA_SECRET) {
      let verified = false
      // Prefer Turnstile if token present
      if (!verified && env.TURNSTILE_SECRET && data.recaptchaToken == null) {
        verified = await verifyTurnstile(env.TURNSTILE_SECRET, data.turnstileToken || '', ip)
      }
      if (!verified && env.RECAPTCHA_SECRET) {
        verified = await verifyRecaptcha(env.RECAPTCHA_SECRET, data.recaptchaToken || '', ip)
      }
      if (!verified && env.TURNSTILE_SECRET) {
        verified = await verifyTurnstile(env.TURNSTILE_SECRET, data.turnstileToken || '', ip)
      }
      if (!verified) return json({ error: 'Captcha failed' }, 400)
    }

    // Determine destination
    const to = resolveToEmail(env, data.topic)
    const caseId = data.id || generateCaseId()

    // Send to team
    const teamSubject = `[${caseId}] ${data.topic || 'Inquiry'} — ${data.name}`
    const teamText = renderTeamText(data, caseId)
    const teamHtml = renderTeamHtml(data, caseId)
    const teamRes = await sendMail(env, to, teamSubject, teamText, teamHtml)
    if (!teamRes.ok) return json({ error: 'Mail send failed (team)' }, 500)

    // Auto-reply to visitor
    if (data.email) {
      const autoSubject = (data.locale === 'CN')
        ? `确认：我们已收到您的咨询（${caseId}）`
        : `Confirmation: We received your inquiry (${caseId})`
      const autoText = renderAutoText(data, caseId)
      const autoHtml = renderAutoHtml(data, caseId)
      await sendMail(env, { email: data.email, name: data.name || 'Visitor' }, autoSubject, autoText, autoHtml)
    }

    return json({ ok: true, id: caseId })
  }
} satisfies ExportedHandler<Env>

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders },
  })
}

async function verifyRecaptcha(secret: string, token: string, ip: string | null): Promise<boolean> {
  try {
    if (!token) return false
    const params = new URLSearchParams()
    params.set('secret', secret)
    params.set('response', token)
    if (ip) params.set('remoteip', ip)
    const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
    const jsonData: unknown = await resp.json()
    const result = jsonData as { success?: boolean, score?: number }
    if (!result.success) return false
    if (typeof result.score === 'number' && result.score < 0.5) return false
    return true
  } catch {
    return false
  }
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  try {
    if (!token) return false
    const form = new FormData()
    form.append('secret', secret)
    form.append('response', token)
    if (ip) form.append('remoteip', ip)
    const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    })
    const jsonData: unknown = await resp.json()
    const result = jsonData as { success?: boolean }
    return !!result.success
  } catch {
    return false
  }
}

function resolveToEmail(env: Env, topic?: Payload['topic']): { email: string, name?: string } {
  const sales = env.SALES_EMAIL || 'sales@meta-alliance.my'
  const support = env.SUPPORT_EMAIL || 'support@meta-alliance.my'
  const media = env.MEDIA_EMAIL || 'press@meta-alliance.my'
  if (topic === 'Media' || topic === 'Partnership') return { email: media, name: 'Media/Partnerships' }
  if (topic === 'Sales') return { email: sales, name: 'Sales' }
  return { email: support, name: 'Support' }
}

async function sendMail(env: Env, to: { email: string, name?: string }, subject: string, text: string, html: string) {
  const fromEmail = env.MAILCHANNELS_FROM_EMAIL || 'no-reply@meta-alliance.my'
  const fromName = env.MAILCHANNELS_FROM_NAME || 'Metaphysics Alliance'
  const payload = {
    personalizations: [
      { to: [{ email: to.email, name: to.name || to.email }] }
    ],
    from: { email: fromEmail, name: fromName },
    subject,
    content: [
      { type: 'text/plain', value: text },
      { type: 'text/html', value: html },
    ],
  }
  return fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

function generateCaseId(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `MA-${ts}-${rnd}`
}

function esc(s?: string){
  return (s || '').replace(/[<>]/g, '')
}

function renderTeamText(d: Payload, id: string){
  return [
    `New inquiry (${id})`,
    '',
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || ''}`,
    `Company/Role: ${d.companyRole || ''}`,
    `Country: ${d.country || ''}`,
    `Topic: ${d.topic || ''}`,
    `Budget: ${d.budget || ''}`,
    `Timeline: ${d.timeline || ''}`,
    '',
    'Message:',
    d.message,
  ].join('\n')
}

function renderTeamHtml(d: Payload, id: string){
  return `<!doctype html><html><body>
    <h2>New inquiry (${id})</h2>
    <ul>
      <li><b>Name:</b> ${esc(d.name)}</li>
      <li><b>Email:</b> ${esc(d.email)}</li>
      <li><b>Phone:</b> ${esc(d.phone)}</li>
      <li><b>Company/Role:</b> ${esc(d.companyRole)}</li>
      <li><b>Country:</b> ${esc(d.country)}</li>
      <li><b>Topic:</b> ${esc(d.topic)}</li>
      <li><b>Budget:</b> ${esc(d.budget)}</li>
      <li><b>Timeline:</b> ${esc(d.timeline)}</li>
    </ul>
    <p><b>Message</b></p>
    <pre style="white-space:pre-wrap">${esc(d.message)}</pre>
  </body></html>`
}

function renderAutoText(d: Payload, id: string){
  if (d.locale === 'CN'){
    return [
      '我们已收到您的咨询，以下为摘要：',
      '',
      `案件编号：${id}`,
      `姓名：${d.name}`,
      `主题：${d.topic || ''}`,
      '',
      '我们通常在1个工作日内回复。谢谢！',
    ].join('\n')
  }
  return [
    'We’ve received your inquiry. Summary below:',
    '',
    `Case ID: ${id}`,
    `Name: ${d.name}`,
    `Topic: ${d.topic || ''}`,
    '',
    'We typically reply within 1 business day. Thank you!',
  ].join('\n')
}

function renderAutoHtml(d: Payload, id: string){
  if (d.locale === 'CN'){
    return `<!doctype html><html><body>
      <h2>确认：我们已收到您的咨询</h2>
      <p><b>案件编号：</b> ${id}</p>
      <p><b>姓名：</b> ${esc(d.name)}</p>
      <p><b>主题：</b> ${esc(d.topic || '')}</p>
      <p>我们通常在1个工作日内回复。谢谢！</p>
    </body></html>`
  }
  return `<!doctype html><html><body>
    <h2>Confirmation: We received your inquiry</h2>
    <p><b>Case ID:</b> ${id}</p>
    <p><b>Name:</b> ${esc(d.name)}</p>
    <p><b>Topic:</b> ${esc(d.topic || '')}</p>
    <p>We typically reply within 1 business day. Thank you!</p>
  </body></html>`
}
