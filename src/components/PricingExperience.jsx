import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiCheckCircle,
  FiExternalLink,
  FiPlus,
  FiShield,
  FiShoppingCart,
  FiX,
} from 'react-icons/fi'

import SectionDivider from './SectionDivider.jsx'
import {
  usePricingCart,
  summarizeTotals,
  formatTotalDisplay,
} from './PricingCartContext.jsx'

export default function PricingExperience({ locale = 'EN', pricing = {} }) {
  const cartLabels = useMemo(() => resolveCartLabels(pricing.cart, locale), [pricing.cart, locale])

  const categories = Array.isArray(pricing.categories) ? pricing.categories : []
  const addOns = Array.isArray(pricing.addOns) ? pricing.addOns : []
  const finePrint = Array.isArray(pricing.finePrint) ? pricing.finePrint : []
  const noticePoints = Array.isArray(pricing.noticePoints) ? pricing.noticePoints : []
  const heroHighlights = Array.isArray(pricing.heroHighlights) ? pricing.heroHighlights : []
  const objections = Array.isArray(pricing.objections) ? pricing.objections : []

  const contactHref = '/contact'
  const checkoutHref = '/pricing/checkout'
  const strategistLabel = locale === 'CN' ? '与顾问沟通' : 'Talk to a strategist'

  return (
    <div className="space-y-20 pb-24 text-white">
      <HeroBlock
        locale={locale}
        title={pricing.heroTitle}
        subtitle={pricing.heroSubtitle}
        description={pricing.heroDescription}
        highlights={heroHighlights}
        primaryHref={checkoutHref}
        primaryLabel={cartLabels.goToCheckout}
        secondaryHref={contactHref}
        secondaryLabel={strategistLabel}
      />

      <section className="container space-y-8">
        <SectionDivider
          title={pricing.noticeTitle ?? (locale === 'CN' ? '每项服务均包含' : 'Every Engagement Includes')}
        />
        <NoticeGrid points={noticePoints} currencyNote={pricing.currencyNote} />
      </section>

      <section className="container space-y-10" id="catalog">
        <SectionDivider
          title={locale === 'CN' ? '主力方案目录' : 'Programme Catalogue'}
          subtitle={locale === 'CN' ? '为不同场景设计的核心服务组合' : 'Curated stacks for every high-stakes scenario'}
        />
        <div className="grid gap-6 xl:grid-cols-2">
          {categories.map((category, idx) =>
            category?.title ? (
              <CategoryPanel
                key={category.key ?? `${category.title}-${idx}`}
                locale={locale}
                category={category}
                cartLabels={cartLabels}
              />
            ) : null,
          )}
          
          {/* Convert addOns to CategoryPanel style */}
          {addOns.length > 0 && (
            <CategoryPanel
              key="retainers-enhancements"
              locale={locale}
              category={{
                key: 'retainers',
                title: pricing.addOnsTitle ?? (locale === 'CN' ? '托管与增值' : 'Retainers & Enhancements'),
                subtitle: locale === 'CN' ? '持续支援服务' : 'Ongoing support services',
                tiers: addOns.map(addOn => ({
                  name: addOn.name,
                  price: addOn.price,
                  priceSecondary: addOn.priceSecondary,
                  features: addOn.features || [addOn.shortDescription || addOn.description].filter(Boolean),
                  href: addOn.href,
                  pricingMeta: addOn.pricingMeta,
                  shortDescription: addOn.shortDescription,
                  description: addOn.description,
                }))
              }}
              cartLabels={cartLabels}
            />
          )}
        </div>
      </section>

      {objections.length ? (
        <section className="container space-y-8">
          <SectionDivider
            title={
              pricing.objectionsTitle ?? (locale === 'CN' ? '我们消除前五大拒绝理由' : 'Top Five Hesitations and Rejections')
            }
            subtitle={
              pricing.objectionsSubtitle ??
              (locale === 'CN' ? '常见的「不要」，一次性回应' : 'Every typical “no” now has a countermeasure')
            }
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {objections.map((entry, idx) => (
              <ObjectionCard key={entry?.key ?? `objection-${idx}`} entry={entry} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      {finePrint.length ? (
        <section className="container space-y-5">
          <SectionDivider title={locale === 'CN' ? '重要说明' : 'Fine Print'} />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1129] p-6">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(86,122,255,0.2),transparent_70%)] opacity-80" />
            <ul className="space-y-3 text-sm text-white/75">
              {finePrint.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <FiShield className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CartDock locale={locale} labels={cartLabels} checkoutHref={checkoutHref} />
    </div>
  )
}

function HeroBlock({
  locale,
  title,
  subtitle,
  description,
  highlights,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#050918]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(66,130,255,0.35),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(239,185,74,0.35),transparent_55%)]" />
      <div className="container relative flex flex-col gap-12 py-20 lg:flex-row lg:items-center lg:gap-20">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0b1129] px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
            <FiShoppingCart className="h-4 w-4 text-gold" />
            {subtitle ?? (locale === 'CN' ? '玄学驱动的商业组合' : 'Metaphysics engineered for commerce')}
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            {title ?? (locale === 'CN' ? '服务套餐与定价' : 'Pricing & engagement levels')}
          </h1>
          <p className="text-lg text-white/75">
            {description ??
              (locale === 'CN'
                ? '自行组合方案、锁定执行节奏，并在结账前确认所有细节。'
                : 'Curate your command deck, lock delivery velocity and preview investment totals before checkout.')}
          </p>
          <div className="flex flex-wrap gap-4 py-6">
            <Link
              to={primaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold via-amber-400 to-yellow-200 px-6 py-3 text-sm font-semibold text-black shadow-[0_20px_45px_rgba(239,185,74,0.35)] transition hover:translate-y-0.5 hover:shadow-[0_12px_30px_rgba(239,185,74,0.45)]"
            >
              {primaryLabel}
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-[#0b1129]"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>

        {highlights.length ? (
          <div className="grid flex-1 gap-5 sm:grid-cols-2 py-6 px-5 lg:py-8 lg:px-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1129] p-5 backdrop-blur-md"
              >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_65%)] opacity-60" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{item?.title}</p>
                <p className="mt-3 text-sm text-white/75">{item?.description}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function NoticeGrid({ points, currencyNote }) {
  if (!points.length && !currencyNote) return null
  return (
    <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
      {points.length ? (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-6">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
          <ul className="space-y-4 text-sm text-white/80">
            {points.map((point, idx) => (
              <li key={idx} className="flex gap-3">
                <FiCheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {currencyNote ? (
        <div className="relative overflow-hidden rounded-3xl border border-amber-400/40 bg-amber-300/10 p-6 text-sm text-amber-100 shadow-[0_15px_45px_rgba(239,185,74,0.25)]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(239,185,74,0.35),transparent_60%)] blur-2xl" />
          <p className="flex gap-3 whitespace-pre-line">
            <FiShield className="mt-1 h-4 w-4 flex-shrink-0 text-amber-200" />
            <span className="whitespace-pre-line">{currencyNote}</span>
          </p>
        </div>
      ) : null}
    </div>
  )
}

function CategoryPanel({ locale, category, cartLabels }) {
  const tiers = Array.isArray(category.tiers) ? category.tiers : []
  if (!tiers.length) return null

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0a1025]/80 p-8 backdrop-blur-xl shadow-[0_25px_80px_rgba(15,25,60,0.45)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(65,150,255,0.25),transparent_65%),radial-gradient(circle_at_80%_20%,rgba(255,186,90,0.2),transparent_65%)] opacity-80" />
      <header className="space-y-2">
        <span className="text-xs uppercase tracking-[0.28em] text-white/50">{category.subtitle}</span>
        <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
      </header>
      <div className="space-y-4">
        {tiers.map((tier, idx) => (
          <TierCard
            key={`${category.key ?? category.title}-${idx}`}
            locale={locale}
            category={category}
            tier={tier}
            cartLabels={cartLabels}
          />
        ))}
      </div>
    </div>
  )
}

function TierCard({ locale, category, tier, cartLabels }) {
  const { toggleItem, isInCart } = usePricingCart()
  const features = Array.isArray(tier.features) ? tier.features : []
  const isExternal = Boolean(tier.href && /^https?:\/\//i.test(tier.href))

  const cartEntry = useMemo(
    () => ({
      id: buildCartId(category, tier),
      name: tier.name ?? 'Tier',
      price: tier.price,
      priceSecondary: tier.priceSecondary ?? null,
      href: tier.href ?? null,
      categoryKey: category.key ?? null,
      categoryTitle: category.title ?? null,
      serviceId: tier.pricingMeta?.serviceId ?? null,
      description: tier.shortDescription || tier.description || category.title || null,
      pricingMeta: {
        ...tier.pricingMeta,
        shortDescription: tier.shortDescription ?? tier.description ?? null,
      },
      type: 'tier',
      locale,
    }),
    [category, tier, locale],
  )

  const selected = isInCart(cartEntry.id)

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1129] p-6 shadow-[0_12px_45px_rgba(10,16,37,0.45)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_70%)] opacity-70" />
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <h4 className="text-xl font-semibold text-white">{tier.name}</h4>
          <div className="flex flex-wrap items-baseline gap-3 text-sm text-white/70">
            {tier.price ? <span className="text-lg font-semibold text-gold">{tier.price}</span> : null}
            {tier.priceSecondary ? <span className="text-sm font-medium text-white/60">{tier.priceSecondary}</span> : null}
            {tier.cadence ? (
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/70">
                {tier.cadence}
              </span>
            ) : null}
          </div>
          {tier.highlight ? <p className="text-sm text-emerald-300/90">{tier.highlight}</p> : null}
        </header>
        {features.length ? (
          <ul className="space-y-2 text-sm text-white/75">
            {features.map((feature, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/80" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex flex-wrap items-center gap-3 py-6">
          <button
            type="button"
            onClick={() => toggleItem(cartEntry)}
            className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-[14px] px-5 py-2 text-sm font-semibold transition ${
              selected ? 'bg-emerald-400/90 text-black shadow-[0_14px_34px_rgba(16,185,129,0.45)] hover:bg-emerald-300' : 'bg-black/85 text-[#f4deb4]'
            }`}
          >
            {!selected ? (
              <>
                <span className="absolute inset-0 bg-gradient-to-r from-[#f8d884cc] via-[#f6e7b8aa] to-[#f8d884cc] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                <span className="absolute inset-0 scale-[0.86] rounded-[12px] border border-[#f8d88433] transition duration-300 group-hover:scale-100 group-hover:border-[#f8d88480]" />
                <span
                  className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-40"
                  style={{ boxShadow: '0 0 45px 10px rgba(248,216,132,0.32)' }}
                />
              </>
            ) : null}
            <span
              className={`relative inline-flex items-center gap-2 ${
                selected ? '' : 'tracking-[0.18em] text-[#f4deb4] group-hover:text-[#fff5dc]'
              }`}
            >
              {selected ? <FiX className="h-4 w-4" /> : <FiPlus className="h-4 w-4" />}
              <span className="tracking-normal">{selected ? cartLabels.added : cartLabels.add}</span>
            </span>
          </button>
          {tier.href ? (
            isExternal ? (
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-white"
                href={tier.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {locale === 'CN' ? '查看详情' : 'View details'}
                <FiExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-white" to={tier.href}>
                {locale === 'CN' ? '查看详情' : 'View details'}
                <FiArrowRight className="h-4 w-4" />
              </Link>
            )
          ) : null}
        </div>
      </div>
    </div>
  )
}

function AddonCard({ locale, addOn, cartLabels }) {
  const { toggleItem, isInCart } = usePricingCart()
  const features = Array.isArray(addOn.features) ? addOn.features : []
  const cartEntry = useMemo(() => ({
    id: `addon-${slugify(addOn.name ?? 'addon')}`,
    name: addOn.name ?? 'Add-on',
    price: addOn.price,
    priceSecondary: addOn.priceSecondary ?? null,
    href: addOn.href ?? null,
    type: 'addon',
    categoryKey: 'addon',
    categoryTitle: locale === 'CN' ? '加购方案' : 'Add-on',
    serviceId: addOn.pricingMeta?.serviceId ?? null,
    description: addOn.shortDescription || addOn.description || (locale === 'CN' ? '增值服务' : 'Add-on service') || null,
    pricingMeta: {
      ...addOn.pricingMeta,
      shortDescription: addOn.shortDescription ?? addOn.description ?? null,
    },
    locale,
  }), [addOn, locale])
  const selected = isInCart(cartEntry.id)
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1129] p-5 shadow-[0_18px_45px_rgba(10,16,37,0.35)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(83,126,255,0.22),transparent_70%)] opacity-80" />
      <div className="flex flex-col gap-3">
        <header className="flex items-baseline justify-between gap-3">
          <h4 className="text-lg font-semibold">{addOn.name}</h4>
          <div className="flex flex-col items-end gap-0.5 text-sm">
            {addOn.price ? <span className="font-medium text-gold">{addOn.price}</span> : null}
            {addOn.priceSecondary ? <span className="text-xs font-medium text-white/60">{addOn.priceSecondary}</span> : null}
          </div>
        </header>
        {features.length ? (
          <ul className="space-y-2 text-sm text-white/70">
            {features.map((feature, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-300/80" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => toggleItem(cartEntry)}
            className={`group inline-flex items-center gap-2 rounded-[12px] px-4 py-2 text-sm font-medium transition ${
              selected
                ? 'bg-emerald-400/90 text-black shadow-[0_12px_30px_rgba(16,185,129,0.35)] hover:bg-emerald-300'
                : 'bg-black/80 text-[#f4deb4]'
            }`}
          >
            {!selected ? <FiPlus className="h-4 w-4" /> : <FiX className="h-4 w-4" />}
            <span>{selected ? cartLabels.remove : cartLabels.add}</span>
          </button>
          {addOn.href ? (
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-white"
              href={addOn.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {locale === 'CN' ? '了解详情' : 'View details'}
              <FiExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ObjectionCard({ entry, locale }) {
  const reinforcements = Array.isArray(entry?.reinforcements) ? entry?.reinforcements : []
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c132d]/80 p-6 shadow-[0_30px_70px_rgba(10,18,40,0.45)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(63,131,248,0.25),transparent_65%)] opacity-80" />
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">{entry?.objection}</p>
      <p className="mt-4 text-base font-medium text-white/80">{entry?.response}</p>
      {reinforcements.length ? (
        <div className="mt-4 space-y-2 text-sm text-white/70">
          {reinforcements.map((point, idx) => (
            <p key={idx} className="flex gap-2">
              <FiShield className="mt-1 h-4 w-4 flex-shrink-0 text-gold/80" />
              <span>{point}</span>
            </p>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function CartDock({ locale, labels, checkoutHref }) {
  const { items, clear } = usePricingCart()
  const totals = useMemo(() => summarizeTotals(items), [items])

  if (!items.length) return null

  const serviceSummary =
    locale === 'CN'
      ? `${items.length} 项服务`
      : `${items.length} ${items.length === 1 ? 'service selected' : 'services selected'}`

  return (
    <div className="pointer-events-auto fixed bottom-6 left-1/2 z-50 w-full max-w-3xl -translate-x-1/2 rounded-3xl border border-white/10 bg-[#050914]/90 px-6 py-5 shadow-[0_25px_60px_rgba(5,9,20,0.65)] backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">{labels.miniTitle}</p>
          <p className="text-lg font-semibold text-white">{serviceSummary}</p>
          {totals.length ? (
            <div className="flex flex-wrap gap-3 text-sm text-white/65">
              {totals.map((total) => (
                <span key={total.currency} className="inline-flex items-center gap-1 rounded-full bg-[#0b1129] px-3 py-1">
                  <FiShoppingCart className="h-4 w-4 text-gold" />
                  {formatTotalDisplay(total.currency, total.amount, locale)}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white hover:text-white"
          >
            <FiX className="h-4 w-4" />
            {labels.clear}
          </button>
          <Link
            to={checkoutHref}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold via-amber-300 to-yellow-200 px-5 py-2 text-sm font-semibold text-black transition hover:translate-y-0.5 hover:shadow-[0_12px_30px_rgba(239,185,74,0.45)]"
          >
            {labels.goToCheckout}
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function buildCartId(category, tier) {
  // Include tier name AND category to ensure uniqueness
  const categoryPart = category.key ?? category.title ?? 'category'
  const tierPart = tier.name ?? 'tier'
  // Add tier.pricingMeta?.serviceId if available for extra uniqueness
  const servicePart = tier.pricingMeta?.serviceId ?? ''
  const raw = `${categoryPart}-${tierPart}${servicePart ? `-${servicePart}` : ''}`
  return slugify(raw)
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function resolveCartLabels(cart, locale) {
  return {
    add: cart?.add ?? (locale === 'CN' ? '加入购物车' : 'Add to cart'),
    added: cart?.added ?? (locale === 'CN' ? '已加入' : 'Added'),
    remove: cart?.remove ?? (locale === 'CN' ? '移除' : 'Remove'),
    goToCheckout: cart?.goToCheckout ?? (locale === 'CN' ? '前往结账' : 'Go to checkout'),
    miniTitle: cart?.miniTitle ?? (locale === 'CN' ? '购物车快照' : 'Cart preview'),
    empty: cart?.empty ?? (locale === 'CN' ? '尚未选择任何服务。' : 'No services selected yet.'),
    clear: cart?.clear ?? (locale === 'CN' ? '清空' : 'Clear cart'),
    continue: cart?.continue ?? (locale === 'CN' ? '继续浏览' : 'Continue browsing'),
  }
}
