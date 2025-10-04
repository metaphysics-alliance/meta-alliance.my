import { useI18n } from '../i18n.jsx'
export default function WhyChooseUs(){
  const { t } = useI18n()
  return (
    <section id="why-us" className="container py-6 md:py-2">
      <div className="card p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('why.title')}</h2>
        <p className="text-white/80 leading-relaxed whitespace-pre-line">{t('why.long')}</p>
      </div>
    </section>
  )
}