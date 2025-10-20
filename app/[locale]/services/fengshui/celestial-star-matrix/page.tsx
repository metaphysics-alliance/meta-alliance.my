import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.fsMatrix;
  const title =
    service?.title || (locale === 'CN' ? '飞星矩阵设计' : 'Celestial Star Matrix Design');
  const description =
    service?.subtitle ||
    (locale === 'CN'
      ? '把飞星盘化成兼具奢华美感与精准能量表现的室内设计。'
      : 'Translate Flying Star charts into interior design that feels luxurious and performs like a precision instrument.');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/fengshui/celestial-star-matrix`,
      languages: {
        en: '/EN/services/fengshui/celestial-star-matrix',
        zh: '/CN/services/fengshui/celestial-star-matrix',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/services/fengshui/celestial-star-matrix`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="fsMatrix" lang={params.locale} />;
}
