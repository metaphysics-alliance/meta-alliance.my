import Link from 'next/link'

import type { Locale } from '@/lib/i18n'
import { getDict } from '@/lib/i18n'

interface FooterProps {
  locale: Locale
}

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/MetaphysicsAlliance/', label: 'Facebook' },
  { href: 'https://www.instagram.com/metaphysics.alliance/', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@metaphysicsalliance', label: 'TikTok' },
  { href: 'https://www.threads.com/@metaphysics.alliance?hl=en', label: 'Threads' },
] as const

export default function Footer({ locale }: FooterProps){
  const dict = getDict(locale)
  const nav = dict.nav ?? {}

  const quickLinks = [
    { key: 'home', href: '/' },
    { key: 'academy', href: '/academy' },
    { key: 'resources', href: '/resources' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ]

  const legalLinks = [
    { label: locale === 'CN' ? '隐私政策' : 'Privacy Policy', href: '/legal/privacy' },
    { label: locale === 'CN' ? '服务条款' : 'Terms of Service', href: '/legal/terms' },
    { label: locale === 'CN' ? '免责声明' : 'Disclaimer', href: '/legal/disclaimer' },
    { label: locale === 'CN' ? '退款政策' : 'Refund Policy', href: '/legal/refund' },
  ]

  const localise = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`)

  return (
    <footer className="mt-20 border-t border-white/10 bg-black/20 py-12">
      <div className="container grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-white/90">{locale === 'CN' ? '快捷导航' : 'Quick Links'}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {quickLinks.map(({ key, href }) => (
              <li key={key}>
                <Link href={localise(href)} className="transition hover:text-white">
                  {typeof nav[key as keyof typeof nav] === 'string' ? nav[key as keyof typeof nav] : key}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white/90">{locale === 'CN' ? '法律条款' : 'Legals'}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {legalLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={localise(href)} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white/90">{locale === 'CN' ? '关注我们' : 'Follow Us'}</h3>
          <div className="flex flex-wrap gap-3 text-xs text-white/60">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 transition hover:border-gold/40 hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="pt-4 text-xs text-white/55">
            &copy; 2025-2026 Metaphysics Alliance · Brightwood Nexus
          </div>
        </div>
      </div>
    </footer>
  )
}
