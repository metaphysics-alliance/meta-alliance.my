import { CELESTIAL_SERVICES } from './celestialContent.js'

/** @type {const} */
export const dictionary = {
  EN: {
    brand_top: '玄域联盟',
    brand_bottom: 'Metaphysics Alliance',
    who_title: 'Who We Are',
    who_long: `Metaphysics Alliance is a Malaysia‑based boutique dedicated to turning classical Chinese metaphysics into clear, practical guidance. We combine BaZi, Zi Wei Dou Shu, Qi Men Dun Jia, Feng Shui, Huangji, Taiyi, Liu Ren and modern numerology to illuminate timing, strategy and design. Every reading is anchored to True Solar Time and the 24 Solar Terms, cross‑checked with authoritative calendars to protect accuracy.`,
    why_title: 'Why Choose Us?',
    why_long: `Choose Metaphysics Alliance for rigor, clarity and timing. We triangulate BaZi, Zi Wei, Qi Men, Feng Shui, Huangji, Taiyi, Liu Ren and numerology so recommendations are cross‑validated, not single-method guesses.`,
    reviews_title: "What Our Client's Says About Us",
    newsletter_title: 'Newsletter',
    newsletter_sub: 'Insights, timing windows & case studies. No spam.',
    newsletter_placeholder: 'Enter your email',
    newsletter_button: 'Subscribe',
    map_title: 'Our Location',
    nav: {
      home: 'Home',
      celestial: 'Celestial',
      bazi: 'BaZi Analysis',
      ziwei: 'Zi Wei Dou Shu',
      qimen: 'Qi Men Dun Jia',
      fengshui: 'Feng Shui',
      fengshui_res: 'Residential Feng Shui',
      fengshui_com: 'Commercial Feng Shui',
      name_number: 'Name & Number',
      soul_matrix: 'Soul Path Matrix',
      cosmic_name: 'Cosmic Name Architecture',
      oracles: 'Imperial',
      celestial_numbers: 'Supreme Celestial Numbers',
      taiyi_numbers: 'Cosmic Tai Yi Strategy',
      six_ren: 'Mystical Mechanism of Six Ren',
      vip_report: '360 Holistic',
      vip_essential: 'Essential Destiny Blueprint',
      vip_advanced: 'Advanced Destiny Blueprint',
      vip_supreme: 'Supreme Destiny Blueprint',
      academy: 'Academy',
      courses: 'Courses Overview',
      beginner: 'Beginner',
      advanced: 'Advanced',
      pro: 'Professional Certification',
      calendar: 'Calendar & Booking',
      enterprise: 'Enterprise',
      audit: 'Corporate Audit',
      site: 'Site Selection',
      cycles: 'Strategy & Cycles',
      resources: 'Resources',
      four_pillars: 'Cosmic Four Pillars Chart',
      purple_star: 'Celestial Star Oracle Chart',
      about: 'About',
      contact: 'Contact',
      celestial_groups: [
        {
          title: 'Destiny Blueprint',
          items: [
            { title: 'Destiny Algorithm (BaZi)', href: '/services/celestial/destiny-algorithm', thumbnail: '/images/page-services/1-bazi.png' },
            { title: 'Imperial Star Atlas (Zi Wei Dou Shu)', href: '/services/celestial/imperial-star-atlas', thumbnail: '/images/page-services/2-ziwei.png' },
            { title: 'Arcane Strategy Matrix (Qi Men Dun Jia)', href: '/services/celestial/arcane-strategy-matrix', thumbnail: '/images/page-services/3-qimen.jpg' },
          ],
        },
        {
          title: 'Feng Shui Assessment',
          items: [
            { title: 'Home Destiny Compass', href: '/services/fengshui/home-destiny-compass', thumbnail: '/images/page-services/4-home.jpg' },
            { title: 'Office Power Alignment', href: '/services/fengshui/office-power-alignment', thumbnail: '/images/page-services/5-office.jpg' },
            { title: 'Dragon Vein Oracle', href: '/services/fengshui/dragon-vein-oracle', thumbnail: '/images/page-services/6-dragon.jpg' },
          ],
        },
        {
          title: 'Feng Shui Layout',
          items: [
            { title: 'Cosmic Cycle of Fate', href: '/services/fengshui/cosmic-cycle-of-fate', thumbnail: '/images/page-services/7-cosmic.jpg' },
            { title: 'Celestial Star Matrix', href: '/services/fengshui/celestial-star-matrix', thumbnail: '/images/page-services/8-celestial.jpg' },
            { title: 'Energy Convergence Field', href: '/services/fengshui/energy-convergence-field', thumbnail: '/images/page-services/9-energy.jpg' },
          ],
        },
        {
          title: 'Magnetic Matrix',
          items: [
            { title: 'I-Ching Energy Matrix', href: '/services/magnetic-matrix/i-ching-energy-matrix', thumbnail: '/images/page-services/10-iching.jpg' },
            { title: 'Name Destiny Code', href: '/services/magnetic-matrix/name-destiny-code', thumbnail: '/images/page-services/11-name.jpg' },
            { title: 'Soul Number Blueprint', href: '/services/magnetic-matrix/soul-number-blueprint', thumbnail: '/images/page-services/12-soul.jpg' },
          ],
        },
      ],
    },
  vip: {
    section_title: 'VIP Holistic Destiny Analysis Service',
    cta: 'Learn More',
    tiers: {
      lite_title: 'Essential Destiny Blueprint',
      pro_title: 'Advanced Destiny Blueprint',
      supreme_title: 'Supreme Destiny Blueprint',
      lite_points: [
        '100+ page destiny report',
        'Talents & potentials, destined industries, earning models',
        '10-year Luck Pillars (Da Yun) analysis',
        'Life numbers (numerology) analysis',
        'Practical remediation advice'
      ],
      pro_points: [
        '200+ page destiny report',
        'Talents & potentials, destined industries, earning models',
        '10-year Luck Pillars (Da Yun) analysis',
        'Life numbers (numerology) analysis',
        'Practical remediation advice',
        'Numeric field analysis',
        'Name auspiciousness analysis'
      ],
      supreme_points: [
        '300+ page destiny report',
        'Talents & potentials, destined industries, earning models',
        '10-year Luck Pillars (Da Yun) analysis',
        'Life numbers (numerology) analysis',
        'Practical remediation advice',
        'Numeric field analysis & change recommendations',
        'Name auspiciousness analysis & change recommendations',
        'Feng Shui evaluation (residential only)'
      ]
      },
    },
    services: {
      ...CELESTIAL_SERVICES.EN,
      corporateAudit: {
        badge: 'Corporate Destiny Audit',
        title: 'Corporate Destiny Audit Intelligence',
        subtitle: 'Diagnose and optimise leadership energy, operational flow, decision rhythm and spatial qi through Chinese metaphysics + corporate analytics.',
        sections: [
          {
            key: 'introduction',
            dividerTitle: 'Introduction',
            dividerSubtitle: 'Every company has a destiny chart',
            title: 'Strategy × Energy × Space × Timing',
            imageLabel: 'Black-gold cosmic banner',
            body: 'Metaphysics Alliance exposes the unseen structure of enterprises so boards can move with cosmic precision. Every company has a destiny chart—we reveal it, align it and weaponise it.',
            points: [
              'Corporate audit blend: destiny analytics, spatial feng shui, leadership profiling and timing intelligence.',
              'Outcome: relentless clarity on what to accelerate, shield or rewire before the next fiscal gate.',
              'Urgency CTA: priority audit slots release monthly—secure your window now.'
            ]
          },
          {
            key: 'destinyMapping',
            dividerTitle: 'Corporate Destiny Mapping',
            dividerSubtitle: 'Decode the enterprise chart',
            title: 'Founding BaZi & Zi Wei Intelligence',
            imageLabel: 'Corporate destiny matrices',
            body: 'Convert founding date/time and registered location into BaZi and Zi Wei charts to expose innate strengths and risks.',
            points: [
              'Founding BaZi chart with five-element radar, yin/yang ratio and Heaven–Earth–Human balance.',
              'Corporate Zi Wei analysis covering business luck, finance, brand and reputation palaces.',
              'Energy Index scoreboard highlighting competitive edges and weak spots.'
            ]
          },
          {
            key: 'leadership',
            dividerTitle: 'Leadership Audit',
            dividerSubtitle: 'C-suite resonance',
            title: 'Leadership Energy Compatibility',
            imageLabel: 'Leadership resonance grid',
            body: 'Cross-map executive birth data with the company chart to validate decision rhythm and succession stability.',
            points: [
              'Decision Frequency map comparing CEO BaZi with company BaZi cycles.',
              'Leadership Element Type breakdown and Team Energy Matrix radar chart.',
              'Compatibility Score (0–100) with immediate harmonisation playbook.'
            ]
          },
          {
            key: 'spatial',
            dividerTitle: 'Spatial Feng Shui Diagnostics',
            dividerSubtitle: 'Office qi orchestration',
            title: 'Engineer the Headquarters Qi-Field',
            imageLabel: 'Office qi map',
            body: 'Link workspace qi-flow to operational performance, retention and culture.',
            points: [
              'Office Qi Map with current-period flying star overlays.',
              'Directional Wealth Chart for entrances, finance hubs and executive suites.',
              'Magnetic Flow Path from arrival to boardroom with correction suggestions (plants, lighting, colour harmonics).'
            ]
          },
          {
            key: 'operations',
            dividerTitle: 'Operational Energy Cycle',
            dividerSubtitle: 'Timing intelligence',
            title: 'Cashflow, PR and Growth Rhythm',
            imageLabel: 'Operational cycle board',
            body: 'Audit timing cycles that govern liquidity, reputation and expansion.',
            points: [
              'Ten-Year Luck Cycle curve for long-range strategy.',
              'Annual Forecast chart (12-month bar + radar combo) showing surge vs caution windows.',
              'Seasonal Action Window card with pro/human-mode timing guidance.'
            ]
          },
          {
            key: 'naming',
            dividerTitle: 'Corporate Naming & Numerology',
            dividerSubtitle: 'Brand resonance',
            title: 'Numerology Magnetics Audit',
            imageLabel: 'Name numerology radar',
            body: 'Evaluate corporate, brand and product names via 三才五格 and number magnetics.',
            points: [
              'Corporate Name Five-Grid report with auspiciousness scoring.',
              'Brand numerology radar and numeric fortune pie chart.',
              'IC/phone/account energy audit plus renaming recommendations when balance falters.'
            ]
          },
          {
            key: 'wealth',
            dividerTitle: 'Wealth Structure & Flow',
            dividerSubtitle: 'Capital choreography',
            title: 'Visualise the Capital Rivers',
            imageLabel: 'Wealth flow diagram',
            body: 'Map how resources move through the enterprise so the CFO can plug leaks fast.',
            points: [
              'Wealth Flow Sankey diagram (income → expense → reinvestment).',
              'Elemental wealth mapping (Fire marketing, Metal finance, Water logistics, etc.).',
              'Optimisation prescriptions combining timing, feng shui adjustments and HR deployment.'
            ]
          },
          {
            key: 'fateScore',
            dividerTitle: 'Corporate Fate Score',
            dividerSubtitle: 'Multi-dimensional index',
            title: 'Energy × Timing × Space × Leadership',
            imageLabel: 'Fate score dashboard',
            body: 'Deliver a composite scoreboard across energy, timing, spatial support and leadership alignment.',
            points: [
              'Energy Stability radar, Decision Harmony matrix and Wealth Flow efficiency bars.',
              'Risk Heatmap with palace-by-palace scoring (0–100).',
              'Highlight Red Alert quadrants demanding immediate executive action.'
            ]
          },
          {
            key: 'actionPlan',
            dividerTitle: 'Action Plan & Recommendations',
            dividerSubtitle: 'From insight to execution',
            title: '90-Day Command Plan',
            imageLabel: 'Action plan timeline',
            body: 'Translate diagnosis into a phased playbook the board can deploy instantly.',
            points: [
              'Immediate (1 week), 30-day and 90-day action lists.',
              'Long-term feng shui layout and cultural cadence update (12-month view).',
              'Urgency: audit seats are limited—lock your slot before the next quarter closes.'
            ]
          },
          {
            key: 'references',
            dividerTitle: 'Reference & Authority',
            dividerSubtitle: 'Classics + analytics',
            title: 'Imperial Source, Modern Proof',
            imageLabel: 'Reference compendium',
            body: 'Ground the audit in classical canon and modern data discipline.',
            points: [
              'Classics: 《渊海子平》《三命通会》《滴天髓》《紫微斗数全书》《青囊经》《葬经》《皇极经世书》。',
              'Modern references: corporate analytics, capital flow datasets, ESG benchmarks.'
            ]
          }
        ],
        cta: {
          dividerTitle: 'Command Your Corporate Destiny',
          dividerSubtitle: 'Priority audit windows release monthly',
          title: 'Start Corporate Destiny Audit',
          message: 'Upload your briefing (founding data, leadership roster, floor plans). We respond within 48 hours with scope, fees and the earliest audit window.',
          primaryLabel: 'Start Corporate Audit → 开启企业审查推演',
          primaryHref: '/contact'
        },
        newsletterTitle: 'Corporate Resonance Signals',
        newsletterSubtitle: 'Seasonal board briefings, energy diagnostics and regulatory qi alerts.'
      },
      enterpriseSite: {
        badge: 'Enterprise Advisory',
        title: 'Enterprise Site Selection Command Deck',
        subtitle: 'Fuse landform qi, San Yuan Jiu Yun timing and business use-cases to select sites that stay prosperous.',
        sections: [
          {
            key: 'purpose',
            dividerTitle: 'Purpose & Scope',
            dividerSubtitle: 'Why alignment matters',
            title: 'Set the Mandate Before the Survey',
            imageLabel: 'Purpose briefing overlay',
            body: 'Explain why site selection must align with landform qi, San Yuan Jiu Yun cycles and the intended business function.',
            points: [
              'Audit coverage: journey from macro landform reading to micro interior fit-out recommendations.',
              'Applicable scenarios: HQ, manufacturing plant, flagship retail, clinic, data centre.',
              'Deliverables overview: scorecards, layered maps and a sequenced action plan.'
            ]
          },
          {
            key: 'clientBrief',
            dividerTitle: 'Client & Project Brief',
            dividerSubtitle: 'Use-case intake',
            title: 'Capture the Strategic Brief',
            imageLabel: 'Stakeholder briefing grid',
            body: 'Gather use-case, capacity, timeline and budget so the audit targets real-world constraints.',
            points: [
              'Collect company profile, stakeholder birth data (for resonance mapping) and key decision makers.',
              'Document required GFA / plot ratio, development phases, lease vs freehold preference and target opening date.',
              'Output a constraints summary separating “must-have” from “nice-to-have”.'
            ]
          },
          {
            key: 'geoIntake',
            dividerTitle: 'Geo-Spatial Intake',
            dividerSubtitle: 'Regional sampling',
            title: 'Load Your Candidates',
            imageLabel: 'Regional intake map',
            body: 'Import candidate coordinates or polygons to create the base spatial canvas.',
            points: [
              'Collect address, latitude/longitude, cadastral parcel map and nearby features (mountains, water, highways).',
              'Display base maps with 1/3/5 km rings plus POI overlays highlighting rivers, ridgelines, transport and EMF sources.'
            ]
          },
          {
            key: 'macroLandform',
            dividerTitle: 'Macro Landform (Form School)',
            dividerSubtitle: 'Dragon · Sand · Water · Facing',
            title: 'Assess the Big Qi',
            imageLabel: 'Form school contour sketch',
            body: 'Judge mountain spine (dragon), embracing sand, incoming/outgoing water and overall facing.',
            points: [
              'Show ridge and valley sketches, Bright Hall openness, shielding vs exposure.',
              'Analyse water patterns (approach, meander, exit) and flag water arrows.',
              'Output: Form score (0–100) plus risk notes for冲射、割脚水、反弓水.'
            ]
          },
          {
            key: 'compass',
            dividerTitle: 'Compass Audit (Xuan Kong)',
            dividerSubtitle: 'Flying Star analytics',
            title: 'Establish Sitting and Facing',
            imageLabel: 'Flying star compass grid',
            body: 'Determine sitting/facing degrees and assemble the period star chart for the building plot.',
            points: [
              'Collect precise facing measurements, current Period (Yun) and site notes.',
              'Display nine-grid Flying Star map showing mountain/water stars and auspicious vs inauspicious sectors.',
              'Output: Use/avoid guidance by function (entrance, finance room, CEO office, server room).'
            ]
          },
          {
            key: 'cycles',
            dividerTitle: 'San Yuan Jiu Yun Alignment',
            dividerSubtitle: 'Period compliance check',
            title: 'Match the Current Yun',
            imageLabel: 'San Yuan timeline ribbon',
            body: 'Check whether the site naturally benefits the active period and suggest rectifications when it does not.',
            points: [
              'Show period compliance matrix (旺山旺向、双星到向、双星到山等).',
              'Output: Period-fit score plus rectification advice (water feature, lighting, façade massing).'
            ]
          },
          {
            key: 'waterLaw',
            dividerTitle: 'Water Law & Roads as Water',
            dividerSubtitle: 'Wealth flow diagnostics',
            title: 'Track Money Flow',
            imageLabel: 'Water law schematic',
            body: 'Apply classical water formulas while treating major roads as water flows.',
            points: [
              'Diagram incoming (来水) vs outgoing (去水) routes, junction types and roundabouts.',
              'Output: Wealth retention potential, leak points and recommended fixes.'
            ]
          },
          {
            key: 'microFit',
            dividerTitle: 'Site Micro-Fit',
            dividerSubtitle: 'Parcel resonance',
            title: 'Optimise Entrances and Cores',
            imageLabel: 'Parcel micro-fit grid',
            body: 'Plot entrances, ramps, cores, loading zones and vertical circulation on the parcel.',
            points: [
              'Ensure entrances land in auspicious sectors and avoid pressing sha lines or knife edges.',
              'Output: Entrance/facade tweaks plus canopy, planter and screen positioning guidance.'
            ]
          },
          {
            key: 'functionZoning',
            dividerTitle: 'Function Zoning',
            dividerSubtitle: 'Five-element allocation',
            title: 'Match Departments to Qi',
            imageLabel: 'Functional zoning storyboard',
            body: 'Place teams in sectors that support their elemental needs.',
            points: [
              'Produce zoning map covering leadership, finance, sales, R&D, storage, IT/servers and wellness areas.',
              'Output: Room-to-sector assignment table with rationale and notes on noise/heat/EMF isolation.'
            ]
          },
          {
            key: 'stakeholders',
            dividerTitle: 'Stakeholder Resonance',
            dividerSubtitle: 'People-field alignment',
            title: 'Seat Key Leaders in Power Zones',
            imageLabel: 'Stakeholder resonance radar',
            body: 'Cross-map CEO and owners’ charts to site sectors for seating and facing recommendations.',
            points: [
              'Derive personal Kua and useful elements to guide seating/meeting orientations.',
              'Output: Executive seating plan and orientation sheet.'
            ]
          },
          {
            key: 'access',
            dividerTitle: 'Access, Light, Wind, EMF',
            dividerSubtitle: 'Engineering filters',
            title: 'Respect Physical Qi Conditions',
            imageLabel: 'Environmental diagnostics grid',
            body: 'Account for non-metaphysical filters that affect how qi manifests.',
            points: [
              'Show venturi wind channels vs dead corners, daylight availability and proximity to transformer rooms or towers.',
              'Output: Mitigation list covering baffles, screens, green walls and grounding measures.'
            ]
          },
          {
            key: 'risks',
            dividerTitle: 'Risk & Red Flags',
            dividerSubtitle: 'Fatal flaw scan',
            title: 'Flag Deal-Breakers Early',
            imageLabel: 'Risk flag dashboard',
            body: 'Identify critical issues such as T-junction sha, sharp-corner attack or severe water leaks.',
            points: [
              'Checklist includes downhill backs, coffin-lid forms and other structural threats.',
              'Output: Red/Amber/Green map with corrective options or “Do Not Select” verdict.'
            ]
          },
          {
            key: 'timing',
            dividerTitle: 'Time Windows (Qi Men / Almanac)',
            dividerSubtitle: 'Activation playbook',
            title: 'Pick the Right Date',
            imageLabel: 'Timing window matrix',
            body: 'Recommend groundbreaking, contract signing and move-in windows using Qi Men Dun Jia and Tong Shu.',
            points: [
              'Present 3–5 optimal windows plus cautions.',
              'Output: Ceremony and facing protocol cheat-sheet.'
            ]
          },
          {
            key: 'compliance',
            dividerTitle: 'Compliance & Practicalities',
            dividerSubtitle: 'Reality check',
            title: 'Validate Planning and Logistics',
            imageLabel: 'Compliance checklist board',
            body: 'Review planning rules, utilities, logistics and capex/opex assumptions.',
            points: [
              'Compare zoning class vs intended use, access limits, flood/fire/heritage overlays.',
              'Output: Feasibility gate (Go / Revise / No-Go) with key dependencies.'
            ]
          },
          {
            key: 'scoring',
            dividerTitle: 'Scoring & Shortlist',
            dividerSubtitle: 'Weighted decision',
            title: 'Rank Your Candidates',
            imageLabel: 'Site scoring radar',
            body: 'Apply a four-axis weighted score—Form, Compass, Time, Practical.',
            points: [
              'Display radar or stacked bar comparisons for each site with tie-break notes.',
              'Output: Top 1–3 shortlist with pros/cons and mandatory remedies.'
            ]
          },
          {
            key: 'actionPlan',
            dividerTitle: 'Action Plan',
            dividerSubtitle: 'Execution roadmap',
            title: 'Move from Audit to Activation',
            imageLabel: 'Action roadmap storyboard',
            body: 'Outline what to change now, in 30 days and in 90 days.',
            points: [
              'Provide drawing markups, furnishing and landscape cues plus contractor brief bullets.'
            ]
          },
          {
            key: 'documentation',
            dividerTitle: 'Documentation & References',
            dividerSubtitle: 'Evidence trail',
            title: 'Grounded in Classics & Standards',
            imageLabel: 'Documentation stack mockup',
            body: 'Reference the classical canon and measurement standards supporting the audit.',
            points: [
              'Include 《青囊经》《葬经》《撼龙经》《地理人子须知》《玄空飞星》体系 alongside survey/measurement standards.',
              'Deliver digital dashboards, annotated plans and compliance-ready memos.'
            ]
          }
        ],
        cta: {
          dividerTitle: 'Ready to Evaluate Locations?',
          dividerSubtitle: 'Secure your enterprise site blueprint',
          title: 'Upload Candidate Sites',
          message: 'Submit KML, CSV and briefing documents so we can ingest your shortlist and generate landform plus Flying Star intelligence within five business days.',
          primaryLabel: 'Upload Site KML/CSV',
          primaryHref: '/contact',
          secondaryLabel: 'Submit Candidate Site → Generate Report',
          secondaryHref: '/contact'
        },
        newsletterTitle: 'Site Selection Intelligence',
        newsletterSubtitle: 'Maps, timing alerts and zoning insights tailored to enterprise expansion.'
      },
enterpriseCycles: {
        badge: 'Enterprise Advisory',
        title: 'Enterprise Strategy & Cycles Command Suite',
        subtitle: 'Every destiny follows a rhythm—command cycles to master timing, strategy and execution.',
        sections: [
          {
            key: 'introduction',
            dividerTitle: 'Introduction',
            dividerSubtitle: 'Metaphysical strategy defined',
            title: 'Metaphysical Strategy = Destiny + Cycle + Momentum + Timing',
            imageLabel: 'Triangular destiny flow diagram',
            body: 'Every destiny follows a rhythm. Metaphysical strategy fuses 命 (Destiny), 运 (Cycle), 势 (Momentum) and 时 (Timing) so leadership, capital and culture move in lockstep.',
            points: [
              'Definition: combine destiny blueprint, cycle intelligence, momentum leverage and precise timing.',
              'Diagram: triangular flow Destiny → Opportunity → Action → Renewal, rendered in black-gold cosmic arc with Taiji halo.',
              'Cycle spiral motif introduces the command suite’s visual language.'
            ]
          },
          {
            key: 'macroStructure',
            dividerTitle: 'Macro Time Structure',
            dividerSubtitle: 'Heaven’s grand clock',
            title: 'San Yuan → Jiu Yun → Year → Month → Day → Hour',
            imageLabel: 'Macro cycle arc with professional line chart',
            body: 'The Heaven’s clock governs macro rhythm: San Yuan (180 years) flow into Jiu Yun (20 years) and cascade down to yearly, monthly, daily and hourly beats.',
            points: [
              'Three Yuan & Nine Yun table featuring current Period 9 (2024–2043) Fire-element signature.',
              'Yearly Element Trend board forecasting impact on industries, markets and emotion climate.',
              'Cycle Energy Curve (line chart) illustrating Fire peak vs Water decline with annotations.',
              'Output: Macro Cycle Report summarising current and forthcoming Yun implications.'
            ]
          },
          {
            key: 'strategicAlignment',
            dividerTitle: 'Strategic Alignment',
            dividerSubtitle: 'Synchronise Heaven, Earth and Human',
            title: 'Align Strategy with the Right Cycle',
            imageLabel: 'Cycle–Direction–Action matrix',
            body: 'Ensure personal or corporate strategy resonates with Heaven–Earth rhythm so execution never fights prevailing qi.',
            points: [
              'Cycle Matching table comparing natal cycles against current Yun to reveal resonance gaps.',
              'Flow Harmony Index (0–100) tracking alignment across key initiatives.',
              'Directional Strategy Chart: East/Wood = Growth, South/Fire = Visibility, West/Metal = Monetisation, North/Water = Intuition.',
              'Output: Cycle–Direction–Action Matrix specifying when to act, pause or recalibrate.'
            ]
          },
          {
            key: 'annualCycle',
            dividerTitle: 'Annual Strategy Cycle',
            dividerSubtitle: 'Yearly command cadence',
            title: 'Twelve Months, Four Strategic Seasons',
            imageLabel: 'Annual radial strategy map',
            body: 'Each year carries bespoke opportunity and bottleneck signatures derived from Four Pillars and Zi Wei transformations.',
            points: [
              'Annual Flow Map (radial wheel chart) with month-by-month highlights.',
              'Quarterly Focus card: Q1 Planting (Wood), Q2 Fire & Expansion, Q3 Harvest (Metal), Q4 Reflection (Water).',
              'Strategy Calendar marking favourable vs avoid periods with ★ opportunity and ⚠ risk tags.',
              'Output: 2025 Strategy Path infographic combining opportunity and risk overlays.'
            ]
          },
          {
            key: 'monthlyRhythm',
            dividerTitle: 'Monthly & Seasonal Rhythm',
            dividerSubtitle: '24 Solar Terms',
            title: 'Tune to the Solar Pulse',
            imageLabel: 'Seasonal wheel – Solar Strategy Chart',
            body: 'Synchronise business or life rhythm with the 24 solar terms to maximise support from nature’s cadence.',
            points: [
              'Solar Term Table listing all 24节气 with Gregorian anchors.',
              'Monthly Element Bias board identifying predominant qi each month.',
              'Action Guidance scripts detailing initiations and cautions per term.',
              'Output: interactive Solar Strategy Chart (seasonal wheel) for planning rituals and operations.'
            ]
          },
          {
            key: 'microCycles',
            dividerTitle: 'Micro Cycles',
            dividerSubtitle: 'Qi Men tactical grid',
            title: 'Short-Term Tactical Timing',
            imageLabel: 'Qi Men nine-palace tactical map',
            body: 'Deploy Qi Men Dun Jia for day/hour precision—locking in favourable gates, stars and deities for tactical wins.',
            points: [
              'Qi Men Nine Palace diagram with gates, stars and deities overlay.',
              'Favourable Time Windows card listing auspicious hour blocks from live Qi Men charts.',
              'Day Officer & Star Trend table for daily leadership of qi.',
              'Output: Tactical Calendar plus Qi Men Energy Window cards for mission planning.'
            ]
          },
          {
            key: 'crossMapping',
            dividerTitle: 'Cycle Cross-Mapping',
            dividerSubtitle: 'BaZi · Zi Wei · Feng Shui synthesis',
            title: 'Find Convergence Nodes',
            imageLabel: 'Three-layer synergy map',
            body: 'Cross-map BaZi decades, Zi Wei limits and Feng Shui flying stars to locate convergence points where strategy compounds.',
            points: [
              'BaZi 10-Year Cycle × Zi Wei Decade Limit matrix.',
              'Feng Shui Flying Star overlay to highlight supported vs challenged sectors.',
              'Three-Layer Synergy Map rating high/medium/low convergence.',
              'Output: Strategic Momentum Quadrant illustrating high synergy vs low synergy actions.'
            ]
          },
          {
            key: 'industryWealth',
            dividerTitle: 'Industry & Wealth Cycle',
            dividerSubtitle: 'Elemental market intelligence',
            title: 'Surf Prosperity Waves',
            imageLabel: 'Elemental wealth radar/bar combo',
            body: 'Identify industries entering or exiting prosperity phases based on elemental correlations and economic overlays.',
            points: [
              'Element–Industry Mapping chart linking sectors to five elements.',
              'Economic Cycle Overlay aligning macroeconomic indicators with elemental movements.',
              'Wealth Flow Indicator (radar/bar combo) grading Prosper / Pause / Pivot recommendations.',
              'Output: Investment & Business Timing Table annotated by element.'
            ]
          },
          {
            key: 'strategyFormulation',
            dividerTitle: 'Strategy Formulation',
            dividerSubtitle: 'Execution blueprint',
            title: 'From Insight to Action',
            imageLabel: 'Strategy blueprint storyboard',
            body: 'Translate cycle intelligence into grounded moves with sequencing, resource allocation and communications support.',
            points: [
              'Action Sequencing card outlining Now / 30 Days / 90 Days plays.',
              'Elemental Strategy Deck: Wood=Initiate, Fire=Promote, Earth=Stabilise, Metal=Harvest, Water=Adapt.',
              'Risk–Opportunity Balance radar chart for leadership briefings.',
              'Output: Strategy Blueprint PDF with dual commentary (professional & plain language).'
            ]
          },
          {
            key: 'references',
            dividerTitle: 'References',
            dividerSubtitle: 'Classics & validation',
            title: 'Canonical Foundations',
            imageLabel: 'Classics and datasets collage',
            body: 'Cycle intelligence is anchored in authentic texts and validated with modern astronomical and economic data.',
            points: [
              'Classics: 《皇极经世书》《三命通会》《紫微斗数全书》《奇门遁甲》《协纪辨方书》《易传》《渊海子平》《天玉经》《青囊经》.',
              'Modern validation: economic cycle datasets, NASA ephemeris, True Solar Time, industry analytics.',
              'Documentation includes cycle analysis workflow notebooks and verification summaries.'
            ]
          }
        ],
        cta: {
          dividerTitle: 'Lead with Temporal Precision',
          dividerSubtitle: 'Reserve your strategic rhythm audit',
          title: 'Start Strategy Cycle Analysis',
          message: 'Share your corporate calendar, strategic priorities and stakeholder roster. We reply within three business days with the scope and data requirements.',
          primaryLabel: 'Start Strategy Cycle Analysis｜开启策略周期推演',
          primaryHref: '/contact'
        },
        newsletterTitle: 'Cycle Intelligence Dispatch',
        newsletterSubtitle: 'Seasonal wheels, cycle curves and polarity gauges distilled for board-level clarity.'
      },
      celestialNumbers: {
        badge: 'Imperial Oracle',
        title: 'Supreme Celestial Numbers Oracle',
        subtitle: 'Decode the Huangji Divine Cycles to orchestrate destiny across sovereigns, enterprises and individuals.',
        sections: [
          {
            key: 'introduction',
            dividerTitle: 'Introduction',
            dividerSubtitle: 'Origins of Huangji Divine Cycles',
            title: 'Where Astronomy Meets Imperial Numerology',
            imageLabel: 'Golden Huangji spiral with cosmic halo',
            body: 'The Huangji Divine Cycles stem from the Supreme Celestial Numbers Oracle—an imperial science blending astronomy, numerology and timing. It maps how universal order flows through dynasties, nations, enterprises and personal destinies.',
            points: [
              'Historical root: Shao Yong’s Huangji Jing Shi Shu (宋·邵雍).',
              'Principle: “Numbers define order, Time defines change” (数以理推，理以时演).',
              'Visual treatment: metallic gold concentric spiral framed by deep-space halo.'
            ]
          },
          {
            key: 'cosmicFramework',
            dividerTitle: 'Cosmic Time Framework',
            dividerSubtitle: 'Heaven · Earth · Human',
            title: 'Macro–Meso–Micro Time Architecture',
            imageLabel: 'Triple-layer time matrix (Heaven–Earth–Human)',
            body: 'All movement follows cyclic waves: Heaven (macro), Earth (environmental) and Human (micro). Huangji synchronises these layers into a single command chart.',
            points: [
              'Three-Tier Matrix: Heaven Cycle (San Yuan Jiu Yun · 180/20-year waves), Earth Cycle (regional landform and socio-economic pulses), Human Cycle (10-year luck pillars + annual flows).',
              'visual: triple-ring circular timeline, outer ring = Heaven, middle = Earth, inner = Human.',
              'Output: Macro–Meso–Micro Synchrony Score spreadsheet with executive commentary.'
            ]
          },
          {
            key: 'numericalLaw',
            dividerTitle: 'Numerical Law of Huangji',
            dividerSubtitle: 'Living numbers, responsive qi',
            title: 'The Mathematics of Resonance',
            imageLabel: 'Huangji number spiral with Yin-Yang bar',
            body: 'Huangji treats numbers as living energies. By weaving 1–10 Heavenly Numbers with the 60 Jia-Zi cycle, it calculates resonance between time, space and people.',
            points: [
              'Core Equation: Divine Index = (Heaven_Number × Earth_Number × Human_Number) ÷ Temporal_Position.',
              'Numerical Layers: Origin Number (元数 – cosmic source vibration), Cycle Number (运数 – timewave strength), Response Number (应数 – individual resonance).',
              'Charts: Huangji Number Spiral + Yin-Yang Polarity Bar showing elemental balance.'
            ]
          },
          {
            key: 'cycleInterpretation',
            dividerTitle: 'Cycle Interpretation',
            dividerSubtitle: 'Forecasting momentum turns',
            title: 'Reading Prosperity and Risk Windows',
            imageLabel: 'Huangji wave chart with fortune arcs',
            body: 'Tracing Heaven Numbers reveals when fortune climbs, plateaus or reverses, guiding the choice to advance or defend.',
            points: [
              'Decade Waves: observe ten-year expansion and consolidation beats.',
              'Annual Flow: pinpoint yearly inflection nodes with activation tasks.',
              'Seasonal Pivot: four-season five-element map for quarterly course corrections.',
              'Visuals: Huangji Wave Chart (line) + Fortune Arc Diagram and annotated Opportunity/Risk windows.'
            ]
          },
          {
            key: 'strategicApplication',
            dividerTitle: 'Strategic Application',
            dividerSubtitle: 'Turning insight into action',
            title: 'From Knowing to Deploying Heaven’s Rhythm',
            imageLabel: 'Strategy timing matrix storyboard',
            body: 'Cycle intelligence fuels tangible moves—launch dates, relocations, negotiations, wellness programs—all sequenced to the same cosmic pulse.',
            points: [
              'Action Timing Table: best months/days per element, delivered as heat-map grids.',
              'Heaven–Earth–Human Strategy Matrix aligning objectives, resources and qi support.',
              'Industry Correlation Sheet mapping Finance=Metal, Tech=Fire, Education=Wood, Construction=Earth, Logistics=Water.',
              'Output: Strategic Roadmap PDF plus dual commentary (executive deck + plain-language brief).'
            ]
          },
          {
            key: 'references',
            dividerTitle: 'References & Legacy',
            dividerSubtitle: 'Classical canon · modern validation',
            title: 'An Oracle Rooted in Scholarship',
            imageLabel: 'Imperial scrolls and modern data stack',
            body: 'Every calculation is anchored to authentic classics and cross-checked with contemporary astronomical datasets.',
            points: [
              'Primary sources: 《皇极经世书》, 《皇极系述》, 《皇极推命真诀》, 《皇极与奇门遁甲合参》, 《皇极与风水周期法》, 《协纪辨方书》, 《易传》, 《河图洛书》, 《梅花易数》.',
              'Modern validation: National Astronomical Observatories of China, Taiwan ephemeris, True Solar Time, NASA JPL kernels.',
              'Documentation includes generation notebooks and verification logs.'
            ]
          }
        ],
        cta: {
          dividerTitle: 'Ready to Command Huangji Cycles?',
          dividerSubtitle: 'Secure your imperial numerology analysis',
          title: 'Start Huangji Calculation',
          message: 'Provide strategic focus, key stakeholders and target timelines so we can assemble your Supreme Celestial Numbers dossier.',
          primaryLabel: 'Start Huangji Calculation｜开启皇极推演',
          primaryHref: '/contact'
        },
        newsletterTitle: 'Huangji Cycle Bulletin',
        newsletterSubtitle: 'Circular spirals, energy waves and polarity gauges distilled for your court or board.'
      },
    },
    hero: {
      slide1_title: 'The Ultimate Destiny Matrix',
      slide1_sub: 'From BaZi to Stars, Numbers to Hexagrams — A Unified Destiny Analysis',
      slide2_title: 'The Three Celestial Codes',
      slide2_sub: 'Ancient Strategic Algorithms of Destiny, Revived Today',
      slide3_title: 'Cosmic Energy Arrangement',
      slide3_sub: 'Ancient Spatial Wisdom for Modern Success',
      slide4_title: 'Heaven–Earth–Human Grid & I-Ching Energy Matrix',
      slide4_sub: 'Decoding Names and Numbers through Heaven–Earth–Human Trinity and I-Ching Resonance',
      slide5_title: 'Corporate Destiny Blueprint & Opportunity Matrix',
      slide5_sub: 'Harnessing BaZi, Zi Wei, Qi Men, and Feng Shui for Corporate Growth'
    },
    about: {
      story: {
        title: 'Our Story',
        timeline: [
          {
            date: '2021',
            title: 'Origins of the Studio',
            outcome: 'We started as a tiny studio with one obsession: turning classical Chinese metaphysics into practical, accountable guidance. Before drawing charts, we listened. Clients shared real constraints—budgets, teams, deadlines—and we tested how BaZi, Zi Wei and Qi Men could inform timing, strategy and design decisions. Every idea had to survive reality: What launches when, who to hire, which path to drop. That discipline shaped our voice—clear, calm and candid—and set the tone for a practice built on evidence, not mystique. The goal was simple: fewer guesses, stronger moves, better timing.'
          },
          {
            date: '2022',
            title: 'True Solar Time Standard',
            outcome: 'Accuracy starts with inputs. We standardised every reading to True Solar Time and the 24 Solar Terms, then rechecked against authoritative calendars. The result was immediate: less noise between methods and clear, repeatable windows for career shifts, launches and relocations. When techniques converged, outcomes improved; when they conflicted, we learned why. Clients noticed fewer surprises and more confidence. Timing stopped feeling mystical and became a usable lever—specific weeks and quarters to act, pause or prepare—so plans could move from “hope” to tested probability.'
          },
          {
            date: '2023',
            title: 'Cross‑Validation Framework',
            outcome: 'We codified a simple rule: no single method decides. BaZi, Zi Wei, Qi Men and, where relevant, Feng Shui must support the same direction. We built a checklist to force agreement, surface risks and document trade‑offs. Sessions turned into collaborative strategy workshops: clear objectives, evidence, options and timing. When signals diverged, we explained why and adjusted the plan, not the promise. Clients left with accountable roadmaps they could share with teams—who does what, when, and how success will be measured.'
          },
          {
            date: '2024',
            title: 'Studio & Enterprise Work',
            outcome: 'As demand grew, we opened a dedicated studio and expanded into enterprise work. We embedded with clients for audits, site selection and quarterly planning, aligning spatial layouts with hiring cycles and market timing. Reports became roadmaps with owners and checkpoints. The method matured: consistent inputs, cross‑validated signals, and practical execution. It’s still metaphysics—just applied like operations. Less flourish, more follow‑through. The measure is impact: better windows chosen, fewer costly detours, and a team that moves with timing instead of fighting it.'
          }
        ]
      },
      milestones: {
        title: 'Milestones',
        items: [
          { date: '2021‑03', outcome: 'Studio founded; piloted combined BaZi, Zi Wei and Qi Men workflows.' },
          { date: '2021‑11', outcome: 'Adopted True Solar Time and 24 Solar Terms across all timestamping.' },
          { date: '2022‑08', outcome: 'Published cross‑validation checklist; reduced variance across methods.' },
          { date: '2023‑04', outcome: 'Launched visual reports with structured remediation roadmaps.' },
          { date: '2024‑02', outcome: 'Opened dedicated studio; expanded to enterprise audits and site selection.' },
          { date: '2025‑06', outcome: 'Introduced bilingual delivery (EN/CN) and short video explainers.' }
        ]
      }
    },
  },
  CN: {
    brand_top: '玄域联盟',
    brand_bottom: 'Metaphysics Alliance',
    who_title: '我们是谁',
    who_long: '玄域联盟立足马来西亚，以严谨与实用为核心，将传统玄学转化为可执行方案。我们综合八字、紫微、奇门、风水、皇极、太乙、六壬与数字命理，并以真太阳时与二十四节气为基准。',
    why_title: '为什么选择我们？',
    why_long: '我们以多术数交叉印证替代单一判断；先校正真太阳时，再验证节气节点，降低误差。',
    reviews_title: '客户对我们的评价',
    newsletter_title: '订阅资讯',
    newsletter_sub: '实战洞见、时机窗口与案例解读。拒绝骚扰。',
    newsletter_placeholder: '输入邮箱',
    newsletter_button: '订阅',
    map_title: '地理位置',
    nav: {
      home: '首页',
      celestial: '天命解析',
      bazi: '八字命理',
      ziwei: '紫微斗数',
      qimen: '奇门遁甲',
      fengshui: '风水',
      fengshui_res: '住宅风水',
      fengshui_com: '商业风水',
      name_number: '姓名数理',
      soul_matrix: '灵魂矩阵',
      cosmic_name: '星命命名',
      oracles: '帝皇天策',
      celestial_numbers: '皇极天数',
      taiyi_numbers: '乾坤太乙策',
      six_ren: '六壬神机数',
      vip_report: '360全维度蓝图',
      vip_essential: '命运蓝图·启程版',
      vip_advanced: '天机剖象·进阶版',
      vip_supreme: '乾坤至尊·全息版',
      academy: '学院',
      courses: '课程概览',
      beginner: '初阶课程',
      advanced: '进阶课程',
      pro: '专业认证',
      calendar: '预约日历',
      enterprise: '企业咨询',
      audit: '企业风水审计',
      site: '选址布局',
      cycles: '战略周期',
      resources: '资源库',
      four_pillars: '四柱命盘',
      purple_star: '紫微星图',
      about: '关于我们',
      contact: '联系我们',
      celestial_groups: [
        {
          title: '天命蓝图',
          items: [
            { title: '命运算法', href: '/services/celestial/destiny-algorithm', thumbnail: '/images/page-services/1-bazi.png' },
            { title: '帝星天图', href: '/services/celestial/imperial-star-atlas', thumbnail: '/images/page-services/2-ziwei.png' },
            { title: '玄机战策', href: '/services/celestial/arcane-strategy-matrix', thumbnail: '/images/page-services/3-qimen.jpg' },
          ]
        },
        {
          title: '风水评估',
          items: [
            { title: '宅运天机', href: '/services/fengshui/home-destiny-compass', thumbnail: '/images/page-services/4-home.jpg' },
            { title: '权势风水', href: '/services/fengshui/office-power-alignment', thumbnail: '/images/page-services/5-office.jpg' },
            { title: '龙脉圣图', href: '/services/fengshui/dragon-vein-oracle', thumbnail: '/images/page-services/6-dragon.jpg' },
          ]
        },
        {
          title: '风水布局',
          items: [
            { title: '三元九运', href: '/services/fengshui/cosmic-cycle-of-fate', thumbnail: '/images/page-services/7-cosmic.jpg' },
            { title: '玄空飞星', href: '/services/fengshui/celestial-star-matrix', thumbnail: '/images/page-services/8-celestial.jpg' },
            { title: '造化能域', href: '/services/fengshui/energy-convergence-field', thumbnail: '/images/page-services/9-energy.jpg' },
          ]
        },
        {
          title: '磁场矩阵',
          items: [
            { title: '太极数场', href: '/services/magnetic-matrix/i-ching-energy-matrix', thumbnail: '/images/page-services/10-iching.jpg' },
            { title: '名格天命', href: '/services/magnetic-matrix/name-destiny-code', thumbnail: '/images/page-services/11-name.jpg' },
            { title: '灵数天机', href: '/services/magnetic-matrix/soul-number-blueprint', thumbnail: '/images/page-services/12-soul.jpg' },
          ]
        },
      ],
    },
  vip: {
    section_title: '360全维度命运解析服务',
    cta: '了解更多',
    tiers: {
      lite_title: '命运蓝图·启程版',
      pro_title: '天机剖象·进阶版',
      supreme_title: '乾坤至尊·全息版',
      lite_points: [
        '100+ 页命运报告',
        '天赋潜能 · 行业定位 · 财运模式',
        '十年大运交替分析',
        '生命数字命理解析',
        '实用化解建议'
      ],
      pro_points: [
        '200+ 页命运报告',
        '天赋潜能 · 行业定位 · 财运模式',
        '十年大运交替分析',
        '生命数字命理解析',
        '实用化解建议',
        '数理能量场分析',
        '姓名吉象解析'
      ],
      supreme_points: [
        '300+ 页命运报告',
        '天赋潜能 · 行业定位 · 财运模式',
        '十年大运交替分析',
        '生命数字命理解析',
        '实用化解建议',
        '数理能量场分析与修正建议',
        '姓名吉象分析与优化建议',
        '住宅风水评估'
      ]
    },
    about: {
      story: {
        title: '我们的故事',
        timeline: [
          {
            date: '2021',
            title: '工作室起源',
            outcome: 'Metaphysics Alliance 以小型工作室起步，把传统术数与现代决策方法结合。先理解客户约束，再以八字、紫微、奇门校验时机与策略，聚焦清晰、可落地、可复用的方案，让建议在真实业务场景中反复验证。'
          },
          {
            date: '2022',
            title: '真太阳时标准',
            outcome: '统一口径，全面采用真太阳时与二十四节气校准时间戳，显著降低多法噪音。由此看见职业转折、产品发布、搬迁等重复窗口，信号由散乱变为聚焦，落到可验证、可执行的时间区间。'
          },
          {
            date: '2023',
            title: '交叉验证框架',
            outcome: '制定跨方法核对清单：八字、紫微、奇门与风水需形成共识。信号不一致时给出取舍依据与调整路线。咨询升级为协作式策略工作坊，产出可追责的行动计划，而非空泛的吉凶判断。'
          },
          {
            date: '2024',
            title: '工作室与企业项目',
            outcome: '成立独立工作室并扩展企业服务：常驻审计、选址与季度规划，把空间布局与招聘、市场节奏整合。方法学沉淀为可复用体系，将时机、设计与增长统一在同一张路线图上。'
          }
        ]
      },
      milestones: {
        title: '里程碑',
        items: [
          { date: '2021‑03', outcome: '工作室成立；试点整合八字、紫微、奇门流程。' },
          { date: '2021‑11', outcome: '全面采用真太阳时与二十四节气时间校准。' },
          { date: '2022‑08', outcome: '发布交叉验证清单；显著降低多法差异。' },
          { date: '2023‑04', outcome: '上线可视化报告与结构化化解路线图。' },
          { date: '2024‑02', outcome: '启用独立工作室；拓展企业审计与选址服务。' },
          { date: '2025‑06', outcome: '推出中英双语交付与短视频讲解内容。' }
        ]
      }
    },
  },
    services: {
      ...CELESTIAL_SERVICES.CN,
      corporateAudit: {
        badge: '企业审查',
        title: '企业命格审查智能',
        subtitle: '综合八字、紫微、奇门、风水与数理磁场，诊断并优化企业的领导能量、运营节奏与空间气场。',
        sections: [
          {
            key: 'introduction',
            dividerTitle: '简介',
            dividerSubtitle: '每个企业都有命盘',
            title: '战略 × 能量 × 空间 × 时间',
            imageLabel: '黑金宇宙横幅',
            body: '每个企业都有属于它的命盘。玄域联盟以帝师级玄学结合企业分析，揭示公司世界里的隐形结构，帮助董事会踩准时机、抢占先机。',
            points: [
              '方案核心：命格诊断、空间风水、领导气场、时间节奏四合一。',
              '成果目标：明确下一财务窗口前必须加速、守护或重组的重点。',
              '紧迫提醒：企业审查席位每月极少，请立即预约占位。'
            ]
          },
          {
            key: 'destinyMapping',
            dividerTitle: '企业命格剖析',
            dividerSubtitle: '企业八字 + 紫微',
            title: '拆解企业天生结构',
            imageLabel: '企业命格矩阵',
            body: '以成立时间、注册地推演企业八字与紫微星图，洞见天生优势、风险与成长瓶颈。',
            points: [
              '企业八字：五行能量雷达、阴阳比例、天地人三才平衡。',
              '企业紫微：官禄、财帛、迁移、福德等关键宫位的策略含义。',
              '五行能量指数：揭露竞争优势与薄弱环节。'
            ]
          },
          {
            key: 'leadership',
            dividerTitle: '领导层能量审计',
            dividerSubtitle: '领导 × 企业共振',
            title: 'C-Suite 气场兼容度',
            imageLabel: '领导共振矩阵',
            body: '交叉高层命盘，检视决策节奏、接班稳定性与团队气场分布。',
            points: [
              '决策节奏匹配：CEO 八字与企业八字周期的契合度。',
              '领导五行属性分析与团队能量雷达图。',
              '气场共振指数（0–100）及现场纠偏方案。'
            ]
          },
          {
            key: 'spatial',
            dividerTitle: '空间风水诊断',
            dividerSubtitle: '总部气场布局',
            title: '营造总部气场引擎',
            imageLabel: '办公气场九宫图',
            body: '以空间气流对应运营表现，优化动线、财位与核心层。',
            points: [
              '办公室飞星九宫图（当前运盘）。',
              '财气方位图：大门、财务室、董事区。',
              '磁场流动图：入口→会议→财位→核心层，并附植物、灯光、色彩调和建议。'
            ]
          },
          {
            key: 'operations',
            dividerTitle: '运营能量周期',
            dividerSubtitle: '时间波动',
            title: '现金流·声量·成长节奏',
            imageLabel: '运营节奏图',
            body: '审视十年运、流年、节气行动窗，掌握资金、人气、成长的时间波。',
            points: [
              '十年运势曲线：刻画长周期兴衰。',
              '年度运势表：12 个月趋势图，标注进攻与收敛月份。',
              '节气关键行动期＋策略建议卡（专业版＋人话版）。'
            ]
          },
          {
            key: 'naming',
            dividerTitle: '企业命名与数理磁场',
            dividerSubtitle: '品牌共振',
            title: '三才五格数理体检',
            imageLabel: '命名数理雷达',
            body: '以三才五格与数字磁场审查企业、品牌及产品名称，确保气场不漏。',
            points: [
              '企业名五格分析表，评估吉凶与稳定性。',
              '品牌数理雷达＋数字吉凶饼图。',
              '电话、账号、IC 数字能量审计；若失衡，提供改名优化建议。'
            ]
          },
          {
            key: 'wealth',
            dividerTitle: '财富流动结构',
            dividerSubtitle: '资源动线',
            title: '看见财富流向',
            imageLabel: '财富流动桑基图',
            body: '用财富能量图呈现资金流、资源配比与再投入效率，让 CFO 快速堵漏。',
            points: [
              '财富桑基图：收入→支出→再投资。',
              '五行财富类型（火=营销、金=金融、水=流通等）。',
              '财富增益建议：结合时间、风水与人事调整。'
            ]
          },
          {
            key: 'fateScore',
            dividerTitle: '企业命格综合评分',
            dividerSubtitle: '四维指数',
            title: '能量 × 时间 × 空间 × 领导',
            imageLabel: '命格评分仪表板',
            body: '提供能量、时间、空间、领导四维度的综合得分与风险提示。',
            points: [
              '能量稳定度雷达、决策协调度矩阵、财富流速图。',
              '风险热力图：宫位得分 0–100。',
              '高风险象限清单，提醒董事会立即处理。'
            ]
          },
          {
            key: 'actionPlan',
            dividerTitle: '行动计划与建议',
            dividerSubtitle: '执行蓝图',
            title: '90 天指挥方案',
            imageLabel: '行动计划时间轴',
            body: '将诊断转化为可执行的分阶段计划，让团队立即动起来。',
            points: [
              '即时（1 周）、30 天、90 天的行动清单。',
              '一年期空间与文化节奏优化指南。',
              '强调紧迫性：审查席位稀缺，请立刻锁定档期。'
            ]
          },
          {
            key: 'references',
            dividerTitle: '典籍与科学依据',
            dividerSubtitle: '经典＋数据',
            title: '正统来源，现代验证',
            imageLabel: '典籍与数据集合',
            body: '列出所引用的玄学经典与现代数据来源，确保每一句建议都有源。',
            points: [
              '典籍： 《渊海子平》《三命通会》《滴天髓》《紫微斗数全书》《青囊经》《葬经》《皇极经世书》。',
              '现代验证：企业分析、资金流数据、ESG 指标等。'
            ]
          }
        ],
        cta: {
          dividerTitle: '掌控企业命格主导权',
          dividerSubtitle: '审查席位每月限额',
          title: '立即启动企业命格审查',
          message: '提交成立信息、领导名单与空间图纸，我们将在 48 小时内回传范围、方案投资与最近档期。',
          primaryLabel: 'Start Corporate Audit → 开启企业审查推演',
          primaryHref: '/contact'
        },
        newsletterTitle: '企业共振快讯',
        newsletterSubtitle: '董事会节律简报、能量诊断与法规气候预警。'
      },
      enterpriseSite: {
        badge: '企业咨询',
        title: '企业选址指挥指挥舱',
        subtitle: '选址需同时吻合地形气场、三元九运与业态用途，方能长久旺运。',
        sections: [
          {
            key: 'purpose',
            dividerTitle: '选址宗旨与范围',
            dividerSubtitle: '为何必须对齐',
            title: '明确审查范畴再动工',
            imageLabel: '选址宗旨图示',
            body: '说明选址为何必须与地形气场、三元九运周期及业态用途匹配。',
            points: [
              '审查范围：由宏观形势到微观室内落位的完整链路。',
              '适用情境：总部、工厂、旗舰店、诊所、数据中心等多种场景。',
              '交付概览：评分表、分层地图、执行路线图。'
            ]
          },
          {
            key: 'clientBrief',
            dividerTitle: '客户与项目概况',
            dividerSubtitle: '使用情境盘点',
            title: '采集完整项目简报',
            imageLabel: '项目简报栅格',
            body: '采集用途、容量、工期与预算，让评估聚焦真实约束。',
            points: [
              '收集公司概况、关键决策者命盘（用于共振落位）。',
              '记录所需 GFA/容积率、开发阶段、租赁或产权偏好、目标开业日期。',
              '输出约束摘要：区分必须条件与可选条件。'
            ]
          },
          {
            key: 'geoIntake',
            dividerTitle: '区域地理采样',
            dividerSubtitle: '候选地导入',
            title: '建立空间底图',
            imageLabel: '区域采样地图',
            body: '导入候选坐标或边界，形成基础空间画布。',
            points: [
              '收集地址、经纬度、地籍图、周边山脉、水系、交通节点。',
              '展示 1/3/5 公里同心圈与 POI 图层（河流、山脊、交通、EMF 来源）。'
            ]
          },
          {
            key: 'macroLandform',
            dividerTitle: '形势龙穴砂水向',
            dividerSubtitle: '宏观气场',
            title: '判定大地气脉',
            imageLabel: '形势草图',
            body: '评断龙脉（山脊）、砂手（环抱）、水法（来去）、明堂与坐向。',
            points: [
              '呈现山脊山谷、明堂开阔度、护砂与暴露程度。',
              '分析来水、回水与去水，并标记水箭等风险。',
              '输出：形势评分（0–100）与风险提示（冲射、割脚水、反弓水）。'
            ]
          },
          {
            key: 'compass',
            dividerTitle: '罗盘与玄空飞星',
            dividerSubtitle: '理气分析',
            title: '定坐向 · 看运盘',
            imageLabel: '玄空罗盘图',
            body: '确定地块坐向并生成运盘，评估山星、水星分布。',
            points: [
              '收集精确朝向角度、当前运期与测量备忘。',
              '绘制九宫飞星图，标注吉凶方位。',
              '输出：各功能分区的用/避建议（大门、财务室、董事室、机房等）。'
            ]
          },
          {
            key: 'cycles',
            dividerTitle: '三元九运周期匹配',
            dividerSubtitle: '运势同调',
            title: '核对地块是否顺运',
            imageLabel: '三元九运矩阵',
            body: '核对地块是否顺应当前运，必要时提出化解建议。',
            points: [
              '呈现旺山旺向、双星到山/向等运盘矩阵。',
              '输出：运势匹配评分与整改建议（如水景、灯光、体量调整）。'
            ]
          },
          {
            key: 'waterLaw',
            dividerTitle: '水法与路水',
            dividerSubtitle: '财气流向',
            title: '把道路当成水口',
            imageLabel: '水法示意图',
            body: '按水法评估来水去水，并将主要道路视作水路。',
            points: [
              '绘制来水/去水动线、路口类型、环岛等。',
              '输出：聚财潜力、泄财点与补救方案。'
            ]
          },
          {
            key: 'microFit',
            dividerTitle: '微观落点适配',
            dividerSubtitle: '地块共振',
            title: '优化入口与动线',
            imageLabel: '地块落位图',
            body: '落位入口、坡道、核心筒、装卸区与垂直交通。',
            points: [
              '确保入口落在吉方，避开煞线与刀锋。',
              '输出：入口/立面微调建议，以及雨棚、花坛、屏风配置。'
            ]
          },
          {
            key: 'functionZoning',
            dividerTitle: '功能分区',
            dividerSubtitle: '五行落位',
            title: '部门与气场匹配',
            imageLabel: '功能分区故事板',
            body: '依据五行需求，将部门落位于合适的吉位。',
            points: [
              '绘制功能分区图：领袖区、财务、销售、研发、仓储、机房、身心健康等。',
              '输出：部门—方位对照表及噪音/热源/电磁隔离建议。'
            ]
          },
          {
            key: 'stakeholders',
            dividerTitle: '关键人气场共振',
            dividerSubtitle: '人地同调',
            title: '安排关键人物座向',
            imageLabel: '共振雷达图',
            body: '将董事及股东命盘与场域方位交叉，给出座向建议。',
            points: [
              '依据个人卦数与用神拟定座位与会议朝向。',
              '输出：高层座位与会议动线方案。'
            ]
          },
          {
            key: 'access',
            dividerTitle: '通达采光风道电磁',
            dividerSubtitle: '工程筛查',
            title: '确保物理条件能承载气场',
            imageLabel: '环境诊断网格',
            body: '从风、光、电磁等工程角度检视气场是否可实现。',
            points: [
              '呈现文丘里风道与死角、自然采光、变电房与基站位置。',
              '输出：缓解清单（挡板、绿墙、屏风、接地等）。'
            ]
          },
          {
            key: 'risks',
            dividerTitle: '风险与红线',
            dividerSubtitle: '致命缺陷扫描',
            title: '提前标记“不可选”项目',
            imageLabel: '风险预警图',
            body: '列出 T 字路冲、尖角冲射、后低前高、水患等致命问题。',
            points: [
              '检查：煞冲、割脚水、棺材煞、楼后急降等。',
              '输出：Red/Amber/Green 风险图与应对方案或“不可选”判定。'
            ]
          },
          {
            key: 'timing',
            dividerTitle: '启动时机（奇门/通胜）',
            dividerSubtitle: '择时策略',
            title: '选好动工与签约吉时',
            imageLabel: '择时矩阵',
            body: '采用奇门遁甲与通胜择定动工、签约、进驻良辰。',
            points: [
              '提供 3–5 个最佳窗口与避讳事项。',
              '输出：仪式与朝向指南。'
            ]
          },
          {
            key: 'compliance',
            dividerTitle: '合规与可行性',
            dividerSubtitle: '现实落地',
            title: '检核法规与后勤',
            imageLabel: '合规检查表',
            body: '对规划管制、公用设施、物流与投入产出进行 sanity check。',
            points: [
              '比对分区限制与预定用途，检视通达、淹水、消防、文资等。',
              '输出：可行性判定（Go / Revise / No-Go）。'
            ]
          },
          {
            key: 'scoring',
            dividerTitle: '综合评分与候选清单',
            dividerSubtitle: '四维加权',
            title: '用形·理·时·用四维评分',
            imageLabel: '综合评分雷达图',
            body: '以形（Form）、理（Compass）、时（Time）、用（Practical）四大面向进行加权评分。',
            points: [
              '呈现雷达或堆叠柱图，附加观察纪录。',
              '输出：Top 1–3 候选地，列出优缺点与必做补救。'
            ]
          },
          {
            key: 'actionPlan',
            dividerTitle: '执行路线图',
            dividerSubtitle: '行动分阶段',
            title: 'Now / 30 Days / 90 Days 行动表',
            imageLabel: '行动蓝图故事板',
            body: '列出立即、30 天、90 天需完成的关键调整。',
            points: [
              '提供图纸标注、家具/景观配置、承包商说明要点。'
            ]
          },
          {
            key: 'documentation',
            dividerTitle: '文献与口径',
            dividerSubtitle: '依据有源',
            title: '经典＋测量标准',
            imageLabel: '文档堆栈示意',
            body: '列出所依据的经典与测量口径，确保报告可追溯。',
            points: [
              '典籍含《青囊经》《葬经》《撼龙经》《地理人子须知》《玄空飞星》体系。',
              '同步提供测量标准、仪器校准与输出格式说明。'
            ]
          }
        ],
        cta: {
          dividerTitle: '准备评估候选地了吗？',
          dividerSubtitle: '获取企业选址蓝图',
          title: '提交候选地资料',
          message: '上传 KML、CSV 与项目简报，我们将在五个工作日内生成形势与飞星资料。',
          primaryLabel: '上传 Site KML/CSV',
          primaryHref: '/contact',
          secondaryLabel: '提交候选地 → 生成报告',
          secondaryHref: '/contact'
        },
        newsletterTitle: '选址情报简报',
        newsletterSubtitle: '地图、择时与分区洞察，助力企业扩张。'
      },
enterpriseCycles: {
        badge: '企业咨询',
        title: '策略与周期指挥套件',
        subtitle: '万事皆有周期，掌握节律，方能乘势而为。',
        sections: [
          {
            key: 'introduction',
            dividerTitle: '概述',
            dividerSubtitle: '节律决定成败',
            title: '乘势而为的时间学',
            imageLabel: '周期概述故事板',
            body: '万事皆有周期。我们把真太阳时、三元九运与企业战略交织，确保每一步动作踩在顺势节拍上。',
            points: [
              '排版采用 Noto Sans CJK，强调执行简报的清晰与稳重。',
              '周期折线图（人工数据）展示历史共振窗口。',
              '交付物包含高层简报、战术剧本与节奏仪表板。'
            ]
          },
          {
            key: 'macroStructure',
            dividerTitle: '时间总结构',
            dividerSubtitle: '天地人三才架构',
            title: '构建时间母盘',
            imageLabel: '宏周期轮盘（人工）',
            body: '整合真太阳时、三元九运与企业里程碑，定位加速、收敛与防守的最佳时点。',
            points: [
              '季节轮盘标示全年气场强弱。',
              '叠合财季、产品节奏与监管窗口。',
              '情境切换展示不同节奏组合下的影响。'
            ]
          },
          {
            key: 'strategicAlignment',
            dividerTitle: '战略节律校准',
            dividerSubtitle: '目标同步',
            title: '战略与节奏同频',
            imageLabel: '战略对齐雷达图（人工）',
            body: '重新校准战略优先级、资本流与人力动能，避免战略偏离时间母盘。',
            points: [
              '雷达图比较现况与目标对齐度。',
              '跨部门工作坊将玄学洞见转译为 OKR。',
              '决策备忘录标注重大行动的放行与暂停条件。'
            ]
          },
          {
            key: 'annualCycle',
            dividerTitle: '年度战略周期',
            dividerSubtitle: '年度节奏',
            title: '编排年度主线',
            imageLabel: '年度周期折线图（人工）',
            body: '规划全年关键行动：上市、审核、资本动作与文化节点均匹配旺气窗口。',
            points: [
              '季节折线图呈现十二个月能量振幅。',
              '季度简报提供预防性清单与守护重点。',
              '与预算与董事会汇报节奏无缝整合。'
            ]
          },
          {
            key: 'monthlyRhythm',
            dividerTitle: '月度与节气节律',
            dividerSubtitle: '月令与节气',
            title: '把握月令节拍',
            imageLabel: '节气轮图（人工）',
            body: '围绕节气与月令安排人力排班、营销与风险控管。',
            points: [
              '季节轮图标示每个节气的主轴与禁忌。',
              '周、日操作脚本提示启用、守势与回补时段。',
              '对冲个人或市场气场冲突的提醒机制。'
            ]
          },
          {
            key: 'microCycles',
            dividerTitle: '微周期与奇门布局',
            dividerSubtitle: '日时级部署',
            title: '微周期作战手册',
            imageLabel: '奇门热力图（人工）',
            body: '以奇门遁甲指引日时级决策，涵盖谈判、危机处置与高层简报。',
            points: [
              '热力图呈现关键时段的行动优先级。',
              '部署、观望、撤退的日程模板一应俱全。',
              '整合数位行事历与提醒系统，实时推送。'
            ]
          },
          {
            key: 'crossMapping',
            dividerTitle: '周期交叉映射',
            dividerSubtitle: '多维联动',
            title: '交叉映射带来确定性',
            imageLabel: '周期矩阵故事板（人工）',
            body: '对齐宏观、中观、微观周期，提前曝光冲突并制定化解方案。',
            points: [
              '周期矩阵仪表板让高层快速掌握对齐度。',
              '周期冲突的优先处理流程与决策准则。',
              '版本化时间轴管理，确保持份者同步更新。'
            ]
          },
          {
            key: 'industryWealth',
            dividerTitle: '行业与财富周期',
            dividerSubtitle: '外部节奏',
            title: '行业财富同步情报',
            imageLabel: '五行元素柱状图（人工）',
            body: '将行业、资本市场与企业五行结构比对，掌握扩张、收购或防守的最佳窗口。',
            points: [
              '元素柱状图追踪产业气场与企业命盘的匹配度。',
              '提供募资、并购或防御性布局的先行指标。',
              '投资者与财务团队的策略简报同步完成。'
            ]
          },
          {
            key: 'strategyFormulation',
            dividerTitle: '战略推演与执行',
            dividerSubtitle: '从洞见到执行',
            title: '打造战备级战略蓝图',
            imageLabel: '战略推演故事板',
            body: '将时间情报转化为可执行计划，明确责任、预算与监控机制。',
            points: [
              '决策树框架把时间节点对应到策略选项。',
              '雷达图追踪资源配置与周期需求的平衡度。',
              '变革管理模块协助团队随节奏快速调整。'
            ]
          },
          {
            key: 'references',
            dividerTitle: '典籍与算法依据',
            dividerSubtitle: '学术根基',
            title: '经典文献支撑',
            imageLabel: '参考典籍示意',
            body: '详尽列出经典典籍、天文数据与运算模型，确保分析可追溯。',
            points: [
              '《黄帝内经》、通胜、三元九运经典与奇门遁甲全书。',
              '现代参考：NASA 星历、财经周期研究、昼夜节律领导力论文。',
              '附录说明运算流程与验证记录。'
            ]
          }
        ],
        cta: {
          dividerTitle: '掌握时间主导权',
          dividerSubtitle: '预约策略节奏审查',
          title: '开启策略周期推演',
          message: '提交企业年历、战略重点与利益相关者名单，我们将在三个工作日内回传范围与资料需求。',
          primaryLabel: 'Start Strategy Cycle Analysis｜开启策略周期推演',
          primaryHref: '/contact'
        },
        newsletterTitle: '周期情报快讯',
        newsletterSubtitle: '专属折线、雷达、轮盘与柱状洞察，服务董事会节奏管理。'
      },
      celestialNumbers: {
        badge: '帝师神数',
        title: '皇极天数至尊神谕',
        subtitle: '重启皇极神数，把天文、历法、数理与命理合一，掌控帝王级的节律推演。',
        sections: [
          {
            key: 'introduction',
            dividerTitle: '概述',
            dividerSubtitle: '皇极神数的源起',
            title: '天文数术的帝师圣典',
            imageLabel: '金色同心周期螺旋＋星河背景',
            body: '皇极神数源自宋·邵雍《皇极经世书》，是集天文、历法、数理与命理于一体的最高数术，推演天运与人运的周期律，洞见王朝、国家、企业与个体的兴衰。',
            points: [
              '历史根基：宋·邵雍《皇极经世书》。',
              '核心法则：数以理推，理以时演 —— 数定义秩序，时决定变易。',
              '视觉规范：金色螺旋配深蓝星云光晕，呈现帝师仪式感。'
            ]
          },
          {
            key: 'cosmicFramework',
            dividerTitle: '宇宙时序架构',
            dividerSubtitle: '天地人三才同运',
            title: '宏·中·微三重时间母盘',
            imageLabel: '三层同心时间矩阵',
            body: '天地人三才同运，周期相贯：天运主势，地运主场，人运主应。皇极构建三层时间母盘，让战略动作与节律完全同步。',
            points: [
              '三重矩阵：天运（三元九运 180/20 年）、地运（区域地理与社会脉动）、人运（十年大运＋流年）。',
              '专业图表视觉：三环时间轮，外环天运、中环地运、内环人运。',
              '交付：宏–中–微同步指数表，附高层注解。'
            ]
          },
          {
            key: 'numericalLaw',
            dividerTitle: '皇极数理法则',
            dividerSubtitle: '数即气，数可通天',
            title: '以数推理，以时演变',
            imageLabel: '皇极数螺旋＋阴阳平衡条',
            body: '皇极神数将数字视为活的能量，结合一十天数与六十甲子，推演时间、空间与人的共振。',
            points: [
              '核心公式：神数指数 = (天数 × 地数 × 人数) ÷ 时间位。',
              '数理层级：元数（宇宙本源振动）、运数（时间波强度）、应数（个体共振）。',
              '图表：专业图表皇极数螺旋图＋阴阳平衡条形图。',
            ]
          },
          {
            key: 'cycleInterpretation',
            dividerTitle: '周期推演与应象',
            dividerSubtitle: '识进退之机',
            title: '洞悉盛衰转折',
            imageLabel: '皇极周期波形＋运势弧线',
            body: '沿着皇极数运行，可测盛衰消长、气运转折，判定何时进攻、何时守成。',
            points: [
              '十年周期波：观人生与企业长河节拍。',
              '年度能量流：定位年度兴衰节点与执行要点。',
              '节令转折：四季五行旺衰规划季度校正。',
              '视觉：专业图表皇极周期波图（折线）＋运势弧线图，附开运期/逆势期标注。'
            ]
          },
          {
            key: 'strategicApplication',
            dividerTitle: '战略应用',
            dividerSubtitle: '知天时·用天时',
            title: '把节律化为战术',
            imageLabel: '天地人策略矩阵故事板',
            body: '择时开业、迁移、谈判、疗愈都需顺势而为。皇极将节律洞见转化为可执行的时间表与策略矩阵。',
            points: [
              '行动择时表：以元素映射最佳月/日，专业图表热力图呈现。',
              '天地人三才策略矩阵：目标、资源、气场三位一体。',
              '行业五行映射：金融=金、科技=火、教育=木、建筑=土、物流=水。',
              '交付：策略路线图 PDF＋双语解读（专业版＋通俗版）。'
            ]
          },
          {
            key: 'references',
            dividerTitle: '典籍与传承',
            dividerSubtitle: '经典＋现代校准',
            title: '有根有据的帝师密学',
            imageLabel: '经典卷轴与现代数据阵列',
            body: '以正统典籍为根、以现代天文数据为证，确保推演可追溯、可验证。',
            points: [
              '典籍： 《皇极经世书》《皇极系述》《皇极推命真诀》《皇极与奇门遁甲合参》《皇极与风水周期法》《协纪辨方书》《易传》《河图洛书》《梅花易数》。',
              '现代验证：中国国家天文台、台湾万年历、真太阳时、NASA JPL 星历数据。',
              '附录：专业图表生成脚本与验证日志，确保数据透明。'
            ]
          }
        ],
        cta: {
          dividerTitle: '准备掌控皇极周期？',
          dividerSubtitle: '预约帝师级数理推演',
          title: '开启皇极推演',
          message: '提供战略重心、关键人员与目标时间轴，我们将在三个工作日内回传皇极天数推演方案。',
          primaryLabel: 'Start Huangji Calculation｜开启皇极推演',
          primaryHref: '/contact'
        },
        newsletterTitle: '皇极周期简报',
        newsletterSubtitle: '螺旋、能量波与阴阳平衡图，为董事会与内阁提供节律情报。'
      },
    },
    hero: {
      slide1_title: '天命蓝图 · VIP 专属',
      slide1_sub: '从四柱到星曜，从数字到卦象，一次尽览命理全图',
      slide2_title: '天机三绝 · 皇极·太乙·六壬',
      slide2_sub: '古代帝王的终极战略推演术数',
      slide3_title: '空间能量布阵',
      slide3_sub: '古老空间智慧，成就现代高峰',
      slide4_title: '三才命格蓝图 · 易经能量矩阵',
      slide4_sub: '以天人地三才与易数能量，解锁姓名与命运奥秘',
      slide5_title: '企业命运蓝图 · 商机矩阵',
      slide5_sub: '融合八字、紫微、奇门、风水，助力企业腾飞'
    },
  },
}
dictionary.EN.who = { title: dictionary.EN.who_title, body: dictionary.EN.who_long }
dictionary.EN.why = { title: dictionary.EN.why_title, long: dictionary.EN.why_long }
dictionary.CN.who = { title: dictionary.CN.who_title, body: dictionary.CN.who_long }
dictionary.CN.why = { title: dictionary.CN.why_title, long: dictionary.CN.why_long }

// About page content (EN)
dictionary.EN.about = {
  hero: {
    title: 'About Metaphysics Alliance',
    sub: 'Chinese metaphysics for decisive clarity',
    description: 'We provide a 360° view across BaZi, Zi Wei Dou Shu, Qi Men Dun Jia, Feng Shui and numerology, cross‑validating insights for consistent, practical guidance. Our aim: exceptional consistency through disciplined verification.',
    cta: 'Contact Us'
  },
  founder: {
    title: "Founder's Note",
    name_en: 'Shaun Quan',
    name_cn: '宸麟老师',
    role: 'Chief Chinese Metaphysician Analyst',
    paragraphs: [
      'I founded Metaphysics Alliance to bring clarity and momentum to personal and business decisions. We translate classical Chinese metaphysics into timely, actionable guidance that respects tradition and meets modern standards.',
      'Every engagement triangulates multiple lineages and is anchored to True Solar Time and the 24 Solar Terms. We cross‑check against authoritative calendars and corroborate patterns across methods. The goal is simple: reduce noise, reveal signal, and help you move forward with confidence.'
    ]
  },
  philosophy: {
    title: '360° Cross‑Validated Chinese Metaphysics',
    highlight: 'Triangulate → Cross‑validate → Decide with timing',
    paragraphs: [
      'We synthesise BaZi, Zi Wei, Qi Men, Feng Shui and numerology. Recommendations are never based on a single method; patterns must repeat under multiple lenses.',
      'Time matters. All assessments are calibrated with True Solar Time and the 24 Solar Terms, then aligned to practical timing windows for action.'
    ]
  },
  what: {
    title: 'What We Do',
    items: [
      { title: 'For Individuals', description: 'Career and business direction, relationship clarity, and timing windows — distilled into a concise action plan.' },
      { title: 'For Organizations', description: 'Team dynamics, leadership alignment, site and launch timing, and risk windows for SMEs and growth teams.' },
      { title: 'Method', description: 'Assess → Align → Activate. Readings, cross‑validation, and a timing layer to choose when to act.' }
    ]
  },
  videos: {
    title: '1‑Minute Intros',
    items: [
      {
        title: 'Shaun — 60s Intro',
        description: 'Why Chinese metaphysics, our 360° approach, and who benefits.',
        script_en: "I’m Shaun Quan, founder of Metaphysics Alliance. We exist to bring clarity and momentum to life and business decisions. Our approach blends BaZi, Zi Wei, Qi Men, Feng Shui and numerology, and cross‑validates insights across methods for a 360° perspective. For individuals, that means clearer choices about career, relationships and timing. For organizations, it means sharper team alignment and better strategic timing. We aim for extraordinary consistency through multiple lenses and disciplined verification — so you can move forward with confidence.",
        script_cn: '我是宸麟老师，Metaphysics Alliance 创始人。我们的使命，是为个人与企业的关键决策带来清晰与推动力。我们融合八字、紫微、奇门、风水与数字能量，并通过交叉验证获得 360° 全景视角。对个人，这意味着职业、关系与时机更明晰；对企业，这意味着团队协同更到位、战略时机更精准。通过多重视角与严谨验证，我们力求高度一致的洞见，助你笃定前行。'
      },
      {
        title: 'Consultant — 60s Intro',
        description: 'How sessions become next steps: triangulation and timing.',
        script_en: 'My focus is translating complex patterns into practical next steps. In sessions, we triangulate: a primary reading, a secondary lens to confirm patterns, and a timing layer to choose when to act. You leave with a plan: what to prioritise, what to pause, and what to watch.',
        script_cn: '我们把复杂的信息转化为清晰的下一步。在咨询中进行三角验证：主阅读确定主题，辅阅读确认模式，配合时机层决定何时行动。你将带走明确的行动清单：先做什么、暂停什么、留意什么。'
      },
      {
        title: 'Consultant — 60s Teams & Business',
        description: 'Individuals vs. organizations, and how we reduce noise.',
        script_en: 'I work with both individuals and teams. For individuals, we map strengths, blind spots and near‑term windows for momentum. For organizations, we analyse team dynamics and strategic timing across product cycles, hiring and launches. Our cross‑validated process reduces noise and surfaces what consistently matters, so decisions feel grounded and timely.',
        script_cn: '我们同时服务个人与企业。对个人，梳理优势、盲区与近期可乘之势；对企业，从团队协同与战略节奏入手，覆盖产品周期、用人与发布时机。通过交叉验证，尽量降低噪音、沉淀稳定要点，让决策更扎实、更合时。'
      }
    ]
  },
  story: {
    title: 'Our Story',
    timeline: [
      { date: '2023‑03', title: 'Founded', outcome: 'First 50 clients served' },
      { date: '2023‑09', title: 'Corporate Advisory Pilot', outcome: 'Improved team alignment outcomes' },
      { date: '2024‑02', title: 'Bilingual Practice', outcome: 'Launched EN/CN services; 200+ clients supported' },
      { date: '2024‑06', title: 'SME Workshops', outcome: 'Delivered 3 workshops; faster decision lead‑time' },
      { date: '2024‑10', title: 'Cross‑Validation v2', outcome: 'Tighter timing recommendations' },
      { date: '2025‑03', title: '500+ Clients', outcome: 'Expanded B2B programs across 3 industries' }
    ]
  },
  milestones: {
    title: 'Milestones',
    items: [
      { date: '2023-03', outcome: 'Metaphysics Alliance founded; first 50 clients', icon: 'FiFlag' },
      { date: '2023-09', outcome: 'First corporate advisory pilot', icon: 'FiUsers' },
      { date: '2024-02', outcome: 'EN/CN services; 200+ clients', icon: 'FiGlobe' },
      { date: '2024-06', outcome: '3 SME workshops; improved lead-time', icon: 'FiVideo' },
      { date: '2024-10', outcome: 'Cross-validation framework v2', icon: 'FiLayers' },
      { date: '2025-03', outcome: '500+ clients; expanded B2B', icon: 'FiCheckCircle' }
    ]
  },
  team: {
    title: 'Our Team',
    members: [
      { name_en: 'Shaun Quan', name_cn: '宸麟老师', role: 'Chief Chinese Metaphysician Analyst', focus: 'BaZi • Zi Wei • Qi Men • Feng Shui | Strategy & Timing', portrait: '/images/team/Shaun Quan.png' },
      { name_en: 'Mei Lin Tan', name_cn: '陈美琳老师', role: 'Senior Consultant — BaZi • Qi Men • Date Selection', focus: 'Professionals & SMEs; career transitions and launch timing', portrait: '/images/team/Tan Mei Ling.png' },
      { name_en: 'Daniel Lee', name_cn: '李文杰老师', role: 'Feng Shui Strategist & BaZi Advisor', focus: 'Residential/Commercial Feng Shui; site and opening timing', portrait: '/images/team/Danial.png' }
    ]
  },
  faq: {
    title: 'FAQ',
    items: [
      { q: 'How long is a session?', a: 'Typically 60-90 minutes for individuals; 90-120 minutes for teams.' },
      { q: 'How should I prepare?', a: 'Share your birth details, goals and current decisions; we will guide the rest.' },
      { q: 'Do you guarantee accuracy?', a: 'We aim for exceptional consistency via cross-validation and disciplined timing, but no outcome can be guaranteed.' },
      { q: 'Do you offer bilingual sessions?', a: 'Yes - English and Chinese.' },
      { q: 'How do I start?', a: 'Contact us to book a discovery call.' }
    ]
  },
  cta: { label: 'Contact Us', title: 'Ready to get clarity?', message: 'Share your goals and timing horizon. We will propose a path and schedule a discovery call.' }
};
dictionary.EN.legal = {
  privacy: {
    title: 'Privacy Policy',
    last_updated: 'October 19, 2025',
    intro: 'This notice explains how Metaphysics Alliance collects, uses, stores, and shares personal data across consultations, audits, events, and digital products. It also summarises the rights available to you under the Personal Data Protection Act 2010 (Malaysia).',
    downloadUrl: '/privacy-policy.pdf',
    summary: [
      {
        title: 'Coverage',
        description: 'Applies to clients, prospects, workshop participants, and visitors engaging with Metaphysics Alliance services, reports, events, and digital platforms.',
      },
      {
        title: 'Regulation',
        description: 'We comply with the Personal Data Protection Act 2010 (Malaysia) and honour contractual commitments for cross-border engagements.',
      },
      {
        title: 'Support',
        description: 'Direct privacy questions to <a href="mailto:privacy@meta-alliance.my">privacy@meta-alliance.my</a>. Critical incidents are escalated within 24 hours.',
      },
    ],
    sections: [
      {
        heading: '1. Who we are & scope',
        intro: 'Metaphysics Alliance (meta-alliance.my) is the data controller for personal data we collect when you interact with our team, receive services, purchase digital products, or visit our sites.',
        items: [
          {
            title: 'When we act as controller',
            description: 'We determine the purpose and means of processing when you submit data through enquiry forms, booking requests, payments, events, or audits that we initiate. We decide how long that data is retained and which safeguards apply.',
          },
          {
            title: 'When we act as processor',
            description: 'For enterprise engagements we may handle staff or customer data supplied by you. We only use that information to deliver the contracted work, follow your documented instructions, and delete or return the data once the work concludes.',
          },
        ],
        note: 'By engaging us you confirm that any third-party data you supply was collected lawfully and that you have authority to share it.',
      },
      {
        heading: '2. Personal data we collect',
        intro: 'We operate on the principle of data minimisation—collecting only what is required to deliver accurate readings, audits, and support.',
        items: [
          {
            title: 'Identity & contact details',
            description: 'Name, preferred honorific, email, phone number, company information, billing address, and communication preferences.',
          },
          {
            title: 'Consultation inputs',
            description: 'Birth details (date, time, place), floor plans, team structures, business metrics, questionnaires, and other materials you provide so that we can perform calculations and design recommendations.',
          },
          {
            title: 'Operational & transaction data',
            description: 'Service history, booking information, invoices, payment confirmations (processed via secure gateways), support enquiries, session notes, and follow-up actions.',
          },
          {
            title: 'Website & systems data',
            description: 'Language preference cookies, device metadata, and anonymised analytics generated through privacy-filtered tools. We do not run behavioural advertising or sell your browsing history.',
          },
        ],
        note: 'Where sensitive personal data (for example, health indicators or family circumstances) is relevant to your consultation, we rely on your explicit consent and restrict internal access to authorised consultants only.',
      },
      {
        heading: '3. How we use personal data',
        intro: 'We rely on contract performance, legitimate interests, legal obligations, and consent (where required) to process personal data.',
        items: [
          {
            title: 'Deliver readings, audits, and programmes',
            description: 'Preparing charts, analytics, written reports, digital dashboards, and briefings; scheduling sessions; tailoring recommendations to your objectives.',
            legal: 'Legal basis: contract performance & legitimate interests.',
          },
          {
            title: 'Client support & communications',
            description: 'Responding to enquiries, sharing progress updates, sending resource materials, and providing post-engagement follow-up when you request it.',
            legal: 'Legal basis: legitimate interests & consent (for optional updates).',
          },
          {
            title: 'Operations & finance',
            description: 'Billing, accounting, record keeping, fraud prevention, and verifying identity or authority where mandated.',
            legal: 'Legal basis: legal obligation & legitimate interests.',
          },
          {
            title: 'Compliance & risk management',
            description: 'Investigating complaints, enforcing agreements, protecting intellectual property, and responding to lawful requests from authorities.',
            legal: 'Legal basis: legal obligation & legitimate interests.',
          },
        ],
      },
      {
        heading: '4. Retention & security',
        intro: 'We maintain structured retention schedules so data is stored only for as long as it remains useful or legally required.',
        items: [
          {
            title: 'Retention windows',
            description: 'Core client files and invoices are stored for seven (7) years to satisfy PDPA and accounting requirements. Prospect enquiries with no follow-up are deleted after 18 months. Raw analysis inputs—floor plans, spreadsheets, recordings—are purged within 90 days of project sign-off unless you request an extended archive.',
          },
          {
            title: 'Security controls',
            description: 'Safeguards include encrypted storage, role-based access, secure portals for large files, mandatory confidentiality agreements, and annual security reviews with documented remediation plans.',
            bullets: [
              'Production systems are hosted in ISO 27001-certified environments.',
              'Portable devices are protected with full-disk encryption and biometric access.',
              'Data shared with consultants uses expiring links or vetted collaboration suites.',
            ],
          },
        ],
      },
      {
        heading: '5. Sharing & international transfers',
        intro: 'We never sell personal data. Transfers occur only when necessary to deliver services or comply with the law.',
        items: [
          {
            title: 'Vetted processors',
            description: 'We engage payment gateways, secure cloud storage, analytics, transcription, and communication providers located in Malaysia, Singapore, or jurisdictions with comparable safeguards. Each provider signs a PDPA-aligned data processing agreement.',
          },
          {
            title: 'Cross-border processing',
            description: 'When tools process data outside Malaysia, we ensure contractual clauses mandate equivalent protection and enable audits if required.',
          },
        ],
        bullets: [
          'We disclose personal data when compelled by law, court order, or governmental authority, and we document each disclosure.',
          'If Metaphysics Alliance undergoes a merger or acquisition, you will be notified before data is transferred and given the opportunity to opt out where applicable.',
        ],
      },
      {
        heading: '6. Your rights & preferences',
        columns: [
          {
            title: 'You may exercise the following rights:',
            points: [
              'Request access to the personal data we hold about you.',
              'Ask for corrections to inaccurate or incomplete data.',
              'Withdraw consent to non-essential processing and opt out of marketing messages at any time.',
              'Request deletion or anonymisation, subject to legal retention requirements.',
              'Request a portable copy of data you provided to us.',
            ],
          },
          {
            title: 'How to submit a request:',
            points: [
              'Email <a href="mailto:privacy@meta-alliance.my">privacy@meta-alliance.my</a> with the subject line “PDPA Request” and specify the right you wish to exercise.',
              'We acknowledge requests within one (1) business day and provide a full response within five (5) business days, or explain if we require additional time (maximum 21 days allowed by PDPA).',
              'We may request proof of identity or authority to protect your data from wrongful disclosure.',
              'If we must retain certain records for legal reasons, we will explain the rationale and confirm once retention obligations expire.',
            ],
          },
        ],
        note: 'Marketing emails include an unsubscribe link. WhatsApp broadcasts and community groups are invitation-only and require explicit opt-in.',
      },
      {
        heading: '7. Updates to this notice',
        bullets: [
          'We review and update this policy whenever we launch new services, adopt new data processors, or change how we use personal data.',
          'Material changes will be announced on meta-alliance.my/legal/privacy and, where applicable, communicated directly to active clients.',
        ],
      },
    ],
    contact: {
      name: 'Data Protection Lead, Metaphysics Alliance',
      email: 'privacy@meta-alliance.my',
      phone: '+60 16-587-3141',
      hours: 'We acknowledge all privacy requests within 24 hours and aim to resolve them within five business days.',
      address: 'Metaphysics Alliance\nMenara Mitraland, 13A Jalan PJU 5/1\nKota Damansara, 47810 Petaling Jaya\nSelangor, Malaysia.',
    },
  },
};
// About page content (CN)
dictionary.CN.about = {
  hero: {
    title: '关于 Metaphysics Alliance',
    sub: '以中国玄学，助你做出清晰决策',
    description: '整合八字、紫微斗数、奇门遁甲、风水与数字能量，以交叉验证获得 360° 全景洞见；以严谨校准追求高度一致与可执行性。',
    cta: '联系我们'
  },
  founder: {
    title: '创始人寄语',
    name_en: 'Shaun Quan',
    name_cn: '宸麟老师',
    role: '首席中国玄学分析师',
    paragraphs: [
      '创立 Metaphysics Alliance，只为将玄学真正用于关键抉择：既尊重传统根基，也符合当下的节奏与标准。我们把复杂的盘局化为清晰的行动指引，让个人与企业都能更快更稳地向前。',
      '每一次服务都以真太阳时与二十四节气为基准，并参考权威历法校验；同时以多流派交叉验证，确保模式在不同视角下仍然成立。目标很简单：降低噪音、沉淀要点，使你在确定与从容中前进。'
    ]
  },
  philosophy: {
    title: '360° 交叉验证的中国玄学',
    highlight: '三角验证 → 交叉确认 → 把握时机',
    paragraphs: [
      '我们综合八字、紫微、奇门、风水与数字能量；结论绝非单一方法，而是多视角反复印证后的稳定共识。',
      '时间是关键。所有评估均以真太阳时与二十四节气校准，再落到可执行的行动窗口。'
    ]
  },
  what: {
    title: '我们的服务',
    items: [
      { title: '面向个人', description: '职业方向、事业布局、关系澄清与行动时机——最终汇总为清晰可行的计划。' },
      { title: '面向企业', description: '团队协同、领导力匹配、选址与发布时机——适用于中小企业与增长型团队。' },
      { title: '方法论', description: '评估 → 对齐 → 行动。盘面阅读、交叉验证，并叠加时机层选择“何时出手”。' }
    ]
  },
  videos: {
    title: '1 分钟团队介绍',
    items: [
      { title: '宸麟老师 — 60 秒', description: '为什么选择中国玄学、我们的 360° 方法与受益人群。' },
      { title: '资深顾问 — 60 秒', description: '从三角验证到行动时机，如何把洞见落地。' },
      { title: '企业与团队 — 60 秒', description: '个人与企业的差异，以及如何降低噪音、提升一致性。' }
    ]
  },
  story: {
    title: '成长历程',
    timeline: [
      { date: '2023‑03', title: '成立', outcome: '完成首批 50 位客户服务' },
      { date: '2023‑09', title: '企业顾问试点', outcome: '团队协同指标显著提升' },
      { date: '2024‑02', title: '双语化实践', outcome: '上线中英双语；累计 200+ 客户' },
      { date: '2024‑06', title: '中小企工作坊', outcome: '举办 3 场；决策前置期缩短' },
      { date: '2024‑10', title: '交叉验证 2.0', outcome: '时机建议更为精细' },
      { date: '2025‑03', title: '服务 500+ 客户', outcome: 'B2B 项目覆盖 3 个行业' }
    ]
  },
  milestones: {
    title: '里程碑',
    items: [
      { date: '2023‑03', outcome: '公司成立；首批 50 位客户' },
      { date: '2023‑09', outcome: '完成首次企业顾问试点' },
      { date: '2024‑02', outcome: '上线中英双语；200+ 客户' },
      { date: '2024‑06', outcome: '举办 3 场工作坊；效率提升' },
      { date: '2024‑10', outcome: '交叉验证框架 2.0' },
      { date: '2025‑03', outcome: '服务突破 500+；拓展 B2B' }
    ]
  },
  team: {
    title: '团队',
    members: [
      { name_en: 'Shaun Quan', name_cn: '宸麟老师', role: '首席中国玄学分析师', focus: '八字 • 紫微 • 奇门 • 风水｜战略与时机', portrait: '/images/team/Shaun Quan.png' },
      { name_en: 'Mei Lin Tan', name_cn: '陈美琳老师', role: '资深顾问 — 八字 • 奇门 • 择日', focus: '职场与中小企业；转型与发布时机', portrait: '/images/team/Tan Mei Ling.png' },
      { name_en: 'Daniel Lee', name_cn: '李文杰老师', role: '风水战略顾问 & 八字顾问', focus: '住宅/商业风水；选址与开业时机', portrait: '/images/team/Danial.png' }
    ]
  },
  faq: {
    title: '常见问题',
    items: [
      { q: '单次时长？', a: '个人 60–90 分钟；团队/企业 90–120 分钟。' },
      { q: '如何准备？', a: '准备出生信息、目标与当前决策；其余由我们引导。' },
      { q: '是否保证准确率？', a: '我们以交叉验证和时机校准追求高度一致，但任何结果不作保证。' },
      { q: '是否支持双语？', a: '支持中英双语。' },
      { q: '如何开始？', a: '联系预约体验咨询或沟通需求。' }
    ]
  },
  cta: { label: '联系我们', title: '准备开始？', message: '告诉我们你的目标与时间规划。我们会提供路线建议并安排首次沟通。' }

};

dictionary.CN.legal = {
  privacy: {
    title: '隐私政策',
    last_updated: '2025年10月19日',
    intro: '本政策阐述 Metaphysics Alliance 在咨询、审计、课程与数字产品中的个人数据收集、使用、保存和分享方式，并说明您在马来西亚《2010 年个人数据保护法》（PDPA）下的权利。',
    downloadUrl: '/privacy-policy-cn.pdf',
    summary: [
      {
        title: '适用范围',
        description: '适用于与 Metaphysics Alliance 互动的客户、潜在客户、课程学员、活动参与者以及访问 meta-alliance.my 的访客。'
      },
      {
        title: '合规标准',
        description: '遵循马来西亚《2010 年个人数据保护法》，并履行跨境合作的合同义务与安全条款。'
      },
      {
        title: '支援窗口',
        description: '隐私问题请发邮件至 <a href="mailto:privacy@meta-alliance.my">privacy@meta-alliance.my</a>；重大事件将在 24 小时内升级处理。'
      }
    ],
    sections: [
      {
        heading: '1. 我们的角色与适用范围',
        intro: 'Metaphysics Alliance（meta-alliance.my）在咨询、审计、活动及数字平台收集的个人数据上承担数据控制者角色。',
        items: [
          {
            title: '当我们是数据控制者',
            description: '当您通过咨询表单、预约、付款、活动或由我们发起的审计提交资料时，我们决定处理目的与方式，并设定保留期限及安全措施。'
          },
          {
            title: '当我们是数据处理者',
            description: '企业项目中，如您向我们提供员工或客户数据，我们仅按合同与书面指示处理，并在项目结束后删除或归还相关资料。'
          }
        ],
        note: '向我们提供第三方资料时，请确保该资料是合法收集并且您具有分享授权。'
      },
      {
        heading: '2. 我们收集的个人数据',
        intro: '我们遵循“数据最小化”原则，仅收集完成服务所需的信息。',
        items: [
          {
            title: '身份与联系信息',
            description: '姓名、称谓、邮箱、电话、公司信息、账单地址及沟通偏好等基本资料。'
          },
          {
            title: '咨询所需资料',
            description: '出生日期、时间、地点，平面图、团队结构、业务指标、问卷，以及为完成分析而提供的其他材料。'
          },
          {
            title: '运营与交易记录',
            description: '服务历史、预约信息、发票、付款确认（由安全通道处理）、咨询记录及后续跟进。'
          },
          {
            title: '网站与系统数据',
            description: '语言偏好 Cookie、设备元数据、匿名化分析数据。我们不进行行为广告，也不会出售浏览记录。'
          }
        ],
        note: '若服务需要处理敏感个人数据（如健康状况、家庭信息），我们会事先征得您的明确同意，并仅允许相关顾问访问。'
      },
      {
        heading: '3. 数据使用目的',
        intro: '我们依据合同履行、合法利益、法律义务及（如需）您的同意来处理数据。',
        items: [
          {
            title: '交付咨询、审计与方案',
            description: '用于绘制命盘、分析、撰写报告、准备简报、安排会议，并根据目标定制建议。',
            legal: '法律依据：合同履行 + 合法利益。'
          },
          {
            title: '客户沟通与支持',
            description: '回应咨询、汇报进度、发送资源资料，以及在您要求时提供后续支持。',
            legal: '法律依据：合法利益 + 同意（适用于可选更新）。'
          },
          {
            title: '运营与财务管理',
            description: '账务、会计、记录保存、防范欺诈，以及在需要时核实身份或授权。',
            legal: '法律依据：法律义务 + 合法利益。'
          },
          {
            title: '合规与风险管理',
            description: '调查投诉、执行协议、保护知识产权，并回应主管机关的合法要求。',
            legal: '法律依据：法律义务 + 合法利益。'
          }
        ]
      },
      {
        heading: '4. 数据保留与安全',
        intro: '我们设有保留周期，确保数据仅在必要期限内存放。',
        items: [
          {
            title: '保留期限',
            description: '核心客户文件与发票保留七（7）年以符合法规；无后续接触的潜在客户资料在 18 个月后删除；原始分析素材（平面图、表格、录音）于项目验收后 90 天内清除，除非您要求延长存档。'
          },
          {
            title: '安全控制',
            description: '我们实施加密存储、分级权限、安全传输及年度安全审查，并记录整改计划。',
            bullets: [
              '生产环境托管于通过 ISO 27001 认证的平台。',
              '移动设备启用全盘加密与生物识别访问。',
              '与顾问共享资料时使用限时链接或受控协作工具。'
            ]
          }
        ]
      },
      {
        heading: '5. 数据共享与跨境传输',
        intro: '我们不会出售个人数据，仅在履约或符合法律要求时共享。',
        items: [
          {
            title: '受信的数据处理方',
            description: '支付通道、云端存储、分析、转录与通讯供应商位于马来西亚、新加坡或具备同等保护水平的地区，并签署符合 PDPA 的数据处理协议。'
          },
          {
            title: '跨境处理',
            description: '当工具在境外处理数据时，我们通过合同条款要求等同保护，并保留审计权。'
          }
        ],
        bullets: [
          '若法律、法院或主管机关要求披露，我们会依法提供并记录。',
          '如 Metaphysics Alliance 发生合并或收购，我们会提前通知并提供退出选项。'
        ]
      },
      {
        heading: '6. 您的个人数据权利',
        columns: [
          {
            title: '您可行使的权利：',
            points: [
              '申请查阅我们持有的个人数据；',
              '要求更正不准确或不完整的数据；',
              '随时撤回非必要用途（含行销资讯）的同意；',
              '在符合法定保留要求的前提下，请求删除或匿名化个人数据；',
              '申请获取可移转的个人数据副本。'
            ]
          },
          {
            title: '提交请求的方式：',
            points: [
              '发送邮件至 <a href="mailto:privacy@meta-alliance.my">privacy@meta-alliance.my</a>，标题注明 “PDPA Request”，并说明需求。',
              '我们会在 1 个工作日内确认，并在 5 个工作日内完成回复；如需延长（最长 21 天），会同步说明原因。',
              '为保障安全，我们可能要求验证身份或授权。',
              '如因法规需保留部分资料，我们会说明理由，并在义务届满后通知您。'
            ]
          }
        ],
        note: '营销邮件均附退订链接；WhatsApp 广播或社群需经您明确同意才会加入。'
      },
      {
        heading: '7. 政策更新',
        bullets: [
          '当我们推出新服务、引入新处理方或调整数据用途时，将审阅并更新本政策。',
          '重大变更会在 meta-alliance.my/legal/privacy 公布，并在适用时通知现有客户。'
        ]
      }
    ],
    contact: {
      name: 'Metaphysics Alliance 隐私负责人',
      email: 'privacy@meta-alliance.my',
      phone: '+60 16-587-3141',
      hours: '我们会在 24 小时内回应所有隐私请求，并力争在 5 个工作日内完成处理。',
      address: 'Metaphysics Alliance\nMenara Mitraland, 13A Jalan PJU 5/1\nKota Damansara, 47810 Petaling Jaya\nSelangor, Malaysia.'
    }
  }
};


// Inject placeholder video src/thumbnails for About videos (EN/CN)
try {
  if (
    dictionary &&
    dictionary.EN &&
    dictionary.EN.about &&
    dictionary.EN.about.videos &&
    Array.isArray(dictionary.EN.about.videos.items)
  ){
    const env = dictionary.EN.about.videos.items
    if (env[0]) env[0] = { ...env[0], thumbnail: env[0].thumbnail || '/images/video/placeholder.svg', src: env[0].src || '/videos/shaun-intro.mp4' }
    if (env[1]) env[1] = { ...env[1], thumbnail: env[1].thumbnail || '/images/video/placeholder.svg', src: env[1].src || '/videos/consultant-triangulation.mp4' }
    if (env[2]) env[2] = { ...env[2], thumbnail: env[2].thumbnail || '/images/video/placeholder.svg', src: env[2].src || '/videos/consultant-teams.mp4' }
  }
  if (
    dictionary &&
    dictionary.CN &&
    dictionary.CN.about &&
    dictionary.CN.about.videos &&
    Array.isArray(dictionary.CN.about.videos.items)
  ){
    const cnv = dictionary.CN.about.videos.items
    if (cnv[0]) cnv[0] = { ...cnv[0], thumbnail: cnv[0].thumbnail || '/images/video/placeholder.svg', src: cnv[0].src || '/videos/shaun-intro.mp4' }
    if (cnv[1]) cnv[1] = { ...cnv[1], thumbnail: cnv[1].thumbnail || '/images/video/placeholder.svg', src: cnv[1].src || '/videos/consultant-triangulation.mp4' }
    if (cnv[2]) cnv[2] = { ...cnv[2], thumbnail: cnv[2].thumbnail || '/images/video/placeholder.svg', src: cnv[2].src || '/videos/consultant-teams.mp4' }
  }
} catch (e) {
  // no-op
}

// Enrich CN storytelling with longer, human-tone body text for the About timeline
try {
  const t = dictionary?.CN?.about?.story?.timeline
  if (Array.isArray(t)){
    if (t[0]) t[0].body = '我们从一个小型工作室起步，目标很朴素：把传统术数变成真正在业务里可用的决策工具。开始之前先听客户讲真实约束——预算、团队、时间线——再用八字、紫微、奇门去校验时机与方案。每一个建议都要过“能否落地”的关，能量不空谈，时间要可验证。渐渐地，我们形成了清晰、诚恳的表达方式：不神秘化，不夸大承诺，给出可执行路径和取舍依据。'
    if (t[1]) t[1].body = '准确性从输入开始。我们把全部排盘与时间戳统一为真太阳时，并对照二十四节气与权威历法复核。立刻看到两个变化：不同方法之间的噪音显著降低，职业转折、产品发布、迁移等“窗口期”更清晰、可复用。当多个方法同时指向同一段时间，成功率明显提升；出现分歧时，也能说明原因并调整行动节奏。'
    if (t[2]) t[2].body = '我们制定了“交叉验证清单”：单一方法不拍板，八字、紫微、奇门及必要的风水需形成共识。每次咨询像一次小型策略会：明确目标、证据、选项与时间安排。若信号不一致，就把风险和取舍讲清楚，并给出B方案与过渡步骤。客户拿到的是可以和团队对齐的计划，而不是模糊的吉凶判断。'
    if (t[3]) t[3].body = '随着需求增长，我们成立独立工作室并进入企业项目：常驻做审计、选址与季度规划，把空间布局与招聘节奏、市场周期整合。报告不止“怎么想”，更给出“怎么做、谁负责、何时验收”。方法逐步沉淀为可复用的体系——稳定的输入、可交叉验证的信号、能够落地的执行。衡量标准只有一个：实际影响。'
    // Enrich later items (5,6) with full storytelling
    if (t[4]) t[4].body = '我们把“交叉验证清单”升级为 2.0：要求多法一致，分歧要给出取舍与备选路径；“为何是现在”必须与市场节奏、团队与空间条件对齐。时机精细到周与季度，配套准备步骤与风险信号。方法论不再停留在“判断”，而是落到“执行可行”。'
    if (t[5]) t[5].body = '服务累计 500+ 客户，B2B 项目覆盖 3 个行业。我们保持同一做法：稳定输入、交叉验证、把人事空间与日历节奏对齐。报告是路线图：负责人、步骤、时间点、度量清晰。结果是真实可见——更少折返、更好时机，团队不再被动。'
    // Append 2025 story if missing
    if (t.length < 5) {
      t.push({
        date: '2025',
        title: '行业拓展',
        body: '我们把方法用于更大的场景，B2B 项目已覆盖 3 个行业。每个行业都从“时机—团队—空间”三件事入手：把时间窗口精细到周与季度，把人员与流程嵌入节奏，把空间布局与动线配合目标。结果是更少的反复与等待，更多在正确窗口里的动作。我们仍然坚持同一原则：清晰、可验证、可执行。'
      })
    }
  }
} catch (e) { /* no-op */ }

// Humanize Story & Milestones (EN & CN)
try {
  // EN — Our Story
  dictionary.EN.about.story = {
    title: 'Our Story',
    timeline: [
      {
        date: '2021',
        title: 'Listening First',
        body: 'We began as a tiny studio and spent our time listening. Clients told us what really mattered—clarity and next steps. We simplified the language and focused on real decisions, not mystique.'
      },
      {
        date: '2022',
        title: 'When Timing Clicked',
        body: 'Calmer plans and steadier results followed when we aligned work with seasons and rhythms. People felt less rushed and more confident about when to move or wait.'
      },
      {
        date: '2023',
        title: 'Work, Not Lectures',
        body: 'Sessions became working conversations. Instead of dense theory, clients left with a short plan they could act on—priorities, risks and the next right week or quarter.'
      },
      {
        date: '2024',
        title: 'Studio & Community',
        body: 'We opened a dedicated studio, hosted small workshops and began serving families and small teams together. The focus stayed the same: calm clarity and practical timing.'
      },
      {
        date: '2025',
        title: 'Bilingual, More Stories',
        body: 'We delivered in EN/CN and shared short videos and case stories. Fewer slogans, more real life—what helped, what didn’t, and why the timing mattered.'
      },
    ],
  }

  // EN — Milestones (human‑readable; keeps roadmapping dates)
  dictionary.EN.about.milestones = {
    title: 'Milestones',
    items: [
      { date: '2023-03', outcome: 'First 50 clients served; we wrote our promise: clarity over mystique.' },
      { date: '2023-09', outcome: 'First enterprise pilot; helped a team choose a calmer, better launch window.' },
      { date: '2024-02', outcome: 'Bilingual site goes live; we begin serving Southeast Asia more easily.' },
      { date: '2024-06', outcome: 'Hosted three community workshops; met new friends and future collaborators.' },
      { date: '2024-10', outcome: 'Refined briefings and follow‑ups; simpler plans, steadier rhythm.' },
      { date: '2025-03', outcome: '500+ clients served; grateful for the trust and stories shared.' },
    ],
  }

  // CN — 我们的故事（生活化）
  dictionary.CN.about.story = {
    title: '里程碑与成就—玄域联盟（Metaphysics Alliance）',
    timeline: [
      {
        date: '2023年第四季度',
        title: '创立与愿景确立',
        body: '玄域联盟于2023年底正式成立，旨在让玄学真正服务于现代决策体系。从个人探索到团队愿景，我们立志将传统玄学与数据逻辑相结合，让“天时与人事”得以被量化、验证与执行。'
      },
      {
        date: '2024年第一季度',
        title: '核心框架与早期验证',
        body: '团队开始建立整合体系，将八字、紫微斗数、奇门遁甲、数字学等多门术数统一于一套验证模型之下。来自马来西亚与新加坡的早期客户验证了模型的精准度与实用价值，为系统化发展奠下基础。'
      },
      {
        date: '2024年第二季度',
        title: '核心团队成形',
        body: '多领域核心成员正式组建——包括玄学师、数据分析师、系统开发员与视觉设计师，共同打造旗舰产品「VIP全息命理报告」，将多术数分析整合为单一逻辑体系。'
      },
      {
        date: '2024年第三季度',
        title: '数位化架构与成长突破',
        body: '正式上线玄域联盟数位平台，实现客户、案例与演算模块的系统化整合。此季度活跃客户突破 200位，并达成三项企业合作计划，从个人工作室晋升为玄学研究与实务机构。'
      },
      {
        date: '2024年第四季度',
        title: '优化与认可',
        body: '发布 Cross-Validation V2交叉验证体系，进一步提升命理推演的精度与时序一致性；并举办闭门研讨会与双语报告发布，确立「深度、精度、格局」三大品牌核心。'
      },
      {
        date: '2025年',
        title: '扩展与传承',
        body: '玄域联盟进入新阶段，持续强化数据化玄学引擎、培育新一代顾问，并迈向国际化布局——在传承古学精神的同时，塑造玄学未来的新语言。'
      },
    ],
  }

  // CN — 里程碑（生活化；保留 roadmap 需要的日期格式）
  dictionary.CN.about.milestones = {
    title: '里程碑与成就—玄域联盟（Metaphysics Alliance）',
    items: [
      { date: '2023年第四季度', outcome: '玄域联盟于年末正式成立，立志让玄学服务现代决策：从个人到团队，把传统智慧与数据逻辑打通，让“天时与人事”可量化、可验证、可执行。' },
      { date: '2024年第一季度', outcome: '统一多术数为一套验证模型（八字、紫微、奇门、数字学）；来自马来西亚与新加坡的早期客户验证其准确性与实用价值。' },
      { date: '2024年第二季度', outcome: '多领域核心团队成形：玄学师、数据分析师、系统开发员与视觉设计师共创旗舰「VIP全息命理报告」，将多体系整合为单一逻辑。' },
      { date: '2024年第三季度', outcome: '数位平台正式上线，客户、案例与演算模块实现系统化整合；活跃客户突破 200 位，签下三项企业合作，从工作室迈向实务机构。' },
      { date: '2024年第四季度', outcome: '发布 Cross‑Validation V2 交叉验证体系；举办闭门研讨与双语报告，确立品牌核心：深度、精度、格局。' },
      { date: '2025年', outcome: '进入扩展阶段：强化数据化玄学引擎、培养新一代顾问、迈向国际化布局；在传承中塑造玄学的未来语言。' },
    ],
  }
} catch (e) { /* no-op */ }

// EN: Milestones & Achievements — override with provided content
try {
  const titleEN = 'Milestones & Achievements — Metaphysics Alliance (玄域联盟)'
  dictionary.EN.about.story = {
    title: titleEN,
    timeline: [
      {
        date: '2023 Q4',
        title: 'Foundation & Vision',
        body: 'Metaphysics Alliance was founded at the close of 2023 with a clear purpose: to bring metaphysical science into the rhythm of modern decision‑making. What began as a one‑person pursuit of precision evolved into a collaborative vision — bridging traditional metaphysics with analytical frameworks and real‑world strategy.'
      },
      {
        date: '2024 Q1',
        title: 'Core Frameworks & Early Collaborations',
        body: 'The team began developing a unified methodology combining BaZi, Zi Wei Dou Shu, Qi Men Dun Jia, and numerology under one verification system. Early consultations with clients across Malaysia and Singapore validated the model’s accuracy and practical value.'
      },
      {
        date: '2024 Q2',
        title: 'Formation of the Core Team',
        body: 'A multidisciplinary team was established — blending metaphysics experts, data analysts, designers, and system developers. Together, they shaped the VIP Holistic Destiny Blueprint, the flagship service integrating multi‑system analysis into a single coherent report.'
      },
      {
        date: '2024 Q3',
        title: 'Digital Infrastructure & Growth',
        body: 'The Alliance launched its first digital ecosystem: the Metaphysics Alliance Platform, connecting clients, case studies, and computational modules through a structured interface. By this quarter, the community surpassed 200 active clients and three corporate partnerships, marking its transition from practice to institution.'
      },
      {
        date: '2024 Q4',
        title: 'Refinement & Recognition',
        body: 'Cross‑validation V2 was introduced — tightening accuracy and timing across all analytical layers. The team hosted closed‑door workshops and released bilingual reports, reinforcing its reputation for intellectual depth and clarity.'
      },
      {
        date: '2025',
        title: 'Expansion & Legacy Building',
        body: 'Now entering a new phase, Metaphysics Alliance continues to refine its data‑driven metaphysics engine, train new consultants, and expand internationally — preserving the discipline’s wisdom while defining its future language.'
      },
    ],
  }

  dictionary.EN.about.milestones = {
    title: titleEN,
    items: [
      { date: '2023 Q4', title: 'Foundation & Vision', outcome: 'Founded to align metaphysical science with modern decision‑making; a personal pursuit became a collaborative vision bridging tradition with analysis and real‑world strategy.' },
      { date: '2024 Q1', title: 'Core Frameworks & Early Collaborations', outcome: 'Unified method combining BaZi, Zi Wei, Qi Men and numerology; early work in MY/SG validated accuracy and practical value.' },
      { date: '2024 Q2', title: 'Formation of the Core Team', outcome: 'Built a multidisciplinary team and shaped the VIP Holistic Destiny Blueprint — a single, coherent report integrating multiple systems.' },
      { date: '2024 Q3', title: 'Digital Infrastructure & Growth', outcome: 'Launched the Metaphysics Alliance Platform; passed 200 active clients and three corporate partnerships — from practice to institution.' },
      { date: '2024 Q4', title: 'Refinement & Recognition', outcome: 'Released Cross‑validation V2; hosted closed‑door workshops and bilingual reports, deepening trust and clarity.' },
      { date: '2025', title: 'Expansion & Legacy Building', outcome: 'Refining the data‑driven engine, training new consultants, expanding internationally while preserving wisdom and shaping a future language.' },
    ],
  }
} catch (e) { /* no-op */ }

// (Removed legacy CN milestones tweaks to keep humanized copy authoritative)

export const locales = Object.keys(dictionary)

export function getDictionary(locale = 'EN'){
  return dictionary[locale] ?? dictionary.EN
}

export function resolvePath(dict, path){
  if (!path) return undefined
  const segments = path.split('.')
  let current = dict
  for (const segment of segments){
    if (current && Object.prototype.hasOwnProperty.call(current, segment)){
      current = current[segment]
    } else {
      return undefined
    }
  }
  return current
}

export default dictionary




// Enrich EN storytelling items 5 & 6 if present
try {
  const t2 = dictionary?.EN?.about?.story?.timeline
  if (Array.isArray(t2)){
    if (t2[4]) t2[4].body = `We upgraded our cross-validation into a 2.0 system: multiple methods must agree, and when they diverge we write down the trade-offs and offer a safer path. "Why now" is checked against market pace and team capacity. Timing is precise—weeks and quarters—with prep steps and risk signals. It's decision support you can execute.`
    if (t2[5]) t2[5].body = `We crossed 500 clients and expanded B2B across three industries. The recipe stays the same: stable inputs, cross-validated signals, and aligning people and space to the calendar. Reports became roadmaps with owners, steps and measures. The proof is practical: fewer detours, better timing, and teams making moves in the right windows.`
  }
} catch (e) { /* no-op */ }

  // Attach icons to About milestones (EN/CN) for roadmap component
  try {
  const en = dictionary?.EN?.about?.milestones?.items
  if (Array.isArray(en)){
    for (const it of en){
      if (!it || typeof it !== 'object') continue
      switch (it.date){
        case '2023-03': it.icon = it.icon || 'FiFlag'; break
        case '2023-09': it.icon = it.icon || 'FiUsers'; break
        case '2024-02': it.icon = it.icon || 'FiGlobe'; break
        case '2024-06': it.icon = it.icon || 'FiVideo'; break
        case '2024-10': it.icon = it.icon || 'FiLayers'; break
        case '2025-03': it.icon = it.icon || 'FiCheckCircle'; break
        default: /* leave fallback */ break
      }
    }
  }
  const cn = dictionary?.CN?.about?.milestones?.items
  if (Array.isArray(cn)){
    for (const it of cn){
      if (!it || typeof it !== 'object') continue
      switch (it.date){
        case '2023-03': it.icon = it.icon || 'FiFlag'; break
        case '2023-09': it.icon = it.icon || 'FiUsers'; break
        case '2024-02': it.icon = it.icon || 'FiGlobe'; break
        case '2024-06': it.icon = it.icon || 'FiVideo'; break
        case '2024-10': it.icon = it.icon || 'FiLayers'; break
        case '2025-03': it.icon = it.icon || 'FiCheckCircle'; break
        default: break
      }
    }
  }
  } catch (e) { /* no-op */ }

// Override/update Founder's Note (EN & CN)
try {
  dictionary.EN.about.founder = {
    title: "Founder's Note",
    name_en: 'Shaun Quan',
    name_cn: '宸麟老师',
    role: 'Chief Chinese Metaphysician Analyst',
    paragraphs: [
      `I founded Metaphysics Alliance (玄域联盟) with one purpose — to make metaphysics practical, measurable, and strategic. True metaphysics is not superstition; it is an ancient system of logic, rhythm, and timing that reveals how energy flows through people, events, and environments.`,
      `Every reading begins with True Solar Time (TST) and the Twenty‑Four Solar Terms, verified through official astronomical data. We cross‑validate each chart across multiple classical systems — BaZi, Zi Wei Dou Shu, Qi Men Dun Jia, Feng Shui, and numerology — ensuring every conclusion holds consistent structural logic. What was once hidden in complexity is now made actionable through clear frameworks and defined timing.`,
      `At Metaphysics Alliance, our mission is to transform metaphysical insight into practical strategy — for individuals seeking direction, and for businesses planning growth. We translate cycles, elements, and patterns into decision clarity, revealing the most efficient window for movement or restraint.`,
      `Our philosophy is simple: remove noise, preserve essence, and act with precision. Metaphysics, when applied correctly, is not fortune‑telling — it is strategic timing with scientific discipline, aligning the unseen patterns of destiny with the measurable pace of modern life.`,
    ],
  }
  dictionary.CN.about.founder = {
    title: '创始人寄语',
    name_en: 'Shaun Quan',
    name_cn: '宸麟老师',
    role: '首席中国玄学分析师',
    paragraphs: [
      '我创立玄域联盟（Metaphysics Alliance），只为让玄学回归实用、可量化、可执行的本质。真正的玄学并非迷信，而是一套揭示能量流动、节奏与时机的古老逻辑体系。',
      '每一次推演都以真太阳时与二十四节气为基准，并经由权威天文历法核对，再结合八字、紫微斗数、奇门遁甲、风水、数字学等多流派交叉验证，确保结构严谨、结果一致。我们将复杂的命理格局转化为清晰的行动逻辑与时机框架，让玄学从抽象走向落地。',
      '玄域联盟的使命，是将玄学洞见转化为实战策略——无论是个人抉择，还是企业布局，都能在节奏与方向上更稳更准。我们以去噪、存真、精确行动为原则，让玄学不再是预测，而是掌握天时的战略科学，在快速变化的时代中，以理性与天机并行。',
      '我们的准则很简单：去噪、存真、精确行动。正确运用的玄学并非算命，而是以科学纪律支撑的战略时机学，让命运之中的隐秘秩序，与现代生活的可测节奏协调一致。',
    ],
  }
} catch (e) { /* no-op */ }
