import AboutPage from '../pages/AboutPage.jsx'
import CelestialServicePage from '../pages/CelestialServicePage.jsx'
import ContentPage from '../pages/ContentPage.jsx'
import Home from '../pages/Home.jsx'
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

const celestialService = (path, content = {}) => ({
  path,
  element: <CelestialServicePage content={content} />,
});
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
    ideal: 'Ideal for founders, professionals and creators planning their next 18├óΓé¼ΓÇ£36 months and wanting confidence that each move synchronises with their inherent rhythm.',
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
  celestialService('/services/fengshui/home-destiny-compass',
    {
      "EN": {
        "badge": "Feng Shui Assessment",
        "title": "Home Destiny Compass",
        "intro": "Transform your residence into a regenerative command centre tuned to every occupants destiny signature.",
        "overviewHeading": "Inside the Audit",
        "overviewSubtitle": "How we engineer a living sanctuary",
        "overviewTitle": "Celestial Habitat Blueprint",
        "imageLabel": "Residential Energy Map",
        "bullets": [
          "Hybrid onsite and digital survey layering landform, Flying Star and household BaZi intelligence.",
          "Critical-room protocols covering wealth altars, wellness anchors, sleep optimisation and focus zones.",
          "Annual retuning calendar with date-specific cures, activations and maintenance actions.",
          "Curated remedy procurement list with vetted metals, crystals, water features and artisan suppliers."
        ],
        "ideal": "Perfect for households upgrading to a sanctuary that multiplies vitality, intimacy and financial momentum.",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Professional Workflow",
            "dividerSubtitle": "Why discerning families trust this audit",
            "title": "Evidence-Based Feng Shui Process",
            "imageLabel": "Fieldwork Protocol",
            "body": "From intake to post-audit coaching, every step is documented so you know precisely how each recommendation was produced.",
            "points": [
              "Pre-audit data room with questionnaires, floor plans, compass shots and occupant profiles.",
              "Hybrid onsite and remote validation using laser measurements, drone imagery and Flying Star simulations.",
              "Thirty day concierge support to monitor cures, answer practical questions and calibrate behaviour shifts."
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "Performance Outcomes",
            "dividerSubtitle": "Metrics households report",
            "title": "Health, Prosperity, Harmony",
            "imageLabel": "Household Wins",
            "body": "Clients reference calmer households, healthier bodies and more consistent cashflow within months of implementation.",
            "points": [
              "Sleep quality, emotional tone and overall immunity stabilise within forty five days of bedroom rewiring.",
              "Study and career efforts sharpen as personal sectors are aligned to supportive directions.",
              "Receivables and savings ratios improve once wealth sectors are activated and clutter neutralised."
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Upgrade Your Home Field",
          "dividerSubtitle": "Private audit slots released each month",
          "title": "Book a Home Destiny Assessment",
          "message": "Share your floor plan, compass shots and family birth data so we can secure survey dates and prepare your bespoke evaluation dossier.",
          "primaryLabel": "Schedule My Audit",
          "primaryHref": "/contact",
          "secondaryLabel": "View Case Transformations",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "Home Energy Intelligence",
        "newsletterSubtitle": "Seasonal layout tweaks, auspicious move-in windows and live transformation stories."
      },
      "CN": {
        "badge": "ΘúÄµ░┤Φ»äΣ╝░",
        "title": "σ«àΦ┐Éτ╜ùτ¢ÿ",
        "intro": "µèèΣ╜ÅµëÇµëôΘÇáΣ╕║Σ╕Äσà¿σ«╢σæ╜τ¢ÿσà▒µî»τÜäΦâ╜ΘçÅµîçµîÑΣ╕¡σ┐âπÇé",
        "overviewHeading": "µ£ìσèíΣ║«τé╣",
        "overviewSubtitle": "µêæΣ╗¼σªéΣ╜òµëôΘÇáσ▒àσ«╢σ£úσƒƒ",
        "overviewTitle": "σ«àΦ┐ÉΦâ╜ΘçÅΦô¥σ¢╛",
        "imageLabel": "Σ╜Åσ«àµ░öσ£║σ¢╛",
        "bullets": [
          "τ╗ôσÉêτÄ░σ£║σïÿµƒÑΣ╕ÄΣ║æτ½»σêåµ₧É∩╝îµò┤σÉêσ╜óσ│ªπÇüΘú₧µÿƒΣ╕Äσ«╢σ║¡µêÉσæÿσà½σ¡ùπÇé",
          "σ¢┤τ╗òΦ┤óσ»îπÇüσüÑσ║╖πÇüτ¥íτ£áΣ╕ÄΣ╕ôµ│¿σî║∩╝îσê╢σ«Üµá╕σ┐âτ⌐║Θù┤τÜäµôìΣ╜£ΦºäΦîâπÇé",
          "µÅÉΣ╛¢σà¿σ╣┤Φ░âµò┤µùÑσÄå∩╝îµÿÄτí«Σ╜òµù╢σîûτà₧πÇüσé¼µù║Σ╕Äτ╗┤µèñπÇé",
          "ΘÖäΣ╕èτ▓╛ΘÇëσîûτà₧Σ╕Äσé¼µù║τë⌐µûÖµ╕àσìò∩╝îσÉ½σÅ»Σ┐íτÜäΘçæσ▒₧πÇüµÖ╢τƒ│πÇüµ░┤µÖ»Σ╕ÄσîáΣ║║Φ╡äµ║ÉπÇé"
        ],
        "ideal": "ΘÇéσÉêσ╕îµ£¢Φ«⌐σ«╢σ║¡µ┤╗σè¢πÇüσà│τ│╗σÆîΦ┤óσèíσÉîµ¡ÑµÅÉσìçτÜäσ▒àΦÇàπÇé",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Σ╕ôΣ╕Üµ╡üτ¿ï",
            "dividerSubtitle": "Σ╕║Σ╜òΘ½ÿτ½»σ«╢σ║¡µîçσ«Üµ¡ñµ£ìσèí",
            "title": "Φ»üµì«σîûτÜäΘúÄµ░┤σ╖ÑΣ╜£µ│ò",
            "imageLabel": "σïÿµƒÑµ╡üτ¿ï",
            "body": "Σ╗ÄΦ╡äµûÖΦÆÉΘ¢åσê░σ«₧µû╜Φ╛àσ»╝∩╝îσà¿τ¿ïτòÖτùò∩╝îΦ«⌐Σ╜áµ╕àµÑÜτƒÑΘüôµ»ÅΣ╕¬σ╗║Φ««τÜäΣ╛¥µì«πÇé",
            "points": [
              "σ«íσëìΦ╡äµûÖσ║ôσîàσÉ½Θù«σì╖πÇüσ╣│Θ¥óσ¢╛πÇüτ╜ùτ¢ÿτàºΣ╕ÄµêÉσæÿΦ╡äµûÖπÇé",
              "τ╗ôσÉêτÄ░σ£║Σ╕êΘçÅπÇüΦê¬µïìσ╜▒σâÅΣ╕ÄΘú₧µÿƒµ¿íµïƒτí«Φ«ñµ»ÅΣ╕¬ΦÉ╜τé╣πÇé",
              "Σ╕ëσìüσñ⌐Θí╛Θù«ΘÜÅΦíî∩╝îΦ┐╜Φ╕¬σîûτà₧µòêµ₧£πÇüΦºúτ¡öτûæΘù«σ╣╢Φ░âµò┤τöƒµ┤╗Σ╣áµâ»πÇé"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "µêÉµòêΘ¬îΦ»ü",
            "dividerSubtitle": "σ«óµê╖σà▒σÉîτÜäµîçµáç",
            "title": "σüÑσ║╖πâ╗Φ┤óµ░öπâ╗σÆîΦ░ÉσÉîµ¡Ñ",
            "imageLabel": "σ«╢σ║¡µêÉµ₧£",
            "body": "σñÜµò░σ«╢σ║¡σ£¿µò░µ£êσåàµÿÄµÿ╛µäƒσÅùσê░µâàτ╗¬τ¿│σ«ÜπÇüµö╢σàÑτ¿│σ«ÜΣ╕Äσ«╢σ║¡µ░¢σ¢┤σìçτ║ºπÇé",
            "points": [
              "σìºσ«ñΣ╝ÿσîûσ¢¢σìüΣ║öσñ⌐σÉÄ∩╝îτ¥íτ£áσôüΦ┤¿Σ╕Äσàìτû½τè╢µÇüµÿ╛ΦæùµÅÉσìçπÇé",
              "σ¡ªΣ╣áΣ╕ÄΣ║ïΣ╕Üσî║σ»╣Σ╜ìσÉëµû╣∩╝îσ¡⌐σ¡ÉΣ╕ÄσñºΣ║║Σ╕ôµ│¿σè¢µÿÄµÿ╛µÅÉΘ½ÿπÇé",
              "Φ┤óσ»îΣ╜ìσé¼µù║σÉÄ∩╝îσ¢₧µ¼╛σæ¿µ£ƒτ╝⌐τƒ¡∩╝îσé¿Φôäµ»öτÄçΣ╕èσìçπÇé"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "σìçτ║ºΣ╜áτÜäσ▒àσ«╢Φâ╜σ£║",
          "dividerSubtitle": "µ»Åµ£êΘÖÉΘçÅσ«₧σ£░µíúµ£ƒ",
          "title": "Θóäτ║ªσ«àΦ┐ÉΦ»äΣ╝░",
          "message": "µÅÉΣ║ñσ╣│Θ¥óσ¢╛πÇüτ╜ùτ¢ÿΦ╡äµûÖΣ╕Äσ«╢σ║¡µêÉσæÿΣ┐íµü»∩╝îµêæΣ╗¼σ░åΘöüσ«Üσïÿσ»ƒµùÑµ£ƒσ╣╢σçåσñçΣ╕ôσ▒₧µèÑσæèπÇé",
          "primaryLabel": "Θóäτ║ªσ«àΦ┐ÉΦ»èµû¡",
          "primaryHref": "/contact",
          "secondaryLabel": "µƒÑτ£ïµêÉσèƒµíêΣ╛ï",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "σ«àΦ┐ÉµâàµèÑτ½Ö",
        "newsletterSubtitle": "σ¡úΦèéσ╕âσ▒ÇµÅÉτñ║πÇüµÉ¼Φ┐üσÉëµù╢Σ╕Äτ£ƒσ«₧µíêΣ╛ïσì│µù╢ΘÇüΦ╛╛πÇé"
      }
    }
  ),

  celestialService('/services/fengshui/office-power-alignment',
    {
      "EN": {
        "badge": "Feng Shui Assessment",
        "title": "Office Power Alignment",
        "intro": "Engineer relentless revenue floors and cultural clarity by weaponising your workspace with high-precision Feng Shui and Qi Men gating.",
        "overviewHeading": "Inside the Programme",
        "overviewSubtitle": "Structure every floor for performance and cohesion",
        "overviewTitle": "Performance Floor Masterplan",
        "imageLabel": "Boardroom Energy Grid",
        "bullets": [
          "Executive war-room placement calibrated to leadership authority and decision velocity sectors.",
          "Revenue, marketing and innovation pods sequenced to time gates that amplify pipeline flow.",
          "Recruitment, onboarding and retention rituals embedded into spatial choreography.",
          "Annual retuning and renovation governance blueprint to protect momentum during change."
        ],
        "ideal": "Designed for scaling companies, venture teams and funds that demand spatial advantage on demand.",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Professional Methodology",
            "dividerSubtitle": "How the audit is governed",
            "title": "Corporate-Grade Delivery",
            "imageLabel": "Corporate Audit Playbook",
            "body": "We run the engagement like a capital project, scoped, benchmarked and documented for stakeholders.",
            "points": [
              "Stakeholder discovery with leadership, HR, facilities and brand guardians to set measurable objectives.",
              "Digital twin modelling overlaying Flying Star charts, Qi Men time gates and traffic studies.",
              "Implementation playbooks for contractors, designers and operations teams with compliance checklists."
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "Performance Outcomes",
            "dividerSubtitle": "KPIs clients attribute to the programme",
            "title": "Revenue Resilience and Team Cohesion",
            "imageLabel": "Corporate Wins",
            "body": "Leadership teams report tighter rhythms, faster deal flow and healthier morale within one quarter.",
            "points": [
              "Quarterly revenue volatility narrows as sales pods operate within activated sectors.",
              "Talent retention improves as seating and mentoring hubs align with supportive palaces.",
              "Cross-functional collaboration scores climb thanks to recalibrated meeting and breakout rooms."
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Claim Your Power Floor",
          "dividerSubtitle": "Corporate audits scheduled on a priority queue",
          "title": "Book an Office Alignment Briefing",
          "message": "Send your floor plans, growth targets and change roadmap so we can scope the engagement and reserve your slot.",
          "primaryLabel": "Schedule Alignment Call",
          "primaryHref": "/contact",
          "secondaryLabel": "Download Corporate Deck",
          "secondaryHref": "/resources/feng-shui"
        },
        "newsletterTitle": "Prosperous Floor Pulse",
        "newsletterSubtitle": "Launch windows, redesign checklists and boardroom rituals proven to lift KPIs."
      },
      "CN": {
        "badge": "ΘúÄµ░┤Φ»äΣ╝░",
        "title": "µ¥âσè┐σè₧σà¼µá╝σ▒Ç",
        "intro": "Σ╗ÑΘ½ÿτ▓╛σ║ªΘúÄµ░┤Σ╕ÄσÑçΘù¿µù╢Θù¿µ¡ªΦúàσè₧σà¼τ⌐║Θù┤∩╝îµëôΘÇáΣ╕ìµÄëτ║┐τÜäΦÉÑµö╢σ║òτ¢ÿΣ╕ÄΣ╝üΣ╕ÜµûçσîûπÇé",
        "overviewHeading": "Θí╣τ¢«Σ║«τé╣",
        "overviewSubtitle": "Σ╕║µ»Åσ▒éµÑ╝µ│¿σàÑµêÿµûùσè¢",
        "overviewTitle": "τ╗⌐µòêµÑ╝σ▒éµÇ╗Φô¥σ¢╛",
        "imageLabel": "Σ╝üΣ╕ÜΦâ╜ΘçÅτ╜æµá╝",
        "bullets": [
          "σ░åσå│τ¡ûµá╕σ┐âσ╕âτ╜«Σ║Äµ¥âσè¢µù║Σ╜ì∩╝îσ╝║σîûσå│τ¡ûΘÇƒσ║ªΣ╕ÄµëºΦíîσ«Üσè¢πÇé",
          "ΘöÇσö«πÇüσ╕éσ£║Σ╕Äσê¢µû░σ¢óΘÿƒµîëτàºµù╢Θù¿ΦèéσÑÅµÄÆσà╡σ╕âΘÿ╡∩╝îµÅÉσìçτ«íτ║┐µ╡üΘÇƒπÇé",
          "µèèµï¢σïƒπÇüσÉ»τö¿Σ╕ÄτòÖµëìΣ╗¬σ╝ÅΦ₧ìσàÑτ⌐║Θù┤σè¿τ║┐∩╝îΦ«⌐µûçσîûΦç¬τä╢σ▒òσ╝ÇπÇé",
          "µÅÉΣ╛¢σ╣┤σ║ªΦ░âΘóæΣ╕ÄΦúàΣ┐«µ▓╗τÉåσçåσêÖ∩╝îτí«Σ┐¥σè¿σ╖Ñµ£ƒΘù┤Σ╕ìσñ▒µÄºπÇé"
        ],
        "ideal": "ΘÇéσÉêΘ½ÿΘÇƒµêÉΘò┐τÜäΣ╝üΣ╕ÜπÇüµèòΦ╡äσ¢óΘÿƒΣ╕Äσƒ║Θçæ∩╝îΦ┐╜µ▒éτ⌐║Θù┤σì│µêÿσè¢πÇé",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Σ╕ôΣ╕Üµû╣µ│òΦ«║",
            "dividerSubtitle": "Θí╣τ¢«σªéΣ╜òµÄºτ«í",
            "title": "Σ╝üΣ╕Üτ║ºΣ║ñΣ╗ÿµ╡üτ¿ï",
            "imageLabel": "Σ╝üΣ╕Üσ«íµƒÑµëïσåî",
            "body": "Σ╗ÑΦ╡äµ£¼Θí╣τ¢«τÜäΣ╕ÑΦ░¿σ║ªµëºΦíî∩╝îΣ╗ÄΦ«┐Φ░êπÇüσ╗║µ¿íσê░ΦÉ╜σ£░Θâ╜µ£ëΦ«░σ╜òσÅ»σ╛¬πÇé",
            "points": [
              "Σ╕ÄΘ½ÿσ▒éπÇüHRπÇüµÇ╗σèíΣ╕ÄσôüτëîΘâ¿Θù¿µ╖▒σ║ªΦ«┐Φ░ê∩╝îτí«Φ«ñσÅ»ΘçÅσîûτ¢«µáçπÇé",
              "σ╗║τ½ïµò░Σ╜ìσÅîτöƒµ¿íσ₧ï∩╝îσÅáσèáΘú₧µÿƒπÇüσÑçΘù¿µù╢Θù¿Σ╕ÄΣ║║µ╡üτâ¡σî║πÇé",
              "µÅÉΣ╛¢µû╜σ╖ÑΣ╕ÄΦ┐ÉΦÉÑσ¢óΘÿƒτÜäµëºΦíîµëïσåîΣ╕Äτ¿╜µá╕µ╕àσìòπÇé"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "µêÉµòêµîçµáç",
            "dividerSubtitle": "σ«óµê╖σ«₧ΘÖàσÅìΘªê",
            "title": "ΦÉÑµö╢ΘƒºµÇºπâ╗σ¢óΘÿƒΘ╗Åτ¥Ç",
            "imageLabel": "Σ╝üΣ╕ÜµêÉµ₧£",
            "body": "σ»╝σàÑσÉÄΣ╕ÇΣ╕¬σ¡úσ║ªσåàσì│σÅ»τ£ïσê░Σ╕Üτ╗⌐τ¿│σ«ÜπÇüσìÅΣ╜£Θí║τòàΣ╕Äσú½µ░öµÅÉσìçπÇé",
            "points": [
              "ΘöÇσö«τ«íτ║┐τ¿│σ«ÜΣ╕èµë¼∩╝îσ¡úσ║ªµ│óσè¿µÿÄµÿ╛µö╢τ¬äπÇé",
              "σ║ºΣ╜ìΣ╕Äσ»╝σ╕êΘàìτ╜«σ»╣Σ╜ìσÉëµû╣∩╝îσà│Θö«Σ║║µëìτòÖΣ╗╗τÄçµÅÉσìçπÇé",
              "Σ╝ÜΦ««Σ╕ÄσìÅΣ╜£τ⌐║Θù┤Σ╝ÿσîûσÉÄ∩╝îΦ╖¿Θâ¿Θù¿σÉêΣ╜£Φ»äσêåµîüτ╗¡Φ╡░Θ½ÿπÇé"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "µÄîµÄºµ¥âσè┐µÑ╝σ▒é",
          "dividerSubtitle": "Σ╝üΣ╕ÜΘí╛Θù«µÄÆτ¿ïΣ╝ÿσàêσê╢",
          "title": "Θóäτ║ªσè₧σà¼Φâ╜ΘçÅτ«ÇµèÑ",
          "message": "µÅÉΣ╛¢σ╣│Θ¥óσ¢╛πÇüµêÉΘò┐τ¢«µáçΣ╕ÄσÅÿΘ¥⌐Φ«íσêÆ∩╝îµêæΣ╗¼σ░åΘóäτòÖµíúµ£ƒσ╣╢µïƒσ«ÜΣ╕ôµíêΦîâσ¢┤πÇé",
          "primaryLabel": "Θóäτ║ªσ»╣µÄÑ",
          "primaryHref": "/contact",
          "secondaryLabel": "Σ╕ïΦ╜╜Σ╝üΣ╕Üµû╣µíê",
          "secondaryHref": "/resources/feng-shui"
        },
        "newsletterTitle": "µù║σ£║ΦèéσÑÅσ┐½Φ«»",
        "newsletterSubtitle": "σÉ»σè¿σÉëµù╢πÇüτ⌐║Θù┤µö╣ΘÇáΣ╕ÄΦæúΣ║ïΣ╝ÜΦ««τ¿ïΣ╗¬σ╝Åσì│µù╢ΘÇüΦ╛╛πÇé"
      }
    }
  ),

  celestialService('/services/fengshui/dragon-vein-oracle',
    {
      "EN": {
        "badge": "Feng Shui Assessment",
        "title": "Dragon Vein Oracle",
        "intro": "Secure land parcels that breathe longevity by tracing dragon veins, protective ridges and water mouths before any ground is broken.",
        "overviewHeading": "Inside the Expedition",
        "overviewSubtitle": "Reading the land before the first pile",
        "overviewTitle": "Dragon Vein Field Report",
        "imageLabel": "Landform Intelligence Map",
        "bullets": [
          "Macro landform reconnaissance using drone, satellite and classical compass diagnostics for every candidate site.",
          "Geomantic scoring matrix ranking prosperity, wellness, protection and legacy potential by parcel.",
          "Gateway, water architecture and access road schematics tuned to capture and retain qi.",
          "Due diligence binder covering soil notes, compliance alerts and long-term maintenance rituals."
        ],
        "ideal": "Essential for developers, resorts and multigenerational estates demanding geomantic precision before acquisition.",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Survey Methodology",
            "dividerSubtitle": "How each expedition is governed",
            "title": "Field Intelligence Playbook",
            "imageLabel": "Survey Protocol",
            "body": "We blend classical geomancy, geospatial technology and feasibility analysis to produce defensible recommendations.",
            "points": [
              "Pre-expedition scoping with planners, legal advisors and environmental consultants to align intent and constraints.",
              "Multi-day fieldwork mapping mountain-water interactions, wind corridors and environmental stress zones.",
              "Comparative reporting with diagrams, video logs and investment recommendations ready for boardrooms."
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "Investment Outcomes",
            "dividerSubtitle": "Results clients experience",
            "title": "Longevity, Protection, Prestige",
            "imageLabel": "Landform Wins",
            "body": "Expect smoother approvals, favourable financing and proud community reception when the land plan follows the dragon vein.",
            "points": [
              "Flagship developments enjoy sustained footfall and premium pricing thanks to supportive topography.",
              "Estate families experience steadier health and relationship harmony when homes sit on balanced veins.",
              "Maintenance budgets decline as water management and qi retention strategies are baked into infrastructure."
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Lock In Your Land Divination",
          "dividerSubtitle": "Limited field expeditions each season",
          "title": "Request a Dragon Vein Expedition",
          "message": "Share coordinates, topographic data and development vision so we can scope the reconnaissance team and timeline.",
          "primaryLabel": "Plan My Expedition",
          "primaryHref": "/contact",
          "secondaryLabel": "See Landform Wins",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "Landform Intelligence Alerts",
        "newsletterSubtitle": "Terrain case studies, acquisition timing cues and qi stewardship strategies."
      },
      "CN": {
        "badge": "ΘúÄµ░┤Φ»äΣ╝░",
        "title": "Θ╛ÖΦäëσ£úσ¢╛",
        "intro": "σ£¿σ╝Çσ╖ÑΣ╣ïσëìΦ┐╜Φ╕¬Θ╛ÖΦäëπÇüµèñτáéΣ╕Äµ░┤σÅú∩╝îΣ╕║σìâτºïσƒ║Σ╕ÜµîæΘÇëΦâ╜ΘçÅµù║σ£░πÇé",
        "overviewHeading": "σïÿσ»ƒΣ║«τé╣",
        "overviewSubtitle": "σè¿σ£ƒσëìσàêΦ»╗σ£░",
        "overviewTitle": "Θ╛ÖΦäëσ«₧σïÿµèÑσæè",
        "imageLabel": "σ£░σ╜óµâàµèÑσ¢╛",
        "bullets": [
          "τ╗ôσÉêΦê¬µïìπÇüσì½µÿƒΣ╕Äτ╜ùτ¢ÿ∩╝îΘÇÉΣ╕Çσ╖íµúÇσÇÖΘÇëσƒ║σ£░τÜäσ▒▒µ░┤µá╝σ▒ÇπÇé",
          "σ╗║τ½ïσÉëσç╢Φ»äσêåτƒ⌐Θÿ╡∩╝îΘçÅσîûΦ┤óσ»îπÇüσüÑσ║╖πÇüσ«ëσà¿Σ╕ÄΣ╝áµë┐µ╜£σè¢πÇé",
          "ΦºäσêÆσç║σàÑσÅúπÇüµ░┤µÖ»Σ╕ÄΘüôΦ╖»∩╝îΦ«⌐µ░öµ╡üΘí║σê⌐ΦüÜσÉêσ╣╢Θò┐Σ╣àτ╗┤µîüπÇé",
          "ΘÖäΣ╕èσ£ƒΦ┤¿πÇüµ│òΦºäΣ╕ÄΘò┐µ£ƒσà╗µ░öτ╗┤µèñτÜäσ«îµò┤σñçσ┐ÿσ╜òπÇé"
        ],
        "ideal": "ΘÇéσÉêσ╝ÇσÅæσòåπÇüσ║ªσüçµ¥æΣ╕ÄσñÜΣ╕ûΣ╗úσ«╢µùÅ∩╝îσ£¿Φ┤¡σ£░σëìσàêΘöüσ«Üµ£Çσà╖τöƒσæ╜σè¢τÜäσ£ƒσ£░πÇé",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "σïÿσ»ƒµû╣µ│ò",
            "dividerSubtitle": "µ»ÅΣ╕Çµ¼íσñûσïñσªéΣ╜òµÄºτ«í",
            "title": "σ£░σ╜óµâàµèÑσ╖ÑΣ╜£µëïσåî",
            "imageLabel": "σïÿµƒÑµ╡üτ¿ï",
            "body": "σ¢óΘÿƒΦ₧ìσÉêτ╗Åσà╕σá¬ΦêåπÇüσ£░τÉåτºæµèÇΣ╕ÄσÅ»ΦíîµÇºσêåµ₧É∩╝îτ╗Öσç║τ╗Åσ╛ùΦ╡╖µúÇΘ¬îτÜäσ╗║Φ««πÇé",
            "points": [
              "σç║ΘÿƒσëìΣ╕ÄΦºäσêÆπÇüµ│òσèíΣ╕ÄτÄ»Φ»äσ¢óΘÿƒσ»╣Θ╜Éτ¢«µáçΣ╕ÄΘÖÉσê╢πÇé",
              "σñÜµùÑσñûσïñµ╡ïτ╗ÿσ▒▒µ░┤Φ╡░σÉæπÇüΘúÄσÅúΣ╕ÄτÄ»σóâσÄïσè¢τé╣πÇé",
              "Σ║ºσç║σ¢╛σâÅπÇüΦºåΘóæΣ╕ÄµèòΦ╡äτ¡ëτ║ºσ╗║Φ««∩╝îτ¢┤µÄÑµÅÉΣ╛¢σå│τ¡ûσ▒éΣ╜┐τö¿πÇé"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "µèòΦ╡äµêÉµ₧£",
            "dividerSubtitle": "σ«óµê╖µÖ«Θüìσ¢₧Θªê",
            "title": "τ¿│σ«Üπâ╗µèñµîüπâ╗ΦìúΦÇÇ",
            "imageLabel": "σ£░σ╜óµêÉµ₧£",
            "body": "Σ╛¥σ£úσ¢╛ΦíîΣ║ïτÜäΘí╣τ¢«σ£¿σ«íµƒÑπÇüΦ₧ìΦ╡äΣ╕Äτñ╛σî║µ▓ƒΘÇÜΣ╕èµ¢┤Θí║τòàπÇé",
            "points": [
              "µùùΦê░Θí╣τ¢«σç¡σÇƒσñ⌐Φ╡Éσ£░σè┐∩╝îσ«óµ╡üτ¿│σ«ÜπÇüµ║óΣ╗╖Φâ╜σè¢σ╝║πÇé",
              "σ«╢µùÅσ«àΘé╕ΦÉ╜σ£¿σÆîΦ░ÉΘ╛ÖΦäëΣ╕è∩╝îµêÉσæÿσüÑσ║╖Σ╕Äσà│τ│╗τ¿│σ«ÜµÅÉσìçπÇé",
              "σ¢áσëìµ£ƒΦºäσêÆµ░┤τ│╗Σ╕Äσà╗µ░öτ¡ûτòÑ∩╝îΘò┐µ£ƒτ╗┤µèñµêÉµ£¼µÿÄµÿ╛ΘÖìΣ╜ÄπÇé"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Θöüσ«ÜΘ╛ÖΦäëσïÿσ»ƒ",
          "dividerSubtitle": "µ»Åσ¡úΘÖÉΘçÅσñûσïñµíúµ£ƒ",
          "title": "τö│Φ»╖Θ╛ÖΦäëΦÇâσ»ƒ",
          "message": "µÅÉΣ╛¢σ£░µ«╡σ¥ÉµáçπÇüσ£░σ╜óΦ╡äµûÖΣ╕Äσ╝ÇσÅæµä┐µÖ»∩╝îµêæΣ╗¼σ░åΦºäσêÆσïÿσ»ƒΦîâσ¢┤Σ╕Äσ¢óΘÿƒπÇé",
          "primaryLabel": "σ«ëµÄÆσ«₧σ£░σïÿµƒÑ",
          "primaryHref": "/contact",
          "secondaryLabel": "µ╡ÅΦºêσ£░σ╜óµíêΣ╛ï",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "σ£░σ╜óµâàµèÑΘÇƒΘÇÆ",
        "newsletterSubtitle": "µÄîµÅíµï⌐σ£░µíêΣ╛ïπÇüΦ┤¡σ£░σñ⌐τ¬ùΣ╕ÄΘò┐µ£ƒσà╗µ░öτºÿΦ»ÇπÇé"
      }
    }
  ),

  celestialService('/services/fengshui/cosmic-cycle-of-fate',
    {
      "EN": {
        "badge": "Feng Shui Layout",
        "title": "Cosmic Cycle of Fate Layout",
        "intro": "Ride every twenty four Solar Term without guesswork by installing seasonal Feng Shui adjustments that keep your property synchronised with moving qi currents.",
        "overviewHeading": "Seasonal Playbook",
        "overviewSubtitle": "What each quarter delivers",
        "overviewTitle": "Solar Term Synchronisation",
        "imageLabel": "Seasonal Strategy Grid",
        "bullets": [
          "Quarterly tuning plans covering wealth, wellbeing, protection and relationship sectors.",
          "Integration with household or office calendars so rituals land effortlessly.",
          "Elemental support kits detailing aromas, colours, nutrition and actions for each season.",
          "Stakeholder briefing notes so family or teams understand the intention behind each shift."
        ],
        "ideal": "Built for families and teams committed to sustaining momentum all year instead of fighting seasonal drag.",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Delivery Framework",
            "dividerSubtitle": "How each quarter is managed",
            "title": "Seasonal Stewardship System",
            "imageLabel": "Seasonal Control Centre",
            "body": "We provide a structured cadenceΓÇöbriefing, implementation, checkpoints and reviewΓÇöso adjustments never feel ad hoc or mystical.",
            "points": [
              "Seasonal briefing highlighting focus themes, rituals and success metrics for the upcoming phase.",
              "Implementation checklists for layout tweaks, supply kits and behavioural prompts.",
              "Mid-season check-in and end-season review with action logs and metric dashboards."
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "Performance Outcomes",
            "dividerSubtitle": "How clients quantify progress",
            "title": "Rhythm, Revenue, Resilience",
            "imageLabel": "Seasonal Wins",
            "body": "Expect smoother energy, fewer health dips and more predictable cashflow as the property stays in phase with the calendar.",
            "points": [
              "Family wellbeing incidents decrease as rest and activity schedules mirror elemental shifts.",
              "Launches and campaigns timed to seasonal qi outperform prior-year benchmarks.",
              "Teams report higher morale and lower burnout thanks to built-in recovery rituals."
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Claim Your Seasonal Edge",
          "dividerSubtitle": "Quarterly retainer seats fill quickly",
          "title": "Subscribe to Cosmic Cycle Stewardship",
          "message": "Share your current layout, annual priorities and available resources so we can craft the seasonal intervention roadmap.",
          "primaryLabel": "Unlock Seasonal Stewardship",
          "primaryHref": "/contact",
          "secondaryLabel": "Preview Seasonal Guide",
          "secondaryHref": "/resources/feng-shui"
        },
        "newsletterTitle": "Seasonal Layout Signals",
        "newsletterSubtitle": "Solar term reminders, ritual checklists and protection alerts delivered before each shift."
      },
      "CN": {
        "badge": "ΘúÄµ░┤σ╕âσ▒Ç",
        "title": "σæ╜Φ┐ÉΦèéσ╛ïσ╕âσ▒Ç",
        "intro": "Θí║τ¥ÇΣ║îσìüσ¢¢Φèéµ░öΦ░âµò┤ΘúÄµ░┤σ╕âσ▒Ç∩╝îΦ«⌐τ⌐║Θù┤Σ╕Äµ░öσ£║σ¢¢σ¡úσÉîΘóæΦÇîΣ╕ìΦó½µïûτ┤»πÇé",
        "overviewHeading": "σ¡úσ║ªµëïσåî",
        "overviewSubtitle": "µ»ÅΣ╕Çσ¡úτÜäσà│Θö«Θâ¿τ╜▓",
        "overviewTitle": "Φèéµ░öσÉîµ¡ÑΦô¥σ¢╛",
        "imageLabel": "Φèéµ░öτ¡ûτòÑσ¢╛",
        "bullets": [
          "µÅÉΣ╛¢Φ┤óσ»îπÇüσüÑσ║╖πÇüΘÿ▓µèñΣ╕Äσà│τ│╗µû╣Σ╜ìτÜäσ¡úΦèéµÇºΦ░âµáíΦ«íσêÆπÇé",
          "Σ╕Äσ«╢σ║¡µêûσ¢óΘÿƒΦíîτ¿ïµò┤σÉê∩╝îΦ«⌐Σ╗¬σ╝ÅΣ╕ÄΦ░âµò┤Φç¬τä╢ΦÉ╜σ£░πÇé",
          "ΘÖäΣ╕èΘªÖµ░¢πÇüΦë▓σ╜⌐πÇüΘÑ«ΘúƒΣ╕ÄΦíîσè¿µîçσìù∩╝îΦ«⌐Σ║öΦíîσ╣│Φííµ£ëµì«σÅ»Σ╛¥πÇé",
          "σçåσñçµ▓ƒΘÇÜµëïσåî∩╝îΦ«⌐µêÉσæÿτÉåΦºúµ»Åµ¼íΦ░âµò┤τÜäµäÅΣ╣ëΣ╕Äµ│¿µäÅΣ║ïΘí╣πÇé"
        ],
        "ideal": "ΘÇéσÉêσà¿σ╣┤Σ┐¥µîüσè¿Φâ╜πÇüΣ╕ìµâ│Φó½σ¡úΦèéµïûµàóτÜäσ«╢σ║¡Σ╕Äσ¢óΘÿƒπÇé",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "ΦÉ╜σ«₧µ£║σê╢",
            "dividerSubtitle": "µ»Åσ¡úσªéΣ╜òµëºΦíî",
            "title": "Φèéσ╛ïσ«êµèñτ│╗τ╗ƒ",
            "imageLabel": "Φèéσ╛ïµÄºσê╢σÅ░",
            "body": "µêæΣ╗¼µÅÉΣ╛¢σ«îµò┤ΦèéσÑÅ∩╝Üσ¡úσëìτ«ÇµèÑπÇüΦÉ╜σ«₧µ╕àσìòπÇüσ╖íµúÇσê░σñìτ¢ÿ∩╝îΦ«⌐Φ░âµò┤Σ╕ìµòúΣ╣▒πÇé",
            "points": [
              "σ¡úσëìΦ»┤µÿÄΣ╝Ü∩╝îΣ║ñΣ╗úµ£¼σ¡úΣ╕╗ΘóÿπÇüΣ╗¬σ╝ÅΣ╕ÄΦííΘçÅµîçµáçπÇé",
              "µëºΦíîµ╕àσìòµ╢╡τ¢ûµæåΦ«╛Φ░âµò┤πÇüτë⌐Φ╡äΘççΦ┤¡Σ╕ÄΦíîΣ╕║µÅÉΘåÆπÇé",
              "σ¡úΣ╕¡σ╖íµúÇΣ╕Äσ¡úµ£½σñìτ¢ÿ∩╝îΘÖäΦíîσè¿µùÑσ┐ùΣ╕ÄµîçµáçΣ╗¬Φí¿µ¥┐πÇé"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "µêÉµ₧£Θ¬îΦ»ü",
            "dividerSubtitle": "σ«óµê╖σ╕╕ΦºüσÅìΘªê",
            "title": "ΦèéσÑÅπâ╗ΦÉÑµö╢πâ╗σñìσÄƒσè¢",
            "imageLabel": "σ¡úΦèéµêÉµ₧£",
            "body": "ΘÜÅτ¥Çτ⌐║Θù┤Σ╕ÄΦèéΣ╗ñσÉîµ¡Ñ∩╝îΦâ╜ΘçÅµ¢┤τ¿│πÇüσüÑσ║╖Φ╡╖Σ╝Åµ¢┤σ░æπÇüτÄ░Θçæµ╡üµ¢┤σÅ»Θóäµ╡ïπÇé",
            "points": [
              "σ«╢σ║¡σüÑσ║╖Σ╕Äµâàτ╗¬µ│óσè¿Σ╕ïΘÖì∩╝îσ¢áΣ╕║Σ╜£µü»ΘàìσÉêΣ║öΦíîΦâ╜ΘçÅπÇé",
              "ΘàìσÉêΦèéµ░öµÄ¿σç║τÜäµ┤╗σè¿Σ╕ÄΘí╣τ¢«∩╝îΦ╛╛µêÉτÄçµÿÄµÿ╛Θ½ÿΣ║Äσ╛Çσ╣┤πÇé",
              "σ¢óΘÿƒσÇªµÇáµäƒΣ╕ïΘÖì∩╝îσ¢áσ«Üµ£ƒσåàσ╗║σñìσÄƒΣ╗¬σ╝ÅπÇé"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "µèóσìáσ¡úΦèéσàêµ£║",
          "dividerSubtitle": "σ¡úσ║ªΘí╛Θù«σÉìΘó¥µ£ëΘÖÉ",
          "title": "Φ«óΘÿàΦèéσ╛ïσ«êµèñΦ«íσêÆ",
          "message": "σæèΦ»ëµêæΣ╗¼τÄ░µ£ëσ╕âσ▒ÇπÇüσ╣┤σ║ªτ¢«µáçΣ╕ÄΦ╡äµ║ÉΘàìτ╜«∩╝îµêæΣ╗¼σ░åΦ«╛Φ«íΦèéµ░öσ╣▓ΘóäΦ╖»τ║┐πÇé",
          "primaryLabel": "σÉ»σè¿σ¡úσ║ªσ«êµèñ",
          "primaryHref": "/contact",
          "secondaryLabel": "ΘóäΦºêΦèéµ░öµîçσìù",
          "secondaryHref": "/resources/feng-shui"
        },
        "newsletterTitle": "Φèéµ░öµâàµèÑ",
        "newsletterSubtitle": "σì│µù╢µÄîµÅíΦèéµ░öµÅÉΘåÆπÇüΣ╗¬σ╝Åµ╕àσìòΣ╕ÄΘÿ▓µèñΘóäΦ¡ªπÇé"
      }
    }
  ),

  celestialService('/services/fengshui/celestial-star-matrix',
    {
      "EN": {
        "badge": "Feng Shui Layout",
        "title": "Celestial Star Matrix Design",
        "intro": "Translate Flying Star charts into interior design that feels luxurious and performs like a precision instrument.",
        "overviewHeading": "Design Intelligence",
        "overviewSubtitle": "Where aesthetics meets measurable qi",
        "overviewTitle": "Flying Star Interior Playbook",
        "imageLabel": "Interior Energy Matrix",
        "bullets": [
          "Sector diagnostics with recommendations for layout, traffic flow and functional zoning.",
          "Lighting, colour and material palettes tuned to annual, monthly and daily star dynamics.",
          "Detailed handover packs for designers, contractors and stylists with measurements and specifications.",
          "Quality assurance visits or video audits prior to handover to ensure compliance."
        ],
        "ideal": "Ideal for renovations, new builds and show units requiring beauty with measurable energetic performance.",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Design Workflow",
            "dividerSubtitle": "How we collaborate with your creative team",
            "title": "Co-Creation Delivery",
            "imageLabel": "Design Studio Workflow",
            "body": "We slot into your architect and interior ecosystem, providing metaphysical guardrails without stifling creativity.",
            "points": [
              "Kick-off workshops aligning vision, user journeys and energetic objectives.",
              "Iterative design reviews overlaying star charts onto plans until aesthetics and qi align.",
              "Installation supervision plus punch-list adjustments before client reveal."
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "Performance Outcomes",
            "dividerSubtitle": "What owners and designers observe",
            "title": "Awards, Sales, Wellbeing",
            "imageLabel": "Design Impact",
            "body": "Projects win design praise, sell faster and feel calmer because every detail echoes the star matrix.",
            "points": [
              "Show units and luxury residences achieve faster sell-through and premium pricing.",
              "Occupants report improved focus, sleep and creative flow as sectors support key life roles.",
              "Design approvals accelerate because energetic rationale is documented for stakeholders."
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Design with Celestial Precision",
          "dividerSubtitle": "Concept slots limited each quarter",
          "title": "Commission a Star Matrix Design",
          "message": "Share your architectural package, timelines and brand positioning so we can co-create the design roadmap.",
          "primaryLabel": "Start My Design Brief",
          "primaryHref": "/contact",
          "secondaryLabel": "See Design Outcomes",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "Matrix Design Notes",
        "newsletterSubtitle": "Star trend reports, palette inspirations and implementation tips for design teams."
      },
      "CN": {
        "badge": "ΘúÄµ░┤σ╕âσ▒Ç",
        "title": "Θú₧µÿƒτƒ⌐Θÿ╡Φ«╛Φ«í",
        "intro": "µèèΘú₧µÿƒτ¢ÿσîûµêÉσà╝σà╖σÑóσìÄτ╛ÄµäƒΣ╕Äτ▓╛σçåΦâ╜ΘçÅΦí¿τÄ░τÜäσ«ñσåàΦ«╛Φ«íπÇé",
        "overviewHeading": "Φ«╛Φ«íµâàµèÑ",
        "overviewSubtitle": "τ╛ÄµäƒΣ╕ÄΦâ╜ΘçÅσÉîµ¡Ñ",
        "overviewTitle": "Θú₧µÿƒσ«ñσåàµö╗τòÑ",
        "imageLabel": "σ«ñσåàΦâ╜ΘçÅτƒ⌐Θÿ╡",
        "bullets": [
          "ΘÇÉσ«½µÅÉΣ╛¢σ╕âσ▒ÇπÇüσè¿τ║┐Σ╕Äµ£║Φâ╜σêåσî║σ╗║Φ««πÇé",
          "τü»σàëπÇüΦë▓σ╜⌐Σ╕Äµ¥ÉΦ┤¿τ╗äσÉêΣ╛¥σ╣┤σ║ªπÇüµ£êσ║ªΣ╣âΦç│µùÑµƒ▒Θú₧µÿƒΦ░âΘàìπÇé",
          "Σ╕║Φ«╛Φ«íσ╕êπÇüµë┐σîàσòåΣ╕ÄΦ╜»Φúàσ¢óΘÿƒσçåσñçσÉ½σ░║σ»╕τÜäµëºΦíîµûçΣ╗╢πÇé",
          "Σ║ñΣ╗ÿσëìσñìµúÇ∩╝êτÄ░σ£║µêûΦ┐£τ¿ï∩╝ë∩╝îτí«Σ┐¥µ»ÅΘí╣τ╗åΦèéτ¼ªσÉêΦâ╜ΘçÅΦªüµ▒éπÇé"
        ],
        "ideal": "ΘÇéσÉêΦúàΣ┐«πÇüµû░σ╗║Σ╕Äµá╖µ¥┐τ⌐║Θù┤∩╝îσ£¿Θó£σÇ╝Σ╕ÄΦâ╜ΘçÅΦí¿τÄ░Σ╣ïΘù┤σÅûσ╛ùσ╣│ΦííπÇé",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "σìÅΣ╜£µ╡üτ¿ï",
            "dividerSubtitle": "σªéΣ╜òΣ╕ÄΦ«╛Φ«íσ¢óΘÿƒσà▒σê¢",
            "title": "σà▒σê¢σ╝ÅΣ║ñΣ╗ÿ",
            "imageLabel": "Φ«╛Φ«íσìÅΣ╜£µ╡üτ¿ï",
            "body": "Σ╕Äσ╗║τ¡æσ╕êπÇüσ«ñσåàσ¢óΘÿƒτ┤ºσ»åσìÅΣ╜£∩╝îσ£¿Σ╕ìσÄïσê╢σê¢µäÅτÜäσëìµÅÉΣ╕ïµÅÉΣ╛¢τÄäσ¡ªµèñµáÅπÇé",
            "points": [
              "σÉ»σè¿σ╖ÑΣ╜£σ¥è∩╝îτ╗ƒΣ╕Çµä┐µÖ»πÇüτö¿µê╖µùàτ¿ïΣ╕ÄΦâ╜ΘçÅτ¢«µáçπÇé",
              "µîëΘÿ╢µ«╡σ«íΘÿàσ¢╛Θ¥ó∩╝îσ░åΘú₧µÿƒσ¢╛σ▒éσÅáσèáΦç│Φ«╛Φ«íµû╣µíêπÇé",
              "µû╜σ╖ÑΣ╕ÄΘÖêΦ«╛Θÿ╢µ«╡µÅÉΣ╛¢τÄ░σ£║µêûΦ┐£τ¿ïτ¢æΘÇáΣ╕Äσ╛«Φ░âπÇé"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "µêÉµ₧£σÅìΘªê",
            "dividerSubtitle": "Σ╕ÜΣ╕╗Σ╕ÄΦ«╛Φ«íσ╕êτÜäΦºéσ»ƒ",
            "title": "σÑûΘí╣πâ╗ΘöÇσö«πâ╗ΦêÆΘÇé",
            "imageLabel": "Φ«╛Φ«íµêÉµ₧£",
            "body": "σ£¿τƒ⌐Θÿ╡µèñΦê¬Σ╕ï∩╝îΣ╜£σôüσà╝σà╖σÑûΘí╣Φ┤¿µäƒπÇüΘöÇσö«ΘÇƒσ║ªΣ╕Äτöƒµ┤╗ΦêÆΘÇéσ║ªπÇé",
            "points": [
              "µá╖µ¥┐µê┐Σ╕ÄΦ▒¬σ«àµ¢┤σ┐½σö«σç║Σ╕öµ║óΣ╗╖µ¢┤Θ½ÿπÇé",
              "σ▒àΣ╜ÅΦÇàσ£¿Σ╕ôµ│¿πÇüτ¥íτ£áΣ╕Äτü╡µäƒΣ╕èµÿÄµÿ╛σÅùτ¢èπÇé",
              "µ£ëσ«îµò┤Φâ╜ΘçÅΦ»┤µÿÄ∩╝îΦ«╛Φ«íµû╣µíêµ¢┤µÿôσÅûσ╛ùσ«íµë╣πÇé"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Σ╗Ñσñ⌐µÿƒτ▓╛σçåΦ«╛Φ«í",
          "dividerSubtitle": "µ»Åσ¡úΘÖÉΘçÅµªéσ┐╡σÉìΘó¥",
          "title": "σºöµëÿΘú₧µÿƒτƒ⌐Θÿ╡Φ«╛Φ«í",
          "message": "µÅÉΣ╛¢σ╗║τ¡æΦ╡äµûÖπÇüµù╢τ¿ïΣ╕Äσôüτëîσ«ÜΣ╜ì∩╝îµêæΣ╗¼σ░åσà▒σê¢Σ╕ôσ▒₧Φ«╛Φ«íΦ╖»τ║┐πÇé",
          "primaryLabel": "σ╝ÇσÉ»Φ«╛Φ«íτ«ÇµèÑ",
          "primaryHref": "/contact",
          "secondaryLabel": "µƒÑτ£ïΦ«╛Φ«íµêÉµ₧£",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "τƒ⌐Θÿ╡Φ«╛Φ«íτ¼öΦ«░",
        "newsletterSubtitle": "Θú₧µÿƒΦ╢ïσè┐πÇüΘàìΦë▓τü╡µäƒΣ╕Äµû╜σ╖ÑΦªüτé╣Σ╕Çµ¼íµÄîµÅíπÇé"
      }
    }
  ),

  celestialService('/services/fengshui/energy-convergence-field',
    {
      "EN": {
        "badge": "Feng Shui Layout",
        "title": "Energy Convergence Field",
        "intro": "Fuse Feng Shui, Qi Men and numerology to craft a signature energetic identity for flagship homes, headquarters or hospitality icons.",
        "overviewHeading": "Signature Identity",
        "overviewSubtitle": "Where space, timing and brand unite",
        "overviewTitle": "Convergence Masterplan",
        "imageLabel": "Signature Energy Blueprint",
        "bullets": [
          "Holistic masterplan layering orientation, formation timing and numeric branding cues.",
          "Launch, onboarding and VIP rituals codified to anchor the field in daily operations.",
          "Audit of signage, pathways, scent and digital touchpoints to maintain convergence.",
          "KPI dashboard aligning experiential goals with energetic metrics for leadership review."
        ],
        "ideal": "Tailored for hotels, retail flagships, clubs and boardrooms that must radiate an unmistakable aura.",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Commission Process",
            "dividerSubtitle": "How we partner from concept to handover",
            "title": "Flagship Project Governance",
            "imageLabel": "Commission Workflow",
            "body": "We work alongside brand, architecture, HR and operations so the energetic identity becomes a living system, not a one-time ritual.",
            "points": [
              "Brand and experience diagnostics aligning story, scent, sound and movement with celestial archetypes.",
              "Iterative convergence labs with cross-functional stakeholders to test rituals and wayfinding.",
              "Training manuals and SOP integration so teams can uphold the field long after launch."
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "Signature Outcomes",
            "dividerSubtitle": "Metrics owners track",
            "title": "Presence, Loyalty, Revenue",
            "imageLabel": "Signature Wins",
            "body": "Spaces feel unforgettable, teams align faster and commercial metrics hold steady because the field anchors every interaction.",
            "points": [
              "Flagship venues record higher dwell time, repeat visitation and premium conversions.",
              "Staff engagement and brand adherence scores climb as rituals embed culture.",
              "Corporate suites report smoother negotiations and strategic clarity within the energy field."
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Anchor Your Signature Field",
          "dividerSubtitle": "Bespoke commissions by application",
          "title": "Begin an Energy Convergence Commission",
          "message": "Outline your property vision, guest journey and success metrics so we can map the convergence roadmap and stakeholders.",
          "primaryLabel": "Submit Commission Brief",
          "primaryHref": "/contact",
          "secondaryLabel": "Explore Iconic Cases",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "Signature Field Signals",
        "newsletterSubtitle": "Launch rituals, staff alignment practices and ambience maintenance notes for flagship spaces."
      },
      "CN": {
        "badge": "ΘúÄµ░┤σ╕âσ▒Ç",
        "title": "Φâ╜σƒƒµ▒çΦüÜσ£║",
        "intro": "Φ₧ìσÉêΘúÄµ░┤πÇüσÑçΘù¿Σ╕Äµò░τÉå∩╝îΣ╕║µùùΦê░Σ╜Åσ«àπÇüµÇ╗Θâ¿µêûΘàÆσ║ùµëôΘÇáΣ╕ìσÅ»σñìσê╢τÜäΦâ╜ΘçÅµáçΦ»åπÇé",
        "overviewHeading": "µáçσ┐ùµ░¢σ¢┤",
        "overviewSubtitle": "τ⌐║Θù┤πâ╗µù╢µ£║πâ╗σôüτëîΣ╕Çµ¼íσê░Σ╜ì",
        "overviewTitle": "µ▒çΦüÜµÇ╗Φô¥σ¢╛",
        "imageLabel": "µáçσ┐ùΦâ╜ΘçÅσ¢╛",
        "bullets": [
          "µò┤σÉêµû╣Σ╜ìπÇüΘÿ╡µ│òµù╢σ║ÅΣ╕Äµò░τÉåσôüτëîτÜäµò┤Σ╜ôΦºäσêÆπÇé",
          "Φ«╛Φ«íσ╝Çσ╣òπÇüσæÿσ╖ÑσÉ»σè¿Σ╕Ä VIP Σ╜ôΘ¬îτÜäµùÑσ╕╕Σ╗¬σ╝ÅπÇé",
          "σà¿Θ¥óµúÇΦºåσè¿τ║┐πÇüµîçτñ║πÇüΘªÖµ░¢Σ╕Äµò░Σ╜ìΦºªτé╣∩╝îΦ«⌐Φâ╜ΘçÅµîüτ╗¡µ▒çΦüÜπÇé",
          "σ╗║τ½ï KPI Σ╗¬Φí¿∩╝îΦ«⌐τ«íτÉåσ▒éΣ╗ÑΦâ╜ΘçÅΣ╕ÄσòåΣ╕ÜσÅîµîçµáçΦ┐╜Φ╕¬πÇé"
        ],
        "ideal": "ΘÇéσÉêΘàÆσ║ùπÇüµùùΦê░Θù¿σ║ùπÇüτºüσ»åΣ╝ÜµëÇΣ╕ÄΦæúΣ║ïΣ╝ÜΦ««Σ╕¡σ┐â∩╝îµëôΘÇáτï¼µ£ëµ░öσ£║πÇé",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "σºöµíêµ╡üτ¿ï",
            "dividerSubtitle": "Σ╗Äµªéσ┐╡σê░Σ║ñµÄÑτÜäσà¿τ¿ïΘÖ¬Σ╝┤",
            "title": "µùùΦê░Σ╕ôµíêµ▓╗τÉå",
            "imageLabel": "σºöµíêµ╡üτ¿ï",
            "body": "Σ╕ÄσôüτëîπÇüσ╗║τ¡æπÇüHR Σ╕ÄΦÉÑΦ┐Éσ¢óΘÿƒσ╣╢Φé⌐σÉêΣ╜£∩╝îΦ«⌐Φâ╜ΘçÅµáçΦ»åµêÉΣ╕║µùÑσ╕╕τ│╗τ╗ƒπÇé",
            "points": [
              "Φºúµ₧ÉσôüτëîµòàΣ║ïπÇüσùàΦºëπÇüσÉ¼ΦºëΣ╕Äσè¿τ║┐∩╝îτí«Σ┐¥Σ╕Äσñ⌐Φ▒í archetype σ»╣Θ╜ÉπÇé",
              "Σ╕╛σè₧Φ╖¿Θâ¿Θù¿σà▒σê¢σ╖ÑΣ╜£σ¥è∩╝îµ╡ïΦ»òΣ╗¬σ╝ÅπÇüσ»╝ΦºåΣ╕ÄΘí╛σ«óµùàτ¿ïπÇé",
              "τ╝ûσåÖσƒ╣Φ«¡µëïσåîΣ╕Ä SOP∩╝îΦ«⌐σ¢óΘÿƒσ£¿σ╝Çσ╣òσÉÄΣ╣ƒΦâ╜τ╗┤µèñΦâ╜σ£║πÇé"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "µêÉµòêΘ¬îΦ»ü",
            "dividerSubtitle": "Σ╕ÜΣ╕╗µîüτ╗¡Φ┐╜Φ╕¬τÜäµîçµáç",
            "title": "σ¡ÿσ£¿µäƒπâ╗σ┐áΦ»Üσ║ªπâ╗µö╢τ¢è",
            "imageLabel": "µáçσ┐ùµêÉµ₧£",
            "body": "τ⌐║Θù┤Σ╗ñΣ║║ΘÜ╛σ┐ÿπÇüσ¢óΘÿƒΣ╗╖σÇ╝Φºéµ¢┤Σ╕ÇΦç┤∩╝îσòåΣ╕ÜµîçµáçΣ╣ƒΘÜÅΣ╣ïτ¿│σüÑπÇé",
            "points": [
              "µùùΦê░σ£║µëÇτÜäσü£τòÖµù╢Θù┤πÇüσ¢₧Φ«┐τÄçΣ╕ÄΘ½ÿΣ╗╖Φ╜¼σîûµÿ╛ΦæùµÅÉσìçπÇé",
              "Σ╗¬σ╝ÅΦ₧ìσàÑµûçσîûσÉÄ∩╝îσæÿσ╖ÑσÅéΣ╕ÄµäƒΣ╕ÄσôüτëîΘü╡σ╛¬σ║ªµîüτ╗¡Φ╡░Θ½ÿπÇé",
              "Σ╝üΣ╕ÜΣ╝Üσ«óσî║σ£¿Φâ╜σ£║µèñµîüΣ╕ï∩╝îΦ░êσêñΣ╕Äτ¡ûτòÑµ▓ƒΘÇÜµ¢┤Θí║τòàπÇé"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "ΘöÜσ«ÜΣ╕ôσ▒₧Φâ╜σ£║",
          "dividerSubtitle": "ΘçÅΦ║½σ«Üσê╢Θççτö│Φ»╖σê╢",
          "title": "σÉ»σè¿Φâ╜σƒƒµ▒çΦüÜσºöµíê",
          "message": "Φ»┤µÿÄτë⌐Σ╕Üµä┐µÖ»πÇüσÿëσ«╛µùàτ¿ïΣ╕ÄµêÉσèƒµîçµáç∩╝îµêæΣ╗¼σ░åΦºäσêÆµ▒çΦüÜΦ╖»τ║┐Σ╕Äσà│Θö«σÅéΣ╕ÄΦÇàπÇé",
          "primaryLabel": "µÅÉΣ║ñσºöµíêτ«ÇµèÑ",
          "primaryHref": "/contact",
          "secondaryLabel": "µ╡ÅΦºêµáçσ┐ùµíêΣ╛ï",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "Φâ╜σ£║µâàµèÑ",
        "newsletterSubtitle": "µÄîµÅíσÉ»σè¿Σ╗¬σ╝ÅπÇüσ¢óΘÿƒσ»╣Θ╜ÉΣ╕Äµ░¢σ¢┤τ╗┤µèñτÜäµû╣µ│òπÇé"
      }
    }
  ),

  celestialService('/services/magnetic-matrix/i-ching-energy-matrix',
    {
      "EN": {
        "badge": "Magnetic Matrix",
        "title": "I-Ching Energy Matrix",
        "intro": "Turn volatile decisions into measured breakthroughs with I-Ching hexagram intelligence integrated into your strategy dashboard.",
        "overviewHeading": "Hexagram Intelligence",
        "overviewSubtitle": "How guidance becomes execution",
        "overviewTitle": "Strategic Hexagram Playbook",
        "imageLabel": "Hexagram Dashboard",
        "bullets": [
          "Primary and relating hexagrams decoded into scenario storyboards and leadership cues.",
          "Action plays for talent moves, partnerships and crisis pivots anchored to changing lines.",
          "Decision calendar aligning upcoming choices with favourable hexagram phases.",
          "Executive briefing sheets with rituals, communication angles and accountability prompts."
        ],
        "ideal": "A must-have for founders, chiefs-of-staff and strategists driving multi-threaded initiatives.",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Analytical Approach",
            "dividerSubtitle": "How each reading stays rigorous",
            "title": "Data-Backed Divination",
            "imageLabel": "Hexagram Lab",
            "body": "We triangulate classical texts, modern analytics and stakeholder interviews so the matrix feels precise and actionable.",
            "points": [
              "Multi-method casting to confirm the dominant hexagram narrative before prescribing moves.",
              "Integration with BaZi and Zi Wei profiles to ensure personal resonance and timing alignment.",
              "Encrypted delivery workspace with searchable transcripts, diagrams and action trackers."
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "Strategic Outcomes",
            "dividerSubtitle": "What teams experience",
            "title": "Clarity, Confidence, Control",
            "imageLabel": "Decision Wins",
            "body": "Leaders report faster decision cycles, fewer reversals and calmer teams when the I-Ching matrix guides the agenda.",
            "points": [
              "Key approvals land sooner because stakeholders see logical and energetic justification side by side.",
              "Talent deployment improves as compatibility and timing cues prevent misaligned hires.",
              "Crisis pivots become measured rather than reactive thanks to contingency hexagrams."
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Install Your Hexagram Matrix",
          "dividerSubtitle": "Strategy retainers filled by screening",
          "title": "Book an I-Ching Advisory Session",
          "message": "Share your decision horizon and team structure so we can architect the hexagram intelligence cadence.",
          "primaryLabel": "Secure Advisory Window",
          "primaryHref": "/contact",
          "secondaryLabel": "Download Matrix Outline",
          "secondaryHref": "/resources/magnetic-matrix"
        },
        "newsletterTitle": "Hexagram Signals",
        "newsletterSubtitle": "Changing-line alerts, decision rituals and leadership prompts before each critical window."
      },
      "CN": {
        "badge": "τúüσ£║τƒ⌐Θÿ╡",
        "title": "µÿôτ╗ÅΦâ╜ΘçÅτƒ⌐Θÿ╡",
        "intro": "Φ«⌐σà│Θö«µèëµï⌐σîûΣ╕║σÅ»µÄºτ¬üτá┤∩╝îµèèµÿôτ╗ÅσìªΦ▒íµÖ║µàºµñìσàÑΣ╜áτÜäµêÿτòÑΣ╗¬Φí¿πÇé",
        "overviewHeading": "σìªΦ▒íµâàµèÑ",
        "overviewSubtitle": "Σ╗ÄσÉ»τñ║σê░µëºΦíî",
        "overviewTitle": "µêÿτòÑσìªΦ▒íµëïσåî",
        "imageLabel": "σìªΦ▒íΣ╗¬Φí¿µ¥┐",
        "bullets": [
          "Φºúµ₧Éµ£¼σìªΣ╕ÄΣ║Æσìª∩╝îΦ╜¼σîûΣ╕║µâàσóâσëºµ£¼Σ╕ÄΘóåσ»╝µîçΣ╗ñπÇé",
          "Σ╛¥µì«σè¿τê╗σê╢σ«Üτö¿Σ║║πÇüσÉêΣ╜£Σ╕Äσì▒µ£║Φ╜¼σÉæτÜäΦíîσè¿µû╣µíêπÇé",
          "σ╗║τ½ïσå│τ¡ûΦíîΣ║ïσÄå∩╝îΦ«⌐ΘçìσñºΘÇëµï⌐Φ╕⌐σ£¿µ£ëσê⌐σìªΦ┐ÉΣ╕èπÇé",
          "ΘÖäΣ╕èΣ╗¬σ╝ÅπÇüµ▓ƒΘÇÜΣ╕ÄΦ┤úΣ╗╗σêåΘàìΦí¿∩╝îτí«Σ┐¥µëºΦíîσê░Σ╜ìπÇé"
        ],
        "ideal": "ΘÇéσÉêµÄ¿Φ┐¢σñÜτ║┐Φ«íσêÆτÜäσê¢σè₧Σ║║πÇüσ╣òσâÜΘò┐Σ╕Äτ¡ûτòÑΦ┤ƒΦ┤úΣ║║πÇé",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "σêåµ₧Éµû╣µ│ò",
            "dividerSubtitle": "σªéΣ╜òτí«Σ┐¥τ▓╛σçå",
            "title": "µò░µì«σîûσìªΦ▒íσêåµ₧É",
            "imageLabel": "σìªΦ▒íσ«₧Θ¬îσ«ñ",
            "body": "τ╗ôσÉêτ╗Åσà╕µûçτî«πÇüτÄ░Σ╗úµò░µì«Σ╕Äσ¢óΘÿƒΦ«┐Φ░ê∩╝îΦ«⌐τƒ⌐Θÿ╡µùóτ▓╛σçåσÅêσÅ»µëºΦíîπÇé",
            "points": [
              "σñÜΘçìσìáτ«ùτí«Φ«ñΣ╕╗Φ╜┤∩╝îσåìµÅÉσç║σ╗║Φ««∩╝îΘü┐σàìσüÅΦ»»πÇé",
              "Σ╕Äσà½σ¡ùπÇüτ┤½σ╛«µíúµíêΣ║ñσÅëΘ¬îΦ»ü∩╝îτí«Σ┐¥Σ║║Σ║ïΣ╕Äµù╢µ£║σÉîΘóæπÇé",
              "µÅÉΣ╛¢σèáσ»åσ╣│σÅ░∩╝îσ¡ÿµö╛ΘÇÉσ¡ùτ¿┐πÇüσ¢╛σâÅΣ╕ÄΣ╗╗σèíΦ┐╜Φ╕¬Φí¿πÇé"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "µêÿτòÑµêÉµ₧£",
            "dividerSubtitle": "σ¢óΘÿƒσ«₧ΘÖàµäƒσÅù",
            "title": "µ╕àµÖ░πâ╗Σ┐íσ┐âπâ╗µÄîµÄº",
            "imageLabel": "σå│τ¡ûµêÉµ₧£",
            "body": "σ»╝σàÑσÉÄ∩╝îσå│τ¡ûµ¢┤σ┐½σ«ÜµíêπÇüσÅìσñìµ¢┤σ░æ∩╝îσ¢óΘÿƒµâàτ╗¬µ¢┤τ¿│πÇé",
            "points": [
              "σ¢áΣ╕║σà╝Θí╛ΘÇ╗Φ╛æΣ╕ÄΦâ╜ΘçÅ∩╝îσà│Θö«µÅÉµíêµ¢┤σ«╣µÿôσÅûσ╛ùσ«íµë╣πÇé",
              "ΦüîΣ╜ìΣ╕Äτö¿Σ║║σå│σ«Üµ¢┤τ¿│σ«Ü∩╝îΘü┐σàìΣ╕ìσÉêµù╢σ«£τÜäΦüÿΣ╗╗πÇé",
              "σì▒µ£║Φ╜¼σÉæµ£ëΘóäµíê∩╝îΦíîσè¿Σ╕ìσåìΣ╗ôτÜçπÇé"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Θâ¿τ╜▓σìªΦ▒íτƒ⌐Θÿ╡",
          "dividerSubtitle": "τ¡ûτòÑΘí╛Θù«Θ£Çσàêτ¡¢ΘÇëµÄÆτ¿ï",
          "title": "Θóäτ║ªµÿôτ╗ÅΘí╛Θù«Σ╝ÜΦ««",
          "message": "Φ»┤µÿÄσå│τ¡ûσæ¿µ£ƒΣ╕Äσ¢óΘÿƒΘàìτ╜«∩╝îµêæΣ╗¼σ░åΦºäσêÆσìªΦ▒íµâàµèÑΦèéσÑÅπÇé",
          "primaryLabel": "Θöüσ«ÜΘí╛Θù«µù╢µ«╡",
          "primaryHref": "/contact",
          "secondaryLabel": "Σ╕ïΦ╜╜τƒ⌐Θÿ╡µªéΦªü",
          "secondaryHref": "/resources/magnetic-matrix"
        },
        "newsletterTitle": "σìªΦ▒íµâàµèÑ",
        "newsletterSubtitle": "τ¼¼Σ╕Çµù╢Θù┤µÄîµÅíσè¿τê╗µÅÉΘåÆπÇüσå│τ¡ûΣ╗¬σ╝ÅΣ╕ÄΘóåσ»╝µÅÉτñ║πÇé"
      }
    }
  ),

  celestialService('/services/magnetic-matrix/name-destiny-code',
    {
      "EN": {
        "badge": "Magnetic Matrix",
        "title": "Name Destiny Code",
        "intro": "Craft names that amplify destiny by synthesising numerology, BaZi resonance and phonetic magnetism.",
        "overviewHeading": "Naming Intelligence",
        "overviewSubtitle": "Where story, sound and fate align",
        "overviewTitle": "Destiny Naming Playbook",
        "imageLabel": "Name Resonance Map",
        "bullets": [
          "Audit current names to locate energetic leakage, legal friction and pronunciation drag.",
          "Curated shortlists with narrative positioning, phonetic analysis and numeric scoring.",
          "Activation plan covering legal change, launch rituals and communication rollout.",
          "Brand tone, domain and social handle checks to ensure seamless adoption."
        ],
        "ideal": "Ideal for newborns, rebrands, mergers and signature product lines needing instant resonance.",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Naming Methodology",
            "dividerSubtitle": "How we engineer magnetism",
            "title": "Data + Story + Destiny",
            "imageLabel": "Naming Lab",
            "body": "We merge linguistic science, numerology and destiny profiling so your name works legally, commercially and metaphysically.",
            "points": [
              "Stakeholder interviews to define archetype, market positioning and emotional tone.",
              "Phonetic heat-mapping across key languages and dialects to avoid negative connotations.",
              "Numerology alignment with personal or corporate charts including cycle timing recommendations."
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "Performance Outcomes",
            "dividerSubtitle": "What clients notice post-launch",
            "title": "Recognition, Conversion, Loyalty",
            "imageLabel": "Naming Wins",
            "body": "Names crafted through the Destiny Code pull audiences faster, stabilise internal identity and convert more efficiently.",
            "points": [
              "Brand recall and click-through metrics lift as names become easier to pronounce and remember.",
              "Team pride and alignment improve when the name mirrors mission and destiny.",
              "Legal and cross-border adoption smooths out because conflicts and unlucky codes are removed up front."
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Author Your Signature Name",
          "dividerSubtitle": "Naming commissions limited each cycle",
          "title": "Start a Name Destiny Project",
          "message": "Share your objectives, audience and timeline so we can assemble the research cell and delivery schedule.",
          "primaryLabel": "Start Naming Brief",
          "primaryHref": "/contact",
          "secondaryLabel": "View Naming Wins",
          "secondaryHref": "/case-studies/magnetic-matrix"
        },
        "newsletterTitle": "Naming Intelligence Digest",
        "newsletterSubtitle": "Phonetic trends, numerology tips and launch activation scripts delivered monthly."
      },
      "CN": {
        "badge": "τúüσ£║τƒ⌐Θÿ╡",
        "title": "σºôσÉìσæ╜σè┐Σ╗úτáü",
        "intro": "Φ₧ìσÉêµò░τÉåπÇüσà½σ¡ùσà▒µî»Σ╕ÄΦ»¡Θƒ│τúüσ£║∩╝îµëôΘÇáµö╛σñºσæ╜Φ┐ÉτÜäΣ╕ôσ▒₧σºôσÉìπÇé",
        "overviewHeading": "σæ╜σÉìµâàµèÑ",
        "overviewSubtitle": "µòàΣ║ïπâ╗Θƒ│Θƒ╡πâ╗σæ╜σè┐τÜäΣ║ñµ▒ç",
        "overviewTitle": "σæ╜σè┐σæ╜σÉìµö╗τòÑ",
        "imageLabel": "σºôσÉìσà▒µî»σ¢╛",
        "bullets": [
          "µúÇΦºåτÄ░τö¿σºôσÉì∩╝îµë╛σç║Φâ╜ΘçÅµ╡üσñ▒πÇüµ│òσ╛ïΘúÄΘÖ⌐Σ╕ÄσÅæΘƒ│Θÿ╗σè¢πÇé",
          "µÅÉΣ╛¢σà╖µòàΣ║ïµÇºπÇüΘƒ│Θƒ╡σêåµ₧ÉΣ╕Äµò░τÉåΦ»äσêåτÜäτ▓╛ΘÇëσÉìσìòπÇé",
          "ΦºäσêÆµ│òσ╛ïµëïτ╗¡πÇüσÉ»τö¿Σ╗¬σ╝ÅΣ╕Äσ»╣σñûµ▓ƒΘÇÜΦäÜµ£¼πÇé",
          "σÉîµ¡ÑΦ»äΣ╝░τ╜æσ¥ÇπÇüτñ╛Σ║ñσ╕ÉσÅ╖Σ╕ÄσôüτëîΦ╡äΣ║º∩╝îΘü┐σàìΦÉ╜σ╖«πÇé"
        ],
        "ideal": "ΘÇéσÉêµû░τöƒσä┐πÇüσôüτëîµìóσÉìπÇüσ╣╢Φ┤¡µò┤σÉêΣ╕ÄΘ£ÇΦªüσì│µù╢σà▒Θ╕úτÜäΣ║ºσôüτ║┐πÇé",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "σæ╜σÉìµû╣µ│òΦ«║",
            "dividerSubtitle": "µêæΣ╗¼σªéΣ╜òµëôΘÇáτúüµÇºσÉìσ¡ù",
            "title": "µò░µì«∩╝ïµòàΣ║ï∩╝ïσæ╜Φ┐É",
            "imageLabel": "σæ╜σÉìσ«₧Θ¬îσ«ñ",
            "body": "τ╗ôσÉêΦ»¡Φ¿Çτºæσ¡ªπÇüµò░τÉåΣ╕Äσæ╜τ¢ÿσêåµ₧É∩╝îΦ«⌐σÉìσ¡ùσ£¿µ│òΦºäπÇüσòåΣ╕ÜΣ╕ÄΦâ╜ΘçÅσ▒éΘ¥óΘâ╜Φâ╜ΘÇÜσà│πÇé",
            "points": [
              "Φ«┐Φ░êσê⌐σ«│σà│τ│╗Σ║║∩╝îσÄÿµ╕àσôüτëî archetypeπÇüσ╕éσ£║σ«ÜΣ╜ìΣ╕Äµâàτ╗¬σƒ║Φ░âπÇé",
              "ΘÆêσ»╣Σ╕╗ΦªüΦ»¡Φ¿ÇΣ╕ÄσÅúΘƒ│Φ┐¢ΦíîΘƒ│σú░τâ¡σè¢σ¢╛∩╝îΘü┐σ╝ÇΦ┤ƒΘ¥óΦüöµâ│πÇé",
              "Σ╕ÄΣ╕¬Σ║║µêûΣ╝üΣ╕Üσæ╜τ¢ÿσ»╣Θ╜É∩╝îσ╣╢ΘàìσÉêµù╢Φ┐Éτ╗ÖΣ║êσÉ»τö¿σ╗║Φ««πÇé"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "µêÉµ₧£Σ╜ôτÄ░",
            "dividerSubtitle": "σ«óµê╖Σ╕èτ║┐σÉÄτÜäµäƒσÅù",
            "title": "Φ╛¿Φ»åπâ╗Φ╜¼σîûπâ╗σ┐áΦ»Ü",
            "imageLabel": "σæ╜σÉìµêÉµ₧£",
            "body": "ΘÇÅΦ┐çσæ╜σè┐Σ╗úτáüΘö╗ΘÇáτÜäσÉìσ¡ù∩╝îµ¢┤σ«╣µÿôΦó½Φ«░Σ╜ÅπÇüΦó½σû£µ¼ó∩╝îΣ╣ƒµ¢┤Φâ╜σç¥ΦüÜσ¢óΘÿƒπÇé",
            "points": [
              "σôüτëîΦ«░σ┐åσ║ªΣ╕Äτé╣σç╗τÄçµÅÉσìç∩╝îσ¢áΣ╕║σÉìσ¡ùσÑ╜Φ»╗σÅêσÑ╜Φ«░πÇé",
              "σ¢óΘÿƒΦ«ñσÉîµäƒσó₧σ╝║∩╝îσ¢áΣ╕║σÉìσ¡ùΦ┤┤Φ┐æΣ╜┐σæ╜Σ╕Äσæ╜σè┐πÇé",
              "Φ╖¿σ¢╜Σ╕Äµ│òσ╛ïΦÉ╜σ£░µ¢┤Θí║τòà∩╝îσ¢áΣ║ïσëìµÄÆΘÖñσå▓τ¬üΣ╕ÄΣ╕ìσÉëµò░πÇé"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "σåÖΣ╕ïΣ╜áτÜäΣ╕ôσ▒₧σÉìσÅ╖",
          "dividerSubtitle": "σæ╜σÉìσºöµíêΘççΘÖÉΘçÅσê╢σ║ª",
          "title": "σÉ»σè¿σæ╜σè┐σæ╜σÉìΦ«íτö╗",
          "message": "Φ»┤µÿÄτ¢«µáçσÅùΣ╝ùπÇüτö¿ΘÇöΣ╕Äµù╢τ¿ï∩╝îµêæΣ╗¼σ░åΦºäσêÆτáöτ⌐╢σ░Åτ╗äΣ╕ÄΣ║ñΣ╗ÿµÄÆτ¿ïπÇé",
          "primaryLabel": "σ╝Çσºïσæ╜σÉìτ«ÇµèÑ",
          "primaryHref": "/contact",
          "secondaryLabel": "µƒÑτ£ïσæ╜σÉìµêÉµ₧£",
          "secondaryHref": "/case-studies/magnetic-matrix"
        },
        "newsletterTitle": "σæ╜σÉìµâàµèÑτ½Ö",
        "newsletterSubtitle": "µÄîµÅíΘƒ│Θƒ╡Φ╢ïσè┐πÇüµò░τÉåτ▓╛ΘÇëΣ╕ÄσÉ»τö¿Σ╗¬σ╝ÅΦäÜµ£¼πÇé"
      }
    }
  ),

  celestialService('/services/magnetic-matrix/soul-number-blueprint',
    {
      "EN": {
        "badge": "Magnetic Matrix",
        "title": "Soul Number Blueprint",
        "intro": "Synchronise your numerology with BaZi and Zi Wei to reveal life lessons, karmic debts and partnership chemistry you can operationalise.",
        "overviewHeading": "Numerology Intelligence",
        "overviewSubtitle": "From insight to integration",
        "overviewTitle": "Soul Blueprint Portfolio",
        "imageLabel": "Numerology Command Board",
        "bullets": [
          "Comprehensive reading of core, destiny, soul and maturity numbers with actionable guidance.",
          "Compatibility matrix for partners, family members and key team roles.",
          "Daily rhythm and environment prescriptions covering colours, directions and restorative rituals.",
          "Quarterly checkpoints aligning personal goals with incoming numerology cycles."
        ],
        "ideal": "Designed for individuals, couples and leadership duos seeking alignment without sacrificing ambition.",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Analytical Method",
            "dividerSubtitle": "How the blueprint is assembled",
            "title": "Cross-System Calibration",
            "imageLabel": "Blueprint Lab",
            "body": "We map numerology, BaZi and Zi Wei into a single dashboard so you know when to accelerate, pause or renegotiate.",
            "points": [
              "Data intake covering life milestones, relationships and health markers for pattern recognition.",
              "Cross-validation of numbers against celestial charts to confirm supportive or conflicting influences.",
              "Secure portal hosting visual dashboards, meditations and habit trackers to embed the blueprint."
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "Life and Business Outcomes",
            "dividerSubtitle": "Changes clients report",
            "title": "Alignment, Momentum, Peace",
            "imageLabel": "Blueprint Results",
            "body": "Clients move with more certainty, repair key relationships faster and enjoy steadier wellbeing once rhythms are aligned.",
            "points": [
              "Goal execution accelerates as personal timing windows replace random hustle.",
              "Partnerships and teams stabilise because compatibility and conflict intervals are managed proactively.",
              "Mental load lightens thanks to clear rituals for recovery, creativity and decision resets."
            ]
          }
        ],
        "cta": {
          "dividerTitle": "Unlock Your Soul Blueprint",
          "dividerSubtitle": "Consult slots open by application",
          "title": "Book a Soul Number Intensive",
          "message": "Outline your current transitions and relationship map so we can prepare the integrated numerology briefing.",
          "primaryLabel": "Schedule Blueprint Session",
          "primaryHref": "/contact",
          "secondaryLabel": "Explore Numerology Wins",
          "secondaryHref": "/case-studies/magnetic-matrix"
        },
        "newsletterTitle": "Soul Number Signals",
        "newsletterSubtitle": "Monthly number forecasts, compatibility prompts and ritual reminders."
      },
      "CN": {
        "badge": "τúüσ£║τƒ⌐Θÿ╡",
        "title": "τü╡µò░σà¿µü»Φô¥σ¢╛",
        "intro": "Φ«⌐µò░τÉåπÇüσà½σ¡ùΣ╕Äτ┤½σ╛«σÉîΘóæ∩╝îµÅ¡τñ║τöƒσæ╜Φ»╛ΘóÿπÇüσ¢áµ₧£Σ║Åµ¼áΣ╕Äσà│τ│╗σîûσ¡ª∩╝îσ╣╢Σ╗ÿΦ»╕Φíîσè¿πÇé",
        "overviewHeading": "τü╡µò░µâàµèÑ",
        "overviewSubtitle": "Σ╗Äµ┤₧Φºüσê░µò┤σÉê",
        "overviewTitle": "τü╡µò░Φô¥σ¢╛τ╗äσÉê",
        "imageLabel": "τü╡µò░µîçµîÑσÅ░",
        "bullets": [
          "σ«îµò┤Φºúµ₧Éσæ╜µá╝µò░πÇüτü╡Θ¡éµò░πÇüµêÉτåƒµò░τ¡ëµá╕σ┐âµîçµáç∩╝îσ╣╢τ╗Öσç║µëºΦíîσ╗║Φ««πÇé",
          "σ╗║τ½ïΣ╝┤Σ╛úπÇüσ«╢Σ║║Σ╕Äσà│Θö«σ¢óΘÿƒΦºÆΦë▓τÜäσÉêµïìτƒ⌐Θÿ╡πÇé",
          "µÅÉΣ╛¢µ»ÅµùÑΦèéσÑÅΣ╕ÄτÄ»σóâσñäµû╣∩╝ÜΘó£Φë▓πÇüµû╣Σ╜ìΣ╕ÄΣ┐«σñìΣ╗¬σ╝ÅπÇé",
          "σ«ëµÄÆσ¡úσ║ªσñìτ¢ÿ∩╝îσ░åΣ╕¬Σ║║τ¢«µáçΣ╕Äµ¥ÑΣ╕┤τÜäµò░σ¡ùσæ¿µ£ƒσ»╣Θ╜ÉπÇé"
        ],
        "ideal": "ΘÇéσÉêΦ┐╜µ▒éσ»╣Θ╜ÉσÅêΣ╕ìτë║τë▓ΘçÄσ┐âτÜäΣ╕¬Σ║║πÇüΣ╝┤Σ╛úΣ╕ÄΘóåσ»╝µÉ¡µíúπÇé",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "σêåµ₧Éµû╣µ│ò",
            "dividerSubtitle": "Φô¥σ¢╛σªéΣ╜òσ╗║µ₧ä",
            "title": "σñÜτ│╗τ╗ƒµáíσçå",
            "imageLabel": "Φô¥σ¢╛σ«₧Θ¬îσ«ñ",
            "body": "µèèτü╡µò░πÇüσà½σ¡ùΣ╕Äτ┤½σ╛«µò┤σÉêµêÉΣ╕ÇΣ╕¬Σ╗¬Φí¿µ¥┐∩╝îΦ«⌐Σ╜áτƒÑΘüôΣ╜òµù╢σèáΘÇƒπÇüµÜéσü£µêûΘçìτ╗äπÇé",
            "points": [
              "ΦÆÉΘ¢åσà│Θö«Θçîτ¿ïτóæπÇüσà│τ│╗Σ╕ÄσüÑσ║╖µîçµáç∩╝îΦ╛¿Φ»åµ¿íσ╝ÅπÇé",
              "Φ╖¿µ»öµò░σ¡ùΣ╕Äµÿƒτ¢ÿ∩╝îτí«Φ«ñσè⌐σè¢Σ╕Äσå▓τ¬üτÜäµù╢Θù┤τé╣πÇé",
              "µÅÉΣ╛¢σ«ëσà¿σ╣│σÅ░∩╝îσ¡ÿµö╛σÅ»ΦºåσîûΣ╗¬Φí¿πÇüσåÑµâ│Σ╕ÄΣ╣áµâ»Φ┐╜Φ╕¬σ╖Ñσà╖πÇé"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "τöƒµ┤╗Σ╕ÄΣ║ïΣ╕ÜµêÉµòê",
            "dividerSubtitle": "σ«óµê╖τÜäτ£ƒσ«₧σ¢₧Θªê",
            "title": "σ»╣Θ╜Éπâ╗σè¿Φâ╜πâ╗σ«ëτ¿│",
            "imageLabel": "Φô¥σ¢╛µêÉµ₧£",
            "body": "σ╜ôΦèéσÑÅΣ╕ÄΣ╜┐σæ╜σÉîµ¡ÑσÉÄ∩╝îσ«óµê╖Φíîσè¿µ¢┤τ¼âσ«Ü∩╝îσà│τ│╗Σ┐«σñìµ¢┤σ┐½∩╝îΦ║½σ┐âτè╢µÇüµ¢┤τ¿│πÇé",
            "points": [
              "Σ╛¥τàºΣ╕¬Σ║║σñ⌐τ¬ùµëºΦíîΦ«íσêÆ∩╝îτ¢«µáçΦ╛╛µêÉΘÇƒσ║ªµÅÉσìçπÇé",
              "Σ╝ÖΣ╝┤Σ╕Äσ¢óΘÿƒσ£¿Σ║ïσëìΘóäσêñσå▓τ¬üΣ╕ÄσÉêµïìµ£ƒ∩╝îσÉêΣ╜£µ¢┤Θí║πÇé",
              "ΘÇÅΦ┐çµÿÄτí«τÜäσñìσÄƒπÇüσê¢µäÅΣ╕Äσå│τ¡ûΣ╗¬σ╝Å∩╝îσ┐âµÖ║Φ┤ƒµïàµÿÄµÿ╛Σ╕ïΘÖìπÇé"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "ΦºúΘöüτü╡µò░Φô¥σ¢╛",
          "dividerSubtitle": "Θí╛Θù«σ╕¡µ¼íΘççτö│Φ»╖σê╢",
          "title": "Θóäτ║ªτü╡µò░µ╖▒σ║ªΣ╝ÜΦ░ê",
          "message": "Φ»┤µÿÄτ¢«σëìτÜäΦ╜¼µèÿΣ╕Äσà│τ│╗σ£░σ¢╛∩╝îµêæΣ╗¼σ░åσçåσñçµò┤σÉêσ╝Åτü╡µò░τ«ÇµèÑπÇé",
          "primaryLabel": "Θóäτ║ªΦô¥σ¢╛Σ╝ÜΦ««",
          "primaryHref": "/contact",
          "secondaryLabel": "ΦºêΘÿàτü╡µò░µêÉµ₧£",
          "secondaryHref": "/case-studies/magnetic-matrix"
        },
        "newsletterTitle": "τü╡µò░µâàµèÑ",
        "newsletterSubtitle": "ΦÄ╖σÅûµ£êσ║ªµò░σ¡ùΘóäµ╡ïπÇüσà│τ│╗µÅÉΘåÆΣ╕ÄΣ╗¬σ╝ÅµÅÉτñ║πÇé"
      }
    }
  ),

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
    element: (<AboutPage />),
  },
  {
    path: '/contact',
    element: (
      <ContentPage
        title="Contact"
        intro="Let├óΓé¼Γäós map out the support you need. Share your intention and preferred timelines├óΓé¼ΓÇ¥our team will respond within two business days."
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
              'Deliverables are for the client├óΓé¼Γäós personal or organisational use unless otherwise agreed.',
            ],
          },
          {
            heading: 'Client responsibilities',
            body: 'Clients ensure the accuracy of supplied information and understand metaphysical guidance supplements├óΓé¼ΓÇ¥not replaces├óΓé¼ΓÇ¥professional advice in legal, medical or financial matters.',
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
            body: 'Consultations may be rescheduled once with 48 hours├óΓé¼Γäó notice. No-shows or late cancellations forfeit the session fee.',
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


















