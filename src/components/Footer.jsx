// src/components/Footer.jsx
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaLemon } from 'react-icons/fa6'
import { SiTiktok } from 'react-icons/si'
import { useI18n } from '../i18n.jsx'

export default function Footer(){
  const { t, lang } = useI18n()
  return (
    <footer className="mt-20 pt-12 pb-10 border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="container py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-3">{lang==='EN' ? 'Quick Links' : '快速链接'}</h4>
          <ul className="space-y-2 text-white/80 text-[0.95rem]">
            <li><a href="/" className="hover:text-gold">{t('nav.home')}</a></li>
            <li><a href="/academy/courses" className="hover:text-gold">{t('nav.academy')}</a></li>
            <li><a href="/enterprise/audit" className="hover:text-gold">{t('nav.enterprise')}</a></li>
            <li><a href="/resources/four-pillars" className="hover:text-gold">{t('nav.resources')}</a></li>
            <li><a href="/about" className="hover:text-gold">{t('nav.about')}</a></li>
            <li><a href="/contact" className="hover:text-gold">{t('nav.contact')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">{lang==='EN' ? 'Legals' : '法律条款'}</h4>
          <ul className="space-y-2 text-white/80 text-[0.95rem]">
            <li><a href="/privacy" className="hover:text-gold">{lang==='EN' ? 'Privacy Policy' : '隐私政策'}</a></li>
            <li><a href="/terms" className="hover:text-gold">{lang==='EN' ? 'Terms of Service' : '服务条款'}</a></li>
            <li><a href="/cookies" className="hover:text-gold">{lang==='EN' ? 'Cookie Policy' : 'Cookie 政策'}</a></li>
            <li><a href="/disclaimer" className="hover:text-gold">{lang==='EN' ? 'Disclaimer' : '免责声明'}</a></li>
            <li><a href="/refund" className="hover:text-gold">{lang==='EN' ? 'Refund Policy' : '退款政策'}</a></li>
          </ul>
        </div>

        {/* Follow us column (only this block changed) */}
<div>
  <h4 className="text-lg font-semibold mb-3">{lang==='EN' ? 'Follow us' : '关注我们'}</h4>

  {/* icons row — now horizontally centered */}
  <div className="mt-2 flex items-center justify-left gap-3 flex-wrap">
    <a className="inline-flex p-2 rounded-lg border border-white/10 hover:border-gold/40" href="#" aria-label="Facebook"><FaFacebookF className="w-4 h-4" /></a>
    <a className="inline-flex p-2 rounded-lg border border-white/10 hover:border-gold/40" href="#" aria-label="Instagram"><FaInstagram className="w-4 h-4" /></a>
    <a className="inline-flex p-2 rounded-lg border border-white/10 hover:border-gold/40" href="#" aria-label="TikTok"><SiTiktok className="w-4 h-4" /></a>
    <a className="inline-flex p-2 rounded-lg border border-white/10 hover:border-gold/40" href="#" aria-label="LinkedIn"><FaLinkedinIn className="w-4 h-4" /></a>
    <a className="inline-flex p-2 rounded-lg border border-white/10 hover:border-gold/40" href="#" aria-label="X (Twitter)"><FaXTwitter className="w-4 h-4" /></a>
    <a className="inline-flex p-2 rounded-lg border border-white/10 hover:border-gold/40" href="#" aria-label="Lemon8"><FaLemon className="w-4 h-4" /></a>
  </div>

  {/* logo under icons — ~30% larger and clickable */}
  <div className="mt-5 flex justify-left">
    <a href="/" aria-label={lang === 'EN' ? 'Back to Home' : '返回首页'} className="inline-block">
    <img
      src="/logo.png"   // ensure /public/logo.png exists
      alt="Metaphysics Alliance"
      className="h-32 w-auto opacity-90 drop-shadow-lg hover:opacity-100 transition"
    />
    </a>
  </div>
</div>

      </div>

      {/* Centered rights line */}
      <div className="border-t border-white/10 mt-12">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-xs md:text-sm text-white/65">
            <span>© 2025–2026 Metaphysics Alliance</span>
            <span className="hidden md:inline">—</span>
            <span className="text-center md:text-left">a brand of Brightwood Nexus. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
