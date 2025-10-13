import { Link } from 'react-router-dom'

import i18nDict from '../../shared/i18n/dictionary.js'
import SectionDivider from '../components/SectionDivider.jsx'
import VideoCarousel from '../components/VideoCarousel.jsx'
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
      {/* Hero */}
      <header className="rounded-2xl border border-white/10 bg-black/30 p-8 backdrop-blur-md">
        {hero.sub ? <p className="text-xs uppercase tracking-[0.3em] text-white/60">{hero.sub}</p> : null}
        <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{hero.title || 'About Metaphysics Alliance'}</h1>
        {hero.description ? <p className="mt-3 max-w-3xl text-white/70">{hero.description}</p> : null}
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Link to="/contact" className="rounded-lg bg-gold px-4 py-2 font-medium text-black hover:bg-gold-soft">{(about.cta && about.cta.label) || (lang === 'CN' ? '联系我们' : 'Contact Us')}</Link>
          <Link to="/services" className="rounded-lg border border-white/15 px-4 py-2 font-medium text-white/85 transition hover:border-gold/40 hover:text-white">{lang === 'CN' ? '了解我们的服务' : 'Explore Our Services'}</Link>
        </div>
      </header>

      <SectionDivider title={lang === 'CN' ? '关于我们' : 'About Us'} subtitle={hero.sub || ''} />

      {/* Founder's Note */}
      <section className="grid gap-6 rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-md md:grid-cols-[minmax(0,300px)_1fr] md:p-10">
        <div className="space-y-3">
          <div className="h-64 w-full rounded-2xl bg-white/5 ring-1 ring-white/10" />
          <div className="text-white/85">
            <div className="text-lg font-semibold">
              {(founder.name_en || 'Shaun Quan')} {founder.name_cn ? ` / ${founder.name_cn}` : ''}
            </div>
            <div className="text-sm text-white/65">{founder.role || (lang === 'CN' ? '首席中国玄学分析师' : 'Chief Chinese Metaphysician Analyst')}</div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{founder.title || (lang === 'CN' ? '创始人寄语' : "Founder's Note")}</h2>
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

      {/* Videos (carousel) */}
      <SectionDivider title={videos.title || (lang === 'CN' ? '1 分钟团队介绍' : '1‑Minute Intros')} />
      <VideoCarousel items={videos.items} locale={lang} />

      {/* Story & Milestones */}
      <SectionDivider title={lang === 'CN' ? '成长与里程碑' : 'Story & Milestones'} />
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
          <h3 className="text-xl font-semibold text-white">{story.title || (lang === 'CN' ? '成长历程' : 'Our Story')}</h3>
          <div className="mt-4 space-y-3 text-sm text-white/75">
            {(story.timeline || []).map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="shrink-0 rounded-md bg-white/10 px-2 py-1 text-xs text-white/80">{item.date}</span>
                <div>
                  <div className="font-medium text-white/90">{item.title}</div>
                  <div className="text-white/65">{item.outcome}</div>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
          <h3 className="text-xl font-semibold text-white">{milestones.title || (lang === 'CN' ? '里程碑' : 'Milestones')}</h3>
          <div className="mt-4 space-y-3 text-sm text-white/75">
            {(milestones.items || []).map((m, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="shrink-0 rounded-md bg-white/10 px-2 py-1 text-xs text-white/80">{m.date}</span>
                <div className="text-white/70">{m.outcome}</div>
              </div>
            ))}
          </div>
        </article>
      </section>

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
