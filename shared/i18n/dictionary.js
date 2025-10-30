/* eslint-disable no-dupe-keys, @typescript-eslint/no-unused-vars */
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
      foundation: 'Chinese Metaphysics Foundation',
      beginner: 'Beginner Course',
      advanced: 'Advanced Course',
      pro: 'Professional Certification',
      enterprise: 'Enterprise',
      audit: 'Corporate Destiny Intelligence',
      site: 'Enterprise Site Strategy',
      cycles: 'Enterprise Strategy Intelligence',
      pricing: 'Pricing',
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
    pricing: {
      heroTitle: 'Pricing & Engagement Levels',
      heroSubtitle: 'Precision metaphysics for visionary leaders, heirs and enterprise teams.',
      heroDescription: 'Fees are quoted in Malaysian Ringgit (MYR). Engagements commence once objectives are confirmed and a 50% retainer is received. Remaining balance is due on delivery of the primary dossier or consultation.',
      noticeTitle: 'Every engagement includes',
      noticePoints: [
        'Discovery briefing to capture objectives, decision-makers and constraints.',
        'True Solar Time calibration plus multi-method cross-verification.',
        'Bilingual deliverables (EN/CN) with executive-ready summaries.',
        '30-day post-delivery support via email for implementation clarifications.'
      ],
      currencyNote: 'All fees are exclusive of travel, on-site assessments and applicable taxes. International work is billed in MYR or USD at prevailing rates.',
      categories: [
        {
          key: 'celestial',
          title: 'Celestial Intelligence',
          subtitle: 'Deep personal mastery programmes for founders, investors and mission-critical talent.',
          tiers: [
            {
              name: 'Destiny Algorithm (BaZi)',
              price: 'RM 6,888',
              cadence: 'per executive blueprint',
              href: '/services/celestial/destiny-algorithm',
              features: [
                '180-page bilingual dossier covering destiny code, influence and focus cycles.',
                '90-minute strategy consult with 12-month action map.',
                'True Solar Time sequencing plus relationship and leadership overlays.'
              ]
            },
            {
              name: 'Imperial Star Atlas (Zi Wei Dou Shu)',
              price: 'RM 9,888',
              cadence: 'per atlas issuance',
              href: '/services/celestial/imperial-star-atlas',
              features: [
                'Palace-by-palace orchestration for influence, capital and public positioning.',
                'Six major activation windows aligned to stakeholder and media cadence.',
                'Private counsel covering succession, alliances and reputation architecture.'
              ]
            },
            {
              name: 'Arcane Strategy Matrix (Qi Men Dun Jia)',
              price: 'RM 8,588',
              cadence: 'per mission deployment',
              href: '/services/celestial/arcane-strategy-matrix',
              features: [
                'Tactical formations for launches, negotiations or critical transitions.',
                'Mission dashboard with hourly portals, portals to avoid and decoy paths.',
                '30-day live support during the active operation window.'
              ]
            }
          ]
        },
        {
          key: 'spatial',
          title: 'Feng Shui & Spatial Intelligence',
          subtitle: 'Spatial command for residences, offices and flagship locations.',
          tiers: [
            {
              name: 'Home Destiny Compass',
              price: 'RM 7,288',
              cadence: 'per residence',
              href: '/services/fengshui/home-destiny-compass',
              features: [
                'On-site or digital audit covering layout, landform and annual renewals.',
                'Life palace alignment matched to household BaZi charts.',
                'Activation calendar covering twelve months of adjustments.'
              ]
            },
            {
              name: 'Office Power Alignment',
              price: 'RM 12,588',
              cadence: 'per floor or site',
              href: '/services/fengshui/office-power-alignment',
              features: [
                'Executive command placement, revenue flow choreography and team zoning.',
                'Leadership sanctuary and war-room shielding for critical decisions.',
                'Quarterly tuning schedule plus renovation governance protocol.'
              ]
            },
            {
              name: 'Dragon Vein Oracle',
              price: 'RM 11,888',
              cadence: 'per site study',
              href: '/services/fengshui/dragon-vein-oracle',
              features: [
                'Macro landform reconnaissance with geomantic risk scoring.',
                'Directional pairing for entrances, signage and water features.',
                'Timing overlays for acquisition, groundbreaking and activation.'
              ]
            }
          ]
        },
        {
          key: 'magnetic',
          title: 'Magnetic Matrix & Numerology',
          subtitle: 'Energy recalibration for naming, communication and personal rhythm.',
          tiers: [
            {
              name: 'I-Ching Energy Matrix',
              price: 'RM 4,288',
              cadence: 'per report',
              href: '/services/magnetic-matrix/i-ching-energy-matrix',
              features: [
                'Hexagram-based personality, motive and decision rhythm decoding.',
                'Six-month timing arcs highlighting accelerate versus consolidate phases.',
                'Daily practice stack to stabilise energy leak points.'
              ]
            },
            {
              name: 'Name Destiny Code',
              price: 'RM 3,688',
              cadence: 'per naming cycle',
              href: '/services/magnetic-matrix/name-destiny-code',
              features: [
                'Full vibration audit of current identity across languages and scripts.',
                'Strategic renaming proposals aligned to destiny and industry resonance.',
                'Implementation guide covering legal, digital and public roll-out.'
              ]
            },
            {
              name: 'Soul Number Blueprint',
              price: 'RM 2,988',
              cadence: 'per blueprint',
              href: '/services/magnetic-matrix/soul-number-blueprint',
              features: [
                'Numerology pathways for intuition, creativity and fulfilment.',
                'Talent acceleration routines matched to core and destiny numbers.',
                'Relationship compatibility insights with collaboration guardrails.'
              ]
            }
          ]
        },
        {
          key: 'imperial',
          title: 'Imperial Oracles',
          subtitle: 'High ceremony consultations for sovereign decisions and national scale projects.',
          tiers: [
            {
              name: 'Supreme Celestial Numbers',
              price: 'RM 12,888',
              cadence: 'per imperial cycle',
              href: '/oracle/celestial-numbers',
              features: [
                'True Solar Time matrices correlating to national and global cycles.',
                'Court of eight analysis for influence, risk and protection strategies.',
                'Three-part briefing (strategy, mitigation, activation) with slide deck.'
              ]
            },
            {
              name: 'Cosmic Tai Yi Strategy',
              price: 'RM 10,888',
              cadence: 'per directive',
              href: '/oracle/taiyi-numbers',
              features: [
                'Tai Yi flight path for geopolitical or capital-intensive moves.',
                'Heaven, Earth and Human harmonisation ledger with priority actions.',
                'Optional emergency recalibration session within 45 days.'
              ]
            },
            {
              name: 'Mystical Mechanism of Six Ren',
              price: 'RM 9,688',
              cadence: 'per mission',
              href: '/oracle/six-ren',
              features: [
                'Six Ren board casting for conflict resolution and covert manoeuvres.',
                'Enemy and ally positioning grid with probability markers.',
                'Rapid-response counsel throughout the chosen timing window.'
              ]
            }
          ]
        },
        {
          key: 'academy',
          title: 'Academy Mastery Path',
          subtitle: 'Four-stage curriculum guiding practitioners from foundations to professional certification.',
          tiers: [
            {
              name: 'Foundation Course',
              price: 'RM 2,888',
              cadence: 'per intake (6 weeks)',
              href: '/academy/foundation',
              features: [
                'Six-week live intensive covering classical frameworks and timing fundamentals.',
                'Interactive chart labs introducing BaZi, Zi Wei and Qi Men toolkits.',
                'Bilingual workbooks with lifetime access to recorded sessions.'
              ]
            },
            {
              name: 'Beginner Course',
              price: 'RM 4,288',
              cadence: 'per intake (8 weeks)',
              href: '/academy/beginner',
              features: [
                'Case-led workshops applying destiny diagnostics to real scenarios.',
                'Weekly office hours for personalised guidance and practice feedback.',
                'Peer study pods to reinforce technique and accountability.'
              ]
            },
            {
              name: 'Advanced Course',
              price: 'RM 5,888',
              cadence: 'per cohort (10 weeks)',
              href: '/academy/intermediate',
              features: [
                'Cross-discipline synthesis bridging destiny, space and timing intelligence.',
                'Enterprise playbooks translating metaphysics into board-level language.',
                'Capstone project with instructor critique and refinement.'
              ]
            },
            {
              name: 'Professional Certification',
              price: 'RM 8,888',
              cadence: 'per cohort (12 weeks)',
              href: '/academy/professional',
              features: [
                'Supervised client simulations covering intake, analysis and delivery.',
                'Ethics, governance and documentation standards for professional practice.',
                'Certification panel review plus alumni community access.'
              ]
            }
          ]
        },
        {
          key: 'vip360',
          title: '360 Holistic Destiny Blueprint',
          subtitle: 'Three-tier holographic destiny intelligence for private clients and family offices.',
          tiers: [
            {
              name: 'Essential Destiny Blueprint',
              price: 'RM 9,888',
              cadence: 'per blueprint',
              href: '/vip-report/essential',
              features: [
                '120-page personalised dossier covering destiny code, wealth flow and career resonance.',
                '10-year and annual timing overlays with priority action steps.',
                'Discovery consult plus 75-minute walkthrough session with email support for 30 days.'
              ]
            },
            {
              name: 'Advanced Destiny Blueprint',
              price: 'RM 14,888',
              cadence: 'per blueprint',
              href: '/vip-report/pro',
              features: [
                '220-page deep analysis integrating name energy, numerology and multi-system triangulation.',
                'Leadership, relationship and capital orchestration matrices with contingency triggers.',
                'Two consultation sessions (strategy + implementation) and bespoke timing calendar.'
              ]
            },
            {
              name: 'Supreme Destiny Blueprint',
              price: 'RM 23,888',
              cadence: 'per blueprint',
              href: '/vip-report/supreme',
              features: [
                '320-page full holographic masterplan uniting destiny, Feng Shui, numerology and True Solar Time.',
                'Family governance, legacy and asset allocation blueprints with risk mitigation protocols.',
                'Extended concierge support for 60 days including on-call timing advisories.'
              ]
            }
          ]
        },
        {
          key: 'enterprise',
          title: 'Enterprise Command Deck',
          subtitle: 'Board-level intelligence aligning destiny, timing and operational execution.',
          tiers: [
            {
              name: 'Corporate Destiny Intelligence',
              price: 'RM 18,588',
              cadence: 'per enterprise',
              href: '/enterprise/audit',
              features: [
                'Founding chart with leadership resonance audit and wealth channels.',
                'Operational risk scan across markets, people and space.',
                'Three-tier action sequence covering defend, expand and diversify moves.'
              ]
            },
            {
              name: 'Enterprise Site Strategy',
              price: 'RM 22,088',
              cadence: 'per location short-list',
              href: '/enterprise/site',
              features: [
                'Landform, directional and timing evaluation for up to three sites.',
                'Scoring matrix with prosperity, resilience and compliance indicators.',
                'Implementation playbook for design, phasing and go-live timing.'
              ]
            },
            {
              name: 'Enterprise Strategy & Cycle Intelligence',
              price: 'RM 16,588',
              cadence: 'per annual planning cycle',
              href: '/enterprise/cycles',
              features: [
                'Ten-year and annual rhythm map for growth, consolidation and pause phases.',
                'Leadership cadence dashboard with succession safeguards.',
                'Strategy calendar aligning launches, capital moves and partner rotations.'
              ]
            }
          ]
        }
      ],
      addOnsTitle: 'Retainers & Enhancements',
      addOns: [
        {
          name: 'Executive Concierge Retainer',
          price: 'From RM 5,000 / month',
          features: [
            'Priority WhatsApp and email counsel for real-time decisions.',
            'Monthly timing brief aligned to board or family governance cadence.',
            'On-call charting for travel, alliances and investments (up to four events).'
          ]
        },
        {
          name: 'On-Site Immersion',
          price: 'From RM 3,800 / day + expenses',
          features: [
            'In-person walkthrough, interviews and environment tuning.',
            'Immediate adjustments with leadership training for implementation.',
            'Follow-up summary within 72 hours.'
          ]
        },
        {
          name: 'Confidential Briefing Deck',
          price: 'RM 2,288',
          features: [
            'Executive slide deck translating metaphysics into board language.',
            'Risk, opportunity and timing matrices for stakeholders.',
            'Editable format for internal circulation with usage guidelines.'
          ]
        }
      ],
      finePrintTitle: 'Fine print',
      finePrint: [
        'Time-sensitive missions (under 7 days notice) incur a 25% rush premium.',
        'International travel is billed at business-class rates with two support days minimum.',
        'Engagements cancelled within 14 days of delivery forfeit the retainer.',
        'Payment options include bank transfer, FPX and corporate card (3% surcharge).'
      ],
      cta: {
        label: 'Discuss a custom bundle',
        href: '/contact'
      }
    },
  vip: {
    section_title: 'VIP Holistic Destiny Analysis Service',
    cta: 'Learn More',
    tiers: {
      lite_title: 'Essential Destiny Blueprint',
      pro_title: 'Advanced Destiny Blueprint',
      supreme_title: 'Supreme Destiny Blueprint',
      lite_points: [
        '100+ page personalised destiny blueprint',
        'Talent & potential analysis',
        'Career & industry alignment roadmap',
        'Wealth dynamics & management guidance',
        '10-year Luck Cycle (Da Yun) timing analysis',
        'Life numbers (numerology) decoding',
        'Actionable adjustments to balance weaknesses'
      ],
      pro_points: [
        '200+ page destiny mastery blueprint',
        'Complete career and industry resonance mapping',
        'Wealth structure diagnostics and risk alerts',
        '10-year Luck Phases with transition strategies',
        'Numerology overlays for behavioural refinement',
        'Energy field analysis across health, relationships and productivity',
        'Name vibration audit with optimisation guidance',
        'Timing-based action plan and practical remedies'
      ],
      supreme_points: [
        '300+ page full-holographic destiny command deck',
        'Complete integration of destiny, numerology, name energy and Feng Shui',
        'Wealth architecture insights with capital and legacy strategies',
        '10-year & annual timing roadmap with activation protocols',
        'Personal energy field analysis with advanced balancing remedies',
        'Name vibration optimisation with strategic renaming options',
        'Residential Feng Shui assessment and spatial harmonisation plan',
        'Custom action programme aligning timing, space and energy'
      ]
      },
    },
    services: {
      ...CELESTIAL_SERVICES.EN,
      corporateAudit: {
        badge: 'Corporate Destiny Audit',
        title: 'Corporate Destiny Intelligence',
        subtitle: 'Decode the hidden forces behind corporate success.',
        sections: [
          {
            key: 'overview',
            dividerTitle: 'Overview',
            dividerSubtitle: 'Strategic metaphysics for enterprise foresight',
            title: 'See the Energetic DNA of the Enterprise',
            imageLabel: 'Corporate destiny intelligence collage',
            imageUrl: '/images/page-audit/audit-img-01.jpeg',
            body: `Corporate Destiny Intelligence is a strategic metaphysical assessment that reveals how a company’s energy structure, leadership rhythm and spatial environment align with the universal cycle of prosperity. By combining time, direction and human synergy, it exposes the unseen factors shaping growth, culture and wealth flow so leadership can realign for momentum and longevity.`
          },
          {
            key: 'insight',
            dividerTitle: 'What It Reveals',
            dividerSubtitle: 'The structure behind performance',
            title: 'Diagnose the Hidden Architecture of Success',
            imageLabel: 'Enterprise energy flow dashboard',
            imageUrl: '/images/page-audit/audit-img-02.jpeg',
            body: 'Every company carries a destiny pattern—shaped by its founding moment, people and place.',
            points: [
              'Corporate Energy Flow: is the organisation in expansion, transition or rest?',
              'Leadership Resonance: how the core team’s charts align with the corporate energy.',
              'Wealth Pathways: directions and timing that favour growth, capital or partnership.',
              'Environmental Influence: how office or site qi supports or constrains outcomes.',
              'Strategic Foresight: early signals of stagnation or breakthrough windows.'
            ]
          },
          {
            key: 'method',
            dividerTitle: 'How It Works',
            dividerSubtitle: 'Time · Space · People alignment',
            title: 'Map the Enterprise Against Cosmic Rhythm',
            imageLabel: 'Corporate timing matrix storyboard',
            imageUrl: '/images/page-audit/audit-img-03.jpeg',
            body: 'We integrate corporate astrology, energy flow and strategic metaphysics to map founding data and operational cycles against cosmic timing, identifying when growth is supported and when caution is required.',
            points: [
              'Foundational analysis of the corporate destiny map.',
              'Calibration of leadership charts with enterprise rhythm.',
              'Spatial review of headquarters, branches or key sites for resonance with goals.',
              'Cycle timing that distinguishes momentum phases from consolidation periods.',
              'Action sequencing that aligns initiatives with supportive windows.'
            ]
          },
          {
            key: 'process',
            dividerTitle: 'Service Process',
            dividerSubtitle: 'From discovery to activation',
            title: 'Six Steps to Corporate Destiny Clarity',
            imageLabel: 'Corporate audit workflow board',
            imageUrl: '/images/page-audit/audit-img-04.jpeg',
            body: 'A structured workflow turns energetic diagnostics into executive-ready intelligence.',
            points: [
              'Discovery Briefing – align on history, challenges and goals.',
              'Data & Chart Mapping – build the corporate destiny map from founding and leadership details.',
              'Energy Diagnosis – analyse operational flow, leadership synergy and spatial resonance.',
              'Cycle Interpretation – decode 1-year, 3-year and 10-year trendlines.',
              'Strategic Consultation – present findings in clear, practical language.',
              'Action Blueprint – deliver timing and directional guidance for decisions and site planning.'
            ]
          },
          {
            key: 'audience',
            dividerTitle: 'Who It Is For',
            dividerSubtitle: 'For leaders stewarding pivotal moves',
            title: 'Built for Founders, Boards and Investors',
            imageLabel: 'Enterprise leadership alignment briefing',
            imageUrl: '/images/page-audit/audit-img-05.jpeg',
            body: 'Engineered for leadership teams who require timing clarity before executing major initiatives.',
            points: [
              'Companies preparing expansion, rebranding or market entry.',
              'Boards seeking energetic alignment to stabilise morale and execution.',
              'Investors vetting timing for capital deployment and partner synergy.',
              'Family enterprises structuring succession and legacy continuity.'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: 'Outcome & Value',
            dividerSubtitle: 'What you receive',
            title: 'A Strategic Map of Corporate Destiny',
            imageLabel: 'Corporate destiny cycle chart',
            imageUrl: '/images/page-audit/audit-img-06.jpeg',
            body: 'You receive a clear visual of the enterprise destiny cycle—when to grow, consolidate or transform. Corporate Destiny Intelligence augments analytics with timing and energetic alignment so leadership acts in flow with time, not against it.'
          }
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: 'Ready to Uncover Your Company’s Hidden Blueprint?',
          dividerSubtitle: 'Reserve your corporate destiny audit',
          title: 'Start Your Corporate Destiny Consultation',
          message: 'Click to begin a personalised corporate audit and align your enterprise with the rhythm of success.',
          primaryLabel: 'Start Your Corporate Destiny Consultation',
          primaryHref: '/contact'
      },
      advancedBlueprint: {
        badge: '360全维度',
        title: '天机蓝图·进阶版',
        subtitle: '洞察命格结构 · 掌握人生天机。',
        sections: [
          {
            key: 'overview',
            dividerTitle: '服务概述',
            dividerSubtitle: '命格深度解读',
            title: '从认识到掌控的进阶蓝图',
            imageLabel: '进阶命运概览图',
            imageUrl: '/images/page-360-advanced/360-adv-img-01.jpeg',
            body: '《天机蓝图·进阶版》是一份超过 200 页的深度命运解析，整合八字、生命数字与姓名能量，揭示命格如何运作、何时转折，以及如何掌握人生节奏。'
          },
          {
            key: 'insight',
            dividerTitle: '能揭示什么',
            dividerSubtitle: '命运系统全结构',
            title: '全面解构命格八大板块',
            imageLabel: '命运多层洞察面板',
            imageUrl: '/images/page-360-advanced/360-adv-img-02.jpeg',
            body: '蓝图揭示命运系统的更深层结构：',
            points: [
              '天赋潜能：挖掘隐藏能力与性格驱动力。',
              '行业定位：锁定最契合五行能量的事业领域。',
              '财富结构：看懂财富流入、积累、风险与止损位。',
              '十年大运：提前预判长期周期的兴衰与转折。',
              '生命数字：解析行为密码与成长课题。',
              '能量场分析：捕捉健康、人际与效率的能量失衡。',
              '姓名吉象：评估姓名与命格的共振度与优化建议。',
              '实用化解：提供针对性调整方案与时机动作。'
            ]
          },
          {
            key: 'method',
            dividerTitle: '推演原理',
            dividerSubtitle: '结构与节奏共读',
            title: '三重系统交叉解码命运',
            imageLabel: '结构与节奏共振图',
            imageUrl: '/images/page-360-advanced/360-adv-img-03.jpeg',
            body: `服务通过整合“八字五行结构”、“生命数字频率”与“姓名能量共振”，绘制出你命运系统的多维运行蓝图。
它揭示的不只是性格与倾向，更是命运的“触发机制”——什么时间、什么选择，会带来突破或阻力。
报告让你既看懂“命的结构”，也理解“运的节奏”。`,
            points: [
              '对自身命格机制的全面认知；',
              '对未来十年周期的前瞻规划；',
              '一套能量与时运结合的可执行策略。'
            ]
          },
          {
            key: 'process',
            dividerTitle: '服务流程',
            dividerSubtitle: '六步完成进阶蓝图',
            title: '从资料到专属策略',
            imageLabel: '进阶蓝图流程板',
            imageUrl: '/images/page-360-advanced/360-adv-img-04.jpeg',
            body: '严谨流程确保洞察落地：',
            points: [
              '资料收集：记录出生与姓名信息。',
              '命盘分析：整合八字、数字与能量模型。',
              '姓名共振评估：判断姓名与命格能量的合拍度。',
              '周期预测：推演十年与流年节奏变化。',
              '蓝图编制：产生 200+ 页深度报告。',
              '解读咨询：一对一讲解与专属策略讨论。'
            ]
          },
          {
            key: 'audience',
            dividerTitle: '适合人群',
            dividerSubtitle: '关键转折的行动指南',
            title: '为准备升级的人而设',
            imageLabel: '进阶用户场景图',
            imageUrl: '/images/page-360-advanced/360-adv-img-05.jpeg',
            body: '适合正处重要阶段、需要掌控时间节奏的决策者：',
            points: [
              '准备重大转型或跨界发展的个人。',
              '希望事业节奏与命格相辅相成的创业者。',
              '追求长期布局与节奏掌控的专业人士。',
              '想理解姓名能量如何影响命运的人。'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: '结果与价值',
            dividerSubtitle: '一生可用的命运运行图',
            title: '让挑战化为节奏而非阻力',
            imageLabel: '命运运行蓝图',
            imageUrl: '/images/page-360-advanced/360-adv-img-06.jpeg',
            body: '你将带走一份完整的命运运行图谱，知道自己是谁、节奏如何展开、下一步怎么走。当你掌握命运节奏，阻力会变节奏，人生会更从容。'
          }
        ],
        faq: [
          { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
          { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
          { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
          { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
        ],
        cta: {
          dividerTitle: '想深入解锁命运的隐藏结构？',
          dividerSubtitle: '预约天机蓝图·进阶版',
          title: '领取天机蓝图·进阶版',
          message: '点击开启专属命运解析，掌握人生节奏。',
          primaryLabel: '领取天机蓝图·进阶版',
          primaryHref: '/contact'
        }
      },
      advancedBlueprint: {
        badge: '360全维度',
        title: '天机蓝图·进阶版',
        subtitle: '洞察命格结构 · 掌握人生天机。',
        sections: [
          {
            key: 'overview',
            dividerTitle: '服务概述',
            dividerSubtitle: '命格深度解读',
            title: '从认识到掌控的进阶蓝图',
            imageLabel: '进阶命运概览图',
            imageUrl: '/images/page-360-advanced/360-adv-img-01.jpeg',
            body: '《天机蓝图·进阶版》是一份超过 200 页的深度命运解析，整合八字、生命数字与姓名能量，揭示命格如何运作、何时转折，以及如何掌握人生节奏。'
          },
          {
            key: 'insight',
            dividerTitle: '能揭示什么',
            dividerSubtitle: '命运系统全结构',
            title: '全面解构命格八大板块',
            imageLabel: '命运多层洞察面板',
            imageUrl: '/images/page-360-advanced/360-adv-img-02.jpeg',
            body: '蓝图揭示命运系统的更深层结构：',
            points: [
              '天赋潜能：挖掘隐藏能力与性格驱动力。',
              '行业定位：锁定最契合五行能量的事业领域。',
              '财富结构：看懂财富流入、积累、风险与止损位。',
              '十年大运：提前预判长期周期的兴衰与转折。',
              '生命数字：解析行为密码与成长课题。',
              '能量场分析：捕捉健康、人际与效率的能量失衡。',
              '姓名吉象：评估姓名与命格的共振度与优化建议。',
              '实用化解：提供针对性调整方案与时机动作。'
            ]
          },
          {
            key: 'method',
            dividerTitle: '推演原理',
            dividerSubtitle: '结构与节奏共读',
            title: '三重系统交叉解码命运',
            imageLabel: '结构与节奏共振图',
            imageUrl: '/images/page-360-advanced/360-adv-img-03.jpeg',
            body: `服务通过整合“八字五行结构”、“生命数字频率”与“姓名能量共振”，绘制出你命运系统的多维运行蓝图。
它揭示的不只是性格与倾向，更是命运的“触发机制”——什么时间、什么选择，会带来突破或阻力。
报告让你既看懂“命的结构”，也理解“运的节奏”。`,
            points: [
              '对自身命格机制的全面认知；',
              '对未来十年周期的前瞻规划；',
              '一套能量与时运结合的可执行策略。'
            ]
          },
          {
            key: 'process',
            dividerTitle: '服务流程',
            dividerSubtitle: '六步完成进阶蓝图',
            title: '从资料到专属策略',
            imageLabel: '进阶蓝图流程板',
            imageUrl: '/images/page-360-advanced/360-adv-img-04.jpeg',
            body: '严谨流程确保洞察落地：',
            points: [
              '资料收集：记录出生与姓名信息。',
              '命盘分析：整合八字、数字与能量模型。',
              '姓名共振评估：判断姓名与命格能量的合拍度。',
              '周期预测：推演十年与流年节奏变化。',
              '蓝图编制：产生 200+ 页深度报告。',
              '解读咨询：一对一讲解与专属策略讨论。'
            ]
          },
          {
            key: 'audience',
            dividerTitle: '适合人群',
            dividerSubtitle: '关键转折的行动指南',
            title: '为准备升级的人而设',
            imageLabel: '进阶用户场景图',
            imageUrl: '/images/page-360-advanced/360-adv-img-05.jpeg',
            body: '适合正处重要阶段、需要掌控时间节奏的决策者：',
            points: [
              '准备重大转型或跨界发展的个人。',
              '希望事业节奏与命格相辅相成的创业者。',
              '追求长期布局与节奏掌控的专业人士。',
              '想理解姓名能量如何影响命运的人。'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: '结果与价值',
            dividerSubtitle: '一生可用的命运运行图',
            title: '让挑战化为节奏而非阻力',
            imageLabel: '命运运行蓝图',
            imageUrl: '/images/page-360-advanced/360-adv-img-06.jpeg',
            body: '你将带走一份完整的命运运行图谱，知道自己是谁、节奏如何展开、下一步怎么走。当你掌握命运节奏，阻力会变节奏，人生会更从容。'
          }
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: '想深入解锁命运的隐藏结构？',
          dividerSubtitle: '预约天机蓝图·进阶版',
          title: '领取天机蓝图·进阶版',
          message: '点击开启专属命运解析，掌握人生节奏。',
          primaryLabel: '领取天机蓝图·进阶版',
          primaryHref: '/contact'
        }
      },
      advancedBlueprint: {
        badge: '360 Holistic',
        title: 'Advanced Destiny Blueprint',
        subtitle: 'Decode the hidden structure of destiny · master the code behind your life.',
        sections: [
          {
            key: 'overview',
            dividerTitle: 'Overview',
            dividerSubtitle: 'Deep-dive destiny mastery',
            title: 'Move from Awareness to Mastery',
            imageLabel: 'Advanced destiny overview panel',
            imageUrl: '/images/page-360-advanced/360-adv-img-01.jpeg',
            body: `The Advanced Destiny Blueprint is a 200+ page personalised analysis that reveals how your destiny system operates. It integrates BaZi, numerology and name energy to expose your energetic structure, timing triggers and life cycles so you can steer with precision.`
          },
          {
            key: 'insight',
            dividerTitle: 'What It Reveals',
            dividerSubtitle: 'Multi-layered intelligence',
            title: 'Understand Every Layer of Your Destiny',
            imageLabel: 'Destiny layers insight board',
            imageUrl: '/images/page-360-advanced/360-adv-img-02.jpeg',
            body: 'This blueprint goes beyond the foundation level to decode the mechanics behind your life pattern.',
            points: [
              'Talent & Core Potential: uncover hidden gifts shaping your natural abilities.',
              'Career & Industry Resonance: pinpoint environments and roles that amplify your elements.',
              'Wealth Structure: analyse how resources flow, accumulate or disperse in your chart.',
              'Ten-Year Luck Phases: map transitions so you can plan long-range timing decisions.',
              'Numerology Insights: cross-reference life numbers for personality refinement.',
              'Energy Field Analysis: detect imbalances affecting health, productivity or relationships.',
              'Name Energy & Symbolism: evaluate how your name supports—or conflicts with—your destiny.',
              'Practical Adjustments: receive targeted remedies and timing-based action steps.'
            ]
          },
          {
            key: 'method',
            dividerTitle: 'How It Works',
            dividerSubtitle: 'Structure and motion',
            title: 'Fuse Pattern, Frequency and Timing',
            imageLabel: 'Methodology resonance map',
            imageUrl: '/images/page-360-advanced/360-adv-img-03.jpeg',
            body: 'We merge BaZi elemental logic, numerology frequency and name resonance to reveal who you are and how your destiny breathes.',
            points: [
              'Layered BaZi analysis showing elemental strengths, weaknesses and capacity.',
              'Numerology overlays that highlight behavioural codes and growth lessons.',
              'Name energy resonance audit comparing current vibration with destiny needs.',
              'Cycle mapping that connects structure (命) with movement (运) for practical decisions.'
            ]
          },
          {
            key: 'process',
            dividerTitle: 'Service Process',
            dividerSubtitle: 'From intake to decoding',
            title: 'Six Steps to an Advanced Blueprint',
            imageLabel: 'Advanced blueprint workflow',
            imageUrl: '/images/page-360-advanced/360-adv-img-04.jpeg',
            body: 'A comprehensive workflow ensures insight transforms into strategy.',
            points: [
              'Personal Information Collection – gather precise birth and name data.',
              'Comprehensive Data Analysis – integrate BaZi, numerology and energy mapping.',
              'Name Resonance Assessment – test alignment between your name and destiny field.',
              'Ten-Year & Annual Cycle Forecast – uncover long and short-term timing triggers.',
              'Blueprint Compilation – deliver a 200+ page in-depth destiny report.',
              'Interpretation Consultation – translate findings into personalised strategy.'
            ]
          },
          {
            key: 'audience',
            dividerTitle: 'Who It Is For',
            dividerSubtitle: 'Designed for turning points',
            title: 'Built for Those Ready to Level Up',
            imageLabel: 'Advanced audience storyboard',
            imageUrl: '/images/page-360-advanced/360-adv-img-05.jpeg',
            body: 'Perfect for individuals moving through major transitions or seeking mastery over timing.',
            points: [
              'Leaders planning significant personal or career pivots.',
              'Entrepreneurs syncing personal destiny with business growth.',
              'Professionals engineering long-term strategy through timing mastery.',
              'Individuals curious about how name energy shapes their trajectory.'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: 'Outcome & Value',
            dividerSubtitle: 'What you take away',
            title: 'A Time-Coded Master Plan',
            imageLabel: 'Destiny master plan map',
            imageUrl: '/images/page-360-advanced/360-adv-img-06.jpeg',
            body: `You leave with a complete, time-coded roadmap that shows who you are, how your cycles unfold and how to move forward with power and precision. Challenges become rhythm—not resistance—once you understand your internal frequency.`
          }
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: 'Ready to Unlock the Deeper Layers of Your Destiny?',
          dividerSubtitle: 'Reserve your Advanced Destiny Blueprint',
          title: 'Get Your Advanced Destiny Blueprint',
          message: 'Click to begin your personalised analysis and master the rhythm of your life.',
          primaryLabel: 'Get Your Advanced Destiny Blueprint',
          primaryHref: '/contact'
        }
      },
      newsletterTitle: 'Corporate Destiny Dispatch',
      newsletterSubtitle: 'Board-level timing intelligence, spatial diagnostics and leadership alignment guidance.'
    },
      essentialBlueprint: {
        badge: '360 Holistic',
        title: 'Essential Destiny Blueprint',
        subtitle: 'Decode your destiny · begin the journey with clarity and confidence.',
        sections: [
        {
          key: 'overview',
          dividerTitle: 'Overview',
          dividerSubtitle: 'Foundational destiny blueprint',
          title: 'Start with Strategic Self-Awareness',
          imageLabel: 'Destiny blueprint overview panel',
          imageUrl: '/images/page-360-essential/360-e-img-01.jpeg',
          body: `The Essential Destiny Blueprint is a 100+ page personalised analysis for people ready to understand their purpose, talents and timing. It combines BaZi, numerology and life-cycle intelligence so you can move with your inherent rhythm instead of fighting against it.`
        },
        {
          key: 'insight',
          dividerTitle: 'What It Reveals',
          dividerSubtitle: 'Full-spectrum clarity',
          title: 'See the Pattern Behind Who You Are',
          imageLabel: 'Destiny insight board',
          imageUrl: '/images/page-360-essential/360-e-img-02.jpeg',
          body: 'Your report delivers a holistic view of who you are and where your destiny leads.',
          points: [
            'Talent & Potential: uncover innate gifts and strengths that activate easily.',
            'Career & Industry Alignment: identify roles, environments and industries that amplify your element mix.',
              'Wealth Dynamics: understand how you attract, manage and retain financial flow.',
              'Life Rhythm: map Ten-Year and Annual cycles so you can time moves with confidence.',
              'Numerology Insights: decode core life numbers for deeper self-understanding.',
              'Practical Adjustments: receive actionable remedies to balance weaknesses and unlock momentum.'
            ]
          },
        {
          key: 'method',
          dividerTitle: 'How It Works',
          dividerSubtitle: 'Metaphysics translated into strategy',
          title: 'Connect Pattern, Timing and Action',
          imageLabel: 'Methodology flow chart',
          imageUrl: '/images/page-360-essential/360-e-img-03.jpeg',
          body: 'We transform ancient metaphysical formulas into clear, relatable guidance that you can apply immediately.',
          points: [
            'Five-element calibration that exposes your foundational energy pattern.',
            'Ten-Year Luck Cycle and annual overlays showing when to accelerate, stabilise or pivot.',
              'Personal strategy guidance that keeps decisions aligned with opportunity flow.',
              'Downloadable charts and dashboards so you can revisit insights anytime.'
            ]
          },
        {
          key: 'process',
          dividerTitle: 'Service Process',
          dividerSubtitle: 'From intake to blueprint',
          title: 'Five Steps to Your Destiny Blueprint',
          imageLabel: 'Blueprint creation workflow',
          imageUrl: '/images/page-360-essential/360-e-img-04.jpeg',
          body: 'A precise workflow ensures every report is rigorous, personalised and actionable.',
          points: [
            'Information Intake – capture birth date, time and location to anchor the analysis.',
            'Comprehensive Analysis – interpret BaZi, numerology and destiny cycles in tandem.',
              'Blueprint Creation – produce a 100+ page report with visuals, commentary and actions.',
              'Interpretation Session – walk through key insights in plain, practical language.',
              'Practical Guidance – receive mindset, timing and environment adjustments for smoother flow.'
            ]
          },
        {
          key: 'audience',
          dividerTitle: 'Who It Is For',
          dividerSubtitle: 'Clarity before action',
          title: 'Designed for People Ready to Lead Their Destiny',
          imageLabel: 'Audience alignment storyboard',
          imageUrl: '/images/page-360-essential/360-e-img-05.jpeg',
          body: 'Perfect for individuals who want to take ownership of their direction and momentum.',
          points: [
            'Purpose seekers looking for confident career or life choices.',
            'Professionals feeling stuck or misaligned with timing.',
              'Entrepreneurs aligning personal destiny with business cycles.',
              'Anyone ready to understand their rhythm and unlock long-term flow.'
            ]
          },
        {
          key: 'outcome',
          dividerTitle: 'Outcome & Value',
          dividerSubtitle: 'What you take away',
          title: 'A Lifetime Reference for Your Destiny',
          imageLabel: 'Destiny reference map',
          imageUrl: '/images/page-360-essential/360-e-img-06.jpeg',
          body: `You receive more than a report—you gain a personal atlas for navigating timing, relationships, money and purpose. Once you understand your cycles, you stop chasing outcomes and start creating them with calm, confidence and intent.`
        }
      ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: 'Ready to Begin Your Destiny Journey?',
          dividerSubtitle: 'Reserve your Essential Destiny Blueprint',
          title: 'Get Your Destiny Blueprint',
          message: 'Click to begin your personalised report and uncover the logic of your destiny.',
          primaryLabel: 'Get Your Destiny Blueprint',
          primaryHref: '/contact'
        }
      },
      advancedBlueprint: {
        badge: '360 Holistic',
        title: 'Advanced Destiny Blueprint',
        subtitle: 'Decode the hidden structure of destiny · master the code behind your life.',
        sections: [
          {
            key: 'overview',
            dividerTitle: 'Overview',
            dividerSubtitle: 'Destiny mastery deep dive',
            title: 'Move from Awareness to Mastery',
            imageLabel: 'Advanced destiny overview panel',
            imageUrl: '/images/page-360-advanced/360-adv-img-01.jpeg',
            body: `The Advanced Destiny Blueprint is a 200+ page personalised analysis that reveals how your destiny system operates. It fuses BaZi, numerology and name energy to expose your energetic structure, timing triggers and life cycles so you can steer with precision.`
          },
          {
            key: 'insight',
            dividerTitle: 'What It Reveals',
            dividerSubtitle: 'Multi-layered intelligence',
            title: 'Understand Every Layer of Your Destiny',
            imageLabel: 'Destiny layers insight board',
            imageUrl: '/images/page-360-advanced/360-adv-img-02.jpeg',
            body: 'This blueprint goes beyond the foundation level to decode the mechanics behind your life pattern.',
            points: [
              'Talent & Core Potential: uncover hidden gifts shaping your natural abilities.',
              'Career & Industry Resonance: pinpoint environments and roles that amplify your elements.',
              'Wealth Structure: analyse how resources flow, accumulate or disperse in your chart.',
              'Ten-Year Luck Phases: map transitions so you can plan long-range timing decisions.',
              'Numerology Insights: cross-reference life numbers for personality refinement.',
              'Energy Field Analysis: detect imbalances affecting health, productivity or relationships.',
              'Name Energy & Symbolism: evaluate how your name supports—or conflicts with—your destiny.',
              'Practical Adjustments: receive targeted remedies and timing-based action steps.'
            ]
          },
          {
            key: 'method',
            dividerTitle: 'How It Works',
            dividerSubtitle: 'Structure and motion',
            title: 'Fuse Pattern, Frequency and Timing',
            imageLabel: 'Methodology resonance map',
            imageUrl: '/images/page-360-advanced/360-adv-img-03.jpeg',
            body: 'We merge BaZi elemental logic, numerology frequency and name resonance to reveal who you are and how your destiny breathes.',
            points: [
              'Layered BaZi analysis showing elemental strengths, weaknesses and capacity.',
              'Numerology overlays that highlight behavioural codes and growth lessons.',
              'Name energy resonance audit comparing current vibration with destiny needs.',
              'Cycle mapping that connects structure (命) with movement (运) for practical decisions.'
            ]
          },
          {
            key: 'process',
            dividerTitle: 'Service Process',
            dividerSubtitle: 'From intake to decoding',
            title: 'Six Steps to an Advanced Blueprint',
            imageLabel: 'Advanced blueprint workflow',
            imageUrl: '/images/page-360-advanced/360-adv-img-04.jpeg',
            body: 'A comprehensive workflow ensures insight transforms into strategy.',
            points: [
              'Personal Information Collection – gather precise birth and name data.',
              'Comprehensive Data Analysis – integrate BaZi, numerology and energy mapping.',
              'Name Resonance Assessment – test alignment between your name and destiny field.',
              'Ten-Year & Annual Cycle Forecast – uncover long and short-term timing triggers.',
              'Blueprint Compilation – deliver a 200+ page in-depth destiny report.',
              'Interpretation Consultation – translate findings into personalised strategy.'
            ]
          },
          {
            key: 'audience',
            dividerTitle: 'Who It Is For',
            dividerSubtitle: 'Designed for turning points',
            title: 'Built for Those Ready to Level Up',
            imageLabel: 'Advanced audience storyboard',
            imageUrl: '/images/page-360-advanced/360-adv-img-05.jpeg',
            body: 'Perfect for individuals moving through major transitions or seeking mastery over timing.',
            points: [
              'Leaders planning significant personal or career pivots.',
              'Entrepreneurs syncing personal destiny with business growth.',
              'Professionals engineering long-term strategy through timing mastery.',
              'Individuals curious about how name energy shapes their trajectory.'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: 'Outcome & Value',
            dividerSubtitle: 'What you take away',
            title: 'A Time-Coded Master Plan',
            imageLabel: 'Destiny master plan map',
            imageUrl: '/images/page-360-advanced/360-adv-img-06.jpeg',
            body: `You leave with a complete, time-coded roadmap that shows who you are, how your cycles unfold and how to move forward with power and precision. Challenges become rhythm—not resistance—once you understand your internal frequency.`
          }
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: 'Ready to Unlock the Deeper Layers of Your Destiny?',
          dividerSubtitle: 'Reserve your Advanced Destiny Blueprint',
          title: 'Get Your Advanced Destiny Blueprint',
          message: 'Click to begin your personalised analysis and master the rhythm of your life.',
          primaryLabel: 'Get Your Advanced Destiny Blueprint',
          primaryHref: '/contact'
        }
      },
      supremeBlueprint: {
        badge: '360 Holistic',
        title: 'Supreme Destiny Blueprint',
        subtitle: 'When Heaven, Earth, and Human align — destiny becomes clarity.',
        sections: [
          {
            key: 'overview',
          dividerTitle: 'Overview',
          dividerSubtitle: 'Full-spectrum mastery',
          title: 'Unify Heaven, Earth and Human',
          imageLabel: 'Supreme destiny overview panel',
          imageUrl: '/images/page-360-supreme/360-pro-img-01.jpeg',
          body: `The Supreme Destiny Blueprint is a 300+ page full-spectrum consultation—the most complete edition in the Destiny Blueprint series. It unites BaZi, numerology, name energy and Feng Shui to reveal how time, space and personal energy converge so you can command every dimension of your life.`
        },
        {
          key: 'insight',
          dividerTitle: 'What It Reveals',
          dividerSubtitle: 'Holographic destiny system',
          title: 'See the Entire Ecosystem of Your Destiny',
          imageLabel: 'Destiny ecosystem board',
          imageUrl: '/images/page-360-supreme/360-pro-img-02.jpeg',
          body: 'This blueprint delivers the most complete metaphysical portrait available.',
          points: [
            'Talent & Core Potential: reveal innate gifts, hidden strengths and life mission.',
            'Career & Industry Blueprint: highlight industries and environments aligned with your element pattern.',
            'Wealth Structure: decode how prosperity flows, accumulates and is protected in your chart.',
              'Ten-Year Luck & Timing: map decadal transitions for long-range strategic planning.',
              'Numerology Insights: refine personality and behaviour through life number overlays.',
              'Energy Field Assessment: evaluate personal vibration and provide realignment guidance.',
              'Name Energy Optimisation: assess name resonance and suggest enhancements.',
              'Home Feng Shui Assessment: align residential energy with your personal destiny.',
              'Practical Remedies: deliver custom strategies to enhance opportunities and dissolve obstacles.'
            ]
          },
          {
            key: 'method',
          dividerTitle: 'How It Works',
          dividerSubtitle: 'Heaven · Earth · Human cohesion',
          title: 'Synchronise Heaven, Earth and Human',
          imageLabel: 'Heaven earth human alignment map',
          imageUrl: '/images/page-360-supreme/360-pro-img-03.jpeg',
          body: 'This consultation integrates Heaven (time cycles), Earth (Feng Shui and location energy), and Human (personal chart) into one cohesive analysis. By synchronising your personal destiny code with environmental and temporal flow, the Supreme Destiny Blueprint shows how to align every area of your life—career, wealth, health and relationships—with cosmic rhythm. You’ll gain:',
          points: [
            'A holographic understanding of your entire destiny system.',
            'A forward-looking blueprint for the coming decades of timing.',
            'An integrated plan that weaves time, space and energy into one strategy.'
            ]
          },
          {
            key: 'process',
          dividerTitle: 'Service Process',
          dividerSubtitle: 'From assessment to activation',
          title: 'Six Steps to a Supreme Blueprint',
          imageLabel: 'Supreme blueprint workflow',
          imageUrl: '/images/page-360-supreme/360-pro-img-04.jpeg',
          body: 'A rigorous workflow ensures insight becomes transformation.',
          points: [
            'Initial Consultation – clarify background, goals and life stage.',
            'Comprehensive Data Analysis – integrate BaZi, numerology, name energy and Feng Shui.',
            'Cycle Forecasting – map Ten-Year and Annual transitions for opportunity control.',
              'Energy Field Evaluation – assess personal and environmental resonance.',
              'Blueprint Compilation – deliver a 300+ page full-holographic destiny report.',
              'Interpretation Session – walk through insights with tailored strategy briefings.'
            ]
          },
          {
            key: 'audience',
          dividerTitle: 'Who It Is For',
          dividerSubtitle: 'For total alignment',
          title: 'Designed for Those Leading Whole Lifetimes',
          imageLabel: 'Supreme audience storyboard',
          imageUrl: '/images/page-360-supreme/360-pro-img-05.jpeg',
          body: 'Perfect for visionaries integrating destiny, energy and environment into one system.',
          points: [
            'Leaders and founders orchestrating multi-decade plans.',
            'Entrepreneurs engineering legacy ventures and wealth structures.',
            'Individuals at major crossroads in life, career or relationship.',
              'Homeowners aligning personal energy with residential Feng Shui.'
            ]
          },
          {
            key: 'outcome',
          dividerTitle: 'Outcome & Value',
          dividerSubtitle: 'What you receive',
          title: 'Own a Full-Holographic Destiny Ecosystem',
          imageLabel: 'Holographic destiny map',
          imageUrl: '/images/page-360-supreme/360-pro-img-06.jpeg',
          body: 'You receive the most detailed destiny intelligence ever designed—a complete holographic system that connects your inner blueprint with the outer world. The Supreme Destiny Blueprint empowers you to make every choice with confidence, foresight and resonance. When timing, environment and energy align, success stops being unpredictable—it becomes natural flow.'
        }
      ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: 'Ready to See Your Destiny in Full Dimension?',
          dividerSubtitle: 'Reserve your Supreme Destiny Blueprint',
          title: 'Get Your Supreme Destiny Blueprint',
          message: 'Click to begin your full-holographic consultation and experience destiny from every dimension.',
          primaryLabel: 'Get Your Supreme Destiny Blueprint',
          primaryHref: '/contact'
        }
      },
      enterpriseSite: {
        badge: 'Enterprise Advisory',
        title: 'Enterprise Site Strategy',
        subtitle: 'The site must harmonize landform energy, cosmic cycles, and business nature to endure prosperity.',
        sections: [
          {
            key: 'overview',
            dividerTitle: 'Overview',
            dividerSubtitle: 'Strategic site foresight',
            title: 'Where Earth and Enterprise Align',
            imageLabel: 'Enterprise site strategy collage',
            imageUrl: '/images/page-site/site-img-01.jpeg',
            body: `Enterprise Site Strategy is a specialised metaphysical consultation that helps organisations choose, evaluate and optimise locations using classical Feng Shui and time–space principles. It integrates landform, directional energy and cyclical timing to identify places that amplify opportunity instead of consuming it—ensuring every chosen ground supports long-term success.`
          },
          {
            key: 'insight',
            dividerTitle: 'What It Reveals',
            dividerSubtitle: 'Invisible forces, visible results',
            title: 'Expose the Energetic Blueprint of Each Site',
            imageLabel: 'Site energy intelligence board',
            imageUrl: '/images/page-site/site-img-02.jpeg',
            body: 'Every site carries a pattern of unseen energy that shapes business momentum. This analysis surfaces the levers you need.',
            points: [
              'Geographical Qi Flow: whether the surrounding topography gathers or scatters prosperity.',
              'Directional Wealth Line: ideal facing, entrance and flow paths that attract resources.',
              'Timing Alignment: auspicious periods to sign, renovate or launch operations.',
              'Industry Resonance: match between site element and business nature (Fire for tech, Metal for finance, etc.).',
              'Hidden Constraints: early warning for structures or alignments that may restrict performance.'
            ]
          },
          {
            key: 'method',
            dividerTitle: 'How It Works',
            dividerSubtitle: 'Land · Direction · Timing',
            title: 'Synchronise Enterprise Destiny with Terrain',
            imageLabel: 'Site resonance matrix',
            imageUrl: '/images/page-site/site-img-03.jpeg',
            body: 'We blend landform study, directional Feng Shui and cosmic timing to align corporate destiny with location energy so every square metre works with you—not against you.',
            points: [
              'Landform intelligence evaluates mountains, waterways and surrounding structures.',
              'Directional mapping determines optimal facing, entrances and internal flow.',
              'Timing overlays apply San Yuan cycles and activation dates.',
              'Enterprise calibration correlates company charts with site energy.',
              'Mitigation protocols outline remedies when terrain requires reinforcement.'
            ]
          },
          {
            key: 'process',
            dividerTitle: 'Service Process',
            dividerSubtitle: 'From scouting to decision',
            title: 'Six Steps to Site Selection Clarity',
            imageLabel: 'Enterprise site workflow board',
            imageUrl: '/images/page-site/site-img-04.jpeg',
            body: 'A rigorous workflow converts terrain diagnostics into board-level guidance.',
            points: [
              'Consultation & Objective Setting – clarify expansion goals and site criteria.',
              'Site Data Collection – gather coordinates, layouts and surroundings for shortlisted plots.',
              'Energy & Flow Analysis – review landform, facing and natural qi distribution.',
              'Timing & Cycle Review – match site potential with current and upcoming cycles.',
              'Comparative Ranking – score sites by synergy, resilience and regulatory fit.',
              'Strategic Delivery – present final recommendations with actionable timing and layout insights.'
            ]
          },
          {
            key: 'audience',
            dividerTitle: 'Who It Is For',
            dividerSubtitle: 'Land equals momentum',
            title: 'Built for Strategic Decision Makers',
            imageLabel: 'Leadership site evaluation briefing',
            imageUrl: '/images/page-site/site-img-05.jpeg',
            body: 'Designed for enterprises and investors whose next move depends on choosing ground that compounds success.',
            points: [
              'Companies establishing headquarters or entering new cities.',
              'Developers assessing high-value land or mixed-use investments.',
              'Retail and F&B brands selecting flagship or multi-outlet locations.',
              'Manufacturers relocating plants for logistics efficiency and energy stability.'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: 'Outcome & Value',
            dividerSubtitle: 'What you receive',
            title: 'A Prosperity Map for Your Next Site',
            imageLabel: 'Prosperity flow site map',
            imageUrl: '/images/page-site/site-img-06.jpeg',
            body: 'You gain more than a report—you receive a strategic map of prosperity flow. Enterprise Site Strategy empowers confident selection so your new foundation resonates with Heaven’s timing and Earth’s rhythm, making growth sustainable rather than accidental.'
          }
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: 'Ready to Find the Ground Where Fortune Begins?',
          dividerSubtitle: 'Reserve your site selection consultation',
          title: 'Start Your Site Strategy Consultation',
          message: 'Click to begin your personalised site consultation and discover where your enterprise truly belongs.',
          primaryLabel: 'Start Your Site Strategy Consultation',
          primaryHref: '/contact'
        },
        newsletterTitle: 'Enterprise Site Dispatch',
        newsletterSubtitle: 'Landform intelligence, timing alerts and location optimisation for executive teams.'
      },
      enterpriseCycles: {
        badge: 'Enterprise Advisory',
        title: 'Enterprise Strategy & Cycle Intelligence',
        subtitle: 'Those who move with time, move ahead of fate.',
        sections: [
          {
            key: 'overview',
            dividerTitle: 'Overview',
            dividerSubtitle: 'Strategy meets cosmic timing',
            title: 'Use the Rhythm of Time as a Strategic Asset',
            imageLabel: 'Enterprise timing intelligence collage',
            imageUrl: '/images/page-cycles/cycles-img-01.jpeg',
            body: `Enterprise Strategy & Cycle Intelligence is an advanced metaphysical consultation that aligns business decisions with the natural rhythm of time. It bridges strategic planning with metaphysical timing—revealing when expansion thrives, when to consolidate, and when to shift direction so cosmic rhythm becomes a practical competitive edge.`
          },
          {
            key: 'insight',
            dividerTitle: 'What It Reveals',
            dividerSubtitle: 'Cycles decoded',
            title: 'See the Patterns Behind Performance',
            imageLabel: 'Cycle diagnostics board',
            imageUrl: '/images/page-cycles/cycles-img-02.jpeg',
            body: 'Every company operates inside cycles of markets, people and time. This consultation uncovers the hidden cadence steering results.',
            points: [
              'Strategic Timing: when to grow, pause or pivot based on destiny trends.',
              'Cycle Mapping: locate your current phase in the prosperity curve.',
              'Opportunity Windows: identify upcoming months or years favourable for launches, funding or alliances.',
              'Crisis Forecast: detect volatility and internal misalignment before they erupt.',
              'Momentum Optimisation: synchronise leadership actions with cosmic flow.'
            ]
          },
          {
            key: 'method',
            dividerTitle: 'How It Works',
            dividerSubtitle: 'Heaven · Earth · Human alignment',
            title: 'Translate Cosmic Rhythm into Boardroom Intelligence',
            imageLabel: 'Heaven earth human resonance map',
            imageUrl: '/images/page-cycles/cycles-img-03.jpeg',
            body: 'We map the enterprise founding chart, leadership rhythm and market flow against greater celestial cycles, revealing resonance and friction between Heaven (timing), Earth (operations) and Human (decisions). The result is timing guidance executives can act on.',
            points: [
              'Founding destiny profile with cycle overlays.',
              'Leadership timing dashboard matched to corporate targets.',
              'Industry cycle correlation using macro yin-yang trends.',
              'Cycle heatmaps showing active vs dormant phases.',
              'Risk and opportunity tagging for upcoming windows.'
            ]
          },
          {
            key: 'process',
            dividerTitle: 'Service Process',
            dividerSubtitle: 'From intent to implementation',
            title: 'Six Steps to Cycle-Led Strategy',
            imageLabel: 'Cycle strategy workflow board',
            imageUrl: '/images/page-cycles/cycles-img-04.jpeg',
            body: 'A structured pathway converts metaphysical timing into executable action plans.',
            points: [
              'Strategic Briefing – align on goals, challenges and horizon.',
              'Cycle Profiling – analyse enterprise destiny and leadership cadence.',
              'External Alignment – sync internal rhythm with market and macro cycles.',
              'Period Forecasting – map 1/3/10-year growth and caution phases.',
              'Interpretation Session – translate insights into plain, strategic language.',
              'Action Blueprint – deliver a time-based plan with key focus points.'
            ]
          },
          {
            key: 'audience',
            dividerTitle: 'Who It Is For',
            dividerSubtitle: 'Clarity before commitment',
            title: 'For Leaders Steering Pivotal Moves',
            imageLabel: 'Leadership timing briefing',
            imageUrl: '/images/page-cycles/cycles-img-05.jpeg',
            body: 'Ideal for leadership teams and investors who require timing insight before committing capital and resources.',
            points: [
              'CEOs and founders planning expansion or restructure.',
              'Investors timing market entry, scaling or divestment.',
              'Teams managing rapid growth, integration or transition.',
              'Visionaries aligning destiny with long-term business cycles.'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: 'Outcome & Value',
            dividerSubtitle: 'What you receive',
            title: 'A Strategic Rhythm Playbook',
            imageLabel: 'Time-centred strategy map',
            imageUrl: '/images/page-cycles/cycles-img-06.jpeg',
            body: 'You leave with deep clarity on where your company sits in the time cycle and how to turn timing into advantage. Enterprise Strategy & Cycle Intelligence merges destiny rhythm with decision science so leadership acts with foresight—not hindsight—making success repeatable rather than accidental.'
          }
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: 'Ready to Master the Rhythm of Your Enterprise?',
          dividerSubtitle: 'Reserve your strategy & cycle consultation',
          title: 'Start Your Strategy & Cycle Consultation',
          message: 'Click to begin your personalised session and turn timing into strategic power.',
          primaryLabel: 'Start Your Strategy & Cycle Consultation',
          primaryHref: '/contact'
        },
        newsletterTitle: 'Enterprise Cycle Dispatch',
        newsletterSubtitle: 'Cycle alerts, timing forecasts and rhythm optimisation for executive teams.'
      },
            celestialNumbers: {
        badge: 'Imperial Oracle',
        title: 'Supreme Celestial Numbers',
        subtitle: 'Decode the rhythm of time and move in sync with your destiny.',
        sections: [
          {
            key: 'overview',
            dividerTitle: 'Overview',
            dividerSubtitle: 'Service synopsis',
            title: 'Live in Rhythm with Destiny',
            imageLabel: 'Time, space and destiny woven together',
            imageUrl: '/images/page-supreme-celestial/supreme-image-01.jpeg',
            body: `Supreme Celestial Numbers is a precision metaphysical consultation that decodes how time, space and personal destiny intertwine. Rooted in the ancient Huangji Tian Shu philosophy, it reveals not only what may happen but why events unfold and how to act before they surface so you move with, not against, the current of time.`,
          },
          {
            key: 'insight',
            dividerTitle: 'What It Reveals',
            dividerSubtitle: 'Uncover your hidden timeline',
            title: 'See the Rhythm Beneath Every Chapter',
            imageLabel: 'Destiny rhythm insight board',
            imageUrl: '/images/page-supreme-celestial/supreme-image-02.jpeg',
            body: 'Every life follows an invisible rhythm. This reading uncovers the currents shaping your decisions before they surface.',
            points: [
              'Life Momentum: when your personal cycle strengthens or wanes.',
              'Turning Points: windows of opportunity and risk before they appear.',
              'Hidden Influences: people, environments or timing shaping results silently.',
              'The Grand Blueprint: the overarching theme your destiny is unfolding.',
            ],
          },
          {
            key: 'method',
            dividerTitle: 'How It Works',
            dividerSubtitle: 'Celestial mathematics in action',
            title: 'Align Inner Rhythm with Cosmic Timing',
            imageLabel: 'Celestial mathematics overlay',
            imageUrl: '/images/page-supreme-celestial/supreme-image-03.jpeg',
            body: `Through celestial mathematics and temporal mapping, the oracle aligns your personal timeline with the universal cycle of change. It reveals the harmony and tension between your inner rhythm and the world's external timing so clarity replaces guesswork.`,
            points: [
              'A destiny map that makes clear which side time currently stands on.',
              'Command of energy rhythms across the coming year and decade.',
              'A decision reference that clarifies when to advance and when to hold.',
            ],
          },
          {
            key: 'process',
            dividerTitle: 'Service Process',
            dividerSubtitle: 'From data to directives',
            title: 'Five Steps from Intake to Blueprint',
            imageLabel: 'Celestial consultation workflow board',
            imageUrl: '/images/page-supreme-celestial/supreme-image-04.jpeg',
            body: 'Our workflow turns metaphysical insight into precise guidance, from first contact through the action blueprint.',
            points: [
              'Information Intake – collect essential birth or founding details and focus area.',
              'Celestial Mapping – construct your personalised destiny timeline.',
              'Cycle Analysis – decode long, medium and short-term prosperity phases.',
              'Interpretation Session – hold a one-to-one briefing in clear, practical language.',
              'Action Blueprint – deliver customised timing, focus and directional guidance.',
            ],
          },
          {
            key: 'audience',
            dividerTitle: 'Who It Is For',
            dividerSubtitle: 'People who sense change',
            title: 'Designed for Leaders Who Feel the Shift',
            imageLabel: 'Leaders preparing pivotal decisions',
            imageUrl: '/images/page-supreme-celestial/supreme-image-05.jpeg',
            body: 'Ideal for individuals and teams who notice momentum shifting and want clarity before acting.',
            points: [
              'Executives making pivotal choices.',
              'Entrepreneurs preparing transformation.',
              'Professionals navigating uncertainty.',
              `Anyone sensing life's rhythm changing but unsure of direction.`,
            ],
          },
          {
            key: 'outcome',
            dividerTitle: 'Outcome & Value',
            dividerSubtitle: 'What you take away',
            title: 'Leave with a Time-Coded Strategy',
            imageLabel: 'Time-coded strategic blueprint',
            imageUrl: '/images/page-supreme-celestial/supreme-image-06.jpeg',
            body: 'You receive a time-coded strategy for your next chapter. Know what to accelerate, what to pause and what to release as Supreme Celestial Numbers realigns you with the current of time so opportunities meet you halfway.',
          },
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: 'Ready to See the Pattern Behind Time?',
          dividerSubtitle: 'Reserve your Supreme Celestial Numbers session',
          title: 'Start Your Celestial Numbers Consultation',
          message: 'Click to begin your personalised session and unlock the logic of your destiny.',
          primaryLabel: 'Start Your Celestial Numbers Consultation',
          primaryHref: '/contact',
        },
        newsletterTitle: 'Celestial Numbers Dispatch',
        newsletterSubtitle: 'Temporal pattern intelligence, opportunity windows and rhythm calibration notes.',
      },
    },
    academyOverview: {
      badge: 'Academy',
      title: 'Metaphysics Mastery Pathway',
      subtitle: 'From Foundation to Mastery – A Complete Journey into Chinese Metaphysics',
      sections: [
        {
          key: 'overview',
          type: 'text',
          dividerTitle: 'Overview',
          dividerSubtitle: 'The complete journey',
          title: 'A Progressive Pathway to Mastery',
          paragraphs: [
            'The Metaphysics Mastery Pathway is a complete, progressive journey that takes you from foundational understanding to professional-level mastery of Chinese metaphysics.',
            'It unites the wisdom of BaZi, Zi Wei Dou Shu, Feng Shui, Numerology and Qi Men Dun Jia, translating classical knowledge into modern, applicable life strategy.',
            'You will not only learn to interpret destiny—you will learn to flow with it.'
          ]
        },
        {
          key: 'path',
          type: 'levels',
          dividerTitle: 'Learning Path',
          dividerSubtitle: 'Four levels of structured progression',
          title: 'A Cohesive Four-Level Journey',
          intro: 'The pathway consists of four progressive levels, each deepening your understanding and real-world mastery.',
          levels: [
            {
              key: 'foundation',
              badge: '🜃 1️⃣',
              slug: 'foundation',
              anchor: 'foundation-course',
              title: 'Chinese Metaphysics Foundation',
              duration: '3–6 Months',
              body: 'Establish your foundation in Yin-Yang balance, Five Elements theory and cosmic cycles. Understand how Heaven (timing), Earth (environment) and Human (decision) interact—the framework behind all metaphysical systems.',
              ctaLabel: 'Learn More'
            },
            {
              key: 'beginner',
              badge: '🜃 2️⃣',
              slug: 'beginner',
              anchor: 'beginner-course',
              title: 'Beginners',
              duration: '6 Months',
              body: 'Dive into the core systems of BaZi, Zi Wei Dou Shu, Numerology and Qi Men Dun Jia. Learn how destiny charts are structured, how energy patterns are formed and how direction and time influence outcomes. By the end of this level, you can interpret foundational charts and spot personal destiny patterns with confidence.',
              ctaLabel: 'Learn More'
            },
            {
              key: 'advanced',
              badge: '🜃 3️⃣',
              slug: 'advanced',
              anchor: 'advanced-course',
              title: 'Advanced',
              duration: '3 Months',
              body: 'Integrate every metaphysical system to analyse complex relationships between time, elements and space. Practise high-level chart interpretation, case study analysis and timing-based forecasting using Qi Men and BaZi cross-validation. Gain the insight to decode major life transitions and strategic decision timing.',
              ctaLabel: 'Learn More'
            },
            {
              key: 'professional',
              badge: '🜃 4️⃣',
              slug: 'professional',
              anchor: 'professional-course',
              title: 'Professional',
              duration: '3 Months',
              body: 'Transition from learner to practitioner. Learn to conduct consultations, compile professional destiny reports and communicate metaphysical insight with clarity and precision. This level focuses on advanced synthesis, ethics and real-world application for client guidance or business consulting.',
              ctaLabel: 'Learn More'
            }
          ]
        },
        {
          key: 'curriculum',
          type: 'bullets',
          dividerTitle: 'What You Will Learn',
          dividerSubtitle: 'Capabilities you build',
          title: 'Build Strategic Metaphysics Skills',
          points: [
            'Full comprehension of Yin-Yang and Five Elements interactions.',
            'Chart-building and analysis across BaZi, Zi Wei, Numerology and Qi Men.',
            'Application of Feng Shui and energy flow logic.',
            'Ten-Year and Annual luck cycle interpretation.',
            'Timing and opportunity management for life and business.',
            'Integration of metaphysics into decision-making and leadership.'
          ]
        },
        {
          key: 'format',
          type: 'details',
          dividerTitle: 'Teaching Method & Format',
          dividerSubtitle: 'Theory, casework and mentorship',
          title: 'A Guided Hybrid Learning Experience',
          body: 'Each level blends theory, guided casework and mentorship.',
          details: [
            { label: 'Format', value: 'Online + in-person hybrid' },
            { label: 'Duration', value: '3–6 months per level' },
            { label: 'Materials', value: 'Visual charts, workbooks and live case examples' },
            { label: 'Mentorship', value: 'One-on-one feedback and Q&A checkpoints' },
            { label: 'Certification', value: 'Official certificate awarded at each level' }
          ]
        },
        {
          key: 'audience',
          type: 'bullets',
          dividerTitle: 'Who It Is For',
          dividerSubtitle: 'Designed for clarity and command',
          title: 'Built for Learners Seeking Mastery',
          points: [
            'Individuals exploring personal destiny and potential.',
            'Practitioners advancing into deeper technical understanding.',
            'Coaches, healers and consultants integrating metaphysics.',
            'Entrepreneurs and leaders applying timing intelligence for foresight.'
          ]
        },
        {
          key: 'outcome',
          type: 'text',
          dividerTitle: 'Outcome & Value',
          dividerSubtitle: 'Where the pathway leads',
          title: 'Transform Knowledge into Strategic Foresight',
          paragraphs: [
            'Upon completing the Metaphysics Mastery Pathway, you can interpret, forecast and realign destiny patterns across multiple systems.',
            'You gain mastery not only in theory but in practice—transforming insight into foresight, and foresight into confident action.'
          ]
        }
      ],
      faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
        dividerTitle: 'Enroll in the Metaphysics Mastery Pathway',
        dividerSubtitle: 'Begin your certified journey from Foundation to Professional Mastery.',
        title: 'Start Your Metaphysics Mastery Pathway',
        message: 'Click below to begin your certified journey—from Foundation to Professional Mastery.',
        primaryLabel: 'Enroll Now',
        primaryHref: '/contact'
      }
    },
    academyFoundation: {
      hero: {
        badge: 'Academy',
        title: 'Chinese Metaphysics Foundation',
        subtitle: 'Build the Foundation · Understand Heaven & Humanity · Master the Logic Behind Destiny',
        primaryLabel: 'Enroll Now',
        primaryHref: '/contact',
        secondaryLabel: 'Back to Course Overview',
        secondaryHref: '/academy/courses'
      },
      sections: [
        {
          key: 'overview',
          dividerTitle: 'Overview',
          dividerSubtitle: 'Course summary',
          title: 'Lay the Blueprint for Every Metaphysical Discipline',
          paragraphs: [
            'The Chinese Metaphysics Foundation course is the cornerstone of your entire metaphysical journey. It introduces the essential frameworks of Chinese metaphysics—Yin and Yang, the Five Elements, Heavenly Stems, Earthly Branches, and the dynamic flow of Qi—revealing the rational energetic architecture behind life events, personality traits and timing cycles.',
            'By grounding yourself in these principles, you move beyond superstition into structured, accountable insight. Destiny stops feeling mysterious; it becomes a system you can read, anticipate and align with confidence.'
          ]
        },
        {
          key: 'curriculum',
          dividerTitle: 'What You Will Learn',
          dividerSubtitle: 'Core building blocks',
          title: 'Decode the Universal Rules Behind Destiny',
          points: [
            'Yin & Yang dynamics: the dual forces shaping balance, polarity and transformation.',
            'Five Elements (Wu Xing): Wood, Fire, Earth, Metal and Water as the energetic blueprint of creation.',
            'Heavenly Stems & Earthly Branches: the 60 Jia Zi cycle that ties time, behaviour and fate together.',
            'Qi movement & environmental resonance: how energy circulates through seasons, locations and decisions.',
            'The Heaven–Earth–Human triad: positioning yourself within the cosmic code so action meets timing.'
          ]
        },
        {
          key: 'why',
          dividerTitle: 'Why It Matters',
          dividerSubtitle: 'The base of every discipline',
          title: 'Master Concepts Before Methods',
          paragraphs: [
            'BaZi, Zi Wei Dou Shu, Qi Men Dun Jia and Feng Shui all rest on these foundations. Without a coherent grasp of the underlying logic, advanced study becomes fragmented opinion instead of repeatable analysis.',
            'This course gives you the mental structure and energetic intuition to interpret any metaphysical system with clarity—protecting you from misconceptions and helping you apply techniques responsibly.'
          ]
        },
        {
          key: 'structure',
          dividerTitle: 'Course Structure',
          dividerSubtitle: '3–6 month journey',
          title: 'Blend Theory with Applied Practice',
          paragraphs: [
            'Across 3–6 months you move from core principles into applied interpretation, combining lectures, guided study and practice labs.'
          ],
          points: [
            'Module 1 · Logic of Yin & Yang — universal duality, balance and transformation.',
            'Module 2 · Five Elements Cycle — creation, control and elemental diagnostics.',
            'Module 3 · Heavenly Stems & Earthly Branches — the cosmic calendar and 60 Jia Zi rhythm.',
            'Module 4 · Energy Flow & Qi Patterns — how movement shapes momentum and outcomes.',
            'Module 5 · Applied Foundation Practice — reading people and environments through elemental balance.'
          ]
        },
        {
          key: 'audience',
          dividerTitle: 'Who It Is For',
          dividerSubtitle: 'Designed for seekers of structure',
          title: 'Built for New Learners and Returning Practitioners',
          points: [
            'New students exploring how Chinese metaphysics actually works.',
            'Advanced learners solidifying conceptual clarity before deeper study.',
            'Practitioners from other modalities seeking systematic grounding.',
            'Individuals curious about destiny mechanics beyond belief or myth.'
          ]
        },
        {
          key: 'outcome',
          dividerTitle: 'Outcome & Value',
          dividerSubtitle: 'Where this foundation leads',
          title: 'Gain the Language of Destiny Itself',
          paragraphs: [
            'By completing the Chinese Metaphysics Foundation, you gain a clear, structured understanding of how destiny and energy interact. Fate stops being coincidence—it becomes a pattern you can interpret, anticipate and harmonise with.',
            'This course does more than transfer knowledge. It gives you the language of destiny so every future method—BaZi, Zi Wei, Qi Men or Feng Shui—slots into place with precision.'
          ]
        }
      ],
      faq: [
        { question: 'Which core frameworks will I master?', answer: 'You will internalise Yin-Yang dynamics, the Five Elements cycle, and the 10 Heavenly Stems / 12 Earthly Branches so every later chart or timing method has a clear structure.' },
        { question: 'How does this course connect to advanced study?', answer: 'It creates the conceptual bridge to the Beginner Track—once you grasp the elemental logic here, multi-system analysis in BaZi, Zi Wei and Qi Men becomes much easier.' },
        { question: 'Will we practise on real charts?', answer: 'Yes. Guided labs walk you through real-world case studies so you can apply elemental balance, timing rhythms and Qi flow to practical scenarios.' },
        { question: 'Do I keep the learning resources after class?', answer: 'You retain lifetime access to the workbooks, reference decks and recorded sessions, so you can revisit the material whenever you progress to the next tier.' }
      ],
      cta: {
        dividerTitle: 'Ready to Begin Your Foundation?',
        dividerSubtitle: 'Start the journey toward mastery',
        title: 'Enroll in the Chinese Metaphysics Foundation',
        message: 'Click below to reserve your seat in the next cohort or reconnect with the core logic behind destiny.',
        primaryLabel: 'Enroll Now',
        primaryHref: '/contact',
        secondaryLabel: 'Back to Course Overview',
        secondaryHref: '/academy/courses'
      }
    },
    academyBeginner: {
      hero: {
        badge: 'Academy',
        title: "Beginner's Metaphysic Course",
        subtitle: 'Step Into Metaphysics · Decode the Hidden Order · Open the First Door to Destiny',
        primaryLabel: 'Enroll Now',
        primaryHref: '/contact',
        secondaryLabel: 'Back to Course Overview',
        secondaryHref: '/academy/courses'
      },
      sections: [
        {
          key: 'overview',
          dividerTitle: 'Overview',
          dividerSubtitle: 'Course snapshot',
          title: 'Bridge Curiosity into Structured Clarity',
          paragraphs: [
            "The Beginner's Metaphysic Course is the bridge between curiosity and clarity—built for learners ready to explore the energetic language behind destiny.",
            'Across six months you journey through BaZi, Zi Wei Dou Shu, numerology and Qi Men Dun Jia so you can see how timing, elemental balance and spatial flow weave together to shape real outcomes.',
            "You will learn how to interpret entry-level charts, recognise structural patterns and read the unseen influences that guide decisions, opportunities and challenges."
          ]
        },
        {
          key: 'curriculum',
          dividerTitle: 'What You Will Learn',
          dividerSubtitle: 'Core disciplines',
          title: 'Activate Four Metaphysical Systems',
          points: [
            'BaZi foundations: understand the Four Pillars, elemental strength and how they influence personality, potential and timing.',
            'Zi Wei Dou Shu basics: explore star groupings and how each palace reflects critical life arenas.',
            'Numerology and life path: decode birth numbers to reveal personal vibration and destiny flow.',
            'Qi Men Dun Jia overview: learn how time, direction and energy converge to open windows of advantage.',
            'Practical interpretation: connect theory to real scenarios through guided chart reading and case practice.'
          ]
        },
        {
          key: 'why',
          dividerTitle: 'Why It Matters',
          dividerSubtitle: 'Clarity over guesswork',
          title: 'See the Blueprint Instead of Guessing',
          paragraphs: [
            'Understanding metaphysics at this level is like studying the architectural drawing of life—you stop guessing and start seeing how everything connects.',
            'It gives you a clear lens on strengths, timing windows and decision cycles so you can navigate with foresight instead of confusion.'
          ]
        },
        {
          key: 'structure',
          dividerTitle: 'Course Structure',
          dividerSubtitle: '6-month guided journey',
          title: 'Modular Learning with Guided Practice',
          paragraphs: [
            'This is a six-month immersive pathway that blends teaching, guided interpretation and application so concepts immediately translate into skill.'
          ],
          points: [
            'Module 1 · BaZi Framework — chart building, elemental calibration and personal analysis.',
            'Module 2 · Zi Wei Chart Reading — palace dynamics, star interpretation and life overview.',
            'Module 3 · Numerology Fundamentals — life path and destiny numbers decoded for practical use.',
            'Module 4 · Qi Men Dun Jia Overview — time-space energetics and foundational plate layouts.',
            'Module 5 · Integration Practice — real-case interpretation clinics with mentor Q&A.'
          ]
        },
        {
          key: 'audience',
          dividerTitle: 'Who It Is For',
          dividerSubtitle: 'Built for committed explorers',
          title: 'Designed for Learners Ready to Apply Insight',
          points: [
            'Individuals curious about how metaphysics shapes life direction and daily decisions.',
            'Students seeking a structured pathway before moving into advanced disciplines.',
            'Practitioners from adjacent fields who want to integrate destiny logic into their work.',
            "Anyone ready to begin reading their own or others' destiny charts with accountability."
          ]
        },
        {
          key: 'outcome',
          dividerTitle: 'Outcome & Value',
          dividerSubtitle: 'What changes after six months',
          title: 'Read Destiny Charts with Confidence',
          paragraphs: [
            "By completing the Beginner's course you gain the ability to interpret foundational charts across four core systems.",
            'Destiny stops feeling mysterious—it becomes structured, readable and actionable.',
            'You expand perception, strengthen intuition and build the platform needed for every advanced or professional track that follows.'
          ]
        }
      ],
      cta: {
        dividerTitle: 'Ready to Begin Your Beginner Track?',
        dividerSubtitle: 'Start your six-month journey',
        title: "Enroll in the Beginner's Metaphysic Course",
        message: 'Click below to begin your six-month journey into the logic of destiny and energy flow.',
        primaryLabel: 'Enroll Now',
        primaryHref: '/contact',
        secondaryLabel: 'Back to Course Overview',
        secondaryHref: '/academy/courses'
      }
    },
    academyIntermediate: {
      hero: {
        badge: 'Academy',
        title: 'Advanced Course',
        subtitle: 'Integrate the Arts · Master Destiny Intersections · See the Hidden Order Behind Life',
        primaryLabel: 'Enroll Now',
        primaryHref: '/contact',
        secondaryLabel: 'Back to Course Overview',
        secondaryHref: '/academy/courses'
      },
      sections: [
        {
          key: 'overview',
          dividerTitle: 'Overview',
          dividerSubtitle: 'Course focus',
          title: 'Integrate Multiple Systems into One Command Framework',
          paragraphs: [
            'The Advanced Course is where theory transforms into mastery. Building on the foundation and beginner levels, this stage shows you how to integrate BaZi, Zi Wei Dou Shu, numerology, Feng Shui and Qi Men Dun Jia into a cohesive interpretive workflow.',
            'You will analyse how time, elements and space interact, identify chart cause and effect, and spot turning points before they manifest. Destiny becomes a map—one you can read, navigate and influence with clarity.'
          ]
        },
        {
          key: 'curriculum',
          dividerTitle: 'What You Will Learn',
          dividerSubtitle: 'Integration skill set',
          title: 'Cross-Validate Every Axis of Destiny',
          points: [
            'Integrated chart analysis: cross-interpret BaZi, Zi Wei and Qi Men to reveal timing intersections.',
            'Cycle mapping: track ten-year and annual luck trends and their relationship with environmental qi.',
            'Feng Shui application: align personal destiny patterns with residential or workplace energy.',
            'Numerology expansion: deepen life path resonance with cosmic timing windows.',
            'Advanced case studies: practise on real scenarios to sharpen precision and pattern recognition.'
          ]
        },
        {
          key: 'why',
          dividerTitle: 'Why It Matters',
          dividerSubtitle: 'Beyond surface reading',
          title: 'Turn Knowledge into Strategic Foresight',
          paragraphs: [
            'This level transforms metaphysics from scattered knowledge into strategic insight. You learn how separate systems confirm and balance one another—a hallmark of professional practitioners.',
            'By integrating logic and intuition you can decode complex destinies and deliver grounded guidance that truly shifts decisions.'
          ]
        },
        {
          key: 'structure',
          dividerTitle: 'Course Structure',
          dividerSubtitle: '3-month intensive',
          title: 'Modules That Blend Integration with Practice',
          paragraphs: [
            'A three-month intensive journey combining system synthesis, live casework and mentor guidance.'
          ],
          points: [
            'Module 1 · Cross-System Framework — how BaZi, Zi Wei and Qi Men interact.',
            'Module 2 · Cycle Forecasting — analysing timing patterns and life transitions.',
            'Module 3 · Feng Shui Resonance — matching destiny codes with space and environment.',
            'Module 4 · Numerology Depth — applying energy frequency to time-based decisions.',
            'Module 5 · Case Application — constructing cohesive interpretations from real engagements.'
          ]
        },
        {
          key: 'audience',
          dividerTitle: 'Who It Is For',
          dividerSubtitle: 'Built for committed analysts',
          title: 'Designed for Practitioners Elevating to Multi-System Mastery',
          points: [
            'Learners who have completed the foundation and beginner levels.',
            'Practitioners seeking to integrate multiple metaphysical systems into one workflow.',
            'Consultants refining interpretive precision for client engagements.',
            'Individuals ready to forecast timing windows and guide others with confidence.'
          ]
        },
        {
          key: 'outcome',
          dividerTitle: 'Outcome & Value',
          dividerSubtitle: 'What changes post-course',
          title: 'Read Destiny Intersections with Confidence',
          paragraphs: [
            'By completing the Advanced Course you gain the rare ability to read the intersections where time, space and energy converge.',
            'Metaphysics becomes a coherent system rather than fragments, empowering you to anticipate shifts and align life decisions with cosmic rhythm.'
          ]
        }
      ],
      cta: {
        dividerTitle: 'Ready to Master Multi-System Integration?',
        dividerSubtitle: 'Begin your three-month intensive',
        title: 'Enroll in the Advanced Course',
        message: 'Click below to begin your three-month journey into multi-system integration and destiny mastery.',
        primaryLabel: 'Enroll Now',
        primaryHref: '/contact',
        secondaryLabel: 'Back to Course Overview',
        secondaryHref: '/academy/courses'
      }
    },
    academyProfessional: {
      hero: {
        badge: 'Academy',
        title: 'Professional Course & Certification',
        subtitle: 'From Learning to Mastery · From Knowledge to Guidance',
        primaryLabel: 'Enroll Now',
        primaryHref: '/contact',
        secondaryLabel: 'Back to Course Overview',
        secondaryHref: '/academy/courses'
      },
      sections: [
        {
          key: 'overview',
          dividerTitle: 'Overview',
          dividerSubtitle: 'Pathway pinnacle',
          title: 'Turn Mastery into Professional Practice',
          paragraphs: [
            'The Professional Course & Certification marks the summit of the Metaphysics Mastery Pathway—built for learners ready to transform knowledge into practice and practice into purpose.',
            'This stage refines analytical technique, strengthens consulting communication and establishes the professional standards required to advise with accuracy, ethics and confidence.'
          ]
        },
        {
          key: 'curriculum',
          dividerTitle: 'What You Will Learn',
          dividerSubtitle: 'Professional toolkit',
          title: 'Four Domains of Professional Command',
          points: [
            'Consulting framework: structured engagements from discovery to delivery.',
            'Advanced interpretation logic: integrate BaZi, Zi Wei, numerology, Feng Shui and Qi Men inside one diagnostic model.',
            'Client communication & ethics: cultivate clarity, empathy and integrity throughout every session.',
            'Report writing & presentation: craft comprehensive destiny reports and present actionable guidance.',
            'Certification practicum: supervised readings and project assignments that lead to accreditation.'
          ]
        },
        {
          key: 'why',
          dividerTitle: 'Why It Matters',
          dividerSubtitle: 'Wisdom with responsibility',
          title: 'Translate Insight into Human Impact',
          paragraphs: [
            'This stage is about embodying wisdom, not just memorising information. Becoming a certified consultant means translating destiny data into human understanding and practical action.',
            'You gain the technical depth and emotional maturity to serve responsibly, turning metaphysical insight into transformative outcomes.'
          ]
        },
        {
          key: 'structure',
          dividerTitle: 'Course Structure',
          dividerSubtitle: '3-month practicum',
          title: 'Mentored Practicum with Certification Evaluation',
          paragraphs: [
            'A three-month intensive combining mentorship, supervised cases and final certification assessments.'
          ],
          points: [
            'Module 1 · Consulting Framework & Ethics — professional standards and service flow.',
            'Module 2 · Cross-System Analysis — blending all five systems for holistic readings.',
            'Module 3 · Client Simulation & Practice — guided sessions with instructor feedback.',
            'Module 4 · Report Writing & Presentation — delivering polished written and verbal guidance.',
            'Module 5 · Certification Assessment — written and oral evaluations for official recognition.'
          ]
        },
        {
          key: 'audience',
          dividerTitle: 'Who It Is For',
          dividerSubtitle: 'Designed for practitioners',
          title: 'Built for Future Metaphysics Consultants',
          points: [
            'Graduates of the Advanced Course seeking formal certification.',
            'Practitioners preparing to operate as professional metaphysics consultants.',
            'Coaches, wellness and consulting professionals adding metaphysical depth.',
            'Individuals ready to guide others ethically and confidently with destiny insight.'
          ]
        },
        {
          key: 'outcome',
          dividerTitle: 'Outcome & Value',
          dividerSubtitle: 'After certification',
          title: 'Become a Certified Metaphysics Consultant',
          paragraphs: [
            'Upon completion you are recognised as a Certified Metaphysics Consultant equipped with advanced analysis, interpretation and client management skills.',
            'You graduate with more than a certificate—you leave with mastery, ready to serve, advise and lead within the field of Chinese metaphysics.'
          ]
        }
      ],
      cta: {
        dividerTitle: 'Ready to Earn Your Certification?',
        dividerSubtitle: 'Begin the final stage of mastery',
        title: 'Enroll in the Professional Course & Certification',
        message: 'Click below to start your final step toward professional certification and metaphysics mastery.',
        primaryLabel: 'Enroll Now',
        primaryHref: '/contact',
        secondaryLabel: 'Back to Course Overview',
        secondaryHref: '/academy/courses'
      }
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
      foundation: '玄学基础课程',
      beginner: '初阶课程',
      advanced: '进阶课程',
      pro: '专业认证',
      enterprise: '企业咨询',
      audit: '企业风水格局',
      site: '天元企业选址',
      cycles: '企业战略布局',
      pricing: '服务定价',
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
    pricing: {
      heroTitle: '服务套餐与定价',
      heroSubtitle: '为领袖、传承者与企业团队量身打造的高精度玄学方案。',
      heroDescription: '以上价格以马来西亚令吉（MYR）计价。确认目标并完成50%订金后启动项目，余款于交付核心报告或咨询当日结清。',
      noticeTitle: '每项服务均包含',
      noticePoints: [
        '启动访谈：梳理目标、关键决策者与限制条件。',
        '真太阳时校准并以多术数交叉验证成果。',
        '中英双语交付，附高层摘要与执行摘要。',
        '交付后30天内提供邮件支持，协助落地与答疑。'
      ],
      currencyNote: '费用不含差旅、现场勘查与相关税费。国际项目可按MYR或USD结算，汇率以签约当日为准。',
      categories: [
        {
          key: 'celestial',
          title: '命运情报体系',
          subtitle: '适用于创办人、投资人及关键岗位人才的深度命理项目。',
          tiers: [
            {
              name: '命运算法（八字）',
              price: 'RM 6,888',
              cadence: '每位高层调研',
              href: '/services/celestial/destiny-algorithm',
              features: [
                '180页中英双语命盘，涵盖命局、影响力与节奏窗口。',
                '90分钟策略咨询，附12个月行动路线。',
                '真太阳时推演，结合关系与领导力位置分析。'
              ]
            },
            {
              name: '帝星天图（紫微）',
              price: 'RM 9,888',
              cadence: '每份帝星天图',
              href: '/services/celestial/imperial-star-atlas',
              features: [
                '十二宫位深度解析，定位权力、资本与公众叙事。',
                '六个重点启动窗口，匹配利益相关者与媒体节奏。',
                '传承、联盟与声誉布局的高层保密简报。'
              ]
            },
            {
              name: '玄机战策（奇门）',
              price: 'RM 8,588',
              cadence: '每次任务部署',
              href: '/services/celestial/arcane-strategy-matrix',
              features: [
                '针对发布、谈判或转折的奇门局布阵。',
                '任务仪表板：吉门、禁门、干扰路径一目了然。',
                '行动期内提供30天实时支援。'
              ]
            }
          ]
        },
        {
          key: 'spatial',
          title: '风水与空间指挥',
          subtitle: '涵盖住宅、总部及旗舰场所的气场营造。',
          tiers: [
            {
              name: '宅运天机',
              price: 'RM 7,288',
              cadence: '每处住宅',
              href: '/services/fengshui/home-destiny-compass',
              features: [
                '现场或远程勘查，涵盖格局、地势与年度飞星。',
                '家庭成员命盘对位，配置睡眠、工作与学习区。',
                '提供12个月的激活与调整日历。'
              ]
            },
            {
              name: '权势风水',
              price: 'RM 12,588',
              cadence: '每层/每处办公空间',
              href: '/services/fengshui/office-power-alignment',
              features: [
                '高层指挥区、业绩动线与团队分区的全盘布局。',
                '高价值会议室与决策室的保护与强化方案。',
                '季度调校计划与装修动工把关流程。'
              ]
            },
            {
              name: '龙脉圣图',
              price: 'RM 11,888',
              cadence: '每个选址项目',
              href: '/services/fengshui/dragon-vein-oracle',
              features: [
                '宏观地势扫描与龙脉风险评分。',
                '入口、标识与水体的朝向组合建议。',
                '取得、动土与启用的时间窗口规划。'
              ]
            }
          ]
        },
        {
          key: 'magnetic',
          title: '磁场矩阵与数字命理',
          subtitle: '用于命名、品牌讯息与个人节奏的能量校准。',
          tiers: [
            {
              name: '太极数场',
              price: 'RM 4,288',
              cadence: '每份数场报告',
              href: '/services/magnetic-matrix/i-ching-energy-matrix',
              features: [
                '以易经卦象解析个性、动机与决策节奏。',
                '六个月节奏曲线：何时冲刺、何时蓄势。',
                '每日修炼建议，封堵能量流失点。'
              ]
            },
            {
              name: '名格天命',
              price: 'RM 3,688',
              cadence: '每轮命名',
              href: '/services/magnetic-matrix/name-destiny-code',
              features: [
                '多语言、多字母体系的现有姓名振频审核。',
                '提供若干优化方案，匹配命盘与行业属性。',
                '附法律、数字化与对外发布的同步规划。'
              ]
            },
            {
              name: '灵数天机',
              price: 'RM 2,988',
              cadence: '每份灵数蓝图',
              href: '/services/magnetic-matrix/soul-number-blueprint',
              features: [
                '数字命理拆解直觉、创造力与满足路径。',
                '匹配核心与命运数字的才能加速练习。',
                '关系契合度分析，提供合作守护界线。'
              ]
            }
          ]
        },
        {
          key: 'imperial',
          title: '帝皇天策',
          subtitle: '适用于国家级、跨国或高敏感度决策的尊享咨询。',
          tiers: [
            {
              name: '皇极天数',
              price: 'RM 12,888',
              cadence: '每次推演',
              href: '/oracle/celestial-numbers',
              features: [
                '真太阳时矩阵，映射全球与国家层级周期。',
                '八宫权力分析，定位影响力、风险与护卫策略。',
                '三段式简报：战略、化解与启动步骤。'
              ]
            },
            {
              name: '乾坤太乙策',
              price: 'RM 10,888',
              cadence: '每次策略',
              href: '/oracle/taiyi-numbers',
              features: [
                '太乙飞盘推演，用于地缘、资本或大型部署。',
                '天地人三才合一的优先行动清单。',
                '45天内提供一次紧急复盘调校。'
              ]
            },
            {
              name: '六壬神机数',
              price: 'RM 9,688',
              cadence: '每次任务',
              href: '/oracle/six-ren',
              features: [
                '六壬布盘，洞察冲突化解与隐秘行动。',
                '敌我势能图与概率评估。',
                '任务窗口内提供实时策略指引。'
              ]
            }
          ]
        },
        {
          key: 'academy',
          title: '学院大师路径',
          subtitle: '四段式课程体系，陪伴学员从入门到专业执业。',
          tiers: [
            {
              name: '玄学基础课程',
              price: 'RM 2,888',
              cadence: '每期（6周）',
              href: '/academy/foundation',
              features: [
                '6 周直播强化班，打牢古典术数与时间节奏基础。',
                '课堂数盘实验，实操八字、紫微与奇门基础工具。',
                '提供中英对照教材与录播永久访问。'
              ]
            },
            {
              name: '初阶课程',
              price: 'RM 4,288',
              cadence: '每期（8周）',
              href: '/academy/beginner',
              features: [
                '案例工作坊，将命理诊断应用到真实情境。',
                '每周导师答疑与一对一练习反馈。',
                '学习小组制度，强化技巧与执行力。'
              ]
            },
            {
              name: '进阶课程',
              price: 'RM 5,888',
              cadence: '每期（10周）',
              href: '/academy/intermediate',
              features: [
                '跨术数整合，串联命运、空间与时机的策略打法。',
                '企业沟通模版，翻译玄学语言成董事会可用的指令。',
                '导师批改的结业项目，帮助优化实务流程。'
              ]
            },
            {
              name: '专业认证',
              price: 'RM 8,888',
              cadence: '每期（12周）',
              href: '/academy/professional',
              features: [
                '模拟客户全流程：访谈、分析、交付与复盘。',
                '职业伦理、合规与文档标准训练。',
                '认证评审与校友网络支持，续建实战资源。'
              ]
            }
          ]
        },
        {
          key: 'vip360',
          title: '360 全维度蓝图',
          subtitle: '为私人客户与家族办公室打造的三层命运指挥系统。',
          tiers: [
            {
              name: '命运蓝图·启程版',
              price: 'RM 9,888',
              cadence: '每份蓝图',
              href: '/vip-report/essential',
              features: [
                '120 页专属命盘报告，涵盖财富流向、事业共振与关系定位。',
                '十年与年度节奏叠图，标记优先行动与风险节点。',
                '启动访谈 + 75 分钟交付说明，并提供 30 天邮件支持。'
              ]
            },
            {
              name: '天机剖象·进阶版',
              price: 'RM 14,888',
              cadence: '每份蓝图',
              href: '/vip-report/pro',
              features: [
                '220 页深度洞察，整合姓名能量、数字命理与多术数交叉验证。',
                '领导、关系与资本布局矩阵，附风险缓冲与对策流程。',
                '两次咨询（策略 + 落地）与专属时机甘特图。'
              ]
            },
            {
              name: '乾坤至尊·全息版',
              price: 'RM 23,888',
              cadence: '每份蓝图',
              href: '/vip-report/supreme',
              features: [
                '320 页全息指挥方案，融合命盘、风水、数字命理与真太阳时。',
                '家族治理、资产配置与传承路线图，内含风险化解机制。',
                '60 天高层顾问支援，含即时择日与行动窗口更新。'
              ]
            }
          ]
        },
        {
          key: 'enterprise',
          title: '企业战略指挥中心',
          subtitle: '为董事会与家族企业提供命运、时机与执行的整体框架。',
          tiers: [
            {
              name: '企业风水格局',
              price: 'RM 18,588',
              cadence: '每家企业',
              href: '/enterprise/audit',
              features: [
                '创立命盘、领导共振与财富渠道的全景诊断。',
                '市场、人事与空间的风险扫描。',
                '拆解「守、攻、转」三层行动序列。'
              ]
            },
            {
              name: '天元企业选址',
              price: 'RM 22,088',
              cadence: '每三处候选地点',
              href: '/enterprise/site',
              features: [
                '地形、朝向与时间三维评估，最多覆盖三处地点。',
                '繁荣、韧性与合规指数评分。',
                '设计、分期与启用时间的一体化方案。'
              ]
            },
            {
              name: '企业战略布局',
              price: 'RM 16,588',
              cadence: '每个年度周期',
              href: '/enterprise/cycles',
              features: [
                '十年与年度节奏图，标记扩张、整顿与静养阶段。',
                '领导梯队节奏仪表板与接班防护。',
                '产品发布、资本动作与合作轮换的时间蓝图。'
              ]
            }
          ]
        }
      ],
      addOnsTitle: '增值服务与长期顾问',
      addOns: [
        {
          name: '高层顾问保留制',
          price: '每月 RM 5,000 起',
          features: [
            'WhatsApp 与邮箱优先响应，实时决策支援。',
            '每月时机简报，配合董事会或家族会议。',
            '每月最多四个事件的额外排盘与择日。'
          ]
        },
        {
          name: '现场沉浸式工作坊',
          price: '每日 RM 3,800 起 + 差旅',
          features: [
            '现场踏勘、访谈与气场微调。',
            '即时校正并培训负责人执行。',
            '72小时内提交总结与下一步建议。'
          ]
        },
        {
          name: '高层简报幻灯',
          price: 'RM 2,288',
          features: [
            '将玄学洞见翻译为董事会语言的专业简报。',
            '风险、机会与时间矩阵一目了然。',
            '附内部分发与保密使用指引。'
          ]
        }
      ],
      finePrintTitle: '须知',
      finePrint: [
        '临时任务（提前少于7天）需加收25%加急费。',
        '海外差旅以商务舱标准计价，并至少预留2天调研时间。',
        '交付前14天内取消，订金不予退还。',
        '可接受银行转账、FPX与企业信用卡（信用卡附3%手续费）。'
      ],
      cta: {
        label: '预约定制方案',
        href: '/contact'
      }
    },
  vip: {
    section_title: '360全维度命运解析服务',
    cta: '了解更多',
    tiers: {
      lite_title: '命运蓝图·启程版',
      pro_title: '天机剖象·进阶版',
      supreme_title: '乾坤至尊·全息版',
      lite_points: [
        '100+ 页个人命运蓝图',
        '天赋潜能深度解析',
        '职业定位与行业适配建议',
        '财富模式诊断与优化',
        '十年大运节奏分析',
        '生命数字命理解析',
        '针对短板的实用调整方案'
      ],
      pro_points: [
        '200+ 页命运深度蓝图',
        '事业领域与行业共振定位',
        '财富结构诊断与风险预警',
        '十年大运转折与策略建议',
        '生命数字交叉解析',
        '健康、人际、效率的能量场分析',
        '姓名能量共振评估与优化建议',
        '结合时机的行动与化解方案'
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
        badge: '乾坤企业策',
        title: '乾坤企业策',
        subtitle: '洞察企业背后的命运格局。',
        sections: [
          {
            key: 'overview',
            dividerTitle: '服务概述',
            dividerSubtitle: '让企业与天时同步',
            title: '看见企业的能量底层',
            imageLabel: '企业命盘全景图',
            imageUrl: '/images/page-audit/audit-img-01.jpeg',
            body: '《乾坤企业策》以东方玄学为基础，从时间、空间、人事三轴解读企业的命运结构。它揭示财务报表看不出的隐性力量——能量平衡、成长节奏与长期气场，让决策层校准方向，使团队、场地与时间节奏保持同频。'
          },
          {
            key: 'insight',
            dividerTitle: '能揭示什么',
            dividerSubtitle: '企业运势的隐形结构',
            title: '读懂企业命运的脉络',
            imageLabel: '企业能量流洞察板',
            imageUrl: '/images/page-audit/audit-img-02.jpeg',
            body: '企业命运由成立时间、关键人物与场地格局共同塑造。通过推演，你将看到：',
            points: [
              '企业能量流：当前是扩张、转型还是休整周期。',
              '领导共振：核心团队的气场是否与企业命盘匹配。',
              '财富路径：哪一方向与时间最利于增长、融资与合作。',
              '环境影响：办公或厂区的气场如何支撑或限制发展。',
              '趋势预警：提前捕捉停滞与爆发的信号。'
            ]
          },
          {
            key: 'method',
            dividerTitle: '推演原理',
            dividerSubtitle: '时间·空间·人事共振',
            title: '让策略与天时共舞',
            imageLabel: '企业时空共振模型',
            imageUrl: '/images/page-audit/audit-img-03.jpeg',
            body: '通过“企业时间盘 + 场地气场 + 领导命盘”的三维分析，我们推演企业运势的周期规律，辨识顺势与逆势的时间节点。',
            points: [
              '建立专属企业命运图。',
              '校准领导命盘与企业节奏。',
              '评估关键场所的空间共振。',
              '识别顺势增长与应当蓄势的阶段。',
              '制定顺应节奏的行动排序。'
            ]
          },
          {
            key: 'process',
            dividerTitle: '服务流程',
            dividerSubtitle: '六个步骤完成企业推演',
            title: '从诊断到蓝图的全链路',
            imageLabel: '企业审查流程图',
            imageUrl: '/images/page-audit/audit-img-04.jpeg',
            body: '严谨流程将玄学诊断转化为高层可执行的策略指令。',
            points: [
              '前期访谈：梳理企业历史、痛点与愿景。',
              '命盘绘制：依据成立与领导数据构建企业命盘。',
              '能量诊断：检测经营节奏、领导气场与环境共振。',
              '周期解读：推演未来1年、3年、10年的趋势。',
              '策略咨询：以通俗语言呈现关键洞察。',
              '行动蓝图：交付方向、时机、布局与团队对齐建议。'
            ]
          },
          {
            key: 'audience',
            dividerTitle: '适合人群',
            dividerSubtitle: '关键节点的最佳助力',
            title: '为掌舵者提供时间先见',
            imageLabel: '企业领导层策略会议',
            imageUrl: '/images/page-audit/audit-img-05.jpeg',
            body: '专为在重大阶段寻求清晰与节奏的人打造。',
            points: [
              '计划扩张、品牌重塑或开拓新市场的企业。',
              '希望稳定团队气场、提高执行的管理层。',
              '需要判断投资节奏与合作匹配的投资人。',
              '进行传承规划与交接安排的家族企业。'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: '结果与价值',
            dividerSubtitle: '获得一份时间战略图',
            title: '让决策与节奏同频',
            imageLabel: '企业命运周期图',
            imageUrl: '/images/page-audit/audit-img-06.jpeg',
            body: '你将获得一份清晰的企业命运周期图——知道何时扩张、何时蓄力、何时转型。《乾坤企业策》不是取代管理工具，而是揭开数据背后的天机，让企业的每一步都顺势而为。'
          }
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: '想看清企业命运的隐藏轨迹？',
          dividerSubtitle: '预约你的企业命运审查',
          title: '开启乾坤企业策审查',
          message: '点击开启你的专属企业审查，让战略与节奏同步推进。',
          primaryLabel: '开启乾坤企业策审查',
          primaryHref: '/contact'
        },
        newsletterTitle: '企业命运情报站',
        newsletterSubtitle: '董事会级别的时间情报、空间诊断与团队共振指引。'
      },
      essentialBlueprint: {
        badge: '360全维度',
        title: '命运蓝图·启程版',
        subtitle: '看清天命底图 · 开启人生正向循环。',
        sections: [
          {
          key: 'overview',
          dividerTitle: '服务概述',
          dividerSubtitle: '打好命运底图',
          title: '以战略视角认知自己',
          imageLabel: '命运蓝图概览图',
          imageUrl: '/images/page-360-essential/360-e-img-01.jpeg',
          body: '《命运蓝图·启程版》是一份超过 100 页的个人命理分析，融合八字、生命数字与时间周期，帮助你在顺势节奏中行动，而不是靠运气碰撞。'
        },
        {
          key: 'insight',
          dividerTitle: '能揭示什么',
          dividerSubtitle: '命运全景图',
          title: '看清你是谁、将去往何处',
          imageLabel: '命运洞察面板',
          imageUrl: '/images/page-360-essential/360-e-img-02.jpeg',
          body: '报告揭示命理全景，让你知道如何把握人生关键节点：',
          points: [
            '天赋潜能：找出与生俱来的优势与专长。',
            '职业定位：明确行业、岗位与环境的最佳匹配度。',
              '财富模式：理解如何吸引、运用与守护财富流。',
              '人生节奏：掌握十年大运与年度节奏，提前布局。',
              '生命数字：从数字命理洞察性格密码与行动逻辑。',
              '实用调整：提供针对短板的补强方案，释放潜在势能。'
            ]
          },
          {
            key: 'method',
          dividerTitle: '推演原理',
          dividerSubtitle: '古法命理 · 现代解读',
          title: '把命理转化为行动策略',
          imageLabel: '方法论流程图',
          imageUrl: '/images/page-360-essential/360-e-img-03.jpeg',
          body: '我们以“古法命理 + 现代逻辑”把复杂的格局与时间结构，转化为易懂、可执行的策略建议。',
          points: [
            '五行校准，揭示先天气场与能量构成。',
            '十年大运与流年叠图，指出加速或蓄势的节奏节点。',
              '个人战略建议，让行动始终踩在机会流之上。',
              '附带图表与仪表板，方便随时复盘与跟进。'
            ]
          },
          {
            key: 'process',
          dividerTitle: '服务流程',
          dividerSubtitle: '五步完成命运蓝图',
          title: '从资料到行动一气呵成',
          imageLabel: '服务流程故事板',
          imageUrl: '/images/page-360-essential/360-e-img-04.jpeg',
          body: '严谨流程确保报告既专业又贴近现实：',
          points: [
            '资料输入：提供出生年月日时与出生地，锁定命盘锚点。',
            '数据推演：整合八字、生命数字与周期节奏进行交叉分析。',
              '蓝图制作：输出 100+ 页专属报告，图文并茂、结构清晰。',
              '讲解咨询：一对一说明重点，用人话解析复杂规律。',
              '实用指导：提供心态、时间、环境的调整方案，让行动顺畅。'
            ]
          },
          {
            key: 'audience',
          dividerTitle: '适合人群',
          dividerSubtitle: '想走在时间前面的人',
          title: '为准备掌控人生的人而设',
          imageLabel: '适合人群情境图',
          imageUrl: '/images/page-360-essential/360-e-img-05.jpeg',
          body: '特别适合以下决策者：',
          points: [
            '想找到人生方向与使命的探索者。',
            '在事业或关系上感到卡关、想突破的人。',
              '希望个人命格与事业周期互相配合的创业者。',
              '渴望看清自身节奏、重新掌握人生主动权的人。'
            ]
          },
          {
            key: 'outcome',
          dividerTitle: '结果与价值',
          dividerSubtitle: '终身可参考的命运指南',
          title: '看见命运语言，自信行动',
          imageLabel: '命运参考图',
          imageUrl: '/images/page-360-essential/360-e-img-06.jpeg',
          body: '你得到的不只是报告，而是一张可以长期参考的命运地图。懂得自己的时间节奏后，不必焦虑等待，而是带着底气创造结果。'
        }
      ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: '想看清属于你的人生蓝图？',
          dividerSubtitle: '预约命运蓝图·启程版',
          title: '领取命运蓝图·启程版',
          message: '点击预约专属命运蓝图，让人生进入正向循环。',
          primaryLabel: '领取命运蓝图·启程版',
          primaryHref: '/contact'
        }
      },
      advancedBlueprint: {
        badge: '360全维度',
        title: '天机蓝图·进阶版',
        subtitle: '洞察命格结构 · 掌握人生天机。',
        sections: [
          {
            key: 'overview',
            dividerTitle: '服务概述',
            dividerSubtitle: '命格深度解读',
            title: '从认识到掌控的进阶蓝图',
            imageLabel: '进阶命运概览图',
            imageUrl: '/images/page-360-advanced/360-adv-img-01.jpeg',
            body: '《天机蓝图·进阶版》是一份超过 200 页的深度命运解析，整合八字、生命数字与姓名能量，揭示命格如何运作、何时转折，以及如何掌握人生节奏。'
          },
          {
            key: 'insight',
            dividerTitle: '能揭示什么',
            dividerSubtitle: '命运系统全结构',
            title: '全面解构命格八大板块',
            imageLabel: '命运多层洞察面板',
            imageUrl: '/images/page-360-advanced/360-adv-img-02.jpeg',
            body: '蓝图揭示命运系统的更深层结构：',
            points: [
              '天赋潜能：挖掘隐藏能力与性格驱动力。',
              '行业定位：锁定最契合五行能量的事业领域。',
              '财富结构：看懂财富流入、积累、风险与止损位。',
              '十年大运：提前预判长期周期的兴衰与转折。',
              '生命数字：解析行为密码与成长课题。',
              '能量场分析：捕捉健康、人际与效率的能量失衡。',
              '姓名吉象：评估姓名与命格的共振度与优化建议。',
              '实用化解：提供针对性调整方案与时机动作。'
            ]
          },
          {
            key: 'method',
            dividerTitle: '推演原理',
            dividerSubtitle: '结构与节奏共读',
            title: '三重系统交叉解码命运',
            imageLabel: '结构与节奏共振图',
            imageUrl: '/images/page-360-advanced/360-adv-img-03.jpeg',
            body: `服务通过整合“八字五行结构”、“生命数字频率”与“姓名能量共振”，绘制出你命运系统的多维运行蓝图。
它揭示的不只是性格与倾向，更是命运的“触发机制”——什么时间、什么选择，会带来突破或阻力。
报告让你既看懂“命的结构”，也理解“运的节奏”。`,
            points: [
              '对自身命格机制的全面认知；',
              '对未来十年周期的前瞻规划；',
              '一套能量与时运结合的可执行策略。'
            ]
          },
          {
            key: 'process',
            dividerTitle: '服务流程',
            dividerSubtitle: '六步完成进阶蓝图',
            title: '从资料到专属策略',
            imageLabel: '进阶蓝图流程板',
            imageUrl: '/images/page-360-advanced/360-adv-img-04.jpeg',
            body: '严谨流程确保洞察落地：',
            points: [
              '资料收集：记录出生与姓名信息。',
              '命盘分析：整合八字、数字与能量模型。',
              '姓名共振评估：判断姓名与命格能量的合拍度。',
              '周期预测：推演十年与流年节奏变化。',
              '蓝图编制：产生 200+ 页深度报告。',
              '解读咨询：一对一讲解与专属策略讨论。'
            ]
          },
          {
            key: 'audience',
            dividerTitle: '适合人群',
            dividerSubtitle: '关键转折的行动指南',
            title: '为准备升级的人而设',
            imageLabel: '进阶用户场景图',
            imageUrl: '/images/page-360-advanced/360-adv-img-05.jpeg',
            body: '适合正处重要阶段、需要掌控时间节奏的决策者：',
            points: [
              '准备重大转型或跨界发展的个人。',
              '希望事业节奏与命格相辅相成的创业者。',
              '追求长期布局与节奏掌控的专业人士。',
              '想理解姓名能量如何影响命运的人。'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: '结果与价值',
            dividerSubtitle: '一生可用的命运运行图',
            title: '让挑战化为节奏而非阻力',
            imageLabel: '命运运行蓝图',
            imageUrl: '/images/page-360-advanced/360-adv-img-06.jpeg',
            body: '你将带走一份完整的命运运行图谱，知道自己是谁、节奏如何展开、下一步怎么走。当你掌握命运节奏，阻力会变节奏，人生会更从容。'
          }
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: '想深入解锁命运的隐藏结构？',
          dividerSubtitle: '预约天机蓝图·进阶版',
          title: '领取天机蓝图·进阶版',
          message: '点击开启专属命运解析，掌握人生节奏。',
          primaryLabel: '领取天机蓝图·进阶版',
          primaryHref: '/contact'
        }
      },
      supremeBlueprint: {
        badge: '360全维度',
        title: '乾坤至尊·全息版',
        subtitle: '天地人三合 · 命运全息启示。',
        sections: [
          {
            key: 'overview',
          dividerTitle: '服务概述',
          dividerSubtitle: '命运全息启示',
          title: '让天地人与命运合一',
          imageLabel: '全息命运概览图',
          imageUrl: '/images/page-360-supreme/360-pro-img-01.jpeg',
          body: '《乾坤至尊·全息版》是一份超过 300 页的全方位命运咨询报告，整合八字、生命数字、姓名能量与住宅风水，揭示命格结构与运势节奏。'
        },
        {
          key: 'insight',
          dividerTitle: '能揭示什么',
          dividerSubtitle: '命运全息系统',
          title: '看见命运的完整生态',
          imageLabel: '命运全息面板',
          imageUrl: '/images/page-360-supreme/360-pro-img-02.jpeg',
          body: '从命格、时间、能量、空间四大面向全面解析人生：',
          points: [
            '天赋潜能：揭示人生使命与隐藏力量。',
            '行业蓝图：界定与命格五行最契合的事业方向。',
            '财富结构：分析财富生成、流动与守护模式。',
              '十年大运：掌握长周期节奏，把握关键节点。',
              '生命数字：解读性格密码与成长课题。',
              '能量场分析：评估个人磁场平衡与阻力。',
              '姓名吉象：判断姓名能量与命格匹配程度，并给出优化方案。',
              '住宅风水：评估居所气场，确保“宅运助人运”。',
              '实用化解：提供行动与补强策略，让好运更稳定。'
            ]
          },
          {
            key: 'method',
          dividerTitle: '推演原理',
          dividerSubtitle: '天时·地利·人和',
          title: '同步天人地三才',
          imageLabel: '天地人共振图',
          imageUrl: '/images/page-360-supreme/360-pro-img-03.jpeg',
          body: '此服务通过“天时、地利、人和”三大系统的交汇分析，将八字命盘、空间气场与时间节奏融为一体。同步个人命格与外部环境周期，让事业、财富、健康、人际四大领域都与命运节奏一致。你将获得：',
          points: [
            '对人生命运系统的全息理解。',
            '对未来数十年周期的前瞻蓝图。',
            '一套结合时间、空间与能量的整合方案。'
            ]
          },
          {
            key: 'process',
          dividerTitle: '服务流程',
          dividerSubtitle: '六步完成全息蓝图',
          title: '从资料到策略一气呵成',
          imageLabel: '全息蓝图流程板',
          imageUrl: '/images/page-360-supreme/360-pro-img-04.jpeg',
          body: '严谨流程确保洞察落地：',
          points: [
            '初步沟通：厘清背景、目标与人生阶段。',
            '资料分析：综合八字、数字、姓名与住宅风水数据。',
            '周期推演：分析十年与流年节奏，预测机缘与挑战。',
              '能量评估：检测个人与环境的共振状况。',
              '蓝图编制：制作 300+ 页全息命运报告。',
              '讲解咨询：一对一深度说明与专属策略建议。'
            ]
          },
          {
            key: 'audience',
            dividerTitle: '适合人群',
          dividerSubtitle: '全局掌控者',
          title: '为引领全局的人而设',
          imageLabel: '用户情境图',
          imageUrl: '/images/page-360-supreme/360-pro-img-05.jpeg',
          body: '适合寻求命格、能量、空间三合一掌控力的决策者：',
          points: [
            '规划长期事业与家族布局的领导者。',
            '希望整合命格与环境打造事业体系的创业者。',
            '处于人生重大转折期、需要全局视角的人。',
              '想让居家风水与个人命格共振的家庭决策者。'
            ]
          },
          {
            key: 'outcome',
          dividerTitle: '结果与价值',
          dividerSubtitle: '命运全息生态',
          title: '掌握命运全息系统',
          imageLabel: '命运全息作战图',
          imageUrl: '/images/page-360-supreme/360-pro-img-06.jpeg',
          body: '你将得到一份前所未有的全息命运系统，将个人命格、环境能量与时间节奏完美结合。《乾坤至尊·全息版》让你在每一个决定中更从容、更笃定；当天时、地利、人和合一，成功不再偶然，而是必然的流向。'
        }
      ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: '想看清人生全息命盘的奥秘？',
          dividerSubtitle: '预约乾坤至尊·全息版',
          title: '领取乾坤至尊·全息版',
          message: '点击开启专属咨询，掌握天地人三合的命运节奏。',
          primaryLabel: '领取乾坤至尊·全息版',
          primaryHref: '/contact'
        }
      },
      enterpriseSite: {
        badge: '天元选址策',
        title: '天元选址策',
        subtitle: '选址需同时吻合地形气场、三元九运与业态用途，方能长久旺运。',
        sections: [
          {
            key: 'overview',
            dividerTitle: '服务概述',
            dividerSubtitle: '让选址成为企业助力',
            title: '地利与企业节奏的完美匹配',
            imageLabel: '企业选址全景图',
            imageUrl: '/images/page-site/site-img-01.jpeg',
            body: '《天元选址策》结合东方风水与现代企业战略，从地形气场、朝向布局与时间周期三大维度推演，找出最能助旺企业的生财之地。无论是总部建设、分支扩张，还是搬迁布局，都以人、地、时三合为准，让地气助力、财气自来。'
          },
          {
            key: 'insight',
            dividerTitle: '能揭示什么',
            dividerSubtitle: '地气与企业同步的关键',
            title: '看清土地的隐形脉络',
            imageLabel: '地理能量洞察图',
            imageUrl: '/images/page-site/site-img-02.jpeg',
            body: '每一块土地都有其气场与能量脉络，直接影响企业的运势走向。通过综合分析，你将看到：',
            points: [
              '地理气场：周边山水格局是否聚气生财。',
              '财气走向：何种朝向与动线最能引入资源。',
              '时间匹配：何时签约、启用或开张最顺天时。',
              '业态匹配：行业五行属性（如金融属金、教育属木）与地气是否协调。',
              '潜在隐患：提前识别气场断流或冲煞结构，防患未然。'
            ]
          },
          {
            key: 'method',
            dividerTitle: '推演原理',
            dividerSubtitle: '地势·朝向·时间三合',
            title: '让企业与土地形成共振',
            imageLabel: '选址共振矩阵',
            imageUrl: '/images/page-site/site-img-03.jpeg',
            body: '以地势、朝向、时间为核心，结合企业命盘与地理能量，判断地气与运势的契合度。当企业格局顺应地脉，时间又逢当运，努力才能更轻松地转化为成果——这是让位置成为力量的科学。',
            points: [
              '地形地势分析：评估山水、路网与周边建筑。',
              '朝向布局推演：找出最利于纳气的坐向与动线。',
              '时间周期叠加：运用三元九运及关键择日。',
              '企业命盘校准：将企业命格与地气能量交叉匹配。',
              '补救方案制定：当地形需要加固时提供化解建议。'
            ]
          },
          {
            key: 'process',
            dividerTitle: '服务流程',
            dividerSubtitle: '从踏勘到决策',
            title: '六个步骤完成选址推演',
            imageLabel: '企业选址流程板',
            imageUrl: '/images/page-site/site-img-04.jpeg',
            body: '严谨流程将地气诊断转化为董事会可执行的策略。',
            points: [
              '沟通目标：明确企业规划与选址方向。',
              '资料采集：收集候选地点的坐标、格局与周边环境。',
              '气场评估：分析地形走势、朝向与自然气流分布。',
              '时运匹配：结合三元九运周期判断地气当旺与否。',
              '优劣对比：多地方案评分与优先排序。',
              '方案呈现：交付选址建议与时间布局执行计划。'
            ]
          },
          {
            key: 'audience',
            dividerTitle: '适合人群',
            dividerSubtitle: '懂得“选址即战略”的人',
            title: '为关键决策者打造',
            imageLabel: '领导团队选址简报',
            imageUrl: '/images/page-site/site-img-05.jpeg',
            body: '专为在扩张、迁移或投资阶段寻求清晰与节奏的企业打造。',
            points: [
              '筹建总部或开拓新市场的企业。',
              '评估地块潜力的投资者与开发商。',
              '寻找旺铺旺地的品牌连锁与餐饮团队。',
              '希望迁厂提升效益与气场稳定的制造业主。'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: '结果与价值',
            dividerSubtitle: '不仅是一份报告',
            title: '获得“企业旺运布局图”',
            imageLabel: '旺运选址地图',
            imageUrl: '/images/page-site/site-img-06.jpeg',
            body: '你得到的不只是选址报告，而是一张企业旺运布局图。《天元选址策》帮助你在决策前看清哪一处地气能帮你起势，让新址同时得天时、地利、人和。当选址与业态、时间同频，旺运便不再依赖运气。'
          }
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: '想找出能带来长久旺运的企业旺地？',
          dividerSubtitle: '预约你的天元选址推演',
          title: '开启天元选址策推演',
          message: '点击开启专属选址咨询，找出真正属于企业的旺地。',
          primaryLabel: '开启天元选址策推演',
          primaryHref: '/contact'
        },
        newsletterTitle: '企业选址情报',
        newsletterSubtitle: '地形能量、择时提醒与选址优化建议。'
      },
      enterpriseCycles: {
        badge: '天时战略策',
        title: '天时战略策',
        subtitle: '懂天时者，得先机；顺周期者，赢未来。',
        sections: [
          {
            key: 'overview',
            dividerTitle: '服务概述',
            dividerSubtitle: '将时间变成战略优势',
            title: '顺天时者，掌先机',
            imageLabel: '天时战略全景图',
            imageUrl: '/images/page-cycles/cycles-img-01.jpeg',
            body: '《天时战略策》是一项以时间节奏为核心的企业战略咨询，结合东方天时周期学与现代管理逻辑，让企业在正确的时间做正确的事，揭示运营节奏与外部大势的关系。'
          },
          {
            key: 'insight',
            dividerTitle: '能揭示什么',
            dividerSubtitle: '看见周期背后的规律',
            title: '读懂时间的底层结构',
            imageLabel: '周期洞察图',
            imageUrl: '/images/page-cycles/cycles-img-02.jpeg',
            body: '每个企业都在周期中运转——市场有周期、人事有周期、命运也有周期。通过推演，你将看到：',
            points: [
              '战略时机：何时扩张、何时蓄势、何时转向。',
              '周期定位：企业当前处于兴旺、转折还是整顿。',
              '机会窗口：哪些时间点最利于启动、融资或合作。',
              '危机预警：在风险出现之前识别能量波动。',
              '势能优化：让领导层与团队节奏与“天运”同频。'
            ]
          },
          {
            key: 'method',
            dividerTitle: '推演原理',
            dividerSubtitle: '天·地·人三才共振',
            title: '让战略踩准时间节拍',
            imageLabel: '天时共振模型',
            imageUrl: '/images/page-cycles/cycles-img-03.jpeg',
            body: '通过“企业命盘 + 管理层节奏 + 行业周期”的交叉分析，找出天时、人事、地运之间的共振与冲突，把玄学中的运势节奏转化为可执行的经营策略。',
            points: [
              '企业命盘与周期叠图。',
              '核心团队的时间特质与目标匹配。',
              '行业周期与宏观阴阳趋势交叉对照。',
              '周期热力图揭示动静阶段。',
              '机会/风险标签提示关键窗口。'
            ]
          },
          {
            key: 'process',
            dividerTitle: '服务流程',
            dividerSubtitle: '从洞察到执行',
            title: '六个步骤完成天时推演',
            imageLabel: '战略节奏流程图',
            imageUrl: '/images/page-cycles/cycles-img-04.jpeg',
            body: '严谨流程让时间智慧转化为实战方案。',
            points: [
              '前期访谈：了解目标、痛点与阶段规划。',
              '周期建模：分析企业命运节奏与管理层时间特征。',
              '外部匹配：结合市场与大势周期，找出最佳契合。',
              '阶段推演：预判未来1年、3年、10年的兴衰节奏。',
              '咨询说明：一对一讲解，让复杂规律变简单。',
              '行动蓝图：提供按时间推进的战略指引。'
            ]
          },
          {
            key: 'audience',
            dividerTitle: '适合人群',
            dividerSubtitle: '关键节点的指路灯',
            title: '为远见领导者而设',
            imageLabel: '领导团队节奏简报',
            imageUrl: '/images/page-cycles/cycles-img-05.jpeg',
            body: '适合在扩张、转型或投资阶段，寻求时间先见与节奏掌控的决策者。',
            points: [
              '规划扩张或转型的企业创始人与高层。',
              '关注进出时机的投资人。',
              '面对增长与变革的团队管理者。',
              '希望把“天时”变成战略优势的远见领导者。'
            ]
          },
          {
            key: 'outcome',
            dividerTitle: '结果与价值',
            dividerSubtitle: '获得时间战略框架',
            title: '走在时间之前，而非之后',
            imageLabel: '时间战略蓝图',
            imageUrl: '/images/page-cycles/cycles-img-06.jpeg',
            body: '你将清楚了解企业当前所处的时间阶段，并学会如何把“天时”转化为战略优势。《天时战略策》让领导者从事后应变走向事前掌控，当时间、战略与气场同频，成功就成为节奏的必然。'
          }
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: '想让企业与时间同频共振？',
          dividerSubtitle: '预约你的天时战略推演',
          title: '开启天时战略策推演',
          message: '点击开启专属咨询，把时间节奏转化为战略力量。',
          primaryLabel: '开启天时战略策推演',
          primaryHref: '/contact'
        },
        newsletterTitle: '天时战略情报',
        newsletterSubtitle: '周期提醒、时间节奏与战略优化建议。'
      },
      celestialNumbers: {
        badge: '帝皇洞见',
        title: '皇极天数咨询',
        subtitle: '看懂时间的秩序，顺势掌握命运节奏。',
        sections: [
          {
            key: 'overview',
            dividerTitle: '服务概览',
            dividerSubtitle: '为何值得布局',
            title: '与命运节奏对齐',
            imageLabel: '时间与命运交织的意象',
            imageUrl: '/images/page-supreme-celestial/supreme-image-01.jpeg',
            body: '《皇极天数》是一门以“时空秩序”为核心的高精度玄学咨询。源自《皇极经世》的宇宙推演思想，它揭示命运运作的底层逻辑，让你看见事件为何发生、如何提前部署，真正做到顺势而行。',
          },
          {
            key: 'insight',
            dividerTitle: '可以看见什么',
            dividerSubtitle: '掌握命运的底层节拍',
            title: '读懂时间背后的暗流',
            imageLabel: '命运节奏洞察图',
            imageUrl: '/images/page-supreme-celestial/supreme-image-02.jpeg',
            body: '人生的节奏从不随机，《皇极天数》让你看见推动结果的隐形力量。',
            points: [
              '运势流向：哪些年份能量上升、哪些阶段宜静观。',
              '转折时点：成功或风险来临前的信号。',
              '潜在推手：谁或什么在悄悄左右你的命运。',
              '人生主线：命运想让你成为怎样的人，你现在在哪个章节。',
            ],
          },
          {
            key: 'method',
            dividerTitle: '推演原理',
            dividerSubtitle: '数理与时间的联动',
            title: '天道数理与个人节奏的对接',
            imageLabel: '皇极数理运算示意',
            imageUrl: '/images/page-supreme-celestial/supreme-image-03.jpeg',
            body: '以天道数理为基础，通过时间推演与能量映射，找出你与世界运转之间的契合点。看清命运的逻辑之后，人生不再只是“遇到”，而是“掌握”。',
            points: [
              '一份命运地图，清楚知道时间站在哪一边。',
              '掌握未来一年与十年的能量节奏。',
              '一套可落地的决策参考，知道何时动、何时守。',
            ],
          },
          {
            key: 'process',
            dividerTitle: '服务流程',
            dividerSubtitle: '从资料到行动蓝图',
            title: '五个阶段完成专属推演',
            imageLabel: '皇极咨询流程板',
            imageUrl: '/images/page-supreme-celestial/supreme-image-04.jpeg',
            body: '层层推演，把玄学洞察化为可执行的节奏安排。',
            points: [
              '资料收集：确认出生或创立时间与聚焦主题。',
              '天数绘制：建立个人或企业的命运时间曲线。',
              '周期解读：拆解长期、中期、短期的能量节奏。',
              '咨询讲解：一对一说明，用清晰语言告知当下行动。',
              '行动方案：交付具体时间、重点与方向建议。',
            ],
          },
          {
            key: 'audience',
            dividerTitle: '适合人群',
            dividerSubtitle: '感知变化、需要验证的你',
            title: '为察觉节奏转向的决策者而设',
            imageLabel: '关键抉择的领导团队',
            imageUrl: '/images/page-supreme-celestial/supreme-image-05.jpeg',
            body: '适合所有需要先看清方向再行动的人。',
            points: [
              '正在做关键抉择的管理者与领导者。',
              '计划扩张或转型的创业者。',
              '想突破瓶颈、规划下一步的职场人士。',
              '感到运势在变却找不到节奏的人。',
            ],
          },
          {
            key: 'outcome',
            dividerTitle: '交付价值',
            dividerSubtitle: '带走的不是预测',
            title: '获得时间编码的行动蓝图',
            imageLabel: '时间编码战略文件',
            imageUrl: '/images/page-supreme-celestial/supreme-image-06.jpeg',
            body: '结果不是“好或不好”的判断，而是一份时间化的策略蓝图。你会知道哪些该冲、哪些该缓、哪些该放下，《皇极天数》让你重新与时间对齐，让好运成为节奏，而非偶然。',
          },
        ],
        faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
          dividerTitle: '想看懂时间背后的规律？',
          dividerSubtitle: '预约你的皇极天数推演',
          title: '开启皇极天数推演',
          message: '点击开启专属推演，读懂命运的运行逻辑。',
          primaryLabel: '开启皇极天数推演',
          primaryHref: '/contact',
        },
        newsletterTitle: '皇极时序情报',
        newsletterSubtitle: '掌握时间脉动、机会窗口与节奏校准提醒。',
      },
    },
    academyOverview: {
      badge: '学院',
      title: '玄学系统学习全程概览',
      subtitle: '由浅入深 · 系统化掌握中国玄学的思维与实践',
      sections: [
        {
          key: 'overview',
          type: 'text',
          dividerTitle: '课程总览',
          dividerSubtitle: '全链路学习旅程',
          title: '从基础扎根到专业实践',
          paragraphs: [
            '《玄学系统学习全程》是一条由浅入深的学习路径，让你从基础理论到专业实践，系统掌握中国玄学的核心体系。',
            '课程融合八字、紫微斗数、风水、生命数字与奇门遁甲等术数精华，帮助你将传统智慧转化为现代思维与实用策略，学会顺应命运节奏，让选择更有方向。'
          ]
        },
        {
          key: 'path',
          type: 'levels',
          dividerTitle: '学习路径',
          dividerSubtitle: '四大阶段循序渐进',
          title: '完整的四阶段修习旅程',
          intro: '课程共分四个阶段，每一阶都让理解更深入、实战更扎实。',
          levels: [
            {
              key: 'foundation',
              badge: '🜃 1️⃣',
              slug: 'foundation',
              anchor: 'foundation-course',
              title: '玄学基础课程',
              duration: '3–6 个月',
              body: '奠定玄学根基，学习阴阳、五行与时间循环规律。理解“天时、地利、人和”的整体逻辑，掌握术数背后的世界观。',
              ctaLabel: '了解详情'
            },
            {
              key: 'beginner',
              badge: '🜃 2️⃣',
              slug: 'beginner',
              anchor: 'beginner-course',
              title: '入门课程',
              duration: '6 个月',
              body: '系统学习八字、紫微斗数、生命数字与奇门遁甲四大核心术数。掌握命盘结构逻辑、能量形成机制，以及时间与方位的影响原理。结业后即可独立阅读基础命盘，辨识个人命格特征与运势走向。',
              ctaLabel: '了解详情'
            },
            {
              key: 'advanced',
              badge: '🜃 3️⃣',
              slug: 'advanced',
              anchor: 'advanced-course',
              title: '进阶课程',
              duration: '3 个月',
              body: '整合多门术数体系，深入研究时间、五行与空间气场的交互规律。练习高阶命盘解读、案例分析与奇门择时预测，掌握洞察人生转折与制定策略时机的能力。',
              ctaLabel: '了解详情'
            },
            {
              key: 'professional',
              badge: '🜃 4️⃣',
              slug: 'professional',
              anchor: 'professional-course',
              title: '专业课程',
              duration: '3 个月',
              body: '迈向命理顾问与实战咨询阶段。学习专业命盘解读、报告编制与沟通技巧，掌握咨询流程、伦理规范与实务应用，将玄学智慧融入事业、决策与人生辅导中。',
              ctaLabel: '了解详情'
            }
          ]
        },
        {
          key: 'curriculum',
          type: 'bullets',
          dividerTitle: '学习内容',
          dividerSubtitle: '六大核心能力',
          title: '掌握系统化玄学技能',
          points: [
            '阴阳五行生克的运行规律。',
            '八字、紫微、数字与奇门命盘的架构与分析技巧。',
            '风水能量的应用与空间气场理解。',
            '十年大运与流年运势的周期判断方法。',
            '时间节奏与机会管理的实战策略。',
            '将玄学智慧融入事业规划与人生决策的系统思维。'
          ]
        },
        {
          key: 'format',
          type: 'details',
          dividerTitle: '教学形式',
          dividerSubtitle: '理论·实战·导师辅导',
          title: '多维度混合式教学',
          body: '课程融合理论讲解、案例实操与导师辅导。',
          details: [
            { label: '授课形式', value: '线上 + 线下结合' },
            { label: '学习周期', value: '每阶段 3 至 6 个月' },
            { label: '课程内容', value: '图解教材、命盘实例与实操练习' },
            { label: '导师辅导', value: '一对一答疑与学习指导' },
            { label: '认证机制', value: '每阶段完成后颁发官方认证证书' }
          ]
        },
        {
          key: 'audience',
          type: 'bullets',
          dividerTitle: '适合人群',
          dividerSubtitle: '清晰·掌控·专业',
          title: '为追求系统掌握的学员而设',
          points: [
            '想透过命理了解自我方向与天赋潜能的个人。',
            '希望深化技术与体系理解的进阶学员。',
            '将玄学逻辑融入疗愈、辅导与咨询工作的专业人士。',
            '善用“天时智慧”进行事业布局与决策的企业管理者。'
          ]
        },
        {
          key: 'outcome',
          type: 'text',
          dividerTitle: '学习成果',
          dividerSubtitle: '修习后的转变',
          title: '把洞见转化为笃定行动',
          paragraphs: [
            '完成《玄学系统学习全程》后，你将具备系统的命理解读与预测能力，能洞悉多术数的交汇规律。',
            '把知识转化为洞察，把洞察转化为行动，以清晰、节奏与自信引领人生。'
          ]
        }
      ],
      faq: [
        { question: '课程时长多久？', answer: '课程周期为 3–6 个月，视你选择的班次与学习节奏而定。' },
        { question: '课程是直播还是自学？', answer: '核心模块采用直播授课并提供回放，结合自学练习与反思任务，确保理解深度。' },
        { question: '需要有玄学基础吗？', answer: '无需基础。我们从原理出发，逐步带入应用练习，让零基础学习者也能跟上。' },
        { question: '有哪些学习支持？', answer: '课程提供每周答疑、学习社群，以及导师对练习作业的反馈。' }
      ],
      cta: {
        dividerTitle: '立即开启玄学学习之旅',
        dividerSubtitle: '从基础到专业，全程认证学习路径。',
        title: '预约玄学系统学习全程',
        message: '点击立即报名，开启从基础到专业的玄学修习旅程。',
        primaryLabel: '立即报名',
        primaryHref: '/contact'
      }
    },
    academyBeginner: {
      hero: {
        badge: '学院',
        title: '初阶课程',
        subtitle: '入门命理 · 探索天机 · 打开命运的第一扇门',
        primaryLabel: '立即报名',
        primaryHref: '/contact',
        secondaryLabel: '返回课程总览',
        secondaryHref: '/academy/courses'
      },
      sections: [
        {
          key: 'overview',
          dividerTitle: '课程概述',
          dividerSubtitle: '学习定位',
          title: '从好奇走向结构化理解',
          paragraphs: [
            '《初阶课程》是从好奇到理解的桥梁，专为想深入探索命运机制与能量语言的学习者而设。',
            '课程为期 6 个月，系统导入八字、紫微斗数、生命数字与奇门遁甲四大核心体系，让你看见时间、元素与空间气场如何交织成命运轨迹。',
            '你将学会阅读基础命盘、识别命格结构，洞察影响抉择与机遇的隐形规律。'
          ]
        },
        {
          key: 'curriculum',
          dividerTitle: '学习内容',
          dividerSubtitle: '四大核心体系',
          title: '实作理解命运语言',
          points: [
            '八字基础：理解四柱结构与命格个性、潜能、时运的关系。',
            '紫微斗数入门：认识宫位层次与星曜能量对应的关键领域。',
            '生命数字：解读出生数字密码，掌握人生节奏与气场振动。',
            '奇门遁甲概念：学习时间、方位与能量如何组合成吉凶窗口。',
            '实用解盘：通过案例演练将理论转化为现实判断。'
          ]
        },
        {
          key: 'why',
          dividerTitle: '学习意义',
          dividerSubtitle: '清晰取代猜测',
          title: '拿到人生的结构图',
          paragraphs: [
            '学习玄学初阶课程仿佛握住人生的结构图——你不再凭感觉行事，而是看见方向、节奏与节气。',
            '当你理解命运运作的底层逻辑，你将由被动应对转为主动掌控。'
          ]
        },
        {
          key: 'structure',
          dividerTitle: '课程结构',
          dividerSubtitle: '6 个月引导旅程',
          title: '模块化教学搭配导师辅导',
          paragraphs: [
            '课程为期 6 个月，结合理论讲解、实战推演与导师辅导，让吸收与应用同步进行。'
          ],
          points: [
            '模块一 · 八字架构——命盘建立、五行强弱与个人洞察。',
            '模块二 · 紫微斗数——星曜解析与十二宫生命地图。',
            '模块三 · 生命数字——生命路径与数字密码的实务解读。',
            '模块四 · 奇门遁甲——时间方位能量的入门布局。',
            '模块五 · 统整实战——真实案例推演与导师答疑。'
          ]
        },
        {
          key: 'audience',
          dividerTitle: '适合人群',
          dividerSubtitle: '为有准备的学习者而设',
          title: '转换兴趣为可执行理解',
          points: [
            '对命理与人生规律充满好奇的探索者。',
            '希望系统学习玄学并建立方法论的初学者。',
            '想把命理逻辑融入辅导、疗愈或咨询工作的专业人士。',
            '准备开始阅读自己或他人命盘的学习者。'
          ]
        },
        {
          key: 'outcome',
          dividerTitle: '学习成果与价值',
          dividerSubtitle: '六个月后的转变',
          title: '具备跨体系命盘阅读力',
          paragraphs: [
            '完成《初阶课程》后，你将具备跨越四大术数体系的基础命盘阅读能力。',
            '命运不再神秘，而是可读、可解、可顺势的结构。',
            '你将开启新的感知层次，让逻辑与直觉并行，为未来的进阶与专业课程奠定根基。'
          ]
        }
      ],
      cta: {
        dividerTitle: '准备好踏上初阶学习了吗？',
        dividerSubtitle: '开启你的六个月修习旅程',
        title: '报名《初阶课程》',
        message: '点击下方，展开理解命运结构与能量流动的 6 个月修习。',
        primaryLabel: '立即报名',
        primaryHref: '/contact',
        secondaryLabel: '返回课程总览',
        secondaryHref: '/academy/courses'
      }
    },
    academyIntermediate: {
      hero: {
        badge: '学院',
        title: '进阶课程',
        subtitle: '融合多术数 · 掌握命运交汇点 · 看见人生的隐藏规律',
        primaryLabel: '立即报名',
        primaryHref: '/contact',
        secondaryLabel: '返回课程总览',
        secondaryHref: '/academy/courses'
      },
      sections: [
        {
          key: 'overview',
          dividerTitle: '课程概述',
          dividerSubtitle: '学习焦点',
          title: '把多门术数整合成一套掌控框架',
          paragraphs: [
            '《进阶课程》是从“懂原理”到“通推演”的关键阶段。在基础与初阶课程的基础上，本阶段将带你学习如何融合八字、紫微斗数、生命数字、风水与奇门遁甲，形成完整的命理分析流程。',
            '你将看懂时间、元素与空间的互动关系，读懂命盘背后的因果结构，并在转折发生前先行识别。命运于是从未知变得可读、可导航、可调整。'
          ]
        },
        {
          key: 'curriculum',
          dividerTitle: '学习内容',
          dividerSubtitle: '整合能力',
          title: '掌握命运交汇点的五大技巧',
          points: [
            '命盘交叉解析：综合八字、紫微、奇门命盘，找出时运交汇点。',
            '周期推演：掌握十年大运、流年与环境气场的互动规律。',
            '风水应用：让个人命格与居家、办公空间的能量同频。',
            '数理进阶：理解生命数字与宇宙时间的共振节奏。',
            '高阶案例：透过真实案例训练分析精度与结构思维。'
          ]
        },
        {
          key: 'why',
          dividerTitle: '学习意义',
          dividerSubtitle: '超越表层解盘',
          title: '把知识升级为战略洞察',
          paragraphs: [
            '进阶阶段让玄学不再停留在知识堆叠，而是成为可以预判与决策的战略工具。你将学会让不同术数彼此印证、互补与制衡，这也是专业命理师与普通解盘者的分水岭。',
            '当逻辑与直觉融合，你就能精准解析复杂命盘，为自己与他人提供真正具指导力的行动方案。'
          ]
        },
        {
          key: 'structure',
          dividerTitle: '课程结构',
          dividerSubtitle: '3 个月强化班',
          title: '模块化整合 × 实战演练',
          paragraphs: [
            '课程为期 3 个月，结合系统整合法、案例实战与导师辅导，让理解与应用同步延伸。'
          ],
          points: [
            '模块一 · 术数整合 —— 八字、紫微、奇门的逻辑互动。',
            '模块二 · 周期预测 —— 时间规律与人生转折节点解析。',
            '模块三 · 风水共振 —— 命格与空间气场的匹配应用。',
            '模块四 · 数理深化 —— 以时间为主轴的能量频率分析。',
            '模块五 · 案例实训 —— 从真实命盘练习整合推演与判断。'
          ]
        },
        {
          key: 'audience',
          dividerTitle: '适合人群',
          dividerSubtitle: '为追求整合力的学习者而设',
          title: '升阶为多体系命理实战者',
          points: [
            '已完成基础与初阶课程的学员。',
            '希望融合多术数体系的命理研究者与学习者。',
            '需要提升分析精度的命理顾问与咨询师。',
            '想精准预测时运并为他人提供方向的进阶学习者。'
          ]
        },
        {
          key: 'outcome',
          dividerTitle: '学习成果与价值',
          dividerSubtitle: '结业后的能力',
          title: '读懂时间与能量交汇的关键点',
          paragraphs: [
            '完成《进阶课程》后，你将具备读取命运交汇点的综合能力，看清时间、空间与能量的交错运行。',
            '玄学不再是零散知识，而是一套有逻辑、有系统的完整体系。你将学会预见变化，并在正确的时间做出正确的选择。'
          ]
        }
      ],
      cta: {
        dividerTitle: '准备好掌握多术数整合了吗？',
        dividerSubtitle: '开启三个月的深度修习',
        title: '报名《进阶课程》',
        message: '点击下方，展开三个月的整合修习旅程，掌握命运交汇的核心逻辑。',
        primaryLabel: '立即报名',
        primaryHref: '/contact',
        secondaryLabel: '返回课程总览',
        secondaryHref: '/academy/courses'
      }
    },
    academyProfessional: {
      hero: {
        badge: '学院',
        title: '专业课程与认证',
        subtitle: '学以致用 · 以术为道 · 以道达人',
        primaryLabel: '立即报名',
        primaryHref: '/contact',
        secondaryLabel: '返回课程总览',
        secondaryHref: '/academy/courses'
      },
      sections: [
        {
          key: 'overview',
          dividerTitle: '课程概述',
          dividerSubtitle: '巅峰阶段',
          title: '把掌握力转化为专业实践',
          paragraphs: [
            '《专业课程与认证》是玄学修习体系的终极阶段，专为准备将知识转化为实践、将实践升华为使命的学员而设。',
            '课程帮助你精炼分析技巧、强化咨询沟通，并建立专业命理顾问所需的职业标准——精准、理性与责任。'
          ]
        },
        {
          key: 'curriculum',
          dividerTitle: '学习内容',
          dividerSubtitle: '专业能力矩阵',
          title: '全面掌握四大专业核心',
          points: [
            '命理咨询框架：从准备到讲解，建立完整咨询流程。',
            '高阶推演逻辑：融合八字、紫微、数理、风水与奇门的整合模型。',
            '客户沟通与职业伦理：学习清晰表达、共情倾听与专业自律。',
            '报告编制与呈现：编写完整命运报告并进行口头分析说明。',
            '认证实训：导师监督的实操案例与结业项目，完成认证要求。'
          ]
        },
        {
          key: 'why',
          dividerTitle: '学习意义',
          dividerSubtitle: '承载智慧',
          title: '把洞察力化为实际影响',
          paragraphs: [
            '这一阶段不止于“学得更多”，而是“学会承载智慧”。成为认证命理顾问，意味着将命盘与数字背后的规律转化为人性的理解与实际解决方案。',
            '你将兼具技术深度与情感智慧，以责任与温度引导他人前行。'
          ]
        },
        {
          key: 'structure',
          dividerTitle: '课程结构',
          dividerSubtitle: '3 个月认证实训',
          title: '导师辅导 × 案例实战 × 认证评审',
          paragraphs: [
            '课程为期 3 个月，结合导师辅导、监督案例与最终认证评估，让专业力与实战力同步提升。'
          ],
          points: [
            '模块一 · 咨询框架与伦理 —— 建立专业标准与服务流程。',
            '模块二 · 术数整合推演 —— 五大体系融合分析，精准诊断。',
            '模块三 · 客户模拟与实操 —— 实战演练，导师逐案指导。',
            '模块四 · 报告撰写与呈现 —— 制作并讲解专业命运报告。',
            '模块五 · 认证考核 —— 书面与口头评估，完成官方认证。'
          ]
        },
        {
          key: 'audience',
          dividerTitle: '适合人群',
          dividerSubtitle: '为未来的专业顾问而设',
          title: '成为玄学命理顾问的最后一里路',
          points: [
            '已完成进阶课程，准备取得正式认证的学员。',
            '希望成为具资格的玄学命理顾问的实践者。',
            '来自心理、疗愈、咨询领域，想融入玄学深度的专业人士。',
            '想以责任感与自信引导他人理解命运的人。'
          ]
        },
        {
          key: 'outcome',
          dividerTitle: '学习成果与价值',
          dividerSubtitle: '完成后的身份',
          title: '获得认证玄学命理顾问资格',
          paragraphs: [
            '完成课程后，你将获得认证玄学命理顾问资格，具备高阶命理分析、沟通表达与客户管理能力。',
            '你拥有的不只是证书，更是专业与智慧并行的掌控力，准备好以术为桥、以道为志、以心为师。'
          ]
        }
      ],
      cta: {
        dividerTitle: '准备好迎接认证了吗？',
        dividerSubtitle: '迈向专业的最后一步',
        title: '报名《专业课程与认证》',
        message: '点击下方，开启认证之旅，让你以专业身份引领玄学服务。',
        primaryLabel: '立即报名',
        primaryHref: '/contact',
        secondaryLabel: '返回课程总览',
        secondaryHref: '/academy/courses'
      }
    },
    academyFoundation: {
      hero: {
        badge: '学院',
        title: '玄学基础课程',
        subtitle: '夯实根基 · 理解天人之道 · 掌握命运底层逻辑',
        primaryLabel: '立即报名',
        primaryHref: '/contact',
        secondaryLabel: '返回课程总览',
        secondaryHref: '/academy/courses'
      },
      sections: [
        {
          key: 'overview',
          dividerTitle: '课程概述',
          dividerSubtitle: '学习起点',
          title: '夯实一切玄学体系的根基',
          paragraphs: [
            '《玄学基础课程》是进入玄学世界的起点与根基。课程系统讲解阴阳、五行、天干地支与气场流转，让你看懂万事万物背后的能量逻辑与时间规律。',
            '它不是神秘学，而是一套科学化的命运结构语言。掌握基础后，你将能以结构化、可验证的方式理解命运，为后续八字、紫微、奇门与风水学习打下坚实基础。'
          ]
        },
        {
          key: 'curriculum',
          dividerTitle: '学习内容',
          dividerSubtitle: '核心法则',
          title: '掌握命运与能量的底层规律',
          points: [
            '阴阳原理：洞悉平衡、互动与变化的根源。',
            '五行学说：木火土金水的能量结构与生克制化规律。',
            '天干地支：六十甲子循环与时间、命运的联系。',
            '气场流动：能量在时间与空间中的运行规律。',
            '天人合一：明确自身在“天、地、人”三才之间的位置与作用。'
          ]
        },
        {
          key: 'why',
          dividerTitle: '学习意义',
          dividerSubtitle: '为什么要学',
          title: '先懂概念，再进方法',
          paragraphs: [
            '所有玄学体系——无论八字、紫微斗数、风水还是奇门遁甲——都建立在这些基础概念之上。没有扎实根基，后续学习容易停留在片段信息，难以整合。',
            '本课程帮助你建立清晰的思维框架与能量感知力，让你在实战中避免误用概念、误判结构。'
          ]
        },
        {
          key: 'structure',
          dividerTitle: '课程结构',
          dividerSubtitle: '3–6 个月',
          title: '理论 × 实修，循序渐进',
          paragraphs: [
            '课程为期 3–6 个月，结合理论讲解、图表解析与实操练习，帮助你把“概念”转化为“可用的工具”。'
          ],
          points: [
            '模块一 · 阴阳逻辑 — 对立统一与能量平衡。',
            '模块二 · 五行循环 — 生克制化与结构诊断。',
            '模块三 · 天干地支 — 六十甲子时间密码与运行节奏。',
            '模块四 · 气场运行 — 气动与结果之间的因果关联。',
            '模块五 · 基础实修 — 从五行平衡视角解读人生结构。'
          ]
        },
        {
          key: 'audience',
          dividerTitle: '适合人群',
          dividerSubtitle: '谁该学习',
          title: '为渴望系统掌握玄学的人而设',
          points: [
            '想从零开始了解命理机制的初学者。',
            '希望在进阶前夯实理论基础的学习者。',
            '其他命理体系的研究者，需要系统化框架与共通语言。',
            '对命运机制好奇、想从理性角度理解“玄学”的人。'
          ]
        },
        {
          key: 'outcome',
          dividerTitle: '学习成果',
          dividerSubtitle: '课程价值',
          title: '掌握“命运语言”的起点',
          paragraphs: [
            '完成课程后，你将清楚看到命运与能量之间的结构关系。命运不再是“未知”，而是一套可读、可解、可顺应的系统。',
            '这不仅是一门课程，更是通往高级术数的语言入口，让后续学习与实践都拥有清晰的坐标。'
          ]
        }
      ],
      faq: [
        { question: '课程会让我掌握哪些核心框架？', answer: '你将扎实掌握阴阳、五行运作，以及十干十二支的时间密码，让后续所有命理推演都有清晰结构。' },
        { question: '这门课怎样衔接进阶学习？', answer: '它是进阶班的桥梁——打好基础后，进入八字、紫微、奇门等多术数整合时会更轻松。' },
        { question: '课程中会有实战演练吗？', answer: '会。导师会带领你实作真实案例，从五行平衡、时间节奏与气场流动角度进行解析。' },
        { question: '课程资料是否可以无限期使用？', answer: '是的。你可持续下载讲义、参考图表与直播回放，随时复习并在下一阶段继续使用。' }
      ],
            cta: {
        dividerTitle: '准备好启动基础修习了吗？',
        dividerSubtitle: '迈向命运掌控的第一步',
        title: '报名《玄学基础课程》',
        message: '点击下方即可预约最新一期课程名额，或洽询私人定制班级。',
        primaryLabel: '立即报名',
        primaryHref: '/contact',
        secondaryLabel: '返回课程总览',
        secondaryHref: '/academy/courses'
      }
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

dictionary.EN.acd = {
  courses: dictionary.EN.nav.courses,
  foundation: dictionary.EN.nav.foundation,
  beginner: dictionary.EN.nav.beginner,
  intermediate: dictionary.EN.nav.advanced,
  professional: dictionary.EN.nav.pro,
}

dictionary.CN.acd = {
  courses: dictionary.CN.nav.courses,
  foundation: dictionary.CN.nav.foundation,
  beginner: dictionary.CN.nav.beginner,
  intermediate: dictionary.CN.nav.advanced,
  professional: dictionary.CN.nav.pro,
}

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
