import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.fsEnergy;
  const title =
    service?.title || (locale === 'CN' ? '能域汇聚场' : 'Energy Convergence Field');
  const description =
    service?.subtitle ||
    (locale === 'CN'
      ? '融合风水、奇门与数理，为旗舰住宅、总部或酒店打造不可复制的能量标识。'
      : 'Fuse Feng Shui, Qi Men and numerology to craft a signature energetic identity for flagship homes, headquarters or hospitality icons.');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/fengshui/energy-convergence-field`,
      languages: {
        en: '/EN/services/fengshui/energy-convergence-field',
        zh: '/CN/services/fengshui/energy-convergence-field',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/services/fengshui/energy-convergence-field`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="fsEnergy" lang={params.locale} />;
}
