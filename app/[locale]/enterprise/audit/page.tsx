import CelestialServicePage from '@/components/CelestialServicePage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN';
  const dict = getDict(locale);
  const service = dict.services?.corporateAudit;
  const title = service?.title || 'Corporate Destiny Audit Intelligence';
  const description =
    service?.subtitle ||
    'Enterprise audit aligning BaZi, Zi Wei, Qi Men, Feng Shui and numerology into an actionable board strategy.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/enterprise/audit`,
      languages: {
        en: '/EN/enterprise/audit',
        zh: '/CN/enterprise/audit',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/enterprise/audit`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <CelestialServicePage serviceKey="corporateAudit" lang={params.locale} />;
}
