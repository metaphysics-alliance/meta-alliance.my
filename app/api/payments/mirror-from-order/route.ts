import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

if (!supabaseUrl || !serviceRoleKey) {
  console.warn(
    '[payments/mirror-from-order] Missing SUPABASE URL or SERVICE ROLE key. Payment mirroring will fail.',
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

export async function POST(req: Request) {
  if (!serverSupabase) {
    return NextResponse.json(
      { error: 'Server misconfigured: missing Supabase service role credentials' },
      { status: 500, headers: corsHeaders as any },
    )
  }

  try {
    const body = await req.json().catch(() => null)
    const magicToken = body?.magicToken as string | undefined
    const userId = body?.userId as string | undefined

    if (!magicToken || !userId) {
      return NextResponse.json(
        { error: 'Missing magicToken or userId' },
        { status: 400, headers: corsHeaders as any },
      )
    }

    // Ensure Public Users/Profile rows exist so FK constraints pass
    const ensureUserRows = async (order: any) => {
      // public.users (Tools ledger users table)
      const { data: userRow } = await serverSupabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .maybeSingle()

      if (!userRow) {
        const insertUser = {
          id: userId,
          email: order?.guest_email,
          status: 'active',
          role: 'client',
          locale: 'EN',
        }
        const { error: userInsertError } = await serverSupabase
          .from('users')
          .insert([insertUser])
        if (userInsertError) {
          console.warn(
            '[payments/mirror-from-order] Unable to upsert users row (continuing):',
            userInsertError,
          )
        }
      }

      // public.user_profiles (Tools profile table uses user_id column)
      const { data: profileRow } = await serverSupabase
        .from('user_profiles')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle()

      if (!profileRow) {
        const insertProfile = {
          user_id: userId,
          full_name: order?.guest_name || order?.guest_email || 'Customer',
          profile_state: 'draft',
          completion_pct: 0,
        }
        const { error: profileInsertError } = await serverSupabase
          .from('user_profiles')
          .insert([insertProfile])
        if (profileInsertError) {
          console.warn(
            '[payments/mirror-from-order] Unable to upsert user_profiles row (continuing):',
            profileInsertError,
          )
        }
      }
    }

    // 1) Load succeeded guest order by magic_link_token
    const { data: order, error: orderError } = await serverSupabase
      .from('guest_orders')
      .select('*')
      .eq('magic_link_token', magicToken)
      .eq('payment_status', 'succeeded')
      .single()

    if (orderError || !order) {
      console.error('[payments/mirror-from-order] Order lookup failed:', orderError)
      return NextResponse.json(
        { error: 'order_not_found' },
        { status: 404, headers: corsHeaders as any },
      )
    }

    // Ensure FK tables have a user row before inserting payments
    await ensureUserRows(order)

    // 2) Attempt to find a related user_subscriptions row (MVP side)
    const { data: userSubs, error: subsError } = await serverSupabase
      .from('user_subscriptions')
      .select('id, status, started_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)

    if (subsError) {
      console.warn(
        '[payments/mirror-from-order] Failed to load user_subscriptions:',
        subsError,
      )
    }

    const subscription =
      userSubs && userSubs.length > 0 ? userSubs[0] : null

    // 3) Insert into public.payments (Tools payments ledger)
    const amount =
      order.currency === 'USD'
        ? order.total_usd ?? null
        : order.total_myr ?? null

    if (amount == null) {
      console.warn(
        '[payments/mirror-from-order] Order has no numeric total_myr/total_usd; skipping payments insert.',
      )
      return NextResponse.json(
        { error: 'no_amount', note: 'Order missing total_myr/total_usd' },
        { status: 400, headers: corsHeaders as any },
      )
    }

    const paymentPayload: any = {
      user_id: userId,
      subscription_id: subscription?.id ?? null,
      amount,
      currency: order.currency || 'MYR',
      payment_method: order.payment_method || 'card',
      payment_gateway: 'stripe',
      transaction_id: order.payment_provider_id || null,
      gateway_reference: order.payment_provider_id || null,
      status: 'completed',
      paid_at: new Date().toISOString(),
      metadata: {
        guest_order_id: order.id,
        magic_link_token: magicToken,
      },
    }

    const { data: payment, error: paymentError } = await serverSupabase
      .from('payments')
      .insert([paymentPayload])
      .select('id')
      .single()

    if (paymentError || !payment) {
      console.error(
        '[payments/mirror-from-order] Failed to insert payments row:',
        paymentError,
      )
      return NextResponse.json(
        { error: 'payments_insert_failed' },
        { status: 500, headers: corsHeaders as any },
      )
    }

    // 4) (Future) Write to account_sync / subscription_sync_log once Master-side mapping is defined

    return NextResponse.json(
      { status: 'mirrored', paymentId: payment.id },
      { status: 200, headers: corsHeaders as any },
    )
  } catch (err: any) {
    console.error('[payments/mirror-from-order] Unexpected error:', err)
    return NextResponse.json(
      { error: 'server_error', details: err?.message || String(err) },
      { status: 500, headers: corsHeaders as any },
    )
  }
}
