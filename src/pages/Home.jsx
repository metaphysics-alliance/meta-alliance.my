// src/pages/Home.jsx
import HeroCarousel from '../components/HeroCarousel.jsx'
import AboutDuo from '../components/AboutDuo.jsx'
import VIPTiers from '../components/VIPTiers.jsx'
import Reviews from '../components/Reviews.jsx'
import Newsletter from '../components/Newsletter.jsx'
import FAQ from '../components/FAQ.jsx'
import MapCard from '../components/MapCard.jsx'
import SectionDivider from '../components/SectionDivider.jsx'
import { useI18n } from '../i18n.jsx'

export default function Home(){
  const { lang } = useI18n()
  const newsletterIntro = lang === 'EN' ? 'Metaphysics Alliance' : '玄域联盟'
  const newsletterTitle = lang === 'EN' ? 'Newsletter Signup' : '订阅资讯'
  const faqTitle = lang === 'EN' ? 'Frequently Asked Questions' : '常见问题（FAQ）'
  const mapTitle = lang === 'EN' ? 'Our HQ' : '我们的大本营'

  return (
    <main>
      <HeroCarousel />
      <SectionDivider title={newsletterIntro} subtitle={lang==='EN' ? 'Full-spectrum metaphysics consulting' : '全维度玄学咨询与策略'} />
      <AboutDuo />
      <VIPTiers />
      {/* Reviews has its own divider */}
      <Reviews />
      <SectionDivider title={newsletterTitle} />
      <Newsletter />
      <SectionDivider title={faqTitle} />
      <FAQ />
      <SectionDivider title={mapTitle} />
      <MapCard />
    </main>
  )
}
