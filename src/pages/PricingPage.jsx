/* eslint-disable import/order */
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiAlertTriangle } from 'react-icons/fi'

import SectionDivider from '../components/SectionDivider.jsx'
import dictAll from '../../shared/i18n/dictionary.js'
import { useI18n } from '../i18n.jsx'
import { supabase } from '../lib/supabaseClient'
import { ensureSupabaseSession } from '../lib/supabaseAuth'

function extractPriceLabels(price, preferredCurrency = 'MYR') {
  if (!price) return { primary: null, secondary: null }
  if (typeof price === 'string') {
    return { primary: price, secondary: null }
  }
  if (typeof price === 'object') {
    const normalized = {
      MYR: price?.myr ?? price?.MYR ?? null,
      USD: price?.usd ?? price?.USD ?? null,
    }
    const primary = preferredCurrency === 'USD'
      ? normalized.USD ?? normalized.MYR
      : normalized.MYR ?? normalized.USD
    const secondary = preferredCurrency === 'USD'
      ? normalized.MYR
      : normalized.USD
    return { primary: primary ?? null, secondary: secondary ?? null }
  }
  return { primary: String(price), secondary: null }
}

function isMissingRelationError(error) {
  const message = error?.message?.toLowerCase?.() ?? ''
  return message.includes('relation') && message.includes('does not exist')
}

function isNoRowsError(error) {
  const message = error?.message?.toLowerCase?.() ?? ''
  return error?.code === 'PGRST116' || message.includes('no rows')
}

function toStringArray(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.map((entry) => (entry == null ? '' : String(entry)))
  return [String(value)]
}

function TierCard({ tier, lang, currencyPreference }) {
  if (!tier?.name) return null
  const features = Array.isArray(tier.features) ? tier.features : []
  const isExternal = tier.href?.startsWith('http') || tier.href?.startsWith('mailto:')
  const label = lang === 'CN' ? '查看详情' : 'View details'
  const priceLabels = extractPriceLabels(tier.price, currencyPreference)
  const cadenceLabels = extractPriceLabels(tier.cadence, currencyPreference)
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="text-base font-semibold text-white">{tier.name}</h4>
        <div className="flex flex-col items-end gap-1 text-right">
          {priceLabels.primary ? <span className="text-sm font-medium text-gold">{priceLabels.primary}</span> : null}
          {priceLabels.secondary && priceLabels.secondary !== priceLabels.primary ? (
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">{priceLabels.secondary}</span>
          ) : null}
        </div>
      </div>
      {cadenceLabels.primary ? (
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">
          {cadenceLabels.primary}
          {cadenceLabels.secondary && cadenceLabels.secondary !== cadenceLabels.primary ? ` • ${cadenceLabels.secondary}` : ''}
        </p>
      ) : null}
      {features.length ? (
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {features.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )

  if (!tier.href) {
    return (
      <article className="card-3d flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/35 p-6">
        {body}
      </article>
    )
  }

  if (isExternal) {
    return (
      <article className="card-3d flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/35 p-6">
        {body}
        <a href={tier.href} target="_blank" rel="noreferrer" className="text-sm font-medium text-gold underline hover:text-white">
          {label}
        </a>
      </article>
    )
  }

  return (
    <article className="card-3d flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/35 p-6">
      {body}
      <Link to={tier.href} className="text-sm font-medium text-gold underline hover:text-white">
        {label}
      </Link>
    </article>
  )
}

function AddOnCard({ addOn, currencyPreference }) {
  if (!addOn?.name) return null
  const features = Array.isArray(addOn.features) ? addOn.features : []
  const priceLabels = extractPriceLabels(addOn.price, currencyPreference)
  return (
    <article className="card-3d flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/25 p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="text-sm font-semibold text-white/90">{addOn.name}</h4>
        <div className="flex flex-col items-end gap-1 text-right">
          {priceLabels.primary ? <span className="text-xs font-medium text-gold">{priceLabels.primary}</span> : null}
          {priceLabels.secondary && priceLabels.secondary !== priceLabels.primary ? (
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">{priceLabels.secondary}</span>
          ) : null}
        </div>
      </div>
      {features.length ? (
        <ul className="space-y-2 text-xs text-white/65">
          {features.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

async function fetchNormalizedPricing(locale, fallbackPricing) {
  const [metadataRes, sectionsRes, addOnsRes, noticeRes, fineRes] = await Promise.all([
    supabase
      .from('pricing_metadata')
      .select('*')
      .eq('locale', locale)
      .limit(1)
      .maybeSingle(),
    supabase
      .from('pricing_sections')
      .select('id, key, title, subtitle, description, order_index, items:pricing_items(*)')
      .eq('locale', locale)
      .order('order_index', { ascending: true }),
    supabase
      .from('pricing_addons')
      .select('*')
      .eq('locale', locale)
      .order('order_index', { ascending: true }),
    supabase
      .from('pricing_notice_points')
      .select('*')
      .eq('locale', locale)
      .order('order_index', { ascending: true }),
    supabase
      .from('pricing_fine_print')
      .select('*')
      .eq('locale', locale)
      .order('order_index', { ascending: true }),
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
        title: section.title ?? '',
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
      .from('currency_rates')
      .select('pair, rate, captured_at, captured_on, source')
      .eq('pair', metadataRow.currency_pair)
      .order('captured_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (rateRes.error && !isMissingRelationError(rateRes.error)) {
      throw rateRes.error
    }

    const rate = rateRes.data
    if (rate?.rate) {
      const [from, to] = (rate.pair || '').split('/')
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

function useSupabasePricing(locale, fallbackPricing = {}) {
  const [state, setState] = useState({
    status: 'idle',
    data: null,
    error: null,
    metadata: null,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      setState({ status: 'loading', data: null, error: null, metadata: null })
      try {
        await ensureSupabaseSession()

        const normalized = await fetchNormalizedPricing(locale, fallbackPricing)
        if (cancelled) return
        if (normalized) {
          setState({ status: 'success', data: normalized.pricing, error: null, metadata: normalized.metadata })
          return
        }

        const { data, error } = await supabase
          .from('pricing_content')
          .select('content, currency_pair, updated_at')
          .eq('locale', locale)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (cancelled) return

        if (error) {
          if (isNoRowsError(error) || isMissingRelationError(error)) {
            setState({ status: 'empty', data: null, error: null, metadata: null })
            return
          }
          throw error
        }

        if (!data?.content) {
          setState({ status: 'empty', data: null, error: null, metadata: null })
          return
        }

        const merged = { ...fallbackPricing, ...data.content }
        setState({
          status: 'success',
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
          setState({ status: 'error', data: null, error: err, metadata: null })
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

export default function PricingPage() {
  const { lang } = useI18n()
  const dict = dictAll?.[lang] || dictAll?.EN || {}
  const supabaseState = useSupabasePricing(lang, dict.pricing || {})
  useEffect(() => {
    if (supabaseState.status === 'error' && supabaseState.error) {
      console.error('Failed to load pricing from Supabase:', supabaseState.error)
    }
  }, [supabaseState.status, supabaseState.error])

  const pricing = useMemo(() => {
    const base = dict.pricing || {}
    if (!supabaseState.data || typeof supabaseState.data !== 'object') {
      return base
    }
    return {
      ...base,
      ...supabaseState.data,
      cta: supabaseState.data.cta ?? base.cta,
      categories: supabaseState.data.categories ?? base.categories ?? [],
      addOns: supabaseState.data.addOns ?? base.addOns ?? [],
      noticePoints: supabaseState.data.noticePoints ?? base.noticePoints ?? [],
      finePrint: supabaseState.data.finePrint ?? base.finePrint ?? [],
      noticeTitle: supabaseState.data.noticeTitle ?? base.noticeTitle ?? null,
      addOnsTitle: supabaseState.data.addOnsTitle ?? base.addOnsTitle ?? null,
      finePrintTitle: supabaseState.data.finePrintTitle ?? base.finePrintTitle ?? null,
      defaultCurrency: supabaseState.data.defaultCurrency ?? base.defaultCurrency ?? null,
      currencyNote: supabaseState.data.currencyNote ?? base.currencyNote ?? null,
      currencyPair: supabaseState.data.currencyPair ?? base.currencyPair ?? null,
    }
  }, [dict.pricing, supabaseState.data])

  const currencyPreference = useMemo(() => {
    if (supabaseState.metadata?.defaultCurrency) {
      return supabaseState.metadata.defaultCurrency
    }
    if (pricing?.defaultCurrency) {
      return pricing.defaultCurrency
    }
    if (supabaseState.metadata?.currencyPair) {
      const [primary] = supabaseState.metadata.currencyPair.split('/')
      if (primary) return primary.toUpperCase()
    }
    if (pricing?.currencyPair) {
      const [primary] = pricing.currencyPair.split('/')
      if (primary) return primary.toUpperCase()
    }
    return 'MYR'
  }, [pricing?.defaultCurrency, pricing?.currencyPair, supabaseState.metadata])

  const categories = Array.isArray(pricing.categories) ? pricing.categories : []
  const addOns = Array.isArray(pricing.addOns) ? pricing.addOns : []
  const finePrint = Array.isArray(pricing.finePrint) ? pricing.finePrint : []
  const noticePoints = Array.isArray(pricing.noticePoints) ? pricing.noticePoints : []

  return (
    <main className="container mx-auto max-w-6xl space-y-12 px-4 py-10">
      <SEOPricing
        lang={lang}
        title={pricing.heroTitle || (lang === 'CN' ? '服务套餐与定价' : 'Pricing & Engagement Levels')}
        description={
          pricing.heroDescription ||
          (lang === 'CN'
            ? '了解针对高层领导、家族传承与企业团队的定制玄学方案投入。'
            : 'Understand the investment levels for bespoke metaphysics programmes serving leaders, families and enterprise teams.')
        }
      />

      <header className="card-3d overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-8 text-center md:p-12">
        <h1 className="text-3xl font-semibold text-white md:text-4xl">{pricing.heroTitle || (lang === 'CN' ? '服务套餐与定价' : 'Pricing & Engagement Levels')}</h1>
        {pricing.heroSubtitle ? <p className="mt-3 text-base text-white/70 md:text-lg">{pricing.heroSubtitle}</p> : null}
        {pricing.heroDescription ? <p className="mt-4 text-sm text-white/60 md:text-base">{pricing.heroDescription}</p> : null}
        {pricing.cta?.href ? (
          <Link
            to={pricing.cta.href}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black shadow-soft-xl transition hover:brightness-110"
          >
            {pricing.cta.label || (lang === 'CN' ? '预约定制方案' : 'Discuss a custom bundle')}
          </Link>
        ) : null}
      </header>

      {noticePoints.length ? (
        <section className="space-y-4">
          <SectionDivider title={pricing.noticeTitle || (lang === 'CN' ? '每项服务均包含' : 'Every engagement includes')} />
          <div className="grid gap-4 md:grid-cols-2">
            {noticePoints.map((item, idx) => (
              <div key={idx} className="card-3d rounded-3xl border border-white/10 bg-black/30 p-5 text-sm text-white/70">
                {item}
              </div>
            ))}
          </div>
          {pricing.currencyNote ? (
            <div className="card-3d flex items-center gap-3 rounded-2xl border border-gold/45 bg-black/35 px-5 py-4 text-sm text-gold/90 shadow-soft-xl">
              <FiAlertTriangle className="h-5 w-5 flex-shrink-0 text-gold" />
              <span className="whitespace-pre-line">{pricing.currencyNote}</span>
            </div>
          ) : null}
        </section>
      ) : null}

      {categories.map((category) => {
        const tiers = Array.isArray(category.tiers) ? category.tiers : []
        if (!category?.title || !tiers.length) return null
        return (
          <section key={category.key || category.title} className="space-y-6">
          <SectionDivider title={category.title} subtitle={category.subtitle} />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tiers.map((tier, idx) => (
              <TierCard key={`${category.key || category.title}-${idx}`} tier={tier} lang={lang} currencyPreference={currencyPreference} />
            ))}
          </div>
        </section>
      )
      })}

      {addOns.length ? (
        <section className="space-y-6">
          <SectionDivider title={pricing.addOnsTitle || (lang === 'CN' ? '增值服务与长期顾问' : 'Retainers & Enhancements')} />
          <div className="grid gap-5 md:grid-cols-2">
            {addOns.map((addOn, idx) => (
              <AddOnCard key={idx} addOn={addOn} currencyPreference={currencyPreference} />
            ))}
          </div>
        </section>
      ) : null}

      {finePrint.length ? (
        <section className="space-y-4">
          <SectionDivider title={pricing.finePrintTitle || (lang === 'CN' ? '须知' : 'Fine print')} />
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-sm text-white/65">
            <ul className="space-y-2">
              {finePrint.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  )
}

function SEOPricing({ lang, title, description }) {
  useEffect(() => {
    document.title = `${title} | Metaphysics Alliance`
    const setMeta = (name, content) => {
      if (!content) return
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    const setOg = (property, content) => {
      if (!content) return
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    const setLink = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`)
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', rel)
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }
    setMeta('description', description)
    setLink('canonical', `/${lang}/pricing`)
    setOg('og:title', title)
    setOg('og:description', description)
    setOg('og:image', '/images/og-default.jpg')
  }, [lang, title, description])
  return null
}
