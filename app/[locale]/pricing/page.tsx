import Link from 'next/link'
import { FiAlertTriangle } from 'react-icons/fi'

import Hero from '@/components/Hero'
import SectionDivider from '@/components/SectionDivider'
import { getDict, type Locale } from '@/lib/i18n'

type PricingTier = {
  name?: string
  price?: string
  cadence?: string
  features?: string[]
  href?: string
}

type PricingCategory = {
  key?: string
  title?: string
  subtitle?: string
  tiers?: PricingTier[]
}

type PricingAddOn = {
  name?: string
  price?: string
  features?: string[]
}

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const pricing = dict.pricing ?? {}
  const title = pricing.heroTitle || (locale === 'CN' ? '服务套餐与定价' : 'Pricing & Engagement Levels')
  const description =
    pricing.heroDescription ||
    (locale === 'CN'
      ? '探索为高层领导、家族传承与企业团队设计的高精度玄学服务价格。'
      : 'Explore investment levels for precision metaphysics programmes crafted for leaders, investors and enterprise teams.')

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/pricing`,
      languages: { en: '/EN/pricing', zh: '/CN/pricing' },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/pricing`,
    },
  }
}

function TierCard({ tier, locale }: { tier: PricingTier; locale: Locale }) {
  if (!tier?.name) return null
  const features = Array.isArray(tier.features) ? tier.features : []
  const isExternal = tier.href?.startsWith('http') || tier.href?.startsWith('mailto:')
  const linkLabel = locale === 'CN' ? '查看详情' : 'View details'

  const body = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="text-lg font-semibold text-white">{tier.name}</h4>
        {tier.price ? <span className="text-base font-medium text-gold">{tier.price}</span> : null}
      </div>
      {tier.cadence ? <p className="text-xs uppercase tracking-[0.22em] text-white/50">{tier.cadence}</p> : null}
      {features.length ? (
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {features.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold/80 shadow-soft-xl" />
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

  const href = tier.href.startsWith('/') ? `/${locale}${tier.href}` : tier.href

  if (isExternal) {
    return (
      <article className="card-3d flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/35 p-6">
        {body}
        <a className="text-sm font-medium text-gold underline hover:text-white" href={href} target="_blank" rel="noopener noreferrer">
          {linkLabel}
        </a>
      </article>
    )
  }

  return (
    <article className="card-3d flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/35 p-6">
      {body}
      <Link className="text-sm font-medium text-gold underline hover:text-white" href={href}>
        {linkLabel}
      </Link>
    </article>
  )
}

function AddOnCard({ addOn }: { addOn: PricingAddOn }) {
  if (!addOn?.name) return null
  const features = Array.isArray(addOn.features) ? addOn.features : []
  return (
    <article className="card-3d flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/25 p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="text-base font-semibold text-white">{addOn.name}</h4>
        {addOn.price ? <span className="text-sm font-medium text-gold">{addOn.price}</span> : null}
      </div>
      {features.length ? (
        <ul className="space-y-2 text-sm text-white/65">
          {features.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

export default function PricingPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const pricing = dict.pricing ?? {}
  const categories: PricingCategory[] = Array.isArray(pricing.categories) ? pricing.categories : []
  const addOns: PricingAddOn[] = Array.isArray(pricing.addOns) ? pricing.addOns : []
  const finePrint: string[] = Array.isArray(pricing.finePrint) ? pricing.finePrint : []
  const noticePoints: string[] = Array.isArray(pricing.noticePoints) ? pricing.noticePoints : []

  return (
    <div className="space-y-14 pb-20">
      <Hero
        locale={locale}
        title={pricing.heroTitle}
        sub={pricing.heroSubtitle}
        description={pricing.heroDescription}
        bannerSrc="/page-banner.png"
        bannerOpacity={0.25}
        overlayOpacity={0.3}
        minVh={60}
        titlePanel
        ctaLabel={pricing.cta?.label}
        ctaHref={pricing.cta?.href}
      />

      <section className="container space-y-6">
        <SectionDivider title={pricing.noticeTitle || (locale === 'CN' ? '每项服务均包含' : 'Every engagement includes')} />
        {noticePoints.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {noticePoints.map((item, idx) => (
              <div key={idx} className="card-3d rounded-3xl border border-white/10 bg-black/30 p-5 text-sm text-white/70">
                {item}
              </div>
            ))}
          </div>
        ) : null}
        {pricing.currencyNote ? (
          <div className="card-3d flex items-center gap-3 rounded-2xl border border-gold/50 bg-black/35 px-5 py-4 text-sm text-gold/90 shadow-soft-xl">
            <FiAlertTriangle className="h-5 w-5 flex-shrink-0 text-gold" />
            <span>{pricing.currencyNote}</span>
          </div>
        ) : null}
      </section>

      {categories.map((category) => {
        const tiers = Array.isArray(category.tiers) ? category.tiers : []
        if (!category?.title || !tiers.length) return null
        return (
          <section key={category.key ?? category.title} className="container space-y-6">
            <SectionDivider title={category.title} subtitle={category.subtitle} />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {tiers.map((tier, idx) => (
                <TierCard key={`${category.key}-${idx}`} tier={tier} locale={locale} />
              ))}
            </div>
          </section>
        )
      })}

      {addOns.length ? (
        <section className="container space-y-6">
          <SectionDivider title={pricing.addOnsTitle || (locale === 'CN' ? '增值服务与长期顾问' : 'Retainers & Enhancements')} />
          <div className="grid gap-5 md:grid-cols-2">
            {addOns.map((addOn, idx) => (
              <AddOnCard key={idx} addOn={addOn} />
            ))}
          </div>
        </section>
      ) : null}

      {finePrint.length ? (
        <section className="container space-y-4">
          <SectionDivider title={pricing.finePrintTitle || (locale === 'CN' ? '须知' : 'Fine print')} />
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-sm text-white/60">
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
    </div>
  )
}
