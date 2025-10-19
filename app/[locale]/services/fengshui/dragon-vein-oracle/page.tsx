import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.fsDragon;
  const title = service?.title || 'Dragon Vein Oracle';
  const description =
    service?.subtitle ||
    'Secure land parcels that breathe longevity by tracing dragon veins, protective ridges and water mouths before any ground is broken.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/fengshui/dragon-vein-oracle`,
      languages: {
        en: '/EN/services/fengshui/dragon-vein-oracle',
        zh: '/CN/services/fengshui/dragon-vein-oracle',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/services/fengshui/dragon-vein-oracle`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="fsDragon" lang={params.locale} />;
}
