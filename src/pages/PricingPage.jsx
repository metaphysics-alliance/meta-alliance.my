/* eslint-disable import/order */
import { useEffect, useMemo } from 'react'

import PricingExperience from '../components/PricingExperience.jsx'
import dictAll from '../../shared/i18n/dictionary.js'
import { useI18n } from '../i18n.jsx'

export default function PricingPage() {
  const { lang } = useI18n()
  const dict = dictAll?.[lang] || dictAll?.EN || {}
  const pricing = useMemo(() => dict.pricing || {}, [dict])

  return (
    <main>
      <SEOPricing
        lang={lang}
        title={pricing.heroTitle || (lang === 'CN' ? '服务套餐与定价' : 'Pricing & Engagement Levels')}
        description={
          pricing.heroDescription ||
          (lang === 'CN'
            ? '了解针对高层领导、家族传承与企业团队的定制玄学方案投入。'
            : 'Understand the investment levels for bespoke metaphysics programmes serving leaders, families and enterprise teams.')
        }
      />
      <PricingExperience locale={lang === 'CN' ? 'CN' : 'EN'} pricing={pricing} />
    </main>
  )
}

function SEOPricing({ lang, title, description }) {
  useEffect(() => {
    document.title = `${title} | Metaphysics Alliance`
    const setMeta = (name, content) => {
      if (!content) return
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    const setOg = (property, content) => {
      if (!content) return
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    const setLink = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`)
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', rel)
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }
    setMeta('description', description)
    setLink('canonical', `/${lang}/pricing`)
    setOg('og:title', title)
    setOg('og:description', description)
    setOg('og:image', '/images/og-default.jpg')
  }, [lang, title, description])
  return null
}
