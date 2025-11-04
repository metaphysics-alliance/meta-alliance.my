import LegalPage from '@/components/LegalPage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params?.locale || 'EN';
  const dict = getDict(locale);
  const policy = dict.legal?.refund;
  const title = policy?.title || 'Refund Policy';
  const desc =
    policy?.summary?.[0]?.description ||
    (locale === 'CN'
      ? 'Metaphysics Alliance 退款政策说明相关条款。'
      : 'Metaphysics Alliance refund policy and applicable terms.');
  return {
    title,
    description: desc,
    alternates: {
      canonical: `/${locale}/legal/refund`,
      languages: { en: '/EN/legal/refund', zh: '/CN/legal/refund' },
    },
    openGraph: { title, description: desc, url: `/${locale}/legal/refund` },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <LegalPage policyKey="refund" locale={params.locale} />;
}

