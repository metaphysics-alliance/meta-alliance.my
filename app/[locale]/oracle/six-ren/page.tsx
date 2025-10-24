import type { Metadata } from 'next'

import CelestialServicePage from '@/components/CelestialServicePage'
import { getDict, type Locale } from '@/lib/i18n'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const service = dict.services?.sixRen
  const title = service?.title || (locale === 'CN' ? '六壬神机战策' : 'Mystical Mechanism of Six Ren')
  const description =
    service?.subtitle ||
    (locale === 'CN'
      ? '以六壬神机快速获取可执行的战术情报，秒定进退攻守。'
      : 'Fast, tactical Six Ren divination for negotiations, crisis response and decisive pivots.')

  return {
    title,
    description,
    alternates: {
      canonical: '/' + locale + '/oracle/six-ren',
      languages: {
        en: '/EN/oracle/six-ren',
        zh: '/CN/oracle/six-ren',
      },
    },
    openGraph: {
      title,
      description,
      url: '/' + locale + '/oracle/six-ren',
    },
  }
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="sixRen" lang={params.locale} />
}
