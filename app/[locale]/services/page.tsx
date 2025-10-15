import Link from 'next/link'
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import StructuredData from '@/components/StructuredData'
import { getDict, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const title = dictTitle(dict as any, 'nav.celestial') || dictTitle(dict as any, 'nav.services')
  const desc = (dict as any).why_long || 'Explore our Chinese metaphysics services.'
  return {
    title,
    description: desc,
    alternates: {
      canonical: `/${locale}/services`,
      languages: { en: '/EN/services', zh: '/CN/services' },
    },
    openGraph: { title, description: desc, url: `/${locale}/services` },
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  const locale = params.locale
  const dict = getDict(locale);
  const title = dictTitle(dict, 'nav.celestial') || dictTitle(dict, 'nav.services');
  const groups = Array.isArray(dict.nav?.celestial_groups) ? dict.nav.celestial_groups as any[] : []
  const localise = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`)
  return (
    <div className='space-y-10'>
      {/* JSON-LD: ItemList of services */}
      <StructuredData json={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: (groups || []).flatMap((g: any) => Array.isArray(g.items) ? g.items : []).map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}${localise(item.href || '')}`,
          name: item.title,
        }))
      }} />
      <Hero title={title} sub={dict.why_long} />

      {groups.map((group, gi) => (
        <section key={gi} className='space-y-4'>
          <h2 className='text-2xl md:text-3xl font-semibold text-white'>{group.title}</h2>
          <div className='grid gap-5 md:grid-cols-3'>
            {Array.isArray(group.items) && group.items.map((item: any, ii: number) => (
              <Link
                key={`${gi}-${ii}-${item.title}`}
                href={localise(item.href || '#')}
                className='block rounded-2xl border border-white/10 bg-black/30 p-0 backdrop-blur-md transition hover:border-gold/40 hover:bg-black/40'
              >
                <div className='overflow-hidden rounded-t-2xl ring-1 ring-white/10 bg-black/20'>
                  <img
                    src={(item.thumbnail as string) || '/images/services/placeholder.svg'}
                    alt={item.title}
                    className='w-full h-auto object-contain'
                  />
                </div>
                <div className='p-5'>
                  <div className='text-white/95 font-semibold'>{item.title}</div>
                  {item.description ? <div className='mt-1 text-sm text-white/65'>{item.description}</div> : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <Testimonials/>
    </div>
  );
}

function dictTitle(dict:any, key:string){
  try{
    return key.split('.').reduce((o:any,k)=>o&&o[k]!=null?o[k]:key, dict);
  }catch(e){return key;}
}

