import 'server-only'

type ServicePricingRow = {
  service_id: string
  service_name: string
  price_myr: number | null
  price_usd: number | null
  updated_at?: string | null
}

type ServicePricingRateRow = {
  rate_key: string
  rate: number | null
  captured_at: string | null
  updated_at?: string | null
}

const SUPABASE_URL =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.VITE_SUPABASE_URL ??
  ''

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.VITE_SUPABASE_ANON_KEY ??
  ''

const DEFAULT_HEADERS: HeadersInit = SUPABASE_KEY
  ? {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    }
  : {
      'Content-Type': 'application/json',
    }

export async function fetchServicePricingRows(): Promise<ServicePricingRow[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn('Supabase environment variables are missing; returning empty service pricing set.')
    return []
  }

  const endpoint = `${SUPABASE_URL}/rest/v1/service_pricing?select=service_id,service_name,price_myr,price_usd,updated_at`
  const response = await fetch(endpoint, {
    headers: DEFAULT_HEADERS,
    cache: 'no-store',
  })

  if (!response.ok) {
    console.error('Failed to fetch service_pricing rows:', response.status, response.statusText)
    return []
  }

  const data = (await response.json()) as ServicePricingRow[]
  return Array.isArray(data) ? data : []
}

export async function fetchLatestServicePricingRate(): Promise<ServicePricingRateRow | null> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return null
  }

  const endpoint = `${SUPABASE_URL}/rest/v1/service_pricing_rates?rate_key=eq.MYR_USD&select=rate_key,rate,captured_at,updated_at&limit=1`
  const response = await fetch(endpoint, {
    headers: DEFAULT_HEADERS,
    cache: 'no-store',
  })

  if (!response.ok) {
    console.error('Failed to fetch service_pricing_rates row:', response.status, response.statusText)
    return null
  }

  const data = (await response.json()) as ServicePricingRateRow[]
  if (!Array.isArray(data) || !data.length) {
    return null
  }
  return data[0] ?? null
}

export type { ServicePricingRow, ServicePricingRateRow }
