import type { Locale } from './locales.ts';

type SidebarItemCopy = {
  title: string;
  description: string;
  cta: string;
};

type MetricCardCopy = {
  label: string;
  value: string;
  delta: string;
};

type PipelineStageCopy = {
  stage: string;
  title: string;
  desc: string;
};

type ActivityRowCopy = {
  client: string;
  action: string;
  status: string;
};

type FormSectionCopy = {
  id: string;
  step: string;
  title: string;
  description: string;
  helper: string;
};

type FormInsightCopy = {
  progressTitle: string;
  progressSubtitle: string;
  progressStatus: string;
  summaryTitle: string;
  summaryItems: { label: string; value: string }[];
  supportTitle: string;
  supportBody: string;
  supportCta: string;
  tongShuLoading: string;
  tongShuError: string;
  // TongShu Card Labels
  officerLabel: string;
  pillarLabel: string;
  starLabel: string;
  todayLabel: string;
  moodFallback: string;
};

type LayoutCopy = {
  brand: string;
  tagline: string;
  workspaceLabel: string;
  navOverview: string;
  navForm: string;
  searchPlaceholder: string;
  inviteAnalyst: string;
  switchOrg: string;
  billing: string;
  support: string;
  defaultSubtitle: string;
  pageEyebrow: string;
  actionCenter: string;
  footerTagline: string;
};

type LandingCopy = {
  pageTitle: string;
  sidebar: {
    identity: SidebarItemCopy;
    geo: SidebarItemCopy;
    diagnostics: SidebarItemCopy;
  };
  metrics: MetricCardCopy[];
  pipelineTitle: string;
  pipelines: PipelineStageCopy[];
  activityTitle: string;
  activityColumns: [string, string, string];
  activityRows: ActivityRowCopy[];
  heroEyebrow: string;
  heroTitle: string;
  heroParagraph: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
};

type FormPageCopy = {
  title: string;
  subtitle: string;
  heroLead: string;
  sections: FormSectionCopy[];
  insights: FormInsightCopy;
};

type GlobalCopy = {
  layout: LayoutCopy;
  landing: LandingCopy;
  formPage: FormPageCopy;
};

export const GLOBAL_I18N: Record<Locale, GlobalCopy> = {
  EN: {
    layout: {
      brand: 'Metaphysics Alliance',
      tagline: 'Create Destiny',
      workspaceLabel: 'Workspace',
      navOverview: 'Overview',
      navForm: 'Create Form',
      searchPlaceholder: 'Search clients, reports, diagnostics.',
      inviteAnalyst: 'Invite Analyst',
      switchOrg: 'Switch Org',
      billing: 'Billing',
      support: 'Support',
      defaultSubtitle: 'Meta Alliance · Client Intelligence Workspace',
      pageEyebrow: '',
      actionCenter: 'Action Center',
      footerTagline: 'GPT-5 Assisted Client Destiny Platform'
    },
    landing: {
      pageTitle: 'Create Client Destiny Form',
      sidebar: {
        identity: {
          title: 'Identity Intake',
          description: 'Name, gender, birth date-time with bilingual hints.',
          cta: 'Open Form'
        },
        geo: {
          title: 'Geospatial Controls',
          description: 'Country, region, timezone, and lat/lon presets.',
          cta: 'Dataset'
        },
        diagnostics: {
          title: 'Diagnostics & Results',
          description: 'Clipboard tests, markdown export, and GPT summary hooks.',
          cta: 'Run Tests'
        }
      },
      metrics: [
        { label: 'Active Destinies', value: '1,248', delta: '+12% vs last week' },
        { label: 'AI Summaries', value: '862', delta: '98% success' },
        { label: 'Pending Diagnoses', value: '37', delta: '5 require review' },
        { label: 'Exports', value: '412', delta: 'Markdown & PDF' }
      ],
      pipelineTitle: 'Pipeline Overview',
      pipelines: [
        { stage: '01', title: 'Identity Capture', desc: 'Name, gender, birth data validated.' },
        { stage: '02', title: 'Geo Context', desc: 'Country + timezone resolved via dataset.' },
        { stage: '03', title: 'TST Computation', desc: 'Solar offsets calculated instantly.' },
        { stage: '04', title: 'GPT Insights', desc: 'Agent drafts multi-lingual guidance.' }
      ],
      activityTitle: 'Recent Activity',
      activityColumns: ['Client', 'Action', 'Status'],
      activityRows: [
        { client: 'Lynnette Pang', action: 'Generated bilingual briefing', status: 'Completed' },
        { client: 'Marcus Leong', action: 'Awaiting ID verification', status: 'Action needed' },
        { client: 'Cheng Wei', action: 'Diagnostics flagged timezone mismatch', status: 'Review' }
      ],
      heroEyebrow: 'Experience Flow',
      heroTitle: 'Deliver a Stripe-grade workflow',
      heroParagraph: 'Guide analysts from intake to GPT output with predictable milestones.',
      heroPrimaryCta: 'Launch Form',
      heroSecondaryCta: 'Phase 1 Plan'
    },
    formPage: {
      title: 'Create Destiny Profile',
      subtitle: '1st Step of Unlocking All Potentials',
      heroLead: 'Complete this dossier so Master can unlock your full strategy immediately after login.',
      sections: [
        {
          id: 'identity',
          step: '01',
          title: 'Core Identity',
          description: 'Capture client fundamentals, contact details, and verification signals before diagnostics.',
          helper: 'Required for Master to align natal charts and satisfy compliance.'
        },
        {
          id: 'astronomy',
          step: '02',
          title: 'Astronomical Context',
          description: 'Log country, region, timezone, and solar offsets to power Technical Time Conversion.',
          helper: 'Feeds the True Solar Time + geospatial calculators.'
        },
        {
          id: 'destiny',
          step: '03',
          title: 'Destiny Data Intake',
          description: 'Upload arrays, ritual parameters, and dataset hooks for BaZi / Zi Wei / Qi Men flows.',
          helper: 'Supplies Master, Chart, and analytics agents after submission.'
        }
      ],
      insights: {
        progressTitle: 'Profile completion',
        progressSubtitle: 'Autosave is on. Finish every section to unlock Master’s guidance payload.',
        progressStatus: 'Next milestone: Technical Time Conversion.',
        summaryTitle: 'Today’s TongShu Pulse',
        summaryItems: [
          { label: '12 Day Officer', value: 'Harvest · Ji (吉)' },
          { label: 'Gan-Zhi', value: 'Wood Monkey 甲申' },
          { label: 'Focus', value: 'Strategic onboarding, soft launches' },
          { label: 'Avoid', value: 'Signing binding contracts at 12:00' }
        ],
        supportTitle: 'Need help?',
        supportBody: 'Visit Support to chat with Workflow or open a Supabase ticket anytime.',
        supportCta: 'Visit Support',
        tongShuLoading: 'Refreshing TongShu…',
        tongShuError: 'Realtime data unavailable',
        officerLabel: '12 Day Officer',
        pillarLabel: 'Monthly Pillar',
        starLabel: 'Flying Star',
        todayLabel: 'Today — TongShu cycle',
        moodFallback: 'Refreshing'
      }
    }
  },
  CN: {
    layout: {
      brand: '玄域联盟',
      tagline: '创造命运',
      workspaceLabel: '工作区',
      navOverview: '总览',
      navForm: '创建表单',
      searchPlaceholder: '搜索客户、报告或诊断。',
      inviteAnalyst: '邀请分析师',
      switchOrg: '切换组织',
      billing: '账单',
      support: '支持',
      defaultSubtitle: '玄学联盟 · 客户智能工作台',
      pageEyebrow: '',
      actionCenter: '行动中心',
      footerTagline: 'GPT-5 辅助的命盘平台'
    },
    landing: {
      pageTitle: '创建客户命盘表单',
      sidebar: {
        identity: {
          title: '身份采集',
          description: '姓名、性别、出生信息支持双语提示。',
          cta: '打开表单'
        },
        geo: {
          title: '地理控制',
          description: '国家、地区、时区以及经纬度预设。',
          cta: '数据集'
        },
        diagnostics: {
          title: '诊断与结果',
          description: '剪贴板检测、Markdown 导出与 GPT 摘要。',
          cta: '执行检测'
        }
      },
      metrics: [
        { label: '激活命盘', value: '1,248', delta: '较上周 +12%' },
        { label: 'AI 摘要', value: '862', delta: '成功率 98%' },
        { label: '待处理诊断', value: '37', delta: '5 条待复核' },
        { label: '导出文件', value: '412', delta: 'Markdown & PDF' }
      ],
      pipelineTitle: '流程总览',
      pipelines: [
        { stage: '01', title: '身份录入', desc: '校验姓名、性别与出生数据。' },
        { stage: '02', title: '地理脉络', desc: '通过数据集解析国家与时区。' },
        { stage: '03', title: '真太阳时计算', desc: '即时完成太阳偏差计算。' },
        { stage: '04', title: 'GPT 洞察', desc: '智能生成双语指导摘要。' }
      ],
      activityTitle: '最新动态',
      activityColumns: ['客户', '动作', '状态'],
      activityRows: [
        { client: '梁雪怡', action: '已生成双语简报', status: '已完成' },
        { client: '马可仕', action: '等待证件验证', status: '需处理' },
        { client: '程玮', action: '诊断提醒时区不符', status: '待复核' }
      ],
      heroEyebrow: '体验流程',
      heroTitle: '构建 Stripe 级别的操作体验',
      heroParagraph: '让分析师从录入到 GPT 输出都遵循同一步调，少走弯路。',
      heroPrimaryCta: '进入表单',
      heroSecondaryCta: 'Phase 1 计划'
    },
    formPage: {
      title: '创建命运档案',
      subtitle: '解锁全潜力的第一步',
      heroLead: '完成此命运档案，Master 即可在登入后立即输出全局策略。',
      sections: [
        {
          id: 'identity',
          step: '01',
          title: '核心身份',
          description: '优先录入姓名、联系方式与身份验证字段。',
          helper: 'Master 需要这些数据对齐本命盘并满足合规要求。'
        },
        {
          id: 'astronomy',
          step: '02',
          title: '天体换算',
          description: '填写国家、区域、时区与真太阳时偏移，驱动技术换算。',
          helper: '供给 True Solar Time / 技术时辰换算引擎。'
        },
        {
          id: 'destiny',
          step: '03',
          title: '命理数据采集',
          description: '上传数组、仪式参数以及 BaZi / Zi Wei / Qi Men 输入。',
          helper: '让 Master、Chart 与分析模块在提交后立即取用。'
        }
      ],
      insights: {
        progressTitle: '档案完成度',
        progressSubtitle: '每个字段都会自动保存，完成全部区块即可解锁 Master 指令集。',
        progressStatus: '下一阶段：技术时辰换算。',
        summaryTitle: '今日通书脉搏',
        summaryItems: [
          { label: '12 Day Officer', value: '收成 · 吉' },
          { label: 'Gan-Zhi', value: '木猴 甲申' },
          { label: '宜', value: '战略性客户导入、柔性上线' },
          { label: '忌', value: '正午 12:00 签约具约束性的合同' }
        ],
        supportTitle: '需要协助？',
        supportBody: '可前往 Support，与 Workflow 沟通或提交 Supabase 工单。',
        supportCta: '前往 Support',
        tongShuLoading: '正在刷新通书数据…',
        tongShuError: '实时数据暂不可用',
        officerLabel: '十二值日官',
        pillarLabel: '当月月柱',
        starLabel: '当日飞星',
        todayLabel: '今日 — 通书节奏',
        moodFallback: '自动更新中'
      }
    }
  }
} as const;
