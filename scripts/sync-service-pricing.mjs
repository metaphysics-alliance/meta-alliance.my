#!/usr/bin/env node
  import { createHash } from 'crypto'
  import { createClient } from '@supabase/supabase-js'
  import { readFileSync } from 'fs'
  import { resolve } from 'path'

  import { dictionary } from '../shared/i18n/dictionary.js'

  function loadEnv(path = '.env.local') {
    try {
      const content = readFileSync(resolve(path), 'utf8')
      content
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
        .forEach((line) => {
          const idx = line.indexOf('=')
          if (idx === -1) return
          const key = line.slice(0, idx).trim()
          let value = line.slice(idx + 1).trim()
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          if (!process.env[key]) process.env[key] = value
        })
    } catch (err) {
      console.warn(`Could not read ${path}:`, err.message)
    }
  }

  loadEnv()

  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local')
    process.exit(1)
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  function normalizeKey(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[\u2018\u2019\u201C\u201D'"]/g, '')
      .replace(/[^a-z0-9/ -]/g, '')
      .trim()
  }

  function buildServiceId(name) {
    const slug = normalizeKey(name).replace(/[^a-z0-9]+/g, '-').toUpperCase()
    const hash = createHash('sha1').update(name).digest('hex').slice(0, 6).toUpperCase()
    return `MA-${slug}-${hash}`
  }

  function extractMyr(price) {
    if (!price) return null
    const text = String(price)
    if (!/RM|MYR/i.test(text)) return null
    const match = text.match(/([\d.,]+)/)
    if (!match) return null
    const value = Number(match[1].replace(/[^\d.]/g, ''))
    return Number.isFinite(value) ? value : null
  }

  function collectPricing(locale = 'EN') {
    const pricing = dictionary[locale]?.pricing ?? {}
    const categories = Array.isArray(pricing.categories) ? pricing.categories : []
    const addOns = Array.isArray(pricing.addOns) ? pricing.addOns : []
    const services = []

    categories.forEach((category) => {
      const tiers = Array.isArray(category?.tiers) ? category.tiers : []
      tiers.forEach((tier) => {
        if (!tier?.name) return
        services.push({
          service_id: buildServiceId(tier.name),
          service_name: tier.name,
          service_group: category?.title ?? category?.key ?? null,
          price_myr: extractMyr(tier.price),
        })
      })
    })

    addOns.forEach((addOn) => {
      if (!addOn?.name) return
      services.push({
        service_id: buildServiceId(addOn.name),
        service_name: addOn.name,
        service_group: pricing?.addOnsTitle ?? 'Add-ons',
        price_myr: extractMyr(addOn.price),
      })
    })

    return services
  }

  async function fetchRate() {
    const { data, error } = await supabase
      .from('service_pricing_rates')
      .select('rate')
      .eq('rate_key', 'MYR_USD')
      .limit(1)
      .maybeSingle()

    if (error && error.code !== 'PGRST116') throw error
    if (data?.rate) return Number(data.rate)

    const response = await fetch('https://open.er-api.com/v6/latest/MYR')
    if (!response.ok) throw new Error(`FX API failed: ${response.status}`)
    const payload = await response.json()
    const rate = Number(payload?.rates?.USD)
    if (!Number.isFinite(rate)) throw new Error('FX API did not return USD rate')

    const capturedAt = payload.time_last_update_utc
      ? new Date(payload.time_last_update_utc).toISOString()
      : new Date().toISOString()

    await supabase.from('service_pricing_rates').upsert(
      [
        {
          rate_key: 'MYR_USD',
          rate,
          captured_at: capturedAt,
          updated_at: new Date().toISOString(),
        },
      ],
      { onConflict: 'rate_key' },
    )

    return rate
  }

  async function main() {
    const desired = collectPricing('EN')
    const rate = await fetchRate()

    const { data: existing, error } = await supabase
      .from('service_pricing')
      .select('service_id, service_name, price_myr, price_usd')

    if (error) throw error

    const map = new Map((existing ?? []).map((row) => [row.service_id, row]))
    const upserts = []

    desired.forEach((service) => {
      const current = map.get(service.service_id)
      const priceUSD =
        service.price_myr == null ? null : Math.round(service.price_myr * rate * 100) / 100

      if (
        !current ||
        current.service_name !== service.service_name ||
        current.price_myr !== service.price_myr ||
        current.price_usd !== priceUSD
      ) {
        upserts.push({
          ...service,
          price_usd: priceUSD,
        })
      }
    })

    if (!upserts.length) {
      console.log('service_pricing is already in sync.')
      return
    }

    const { error: upsertError } = await supabase
      .from('service_pricing')
      .upsert(upserts, { onConflict: 'service_id' })

    if (upsertError) throw upsertError

    console.log(
      `Upserted ${upserts.length} rows into service_pricing (MYR + USD recalculated @ rate ${rate}).`,
    )
  }

  main().catch((err) => {
    console.error('sync-service-pricing failed:', err)
    process.exit(1)
  })