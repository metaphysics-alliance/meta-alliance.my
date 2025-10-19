import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.fsOffice;
  const title = service?.title || 'Office Power Alignment';
  const description =
    service?.subtitle ||
    'Engineer relentless revenue floors and cultural clarity by weaponising your workspace with high-precision Feng Shui and Qi Men gating.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/fengshui/office-power-alignment`,
      languages: {
        en: '/EN/services/fengshui/office-power-alignment',
        zh: '/CN/services/fengshui/office-power-alignment',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/services/fengshui/office-power-alignment`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="fsOffice" lang={params.locale} />;
}
