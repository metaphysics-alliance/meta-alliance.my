import { useEffect, useMemo, useState } from 'react'

import PricingCheckout from '../components/PricingCheckout.jsx'
import dictAll from '../../shared/i18n/dictionary.js'
import { useI18n } from '../i18n.jsx'
import { supabase } from '../lib/supabaseClient'
import applyServicePricing from '../../shared/pricing/servicePricing.js'

export default function CheckoutPage() {
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
        console.error('Failed to load Supabase pricing rows (checkout):', err)
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
      <PricingCheckout locale={locale} pricing={pricing} />
    </main>
  )
}
