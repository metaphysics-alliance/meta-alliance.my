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

async function updatePricing(client: ReturnType<typeof createClient>, rate: number) {
  const { error } = await client.rpc('update_service_pricing_usd', { conversion_rate: rate })
  if (error) {
    throw error
  }
}

Deno.serve(async () => {
  try {
    const { rate, capturedAt } = await fetchMyrUsdRate()

    const serviceRoleKey = getServiceRoleKey()
    const client = buildSupabaseClient(serviceRoleKey)

    await updatePricing(client, rate)

    return new Response(
      JSON.stringify({
        success: true,
        rate,
        capturedAt,
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
