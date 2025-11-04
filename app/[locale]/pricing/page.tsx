import type { Metadata } from 'next'

import PricingExperience, { type PricingDictionary } from '@/components/PricingExperience'
import type { Locale } from '@/lib/i18n'
import { getDict } from '@/lib/i18n'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const pricing = dict.pricing ?? {}
  const title =
    pricing.heroTitle ??
    (locale === 'CN' ? '服务套餐与定价' : 'Pricing & Engagement Levels')
  const description =
    pricing.heroDescription ??
    (locale === 'CN'
      ? '探索针对高端客户、继承人与企业团队的玄学方案。'
      : 'Explore investment levels for precision metaphysics programmes crafted for leaders, heirs and enterprise teams.')

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

export default function PricingPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const pricing = dict.pricing as PricingDictionary

  return <PricingExperience locale={locale} pricing={pricing} />
}
