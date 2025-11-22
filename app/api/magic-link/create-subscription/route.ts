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
    '[magic-link/create-subscription] Missing SUPABASE URL or SERVICE ROLE key. Subscription creation will fail.',
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
    const token = body?.token as string | undefined
    const userId = body?.userId as string | undefined

    if (!token || !userId) {
      return NextResponse.json(
        { error: 'Missing token or userId' },
        { status: 400, headers: corsHeaders as any },
      )
    }

    // 1) Load guest order by magic_link_token
    const { data: order, error: orderError } = await serverSupabase
      .from('guest_orders')
      .select('*')
      .eq('magic_link_token', token)
      .single()

    if (orderError || !order) {
      console.error('[magic-link/create-subscription] Order lookup failed:', orderError)
      return NextResponse.json(
        { error: 'order_not_found' },
        { status: 404, headers: corsHeaders as any },
      )
    }

    if (order.payment_status !== 'succeeded') {
      return NextResponse.json(
        { error: 'payment_not_succeeded' },
        { status: 400, headers: corsHeaders as any },
      )
    }

    // 2) Ensure guest_orders.user_id is linked (best-effort)
    if (!order.user_id || order.user_id !== userId) {
      const { error: linkError } = await serverSupabase
        .from('guest_orders')
        .update({
          user_id: userId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id)

      if (linkError) {
        console.warn(
          '[magic-link/create-subscription] Failed to link guest_orders.user_id:',
          linkError,
        )
      }
    }

    // 3) If user_subscriptions already exists, do nothing (idempotent)
    const { data: existingSub, error: existingError } = await serverSupabase
      .from('user_subscriptions')
      .select('id')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle()

    if (existingError) {
      console.warn(
        '[magic-link/create-subscription] Failed to check existing subscriptions:',
        existingError,
      )
    }

    if (existingSub) {
      return NextResponse.json(
        { status: 'already_exists', subscriptionId: existingSub.id },
        { status: 200, headers: corsHeaders as any },
      )
    }

    // 4) Pick a plan from subscription_plans (essential -> advanced -> supreme)
    const { data: plans, error: plansError } = await serverSupabase
      .from('subscription_plans')
      .select('id, plan_code')
      .in('plan_code', ['essential', 'advanced', 'supreme'])

    if (plansError || !plans || plans.length === 0) {
      console.warn(
        '[magic-link/create-subscription] No suitable subscription_plans found:',
        plansError,
      )
      return NextResponse.json(
        { error: 'no_plans_available' },
        { status: 500, headers: corsHeaders as any },
      )
    }

    const preferredOrder = ['essential', 'advanced', 'supreme']
    let selected =
      plans.find((p) => p.plan_code === preferredOrder[0]) ||
      plans.find((p) => p.plan_code === preferredOrder[1]) ||
      plans[0]

    // 5) Create user_subscriptions record
    const { data: created, error: userSubError } = await serverSupabase
      .from('user_subscriptions')
      .insert([
        {
          user_id: userId,
          plan_id: selected.id,
          status: 'active',
          started_at: new Date().toISOString(),
          auto_renew: false,
          metadata: {
            guest_order_id: order.id,
            magic_link_token: token,
          },
        } as any,
      ])
      .select('id')
      .single()

    if (userSubError || !created) {
      console.error(
        '[magic-link/create-subscription] Failed to create user_subscriptions record:',
        userSubError,
      )
      return NextResponse.json(
        { error: 'user_subscription_failed' },
        { status: 500, headers: corsHeaders as any },
      )
    }

    return NextResponse.json(
      { status: 'created', subscriptionId: created.id },
      { status: 200, headers: corsHeaders as any },
    )
  } catch (err: any) {
    console.error('[magic-link/create-subscription] Unexpected error:', err)
    return NextResponse.json(
      { error: 'server_error', details: err?.message || String(err) },
      { status: 500, headers: corsHeaders as any },
    )
  }
}

