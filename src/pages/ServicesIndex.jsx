/* eslint-disable import/order */
import Banner from '../components/Banner.jsx';
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import dictAll from '../../shared/i18n/dictionary.js'
import SectionDivider from '../components/SectionDivider.jsx'
import { useI18n } from '../i18n.jsx'

export default function ServicesIndex(){
  const { lang } = useI18n()
  const dict = dictAll?.[lang] || dictAll?.EN || {}
  const groups = Array.isArray(dict?.nav?.celestial_groups) ? dict.nav.celestial_groups : []

  return (
    <main className="container mx-auto max-w-6xl space-y-10 px-4 py-10">
      <SEOServices lang={lang} title={dict.nav?.celestial || 'Services'} description={(dict.why_long || '').slice(0,160)} />
            <Banner
        title={dict.nav?.celestial || 'Celestial Services'}
        description={dict.why_long}
      />

      {groups.map((group, gi) => (
        <section key={gi} className="space-y-4">
          <SectionDivider title={group.title || (lang === 'CN' ? '服务模块' : 'Service Group')} />
          <div className="grid gap-5 md:grid-cols-3">
            {Array.isArray(group.items) && group.items.map((item, ii) => (
              <Link
                key={`${gi}-${ii}-${item.title}`}
                to={item.href || '#'}
                className="block rounded-2xl border border-white/10 bg-black/30 p-0 backdrop-blur-md transition hover:border-gold/40 hover:bg-black/40"
              >
                <div className="overflow-hidden rounded-t-2xl ring-1 ring-white/10 bg-black/20">
                  <img
                    src={item.thumbnail || '/images/services/placeholder.svg'}
                    alt={item.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-5">
                  <div className="text-white/95 font-semibold">{item.title}</div>
                  {item.description ? (
                    <div className="mt-1 text-sm text-white/65">{item.description}</div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

function SEOServices({ lang, title, description }){
  useEffect(() => {
    document.title = `${title} | Metaphysics Alliance`
    const setMeta = (name, content) => {
      if (!content) return
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag){ tag = document.createElement('meta'); tag.setAttribute('name', name); document.head.appendChild(tag) }
      tag.setAttribute('content', content)
    }
    const setOg = (property, content) => {
      if (!content) return
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag){ tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag) }
      tag.setAttribute('content', content)
    }
    const setLink = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`)
      if (!link){ link = document.createElement('link'); link.setAttribute('rel', rel); document.head.appendChild(link) }
      link.setAttribute('href', href)
    }
    setMeta('description', description)
    setLink('canonical', `/${lang}/services`)
    setOg('og:title', title)
    setOg('og:description', description)
    setOg('og:image', '/images/og-default.jpg')
  }, [lang, title, description])
  return null
}
