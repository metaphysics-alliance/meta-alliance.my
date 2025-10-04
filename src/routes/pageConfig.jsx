import ContentPage from '../pages/ContentPage.jsx'
import Home from '../pages/Home.jsx'
import CelestialServicePage from '../pages/CelestialServicePage.jsx'

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

const service = (path, { title, intro, bullets, ideal }) => ({
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
      cta={CTA_CONTACT}
    />
  ),
})

export const ROUTES = [
  {
    path: '/',
    element: <Home />,
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
    ideal: 'Ideal for founders, professionals and creators planning their next 18–36 months and wanting confidence that each move synchronises with their inherent rhythm.',
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
  service('/services/fengshui/home-destiny-compass', {
    title: 'Home Destiny Compass',
    intro: 'Residential Feng Shui audit aligning your living space with the occupants’ charts. We harmonise forms, flying stars and timing cycles to support health, relationships and prosperity.',
    bullets: [
      'Onsite or plan-based assessment of external forms and internal flow.',
      'Flying Star analysis with cures, activations and annual updates.',
      'Room-by-room recommendations tailored to each family member.',
    ],
    ideal: 'Ideal for homeowners ready to realign their environment with their destiny map.',
  }),
  service('/services/fengshui/office-power-alignment', {
    title: 'Office Power Alignment',
    intro: 'Commercial Feng Shui design to accelerate team focus, sales flow and executive clarity. We merge landform, Flying Star and Qi Men time gates for consistent performance.',
    bullets: [
      'Executive desk and department placement keyed to supportive sectors.',
      'Wealth, relationship and marketing activations by calendar phase.',
      'Operational guidelines for renovations, move-in dates and annual retuning.',
    ],
    ideal: 'Ideal for companies scaling teams or reorganising their workspace.',
  }),
  service('/services/fengshui/dragon-vein-oracle', {
    title: 'Dragon Vein Oracle',
    intro: 'Landform Feng Shui for estates, developments and retreats. We trace dragon veins, protective mountains and water mouths to determine auspicious siting.',
    bullets: [
      'Macro landform audit with drone or satellite mapping support.',
      'Site selection scoring based on protective forms and qi convergence.',
      'Recommendations for entrances, water features and long-term qi maintenance.',
    ],
    ideal: 'Ideal for developers and families acquiring land who require geomantic accuracy.',
  }),
  service('/services/fengshui/cosmic-cycle-of-fate', {
    title: 'Cosmic Cycle of Fate Layout',
    intro: 'Seasonal Feng Shui layout planning aligned to the 24 Solar Terms. Keep your property synchronised with shifting qi through curated rituals and space adjustments.',
    bullets: [
      'Quarterly layout updates with targeted enhancements and defences.',
      'Integration with household or office activity calendar.',
      'Guided rituals and elemental support matched to upcoming cycles.',
    ],
    ideal: 'Ideal for households and teams committed to maintaining momentum all year.',
  }),
  service('/services/fengshui/celestial-star-matrix', {
    title: 'Celestial Star Matrix Design',
    intro: 'Custom interior zoning based on Flying Star combinations, merging aesthetics with energetic function.',
    bullets: [
      'Sector-by-sector star diagnostics translated into design guidelines.',
      'Lighting, colour and material recommendations to anchor favourable qi.',
      'Annual updates to keep the matrix aligned with time flow.',
    ],
    ideal: 'Ideal for renovations or new builds needing metaphysical alignment from blueprint to décor.',
  }),
  service('/services/fengshui/energy-convergence-field', {
    title: 'Energy Convergence Field',
    intro: 'Combine Feng Shui, Qi Men and numerology to orchestrate a signature energy field for flagship homes or offices.',
    bullets: [
      'Master schematic that layers spatial orientation, time gates and numeric codes.',
      'Activation protocol for prosperity, talent retention and wellness.',
      'Review of logos, signage and pathways to lock in the convergence.',
    ],
    ideal: 'Ideal for hospitality, retail and corporate HQ projects seeking iconic resonance.',
  }),
  service('/services/magnetic-matrix/i-ching-energy-matrix', {
    title: 'I-Ching Energy Matrix',
    intro: 'Hexagram-based diagnostics that map strategic moves to I-Ching archetypes. We translate changing lines into precise leadership guidance.',
    bullets: [
      'Primary and relating hexagrams with scenario interpretations.',
      'Action steps for talent management, partnerships and crisis navigation.',
      'Calendar map aligning hexagram phases with upcoming decisions.',
    ],
    ideal: 'Ideal for strategic planners who want a divination-backed decision matrix.',
  }),
  service('/services/magnetic-matrix/name-destiny-code', {
    title: 'Name Destiny Code',
    intro: 'Auspicious naming for people, brands or products using numerology, BaZi resonance and linguistic sound mapping.',
    bullets: [
      'Assessment of existing names and identification of friction points.',
      'Creation of aligned name options with phonetics and numeric scoring.',
      'Activation guidance for launching or transitioning into the new name.',
    ],
    ideal: 'Ideal for newborns, rebrands and anyone needing their name to carry strategic qi.',
  }),
  service('/services/magnetic-matrix/soul-number-blueprint', {
    title: 'Soul Number Blueprint',
    intro: 'Comprehensive numerology reading synced with BaZi and Zi Wei findings to reveal life lessons, karmic debts and supportive alliances.',
    bullets: [
      'Core, soul and destiny numbers with interpretation and remediation.',
      'Relationship compatibility and team dynamics profiling.',
      'Personal rituals, colours and environments to stabilise the field.',
    ],
    ideal: 'Ideal for individuals and couples wanting numerology integrated with their full metaphysics profile.',
  }),
  {
    path: '/oracle/celestial-numbers',
    element: (
      <ContentPage
        title="Supreme Celestial Numbers Oracle"
        intro="Discover numeric pathways anchored in the Supreme Celestial system. Each session decodes how numbers interact with your natal chart, business cycles and space."
        sections={[
          {
            heading: 'Inside the session',
            bullets: [
              'Interpretation of star-number pairings and their influence on finance, brand and relationships.',
              'Activation dates and supportive rituals based on number sequencing.',
              'Integration recommendations with BaZi, Zi Wei and Feng Shui findings.',
            ],
          },
          {
            heading: 'When to use it',
            body: 'Perfect before major launches, naming exercises or investment allocations when numeric alignment can multiply outcomes.',
          },
        ]}
        cta={CTA_CONTACT}
      />
    ),
  },
  {
    path: '/oracle/taiyi-numbers',
    element: (
      <ContentPage
        title="Supreme Tai Yi Numbers Oracle"
        intro="Harness Tai Yi numerology to reveal concealed opportunities, adversaries and timing. We translate esoteric charts into moves you can execute immediately."
        sections={[
          {
            heading: 'Inside the session',
            bullets: [
              'Tai Yi chart casting tailored to your question or campaign.',
              'Risk mitigation steps when Tai Yi flags obstacles or competing forces.',
              'Suggested timing and directions to capitalise on supportive stars.',
            ],
          },
          {
            heading: 'When to use it',
            body: 'Ideal for strategic pivots, partnership vetting and assessing market timing where certainty matters.',
          },
        ]}
        cta={CTA_CONTACT}
      />
    ),
  },
  {
    path: '/oracle/six-ren',
    element: (
      <ContentPage
        title="Cosmic Six Ren Oracle"
        intro="Step into the Six Ren divination chamber for fast, actionable intelligence. We decode the interplay of Heaven, Earth and Human plates to map your best course of action."
        sections={[
          {
            heading: 'Inside the session',
            bullets: [
              'Casting for tactical decisions such as negotiations, travel and crisis response.',
              'Identifies allies, hidden threats and resource flow for the situation.',
              'Clear yes/no guidance when combined with Qi Men or BaZi overlays.',
            ],
          },
          {
            heading: 'When to use it',
            body: 'Ideal when you need swift clarity and a decisive recommendation before moving.',
          },
        ]}
        cta={CTA_CONTACT}
      />
    ),
  },
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
  service('/enterprise/audit', {
    title: 'Corporate Audit',
    intro: 'Full-spectrum enterprise audit combining BaZi of key leaders, Feng Shui of premises and Qi Men strategy mapping.',
    bullets: [
      'Leadership alignment report and succession insights.',
      'Workspace optimisation across HQs, branches and retail footprints.',
      'Strategic timing roadmap for launches, fundraising and restructuring.',
    ],
    ideal: 'Ideal for corporations wanting metaphysics intelligence woven into strategic planning.',
  }),
  service('/enterprise/site', {
    title: 'Site Selection',
    intro: 'Evaluate prospective locations using landform Feng Shui, compass readings and local timing qi.',
    bullets: [
      'Comparative scoring for shortlisted sites with red flag alerts.',
      'Environmental impact and community qi review.',
      'Move-in timing and renovation sequencing for a smooth launch.',
    ],
    ideal: 'Ideal for businesses expanding or relocating who need certainty before committing.',
  }),
  service('/enterprise/cycles', {
    title: 'Strategy & Cycles',
    intro: 'Enterprise-level cycle planning aligning annual, monthly and daily windows with your strategic roadmap.',
    bullets: [
      'Quarterly playbooks that sync initiatives with supportive qi.',
      'Crisis buffers and contingency plans using Qi Men and I-Ching alerts.',
      'Executive briefings to keep stakeholders aligned with the plan.',
    ],
    ideal: 'Ideal for leadership teams needing an energetic command centre for the year.',
  }),
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
    element: (
      <ContentPage
        title="About Metaphysics Alliance"
        intro="Metaphysics Alliance is a Malaysia-based boutique translating classical Chinese metaphysics into executive-ready strategy. We honour the lineage while ensuring every reading is practical, evidence-driven and anchored to True Solar Time."
        sections={[
          {
            heading: 'Our approach',
            bullets: [
              'Cross-validate every recommendation across BaZi, Zi Wei, Qi Men, Feng Shui and numerology.',
              'Ground rituals and remedies in measurable outcomes for homes, leadership and enterprises.',
              'Document processes rigorously so knowledge can be handed to future generations or teams.',
            ],
          },
          {
            heading: 'Our lineage',
            body: 'We study under classic schools in Malaysia, Taiwan and Hong Kong, combining imperial methods with modern research. Each consultant completes annual recertification and field audits.',
          },
        ]}
        cta={CTA_ENQUIRE}
      />
    ),
  },
  {
    path: '/contact',
    element: (
      <ContentPage
        title="Contact"
        intro="Let’s map out the support you need. Share your intention and preferred timelines—our team will respond within two business days."
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
    element: (
      <ContentPage
        title="Privacy Policy"
        intro="We respect the sensitivity of personal birth data, charts and proprietary business information. This policy outlines how we collect, store and protect your information."
        sections={[
          {
            heading: 'Information we collect',
            bullets: [
              'Birth data, names and contact details supplied for chart work.',
              'Property layouts, photos and business metrics for Feng Shui and corporate audits.',
              'Payment details processed securely via trusted gateways.',
            ],
          },
          {
            heading: 'How we safeguard data',
            body: 'All files are stored in encrypted folders with restricted access. We do not share your information with third parties unless required by law or explicitly authorised by you.',
          },
        ]}
        cta={CTA_ENQUIRE}
      />
    ),
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
              'Deliverables are for the client’s personal or organisational use unless otherwise agreed.',
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
            body: 'Consultations may be rescheduled once with 48 hours’ notice. No-shows or late cancellations forfeit the session fee.',
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




