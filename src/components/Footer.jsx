import { FaFacebookF, FaInstagram } from 'react-icons/fa6'
import { SiTiktok } from 'react-icons/si'
import { Link } from 'react-router-dom'

import { useI18n } from '../i18n.jsx'

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/MetaphysicsAlliance/', label: 'Facebook', Icon: FaFacebookF },
  { href: 'https://www.instagram.com/metaphysics.alliance/', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://www.tiktok.com/@metaphysicsalliance', label: 'TikTok', Icon: SiTiktok },
  { href: 'https://www.threads.com/@metaphysics.alliance?hl=en', label: 'Threads', Icon: FaInstagram },
]

export default function Footer(){
  const { t, lang } = useI18n()
  const isEnglish = lang === 'EN'

  return (
    <footer className="mt-20 pt-12 pb-10 border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="container py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-3">{isEnglish ? 'Quick Links' : '快捷导航'}</h4>
          <ul className="space-y-2 text-white/80 text-[0.95rem]">
            <li><Link to="/" className="hover:text-gold">{t('nav.home')}</Link></li>
            <li><Link to="/academy/courses" className="hover:text-gold">{t('nav.academy')}</Link></li>
            <li><Link to="/pricing" className="hover:text-gold">{t('nav.pricing')}</Link></li>
            <li><Link to="/enterprise/audit" className="hover:text-gold">{t('nav.enterprise')}</Link></li>
            <li><Link to="/resources/four-pillars" className="hover:text-gold">{t('nav.resources')}</Link></li>
            <li><Link to="/about" className="hover:text-gold">{t('nav.about')}</Link></li>
            <li><Link to="/contact" className="hover:text-gold">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">{isEnglish ? 'Legals' : '法律条款'}</h4>
          <ul className="space-y-2 text-white/80 text-[0.95rem]">
            <li><Link to="/legal/privacy" className="hover:text-gold">{isEnglish ? 'Privacy Policy' : '隐私政策'}</Link></li>
            <li><Link to="/legal/terms" className="hover:text-gold">{isEnglish ? 'Terms of Service' : '服务条款'}</Link></li>
            <li><Link to="/legal/cookies" className="hover:text-gold">{isEnglish ? 'Cookie Policy' : 'Cookie 政策'}</Link></li>
            <li><Link to="/disclaimer" className="hover:text-gold">{isEnglish ? 'Disclaimer' : '免责声明'}</Link></li>
            <li><Link to="/refund" className="hover:text-gold">{isEnglish ? 'Refund Policy' : '退款政策'}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">{isEnglish ? 'Follow us' : '关注我们'}</h4>
          <div className="mt-2 flex items-center justify-start gap-3 flex-wrap">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                className="inline-flex items-center gap-2 p-2 rounded-lg border border-white/10 hover:border-gold/40 transition"
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs text-white/70">{label}</span>
              </a>
            ))}
          </div>

          <div className="mt-5 flex justify-start">
            <Link to="/" aria-label={isEnglish ? 'Back to Home' : '返回首页'} className="inline-block">
              <img
                src="/logo.png"
                alt="Metaphysics Alliance"
                className="h-32 w-auto opacity-90 drop-shadow-lg transition hover:opacity-100"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-xs md:text-sm text-white/65">
            <span>&copy; 2025-2026 Metaphysics Alliance</span>
            <span className="hidden md:inline">-</span>
            <span className="text-center md:text-left">a brand of Brightwood Nexus. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
