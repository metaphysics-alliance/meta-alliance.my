import { createClient } from 'npm:@supabase/supabase-js'

interface RateResponse {
  result: string
  rates?: Record<string, number>
  time_last_update_utc?: string
  error_type?: string
}

function assertEnv(key: string): string {
  const value = Deno.env.get(key)
  if (!value) {
    throw new Error(`Missing required environment variable ${key}`)
  }
  return value
}

function getServiceRoleKey(): string {
  const value = Deno.env.get('SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!value) {
    throw new Error('Missing SERVICE_ROLE_KEY (or SUPABASE_SERVICE_ROLE_KEY) secret')
  }
  return value
}

function parsePair(rawPair: string | undefined) {
  const pair = (rawPair || 'USD/MYR').toUpperCase().trim()
  const [base, quote] = pair.split('/')
  if (!base || !quote) {
    throw new Error(`Invalid currency pair "${rawPair}". Expected BASE/QUOTE, e.g. USD/MYR`)
  }
  return { pair, base, quote }
}

function buildSupabaseClient(serviceRoleKey: string) {
  const url = assertEnv('SUPABASE_URL')
  return createClient(url, serviceRoleKey)
}

async function fetchRate(base: string, quote: string) {
  const endpoint = `https://open.er-api.com/v6/latest/${base}`
  const response = await fetch(endpoint, { headers: { Accept: 'application/json' } })
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint} (${response.status} ${response.statusText})`)
  }

  const payload = (await response.json()) as RateResponse
  if (payload.result !== 'success' || !payload.rates) {
    throw new Error(`Exchange API error: ${payload.error_type ?? 'unknown error'}`)
  }

  const rate = payload.rates[quote]
  if (typeof rate !== 'number') {
    throw new Error(`No rate found for ${base}/${quote}`)
  }

  const capturedAt = payload.time_last_update_utc
    ? new Date(payload.time_last_update_utc).toISOString()
    : new Date().toISOString()

  return { rate, capturedAt, source: 'open.er-api.com', payload }
}

function getDayBounds(timestamp: string) {
  const start = new Date(timestamp)
  start.setUTCHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setUTCDate(end.getUTCDate() + 1)
  return { start: start.toISOString(), end: end.toISOString() }
}

async function upsertRate(client: ReturnType<typeof createClient>, pair: string, rate: number, capturedAt: string, source: string) {
  const { start, end } = getDayBounds(capturedAt)

  const { error: deleteError } = await client
    .from('currency_rates')
    .delete()
    .eq('pair', pair)
    .gte('captured_at', start)
    .lt('captured_at', end)

  if (deleteError && deleteError.code !== 'PGRST116') {
    throw deleteError
  }

  const { error: insertError } = await client.from('currency_rates').insert({
    pair,
    rate,
    captured_at: capturedAt,
    source,
  })

  if (insertError) {
    throw insertError
  }
}

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}))
    const { pair, base, quote } = parsePair(body?.pair || 'USD/MYR')

    const serviceKey = getServiceRoleKey()
    const client = buildSupabaseClient(serviceKey)

    const { rate, capturedAt, source } = await fetchRate(base, quote)
    await upsertRate(client, pair, rate, capturedAt, source)

    return new Response(
      JSON.stringify({
        success: true,
        pair,
        rate,
        capturedAt,
        source,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('sync-exchange-rate error', error)
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
