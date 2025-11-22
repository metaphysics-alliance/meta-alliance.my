import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

if (!supabaseUrl || !serviceRoleKey) {
  console.warn(
    '[magic-link/resolve] Missing SUPABASE URL or SERVICE ROLE key. Magic link resolution will fail.',
  )
}

const serverSupabase =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders as any })
}

export async function GET(req: Request) {
  if (!serverSupabase) {
    console.error('[magic-link/resolve] Server misconfigured: missing Supabase service role credentials')
    return NextResponse.json(
      { error: 'Server misconfigured: missing Supabase service role credentials' },
      { status: 500, headers: corsHeaders as any },
    )
  }

  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    console.warn('[magic-link/resolve] Missing token in request')
    return NextResponse.json(
      { error: 'Missing token' },
      { status: 400, headers: corsHeaders as any },
    )
  }

  try {
    console.log(`[magic-link/resolve] Resolving token=${token}`)
    const { data, error } = await serverSupabase
      .from('guest_orders')
      .select('*')
      .eq('magic_link_token', token)
      .single()

    if (error || !data) {
      console.error('[magic-link/resolve] Failed to resolve token:', error)
      return NextResponse.json(
        { error: 'invalid_or_expired' },
        { status: 404, headers: corsHeaders as any },
      )
    }

    console.log(
      `[magic-link/resolve] Success for token=${token} order=${data.id} status=${data.payment_status}`,
    )

    return NextResponse.json(
      {
        order: data,
      },
      { status: 200, headers: corsHeaders as any },
    )
  } catch (err: any) {
    console.error('[magic-link/resolve] Unexpected error:', err)
    return NextResponse.json(
      { error: 'server_error', details: err?.message || String(err) },
      { status: 500, headers: corsHeaders as any },
    )
  }
}
