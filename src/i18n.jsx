import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const dict = {
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
            { title: 'Destiny Algorithm (BaZi)', href: '/services/celestial/destiny-algorithm' },
            { title: 'Imperial Star Atlas (Zi Wei Dou Shu)', href: '/services/celestial/imperial-star-atlas' },
            { title: 'Arcane Strategy Matrix (Qi Men Dun Jia)', href: '/services/celestial/arcane-strategy-matrix' },
          ],
        },
        {
          title: 'Feng Shui Assessment',
          items: [
            { title: 'Home Destiny Compass', href: '/services/fengshui/home-destiny-compass' },
            { title: 'Office Power Alignment', href: '/services/fengshui/office-power-alignment' },
            { title: 'Dragon Vein Oracle', href: '/services/fengshui/dragon-vein-oracle' },
          ],
        },
        {
          title: 'Feng Shui Layout',
          items: [
            { title: 'Cosmic Cycle of Fate', href: '/services/fengshui/cosmic-cycle-of-fate' },
            { title: 'Celestial Star Matrix', href: '/services/fengshui/celestial-star-matrix' },
            { title: 'Energy Convergence Field', href: '/services/fengshui/energy-convergence-field' },
          ],
        },
        {
          title: 'Magnetic Matrix',
          items: [
            { title: 'I-Ching Energy Matrix', href: '/services/magnetic-matrix/i-ching-energy-matrix' },
            { title: 'Name Destiny Code', href: '/services/magnetic-matrix/name-destiny-code' },
            { title: 'Soul Number Blueprint', href: '/services/magnetic-matrix/soul-number-blueprint' },
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
      bazi: {
        badge: 'Destiny Intelligence',
        title: 'Destiny Algorithm (BaZi)',
        subtitle: 'True Solar Time calibrated BaZi decoding that transforms classical data into an executive-grade strategy blueprint.',
        sections: [
          {
            key: 'overview',
            dividerTitle: 'Service Overview',
            dividerSubtitle: 'How the Destiny Algorithm is constructed',
            title: 'Precision BaZi Architecture',
            imageLabel: 'BaZi Charting Lab',
            body: 'We compute your natal pillars using authoritative calendars and True Solar Time, then model elemental interactions to reveal innate wiring and the rhythm of breakthroughs.',
            points: [
              'Includes destiny chart calibration, structure analysis and elemental balance diagnostics.',
              'Maps core capacities, wealth engines, partnership dynamics and resilience markers.',
            ],
          },
          {
            key: 'value',
            dividerTitle: 'Strategic Value',
            dividerSubtitle: 'Why leaders rely on this BaZi protocol',
            title: 'Decision Intelligence Anchored in Timing',
            imageLabel: 'Strategic Insight Board',
            body: 'By cross-referencing natal, 10-year and annual pillars we identify the windows to deploy capital, scale teams or re-align personal focus. Every recommendation is supported by corroborated classical sources.',
            points: [
              'Pinpoints favourable cycles for launches, investments and key negotiations.',
              'Highlights risk intervals with mitigation tactics so momentum stays intact.',
            ],
          },
          {
            key: 'audience',
            dividerTitle: 'Ideal Beneficiaries',
            dividerSubtitle: 'Who gains the most from this analysis',
            title: 'Built for Founders and High-Impact Decision Makers',
            imageLabel: 'Executive Advisory Portrait',
            body: 'Designed for founders, portfolio leaders and creatives navigating complex timelines who require a dependable compass to coordinate life, capital and legacy.',
          },
          {
            key: 'deliverables',
            dividerTitle: 'Deliverables',
            dividerSubtitle: 'What the engagement delivers to you',
            title: 'Command Deck of BaZi Findings',
            imageLabel: 'Deliverable Preview',
            body: 'Receive a 100+ page dossier with narrative analysis, elemental prescriptions, timing roadmaps and action checklists. Live consultation ensures the plan lands with clarity.',
            points: [
              'Digital dossier plus executive summary slides for rapid reference.',
              'Recorded briefing with Q&A and follow-up clarifications within 14 days.',
            ],
          },
          {
            key: 'timeline',
            dividerTitle: 'Delivery Milestones',
            dividerSubtitle: 'When each phase is completed',
            title: 'Four-Phase Workflow',
            imageLabel: 'Delivery Timeline',
            points: [
              'Intake & data validation: within 2 business days of confirmation.',
              'Chart computation & analysis: 7 business days.',
              'Strategic briefing session: scheduled week 3.',
              'Post-briefing refinements and clarifications: within 10 days after the session.',
            ],
          },
        ],
        cta: {
          dividerTitle: 'Reserve Your Analysis Window',
          dividerSubtitle: 'Limited charts accepted monthly to preserve analytical depth',
          title: 'Secure Your Destiny Algorithm Intake',
          message: 'We release a controlled number of BaZi analysis slots each month to maintain uncompromising quality. Reserve now to align your next strategic window.',
          primaryLabel: 'Book BaZi Consultation',
          primaryHref: '/contact',
          secondaryLabel: 'Request Scope Deck',
          secondaryHref: '/resources/four-pillars',
        },
        newsletterTitle: 'Stay Aligned with Celestial Timing',
        newsletterSubtitle: 'Receive quarterly destiny and timing intelligence straight to your inbox.',
      },
      ziwei: {
        badge: 'Imperial Intelligence',
        title: 'Imperial Star Atlas (Zi Wei Dou Shu)',
        subtitle: 'Imperial-grade star charting that maps leadership arcs, alliances and reputational tides with forensic clarity.',
        sections: [
          {
            key: 'overview',
            dividerTitle: 'Service Overview',
            dividerSubtitle: 'Inside the Imperial Star Atlas',
            title: 'Comprehensive Palace Diagnostics',
            imageLabel: 'Zi Wei Palace Map',
            body: 'We chart your imperial palaces, star clusters and transformations to decode how authority, wealth, influence and legacy are orchestrated throughout life.',
            points: [
              'Includes natal palace analysis, star interactions and transformative triggers.',
              'Integrates auxiliary stars to reveal hidden allies, competitors and advisors.',
            ],
          },
          {
            key: 'value',
            dividerTitle: 'Strategic Value',
            dividerSubtitle: 'Why the Atlas matters',
            title: 'Governance for Reputation and Influence',
            imageLabel: 'Strategy Command Room',
            body: 'Zi Wei exposes the architecture of authority—where you naturally command, where you must fortify, and the cadence of prominence. We align roles, visibility moves and alliances accordingly.',
            points: [
              'Clarifies optimum leadership style, voice and positioning for each decade.',
              'Anticipates reputational surges or scrutiny, with countermeasures prepared.',
            ],
          },
          {
            key: 'audience',
            dividerTitle: 'Ideal Beneficiaries',
            dividerSubtitle: 'Who the Atlas is crafted for',
            title: 'For Principals, Diplomats and Cultural Leaders',
            imageLabel: 'Leadership Portrait',
            body: 'Suited for founders, public figures, negotiators and cultural stewards entrusted with influence who need refined situational intelligence.',
          },
          {
            key: 'deliverables',
            dividerTitle: 'Deliverables',
            dividerSubtitle: 'What you will receive',
            title: 'Imperial Command Portfolio',
            imageLabel: 'Atlas Deliverable',
            body: 'Receive a 120+ page report covering palace-by-palace insights, ally matrices, risk watchlists and ceremonial activations, supported by a strategic briefing.',
            points: [
              'Annotated palace dossier with timelines and scenario planning tables.',
              'Live debrief with follow-on advisory retainer options.',
            ],
          },
          {
            key: 'timeline',
            dividerTitle: 'Release Schedule',
            dividerSubtitle: 'How delivery is staged',
            title: 'Three-Stage Imperial Workflow',
            imageLabel: 'Delivery Timeline',
            points: [
              'Intake & chart plotting: 3 business days.',
              'Imperial analysis & documentation: 10 business days.',
              'Strategic council session and optional follow-up: week 3.',
            ],
          },
        ],
        cta: {
          dividerTitle: 'Command Your Star Atlas',
          dividerSubtitle: 'Slots prioritised for leaders entering new cycles',
          title: 'Schedule Your Imperial Star Briefing',
          message: 'We steward a limited roster of Imperial Star Atlas engagements per quarter. Lock in your briefing to navigate upcoming influence windows with precision.',
          primaryLabel: 'Arrange Zi Wei Council',
          primaryHref: '/contact',
          secondaryLabel: 'Download Advisory Overview',
          secondaryHref: '/resources/purple-star',
        },
        newsletterTitle: 'Track Celestial Court Signals',
        newsletterSubtitle: 'Subscribe for imperial timing alerts and case clinics.',
      },
      qimen: {
        badge: 'Strategic Operations',
        title: 'Arcane Strategy Matrix (Qi Men Dun Jia)',
        subtitle: 'Operational Qi Men command matrix that choreographs decisive moves, from negotiations to market entries.',
        sections: [
          {
            key: 'overview',
            dividerTitle: 'Service Overview',
            dividerSubtitle: 'From divination to deployment',
            title: 'Mission-Specific Qi Men Formations',
            imageLabel: 'Qi Men Formation Map',
            body: 'We cast battlefield charts for your objective, decode doors, stars and deities, then translate them into tactical plays you can execute.',
            points: [
              'Includes formation casting, commander brief and directional playbook.',
              'Synchronises with BaZi and Zi Wei data to ensure cross-method coherence.',
            ],
          },
          {
            key: 'value',
            dividerTitle: 'Strategic Value',
            dividerSubtitle: 'Why operators choose this matrix',
            title: 'Operational Advantage in Real Time',
            imageLabel: 'Tactical Command Screen',
            body: 'Qi Men pinpoints the moment, direction and persona to deploy so you outmanoeuvre competitors, unlock doors and neutralise resistance.',
            points: [
              'Defines exact timing and positioning for launches, negotiations and crisis response.',
              'Identifies supporting actors or missing resources to complete the formation.',
            ],
          },
          {
            key: 'audience',
            dividerTitle: 'Ideal Beneficiaries',
            dividerSubtitle: 'Who operates best with Qi Men intelligence',
            title: 'Built for Operators, Strategists and Deal Teams',
            imageLabel: 'Operations Squad',
            body: 'Tailored for entrepreneurs, expansion teams, security strategists and negotiators who require asymmetric advantage on demand.',
          },
          {
            key: 'deliverables',
            dividerTitle: 'Deliverables',
            dividerSubtitle: 'What the operation kit includes',
            title: 'Arcane Strategy Playbook',
            imageLabel: 'Strategy Brief Case',
            body: 'Receive a mission brief outlining recommended timings, directionality, personas, supporting elements and contingency flows.',
            points: [
              'Interactive play sheets with scenario-based pivots.',
              'Live war-room session to rehearse moves and adapt in real time.',
            ],
          },
          {
            key: 'timeline',
            dividerTitle: 'Activation Timeline',
            dividerSubtitle: 'How fast the matrix deploys',
            title: 'Rapid Response Sprint',
            imageLabel: 'Operational Timeline',
            points: [
              'Objective intake and scoping: 1 business day.',
              'Chart casting and formation design: 48 hours.',
              'Strategy briefing and live rehearsal: within 5 business days of intake.',
            ],
          },
        ],
        cta: {
          dividerTitle: 'Deploy Your Qi Men Matrix',
          dividerSubtitle: 'Priority support for time-sensitive missions',
          title: 'Activate Arcane Strategy Support',
          message: 'We accommodate a limited number of concurrent Qi Men operations to guarantee responsiveness. Submit your mission to reserve the next available window.',
          primaryLabel: 'Launch Qi Men Operation',
          primaryHref: '/contact',
          secondaryLabel: 'Request Tactical Brief',
          secondaryHref: '/oracle/six-ren',
        },
        newsletterTitle: 'Stay Ahead of Tactical Windows',
        newsletterSubtitle: 'Receive Qi Men timing alerts, case notes and war-room invites.',
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
      taiyi_numbers: '太乙神算乾坤太乙策',
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
            { title: '命运算法', href: '/services/celestial/destiny-algorithm' },
            { title: '帝星天图', href: '/services/celestial/imperial-star-atlas' },
            { title: '玄机战策', href: '/services/celestial/arcane-strategy-matrix' },
          ]
        },
        {
          title: '风水评估',
          items: [
            { title: '宅运天机', href: '/services/fengshui/home-destiny-compass' },
            { title: '权势风水', href: '/services/fengshui/office-power-alignment' },
            { title: '龙脉圣图', href: '/services/fengshui/dragon-vein-oracle' },
          ]
        },
        {
          title: '风水布局',
          items: [
            { title: '三元九运', href: '/services/fengshui/cosmic-cycle-of-fate' },
            { title: '玄空飞星', href: '/services/fengshui/celestial-star-matrix' },
            { title: '造化能域', href: '/services/fengshui/energy-convergence-field' },
          ]
        },
        {
          title: '磁场矩阵',
          items: [
            { title: '太极数场', href: '/services/magnetic-matrix/i-ching-energy-matrix' },
            { title: '名格天命', href: '/services/magnetic-matrix/name-destiny-code' },
            { title: '灵数天机', href: '/services/magnetic-matrix/soul-number-blueprint' },
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
  },
    services: {
      bazi: {
        badge: '命运情报',
        title: '命运算法（八字）',
        subtitle: '以真太阳时校准的八字推演，将经典数据转化为高层决策蓝图。',
        sections: [
          {
            key: 'overview',
            dividerTitle: '方案概览',
            dividerSubtitle: '命运算法包含什么',
            title: '精准的八字结构解析',
            imageLabel: '八字图实验室',
            body: '依据权威历法与真太阳时重建命盘，梳理五行动态，洞察先天优势与突破节奏。',
            points: [
              '涵盖命盘校准、格局评估与五行平衡诊断。',
              '揭示潜能、财富引擎、合作关系与韧性指数。',
            ],
          },
          {
            key: 'value',
            dividerTitle: '战略价值',
            dividerSubtitle: '为什么值得采用',
            title: '以时间为核心的决策情报',
            imageLabel: '战略洞察面板',
            body: '通过对大运与流年的交叉验证，定位资金调度、团队扩张与个人专注的最佳时点，并提供应对方案。',
            points: [
              '锁定发布、投资、谈判的强助力周期。',
              '提前识别风险窗口并配套缓冲策略。',
            ],
          },
          {
            key: 'audience',
            dividerTitle: '适合对象',
            dividerSubtitle: '谁最适合命运算法',
            title: '为创始人与关键决策者而设',
            imageLabel: '管理者形象',
            body: '适合在多重时间线中穿梭的创始人、投资者与创意者，需要精准罗盘协调人生、资本与传承。',
          },
          {
            key: 'deliverables',
            dividerTitle: '交付内容',
            dividerSubtitle: '交付成果与形式',
            title: '八字飞行手册',
            imageLabel: '交付资料示意',
            body: '提供 100+ 页分析报告、时序路线与执行清单，并附实时解读，确保计划落地。',
            points: [
              '含数字报告及高管摘要，便于速读速用。',
              '咨询录音与 14 天内的追问答复。',
            ],
          },
          {
            key: 'timeline',
            dividerTitle: '交付节奏',
            dividerSubtitle: '每一步的时间表',
            title: '四阶段流程',
            imageLabel: '交付时间轴',
            points: [
              '资料确认：2 个工作日内完成。',
              '命盘推演与分析：7 个工作日。',
              '战略解读会议：第 3 周安排。',
              '会后微调与答疑：会后 10 天内完成。',
            ],
          },
        ],
        cta: {
          dividerTitle: '锁定分析档期',
          dividerSubtitle: '每月限量接收，确保深度',
          title: '预约命运算法咨询',
          message: '为维持品质，我们每月开放有限名额。立即预约，确保抓住下一次关键窗口。',
          primaryLabel: '预约八字咨询',
          primaryHref: '/contact',
          secondaryLabel: '索取服务白皮书',
          secondaryHref: '/resources/four-pillars',
        },
        newsletterTitle: '掌握命运节奏',
        newsletterSubtitle: '订阅季度命运与时间情报。',
      },
      ziwei: {
        badge: '帝星情报',
        title: '帝星图谱（紫微斗数）',
        subtitle: '以帝星系统勾勒领导、盟友与声望起伏，为影响力布局提供精密罗盘。',
        sections: [
          {
            key: 'overview',
            dividerTitle: '方案概览',
            dividerSubtitle: '帝星图谱包含什么',
            title: '全景宫位诊断',
            imageLabel: '紫微宫位图',
            body: '重建命宫、身宫与诸宫位，解析主星与辅星交互，洞察财富、声望与传承的运行框架。',
            points: [
              '涵盖命盘宫位、星曜互动与转化机理。',
              '融合辅星，揪出隐形盟友、竞争者与贵人。',
            ],
          },
          {
            key: 'value',
            dividerTitle: '战略价值',
            dividerSubtitle: '帝星图谱的意义',
            title: '治理声望与影响力的仪表盘',
            imageLabel: '战略指挥室',
            body: '紫微揭示权柄架构，明确哪里自然主导、哪里需强化、声望何时高峰或受考验，并给出布局建议。',
            points: [
              '厘清各阶段最适合的领导风格与曝光策略。',
              '提前预判舆论高峰或监察期，并准备应对组合。',
            ],
          },
          {
            key: 'audience',
            dividerTitle: '适合对象',
            dividerSubtitle: '谁最适合帝星图谱',
            title: '为掌舵者与文化领袖设计',
            imageLabel: '领袖肖像',
            body: '适合肩负影响力的创始人、公众人物、谈判代表与文化守护者，需要精密情势判断。',
          },
          {
            key: 'deliverables',
            dividerTitle: '交付内容',
            dividerSubtitle: '交付成果与形式',
            title: '帝星指挥组合',
            imageLabel: '图谱交付件',
            body: '提供 120+ 页宫位报告、盟友矩阵、风险哨所与仪式激活指南，并附战略简报。',
            points: [
              '附注释宫位脚本与时间线情境规划。',
              '提供现场汇报与延伸顾问方案。',
            ],
          },
          {
            key: 'timeline',
            dividerTitle: '交付节奏',
            dividerSubtitle: '时间安排',
            title: '三阶段流程',
            imageLabel: '交付时间轴',
            points: [
              '资料采集与命盘绘制：3 个工作日。',
              '帝星分析与文件编制：10 个工作日。',
              '战略汇报与后续顾问：第 3 周执行。',
            ],
          },
        ],
        cta: {
          dividerTitle: '掌握帝星图谱',
          dividerSubtitle: '优先为迈入新周期的领袖保留',
          title: '预约紫微战略会晤',
          message: '每季度限量开展帝星图谱项目。即刻预约，掌握即将到来的影响力窗口。',
          primaryLabel: '安排紫微会晤',
          primaryHref: '/contact',
          secondaryLabel: '下载顾问概要',
          secondaryHref: '/resources/purple-star',
        },
        newsletterTitle: '掌握天府信号',
        newsletterSubtitle: '订阅帝星时讯与案例解析。',
      },
      qimen: {
        badge: '战略操作',
        title: '玄门战略矩阵（奇门遁甲）',
        subtitle: '以奇门遁甲编排行动矩阵，调度谈判、扩张与应急任务的最佳时机与方向。',
        sections: [
          {
            key: 'overview',
            dividerTitle: '方案概览',
            dividerSubtitle: '玄门矩阵包含什么',
            title: '任务定制的奇门阵势',
            imageLabel: '奇门阵图',
            body: '针对任务布阵，解读门、星、神，转化为可执行的战术指令。',
            points: [
              '包含阵图推演、指挥官简报与方向策略。',
              '与八字、紫微资料交叉验证，确保一致性。',
            ],
          },
          {
            key: 'value',
            dividerTitle: '战略价值',
            dividerSubtitle: '为什么需要奇门矩阵',
            title: '实时取得攻守先机',
            imageLabel: '战术指挥屏',
            body: '奇门定位最佳时刻、方位与角色，让你在竞争中先一步布局，打开门户并消弭阻力。',
            points: [
              '为发布、谈判、危机应对设定准确时间与方向。',
              '识别需到位的支援人物与资源，完成阵势。',
            ],
          },
          {
            key: 'audience',
            dividerTitle: '适合对象',
            dividerSubtitle: '谁最适合运用奇门',
            title: '为操盘手与策略团队打造',
            imageLabel: '行动团队',
            body: '适合企业操盘手、扩张团队、安全策略顾问与谈判代表，需要即刻取得非对称优势。',
          },
          {
            key: 'deliverables',
            dividerTitle: '交付内容',
            dividerSubtitle: '行动工具包包含什么',
            title: '玄门作战手册',
            imageLabel: '作战资料夹',
            body: '提供推荐时间、方向、角色扮演与应变流程的任务简报。',
            points: [
              '互动式情境卡，涵盖不同场景的转向与补位。',
              '联合演练，确保即时应对。',
            ],
          },
          {
            key: 'timeline',
            dividerTitle: '启动节奏',
            dividerSubtitle: '多快能启动',
            title: '快速响应流程',
            imageLabel: '启动时间轴',
            points: [
              '任务需求确认：1 个工作日。',
              '阵图推演与策略设计：48 小时。',
              '战略简报与实战演练：确认后 5 个工作日内完成。',
            ],
          },
        ],
        cta: {
          dividerTitle: '部署奇门矩阵',
          dividerSubtitle: '紧急任务可优先排期',
          title: '启动玄门战略支援',
          message: '为保持响应速度，我们仅接纳有限并行任务。请提交需求以锁定下一档期。',
          primaryLabel: '启动奇门行动',
          primaryHref: '/contact',
          secondaryLabel: '索取战术简报',
          secondaryHref: '/oracle/six-ren',
        },
        newsletterTitle: '掌握战术窗口',
        newsletterSubtitle: '订阅奇门时讯、案例与战室邀请。',
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
dict.EN.who = { title: dict.EN.who_title, body: dict.EN.who_long }
dict.EN.why = { title: dict.EN.why_title, long: dict.EN.why_long }
dict.CN.who = { title: dict.CN.who_title, body: dict.CN.who_long }
dict.CN.why = { title: dict.CN.why_title, long: dict.CN.why_long }
const I18nContext = createContext(null)

export function I18nProvider({ children }){
  const initial = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'EN'
  const [lang, setLang] = useState(initial === 'CN' ? 'CN' : 'EN')

  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('lang', lang) }, [lang])

  const value = useMemo(() => ({
    lang, setLang,
    t: (path) => {
      const parts = path.split('.')
      let cur = dict[lang]
      for (const p of parts) { if (cur && p in cur) cur = cur[p]; else return path }
      return cur
    },
    tt: (key) => dict[lang][key] ?? key,
    reviews: () => dict[lang].reviews
  }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(){
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}







