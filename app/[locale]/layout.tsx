import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { locales, type Locale, getDict } from '@/lib/i18n';
import type { Metadata } from 'next'

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return locales.map(l => ({ locale: l }));
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const locale = params.locale || 'EN'
  const href = `${base}/${locale}`
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/EN',
        zh: '/CN',
      },
    },
    openGraph: {
      locale: locale === 'CN' ? 'zh-CN' : 'en_US',
      url: href,
    },
  }
}

export default function LocaleLayout({ params, children }:{ params:{ locale: Locale }, children: React.ReactNode }){
  getDict(params.locale);
  const localeClass = params.locale === 'CN' ? 'locale-cn' : undefined;

  return (
    <div className={localeClass} data-locale={params.locale}>
      <Navbar locale={params.locale} />
      <main className="container py-10">{children}</main>
      <Footer locale={params.locale} />
    </div>
  );
}
