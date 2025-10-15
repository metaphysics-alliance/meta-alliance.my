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
  const title = dictTitleSafe(dict as any, 'shop.crystals') || 'Crystals'
  const desc = locale === 'CN' ? '水晶与能量石。' : 'Crystals and energy stones.'
  return {
    title,
    description: desc,
    alternates: { canonical: `/${locale}/shop/crystals`, languages: { en: '/EN/shop/crystals', zh: '/CN/shop/crystals' } },
    openGraph: { title, description: desc, url: `/${locale}/shop/crystals` },
  }
  function dictTitleSafe(d:any, key:string){
    try{ return key.split('.').reduce((o:any,k)=>o&&o[k]!=null?o[k]:key, d) }catch{ return key }
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  const dict = getDict(params.locale);
  const title = dictTitle(dict, 'shop.crystals');
  return (
    <div className='space-y-10'>
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

