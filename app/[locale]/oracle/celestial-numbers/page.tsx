import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.celestialNumbers;
  const title = service?.title || 'Supreme Celestial Numbers Oracle';
  const description =
    service?.subtitle ||
    'Decode Huangji Divine Cycles to choreograph sovereign, enterprise and personal timing.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/oracle/celestial-numbers`,
      languages: {
        en: '/EN/oracle/celestial-numbers',
        zh: '/CN/oracle/celestial-numbers',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/oracle/celestial-numbers`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="celestialNumbers" lang={params.locale} />;
}
