import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm.jsx'
import MapCard from '../components/MapCard.jsx'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import { FiMail, FiBook } from 'react-icons/fi'
import SectionDivider from '../components/SectionDivider.jsx'
import { useI18n } from '../i18n.jsx'
import FAQ from '../components/FAQ.jsx'

export default function ContactPage(){
  const { lang, t } = useI18n()

  const title = t('nav.contact') || (lang === 'CN' ? '联系我们' : 'Contact')
  const replyTime = lang === 'CN' ? '我们通常在1个工作日内回复。' : 'We typically reply within 1 business day.'

  const emailSales = import.meta.env.VITE_EMAIL_SALES || 'sales@meta-alliance.my'
  const emailSupport = import.meta.env.VITE_EMAIL_SUPPORT || 'support@meta-alliance.my'
  const emailMedia = import.meta.env.VITE_EMAIL_MEDIA || 'press@meta-alliance.my'
  const phone = import.meta.env.VITE_PHONE || '+60 16-587 3141'
  const whatsapp = import.meta.env.VITE_WHATSAPP || '6016-5873141'

  return (
    <div className="container my-8 space-y-10">
      <header className="rounded-3xl border border-white/10 bg-black/20 p-6 text-center backdrop-blur-md">
        <h1 className="text-3xl font-semibold text-white md:text-4xl">{title}</h1>
        <p className="mt-2 text-white/70">{lang === 'CN' ? '我们如何帮助您达成目标' : 'How we can help'}</p>
        <p className="mt-1 text-sm text-white/60">{replyTime}</p>
      </header>

      <SectionDivider title={lang === 'CN' ? '主要联系' : 'Primary Contacts'} />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[{
          key: 'sales', title: lang === 'CN' ? '销售与咨询' : 'Sales',
          lines: [emailSales, `${lang === 'CN' ? '电话/WhatsApp' : 'Phone/WhatsApp'}: ${phone}`], cta: lang === 'CN' ? '邮件联系销售' : 'Email Sales', href: `mailto:${emailSales}`
        },{
          key: 'support', title: lang === 'CN' ? '客户支持' : 'Support',
          lines: [emailSupport], cta: lang === 'CN' ? '联系支持' : 'Contact Support', href: `mailto:${emailSupport}`
        },{
          key: 'media', title: lang === 'CN' ? '合作 / 媒体' : 'Partnerships / Media',
          lines: [emailMedia, `${lang === 'CN' ? '媒体合作' : 'Media'}: ${whatsapp}`], cta: lang === 'CN' ? '媒体联系' : 'Media Enquiries', href: `mailto:${emailMedia}`
        }].map(card => (
          <article key={card.key} className="card-3d p-5 flex h-full flex-col">
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <div className="mt-2 space-y-1 text-sm text-white/75">{card.lines.map((l,i)=>(<div key={i}>{l}</div>))}</div>
            <div className="mt-auto pt-4"><a href={card.href} className="inline-flex items-center rounded-lg bg-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-gold-soft">{card.cta}</a></div>
          </article>
        ))}
      </section>

      <SectionDivider title={lang === 'CN' ? '咨询表单' : 'Inquiry Form'} />
      <section className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
          <p className="mb-4 text-white/70 text-sm">{lang === 'CN' ? '请尽量详细填写，我们将为您匹配合适方案。' : 'Share a few details and we’ll propose the best next step.'}</p>
          <ContactForm />
        </div>
        <aside className="space-y-4">
          <div className="card-3d p-5 flex h-full flex-col">
            <h3 className="text-lg font-semibold text-white">{lang === 'CN' ? '即时沟通' : 'Live Chat & Social'}</h3>
            <ul className="mt-2 space-y-2 text-sm text-white/75">
              <li><a href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaWhatsapp className="text-green-500" /> WhatsApp</a></li>
              <li><a href="https://www.instagram.com/metaphysics.alliance/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaInstagram className="text-pink-500" /> Instagram</a></li>
              <li><a href="https://www.facebook.com/MetaphysicsAlliance/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaFacebook className="text-blue-500" /> Facebook</a></li>
              <li><a className="flex items-center gap-2 underline hover:text-white" href={`mailto:${emailSales}`}><FiMail className="text-white/80" /> {lang === "CN" ? "邮件" : "Email"}</a></li>
              <li><Link className="flex items-center gap-2 underline hover:text-white" to="/resources"><FiBook className="text-white/80" /> {lang === "CN" ? "资源" : "Resources"}</Link></li>
            </ul>
          </div>
        </aside>
      </section>

      <SectionDivider title={lang === 'CN' ? '我们的总部' : 'Our HQ'} />
      <MapCard />

      <SectionDivider title={lang === 'CN' ? '区域联系' : 'Regional Contacts'} />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[{k:'sea',t:lang==='CN'?'东南亚':'SEA',e:emailSales},{k:'apac',t:'APAC',e:emailSales},{k:'global',t:lang==='CN'?'全球':'Global',e:emailMedia}].map(({k,t,e}) => (
          <article key={k} className="card-3d p-5 flex h-full flex-col">
            <div className="text-white font-medium">{t}</div>
            <div className="mt-1 text-sm text-white/75">{e}</div>
          </article>
        ))}
      </section>
      <SectionDivider title={lang === 'CN' ? '常见问题' : 'FAQ'} />
      <FAQ />

      <section className="rounded-2xl border border-white/10 bg-black/25 p-5 text-sm text-white/70 backdrop-blur-md">
        <div>
          {lang === 'CN'
            ? '个人信息将用于回应您的咨询，我们会在必要期间内保存。提交即表示您同意我们的数据使用与隐私政策。'
            : 'We use your data to respond to your inquiry and retain it only as necessary. By submitting, you agree to our data use and privacy policy.'}
        </div>
        <div className="mt-2 space-x-4">
          <Link to="/legal/privacy" className="underline hover:text-white">{lang === 'CN' ? '隐私政策' : 'Privacy Policy'}</Link>
          <Link to="/legal/terms" className="underline hover:text-white">{lang === 'CN' ? '服务条款' : 'Terms'}</Link>
        </div>
      </section>
    </div>
  )
}







