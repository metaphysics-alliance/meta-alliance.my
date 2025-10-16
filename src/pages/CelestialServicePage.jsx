import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import MapCard from '../components/MapCard.jsx'
import Newsletter from '../components/Newsletter.jsx'
import SectionDivider from '../components/SectionDivider.jsx'
import { useI18n } from '../i18n.jsx'

const placeholderStyles = 'flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white/60 text-sm uppercase tracking-wide'

const FALLBACK_LABELS = {
  EN: {
    badge: 'Service',
    overviewDividerTitle: 'Service Overview',
    overviewDividerSubtitle: 'What this engagement covers',
    overviewImageLabel: 'Service Blueprint',
    idealDividerTitle: 'Ideal Clients',
    idealDividerSubtitle: 'Who benefits most',
    idealTitle: 'Ideal for',
  },
  CN: {
    badge: '服务',
    overviewDividerTitle: '服务概览',
    overviewDividerSubtitle: '涵盖内容',
    overviewImageLabel: '服务蓝图',
    idealDividerTitle: '适合对象',
    idealDividerSubtitle: '谁最受益',
    idealTitle: '适用于',
  },
}

const MAP_DIVIDER = {
  EN: {
    title: 'Where we serve you',
    subtitle: 'Headquartered in Malaysia with global virtual consulting',
  },
  CN: {
    title: '服务范围',
    subtitle: '总部位于马来西亚，提供全球线上咨询',
  },
}

function getDefaultCta(lang){
  if (lang === 'CN'){
    return {
      dividerTitle: '准备好开始了吗？',
      dividerSubtitle: '预约咨询',
      title: '预约咨询',
      message: '准备与我们合作？预约一次咨询，我们会为你拟定专属方案。',
      primaryLabel: '预约咨询',
      primaryHref: '/contact',
      secondaryLabel: '联系团队',
      secondaryHref: '/contact',
    }
  }

  return {
    dividerTitle: 'Ready to begin?',
    dividerSubtitle: 'Book your consultation',
    title: 'Book a consultation',
    message: 'Ready to explore this work together? Book a consultation and we will craft a custom plan for you.',
    primaryLabel: 'Book consultation',
    primaryHref: '/contact',
    secondaryLabel: 'Talk with our team',
    secondaryHref: '/contact',
  }
}

function getDefaultNewsletter(lang){
  return lang === 'CN'
    ? {
        title: '紧扣天时脉动',
        subtitle: '订阅天时提醒、策略洞察与真实案例。',
      }
    : {
        title: 'Stay aligned with celestial timing',
        subtitle: 'Subscribe for timing windows, strategy notes and case studies.',
      }
}

const Card = ({ section }) => (
  <div className="card-3d p-6 md:p-8 flex flex-col md:flex-row gap-6">
    <div className="w-full md:w-1/3 aspect-video md:aspect-square">
      <div className={`${placeholderStyles} w-full h-full`}>
        {section.imageLabel || 'Visual Preview'}
      </div>
    </div>
    <div className="flex-1 space-y-4">
      {section.title ? <h3 className="text-2xl font-semibold text-gold">{section.title}</h3> : null}
      {section.body ? <p className="text-white/75 leading-relaxed">{section.body}</p> : null}
      {Array.isArray(section.points) && section.points.length ? (
        <ul className="space-y-2 text-white/70 list-disc list-inside">
          {section.points.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      ) : null}
    </div>
  </div>
)

const CTASection = ({ cta }) => (
  <div className="card-3d p-6 md:p-8 text-center space-y-4">
    <h3 className="text-2xl font-semibold text-gold">{cta.title}</h3>
    <p className="text-white/75 md:text-lg leading-relaxed">{cta.message}</p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
      <Link to={cta.primaryHref} className="px-5 py-2.5 rounded-lg bg-gold text-black font-semibold shadow-soft-xl hover:brightness-110 transition">
        {cta.primaryLabel}
      </Link>
      {cta.secondaryHref && cta.secondaryLabel ? (
        <Link to={cta.secondaryHref} className="px-5 py-2.5 rounded-lg border border-gold/50 text-gold hover:bg-gold/10 transition">
          {cta.secondaryLabel}
        </Link>
      ) : null}
    </div>
  </div>
)

function buildFromContent(content, lang){
  const labels = FALLBACK_LABELS[lang] ?? FALLBACK_LABELS.EN
  const defaultCta = getDefaultCta(lang)
  const defaultNewsletter = getDefaultNewsletter(lang)

  const subtitle = content.subtitle ?? content.intro ?? ''
  const sections = []

  sections.push({
    key: 'overview',
    dividerTitle: content.overviewHeading ?? labels.overviewDividerTitle,
    dividerSubtitle: content.overviewSubtitle ?? labels.overviewDividerSubtitle,
    title: content.overviewTitle ?? content.title,
    imageLabel: content.imageLabel ?? labels.overviewImageLabel,
    body: content.overviewBody ?? subtitle,
    points: content.bullets ?? [],
  })

  if (content.ideal || (content.idealPoints && content.idealPoints.length)){
    sections.push({
      key: 'ideal',
      dividerTitle: content.idealHeading ?? labels.idealDividerTitle,
      dividerSubtitle: content.idealSubtitle ?? labels.idealDividerSubtitle,
      title: content.idealTitle ?? labels.idealTitle,
      body: content.ideal ?? '',
      points: content.idealPoints,
    })
  }

  if (Array.isArray(content.extraSections) && content.extraSections.length){
    sections.push(...content.extraSections)
  }

  return {
    badge: content.badge ?? labels.badge,
    title: content.title,
    subtitle,
    sections,
    cta: content.cta ?? defaultCta,
    newsletterTitle: content.newsletterTitle ?? defaultNewsletter.title,
    newsletterSubtitle: content.newsletterSubtitle ?? defaultNewsletter.subtitle,
  }
}

export default function CelestialServicePage({ serviceKey, content }){
  const { t, lang } = useI18n()

  let data = null

  if (serviceKey){
    const dictValue = t(`services.${serviceKey}`)
    if (dictValue && typeof dictValue === 'object'){
      data = dictValue
    }
  }

  if (!data && content){
    const localizedContent = (() => {
      if (lang === 'CN' && content?.CN) return content.CN
      if (lang === 'EN' && content?.EN) return content.EN
      if (content?.EN) return content.EN
      if (content?.CN) return content.CN
      return content
    })()

    if (localizedContent){
      data = buildFromContent(localizedContent, lang)
    }
  }

  if (!data){
    return null
  }

  const sections = Array.isArray(data.sections) ? data.sections : []
  const cta = data.cta ?? getDefaultCta(lang)
  const defaultNewsletter = getDefaultNewsletter(lang)
  const newsletterTitle = data.newsletterTitle ?? defaultNewsletter.title
  const newsletterSubtitle = data.newsletterSubtitle ?? defaultNewsletter.subtitle
  const mapLabels = MAP_DIVIDER[lang] ?? MAP_DIVIDER.EN

  return (
    <main className="space-y-14 pb-20">
      <SEOService lang={lang} title={data.title} description={data.subtitle} />
      <header className="bg-black/40 border-b border-white/10 py-16 backdrop-blur-2xl">
        <div className="container max-w-4xl mx-auto text-center space-y-4">
          {data.badge ? (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/70 text-xs uppercase tracking-[0.3em]">
              {data.badge}
            </span>
          ) : null}
          <h1 className="text-3xl md:text-4xl font-semibold text-gold leading-tight">{data.title}</h1>
          {data.subtitle ? (
            <p className="text-white/70 md:text-lg leading-relaxed">{data.subtitle}</p>
          ) : null}
        </div>
      </header>

      <div className="space-y-16">
        {sections.map((section) => (
          <section key={section.key ?? section.title} className="space-y-6">
            <SectionDivider title={section.dividerTitle} subtitle={section.dividerSubtitle} />
            <div className="container">
              <Card section={section} />
            </div>
          </section>
        ))}

        {cta ? (
          <section className="space-y-6">
            <SectionDivider title={cta.dividerTitle} subtitle={cta.dividerSubtitle} />
            <div className="container">
              <CTASection cta={cta} />
            </div>
          </section>
        ) : null}

        <section className="space-y-6">
          <SectionDivider title={newsletterTitle} subtitle={newsletterSubtitle} />
          <Newsletter />
        </section>

        <section className="space-y-6">
          <SectionDivider title={mapLabels.title} subtitle={mapLabels.subtitle} />
          <div className="container">
            <MapCard variant="inline" />
          </div>
        </section>
      </div>
    </main>
  )
}

function SEOService({ lang, title, description }){
  useEffect(() => {
    const path = window.location.pathname
    document.title = `${title || 'Service'} | Metaphysics Alliance`
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
    setLink('canonical', path)
    setOg('og:title', title)
    setOg('og:description', desc)
    setOg('og:image', '/images/og-default.jpg')

    const json = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang, item: `/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `/${lang}/services` },
        { '@type': 'ListItem', position: 3, name: title, item: path },
      ],
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(json)
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [lang, title, description])
  return null
}

