import { Menu, X, ChevronDown, ChevronRight, ShoppingCart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Brand from './Brand.jsx'
import { useI18n } from '../i18n.jsx'
import { usePricingCart } from './PricingCartContext.jsx'

function usePointerPreference(){
  const [coarse, setCoarse] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(pointer: coarse)')
    const handler = (event) => setCoarse(event.matches)
    setCoarse(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return coarse
}

function useHoverDelay(isTouch = false){
  const [open, setOpen] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => timer.current && clearTimeout(timer.current), [])

  const onEnter = () => {
    if (isTouch) return
    if (timer.current) clearTimeout(timer.current)
    setOpen(true)
  }

  const onLeave = () => {
    if (isTouch) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(false), 160)
  }

  const toggle = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(v => !v)
  }

  const instantOpen = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(true)
  }

  const close = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(false)
  }

  return { open, onEnter, onLeave, toggle, instantOpen, close }
}

const transformItems = (items) => Array.isArray(items)
  ? items.map((item) => ({
      label: item?.title ?? '',
      href: item?.href ?? '#'
    }))
  : []

const transformSections = (sections) => Array.isArray(sections)
  ? sections.map((section) => ({
      label: section?.title ?? '',
      children: transformItems(section?.items)
    }))
  : []

function SecondLevel({ group, isTouch }){
  const { open, onEnter, onLeave, toggle, instantOpen, close } = useHoverDelay(isTouch)
  const hasChildren = Array.isArray(group.children) && group.children.length

  if (!hasChildren){
    return (
      <div className="px-2 py-1.5">
        <Link to={group.href} className="block px-3 py-1.5 rounded-lg hover:bg-white/5 nav-link whitespace-nowrap">
          <div className="font-medium">{group.label}</div>
        </Link>
      </div>
    )
  }

  const hoverProps = isTouch ? {} : {
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
  }

  return (
    <div className="relative px-2 py-1.5" {...hoverProps}>
      <button
        type="button"
        className="nav-item nav-link h-auto py-1.5 w-full flex items-center justify-between rounded-lg transition-colors duration-150"
        onClick={isTouch ? toggle : undefined}
        onFocus={instantOpen}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) close()
        }}
        aria-expanded={open}
      >
        <span>{group.label}</span>
        <ChevronRight className={`w-3.5 h-3.5 nav-icon transition-transform duration-150 ${open ? 'translate-x-0.5' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-0 left-full ml-2 w-72 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-soft-xl p-2 z-50 nav-submenu-panel">
          {group.children.map((item, idx) => (
            <Link key={idx} to={item.href} className="block px-3 py-1.5 rounded-lg hover:bg-white/5 nav-link whitespace-nowrap">
              <div className="font-medium">{item.label}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function Dropdown({ item, isTouch }){
  const hasChildren = Array.isArray(item.children) && item.children.length
  const { open, onEnter, onLeave, toggle, instantOpen, close } = useHoverDelay(isTouch)

  if (!hasChildren){
    return (
      <Link to={item.href} className="nav-item nav-link whitespace-nowrap">{item.label}</Link>
    )
  }

  const hoverProps = isTouch ? {} : {
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
  }

  return (
    <div className="relative" {...hoverProps}>
      <button
        type="button"
        className="nav-item nav-link whitespace-nowrap transition-colors duration-150"
        onClick={isTouch ? toggle : undefined}
        onFocus={instantOpen}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) close()
        }}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={`w-3.5 h-3.5 nav-icon transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-0 w-[22rem] rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-soft-xl p-2 z-50 nav-dropdown-panel">
          {item.children.map((child, idx) => (
            <SecondLevel key={idx} group={child} isTouch={isTouch} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Nav(){
  const { t, lang, setLang } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isTouch = usePointerPreference()
  const { cartCount } = usePricingCart()
  const [, forceUpdate] = useState({})
  const closeMobileNav = () => setMobileOpen(false)

  // Force re-render when cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      forceUpdate({})
    }
    window.addEventListener('cart-updated', handleCartUpdate)
    return () => window.removeEventListener('cart-updated', handleCartUpdate)
  }, [])

  const celestialMenu = transformSections(t('nav.celestial_groups'))

  const MAP = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.celestial'), children: celestialMenu },
    { label: t('nav.oracles'), children: [
      { label: t('nav.celestial_numbers'), href: '/oracle/celestial-numbers' },
      { label: t('nav.taiyi_numbers'), href: '/oracle/taiyi-numbers' },
      { label: t('nav.six_ren'), href: '/oracle/six-ren' },
    ]},
    { label: t('nav.vip_report'), href: lang === 'EN' ? '/vip-report' : '/services/vip-report', children: [
      { label: t('nav.vip_essential'), href: '/vip-report/essential' },
      { label: t('nav.vip_advanced'), href: '/vip-report/pro' },
      { label: t('nav.vip_supreme'), href: '/vip-report/supreme' },
    ]},
    { label: t('nav.academy'), children: [
      { label: t('nav.courses'), href: '/academy/courses' },
      { label: t('nav.foundation'), href: '/academy/foundation' },
      { label: t('nav.beginner'), href: '/academy/beginner' },
      { label: t('nav.advanced'), href: '/academy/intermediate' },
      { label: t('nav.pro'), href: '/academy/professional' },
    ]},
    { label: t('nav.enterprise'), children: [
      { label: t('nav.audit'), href: '/enterprise/audit' },
      { label: t('nav.site'), href: '/enterprise/site' },
      { label: t('nav.cycles'), href: '/enterprise/cycles' },
    ]},
    { label: t('nav.resources'), children: [
      { label: t('nav.four_pillars'), href: '/resources/four-pillars' },
      { label: t('nav.purple_star'), href: '/resources/purple-star' },
    ]},
    { label: t('nav.pricing'), href: '/pricing' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' },
  ]

  return (
    <header className="navbar">
      <div className="container py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-full ring-1 ring-white/20" />
          <Brand />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 flex-nowrap">
          {MAP.map((item, i) => (
            item.children && item.children.length
              ? <Dropdown key={i} item={item} isTouch={isTouch} />
              : <Link key={i} to={item.href} className="nav-item nav-link whitespace-nowrap">{item.label}</Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link 
            to="/pricing/checkout" 
            className="relative p-2 rounded-lg border border-white/10 hover:border-gold/40 transition-colors duration-150 group"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart className="w-5 h-5 text-white/80 group-hover:text-gold transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className={`nav-item text-xs px-2 rounded-lg border border-white/10 hover:border-gold/40 transition-colors duration-150 ${lang === 'EN' ? 'text-gold border-gold bg-white/5' : 'text-white/80'}`}
            onClick={() => setLang('EN')}
            aria-label="Switch to English"
          >EN</button>
          <button
            className={`nav-item text-xs px-2 rounded-lg border border-white/10 hover:border-gold/40 transition-colors duration-150 ${lang === 'CN' ? 'text-gold border-gold bg-white/5' : 'text-white/80'}`}
            onClick={() => setLang('CN')}
            aria-label="切换到中文"
          >中文</button>
          <button className="lg:hidden p-2 rounded-xl border border-white/10 text-white/80 ml-2 transition-colors duration-150" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Link 
            to="/pricing/checkout" 
            className="relative p-2 rounded-lg border border-white/10 hover:border-gold/40 transition-colors duration-150 group"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart className="w-5 h-5 text-white/80 group-hover:text-gold transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="p-2 rounded-xl border border-white/10 text-white/80 transition-colors duration-150" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/25 backdrop-blur-xl">
          <div className="container py-3 flex flex-col gap-2">
            <div className="flex gap-2 mb-2">
              <button className={`nav-item text-xs px-2 rounded-lg border border-white/10 hover:border-gold/40 ${lang === 'EN' ? 'text-gold border-gold bg-white/5' : 'text-white/80'}`} onClick={() => setLang('EN')}>EN</button>
              <button className={`nav-item text-xs px-2 rounded-lg border border-white/10 hover:border-gold/40 ${lang === 'CN' ? 'text-gold border-gold bg-white/5' : 'text-white/80'}`} onClick={() => setLang('CN')}>中文</button>
            </div>
            {MAP.map((item, i) => (
              <div key={i}>
                {item.children && item.children.length ? (
                  <details className="group">
                    <summary className="nav-link cursor-pointer">{item.label}</summary>
                    <div className="pl-4 py-1 flex flex-col gap-1">
                      {item.children.map((c, idx) => (
                        Array.isArray(c.children) && c.children.length ? (
                          <div key={idx} className="pl-2">
                            <div className="text-xs uppercase tracking-wide text-white/50 my-1">{c.label}</div>
                            <div className="flex flex-col gap-1 pl-2">
                              {c.children.map((cc, j) => (
                                <Link
                                  key={j}
                                  to={cc.href}
                                  className="nav-link"
                                  onClick={closeMobileNav}
                                >
                                  {cc.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={idx}
                            to={c.href}
                            className="nav-link"
                            onClick={closeMobileNav}
                          >
                            {c.label}
                          </Link>
                        )
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={item.href}
                    className="nav-link"
                    onClick={closeMobileNav}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
