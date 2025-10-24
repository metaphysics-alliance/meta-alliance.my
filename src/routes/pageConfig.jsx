import AboutPage from '../pages/AboutPage.jsx'
import CelestialServicePage from '../pages/CelestialServicePage.jsx'
import ContentPage from '../pages/ContentPage.jsx'
import LegalPage from '../components/LegalPage.jsx'
import Home from '../pages/Home.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import ServicesIndex from '../pages/ServicesIndex.jsx'

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
  service('/vip-report/essential', {
    title: 'Essential Destiny Blueprint',
    intro: 'A 100+ page dossier for individuals who want clarity on their inherent pattern, profit engines and annual momentum. We use cross-verified BaZi, Zi Wei, numerology and timing charts so every decision is supported by classical data.',
    bullets: [
      'Talents, industries and earning models aligned to your element matrix.',
      'Ten-year Luck Pillars and annual timing highlights with mitigation steps.',
      'Life number review plus remedial actions to stabilise finances and relationships.',
    ],
    ideal: 'Ideal for founders, professionals and creators planning their next 18—36 months and wanting confidence that each move synchronises with their inherent rhythm.',
  }),
  service('/vip-report/advanced', {
    title: 'Advanced Destiny Blueprint',
    intro: 'A 200+ page strategy pack for leaders managing teams, brands or families. We expand into numeric field studies, advanced Qi Men stratagems and Feng Shui overlays for the environments you operate in most.',
    bullets: [
      'Everything in Essential plus numeric field and name auspiciousness analysis.',
      'Qi Men Dun Jia charts for tactical openings and negotiations.',
      'Environment recommendations for home and office to support the new strategy.',
    ],
    ideal: 'Ideal for business owners and executives who need lifetime perspective with tactical windows for launches, hires and relocations.',
  }),
  service('/vip-report/supreme', {
    title: 'Supreme Destiny Blueprint',
    intro: 'A 300+ page master plan for those orchestrating multi-entity portfolios or generational wealth. We combine imperial astrology, Tai Yi, Liu Ren and onsite Feng Shui review where required.',
    bullets: [
      'Name and numeric field optimisation with change recommendations.',
      'Feng Shui evaluation for core residences (and optional offices).',
      'Strategic roadmap that blends Emerald Court protocols, seasonal qi flow and legacy planning.',
    ],
    ideal: 'Ideal for investors, family offices and visionaries who require a north star for decades ahead and need every layer of metaphysics in one command deck.',
  }),
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
    element: (
      <ContentPage
        title="Courses Overview"
        intro="Our Academy curates pathways from beginner to professional certification. Sessions combine live teaching, case clinics and guided practice with real charts."
        sections={[
          {
            heading: 'Learning approach',
            bullets: [
              'Hybrid delivery with live cohorts, recordings and lifetime resources.',
              'Small group labs for chart reading, Feng Shui audits and Qi Men strategy.',
              'Mentorship checkpoints to ensure you can apply each discipline with confidence.',
            ],
          },
          {
            heading: 'How to enrol',
            body: 'Review the track below that suits your stage. Join the waitlist or book a discovery call to confirm your placement.',
          },
        ]}
        cta={CTA_ENQUIRE}
      />
    ),
  },
  service('/academy/beginner', {
    title: 'Beginner Track',
    intro: 'Ground yourself in BaZi foundations, numerology and essential Feng Shui so you can read charts for yourself and family.',
    bullets: [
      'Basics of Yin/Yang, five elements and Heavenly Stem / Earthly Branch cycles.',
      'Hands-on practice interpreting natal charts and yearly luck pillars.',
      'Introduction to space harmonisation and energetic hygiene.',
    ],
    ideal: 'Ideal for enthusiasts and new practitioners beginning their metaphysics journey.',
  }),
  service('/academy/advanced', {
    title: 'Advanced Track',
    intro: 'Expand into Zi Wei, Qi Men and timing selection. Learn how to construct multi-system strategies that hold in real casework.',
    bullets: [
      'Deep dives into palace interplay, star families and strategic formations.',
      'Timing algorithms integrating True Solar Time and 24 Solar Terms.',
      'Mentored projects working on real client briefs.',
    ],
    ideal: 'Ideal after completing the Beginner Track or equivalent knowledge.',
  }),
  service('/academy/pro', {
    title: 'Professional Certification',
    intro: 'Become a certified metaphysics consultant. We cover consulting frameworks, ethics, case management and business building.',
    bullets: [
      'Capstone assessments with live clients under supervision.',
      'Consulting toolkit including templates, pricing structures and delivery flow.',
      'Ongoing peer community and case support after graduation.',
    ],
    ideal: 'Ideal for practitioners ready to serve clients professionally.',
  }),
  service('/academy/calendar', {
    title: 'Academy Calendar & Booking',
    intro: 'View upcoming cohorts, masterclasses and clinics. Reserve your seat or request private training for your team.',
    bullets: [
      'Quarterly intake dates with early-enrolment advantages.',
      'Private cohort options for corporate or family teams.',
      'Flexible payment plans and sponsorship opportunities.',
    ],
    ideal: 'Ideal for learners picking their start date or arranging bespoke programmes.',
  }),
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
    path: '/about',
    element: (<AboutPage />),
  },
  {
    path: '/contact',
    element: (
      <ContentPage
        title="Contact"
        intro="Let's map out the support you need. Share your intention and preferred timelines—our team will respond within two business days."
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
    path: '/privacy',
    element: <LegalPage policyKey="privacy" />,
  },
  {
    path: '/terms',
    element: (
      <ContentPage
        title="Terms of Service"
        intro="Engaging Metaphysics Alliance means agreeing to the terms below. They clarify scope, deliverables, intellectual property and client responsibilities."
        sections={[
          {
            heading: 'Engagement scope',
            bullets: [
              'Services commence after receipt of required data and payment confirmation.',
              'Consultations may be recorded for internal review with your consent.',
              'Deliverables are for the client\'s personal or organisational use unless otherwise agreed.',
            ],
          },
          {
            heading: 'Client responsibilities',
            body: 'Clients ensure the accuracy of supplied information and understand metaphysical guidance supplements—not replaces—professional advice in legal, medical or financial matters.',
          },
        ]}
        cta={CTA_ENQUIRE}
      />
    ),
  },
  {
    path: '/cookies',
    element: (
      <ContentPage
        title="Cookie Policy"
        intro="We use minimal cookies to understand site performance and support language preferences."
        sections={[
          {
            heading: 'What we use',
            bullets: [
              'Essential cookies to remember language selection and session state.',
              'Analytics cookies (optional) to observe aggregate usage trends.',
            ],
          },
          {
            heading: 'Managing cookies',
            body: 'You can disable non-essential cookies in your browser. Doing so will not affect access but may limit personalisation.',
          },
        ]}
        cta={CTA_ENQUIRE}
      />
    ),
  },
  {
    path: '/disclaimer',
    element: (
      <ContentPage
        title="Disclaimer"
        intro="Our work interprets classical metaphysics to support decision-making. Outcomes depend on client action and external factors beyond our control."
        sections={[
          {
            heading: 'Scope of advice',
            bullets: [
              'Readings provide strategic insight but are not substitutes for medical, legal or financial counsel.',
              'We do not guarantee specific results; we provide the best analysis based on data provided.',
            ],
          },
          {
            heading: 'Client discretion',
            body: 'Clients retain full responsibility for how they implement recommendations. We encourage collaboration with licensed professionals where appropriate.',
          },
        ]}
        cta={CTA_ENQUIRE}
      />
    ),
  },
  {
    path: '/refund',
    element: (
      <ContentPage
        title="Refund Policy"
        intro="Because each engagement involves significant research and custom analysis, we outline refund eligibility below."
        sections={[
          {
            heading: 'Before work begins',
            bullets: [
              'Full refunds available within 48 hours of payment if no work has started.',
              'After research commences, fees become non-refundable but may be transferred to another service at our discretion.',
            ],
          },
          {
            heading: 'Rescheduling',
            body: 'Consultations may be rescheduled once with 48 hours\' notice. No-shows or late cancellations forfeit the session fee.',
          },
        ]}
        cta={CTA_ENQUIRE}
      />
    ),
  },
]

export const REDIRECTS = [
  { from: '/services/vip-report', to: '/vip-report' },
  { from: '/oracle/celestial', to: '/oracle/celestial-numbers' },
  { from: '/oracle/taiyi', to: '/oracle/taiyi-numbers' },
  { from: '/oracle/supreme', to: '/oracle/six-ren' },
]
