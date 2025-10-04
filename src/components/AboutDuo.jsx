// src/components/AboutDuo.jsx
import WhoCard from './WhoCard';
import WhyCard from './WhyCard';

/**
 * Revamped layout:
 * - WHO on top (unchanged content/styling lives inside WhoCard)
 * - WHY below (inner icon cards within WhyCard)
 * Wrapped with premium card shells to keep brand vibe consistent.
 */
export default function AboutDuo() {
  return (
    <section className="relative space-y-8 md:space-y-10">
      {/* WHO — remains as you designed in WhoCard */}
      <div className="rounded-2xl bg-black/20 border border-white/10 shadow-[0_22px_55px_rgba(0,0,0,0.35)] backdrop-blur-xl p-6 md:p-8">
        <WhoCard />
      </div>

      {/* WHY — revamped with inner icon cards */}
      <div className="rounded-2xl bg-black/20 border border-white/10 shadow-[0_22px_55px_rgba(0,0,0,0.35)] backdrop-blur-xl p-6 md:p-8">
        <WhyCard />
      </div>
    </section>
  );
}
