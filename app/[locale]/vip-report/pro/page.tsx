import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const localeKey = (locale || 'EN').toUpperCase() as Locale;
  const dict = getDict(localeKey);
  const service = dict.services?.advancedBlueprint;
  const title = service?.title || 'Advanced Destiny Blueprint';
  const description =
    service?.subtitle ||
    'Decode the hidden structure of your destiny and master the timing behind your life.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${localeKey}/vip-report/pro`,
      languages: {
        en: '/EN/vip-report/pro',
        zh: '/CN/vip-report/pro',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${localeKey}/vip-report/pro`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="advancedBlueprint" lang={params.locale} />;
}
