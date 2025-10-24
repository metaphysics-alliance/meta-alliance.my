import Content from '@/components/Content'
import Hero from '@/components/Hero'
import MapEmbed from '@/components/MapEmbed'
import MediaGrid from '@/components/MediaGrid'
import Testimonials from '@/components/Testimonials'
import { getDict, type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params?.locale || 'EN'
  const dict = getDict(locale)
  const title = (dict.brand_bottom as string) || 'Metaphysics Alliance'
  const desc = (dict.why_long as string) || 'Chinese metaphysics for decisive clarity.'
  return {
    title,
    description: desc,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/EN', zh: '/CN' },
    },
    openGraph: { title, description: desc, url: `/${locale}` },
  }
}

export default function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const dict = getDict(locale)

  const newsletterTitle = dict.newsletter_title ?? 'Newsletter'
  const newsletterSub = dict.newsletter_sub ?? 'Insights, timing windows & case studies. No spam.'
  const newsletterPlaceholder = dict.newsletter_placeholder ?? 'Enter your email'
  const newsletterButton = dict.newsletter_button ?? 'Subscribe'

  return (
    <div className="space-y-14">
      <Hero
        eyebrow={dict.brand_top ?? 'Meta Alliance'}
        title={dict.brand_bottom ?? 'Metaphysics Alliance'}
        sub={dict.why_long}
        titlePanel
      />

      <Content
        title={dict.who?.title ?? dict.who_title ?? 'Who We Are'}
        dict={dict}
        path="who"
        highlight={dict.who_long?.slice?.(0, 180)}
      />

      <MediaGrid
        items={[
          {
            title: dict.nav?.celestial ?? 'Celestial Analysis',
            description: locale === 'CN'
              ? '八字、紫微、奇门与皇极数字，交叉验证每一个策略窗口。'
              : 'BaZi, Zi Wei, Qi Men and numerical metaphysics merged to validate every strategic window.',
          },
          {
            title: dict.nav?.fengshui ?? 'Feng Shui',
            description: locale === 'CN'
              ? '住宅与商业风水布局，结合真太阳时与周期流年。'
              : 'Residential and corporate Feng Shui layouts tied to True Solar Time and business cycles.',
          },
          {
            title: dict.nav?.vip_report ?? 'VIP Package',
            description: locale === 'CN'
              ? '多达 300 页的命盘蓝图，配合数字与空间动态的升级方案。'
              : 'Up to 300-page destiny blueprints with numeric and spatial remediation roadmaps.',
          },
        ]}
      />

      <Testimonials dict={dict} path="testimonials" />

      <section className="rounded-3xl border border-white/10 bg-black/25 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{newsletterTitle}</h2>
        <p className="mt-2 text-sm text-white/65 md:text-base">{newsletterSub}</p>
        <form className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder={newsletterPlaceholder}
            className="flex-1 rounded-lg border border-white/15 bg-black/50 px-4 py-2 text-sm text-white/90 focus:border-gold/50 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110"
          >
            {newsletterButton}
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{dict.map_title ?? 'Our Location'}</h2>
        <MapEmbed locale={locale.toLowerCase()} />
      </section>
    </div>
  )
}


