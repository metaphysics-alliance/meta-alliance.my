import { useMemo } from "react"

import PricingCheckout from "../components/PricingCheckout.jsx"
import dictAll from "../../shared/i18n/dictionary.js"
import { useI18n } from "../i18n.jsx"

export default function CheckoutPage() {
  const { lang } = useI18n()
  const dict = dictAll?.[lang] || dictAll?.EN || {}
  const pricing = useMemo(() => dict.pricing || {}, [dict])

  return (
    <main>
      <PricingCheckout locale={lang === "CN" ? "CN" : "EN"} pricing={pricing} />
    </main>
  )
}
