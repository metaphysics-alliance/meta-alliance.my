import Hero from '@/components/Hero';
import StructuredData from '@/components/StructuredData'
import Content from '@/components/Content';
import MediaGrid from '@/components/MediaGrid';
import Testimonials from '@/components/Testimonials';
import MapEmbed from '@/components/MapEmbed';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const title = dictTitle(dict as any, 'svc.ziwei')
  const desc = (dict as any).why_long || 'Zi Wei Dou Shu guidance calibrated to classical canons.'
  return {
    title: String(title),
    description: String(desc).slice(0, 160),
    alternates: { canonical: `/${locale}/services/ziwei`, languages: { en: '/EN/services/ziwei', zh: '/CN/services/ziwei' } },
    openGraph: { title: String(title), description: String(desc).slice(0, 160), url: `/${locale}/services/ziwei` },
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  const dict = getDict(params.locale);
  const title = dictTitle(dict, 'svc.ziwei');
  const base = process.env.NEXT_PUBLIC_SITE_URL || ''
  return (
    <div className='space-y-10'>
      <StructuredData json={{
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: params.locale, item: `${base}/${params.locale}` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${base}/${params.locale}/services` },
          { '@type': 'ListItem', position: 3, name: String(title), item: `${base}/${params.locale}/services/ziwei` },
        ]
      }} />
      <StructuredData json={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: String(title),
        provider: { '@type': 'Organization', name: 'Metaphysics Alliance', url: base || undefined },
        areaServed: ['Malaysia','Singapore','APAC'],
        availableLanguage: ['en','zh'],
        url: `${base}/${params.locale}/services/ziwei`
      }} />
      <Hero title={title} />
      <Content title={title} />
      <MediaGrid/>
      <Testimonials/>
      <section className='space-y-4'>
        <h2 className='text-2xl md:text-3xl font-semibold'>Map</h2>
        <MapEmbed/>
      </section>
    </div>
  );
}

function dictTitle(dict:any, key:string){
  try{
    return key.split('.').reduce((o:any,k)=>o&&o[k]!=null?o[k]:key, dict);
  }catch(e){return key;}
}

