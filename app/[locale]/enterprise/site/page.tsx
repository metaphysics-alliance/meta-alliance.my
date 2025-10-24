import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.enterpriseSite;
  const title = service?.title || 'Enterprise Site Selection Command Deck';
  const description =
    service?.subtitle ||
    'Evaluate prospective locations with landform Feng Shui, Xuan Kong analytics and operational alignment.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/enterprise/site`,
      languages: {
        en: '/EN/enterprise/site',
        zh: '/CN/enterprise/site',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/enterprise/site`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="enterpriseSite" lang={params.locale} />;
}
