// src/components/WhoCard.jsx
import { Sparkles } from 'lucide-react'
import { useI18n } from '../i18n.jsx'
import AutoImageBox from './AutoImageBox.jsx'
import CTAButton from './CTAButton.jsx'

export default function WhoCard(){
  const { tt, lang } = useI18n()
  return (
    <section id="who-we-are" className="container py-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-black/40 via-slate-950/60 to-black/40 backdrop-blur-xl shadow-2xl">
        {/* Cosmic glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-600/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-gold/10 via-transparent to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
          {/* Text (left) */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border border-yellow-500/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold tracking-wider uppercase text-gold">
                {lang === 'EN' ? 'About Meta Alliance' : '关于玄域联盟'}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 via-gold to-amber-400 bg-clip-text text-transparent leading-tight">
              {tt('who_title')}
            </h2>
            
            <p className="text-white/90 leading-relaxed text-base md:text-lg">
              {tt('who_long')}
            </p>

            <CTAButton 
              to="/about"
              size="lg"
              showArrow
            >
              {lang === 'EN' ? 'Learn More About Us' : '了解更多'}
            </CTAButton>
          </div>

          {/* Image (right) */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-amber-600/20 rounded-2xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <AutoImageBox
                src="/assets/home/who.jpg"
                alt="Who we are"
                maxHeight={820}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
