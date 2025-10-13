import Link from 'next/link'
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import { getDict, type Locale } from '@/lib/i18n';

export default function Page({ params }:{ params:{ locale: Locale }}){
  const locale = params.locale
  const dict = getDict(locale);
  const title = dictTitle(dict, 'nav.celestial') || dictTitle(dict, 'nav.services');
  const groups = Array.isArray(dict.nav?.celestial_groups) ? dict.nav.celestial_groups as any[] : []
  const localise = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`)
  return (
    <div className='space-y-10'>
      <Hero title={title} sub={dict.why_long} />

      {groups.map((group, gi) => (
        <section key={gi} className='space-y-4'>
          <h2 className='text-2xl md:text-3xl font-semibold text-white'>{group.title}</h2>
          <div className='grid gap-5 md:grid-cols-3'>
            {Array.isArray(group.items) && group.items.map((item: any, ii: number) => (
              <Link
                key={`${gi}-${ii}-${item.title}`}
                href={localise(item.href || '#')}
                className='block rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md transition hover:border-gold/40 hover:bg-black/40'
              >
                <div className='text-white/95 font-semibold'>{item.title}</div>
                {item.description ? <div className='mt-1 text-sm text-white/65'>{item.description}</div> : null}
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

