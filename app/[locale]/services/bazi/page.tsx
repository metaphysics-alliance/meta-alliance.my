import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const service = dict.services.bazi
  return {
    title: service.title,
    description: service.subtitle,
    alternates: { canonical: `/${locale}/services/bazi`, languages: { en: '/EN/services/bazi', zh: '/CN/services/bazi' } },
    openGraph: { title: service.title, description: service.subtitle, url: `/${locale}/services/bazi` },
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  return <CelestialServicePage serviceKey="bazi" lang={params.locale} />;
}
