import Hero from '@/components/Hero';
import Content from '@/components/Content';
import MediaGrid from '@/components/MediaGrid';
import Testimonials from '@/components/Testimonials';
import MapEmbed from '@/components/MapEmbed';
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params?.locale || 'EN'
  const dict = getDict(locale)
  const title = dictTitleSafe(dict as any, 'shop.feng_shui_ornaments') || 'Feng Shui Ornaments'
  const desc = locale === 'CN' ? '风水摆件与布局器物。' : 'Feng Shui ornaments and layout items.'
  return {
    title,
    description: desc,
    alternates: { canonical: `/${locale}/shop/feng-shui-ornaments`, languages: { en: '/EN/shop/feng-shui-ornaments', zh: '/CN/shop/feng-shui-ornaments' } },
    openGraph: { title, description: desc, url: `/${locale}/shop/feng-shui-ornaments` },
  }
  function dictTitleSafe(d:any, key:string){
    try{ return key.split('.').reduce((o:any,k)=>o&&o[k]!=null?o[k]:key, d) }catch{ return key }
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  const dict = getDict(params.locale);
  const title = dictTitle(dict, 'shop.ornaments');
  return (
    <div className='space-y-10'>
      <Hero title={title} locale={params.locale} />
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

