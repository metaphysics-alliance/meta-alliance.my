import LegalPage from '@/components/LegalPage';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params?.locale || 'EN'
  const dict = getDict(locale)
  const policy = dict.legal?.terms
  const title = policy?.title || 'Terms of Service'
  const desc = policy?.paragraphs?.[0] || (locale === 'CN' ? 'Metaphysics Alliance 服务条款。' : 'Metaphysics Alliance Terms of Service.')
  return {
    title,
    description: desc,
    alternates: { canonical: `/${locale}/legal/terms`, languages: { en: '/EN/legal/terms', zh: '/CN/legal/terms' } },
    openGraph: { title, description: desc, url: `/${locale}/legal/terms` },
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  return <LegalPage policyKey="terms" locale={params.locale} />;
}