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

function buildSupabaseClient(serviceRoleKey: string) {
  const url = assertEnv('SUPABASE_URL')
  return createClient(url, serviceRoleKey)
}

async function fetchMyrUsdRate() {
  const endpoint = 'https://open.er-api.com/v6/latest/MYR'
  const response = await fetch(endpoint, { headers: { Accept: 'application/json' } })
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint} (${response.status} ${response.statusText})`)
  }

  const payload = (await response.json()) as RateResponse
  if (payload.result !== 'success' || !payload.rates) {
    throw new Error(`Exchange API error: ${payload.error_type ?? 'unknown error'}`)
  }

  const usd = payload.rates['USD']
  if (typeof usd !== 'number') {
    throw new Error('No USD rate returned for MYR/USD')
  }

  return {
    rate: usd,
    capturedAt: payload.time_last_update_utc
      ? new Date(payload.time_last_update_utc).toISOString()
      : new Date().toISOString(),
  }
}

interface PricingRow {
  service_id: string
  service_name: string | null
  price_myr: number | null
}

const FX_RATE_KEY = 'MYR_USD'

function roundToCents(value: number) {
  return Math.round(value * 100) / 100
}

async function storeRate(
  client: ReturnType<typeof createClient>,
  rate: number,
  capturedAt: string,
) {
  const now = new Date().toISOString()
  const { error } = await client.from('service_pricing_rates').upsert(
    [
      {
        rate_key: FX_RATE_KEY,
        rate,
        captured_at: capturedAt,
        updated_at: now,
      },
    ],
    { onConflict: 'rate_key' },
  )

  if (error) {
    throw error
  }
}

async function updatePricing(client: ReturnType<typeof createClient>, rate: number) {
  const { data, error } = await client
    .from<PricingRow>('service_pricing')
    .select('service_id, service_name, price_myr')

  if (error) {
    throw error
  }

  const rows = (data ?? []).filter(
    (row): row is PricingRow & { price_myr: number } =>
      typeof row.price_myr === 'number' && row.service_name !== null,
  )

  if (rows.length === 0) {
    return { updated: 0 }
  }

  const timestamp = new Date().toISOString()
  const updates = rows.map((row) => ({
    service_id: row.service_id,
    service_name: row.service_name,
    price_myr: row.price_myr,
    price_usd: roundToCents(row.price_myr * rate),
    updated_at: timestamp,
  }))

  const { error: upsertError } = await client
    .from('service_pricing')
    .upsert(updates, { onConflict: 'service_id' })

  if (upsertError) {
    throw upsertError
  }

  return { updated: rows.length }
}

Deno.serve(async () => {
  try {
    const { rate, capturedAt } = await fetchMyrUsdRate()

    const serviceRoleKey = getServiceRoleKey()
    const client = buildSupabaseClient(serviceRoleKey)

    await storeRate(client, rate, capturedAt)
    const { updated } = await updatePricing(client, rate)

    return new Response(
      JSON.stringify({
        success: true,
        rate,
        capturedAt,
        rateKey: FX_RATE_KEY,
        updated,
        message: 'service_pricing price_usd values updated',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('update-pricing-usd error', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
