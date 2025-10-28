import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.sixRen;
  const title = service?.title || 'Mystical Mechanism of Six Ren';
  const description =
    service?.subtitle ||
    'Command the Unseen · Shape the Inevitable';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/oracle/six-ren`,
      languages: {
        en: '/EN/oracle/six-ren',
        zh: '/CN/oracle/six-ren',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/oracle/six-ren`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="sixRen" lang={params.locale} />;
}