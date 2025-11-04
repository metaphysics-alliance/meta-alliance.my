/**
 * Normalizes service pricing data from Supabase and injects it into the pricing dictionary.
 * This helper is shared between the Next.js (app/) and Vite (src/) stacks.
 */

function normalizeKey(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[\u2018\u2019\u201C\u201D'"]/g, '')
    .replace(/[^a-z0-9/ -]/g, '')
    .trim()
}

function formatCurrency(amount, currency) {
  if (amount == null || Number.isNaN(Number(amount))) {
    return null
  }
  const numeric = Number(amount)
  const minimumFractionDigits = Number.isInteger(numeric) ? 0 : 2
  const localeTag = currency === 'USD' ? 'en-US' : 'en-MY'
  const formatted = numeric.toLocaleString(localeTag, {
    minimumFractionDigits,
    maximumFractionDigits: 2,
  })

  if (currency === 'USD') {
    return `USD ${formatted}`
  }

  // Default to RM prefix for MYR to align with existing UI copy.
  return `RM ${formatted}`
}

function buildCategoryLookup(referencePricing) {
  const lookup = new Map()
  const categories = Array.isArray(referencePricing?.categories) ? referencePricing.categories : []
  categories.forEach((category, index) => {
    const key = category?.key ? String(category.key) : `index-${index}`
    lookup.set(key, category)
  })
  return lookup
}

function buildAddOnLookup(referencePricing) {
  const addOns = Array.isArray(referencePricing?.addOns) ? referencePricing.addOns : []
  return addOns.map((entry) => entry ?? null)
}

function enrichTier(tier, referenceTier, serviceMap) {
  const englishName = referenceTier?.name ?? tier?.name
  const service = englishName ? serviceMap.get(normalizeKey(englishName)) : undefined
  if (!service) {
    return tier
  }

  const priceMYR = service.price_myr ?? service.priceMYR ?? null
  const priceUSD = service.price_usd ?? service.priceUSD ?? null

  return {
    ...tier,
    price: priceMYR != null ? formatCurrency(priceMYR, 'MYR') : tier?.price ?? null,
    priceSecondary: priceUSD != null ? formatCurrency(priceUSD, 'USD') : tier?.priceSecondary ?? null,
    pricingMeta: {
      ...(tier?.pricingMeta ?? {}),
      serviceId: service.service_id ?? service.serviceId ?? null,
      priceMYR,
      priceUSD,
    },
  }
}

function enrichAddOn(addOn, referenceAddOn, serviceMap) {
  const englishName = referenceAddOn?.name ?? addOn?.name
  const service = englishName ? serviceMap.get(normalizeKey(englishName)) : undefined
  if (!service) {
    return addOn
  }

  const priceMYR = service.price_myr ?? service.priceMYR ?? null
  const priceUSD = service.price_usd ?? service.priceUSD ?? null

  return {
    ...addOn,
    price: priceMYR != null ? formatCurrency(priceMYR, 'MYR') : addOn?.price ?? null,
    priceSecondary: priceUSD != null ? formatCurrency(priceUSD, 'USD') : addOn?.priceSecondary ?? null,
    pricingMeta: {
      ...(addOn?.pricingMeta ?? {}),
      serviceId: service.service_id ?? service.serviceId ?? null,
      priceMYR,
      priceUSD,
    },
  }
}

function buildRateNote(rateRow, locale) {
  if (!rateRow || rateRow.rate == null) return null
  const numeric = Number(rateRow.rate)
  if (!Number.isFinite(numeric)) return null
  const rateFormatted = numeric.toFixed(4)
  const captured = rateRow.captured_at ?? rateRow.capturedAt ?? null
  let capturedLabel = ''
  if (captured) {
    const dt = new Date(captured)
    if (!Number.isNaN(dt.getTime())) {
      const date = dt.toLocaleDateString(locale === 'CN' ? 'zh-CN' : 'en-MY', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      capturedLabel = ` (${date})`
    }
  }
  if (locale === 'CN') {
    return `最新汇率：1 MYR = ${rateFormatted} USD${capturedLabel}`
  }
  return `Latest rate: 1 MYR = ${rateFormatted} USD${capturedLabel}`
}

/**
 * Applies Supabase pricing to the locale-specific pricing dictionary.
 *
 * @param {object} pricing - Pricing dictionary for the current locale.
 * @param {object} referencePricing - English pricing dictionary (used for name mapping).
 * @param {Array<object>} serviceRows - Rows from public.service_pricing.
 * @param {object} [options]
 * @param {'EN'|'CN'} [options.locale='EN']
 * @param {object} [options.rate] - Latest FX rate row from public.service_pricing_rates.
 * @returns {object} New pricing object with applied price data.
 */
export function applyServicePricing(pricing, referencePricing, serviceRows, options = {}) {
  const locale = options.locale === 'CN' ? 'CN' : 'EN'
  const rateRow = options.rate ?? null

  const basePricing = pricing ? { ...pricing } : {}
  const reference = referencePricing ?? pricing ?? {}

  const serviceMap = new Map()
  if (Array.isArray(serviceRows)) {
    serviceRows.forEach((row) => {
      if (!row) return
      const key = normalizeKey(row.service_name ?? row.serviceName)
      if (!key) return
      serviceMap.set(key, row)
    })
  }

  const categoryLookup = buildCategoryLookup(reference)
  const categories = Array.isArray(pricing?.categories) ? pricing.categories : []
  const enrichedCategories = categories.map((category, index) => {
    const referenceCategory =
      categoryLookup.get(category?.key ? String(category.key) : `index-${index}`) ??
      categoryLookup.get(`index-${index}`) ??
      null

    const tiers = Array.isArray(category?.tiers) ? category.tiers : []
    const referenceTiers = Array.isArray(referenceCategory?.tiers) ? referenceCategory.tiers : []

    const enrichedTiers = tiers.map((tier, tierIndex) =>
      enrichTier(tier, referenceTiers[tierIndex] ?? tier, serviceMap),
    )

    return {
      ...category,
      tiers: enrichedTiers,
    }
  })

  const addOns = Array.isArray(pricing?.addOns) ? pricing.addOns : []
  const referenceAddOns = buildAddOnLookup(reference)
  const enrichedAddOns = addOns.map((addOn, index) =>
    enrichAddOn(addOn, referenceAddOns[index] ?? addOn, serviceMap),
  )

  const rateNote = buildRateNote(rateRow, locale)
  let currencyNote = basePricing.currencyNote ?? null
  if (rateNote) {
    currencyNote = currencyNote ? `${currencyNote}\n${rateNote}` : rateNote
  }

  return {
    ...basePricing,
    categories: enrichedCategories,
    addOns: enrichedAddOns,
    currencyNote,
  }
}

/**
 * Helper exposed for tests / consumers that need formatting directly.
 */
export const __internal = {
  normalizeKey,
  formatCurrency,
}

export default applyServicePricing
