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
  celestialService('/services/fengshui/home-destiny-compass',
    {
      "EN": {
        "badge": "Feng Shui Assessment",
        "title": "Home Destiny Compass",
        "intro": "Transform your residence into a regenerative command centre tuned to every occupant's destiny signature.",
        "overviewHeading": "Inside the Audit",
        "overviewSubtitle": "How we engineer a living sanctuary",
        "overviewTitle": "Celestial Habitat Blueprint",
        "imageLabel": "Residential Energy Map",
        "overviewImageUrl": "/images/page-fs-home/home-img-01.png",
        "bullets": [
          "Hybrid onsite and digital survey layering landform, Flying Star and household BaZi intelligence.",
          "Critical-room protocols covering wealth altars, wellness anchors, sleep optimisation and focus zones.",
          "Annual retuning calendar with date-specific cures, activations and maintenance actions.",
          "Curated remedy procurement list with vetted metals, crystals, water features and artisan suppliers."
        ],
        "ideal": "Perfect for households upgrading to a sanctuary that multiplies vitality, intimacy and financial momentum.",
        "idealImageUrl": "/images/page-fs-home/home-img-04.png",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Professional Workflow",
            "dividerSubtitle": "Why discerning families trust this audit",
            "title": "Evidence-Based Feng Shui Process",
            "imageLabel": "Fieldwork Protocol",
            "imageUrl": "/images/page-fs-home/home-img-02.png",
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
            "imageUrl": "/images/page-fs-home/home-img-03.png",
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
         "badge": "风水评估",
        "title": "宅运罗盘",
        "intro": "把住所打造为与全家命盘共振的能量指挥中心。",
        "overviewHeading": "服务亮点",
        "overviewSubtitle": "我们如何打造居家圣域",
        "overviewTitle": "宅运能量蓝图",
        "imageLabel": "住宅气场图",
        "overviewImageUrl": "/images/page-fs-home/home-img-01.png",
        "bullets": [
          "结合现场勘查与云端分析，整合形峦、飞星与家庭成员八字。",
          "围绕财富、健康、睡眠与专注区，制定核心空间的操作规范。",
          "提供全年调整日历，明确何时化煞、催旺与维护。",
          "附上精选化煞与催旺物料清单，含可信的金属、晶石、水景与匠人资源。"
        ],
        "ideal": "适合希望让家庭活力、关系和财务同步提升的居者。",
        "idealImageUrl": "/images/page-fs-home/home-img-04.png",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "专业流程",
            "dividerSubtitle": "为何高端家庭指定此服务",
            "title": "证据化的风水工作法",
            "imageLabel": "勘查流程",
            "imageUrl": "/images/page-fs-home/home-img-02.png",
            "body": "从资料蒐集到实施辅导，全程留痕，让你清楚知道每个建议的依据。",
            "points": [
              "审前资料库包含问卷、平面图、罗盘照与成员资料。",
              "结合现场丈量、航拍影像与飞星模拟确认每个落点。",
              "三十天顾问随行，追踪化煞效果、解答疑问并调整生活习惯。"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "成效验证",
            "dividerSubtitle": "客户共同的指标",
            "title": "健康・财气・和谐同步",
            "imageLabel": "家庭成果",
            "imageUrl": "/images/page-fs-home/home-img-03.png",
            "body": "多数家庭在数月内明显感受到情绪稳定、收入稳定与家庭氛围升级。",
            "points": [
              "卧室优化四十五天后，睡眠品质与免疫状态显著提升。",
              "学习与事业区对位吉方，孩子与大人专注力明显提高。",
              "财富位催旺后，回款周期缩短，储蓄比率上升。"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "升级你的居家能场",
          "dividerSubtitle": "每月限量实地档期",
          "title": "预约宅运评估",
          "message": "提交平面图、罗盘资料与家庭成员信息，我们将锁定勘察日期并准备专属报告。",
          "primaryLabel": "预约宅运诊断",
          "primaryHref": "/contact",
          "secondaryLabel": "查看成功案例",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "宅运情报站",
        "newsletterSubtitle": "季节布局提示、搬迁吉时与真实案例即时送达。"
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
        "overviewImageUrl": "/images/page-fs-office/office-img-01.png",
        "bullets": [
          "Executive war-room placement calibrated to leadership authority and decision velocity sectors.",
          "Revenue, marketing and innovation pods sequenced to time gates that amplify pipeline flow.",
          "Recruitment, onboarding and retention rituals embedded into spatial choreography.",
          "Annual retuning and renovation governance blueprint to protect momentum during change."
        ],
        "ideal": "Designed for scaling companies, venture teams and funds that demand spatial advantage on demand.",
        "idealImageUrl": "/images/page-fs-office/office-img-02.png",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Professional Methodology",
            "dividerSubtitle": "How the audit is governed",
            "title": "Corporate-Grade Delivery",
            "imageLabel": "Corporate Audit Playbook",
            "imageUrl": "/images/page-fs-office/office-img-03.png",
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
            "imageUrl": "/images/page-fs-office/office-img-04.png",
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
        "badge": "风水评估",
        "title": "权势办公格局",
        "intro": "以高精度风水与奇门时门武装办公空间，打造不掉线的营收底盘与企业文化。",
        "overviewHeading": "项目亮点",
        "overviewSubtitle": "为每层楼注入战斗力",
        "overviewTitle": "绩效楼层总蓝图",
        "imageLabel": "企业能量网格",
        "overviewImageUrl": "/images/page-fs-office/office-img-01.png",
        "bullets": [
          "将决策核心布置于权力旺位，强化决策速度与执行定力。",
          "销售、市场与创新团队按照时门节奏排兵布阵，提升管线流速。",
          "把招募、启用与留才仪式融入空间动线，让文化自然展开。",
          "提供年度调频与装修治理准则，确保动工期间不失控。"
        ],
        "ideal": "适合高速成长的企业、投资团队与基金，追求空间即战力。",
        "idealImageUrl": "/images/page-fs-office/office-img-02.png",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "专业方法论",
            "dividerSubtitle": "项目如何控管",
            "title": "企业级交付流程",
            "imageLabel": "企业审查手册",
            "imageUrl": "/images/page-fs-office/office-img-03.png",
            "body": "以资本项目的严谨度执行，从访谈、建模到落地都有记录可循。",
            "points": [
              "与高层、HR、总务与品牌部门深度访谈，确认可量化目标。",
              "建立数位双生模型，叠加飞星、奇门时门与人流热区。",
              "提供施工与运营团队的执行手册与稽核清单。"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "成效指标",
            "dividerSubtitle": "客户实际反馈",
            "title": "营收韧性・团队黏着",
            "imageLabel": "企业成果",
            "imageUrl": "/images/page-fs-office/office-img-04.png",
            "body": "导入后一个季度内即可看到业绩稳定、协作顺畅与士气提升。",
            "points": [
              "销售管线稳定上扬，季度波动明显收窄。",
              "座位与导师配置对位吉方，关键人才留任率提升。",
              "会议与协作空间优化后，跨部门合作评分持续走高。"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "掌控权势楼层",
          "dividerSubtitle": "企业顾问排程优先制",
          "title": "预约办公能量简报",
          "message": "提供平面图、成长目标与变革计划，我们将预留档期并拟定专案范围。",
          "primaryLabel": "预约对接",
          "primaryHref": "/contact",
          "secondaryLabel": "下载企业方案",
          "secondaryHref": "/resources/feng-shui"
        },
        "newsletterTitle": "旺场节奏快讯",
        "newsletterSubtitle": "启动吉时、空间改造与董事会议程仪式即时送达。"
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
        "overviewImageUrl": "/images/page-fs-dragon/dragon-img-01.png",
        "bullets": [
          "Macro landform reconnaissance using drone, satellite and classical compass diagnostics for every candidate site.",
          "Geomantic scoring matrix ranking prosperity, wellness, protection and legacy potential by parcel.",
          "Gateway, water architecture and access road schematics tuned to capture and retain qi.",
          "Due diligence binder covering soil notes, compliance alerts and long-term maintenance rituals."
        ],
        "ideal": "Essential for developers, resorts and multigenerational estates demanding geomantic precision before acquisition.",
        "idealImageUrl": "/images/page-fs-dragon/dragon-img-02.png",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "Survey Methodology",
            "dividerSubtitle": "How each expedition is governed",
            "title": "Field Intelligence Playbook",
            "imageLabel": "Survey Protocol",
            "imageUrl": "/images/page-fs-dragon/dragon-img-03.png",
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
            "imageUrl": "/images/page-fs-dragon/dragon-img-04.png",
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
        "badge": "风水评估",
        "title": "龙脉圣图",
        "intro": "在开工之前追踪龙脉、护砂与水口，为千秋基业挑选能量旺地。",
        "overviewHeading": "勘察亮点",
        "overviewSubtitle": "动土前先读地",
        "overviewTitle": "龙脉实勘报告",
        "imageLabel": "地形情报图",
        "overviewImageUrl": "/images/page-fs-dragon/dragon-img-01.png",
        "bullets": [
          "结合航拍、卫星与罗盘，逐一巡检候选基地的山水格局。",
          "建立吉凶评分矩阵，量化财富、健康、安全与传承潜力。",
          "规划出入口、水景与道路，让气流顺利聚合并长久维持。",
          "附上土质、法规与长期养气维护的完整备忘录。"
        ],
        "ideal": "适合开发商、度假村与多世代家族，在购地前先锁定最具生命力的土地。",
        "idealImageUrl": "/images/page-fs-dragon/dragon-img-02.png",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "勘察方法",
            "dividerSubtitle": "每一次外勤如何控管",
            "title": "地形情报工作手册",
            "imageLabel": "勘查流程",
            "imageUrl": "/images/page-fs-dragon/dragon-img-03.png",
            "body": "团队融合经典堪舆、地理科技与可行性分析，给出经得起检验的建议。",
            "points": [
              "出队前与规划、法务与环评团队对齐目标与限制。",
              "多日外勤测绘山水走向、风口与环境压力点。",
              "产出图像、视频与投资等级建议，直接提供决策层使用。"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "投资成果",
            "dividerSubtitle": "客户普遍回馈",
            "title": "稳定・护持・荣耀",
            "imageLabel": "地形成果",
            "imageUrl": "/images/page-fs-dragon/dragon-img-04.png",
            "body": "依圣图行事的项目在审查、融资与社区沟通上更顺畅。",
            "points": [
              "旗舰项目凭借天赐地势，客流稳定、溢价能力强。",
              "家族宅邸落在和谐龙脉上，成员健康与关系稳定提升。",
              "因前期规划水系与养气策略，长期维护成本明显降低。"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "锁定龙脉勘察",
          "dividerSubtitle": "每季限量外勤档期",
          "title": "申请龙脉考察",
          "message": "提供地段坐标、地形资料与开发愿景，我们将规划勘察范围与团队。",
          "primaryLabel": "安排实地勘查",
          "primaryHref": "/contact",
          "secondaryLabel": "浏览地形案例",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "地形情报速递",
        "newsletterSubtitle": "掌握择地案例、购地天窗与长期养气秘诀。"
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
            "body": "We provide a structured cadence—briefing, implementation, checkpoints and review—so adjustments never feel ad hoc or mystical.",
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
        "badge": "风水布局",
        "title": "命运节律布局",
        "intro": "顺着二十四节气调整风水布局，让空间与气场四季同频而不被拖累。",
        "overviewHeading": "季度手册",
        "overviewSubtitle": "每一季的关键部署",
        "overviewTitle": "节气同步蓝图",
        "imageLabel": "节气策略图",
        "bullets": [
          "提供财富、健康、防护与关系方位的季节性调校计划。",
          "与家庭或团队行程整合，让仪式与调整自然落地。",
          "附上香氛、色彩、饮食与行动指南，让五行平衡有据可依。",
          "准备沟通手册，让成员理解每次调整的意义与注意事项。"
        ],
        "ideal": "适合全年保持动能、不想被季节拖慢的家庭与团队。",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "落实机制",
            "dividerSubtitle": "每季如何执行",
            "title": "节律守护系统",
            "imageLabel": "节律控制台",
            "body": "我们提供完整节奏：季前简报、落实清单、巡检到复盘，让调整不散乱。",
            "points": [
              "季前说明会，交代本季主题、仪式与衡量指标。",
              "执行清单涵盖摆设调整、物资采购与行为提醒。",
              "季中巡检与季末复盘，附行动日志与指标仪表板。"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "成果验证",
            "dividerSubtitle": "客户常见反馈",
            "title": "节奏・营收・复原力",
            "imageLabel": "季节成果",
            "body": "随着空间与节令同步，能量更稳、健康起伏更少、现金流更可预测。",
            "points": [
              "家庭健康与情绪波动下降，因为作息配合五行能量。",
              "配合节气推出的活动与项目，达成率明显高于往年。",
              "团队倦怠感下降，因定期内建复原仪式。"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "抢占季节先机",
          "dividerSubtitle": "季度顾问名额有限",
          "title": "订阅节律守护计划",
          "message": "告诉我们现有布局、年度目标与资源配置，我们将设计节气干预路线。",
          "primaryLabel": "启动季度守护",
          "primaryHref": "/contact",
          "secondaryLabel": "预览节气指南",
          "secondaryHref": "/resources/feng-shui"
        },
        "newsletterTitle": "节气情报",
        "newsletterSubtitle": "即时掌握节气提醒、仪式清单与防护预警。"
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
        "badge": "风水布局",
        "title": "飞星矩阵设计",
        "intro": "把飞星盘化成兼具奢华美感与精准能量表现的室内设计。",
        "overviewHeading": "设计情报",
        "overviewSubtitle": "美感与能量同步",
        "overviewTitle": "飞星室内攻略",
        "imageLabel": "室内能量矩阵",
        "bullets": [
          "逐宫提供布局、动线与机能分区建议。",
          "灯光、色彩与材质组合依年度、月度乃至日柱飞星调配。",
          "为设计师、承包商与软装团队准备含尺寸的执行文件。",
          "交付前复检（现场或远程），确保每项细节符合能量要求。"
        ],
        "ideal": "适合装修、新建与样板空间，在颜值与能量表现之间取得平衡。",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "协作流程",
            "dividerSubtitle": "如何与设计团队共创",
            "title": "共创式交付",
            "imageLabel": "设计协作流程",
            "body": "与建筑师、室内团队紧密协作，在不压制创意的前提下提供玄学护栏。",
            "points": [
              "启动工作坊，统一愿景、用户旅程与能量目标。",
              "按阶段审阅图面，将飞星图层叠加至设计方案。",
              "施工与陈设阶段提供现场或远程监造与微调。"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "成果反馈",
            "dividerSubtitle": "业主与设计师的观察",
            "title": "奖项・销售・舒适",
            "imageLabel": "设计成果",
            "body": "在矩阵护航下，作品兼具奖项质感、销售速度与生活舒适度。",
            "points": [
              "样板房与豪宅更快售出且溢价更高。",
              "居住者在专注、睡眠与灵感上明显受益。",
              "有完整能量说明，设计方案更易取得审批。"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "以天星精准设计",
          "dividerSubtitle": "每季限量概念名额",
          "title": "委托飞星矩阵设计",
          "message": "提供建筑资料、时程与品牌定位，我们将共创专属设计路线。",
          "primaryLabel": "开启设计简报",
          "primaryHref": "/contact",
          "secondaryLabel": "查看设计成果",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "矩阵设计笔记",
        "newsletterSubtitle": "飞星趋势、配色灵感与施工要点一次掌握。"
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
        "badge": "风水布局",
        "title": "能域汇聚场",
        "intro": "融合风水、奇门与数理，为旗舰住宅、总部或酒店打造不可复制的能量标识。",
        "overviewHeading": "标志氛围",
        "overviewSubtitle": "空间・时机・品牌一次到位",
        "overviewTitle": "汇聚总蓝图",
        "imageLabel": "标志能量图",
        "bullets": [
          "整合方位、阵法时序与数理品牌的整体规划。",
          "设计开幕、员工启动与 VIP 体验的日常仪式。",
          "全面检视动线、指示、香氛与数位触点，让能量持续汇聚。",
          "建立 KPI 仪表，让管理层以能量与商业双指标追踪。"
        ],
        "ideal": "适合酒店、旗舰门店、私密会所与董事会议中心，打造独有气场。",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "委案流程",
            "dividerSubtitle": "从概念到交接的全程陪伴",
            "title": "旗舰专案治理",
            "imageLabel": "委案流程",
            "body": "与品牌、建筑、HR 与营运团队并肩合作，让能量标识成为日常系统。",
            "points": [
              "解析品牌故事、嗅觉、听觉与动线，确保与天象 archetype 对齐。",
              "举办跨部门共创工作坊，测试仪式、导视与顾客旅程。",
              "编写培训手册与 SOP，让团队在开幕后也能维护能场。"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "成效验证",
            "dividerSubtitle": "业主持续追踪的指标",
            "title": "存在感・忠诚度・收益",
            "imageLabel": "标志成果",
            "body": "空间令人难忘、团队价值观更一致，商业指标也随之稳健。",
            "points": [
              "旗舰场所的停留时间、回访率与高价转化显著提升。",
              "仪式融入文化后，员工参与感与品牌遵循度持续走高。",
              "企业会客区在能场护持下，谈判与策略沟通更顺畅。"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "锚定专属能场",
          "dividerSubtitle": "量身定制采申请制",
          "title": "启动能域汇聚委案",
          "message": "说明物业愿景、嘉宾旅程与成功指标，我们将规划汇聚路线与关键参与者。",
          "primaryLabel": "提交委案简报",
          "primaryHref": "/contact",
          "secondaryLabel": "浏览标志案例",
          "secondaryHref": "/case-studies/feng-shui"
        },
        "newsletterTitle": "能场情报",
        "newsletterSubtitle": "掌握启动仪式、团队对齐与氛围维护的方法。"
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
        "badge": "磁场矩阵",
        "title": "易经能量矩阵",
        "intro": "让关键抉择化为可控突破，把易经卦象智慧植入你的战略仪表。",
        "overviewHeading": "卦象情报",
        "overviewSubtitle": "从启示到执行",
        "overviewTitle": "战略卦象手册",
        "imageLabel": "卦象仪表板",
        "bullets": [
          "解析本卦与互卦，转化为情境剧本与领导指令。",
          "依据动爻制定用人、合作与危机转向的行动方案。",
          "建立决策行事历，让重大选择踩在有利卦运上。",
          "附上仪式、沟通与责任分配表，确保执行到位。"
        ],
        "ideal": "适合推进多线计划的创办人、幕僚长与策略负责人。",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "分析方法",
            "dividerSubtitle": "如何确保精准",
            "title": "数据化卦象分析",
            "imageLabel": "卦象实验室",
            "body": "结合经典文献、现代数据与团队访谈，让矩阵既精准又可执行。",
            "points": [
              "多重占算确认主轴，再提出建议，避免偏误。",
              "与八字、紫微档案交叉验证，确保人事与时机同频。",
              "提供加密平台，存放逐字稿、图像与任务追踪表。"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "战略成果",
            "dividerSubtitle": "团队实际感受",
            "title": "清晰・信心・掌控",
            "imageLabel": "决策成果",
            "body": "导入后，决策更快定案、反复更少，团队情绪更稳。",
            "points": [
              "因为兼顾逻辑与能量，关键提案更容易取得审批。",
              "职位与用人决定更稳定，避免不合时宜的聘任。",
              "危机转向有预案，行动不再仓皇。"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "部署卦象矩阵",
          "dividerSubtitle": "策略顾问需先筛选排程",
          "title": "预约易经顾问会议",
          "message": "说明决策周期与团队配置，我们将规划卦象情报节奏。",
          "primaryLabel": "锁定顾问时段",
          "primaryHref": "/contact",
          "secondaryLabel": "下载矩阵概要",
          "secondaryHref": "/resources/magnetic-matrix"
        },
        "newsletterTitle": "卦象情报",
        "newsletterSubtitle": "第一时间掌握动爻提醒、决策仪式与领导提示。"
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
        "badge": "磁场矩阵",
        "title": "姓名命势代码",
        "intro": "融合数理、八字共振与语音磁场，打造放大命运的专属姓名。",
        "overviewHeading": "命名情报",
        "overviewSubtitle": "故事・音韵・命势的交汇",
        "overviewTitle": "命势命名攻略",
        "imageLabel": "姓名共振图",
        "bullets": [
          "检视现用姓名，找出能量流失、法律风险与发音阻力。",
          "提供具故事性、音韵分析与数理评分的精选名单。",
          "规划法律手续、启用仪式与对外沟通脚本。",
          "同步评估网址、社交帐号与品牌资产，避免落差。"
        ],
        "ideal": "适合新生儿、品牌换名、并购整合与需要即时共鸣的产品线。",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "命名方法论",
            "dividerSubtitle": "我们如何打造磁性名字",
            "title": "数据＋故事＋命运",
            "imageLabel": "命名实验室",
            "body": "结合语言科学、数理与命盘分析，让名字在法规、商业与能量层面都能通关。",
            "points": [
              "访谈利害关系人，厘清品牌 archetype、市场定位与情绪基调。",
              "针对主要语言与口音进行音声热力图，避开负面联想。",
              "与个人或企业命盘对齐，并配合时运给予启用建议。"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "成果体现",
            "dividerSubtitle": "客户上线后的感受",
            "title": "辨识・转化・忠诚",
            "imageLabel": "命名成果",
            "body": "透过命势代码锻造的名字，更容易被记住、被喜欢，也更能凝聚团队。",
            "points": [
              "品牌记忆度与点击率提升，因为名字好读又好记。",
              "团队认同感增强，因为名字贴近使命与命势。",
              "跨国与法律落地更顺畅，因事前排除冲突与不吉数。"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "写下你的专属名号",
          "dividerSubtitle": "命名委案采限量制度",
          "title": "启动命势命名计画",
          "message": "说明目标受众、用途与时程，我们将规划研究小组与交付排程。",
          "primaryLabel": "开始命名简报",
          "primaryHref": "/contact",
          "secondaryLabel": "查看命名成果",
          "secondaryHref": "/case-studies/magnetic-matrix"
        },
        "newsletterTitle": "命名情报站",
        "newsletterSubtitle": "掌握音韵趋势、数理精选与启用仪式脚本。"
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
        "badge": "磁场矩阵",
        "title": "灵数全息蓝图",
        "intro": "让数理、八字与紫微同频，揭示生命课题、因果亏欠与关系化学，并付诸行动。",
        "overviewHeading": "灵数情报",
        "overviewSubtitle": "从洞见到整合",
        "overviewTitle": "灵数蓝图组合",
        "imageLabel": "灵数指挥台",
        "bullets": [
          "完整解析命格数、灵魂数、成熟数等核心指标，并给出执行建议。",
          "建立伴侣、家人与关键团队角色的合拍矩阵。",
          "提供每日节奏与环境处方：颜色、方位与修复仪式。",
          "安排季度复盘，将个人目标与来临的数字周期对齐。"
        ],
        "ideal": "适合追求对齐又不牺牲野心的个人、伴侣与领导搭档。",
        "extraSections": [
          {
            "key": "method",
            "dividerTitle": "分析方法",
            "dividerSubtitle": "蓝图如何建构",
            "title": "多系统校准",
            "imageLabel": "蓝图实验室",
            "body": "把灵数、八字与紫微整合成一个仪表板，让你知道何时加速、暂停或重组。",
            "points": [
              "蒐集关键里程碑、关系与健康指标，辨识模式。",
              "跨比数字与星盘，确认助力与冲突的时间点。",
              "提供安全平台，存放可视化仪表、冥想与习惯追踪工具。"
            ]
          },
          {
            "key": "impact",
            "dividerTitle": "生活与事业成效",
            "dividerSubtitle": "客户的真实回馈",
            "title": "对齐・动能・安稳",
            "imageLabel": "蓝图成果",
            "body": "当节奏与使命同步后，客户行动更笃定，关系修复更快，身心状态更稳。",
            "points": [
              "依照个人天窗执行计划，目标达成速度提升。",
              "伙伴与团队在事前预判冲突与合拍期，合作更顺。",
              "透过明确的复原、创意与决策仪式，心智负担明显下降。"
            ]
          }
        ],
        "cta": {
          "dividerTitle": "解锁灵数蓝图",
          "dividerSubtitle": "顾问席次采申请制",
          "title": "预约灵数深度会谈",
          "message": "说明目前的转折与关系地图，我们将准备整合式灵数简报。",
          "primaryLabel": "预约蓝图会议",
          "primaryHref": "/contact",
          "secondaryLabel": "览阅灵数成果",
          "secondaryHref": "/case-studies/magnetic-matrix"
        },
        "newsletterTitle": "灵数情报",
        "newsletterSubtitle": "获取月度数字预测、关系提醒与仪式提示。"
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
