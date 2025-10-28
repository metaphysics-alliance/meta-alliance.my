import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const localeKey = (locale || 'EN').toUpperCase() as Locale;
  const dict = getDict(localeKey);
  const service = dict.services?.supremeBlueprint;
  const title = service?.title || 'Supreme Destiny Blueprint';
  const description =
    service?.subtitle ||
    'Experience a full-holographic destiny consultation where Heaven, Earth and Human align.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${localeKey}/vip-report/supreme`,
      languages: {
        en: '/EN/vip-report/supreme',
        zh: '/CN/vip-report/supreme',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${localeKey}/vip-report/supreme`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="supremeBlueprint" lang={params.locale} />;
}
