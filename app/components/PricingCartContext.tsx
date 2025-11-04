'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { Locale } from '@/lib/i18n'

export type CartEntry = {
  id: string
  name: string
  price?: string | null
  priceSecondary?: string | null
  currency?: string | null
  amount?: number | null
  secondaryCurrency?: string | null
  secondaryAmount?: number | null
  href?: string | null
  categoryKey?: string | null
  categoryTitle?: string | null
  type: 'tier' | 'addon'
  serviceId?: string | null
  pricingMeta?: {
    serviceId?: string | null
    priceMYR?: number | null
    priceUSD?: number | null
  } | null
  locale: Locale
}

export type CartLabels = {
  add: string
  added: string
  remove: string
  goToCheckout: string
  miniTitle: string
  empty: string
  clear: string
  continue: string
}

type PricingCartContextValue = {
  items: CartEntry[]
  addItem: (item: CartEntry) => void
  removeItem: (id: string) => void
  toggleItem: (item: CartEntry) => void
  clear: () => void
  isInCart: (id: string) => boolean
}

const PricingCartContext = createContext<PricingCartContextValue | undefined>(undefined)

const STORAGE_PREFIX = 'ma-pricing-cart'

export function PricingCartProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const storageKey = `${STORAGE_PREFIX}-${locale}`
  const [items, setItems] = useState<CartEntry[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) return
      const parsed = JSON.parse(raw) as CartEntry[]
      if (Array.isArray(parsed)) {
        setItems(parsed.map((item) => normalizeEntry(item, locale)))
      }
    } catch (err) {
      console.warn('Failed to hydrate pricing cart from storage:', err)
    }
  }, [storageKey, locale])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items))
    } catch (err) {
      console.warn('Failed to persist pricing cart to storage:', err)
    }
  }, [items, storageKey])

  const addItem = (entry: CartEntry) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === entry.id)) {
        return prev
      }
      return [...prev, normalizeEntry(entry, locale)]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleItem = (entry: CartEntry) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === entry.id)
      if (exists) {
        return prev.filter((item) => item.id !== entry.id)
      }
      return [...prev, normalizeEntry(entry, locale)]
    })
  }

  const clear = () => setItems([])

  const isInCart = (id: string) => items.some((item) => item.id === id)

  const value = useMemo<PricingCartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      toggleItem,
      clear,
      isInCart,
    }),
    [items],
  )

  return <PricingCartContext.Provider value={value}>{children}</PricingCartContext.Provider>
}

export function usePricingCart() {
  const context = useContext(PricingCartContext)
  if (!context) {
    throw new Error('usePricingCart must be used within a PricingCartProvider')
  }
  return context
}

export function summarizeTotals(items: CartEntry[]) {
  const totals = new Map<string, number>()
  items.forEach((item) => {
    if (item.currency && item.amount != null) {
      const current = totals.get(item.currency) ?? 0
      totals.set(item.currency, current + item.amount)
    }
    if (item.secondaryCurrency && item.secondaryAmount != null) {
      const secondaryCurrent = totals.get(item.secondaryCurrency) ?? 0
      totals.set(item.secondaryCurrency, secondaryCurrent + item.secondaryAmount)
    }
  })
  return Array.from(totals.entries()).map(([currency, amount]) => ({ currency, amount }))
}

export function formatTotalDisplay(currency: string, amount: number, locale: Locale) {
  const cleanedCurrency = currency?.toUpperCase?.() ?? ''
  const currencyCodeMap: Record<string, string> = {
    RM: 'MYR',
    MYR: 'MYR',
    USD: 'USD',
    SGD: 'SGD',
    EUR: 'EUR',
    GBP: 'GBP',
  }

  const localeTag = locale === 'CN' ? 'zh-CN' : 'en-MY'
  const fallbackCode = cleanedCurrency.replace(/[^A-Z]/g, '') || 'MYR'
  const code = currencyCodeMap[cleanedCurrency] ?? fallbackCode

  try {
    return new Intl.NumberFormat(localeTag, {
      style: 'currency',
      currency: code,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount)
  } catch {
    const formatted = amount.toLocaleString(localeTag, {
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })
    return `${currency} ${formatted}`.trim()
  }
}

function normalizeEntry(entry: CartEntry, locale: Locale): CartEntry {
  const primary = derivePriceMeta(entry.price)
  const secondary = derivePriceMeta(entry.priceSecondary)
  return {
    ...entry,
    locale,
    currency: entry.currency ?? primary.currency ?? null,
    amount: entry.amount ?? primary.amount ?? null,
    secondaryCurrency: entry.secondaryCurrency ?? secondary.currency ?? null,
    secondaryAmount: entry.secondaryAmount ?? secondary.amount ?? null,
  }
}

function derivePriceMeta(price?: string | null) {
  if (!price) {
    return { currency: null, amount: null }
  }
  const trimmed = price.trim()
  if (!trimmed) {
    return { currency: null, amount: null }
  }

  const match = trimmed.match(/^([A-Za-z\p{Sc}]{1,5})?\s*([\d.,]+)/u)
  const rawCurrency = match?.[1]?.trim() || null
  const numericPart = match?.[2]?.replace(/,/g, '')
  const parsedAmount = numericPart ? Number.parseFloat(numericPart) : Number.NaN

  let currency = rawCurrency
  if (!currency) {
    if (trimmed.startsWith('RM')) currency = 'RM'
    if (trimmed.startsWith('USD')) currency = 'USD'
    if (trimmed.startsWith('MYR')) currency = 'MYR'
  }

  return {
    currency,
    amount: Number.isFinite(parsedAmount) ? parsedAmount : null,
  }
}
