/* eslint-disable import/order */
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiAlertTriangle } from 'react-icons/fi'

import SectionDivider from '../components/SectionDivider.jsx'
import dictAll from '../../shared/i18n/dictionary.js'
import { useI18n } from '../i18n.jsx'

function TierCard({ tier, lang }) {
  if (!tier?.name) return null
  const features = Array.isArray(tier.features) ? tier.features : []
  const isExternal = tier.href?.startsWith('http') || tier.href?.startsWith('mailto:')
  const label = lang === 'CN' ? '查看详情' : 'View details'
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="text-base font-semibold text-white">{tier.name}</h4>
        {tier.price ? <span className="text-sm font-medium text-gold">{tier.price}</span> : null}
      </div>
      {tier.cadence ? <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">{tier.cadence}</p> : null}
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

function AddOnCard({ addOn }) {
  if (!addOn?.name) return null
  const features = Array.isArray(addOn.features) ? addOn.features : []
  return (
    <article className="card-3d flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/25 p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="text-sm font-semibold text-white/90">{addOn.name}</h4>
        {addOn.price ? <span className="text-xs font-medium text-gold">{addOn.price}</span> : null}
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

export default function PricingPage() {
  const { lang } = useI18n()
  const dict = dictAll?.[lang] || dictAll?.EN || {}
  const pricing = dict.pricing || {}
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
              <span>{pricing.currencyNote}</span>
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
                <TierCard key={`${category.key}-${idx}`} tier={tier} lang={lang} />
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
              <AddOnCard key={idx} addOn={addOn} />
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
