import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const service = dict.services.ziwei
  return {
    title: service.title,
    description: service.subtitle,
    alternates: { canonical: `/${locale}/services/ziwei`, languages: { en: '/EN/services/ziwei', zh: '/CN/services/ziwei' } },
    openGraph: { title: service.title, description: service.subtitle, url: `/${locale}/services/ziwei` },
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  return <CelestialServicePage serviceKey="ziwei" lang={params.locale} />;
}
