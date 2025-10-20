import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.fsCycle;
  const title =
    service?.title || (locale === 'CN' ? '三元九运' : 'Cosmic Cycle of Fate Layout');
  const description =
    service?.subtitle ||
    (locale === 'CN'
      ? '顺着二十四节气调整风水布局，让空间与气场四季同频而不被拖累。'
      : 'Ride every twenty four Solar Term without guesswork by installing seasonal Feng Shui adjustments that keep your property synchronised with moving qi currents.');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/fengshui/cosmic-cycle-of-fate`,
      languages: {
        en: '/EN/services/fengshui/cosmic-cycle-of-fate',
        zh: '/CN/services/fengshui/cosmic-cycle-of-fate',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/services/fengshui/cosmic-cycle-of-fate`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="fsCycle" lang={params.locale} />;
}
