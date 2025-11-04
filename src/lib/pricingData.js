import { useEffect, useState } from "react"

import { supabase } from "./supabaseClient"
import { ensureSupabaseSession } from "./supabaseAuth"

function isMissingRelationError(error) {
  const message = error?.message?.toLowerCase?.() ?? ""
  return message.includes("relation") && message.includes("does not exist")
}

function isNoRowsError(error) {
  const message = error?.message?.toLowerCase?.() ?? ""
  return error?.code === "PGRST116" || message.includes("no rows")
}

function toStringArray(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.map((entry) => (entry == null ? "" : String(entry)))
  return [String(value)]
}

async function fetchNormalizedPricing(locale, fallbackPricing) {
  const [metadataRes, sectionsRes, addOnsRes, noticeRes, fineRes] = await Promise.all([
    supabase
      .from("pricing_metadata")
      .select("*")
      .eq("locale", locale)
      .limit(1)
      .maybeSingle(),
    supabase
      .from("pricing_sections")
      .select("id, key, title, subtitle, description, order_index, items:pricing_items(*)")
      .eq("locale", locale)
      .order("order_index", { ascending: true }),
    supabase
      .from("pricing_addons")
      .select("*")
      .eq("locale", locale)
      .order("order_index", { ascending: true }),
    supabase
      .from("pricing_notice_points")
      .select("*")
      .eq("locale", locale)
      .order("order_index", { ascending: true }),
    supabase
      .from("pricing_fine_print")
      .select("*")
      .eq("locale", locale)
      .order("order_index", { ascending: true }),
  ])

  const errors = [metadataRes.error, sectionsRes.error, addOnsRes.error, noticeRes.error, fineRes.error].filter(Boolean)
  if (errors.some(isMissingRelationError)) {
    return null
  }
  const fatal = errors.find(Boolean)
  if (fatal) {
    throw fatal
  }

  const metadataRow = metadataRes.data ?? null
  const sections = Array.isArray(sectionsRes.data) ? sectionsRes.data : []
  const addOns = Array.isArray(addOnsRes.data) ? addOnsRes.data : []
  const noticePoints = Array.isArray(noticeRes.data) ? noticeRes.data : []
  const finePrint = Array.isArray(fineRes.data) ? fineRes.data : []

  if (!metadataRow && !sections.length && !addOns.length && !noticePoints.length && !finePrint.length) {
    return null
  }

  const normalizedSections = sections
    .slice()
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
    .map((section) => {
      const tiers = Array.isArray(section.items) ? section.items : []
      const normalizedTiers = tiers
        .slice()
        .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
        .map((item, idx) => ({
          name: item.name ?? `Tier ${idx + 1}`,
          price: { myr: item.price_myr ?? null, usd: item.price_usd ?? null },
          cadence: { myr: item.cadence_myr ?? null, usd: item.cadence_usd ?? null },
          href: item.href ?? null,
          features: toStringArray(item.features),
        }))
        .filter((tier) => tier.name)

      return {
        key: section.key ?? `section_${section.id}`,
        title: section.title ?? "",
        subtitle: section.subtitle ?? null,
        description: section.description ?? null,
        tiers: normalizedTiers,
      }
    })
    .filter((section) => section.title && section.tiers.length)

  const normalizedAddOns = addOns
    .slice()
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
    .map((addOn, idx) => ({
      name: addOn.name ?? `Add-on ${idx + 1}`,
      price: { myr: addOn.price_myr ?? null, usd: addOn.price_usd ?? null },
      features: toStringArray(addOn.features),
    }))
    .filter((addOn) => addOn.name)

  let pricing = {
    ...fallbackPricing,
    heroTitle: metadataRow?.hero_title ?? fallbackPricing?.heroTitle ?? null,
    heroSubtitle: metadataRow?.hero_subtitle ?? fallbackPricing?.heroSubtitle ?? null,
    heroDescription: metadataRow?.hero_description ?? fallbackPricing?.heroDescription ?? null,
    cta: metadataRow?.cta_href
      ? { href: metadataRow.cta_href, label: metadataRow.cta_label ?? fallbackPricing?.cta?.label ?? null }
      : fallbackPricing?.cta ?? null,
    currencyNote: metadataRow?.currency_note ?? fallbackPricing?.currencyNote ?? null,
    currencyPair: metadataRow?.currency_pair ?? fallbackPricing?.currencyPair ?? null,
    defaultCurrency:
      metadataRow?.default_currency ??
      fallbackPricing?.defaultCurrency ??
      (metadataRow?.currency_pair ? metadataRow.currency_pair.split('/')[0]?.toUpperCase() : null),
    categories: normalizedSections.length ? normalizedSections : fallbackPricing?.categories ?? [],
    addOns: normalizedAddOns.length ? normalizedAddOns : fallbackPricing?.addOns ?? [],
    noticePoints: noticePoints.length ? noticePoints.map((entry) => entry.body) : fallbackPricing?.noticePoints ?? [],
    finePrint: finePrint.length ? finePrint.map((entry) => entry.body) : fallbackPricing?.finePrint ?? [],
    noticeTitle: metadataRow?.notice_title ?? fallbackPricing?.noticeTitle ?? null,
    addOnsTitle: metadataRow?.add_ons_title ?? fallbackPricing?.addOnsTitle ?? null,
    finePrintTitle: metadataRow?.fine_print_title ?? fallbackPricing?.finePrintTitle ?? null,
  }

  const metadata = {
    currencyPair: metadataRow?.currency_pair ?? null,
    defaultCurrency: pricing.defaultCurrency ?? null,
    updatedAt: metadataRow?.updated_at ?? null,
  }

  if (metadataRow?.currency_pair) {
    const rateRes = await supabase
      .from("currency_rates")
      .select("pair, rate, captured_at, captured_on, source")
      .eq("pair", metadataRow.currency_pair)
      .order("captured_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (rateRes.error && !isMissingRelationError(rateRes.error)) {
      throw rateRes.error
    }

    const rate = rateRes.data
    if (rate?.rate) {
      const [from, to] = (rate.pair || "").split("/")
      const formattedRate = Number(rate.rate).toFixed(4)
      const capturedTimestamp = rate.captured_at || rate.captured_on
      const capturedDate = capturedTimestamp
        ? new Date(capturedTimestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
        : null
      const rateNote = from && to
        ? `Latest rate: 1 ${from} = ${formattedRate} ${to}${capturedDate ? ` (${capturedDate})` : ''}`
        : `Latest rate ${rate.pair}: ${formattedRate}${capturedDate ? ` (${capturedDate})` : ''}`

      metadata.exchangeRate = rate
      metadata.exchangeRateNote = rateNote
      pricing = {
        ...pricing,
        currencyNote: pricing.currencyNote ? `${pricing.currencyNote}\n${rateNote}` : rateNote,
      }
    }
  }

  return { pricing, metadata }
}


export function mergePricingContent(base = {}, supabaseData) {
  if (!supabaseData || typeof supabaseData !== 'object') {
    return base;
  }
  return {
    ...base,
    ...supabaseData,
    cta: supabaseData.cta ?? base.cta,
    categories: supabaseData.categories ?? base.categories ?? [],
    addOns: supabaseData.addOns ?? base.addOns ?? [],
    noticePoints: supabaseData.noticePoints ?? base.noticePoints ?? [],
    finePrint: supabaseData.finePrint ?? base.finePrint ?? [],
    noticeTitle: supabaseData.noticeTitle ?? base.noticeTitle ?? null,
    addOnsTitle: supabaseData.addOnsTitle ?? base.addOnsTitle ?? null,
    finePrintTitle: supabaseData.finePrintTitle ?? base.finePrintTitle ?? null,
    defaultCurrency: supabaseData.defaultCurrency ?? base.defaultCurrency ?? null,
    currencyNote: supabaseData.currencyNote ?? base.currencyNote ?? null,
    currencyPair: supabaseData.currencyPair ?? base.currencyPair ?? null,
  };
}

export function useSupabasePricing(locale, fallbackPricing = {}) {
  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
    metadata: null,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      setState({ status: "loading", data: null, error: null, metadata: null })
      try {
        await ensureSupabaseSession()

        const normalized = await fetchNormalizedPricing(locale, fallbackPricing)
        if (cancelled) return
        if (normalized) {
          setState({ status: "success", data: normalized.pricing, error: null, metadata: normalized.metadata })
          return
        }

        const { data, error } = await supabase
          .from("pricing_content")
          .select("content, currency_pair, updated_at")
          .eq("locale", locale)
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle()

        if (cancelled) return

        if (error) {
          if (isNoRowsError(error) || isMissingRelationError(error)) {
            setState({ status: "empty", data: null, error: null, metadata: null })
            return
          }
          throw error
        }

        if (!data?.content) {
          setState({ status: "empty", data: null, error: null, metadata: null })
          return
        }

        const merged = { ...fallbackPricing, ...data.content }
        setState({
          status: "success",
          data: merged,
          error: null,
          metadata: {
            currencyPair: data.currency_pair ?? null,
            updatedAt: data.updated_at ?? null,
            defaultCurrency: merged?.defaultCurrency ?? null,
          },
        })
      } catch (err) {
        if (!cancelled) {
          setState({ status: "error", data: null, error: err, metadata: null })
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [locale, fallbackPricing])

  return state
}
