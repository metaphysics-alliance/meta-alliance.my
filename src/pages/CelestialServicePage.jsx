import { Link } from 'react-router-dom'
import SectionDivider from '../components/SectionDivider.jsx'
import Newsletter from '../components/Newsletter.jsx'
import { useI18n } from '../i18n.jsx'

const placeholderStyles = 'flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white/60 text-sm uppercase tracking-wide'

const Card = ({ section }) => {
  return (
    <div className="card-3d p-6 md:p-8 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3 aspect-video md:aspect-square">
        <div className={`${placeholderStyles} w-full h-full`}>{section.imageLabel || 'Visual Preview'}</div>
      </div>
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl font-semibold text-gold">{section.title}</h3>
        {section.body ? <p className="text-white/75 leading-relaxed">{section.body}</p> : null}
        {Array.isArray(section.points) && section.points.length ? (
          <ul className="space-y-2 text-white/70 list-disc list-inside">
            {section.points.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

const CTASection = ({ cta }) => (
  <div className="card-3d p-6 md:p-8 text-center space-y-4">
    <h3 className="text-2xl font-semibold text-gold">{cta.title}</h3>
    <p className="text-white/75 md:text-lg leading-relaxed">{cta.message}</p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
      <Link to={cta.primaryHref} className="px-5 py-2.5 rounded-lg bg-gold text-black font-semibold shadow-soft-xl hover:brightness-110 transition">
        {cta.primaryLabel}
      </Link>
      <Link to={cta.secondaryHref} className="px-5 py-2.5 rounded-lg border border-gold/50 text-gold hover:bg-gold/10 transition">
        {cta.secondaryLabel}
      </Link>
    </div>
  </div>
)

export default function CelestialServicePage({ serviceKey }){
  const { t } = useI18n()
  const data = t(`services.${serviceKey}`)

  if (!data || typeof data !== 'object'){ return null }

  const sections = data.sections || []
  const cta = data.cta

  return (
    <main className="space-y-14 pb-20">
      <header className="bg-black/40 border-b border-white/10 py-16 backdrop-blur-2xl">
        <div className="container max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/70 text-xs uppercase tracking-[0.3em]">
            {data.badge}
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold text-gold leading-tight">{data.title}</h1>
          <p className="text-white/70 md:text-lg leading-relaxed">{data.subtitle}</p>
        </div>
      </header>

      <div className="space-y-16">
        {sections.map((section) => (
          <section key={section.key} className="space-y-6">
            <SectionDivider title={section.dividerTitle} subtitle={section.dividerSubtitle} />
            <div className="container">
              <Card section={section} />
            </div>
          </section>
        ))}

        {cta ? (
          <section className="space-y-6">
            <SectionDivider title={cta.dividerTitle} subtitle={cta.dividerSubtitle} />
            <div className="container">
              <CTASection cta={cta} />
            </div>
          </section>
        ) : null}

        <section className="space-y-6">
          <SectionDivider title={data.newsletterTitle} subtitle={data.newsletterSubtitle} />
          <Newsletter />
        </section>
      </div>
    </main>
  )
}

