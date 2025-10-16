import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import i18nDict from '../../shared/i18n/dictionary.js'
import SectionDivider from '../components/SectionDivider.jsx'
// TextCarousel and Roadmap removed with the Story & Milestones section
import VideoCarousel from '../components/VideoCarousel.jsx'
import InteractiveMilestonesSerpentine from '../components/InteractiveMilestonesSerpentine.jsx'
import { useI18n } from '../i18n.jsx'

export default function AboutPage(){
  const { lang } = useI18n()
  const about = (i18nDict?.[lang]?.about) || (i18nDict?.EN?.about) || {}
  const hero = about.hero || {}
  const founder = about.founder || {}
  const philosophy = about.philosophy || {}
  const what = about.what || {}
  const videos = about.videos || {}
  const story = about.story || {}
  const milestones = about.milestones || {}
  const team = about.team || {}
  const faq = about.faq || {}

  return (
    <main className="container mx-auto max-w-6xl space-y-12 px-4 py-10">
      <SEOAbout lang={lang} title={hero.title} description={hero.description} />
      {/* Hero (edge-to-edge banner, match Contact) */}
      <header className="relative w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] -mt-8 -mb-8 min-h-[50vh] flex items-center text-center rounded-none border-0 p-8 md:p-12 overflow-hidden">
        <img src="/page-banner.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.75 }} />
        <div className="relative z-10 mx-auto max-w-6xl">
        {hero.sub ? <p className="text-xs uppercase tracking-[0.3em] text-white/60">{hero.sub}</p> : null}
        <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{hero.title || 'About Metaphysics Alliance'}</h1>
        {hero.description ? <p className="mt-3 max-w-3xl text-white/70">{hero.description}</p> : null}
        <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
          <Link to="/contact" className="rounded-lg bg-gold px-4 py-2 font-medium text-black hover:bg-gold-soft">{(about.cta && about.cta.label) || (lang === 'CN' ? '联系我们' : 'Contact Us')}</Link>
          <Link to="/services" className="rounded-lg border border-white/15 px-4 py-2 font-medium text-white/85 transition hover:border-gold/40 hover:text-white">{lang === 'CN' ? '了解我们的服务' : 'Explore Our Services'}</Link>
        </div>
        </div>
      </header>

      <SectionDivider title={lang === 'CN' ? '关于我们' : 'About Us'} subtitle={hero.sub || ''} />

      {/* Founder's Note */}
      <section className="grid gap-6 rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-md md:grid-cols-[minmax(0,300px)_1fr] md:p-10">
        <div className="space-y-3">
          <img
            src={(about?.founder && about.founder.portrait) || '/images/team/founder.png'}
            alt={`${(about?.founder?.name_en || 'Founder')} portrait`}
            className="w-full h-auto rounded-2xl object-contain object-center ring-1 ring-white/10"
          />
          <div className="text-white/85">
            <div className="text-lg font-semibold">
              {(founder.name_en || 'Shaun Quan')} {founder.name_cn ? ` / ${founder.name_cn}` : ''}
            </div>
            <div className="text-sm text-white/65">{founder.role || (lang === 'CN' ? '首席中国玄学分析师' : 'Chief Chinese Metaphysician Analyst')}</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-2xl font-semibold leading-none text-white md:text-3xl">{founder.title || (lang === 'CN' ? '创始人寄语' : "Founder's Note")}</h2>
            <img
              src="/images/team/SQ-SIGN.png"
              alt="Founder signature"
              className="shrink-0 self-end w-20 opacity-90 sm:w-24 md:w-28 transform origin-bottom-right scale-[1.3] translate-y-[7px]"
            />
          </div>
          {(founder.paragraphs || []).map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-white/75">{p}</p>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <SectionDivider title={philosophy.title || (lang === 'CN' ? '我们的理念' : 'Our Philosophy')} subtitle={philosophy.highlight || ''} />
      <section className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
        <h3 className="text-xl font-semibold text-white">{philosophy.title || (lang === 'CN' ? '我们的理念' : 'Our Philosophy')}</h3>
        {philosophy.highlight ? <p className="mt-1 text-sm text-gold-soft/90">{philosophy.highlight}</p> : null}
        <div className="mt-3 grid gap-3">
          {(philosophy.paragraphs || []).map((p, i) => (<p key={i} className="text-sm text-white/70">{p}</p>))}
        </div>
      </section>

      {/* What We Do */}
      <SectionDivider title={what.title || (lang === 'CN' ? '我们的服务' : 'What We Do')} />
      <section className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
        <h3 className="text-xl font-semibold text-white">{what.title || (lang === 'CN' ? '我们的服务' : 'What We Do')}</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {(what.items || []).map((item, i) => (
            <article key={i} className="rounded-lg border border-white/10 bg-black/30 p-4 backdrop-blur-md">
              <div className="font-medium text-white/90">{item.title}</div>
              {item.description ? <p className="mt-1 text-sm text-white/70">{item.description}</p> : null}
            </article>
          ))}
        </div>
      </section>

      {/* Story & Milestones section removed as requested */}

      {/* Videos (carousel) */}
      <SectionDivider title={videos.title || (lang === 'CN' ? '1 分钟团队介绍' : '1‑Minute Intros')} />
      <VideoCarousel items={videos.items} locale={lang} />

      {/* Our Story & Milestones (interactive) */}
      <SectionDivider title={(milestones.title || story.title) || (lang === 'CN' ? '里程碑与成就' : 'Milestones & Achievements')} />
      <InteractiveMilestonesSerpentine
        title={(milestones.title || story.title) || (lang === 'CN' ? '里程碑与成就—玄域联盟（Metaphysics Alliance）' : 'Milestones & Achievements — Metaphysics Alliance (玄域联盟)')}
        storyItems={(story && story.timeline) || []}
        milestoneItems={(milestones && milestones.items) || []}
        lang={lang}
      />

      {/* Team */}
      <SectionDivider title={team.title || (lang === 'CN' ? '团队' : 'Our Team')} />
      <section className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
        <h3 className="text-xl font-semibold text-white">{team.title || (lang === 'CN' ? '团队' : 'Our Team')}</h3>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {(team.members || []).map((m, idx) => (
            <article key={idx} className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md">
              <img src={m.portrait || '/images/team/placeholder.svg'} alt={`${m.name_en} portrait`} className="mb-3 w-full h-auto rounded-xl object-contain object-center ring-1 ring-white/10" />
              <div className="text-white/90 font-semibold">{m.name_en} {m.name_cn ? <span className="text-white/70 font-normal">/ {m.name_cn}</span> : null}</div>
              <div className="text-sm text-white/65">{m.role}</div>
              <div className="mt-2 text-sm text-white/70">{m.focus}</div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {Array.isArray(faq.items) && faq.items.length ? (
        <>
        <SectionDivider title={faq.title || (lang === 'CN' ? '常见问题' : 'FAQ')} />
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{faq.title || (lang === 'CN' ? '常见问题' : 'FAQ')}</h2>
          <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md">
            {faq.items.map((qa, idx) => (
              <details key={idx} className="group border-b border-white/10 last:border-none">
                <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-white/90 transition hover:bg-white/5">
                  <span>{qa.q}</span>
                  <span className="text-white/50 transition group-open:rotate-180">▾</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-white/70">{qa.a}</div>
              </details>
            ))}
          </div>
        </section>
        </>
      ) : null}

      {/* Final CTA */}
      <section className="rounded-2xl border border-white/10 bg-black/25 p-6 text-center backdrop-blur-md">
        <h3 className="text-xl font-semibold text-white">{(about.cta && about.cta.title) || (lang === 'CN' ? '联系团队' : 'Get in touch')}</h3>
        {about?.cta?.message ? <p className="mt-2 text-sm text-white/70">{about.cta.message}</p> : null}
        <div className="mt-4 flex justify-center gap-3">
          <Link to="/contact" className="rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-black hover:bg-gold-soft">{(about.cta && about.cta.label) || (lang === 'CN' ? '联系我们' : 'Contact Us')}</Link>
          <Link to="/services" className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/85 transition hover:border-gold/40 hover:text-white">{lang === 'CN' ? '了解我们的服务' : 'Explore Our Services'}</Link>
        </div>
      </section>
    </main>
  )
}

function SEOAbout({ lang, title, description }){
  useEffect(() => {
    const t = `${title || (lang === 'CN' ? '关于我们' : 'About Metaphysics Alliance')} | Metaphysics Alliance`
    document.title = t
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
    const desc = (description || '').slice(0, 160)
    setMeta('description', desc)
    setLink('canonical', `/${lang}/about`)
    setOg('og:title', title || 'About')
    setOg('og:description', desc)
    setOg('og:image', '/images/og-default.jpg')
  }, [lang, title, description])
  return null
}






