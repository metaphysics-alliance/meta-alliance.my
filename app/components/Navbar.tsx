import Link from 'next/link'

import type { Locale } from '@/lib/i18n'
import { getDict, locales as supportedLocales } from '@/lib/i18n'

interface NavbarProps {
  locale: Locale
}

const PRIMARY_LINKS = [
  { key: 'home', href: '/' },
  { key: 'celestial', href: '/services' },
  { key: 'vip_report', href: '/vip-report/essential' },
  { key: 'academy', href: '/academy' },
  { key: 'resources', href: '/resources' },
  { key: 'pricing', href: '/pricing' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const

function localiseHref(locale: Locale, href: string){
  if (!href) return `/${locale}`
  if (href === '/') return `/${locale}`
  return `/${locale}${href.startsWith('/') ? href : `/${href}`}`
}

export default function Navbar({ locale }: NavbarProps){
  const dict = getDict(locale)
  const nav = dict.nav ?? {}

  return (
    <header className="navbar">
      <div className="container flex items-center justify-between py-3 md:py-4">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <img src="/logo.png" alt="Metaphysics Alliance" className="h-10 w-10 rounded-full ring-1 ring-white/20" />
          <div className="text-sm font-medium uppercase tracking-[0.32em] text-white/75">
            <span className="block text-xs text-gold-soft">Meta</span>
            <span className="block">Alliance</span>
          </div>
        </Link>

        <nav className="hidden gap-5 text-sm text-white/75 md:flex">
          {PRIMARY_LINKS.map(({ key, href }) => (
            <Link key={key} href={localiseHref(locale, href)} className="transition hover:text-white">
              {typeof nav[key as keyof typeof nav] === 'string' ? nav[key as keyof typeof nav] : key}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-xs">
          {supportedLocales.map((loc) => (
            <Link
              key={loc}
              href={`/${loc}`}
              className={`rounded-lg border px-2 py-1 transition ${loc === locale ? 'border-gold text-gold' : 'border-white/20 text-white/70 hover:border-gold/40 hover:text-white'}`}
              aria-label={`Switch to ${loc}`}
            >
              {loc}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
