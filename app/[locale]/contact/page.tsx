import Link from 'next/link'
import Hero from '@/components/Hero'
import MapEmbed from '@/components/MapEmbed'
import StructuredData from '@/components/StructuredData'
import { getDict, type Locale } from '@/lib/i18n'
import FAQ from '@/components/FAQ'
import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'
import { FaThreads } from 'react-icons/fa6'
import { FiMail, FiBook } from 'react-icons/fi'

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale || 'EN'
  const dict = getDict(locale)
  const title = dictTitle(dict as any, 'nav.contact') || 'Contact'
  const desc = locale === 'CN'
    ? '联系我们 — 预约咨询、企业合作或媒体采访（1个工作日内回复）'
    : 'Contact us — sales, support or partnerships. We reply within 1 business day.'
  return {
    title,
    description: desc,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: '/EN/contact', zh: '/CN/contact' },
    },
    openGraph: { title, description: desc, url: `/${locale}/contact` },
  }
}

export default function Page({ params }:{ params:{ locale: Locale }}){
  const locale = params.locale
  const dict = getDict(locale)
  const title = dictTitle(dict, 'nav.contact') || (locale === 'CN' ? '联系我们' : 'Contact')
  const heroTitle = locale === 'CN' ? '联系我们' : 'Contact Our Professionals'
  const heroSub = locale === 'CN' ? '我们如何帮助您达成目标' : 'Real guidance. Fast reply. No bots.'
  const heroDesc = locale === 'CN'
    ? `请告诉我们您的目标、背景与限制，我们将把需求转化为清晰可执行的下一步，给出现实可行的时间表、选项与投入评估。我们以八字、紫微、奇门、风水与数字命理交叉印证，过滤噪声，聚焦能推动结果的行动。您将收到含优先级、风险与行动时点的简要方案。我们通常在1个工作日内回复；如有紧急期限，请说明，我们会酌情尽力提前安排。`
    : `Tell us your goals, context, and constraints, and we’ll translate them into clear next steps with realistic timelines, options, and estimated effort. We cross‑validate insights across BaZi, Zi Wei, Qi Men, Feng Shui, and numerology to reduce noise and focus on actions that move results. You’ll receive a brief plan outlining priorities, risks, and when to act. We typically reply within one business day. If urgent, mention your deadline and we’ll try to secure an earlier slot, subject to availability.`

  const emailSales = process.env.NEXT_PUBLIC_EMAIL_SALES || 'sales@meta-alliance.my'
  const emailSupport = process.env.NEXT_PUBLIC_EMAIL_SUPPORT || 'support@meta-alliance.my'
  const emailMedia = process.env.NEXT_PUBLIC_EMAIL_MEDIA || 'press@meta-alliance.my'
  const phone = process.env.NEXT_PUBLIC_PHONE || '+60 16-587 3141'
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '6016-5873141'

  const localise = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`)

  return (
    <div className="space-y-10">
      {/* JSON-LD: Organization */}
      <StructuredData json={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Metaphysics Alliance',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        logo: '/logo.png',
        contactPoint: [
          { '@type': 'ContactPoint', telephone: phone, contactType: 'sales', email: emailSales },
          { '@type': 'ContactPoint', telephone: phone, contactType: 'customer support', email: emailSupport },
          { '@type': 'ContactPoint', telephone: phone, contactType: 'media relations', email: emailMedia },
        ],
      }} />

      {/* Header / Hero */}
      <Hero
        title={heroTitle}
        sub={heroSub}
        description={heroDesc}
        className="min-h-[50vh] flex items-center -mt-10 -mb-10"
        fullBleed
        bannerSrc="/page-banner.png"
        bannerOpacity={0.75}
        overlayOpacity={0}
        noPaddingY
        locale={params.locale}
        showDefaultCta={false}
      />

      {/* Primary contact cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            key: 'sales',
            title: locale === 'CN' ? '销售与咨询' : 'Sales',
            lines: [emailSales, `${locale === 'CN' ? '电话/WhatsApp' : 'Phone/WhatsApp'}: ${phone}`],
            cta: locale === 'CN' ? '邮件联系销售' : 'Email Sales',
            href: `mailto:${emailSales}`,
          },
          {
            key: 'support',
            title: locale === 'CN' ? '客户支持' : 'Support',
            lines: [emailSupport],
            cta: locale === 'CN' ? '联系支持' : 'Contact Support',
            href: `mailto:${emailSupport}`,
          },
          {
            key: 'media',
            title: locale === 'CN' ? '合作 / 媒体' : 'Partnerships / Media',
            lines: [emailMedia, `${locale === 'CN' ? '媒体合作' : 'Media'}: ${whatsapp}`],
            cta: locale === 'CN' ? '媒体联系' : 'Media Enquiries',
            href: `mailto:${emailMedia}`,
          },
        ].map((card) => (
          <article key={card.key} className="card-3d p-5 flex h-full flex-col">
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <div className="mt-2 space-y-1 text-sm text-white/75">
              {card.lines.map((l, i) => (<div key={i}>{l}</div>))}
            </div>
            <div className="mt-auto pt-4">
              <a href={card.href} className="inline-flex items-center rounded-lg bg-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-gold-soft">{card.cta}</a>
            </div>
          </article>
        ))}
      </section>

      {/* Smart inquiry form */}
      <section className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{locale === 'CN' ? '咨询表单' : 'Inquiry Form'}</h2>
          <p className="mt-2 text-white/70 text-sm">{locale === 'CN' ? '请尽量详细填写，我们将为您匹配合适方案。' : 'Share a few details and we’ll propose the best next step.'}</p>
          <div className="mt-4">
            <ContactForm locale={locale} />
          </div>
        </div>

        {/* Live chat & social + Fallbacks */}
        <aside className="space-y-4">
          <div className="card-3d p-5">
            <h3 className="text-lg font-semibold text-white">{locale === 'CN' ? '即时沟通' : 'Live Chat & Social'}</h3>
            <ul className="mt-2 space-y-2 text-sm text-white/75">
              <li>
                <a href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaWhatsapp className="text-green-500" /> WhatsApp</a>
              </li>
              <li>
                <a href="https://www.instagram.com/metaphysics.alliance/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaInstagram className="text-pink-500" /> Instagram</a>
              </li>
              <li>
                <a href="https://www.facebook.com/MetaphysicsAlliance/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaFacebook className="text-blue-500" /> Facebook</a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@metaphysicsalliance" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><SiTiktok className="text-white" /> TikTok</a>
              </li>
              <li>
                <a href="https://www.threads.com/@metaphysics.alliance?hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaThreads className="text-white" /> Threads</a>
              </li>
            </ul>
          </div>

          <div className="card-3d p-5">
            <h3 className="text-lg font-semibold text-white">{locale === 'CN' ? '其他渠道' : 'Fallbacks'}</h3>
            <ul className="mt-2 space-y-2 text-sm text-white/75">
              <li><a className="flex items-center gap-2 underline hover:text-white" href={`mailto:${emailSales}`}><FiMail className="text-white/80" /> {locale === 'CN' ? '邮件' : 'Email'}</a></li>
              <li><a className="flex items-center gap-2 underline hover:text-white" href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp className="text-green-500" /> WhatsApp</a></li>
              <li><Link className="flex items-center gap-2 underline hover:text-white" href={localise('/resources')}><FiBook className="text-white/80" /> {locale === 'CN' ? '资源' : 'Resources'}</Link></li>
            </ul>
          </div>
        </aside>
      </section>

      {/* Office & Map: Same structure as Homepage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{dict.map_title ?? (locale === 'CN' ? '我们的地点' : 'Our Location')}</h2>
        <MapEmbed locale={locale.toLowerCase()} />
      </section>

      {/* Regional contacts (optional) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{locale === 'CN' ? '区域联系' : 'Regional Contacts'}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { k: 'sea', t: locale === 'CN' ? '东南亚' : 'SEA', e: emailSales },
            { k: 'apac', t: 'APAC', e: emailSales },
            { k: 'global', t: locale === 'CN' ? '全球' : 'Global', e: emailMedia },
          ].map(({ k, t, e }) => (
            <article key={k} className="card-3d p-5">
              <div className="text-white font-medium">{t}</div>
              <div className="mt-1 text-sm text-white/75">{e}</div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{locale === 'CN' ? '常见问题' : 'FAQ'}</h2>
        <FAQ locale={locale} />
      </section>

      {/* Compliance & privacy */}
      <section className="rounded-2xl border border-white/10 bg-black/25 p-5 text-sm text-white/70 backdrop-blur-md">
        <div>
          {locale === 'CN'
            ? '个人信息将用于回应您的咨询，我们会在必要期间内保存。提交即表示您同意我们的数据使用与隐私政策。'
            : 'We use your data to respond to your inquiry and retain it only as necessary. By submitting, you agree to our data use and privacy policy.'}
        </div>
        <div className="mt-2 space-x-4">
          <Link href={localise('/legal/privacy')} className="underline hover:text-white">{locale === 'CN' ? '隐私政策' : 'Privacy Policy'}</Link>
          <Link href={localise('/legal/terms')} className="underline hover:text-white">{locale === 'CN' ? '服务条款' : 'Terms'}</Link>
        </div>
      </section>
    </div>
  )
}

function dictTitle(dict: any, key: string){
  try{
    return key.split('.').reduce((o: any, k) => (o && o[k] != null ? o[k] : key), dict)
  }catch{
    return key
  }
}
