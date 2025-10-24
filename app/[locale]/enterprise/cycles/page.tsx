import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.enterpriseCycles;
  const title = service?.title || 'Enterprise Strategy & Cycles Command Suite';
  const description =
    service?.subtitle ||
    'Design macro and micro cycle alignment so strategy, execution and timing move in lockstep.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/enterprise/cycles`,
      languages: {
        en: '/EN/enterprise/cycles',
        zh: '/CN/enterprise/cycles',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/enterprise/cycles`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="enterpriseCycles" lang={params.locale} />;
}
