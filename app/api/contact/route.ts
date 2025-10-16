import { NextResponse } from 'next/server'

// Allow CORS for Vite dev (5173) and other origins when needed
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders as any })
}

export async function GET() {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@meta-alliance.my'
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@meta-alliance.my'
  return NextResponse.json(
    {
      ok: true,
      health: {
        resendConfigured: !!RESEND_API_KEY,
        emailFromConfigured: !!EMAIL_FROM,
        adminConfigured: !!ADMIN_EMAIL,
      },
    },
    { headers: corsHeaders as any },
  )
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      to,
      from,
      fromEmail,
      replyTo,
      subject,
      name,
      email,
      phone,
      companyRole,
      country,
      malaysiaState,
      topic,
      budget,
      timeline,
      message,
      id,
      locale,
    } = body || {}

    const TO = (to as string) || process.env.NEXT_PUBLIC_EMAIL_SALES || 'sales@meta-alliance.my'
    // Always send from a verified domain address to avoid rejection
    const FROM = process.env.EMAIL_FROM || 'no-reply@meta-alliance.my'
    // Keep the visitor's email in Reply-To so replies go to them
    const REPLY_TO = (replyTo as string) || (email as string) || (from as string) || (fromEmail as string) || undefined
    const SUBJECT = (subject as string) || `[${id || 'NO-ID'}] ${topic || 'Contact'} Inquiry — ${name || 'Visitor'}`

    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders as any })
    }

    const text = `Case ID: ${id || '-'}\nLocale: ${locale || '-'}\n\nName: ${name || '-'}\nEmail: ${email || '-'}\nPhone: ${phone || '-'}\nCompany/Role: ${companyRole || '-'}\nCountry: ${country || '-'}${malaysiaState ? `\nState: ${malaysiaState}` : ''}\nTopic: ${topic || '-'}\nBudget: ${budget || '-'}\nTimeline: ${timeline || '-'}\n\nMessage:\n${message || '-'}\n`

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@meta-alliance.my'
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: 'Email service not configured (RESEND_API_KEY missing)' },
        { status: 501, headers: corsHeaders as any }
      )
    }

    // Send email via Resend API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: Array.isArray(TO) ? TO : [TO],
        subject: SUBJECT,
        text,
        reply_to: REPLY_TO,
        bcc: ADMIN_EMAIL ? [ADMIN_EMAIL] : undefined,
      }),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      return NextResponse.json({ ok: false, error: `Email send failed: ${res.status} ${errText}` }, { status: 502, headers: corsHeaders as any })
    }

    const json = await res.json().catch(() => ({}))
    return NextResponse.json({ ok: true, id, provider: 'resend', result: json }, { headers: corsHeaders as any })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Unexpected error' }, { status: 500, headers: corsHeaders as any })
  }
}
