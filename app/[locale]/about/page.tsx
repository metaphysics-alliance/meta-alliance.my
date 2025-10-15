import Link from 'next/link'

import Hero from '@/components/Hero'
import Content from '@/components/Content'
import MediaGrid from '@/components/MediaGrid'
import Testimonials from '@/components/Testimonials'
import VideoCarousel from '@/components/VideoCarousel'
import SectionDivider from '@/components/SectionDivider'
import StructuredData from '@/components/StructuredData'
import TextCarousel from '@/components/TextCarousel'
import Roadmap from '@/components/Roadmap'
import { getDict, type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const about = (dict as any).about || {}
  const hero = about.hero || {}
  return {
    title: hero.title || ((dict as any).nav?.about ?? 'About'),
    description: hero.description || (dict as any).why_long,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: '/EN/about', zh: '/CN/about' },
    },
    openGraph: {
      title: hero.title || 'About',
      description: hero.description || (dict as any).why_long,
      url: `/${locale}/about`,
    },
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  const locale = params.locale
  const dict = getDict(locale)
  const about = dict.about ?? {}
  const navTitle = (dict.nav && dict.nav.about) || 'About'

  const hero = about.hero ?? {}
  const founder = about.founder ?? {}
  const philosophy = about.philosophy ?? {}
  const what = about.what ?? {}
  const videos = about.videos ?? {}
  const story = about.story ?? {}
  const milestones = about.milestones ?? {}
  const team = about.team ?? {}
  const faq = about.faq ?? {}
  const faqExtras = locale === 'CN'
    ? [
      { q: '使用哪些方法？', a: '以中国玄学为核心：八字、紫微斗数、奇门遁甲、风水与数字能量；以交叉验证确保一致性。' },
      { q: '远程还是现场？', a: '均可。个人与多数企业咨询可通过 Zoom/Meet；风水与大型企业项目可预约现场。' },
      { q: '支持哪些语言？', a: '中英双语（CN/EN）。可在导航栏切换语言。' },
    ]
    : [
      { q: 'What methods do you use?', a: 'Chinese metaphysics across BaZi, Zi Wei Dou Shu, Qi Men Dun Jia, Feng Shui and numerology — cross‑validated for consistency.' },
      { q: 'Remote or onsite?', a: 'Both. Individuals and most corporate advisories via Zoom/Meet; Feng Shui and larger enterprise work onsite by arrangement.' },
      { q: 'What languages are supported?', a: 'English and Chinese (EN/CN). Use the navbar toggle to switch.' },
    ]

  const localise = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`)

  return (
    <div className="space-y-10">
      {/* JSON-LD: Organization + (optional) VideoObjects */}
      <StructuredData json={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Metaphysics Alliance',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        logo: '/logo.png',
        sameAs: [
          'https://www.facebook.com/MetaphysicsAlliance/',
          'https://www.instagram.com/metaphysics.alliance/',
          'https://www.tiktok.com/@metaphysicsalliance',
          'https://www.threads.com/@metaphysics.alliance?hl=en',
        ]
      }} />
      {Array.isArray(videos?.items) && videos.items.length ? (
        <StructuredData json={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: videos.items.map((v: any, i: number) => ({
            '@type': 'VideoObject',
            name: v.title,
            description: v.description || hero.description,
            thumbnailUrl: v.thumbnail || '/images/video/placeholder.svg',
            uploadDate: new Date().toISOString(),
            contentUrl: v.src || undefined,
          }))
        }} />
      ) : null}
      {/* JSON-LD: FAQPage */}
      {Array.isArray((about.faq || {}).items) && (about.faq.items as any[]).length ? (
        <StructuredData json={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (about.faq.items as any[]).map((qa: any) => ({
            '@type': 'Question',
            name: qa.q,
            acceptedAnswer: { '@type': 'Answer', text: qa.a },
          })),
        }} />
      ) : null}
      {/* Hero */}
      <Hero
        title={hero.title || navTitle}
        sub={hero.sub}
        description={hero.description}
        className={"bg-[url('/page-banner.png')] bg-cover bg-center bg-no-repeat bg-blend-multiply bg-black/50 min-h-[50vh] flex items-center -mt-10 -mb-10"}
        fullBleed
        actions={
          <div className="flex items-center gap-3">
            <Link href={localise('/contact')} className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-gold-soft">
              {(about.cta && about.cta.label) || (hero.cta || 'Contact Us')}
            </Link>
            <Link href={localise('/services')} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-gold/40 hover:text-white">
              {locale === 'CN' ? '了解我们的服务' : 'Explore Our Services'}
            </Link>
          </div>
        }
      />

      <SectionDivider title={locale === 'CN' ? '关于我们' : 'About Us'} />

      {/* Founder's Note */}
      <section className="grid gap-6 rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-md md:grid-cols-[minmax(0,300px)_1fr] md:p-10">
        <div className="space-y-3">
          <img
            src={founder && (founder as any).portrait || '/images/team/founder.png'}
            alt={`${founder.name_en || 'Founder'} portrait`}
            className="h-64 w-full rounded-2xl object-cover object-center ring-1 ring-white/10"
          />
          <div className="text-white/85">
            <div className="text-lg font-semibold">
              {(founder.name_en || 'Shaun Quan')} {founder.name_cn ? ` / ${founder.name_cn}` : ''}
            </div>
            <div className="text-sm text-white/65">{founder.role || 'Chief Chinese Metaphysician Analyst'}</div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{founder.title || "Founder's Note"}</h2>
          {(founder.paragraphs || []).map((p: string, i: number) => (
            <p key={i} className="text-base leading-relaxed text-white/75">{p}</p>
          ))}
        </div>
      </section>

      <SectionDivider title={philosophy.title || (locale === 'CN' ? '我们的理念' : 'Our Philosophy')} />

      {/* Philosophy */}
      <Content
        title={philosophy.title}
        highlight={philosophy.highlight}
        paragraphs={philosophy.paragraphs}
      />

      <SectionDivider title={what.title || (locale === 'CN' ? '我们的服务' : 'What We Do')} />

      {/* What We Do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{what.title || 'What We Do'}</h2>
        <MediaGrid dict={dict as any} path="about.what.items" />
      </section>

      <SectionDivider title={videos.title || (locale === 'CN' ? '1 分钟团队介绍' : '1‑Minute Intros')} />

      {/* 1-Minute Video Carousel */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{videos.title || '1‑Minute Intros'}</h2>
        <VideoCarousel dict={dict as any} path="about.videos.items" locale={locale} />
      </section>

      <SectionDivider title={locale === 'CN' ? '成长与里程碑' : 'Story & Milestones'} />

      {/* Story & Milestones */}
      <section className="space-y-6">
        <article className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
          <h3 className="text-xl font-semibold text-white">{story.title || 'Our Story'}</h3>
          <div className="mt-4">
            <TextCarousel items={(story.timeline || []).map((s: any) => ({ date: s.date, title: s.title, body: (s as any).body || s.outcome }))} />
          </div>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
          <h3 className="text-xl font-semibold text-white">{(milestones.title) || 'Milestones'}</h3>
          <div className="mt-4">
            {Array.isArray(milestones.items) && (milestones.items as any[]).length ? (
              <Roadmap items={milestones.items as any} />
            ) : (
              <img src={locale === 'CN' ? '/images/roadmap-cn.png' : '/images/roadmap-en.png'} alt={(milestones.title as string) || 'Milestones Roadmap'} className="w-full h-auto rounded-xl ring-1 ring-white/10" />
            )}
          </div>
        </article>
      </section>

      <SectionDivider title={team.title || (locale === 'CN' ? '团队' : 'Our Team')} />

      {/* Team */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{team.title || 'Our Team'}</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {(team.members || []).map((m: any, idx: number) => (
            <article key={idx} className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md">
              <img
                src={m.portrait || '/images/team/placeholder.svg'}
                alt={`${m.name_en} portrait`}
                className="mb-3 w-full h-auto rounded-xl object-contain object-center ring-1 ring-white/10"
              />
              <div className="text-white/90 font-semibold">
                {m.name_en} {m.name_cn ? <span className="text-white/70 font-normal">/ {m.name_cn}</span> : null}
              </div>
              <div className="text-sm text-white/65">{m.role}</div>
              <div className="mt-2 text-sm text-white/70">{m.focus}</div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials dict={dict as any} path="testimonials" />

      <SectionDivider title={faq.title || (locale === 'CN' ? '常见问题' : 'FAQ')} />

      {/* FAQ */}
      {Array.isArray(faq.items) && faq.items.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{faq.title || 'FAQ'}</h2>
          <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md">
            {[...faq.items, ...faqExtras].map((qa: any, idx: number) => (
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
      ) : null}

      {/* Final CTA */}
      <section className="rounded-3xl border border-white/10 bg-black/25 p-6 text-center">
        <h3 className="text-xl font-semibold text-white">{(about.cta && (about.cta as any).title) || (locale === 'CN' ? '联系团队' : 'Get in touch')}</h3>
        {about?.cta?.message ? <p className="mt-2 text-sm text-white/70">{(about.cta as any).message}</p> : null}
        <div className="mt-4 flex items-center justify-center gap-3">
          <Link href={localise('/contact')} className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gold-soft">
            {(about.cta && about.cta.label) || (locale === 'CN' ? '联系我们' : 'Contact Us')}
          </Link>
          <Link href={localise('/services')} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/85 transition hover:border-gold/40 hover:text-white">
            {locale === 'CN' ? '了解我们的服务' : 'Explore Our Services'}
          </Link>
        </div>
      </section>
    </div>
  )
}



