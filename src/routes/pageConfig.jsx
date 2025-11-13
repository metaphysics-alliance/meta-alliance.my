/* eslint-disable import/order */
import AboutPage from '../pages/AboutPage.jsx'
import AcademyCourseDetail from '../pages/AcademyCourseDetail.jsx'
import AcademyCoursesPage from '../pages/AcademyCoursesPage.jsx'
import CelestialServicePage from '../pages/CelestialServicePage.jsx'
import ContentPage from '../pages/ContentPage.jsx'
import LegalPage from '../components/LegalPage.jsx'
import Home from '../pages/Home.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import ServicesIndex from '../pages/ServicesIndex.jsx'
import PricingPage from '../pages/PricingPage.jsx'
import CheckoutPage from '../pages/CheckoutPage.jsx'
import QimenDatasetsPage from '../pages/QimenDatasetsPage.jsx'

const CTA_CONTACT = {
  label: 'Book a consultation',
  href: '/contact',
  body: 'Ready to explore this work together? Book a consultation and we will craft a custom plan for you.',
}

const CTA_ENQUIRE = {
  label: 'Talk with our team',
  href: '/contact',
  body: 'Have questions before you commit? Reach out and we will walk you through the next steps.',
}

const service = (path, { title, intro, bullets, ideal, cta = CTA_CONTACT }) => ({
  path,
  element: (
    <ContentPage
      title={title}
      intro={intro}
      sections={[
        {
          heading: 'What you receive',
          bullets,
        },
        {
          heading: 'Ideal for',
          body: ideal,
        },
      ]}
      cta={cta}
    />
  ),
});

const celestialService = (path, options = {}) => {
  const serviceKey = typeof options === 'string' ? options : options?.serviceKey;

  return {
    path,
    element: <CelestialServicePage serviceKey={serviceKey} />,
  };
};
export const ROUTES = [
  {
    path: '/services',
    element: (<ServicesIndex />),
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/pricing/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/vip-report',
    element: (
      <ContentPage
        title="VIP Holistic Destiny Analysis"
        intro="Our flagship programme blends BaZi, Zi Wei Dou Shu, Qi Men Dun Jia, Feng Shui, numerology and True Solar Time calibration into a single navigational document. Each tier expands the depth of analysis so you can lead at the personal, family or enterprise level with absolute timing clarity."
        sections={[
          {
            heading: 'How it helps',
            bullets: [
              'Triangulates multiple classical systems so recommendations agree before action.',
              'Maps ten-year and yearly pivot windows against True Solar Time for precision moves.',
              'Delivers a practical playbook that translates metaphysics into strategy, environment and naming.',
            ],
          },
          {
            heading: 'Choose your tier',
            body: 'Select Essential, Advanced or Supreme depending on how deep you need to go into capital allocation, relationship mapping and space/time optimisation. Every engagement begins with a discovery consultation to define the right tier.',
          },
        ]}
        cta={CTA_CONTACT}
      />
    ),
  },
  celestialService('/vip-report/essential', { serviceKey: 'essentialBlueprint' }),
  celestialService('/vip-report/pro', { serviceKey: 'advancedBlueprint' }),
  celestialService('/vip-report/supreme', { serviceKey: 'supremeBlueprint' }),
  {
    path: '/services/celestial/destiny-algorithm',
    element: <CelestialServicePage serviceKey="bazi" />,
  },
  {
    path: '/services/celestial/imperial-star-atlas',
    element: <CelestialServicePage serviceKey="ziwei" />,
  },
  {
    path: '/services/celestial/arcane-strategy-matrix',
    element: <CelestialServicePage serviceKey="qimen" />,
  },
  celestialService('/services/fengshui/home-destiny-compass', { serviceKey: 'fsHome' }),
  celestialService('/services/fengshui/office-power-alignment', { serviceKey: 'fsOffice' }),
  celestialService('/services/fengshui/dragon-vein-oracle', { serviceKey: 'fsDragon' }),
  celestialService('/services/fengshui/cosmic-cycle-of-fate', { serviceKey: 'fsCycle' }),
  celestialService('/services/fengshui/celestial-star-matrix', { serviceKey: 'fsMatrix' }),
  celestialService('/services/fengshui/energy-convergence-field', { serviceKey: 'fsEnergy' }),
  celestialService('/services/magnetic-matrix/i-ching-energy-matrix', { serviceKey: 'mmIching' }),
  celestialService('/services/magnetic-matrix/name-destiny-code', { serviceKey: 'mmName' }),
  celestialService('/services/magnetic-matrix/soul-number-blueprint', { serviceKey: 'mmSoul' }),

  celestialService('/oracle/celestial-numbers', { serviceKey: 'celestialNumbers' }),
  celestialService('/oracle/taiyi-numbers', { serviceKey: 'taiyiNumbers' }),
  celestialService('/oracle/six-ren', { serviceKey: 'sixRen' }),
  {
    path: '/academy/courses',
    element: <AcademyCoursesPage />,
  },
  {
    path: '/academy/foundation',
    element: <AcademyCourseDetail courseKey="academyFoundation" />,
  },
  {
    path: '/academy/beginner',
    element: <AcademyCourseDetail courseKey="academyBeginner" />,
  },
  {
    path: '/academy/intermediate',
    element: <AcademyCourseDetail courseKey="academyIntermediate" />,
  },
  {
    path: '/academy/professional',
    element: <AcademyCourseDetail courseKey="academyProfessional" />,
  },
  celestialService('/enterprise/audit', { serviceKey: 'corporateAudit' }),
  celestialService('/enterprise/site', { serviceKey: 'enterpriseSite' }),
  celestialService('/enterprise/cycles', { serviceKey: 'enterpriseCycles' }),
  service('/resources/four-pillars', {
    title: 'Cosmic Four Pillars Chart',
    intro: 'Interactive resources to help you interpret BaZi charts responsibly. Includes glossaries, case studies and timing checklists.',
    bullets: [
      'Downloadable templates for chart plotting and interpretation notes.',
      'Video explainers on common structures and corrective strategies.',
      'Monthly case clinics pulled from real client stories (shared anonymously).',
    ],
    ideal: 'Ideal for self-learners and students who want structured reference material.',
  }),
  service('/resources/purple-star', {
    title: 'Celestial Star Oracle Chart',
    intro: 'Resource hub for Zi Wei Dou Shu enthusiasts. Decode palaces, auxiliary stars and transformation mechanisms with clarity.',
    bullets: [
      'Reference sheets for star meanings and combinations.',
      'Live breakdowns of famous charts to illustrate key patterns.',
      'Guides on integrating Zi Wei insights with BaZi and Qi Men.',
    ],
    ideal: 'Ideal for students wanting to deepen their imperial astrology skill set.',
  }),
  {
    path: '/resources/qimen-datasets',
    element: <QimenDatasetsPage />,
  },
  {
    path: '/about',
    element: (<AboutPage />),
  },
  {
    path: '/contact',
    element: (
      <ContentPage
        title="Contact"
        intro="Let's map out the support you need. Share your intention and preferred timelines-our team will respond within two business days."
        sections={[
          {
            heading: 'How to reach us',
            bullets: [
              'Email: hello@meta-alliance.my',
              'WhatsApp / WeChat: available upon request after initial enquiry.',
              'Consultations available in English, Mandarin and Cantonese.',
            ],
          },
          {
            heading: 'Before you enquire',
            body: 'Please include your birth data (with location and time) for destiny work, or site address and floor plans for Feng Shui. For corporate engagements, share organisation size and key objectives.',
          },
        ]}
        cta={CTA_CONTACT}
      />
    ),
  },
  {
    path: '/legal/privacy',
    element: <LegalPage policyKey="privacy" />,
  },
  {
    path: '/legal/terms',
    element: <LegalPage policyKey="terms" />,
  },
  {
    path: '/legal/cookies',
    element: <LegalPage policyKey="cookies" />,
  },
  {
    path: '/legal/disclaimer',
    element: <LegalPage policyKey="disclaimer" />,
  },
  {
    path: '/legal/refund',
    element: <LegalPage policyKey="refund" />,
  },
]

export const REDIRECTS = [
  { from: '/privacy', to: '/legal/privacy' },
  { from: '/terms', to: '/legal/terms' },
  { from: '/cookies', to: '/legal/cookies' },
  { from: '/disclaimer', to: '/legal/disclaimer' },
  { from: '/refund', to: '/legal/refund' },
  { from: '/services/vip-report', to: '/vip-report' },
  { from: '/oracle/celestial', to: '/oracle/celestial-numbers' },
  { from: '/oracle/taiyi', to: '/oracle/taiyi-numbers' },
  { from: '/oracle/supreme', to: '/oracle/six-ren' },
]
