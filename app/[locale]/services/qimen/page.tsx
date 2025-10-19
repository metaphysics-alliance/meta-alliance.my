import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const service = dict.services.qimen
  return {
    title: service.title,
    description: service.subtitle,
    alternates: { canonical: `/${locale}/services/qimen`, languages: { en: '/EN/services/qimen', zh: '/CN/services/qimen' } },
    openGraph: { title: service.title, description: service.subtitle, url: `/${locale}/services/qimen` },
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  return <CelestialServicePage serviceKey="qimen" lang={params.locale} />;
}
