import { useI18n } from '../i18n.jsx'

export default function WhoWeAre(){
  const { t } = useI18n()
  return (
    <section id="who-we-are" className="container py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('who.title')}</h2>
          <p className="text-white/80 leading-relaxed">{t('who.body')}</p>
        </div>
        <div className="rounded-2xl overflow-hidden ring-1 ring-white/10">
          <img src="/logo.png" alt="Metaphysics Alliance" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}
