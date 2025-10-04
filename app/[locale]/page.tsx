import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import MediaGrid from '@/components/MediaGrid';
import Testimonials from '@/components/Testimonials';
import MapEmbed from '@/components/MapEmbed';
import { getDict, type Locale } from '@/lib/i18n';

export default function Page({ params }: { params: { locale: Locale } }) {
  const dict = getDict(params.locale);

  return (
    <div className="space-y-16">
      <Hero title={dict.home.title} sub={dict.home.sub} locale={params.locale} />

      <Intro who={dict.intro.who} why={dict.intro.why} locale={params.locale} />

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {params.locale === 'zh' ? '展示' : 'Showcase'}
        </h2>
        <MediaGrid />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {params.locale === 'zh' ? '客户评价' : 'Client Reviews'}
        </h2>
        <Testimonials />
      </section>

      <section className="space-y-4 glass rounded-xl p-6">
        <h2 className="text-2xl font-semibold">
          {params.locale === 'zh' ? '订阅我们的通讯' : 'Subscribe to Newsletter'}
        </h2>
        <form className="flex gap-3">
          <input
            type="email"
            placeholder={params.locale === 'zh' ? '输入邮箱地址' : 'Enter your email'}
            className="flex-1 px-3 py-2 rounded-md bg-black/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-gold)]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-brand-gold text-black font-medium hover:bg-yellow-400 transition-colors"
          >
            {params.locale === 'zh' ? '订阅' : 'Subscribe'}
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {params.locale === 'zh' ? '位置' : 'Location'}
        </h2>
        <MapEmbed />
      </section>
    </div>
  );
}
