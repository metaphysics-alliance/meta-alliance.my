// src/components/AboutDuo.jsx
import WhoCard from './WhoCard';
import WhyCard from './WhyCard';

/**
 * Revamped layout with cosmic premium styling
 */
export default function AboutDuo() {
  return (
    <section className="relative container space-y-12 md:space-y-16 py-8">
      {/* WHO WE ARE */}
      <WhoCard />

      {/* WHY CHOOSE US */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-black/40 via-slate-950/60 to-black/40 backdrop-blur-xl shadow-2xl p-8 md:p-12">
        {/* Cosmic glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-600/5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-gold/10 via-transparent to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative">
          <WhyCard />
        </div>
      </div>
    </section>
  );
}
