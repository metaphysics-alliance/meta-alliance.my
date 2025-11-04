import LegalPage from '@/components/LegalPage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params?.locale || 'EN';
  const dict = getDict(locale);
  const policy = dict.legal?.cookies;
  const title = policy?.title || 'Cookies Policy';
  const desc =
    policy?.summary?.[0]?.description ||
    (locale === 'CN'
      ? 'Metaphysics Alliance 的 Cookies 政策说明我们如何收集及使用网站浏览数据。'
      : 'Metaphysics Alliance Cookies Policy describing how we collect and use browsing data.');
  return {
    title,
    description: desc,
    alternates: {
      canonical: `/${locale}/legal/cookies`,
      languages: { en: '/EN/legal/cookies', zh: '/CN/legal/cookies' },
    },
    openGraph: {
      title,
      description: desc,
      url: `/${locale}/legal/cookies`,
    },
  };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  return <LegalPage policyKey="cookies" locale={params.locale} />;
}
