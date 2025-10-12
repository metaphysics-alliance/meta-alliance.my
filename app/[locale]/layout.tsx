import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { locales, type Locale, getDict } from '@/lib/i18n';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return locales.map(l => ({ locale: l }));
}

export default function LocaleLayout({ params, children }:{ params:{ locale: Locale }, children: React.ReactNode }){
  getDict(params.locale);
  return (
    <>
      <Navbar locale={params.locale} />
      <main className="container py-10">{children}</main>
      <Footer locale={params.locale} />
    </>
  );
}
