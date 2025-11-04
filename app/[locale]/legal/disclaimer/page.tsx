import LegalPage from '@/components/LegalPage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params?.locale || 'EN';
  const dict = getDict(locale);
  const policy = dict.legal?.disclaimer;
  const title = policy?.title || 'Disclaimer';
  const desc =
    policy?.paragraphs?.[0] ||
    (locale === 'CN' ? 'Metaphysics Alliance 免责声明。' : 'Metaphysics Alliance Disclaimer.');

  return {
    title,
    description: desc,
    alternates: {
      canonical: `/${locale}/legal/disclaimer`,
      languages: { en: '/EN/legal/disclaimer', zh: '/CN/legal/disclaimer' },
    },
    openGraph: { title, description: desc, url: `/${locale}/legal/disclaimer` },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <LegalPage policyKey="disclaimer" locale={params.locale} />;
}

