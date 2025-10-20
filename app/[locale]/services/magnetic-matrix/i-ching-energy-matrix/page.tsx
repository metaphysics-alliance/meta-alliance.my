import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.mmIching;
  const title =
    service?.title || (locale === 'CN' ? '易经能量矩阵' : 'I-Ching Energy Matrix');
  const description =
    service?.subtitle ||
    (locale === 'CN'
      ? '让关键抉择化为可控突破，把易经卦象智慧植入你的战略仪表。'
      : 'Turn volatile decisions into measured breakthroughs with I-Ching hexagram intelligence integrated into your strategy dashboard.');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/magnetic-matrix/i-ching-energy-matrix`,
      languages: {
        en: '/EN/services/magnetic-matrix/i-ching-energy-matrix',
        zh: '/CN/services/magnetic-matrix/i-ching-energy-matrix',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/services/magnetic-matrix/i-ching-energy-matrix`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="mmIching" lang={params.locale} />;
}
