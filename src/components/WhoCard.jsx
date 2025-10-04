// src/components/WhoCard.jsx
import { useI18n } from '../i18n.jsx'
import AutoImageBox from './AutoImageBox.jsx'

export default function WhoCard(){
  const { tt } = useI18n()
  return (
    <section id="who-we-are" className="container py-12">
      <div className="grid md:grid-cols-2 gap-6 items-center card-3d p-6 md:p-8">
        {/* Text (left) */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{tt('who_title')}</h2>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">{tt('who_long')}</p>
        </div>

        {/* Image (right) — auto-resizes to the intrinsic ratio */}
        <AutoImageBox
          src="/assets/home/who.jpg"
          alt="Who we are"
          maxHeight={820}
        />
      </div>
    </section>
  )
}
