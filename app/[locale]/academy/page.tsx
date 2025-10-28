import Link from 'next/link'

import Hero from '@/components/Hero'
import SectionDivider from '@/components/SectionDivider'
import { getDict, type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

type AcademyLevel = {
  key?: string
  badge?: string
  slug?: string
  anchor?: string
  title?: string
  duration?: string
  body?: string
  ctaLabel?: string
}

type AcademyDetail = {
  label?: string
  value?: string
}

type AcademyFaqItem = {
  question: string
  answer: string
}

type AcademySection = {
  key?: string
  type?: string
  dividerTitle?: string
  dividerSubtitle?: string
  title?: string
  intro?: string
  paragraphs?: string[]
  points?: string[]
  details?: AcademyDetail[]
  levels?: AcademyLevel[]
}

type AcademyCta = {
  dividerTitle?: string
  dividerSubtitle?: string
  title?: string
  message?: string
  primaryLabel?: string
  primaryHref?: string
}

type AcademyOverview = {
  badge?: string
  title?: string
  subtitle?: string
  sections?: AcademySection[]
  cta?: AcademyCta
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params?.locale || 'EN'
  const dict = getDict(locale)
  const overview = (dict as any).academyOverview as AcademyOverview | undefined
  const title = overview?.title || 'Metaphysics Mastery Pathway'
  const description = overview?.subtitle || 'From Foundation to Mastery – A Complete Journey into Chinese Metaphysics'

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/academy`,
      languages: { en: '/EN/academy', zh: '/CN/academy' }
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/academy`
    }
  }
}

export default function Page({ params }: { params: { locale: Locale } }) {
  const locale = params.locale
  const dict = getDict(locale)
  const overview = (dict as any).academyOverview as AcademyOverview | undefined
  const foundationCourse = (dict as any).academyFoundation as { faq?: AcademyFaqItem[] } | undefined
  const sections = Array.isArray(overview?.sections) ? overview!.sections : []
  const primaryTextSection = sections.find((section) => section.type === 'text')
  const heroDescription = Array.isArray(primaryTextSection?.paragraphs) ? primaryTextSection?.paragraphs?.[0] : undefined
  const foundationFaq = Array.isArray(foundationCourse?.faq) ? (foundationCourse?.faq as AcademyFaqItem[]) : []

  return (
    <main className="space-y-16 pb-20">
      <Hero
        eyebrow={overview?.badge}
        title={overview?.title}
        sub={overview?.subtitle}
        description={heroDescription}
        className="min-h-[60vh] flex items-center"
        fullBleed
        bannerSrc="/page-banner.png"
        bannerOpacity={0.75}
        overlayOpacity={0.2}
        titlePanel
      />

      <div className="space-y-16">
        {sections.map((section) => (
          <SectionBlock key={section.key ?? section.dividerTitle ?? section.title} section={section} locale={locale} />
        ))}

        {foundationFaq.length ? <FoundationFaq locale={locale} items={foundationFaq} /> : null}

        {overview?.cta ? <CtaBlock locale={locale} cta={overview.cta} /> : null}
      </div>
    </main>
  )
}

function SectionBlock({ section, locale }: { section: AcademySection; locale: Locale }) {
  const dividerTitle = section.dividerTitle || section.title || ''
  const dividerSubtitle = section.dividerSubtitle || ''

  return (
    <section className="space-y-6">
      <SectionDivider title={dividerTitle} subtitle={dividerSubtitle} />
      <div className="container">
        {renderSectionContent(section, locale)}
      </div>
    </section>
  )
}

function FoundationFaq({ locale, items }: { locale: Locale; items: AcademyFaqItem[] }) {
  const isCN = locale === 'CN'
  return (
    <section className="space-y-6">
      <SectionDivider
        title={isCN ? '课程常见问题' : 'Course FAQs'}
        subtitle={isCN ? '报名前的关键答疑' : 'Answers before you enrol'}
      />
      <div className="container grid gap-5 md:grid-cols-2">
        {items.map((item, idx) => (
          <details
            key={item.question + '-' + idx}
            className="rounded-2xl border border-white/10 bg-black/25 p-4 md:p-5 backdrop-blur transition open:bg-black/30"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
              <h4 className="text-base font-semibold text-white md:text-lg">{item.question}</h4>
              <span className="mt-0.5 min-w-[64px] rounded-md border border-white/15 px-2 text-center text-xs text-white/70">
                {isCN ? '展开' : 'Expand'}
              </span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed text-white/80">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  )
}

function renderSectionContent(section: AcademySection, locale: Locale) {
  const type = section.type ?? 'text'

  if (type === 'levels') {
    const levels = Array.isArray(section.levels) ? section.levels : []
    return (
      <div className="space-y-6">
        {section.title ? <h3 className="text-2xl font-semibold text-white">{section.title}</h3> : null}
        {section.intro ? <p className="text-white/70 md:text-lg">{section.intro}</p> : null}
        <div className="grid gap-6 md:grid-cols-2">
          {levels.map((level) => (
            <LevelCard key={level.key ?? level.title} locale={locale} level={level} />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'bullets') {
    return (
      <article className="card-3d space-y-4 p-6 md:p-10">
        {section.title ? <h3 className="text-2xl font-semibold text-white">{section.title}</h3> : null}
        {Array.isArray(section.points) && section.points.length ? (
          <ul className="space-y-2 text-base leading-relaxed text-white/75">
            {section.points.map((point, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold-soft/80" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    )
  }

  if (type === 'details') {
    return (
      <article className="card-3d space-y-6 p-6 md:p-10">
        {section.title ? <h3 className="text-2xl font-semibold text-white">{section.title}</h3> : null}
        {section.body ? <p className="text-white/70">{section.body}</p> : null}
        <ul className="divide-y divide-white/10 text-white/75">
          {(section.details ?? []).map((detail, idx) => (
            <li key={`${detail.label ?? idx}-${detail.value ?? idx}`} className="flex flex-col justify-between gap-2 py-3 md:flex-row md:items-center">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-soft">
                {detail.label}
              </span>
              <span className="text-base text-white/80">{detail.value}</span>
            </li>
          ))}
        </ul>
      </article>
    )
  }

  const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : []

  return (
    <article className="card-3d space-y-4 p-6 md:p-10">
      {section.title ? <h3 className="text-2xl font-semibold text-white">{section.title}</h3> : null}
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className="text-base leading-relaxed text-white/75">
          {paragraph}
        </p>
      ))}
    </article>
  )
}

function LevelCard({ level, locale }: { level: AcademyLevel; locale: Locale }) {
  const href = resolveCourseHref(locale, level.slug)
  const anchorId = level.anchor || undefined

  return (
    <article id={anchorId} className="card-3d flex flex-col justify-between space-y-4 p-6 md:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/60">
          {level.badge ? <span className="font-semibold text-gold-soft">{level.badge}</span> : null}
          {level.duration ? (
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/70">
              {level.duration}
            </span>
          ) : null}
        </div>
        {level.title ? <h4 className="text-xl font-semibold text-white md:text-2xl">{level.title}</h4> : null}
        {level.body ? <p className="text-white/75">{level.body}</p> : null}
      </div>

      {level.ctaLabel && href ? (
        href.startsWith('#') ? (
          <a
            href={href}
            className="inline-flex items-center justify-center rounded-lg border border-gold/50 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/10"
          >
            {level.ctaLabel}
          </a>
        ) : (
          <Link
            href={href}
            prefetch={false}
            className="inline-flex items-center justify-center rounded-lg border border-gold/50 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/10"
          >
            {level.ctaLabel}
          </Link>
        )
      ) : null}
    </article>
  )
}

function CtaBlock({ locale, cta }: { locale: Locale; cta: AcademyCta }) {
  const href = localiseHref(locale, cta.primaryHref)

  return (
    <section className="space-y-6">
      <SectionDivider title={cta.dividerTitle ?? ''} subtitle={cta.dividerSubtitle ?? ''} />
      <div className="container">
        <div className="card-3d space-y-4 p-6 text-center md:p-10">
          {cta.title ? <h3 className="text-2xl font-semibold text-white md:text-3xl">{cta.title}</h3> : null}
          {cta.message ? <p className="text-white/75 md:text-lg">{cta.message}</p> : null}
          {cta.primaryLabel && href ? (
            href.startsWith('#') ? (
              <a
                href={href}
                className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black shadow-soft-xl transition hover:brightness-110"
              >
                {cta.primaryLabel}
              </a>
            ) : (
              <Link
                href={href}
                prefetch={false}
                className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black shadow-soft-xl transition hover:brightness-110"
              >
                {cta.primaryLabel}
              </Link>
            )
          ) : null}
        </div>
      </div>
    </section>
  )
}

function resolveCourseHref(locale: Locale, slug?: string | null): string | null {
  if (!slug) return null
  switch (slug) {
    case 'foundation':
      return `/${locale}/academy/foundation`
    case 'beginner':
      return `/${locale}/academy/beginner`
    case 'advanced':
      return `/${locale}/academy/intermediate`
    case 'professional':
      return `/${locale}/academy/professional`
    default:
      return `/${locale}/academy`
  }
}

function localiseHref(locale: Locale, href?: string | null): string | null {
  if (!href) return `/${locale}/contact`
  if (href.startsWith('#')) return href
  if (href.startsWith('http')) return href
  return `/${locale}${href.startsWith('/') ? href : `/${href}`}`
}
