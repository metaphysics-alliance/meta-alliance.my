'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { FiArrowLeft, FiArrowRight, FiShoppingCart, FiTrash2 } from 'react-icons/fi'

import type { Locale } from '@/lib/i18n'
import SectionDivider from '@/components/SectionDivider'

import {
  CartEntry,
  CartLabels,
  PricingCartProvider,
  formatTotalDisplay,
  summarizeTotals,
  usePricingCart,
} from './PricingCartContext'
import { PricingDictionary, resolveCartLabels } from './PricingExperience'

export default function PricingCheckout({
  locale,
  pricing,
}: {
  locale: Locale
  pricing: PricingDictionary
}) {
  return (
    <PricingCartProvider locale={locale}>
      <CheckoutContent locale={locale} pricing={pricing} />
    </PricingCartProvider>
  )
}

function CheckoutContent({ locale, pricing }: { locale: Locale; pricing: PricingDictionary }) {
  const cartLabels = useMemo<CartLabels>(() => resolveCartLabels(pricing.cart, locale), [pricing.cart, locale])
  const checkoutCopy = pricing.checkout ?? {}
  const assurancePoints = Array.isArray(pricing.checkoutAssurancePoints) ? pricing.checkoutAssurancePoints : []

  const contactHref = `/${locale}/contact`
  const pricingHref = `/${locale}/pricing`

  return (
    <div className="container space-y-10 pb-24 pt-16 text-white">
      <header className="space-y-4 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-white/50">{cartLabels.miniTitle}</p>
        <h1 className="text-4xl font-semibold">
          {checkoutCopy.title ??
            (locale === 'CN' ? '确认你的战略组合' : 'Review your command deck')}
        </h1>
        <p className="mx-auto max-w-2xl text-base text-white/70">
          {checkoutCopy.subtitle ??
            (locale === 'CN'
              ? '确认要部署的服务，我们会在一个工作日内回传发票与启动时间表。'
              : 'Confirm the services you want us to deploy and we will return an invoice plus onboarding timeline within one business day.')}
        </p>
      </header>

      <CartReview
        locale={locale}
        pricing={pricing}
        cartLabels={cartLabels}
        checkoutCopy={checkoutCopy}
        contactHref={contactHref}
        pricingHref={pricingHref}
      />

      {assurancePoints.length ? (
        <section className="space-y-6">
          <SectionDivider
            title={
              pricing.checkoutAssuranceTitle ??
              (locale === 'CN' ? '确认后会发生什么' : 'What happens after you confirm')
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {assurancePoints.map((point, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/75 shadow-[0_20px_55px_rgba(10,16,37,0.45)]"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                  {idx + 1}
                </span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

function CartReview({
  locale,
  pricing,
  cartLabels,
  checkoutCopy,
  contactHref,
  pricingHref,
}: {
  locale: Locale
  pricing: PricingDictionary
  cartLabels: CartLabels
  checkoutCopy: PricingDictionary['checkout']
  contactHref: string
  pricingHref: string
}) {
  const { items, removeItem, clear } = usePricingCart()
  const totals = useMemo(() => summarizeTotals(items), [items])

  if (!items.length) {
    const emptyCtaLabel =
      checkoutCopy?.emptyCta ?? (locale === 'CN' ? '返回定价' : 'Back to pricing')
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-white/15 bg-white/5 p-12 text-center text-white/70">
        <FiShoppingCart className="mx-auto mb-6 h-12 w-12 text-white/40" />
        <h2 className="text-xl font-semibold text-white">
          {checkoutCopy?.emptyTitle ?? (locale === 'CN' ? '购物车为空' : 'No services selected yet')}
        </h2>
        <p className="mt-3 text-sm">
          {checkoutCopy?.emptyDescription ??
            (locale === 'CN'
              ? '从定价页面添加至少一项方案或增值服务，便能生成你的购物车。'
              : 'Add at least one programme or add-on from the pricing directory to build your cart.')}
        </p>
        <Link
          href={pricingHref}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-sm font-medium text-white transition hover:bg-white/20"
        >
          <FiArrowLeft className="h-4 w-4" />
          {emptyCtaLabel}
        </Link>
      </div>
    )
  }

  const notes = items.map((item) => {
    const prices = [item.price, item.priceSecondary].filter((value): value is string => Boolean(value))
    return prices.length ? `${item.name} (${prices.join(', ')})` : item.name
  })
  const cartParam = encodeURIComponent(notes.join('; '))
  const primaryHref = `${contactHref}?topic=pricing&cart=${cartParam}`

  const primaryLabel =
    checkoutCopy?.primaryCta ?? (locale === 'CN' ? '确认并索取发票' : 'Confirm & request invoice')
  const secondaryLabel =
    checkoutCopy?.secondaryCta ?? (locale === 'CN' ? '继续浏览' : 'Keep exploring')

  return (
    <section className="space-y-10">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#070d1f]/80 shadow-[0_30px_60px_rgba(7,13,31,0.6)]">
        <div className="hidden grid-cols-[1.5fr_1fr_auto] gap-6 border-b border-white/10 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white/50 md:grid">
          <span>{checkoutCopy?.tableHeaders?.service ?? (locale === 'CN' ? '服务' : 'Service')}</span>
          <span>{checkoutCopy?.tableHeaders?.investment ?? (locale === 'CN' ? '投资金额' : 'Investment')}</span>
          <span className="text-right">
            {checkoutCopy?.tableHeaders?.remove ?? cartLabels.remove}
          </span>
        </div>
        <div className="divide-y divide-white/10">
          {items.map((item) => (
            <CartLine
              key={item.id}
              locale={locale}
              item={item}
              removeLabel={cartLabels.remove}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_rgba(10,16,37,0.45)]">
          <h3 className="text-lg font-semibold text-white">
            {checkoutCopy?.summaryTitle ?? (locale === 'CN' ? '已选择的服务' : 'Selected services')}
          </h3>
          <ul className="space-y-2 text-sm text-white/75">
            {items.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-3">
                <span className="font-medium text-white">{item.name}</span>
                <div className="flex flex-col items-end gap-0.5 text-xs text-white/80">
                  {item.price ? <span className="text-sm font-semibold text-gold">{item.price}</span> : null}
                  {item.priceSecondary ? (
                    <span className="font-medium text-white/60">{item.priceSecondary}</span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
          {checkoutCopy?.currencyDisclaimer ? (
            <p className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-4 text-xs text-white/60">
              {checkoutCopy.currencyDisclaimer}
            </p>
          ) : null}
        </div>

        <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-[#0b1129]/80 p-6 shadow-[0_20px_50px_rgba(5,10,30,0.6)]">
          <h3 className="text-lg font-semibold text-white">
            {checkoutCopy?.totalsLabel ?? (locale === 'CN' ? '投资概览' : 'Investment overview')}
          </h3>
          <div className="space-y-3 text-sm text-white/75">
            {totals.map((total) => (
              <div key={total.currency} className="flex items-center justify-between">
                <span className="uppercase tracking-[0.28em] text-white/50">{total.currency}</span>
                <span className="font-semibold text-gold">
                  {formatTotalDisplay(total.currency, total.amount, locale)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-amber-300 to-yellow-200 px-6 py-3 text-sm font-semibold text-black transition hover:translate-y-0.5 hover:shadow-[0_12px_30px_rgba(239,185,74,0.45)]"
            >
              {primaryLabel}
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={pricingHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
            >
              <FiTrash2 className="h-4 w-4" />
              {cartLabels.clear}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CartLine({
  locale,
  item,
  removeLabel,
  onRemove,
}: {
  locale: Locale
  item: CartEntry
  removeLabel: string
  onRemove: () => void
}) {
  return (
    <div className="grid gap-4 px-6 py-5 text-sm text-white/80 md:grid-cols-[1.5fr_1fr_auto] md:items-center">
      <div>
        <p className="text-base font-semibold text-white">{item.name}</p>
        <p className="text-xs uppercase tracking-[0.28em] text-white/40">
          {item.categoryTitle ?? (item.type === 'addon' ? (locale === 'CN' ? '加购方案' : 'Add-on') : 'Programme')}
        </p>
        {item.href ? (
          <Link
            href={item.href}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-white"
          >
            {locale === 'CN' ? '查看服务详情' : 'View details'}
            <FiArrowRight className="h-3 w-3" />
          </Link>
        ) : null}
      </div>
      <div className="flex flex-col items-end gap-0.5 text-sm">
        {item.price ? <span className="font-semibold text-gold">{item.price}</span> : null}
        {item.priceSecondary ? <span className="text-xs font-medium text-white/60">{item.priceSecondary}</span> : null}
      </div>
      <div className="text-right">
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white hover:text-white"
        >
          <FiTrash2 className="h-3.5 w-3.5" />
          {removeLabel}
        </button>
      </div>
    </div>
  )
}
