import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.essentialBlueprint;
  const title = service?.title || 'Essential Destiny Blueprint';
  const description =
    service?.subtitle ||
    'Decode your destiny, recognise innate talents and move with confidence through your life cycles.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/vip-report/essential`,
      languages: {
        en: '/EN/vip-report/essential',
        zh: '/CN/vip-report/essential',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/vip-report/essential`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="essentialBlueprint" lang={params.locale} />;
}
