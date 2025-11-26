'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Locale } from '@/lib/i18n'
import { getDict, locales as supportedLocales } from '@/lib/i18n'

// Utility for merging tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface NavbarProps {
  locale: Locale
}

// --- Navigation Structure Definition ---
type NavItem = {
  label: string
  href?: string
  children?: NavItem[]
}

function getNavMap(t: any, locale: Locale): NavItem[] {
  const prefix = (path: string) => `/${locale}${path}`

  return [
    { label: t.home, href: prefix('/') },
    {
      label: t.celestial,
      children: [
        { label: 'BaZi (Four Pillars)', href: prefix('/services/bazi') },
        { label: 'Zi Wei Dou Shu', href: prefix('/services/ziwei') },
        { label: 'Qi Men Dun Jia', href: prefix('/services/qimen') },
        { label: 'I Ching Divination', href: prefix('/services/iching') },
        { label: 'Feng Shui', href: prefix('/services/fengshui') },
      ]
    },
    {
      label: t.oracles,
      children: [
        { label: t.celestial_numbers, href: prefix('/oracle/celestial-numbers') },
        { label: t.taiyi_numbers, href: prefix('/oracle/taiyi-numbers') },
        { label: t.six_ren, href: prefix('/oracle/six-ren') },
      ]
    },
    {
      label: t.vip_report,
      href: prefix('/vip-report'),
      children: [
        { label: t.vip_essential, href: prefix('/vip-report/essential') },
        { label: t.vip_advanced, href: prefix('/vip-report/pro') },
        { label: t.vip_supreme, href: prefix('/vip-report/supreme') },
      ]
    },
    {
      label: t.academy,
      children: [
        { label: t.courses, href: prefix('/academy/courses') },
        { label: t.foundation, href: prefix('/academy/foundation') },
        { label: t.beginner, href: prefix('/academy/beginner') },
        { label: t.advanced, href: prefix('/academy/intermediate') },
        { label: t.pro, href: prefix('/academy/professional') },
      ]
    },
    {
      label: t.enterprise,
      children: [
        { label: t.audit, href: prefix('/enterprise/audit') },
        { label: t.site, href: prefix('/enterprise/site') },
        { label: t.cycles, href: prefix('/enterprise/cycles') },
      ]
    },
    {
      label: t.resources,
      children: [
        { label: t.four_pillars, href: prefix('/resources/four-pillars') },
        { label: t.purple_star, href: prefix('/resources/purple-star') },
      ]
    },
    { label: t.pricing, href: prefix('/pricing') },
    { label: t.about, href: prefix('/about') },
    { label: t.contact, href: prefix('/contact') },
  ]
}

// --- Components ---

function NavLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 text-sm font-medium text-white/80 hover:text-gold transition-colors duration-200 rounded-full hover:bg-white/5",
        className
      )}
    >
      {children}
    </Link>
  )
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-full hover:bg-white/5",
          isOpen ? "text-gold bg-white/5" : "text-white/80 hover:text-gold"
        )}
      >
        {item.label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ duration: 0.2, ease: "circOut" }}
            className="absolute top-full left-0 mt-2 w-64 p-2 rounded-2xl bg-cosmic-void/90 backdrop-blur-2xl border border-white/10 shadow-soft-xl z-50 overflow-hidden"
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            <div className="relative flex flex-col gap-1">
              {item.children?.map((child, idx) => (
                child.href ? (
                  <Link
                    key={idx}
                    href={child.href}
                    className="block px-3 py-2.5 rounded-xl hover:bg-white/10 text-sm text-white/90 hover:text-gold transition-all duration-200"
                  >
                    {child.label}
                  </Link>
                ) : (
                  <div key={idx} className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider mt-2 mb-1">
                    {child.label}
                  </div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileMenuItem({ item, onClick }: { item: NavItem; onClick: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <Link
        href={item.href || '#'}
        onClick={onClick}
        className="block py-4 text-lg font-medium text-white/90 border-b border-white/5"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-4 text-lg font-medium text-white/90"
      >
        {item.label}
        <ChevronDown className={cn("w-5 h-5 transition-transform", isExpanded && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white/5 rounded-xl mb-3"
          >
            <div className="flex flex-col p-2">
              {item.children?.map((child, idx) => (
                <Link
                  key={idx}
                  href={child.href || '#'}
                  onClick={onClick}
                  className="block px-4 py-3 text-base text-white/70 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar({ locale }: NavbarProps) {
  const dict = getDict(locale)
  const nav = dict.nav ?? {}
  const navMap = getNavMap(nav, locale)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 50
    if (isScrolled !== scrolled) setScrolled(isScrolled)
  })

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 20,
          opacity: 1,
          width: scrolled ? 'auto' : '95%',
          maxWidth: '1280px',
          padding: scrolled ? '0.5rem 0.75rem' : '0.75rem 1.5rem',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Custom ease for smooth "float"
        className={cn(
          "fixed z-50 left-1/2 -translate-x-1/2 rounded-full border transition-all duration-300",
          scrolled
            ? "bg-cosmic-void/80 backdrop-blur-xl border-white/10 shadow-soft-xl"
            : "bg-cosmic-void/40 backdrop-blur-md border-white/5 shadow-lg"
        )}
      >
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group pl-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/logo.png"
                alt="Meta Alliance"
                className="relative h-9 w-9 rounded-full ring-1 ring-white/20 group-hover:ring-gold/50 transition-all duration-300"
              />
            </div>
            <div className={cn(
              "text-sm font-medium uppercase tracking-[0.32em] text-white/90 group-hover:text-white transition-all duration-300 overflow-hidden whitespace-nowrap",
              scrolled ? "w-0 opacity-0 md:w-auto md:opacity-100" : "w-auto opacity-100"
            )}>
              <span className="block text-[0.65rem] text-gold-soft mb-[-2px]">Meta</span>
              <span className="block font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 group-hover:from-gold group-hover:via-gold-soft group-hover:to-gold transition-all duration-500">
                Alliance
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navMap.map((item, idx) => (
              item.children ? (
                <DesktopDropdown key={idx} item={item} />
              ) : (
                <NavLink key={idx} href={item.href || '#'}>
                  {item.label}
                </NavLink>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 pr-1">
            {/* Language Switcher */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
              {supportedLocales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${pathname.substring(3)}`}
                  className={cn(
                    "px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200",
                    loc === locale
                      ? "bg-gold text-cosmic-void shadow-sm"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  {loc}
                </Link>
              ))}
            </div>

            {/* Cart */}
            <Link
              href={`/${locale}/pricing/checkout`}
              className="relative p-2.5 rounded-full hover:bg-white/10 text-white/80 hover:text-gold transition-colors group"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-white/10 text-white/80 hover:text-gold transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-cosmic-void/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-cosmic-void border-l border-white/10 shadow-2xl lg:hidden overflow-y-auto"
          >
            <div className="p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gold tracking-widest uppercase">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navMap.map((item, idx) => (
                  <MobileMenuItem key={idx} item={item} onClick={() => setMobileOpen(false)} />
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/60">Language</span>
                  <div className="flex gap-2">
                    {supportedLocales.map((loc) => (
                      <Link
                        key={loc}
                        href={`/${loc}${pathname.substring(3)}`}
                        className={cn(
                          "px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                          loc === locale
                            ? "border-gold text-gold bg-gold/10"
                            : "border-white/20 text-white/60"
                        )}
                      >
                        {loc}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
