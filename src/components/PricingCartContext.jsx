'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_PREFIX = 'ma-pricing-cart'

const PricingCartContext = createContext(undefined)

export function PricingCartProvider({ locale = 'EN', children }) {
  const storageKey = `${STORAGE_PREFIX}-${locale}`
  const [items, setItems] = useState([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) return
      const parsed = JSON.parse(raw)
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

  const addItem = (entry) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === entry.id)) return prev
      return [...prev, normalizeEntry(entry, locale)]
    })
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleItem = (entry) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === entry.id)
      if (exists) {
        return prev.filter((item) => item.id !== entry.id)
      }
      return [...prev, normalizeEntry(entry, locale)]
    })
  }

  const clear = () => setItems([])
  const isInCart = (id) => items.some((item) => item.id === id)

  const value = useMemo(
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

export function summarizeTotals(items) {
  const totals = new Map()
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

export function formatTotalDisplay(currency, amount, locale = 'EN') {
  const cleanedCurrency = (currency ?? '').toUpperCase()
  const localeTag = locale === 'CN' ? 'zh-CN' : 'en-MY'
  const currencyCodeMap = {
    RM: 'MYR',
    MYR: 'MYR',
    USD: 'USD',
    SGD: 'SGD',
    EUR: 'EUR',
    GBP: 'GBP',
  }
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

function normalizeEntry(entry, locale) {
  const primary = derivePriceMeta(entry?.price)
  const secondary = derivePriceMeta(entry?.priceSecondary)
  return {
    ...entry,
    locale,
    currency: entry?.currency ?? primary.currency ?? null,
    amount: entry?.amount ?? primary.amount ?? null,
    secondaryCurrency: entry?.secondaryCurrency ?? secondary.currency ?? null,
    secondaryAmount: entry?.secondaryAmount ?? secondary.amount ?? null,
  }
}

function derivePriceMeta(price) {
  if (!price) {
    return { currency: null, amount: null }
  }
  const trimmed = String(price).trim()
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
    else if (trimmed.startsWith('USD')) currency = 'USD'
    else if (trimmed.startsWith('MYR')) currency = 'MYR'
  }

  return {
    currency,
    amount: Number.isFinite(parsedAmount) ? parsedAmount : null,
  }
}
