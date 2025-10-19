import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const service = dict.services?.fsHome
  const title = service?.title || 'Home Destiny Compass'
  const description = service?.subtitle || 'Transform your residence into a regenerative command centre tuned to every occupant\'s destiny signature.'

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/fengshui/home-destiny-compass`,
      languages: {
        en: '/EN/services/fengshui/home-destiny-compass',
        zh: '/CN/services/fengshui/home-destiny-compass',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/services/fengshui/home-destiny-compass`,
    },
  }
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="fsHome" lang={params.locale} />;
}
