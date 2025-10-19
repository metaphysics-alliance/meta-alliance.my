import LegalPage from '@/components/LegalPage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params?.locale || 'EN'
  const dict = getDict(locale)
  const policy = dict.legal?.privacy
  const title = policy?.title || 'Privacy Policy'
  const desc = policy?.paragraphs?.[0] || (locale === 'CN' ? 'Metaphysics Alliance 隐私政策。' : 'Metaphysics Alliance Privacy Policy.')
  return {
    title,
    description: desc,
    alternates: { canonical: `/${locale}/legal/privacy`, languages: { en: '/EN/legal/privacy', zh: '/CN/legal/privacy' } },
    openGraph: { title, description: desc, url: `/${locale}/legal/privacy` },
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  return <LegalPage policyKey="privacy" locale={params.locale} />;
}
