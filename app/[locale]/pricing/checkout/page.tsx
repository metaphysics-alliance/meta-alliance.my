import type { Metadata } from 'next'

import PricingCheckout from '@/components/PricingCheckout'
import type { PricingDictionary } from '@/components/PricingExperience'
import type { Locale } from '@/lib/i18n'
import { getDict } from '@/lib/i18n'
import { fetchLatestServicePricingRate, fetchServicePricingRows } from '@/lib/servicePricing'
import applyServicePricing from '../../../../shared/pricing/servicePricing.js'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const pricing = dict.pricing ?? {}
  const title =
    pricing.checkout?.title ??
    (locale === 'CN' ? '确认你的战略组合' : 'Review your command deck')
  const description =
    pricing.checkout?.subtitle ??
    (locale === 'CN'
      ? '确认已选择的服务并准备结账。'
      : 'Confirm your selected services and prepare for checkout.')

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/pricing/checkout`,
      languages: { en: '/EN/pricing/checkout', zh: '/CN/pricing/checkout' },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/pricing/checkout`,
    },
  }
}

export default async function PricingCheckoutPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const reference = getDict('EN')

  const [serviceRows, rateRow] = await Promise.all([
    fetchServicePricingRows(),
    fetchLatestServicePricingRate(),
  ])

  const pricing = applyServicePricing(
    dict.pricing as PricingDictionary,
    reference.pricing as PricingDictionary,
    serviceRows,
    { locale, rate: rateRow },
  ) as PricingDictionary

  return <PricingCheckout locale={locale} pricing={pricing} />
}
