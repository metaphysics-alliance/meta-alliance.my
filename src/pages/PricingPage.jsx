/* eslint-disable import/order */
import { useEffect, useMemo, useState } from 'react'

import PricingExperience from '../components/PricingExperience.jsx'
import dictAll from '../../shared/i18n/dictionary.js'
import { useI18n } from '../i18n.jsx'
import { supabase } from '../lib/supabaseClient'
import applyServicePricing from '../../shared/pricing/servicePricing.js'

export default function PricingPage() {
  const { lang } = useI18n()
  const locale = lang === 'CN' ? 'CN' : 'EN'
  const dict = dictAll?.[lang] || dictAll?.EN || {}
  const referencePricing = dictAll?.EN?.pricing || {}

  const [serviceRows, setServiceRows] = useState([])
  const [rateRow, setRateRow] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const { data, error } = await supabase
          .from('service_pricing')
          .select('service_id, service_name, price_myr, price_usd')
        if (error) {
          throw error
        }
        if (!cancelled) {
          setServiceRows(Array.isArray(data) ? data : [])
        }

        const { data: rateData, error: rateError } = await supabase
          .from('service_pricing_rates')
          .select('rate_key, rate, captured_at')
          .eq('rate_key', 'MYR_USD')
          .limit(1)
          .maybeSingle()

        if (!cancelled) {
          if (rateError && rateError.code !== 'PGRST116') {
            throw rateError
          }
          setRateRow(rateData ?? null)
        }
      } catch (err) {
        console.error('Failed to load Supabase pricing rows:', err)
        if (!cancelled) {
          setServiceRows([])
          setRateRow(null)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const pricing = useMemo(() => {
    const base = dict.pricing || {}
    return applyServicePricing(base, referencePricing, serviceRows, { locale, rate: rateRow })
  }, [dict, referencePricing, serviceRows, rateRow, locale])

  return (
    <main>
      <SEOPricing
        lang={lang}
        title={pricing.heroTitle || (lang === 'CN' ? '???????' : 'Pricing & Engagement Levels')}
        description={
          pricing.heroDescription ||
          (lang === 'CN'
            ? '????????????????????????????'
            : 'Understand the investment levels for bespoke metaphysics programmes serving leaders, families and enterprise teams.')
        }
      />
      <PricingExperience locale={locale} pricing={pricing} />
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
