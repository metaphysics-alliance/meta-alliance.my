import Link from 'next/link'

import Hero from '@/components/Hero'
import SectionDivider from '@/components/SectionDivider'
import { getDict, type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

interface Section {
  key?: string
  dividerTitle?: string
  dividerSubtitle?: string
  title?: string
  paragraphs?: string[]
  points?: string[]
}

interface CourseData {
  hero?: {
    badge?: string
    title?: string
    subtitle?: string
    primaryLabel?: string
    primaryHref?: string
    secondaryLabel?: string
    secondaryHref?: string
  }
  sections?: Section[]
  cta?: {
    dividerTitle?: string
    dividerSubtitle?: string
    title?: string
    message?: string
    primaryLabel?: string
    primaryHref?: string
    secondaryLabel?: string
    secondaryHref?: string
  }
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params?.locale || 'EN'
  const dict = getDict(locale)
  const course = (dict as any).academyProfessional as CourseData | undefined
  const title = course?.hero?.title || 'Professional Course & Certification'
  const description =
    course?.hero?.subtitle || (dict as any).why_long || 'Professional certification for metaphysics consultants.'
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/academy/professional`,
      languages: { en: '/EN/academy/professional', zh: '/CN/academy/professional' }
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/academy/professional`
    }
  }
}

export default function Page({ params }: { params: { locale: Locale } }) {
  const locale = params.locale
  const dict = getDict(locale)
  const course = (dict as any).academyProfessional as CourseData | undefined

  if (!course) {
    return null
  }

  const hero = course.hero ?? {}
  const sections = Array.isArray(course.sections) ? course.sections : []
  const cta = course.cta

  const heroActions = (
    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
      {hero.primaryLabel && hero.primaryHref ? (
        <HeroLink locale={locale} href={hero.primaryHref} variant="primary">
          {hero.primaryLabel}
        </HeroLink>
      ) : null}
      {hero.secondaryLabel && hero.secondaryHref ? (
        <HeroLink locale={locale} href={hero.secondaryHref} variant="secondary">
          {hero.secondaryLabel}
        </HeroLink>
      ) : null}
    </div>
  )

  return (
    <main className="space-y-16 pb-20">
      <Hero
        eyebrow={hero.badge}
        title={hero.title}
        sub={hero.subtitle}
        locale={locale}
        bannerSrc="/page-banner.png"
        bannerOpacity={0.75}
        overlayOpacity={0.2}
        titlePanel
        showDefaultCta={false}
        actions={heroActions}
      />

      {sections.map((section) => (
        <CourseSection key={section.key ?? section.title ?? section.dividerTitle} section={section} />
      ))}

      {cta ? <CourseCta locale={locale} cta={cta} /> : null}
    </main>
  )
}

function CourseSection({ section }: { section: Section }) {
  if (!section.dividerTitle && !section.title && !section.paragraphs?.length && !section.points?.length) {
    return null
  }

  return (
    <section className="space-y-6">
      <SectionDivider title={section.dividerTitle ?? ''} subtitle={section.dividerSubtitle ?? ''} />
      <div className="container">
        <article className="card-3d space-y-4 p-6 md:p-10">
          {section.title ? <h2 className="text-2xl font-semibold text-white md:text-3xl">{section.title}</h2> : null}
          {Array.isArray(section.paragraphs)
            ? section.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-base leading-relaxed text-white/75">
                  {paragraph}
                </p>
              ))
            : null}
          {Array.isArray(section.points) && section.points.length ? (
            <ul className="grid gap-2 text-base leading-relaxed text-white/75 md:gap-3">
              {section.points.map((point, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gold-soft/80" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      </div>
    </section>
  )
}

function CourseCta({
  locale,
  cta
}: {
  locale: Locale
  cta: NonNullable<CourseData['cta']>
}) {
  const primaryHref = resolveHref(locale, cta.primaryHref)
  const secondaryHref = resolveHref(locale, cta.secondaryHref)

  return (
    <section className="space-y-6">
      <SectionDivider title={cta.dividerTitle ?? ''} subtitle={cta.dividerSubtitle ?? ''} />
      <div className="container">
        <div className="card-3d space-y-5 p-6 text-center md:p-10">
          {cta.title ? <h3 className="text-2xl font-semibold text-white md:text-3xl">{cta.title}</h3> : null}
          {cta.message ? <p className="text-white/75 md:text-lg">{cta.message}</p> : null}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {cta.primaryLabel && primaryHref ? (
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black shadow-soft-xl transition hover:brightness-110"
              >
                {cta.primaryLabel}
              </Link>
            ) : null}
            {cta.secondaryLabel && secondaryHref ? (
              <Link
                href={secondaryHref}
                prefetch={false}
                className="inline-flex items-center justify-center rounded-lg border border-gold/50 px-6 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/10"
              >
                {cta.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroLink({
  locale,
  href,
  variant,
  children
}: {
  locale: Locale
  href: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}) {
  const resolvedHref = resolveHref(locale, href)
  const className =
    variant === 'primary'
      ? 'inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black shadow-soft-xl transition hover:brightness-110'
      : 'inline-flex items-center justify-center rounded-lg border border-gold/50 px-6 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/10'

  if (!resolvedHref) {
    return null
  }

  if (resolvedHref.startsWith('#') || resolvedHref.startsWith('http')) {
    return (
      <a href={resolvedHref} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={resolvedHref} className={className}>
      {children}
    </Link>
  )
}

function resolveHref(locale: Locale, href?: string | null) {
  if (!href) return null
  if (href.startsWith('#') || href.startsWith('http')) return href
  if (href === '/') return `/${locale}`
  if (href.startsWith('/')) return `/${locale}${href}`
  return `/${locale}/${href}`
}
