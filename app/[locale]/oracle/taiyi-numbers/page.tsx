import type { Metadata } from 'next'

import CelestialServicePage from '@/components/CelestialServicePage'
import { getDict, type Locale } from '@/lib/i18n'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const service = dict.services?.taiyiNumbers
  const title = service?.title || (locale === 'CN' ? '乾坤太乙策' : 'Cosmic Tai Yi Strategy')
  const description =
    service?.subtitle ||
    (locale === 'CN'
      ? '御天星局，掌乾坤之策。以太乙星局推测吉凶祸福、洞察盛衰周期、制定乾坤策略。'
      : 'Command the stars, govern the flow of fate with the imperial Tai Yi system.')

  return {
    title,
    description,
    alternates: {
      canonical: '/' + locale + '/oracle/taiyi-numbers',
      languages: {
        en: '/EN/oracle/taiyi-numbers',
        zh: '/CN/oracle/taiyi-numbers',
      },
    },
    openGraph: {
      title,
      description,
      url: '/' + locale + '/oracle/taiyi-numbers',
    },
  }
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="taiyiNumbers" lang={params.locale} />
}
