// src/components/VIPTiers.jsx
import { Link } from 'react-router-dom'
import SectionDivider from './SectionDivider.jsx'
import CTAButton from './CTAButton.jsx'
import { useI18n } from '../i18n.jsx'

function TierCard({ title, lines, href, cta }){
  return (
    <article className="card-3d p-6 md:p-7 rounded-xl flex flex-col">
      <h4 className="text-xl font-semibold text-gold mb-3">{title}</h4>
      <ul className="text-sm text-white/85 leading-relaxed space-y-1.5 flex-1">
        {lines.map((l, i) => <li key={i}>• {l}</li>)}
      </ul>
      <CTAButton to={href} size="md" className="mt-5">
        {cta}
      </CTAButton>
    </article>
  )
}

export default function VIPTiers(){
  const { t, lang } = useI18n()

  // Read all copy from i18n; keep fallbacks so UI never breaks
  const title   = t('vip.section_title') || (lang==='EN' ? 'VIP Holistic Destiny Analysis Service' : 'VIP 全息命理分析服务')
  const cta     = t('vip.cta')           || (lang==='EN' ? 'Learn More' : '了解更多')

  const tierLite    = t('vip.tiers.lite_title')    || (lang==='EN' ? 'Essential Destiny Blueprint' : '命运蓝图·启程版')
  const tierPro     = t('vip.tiers.pro_title')     || (lang==='EN' ? 'Advanced Destiny Blueprint' : '天机剖象·进阶版')
  const tierSupreme = t('vip.tiers.supreme_title') || (lang==='EN' ? 'Supreme Destiny Blueprint' : '乾坤至尊·全息版')

  const lite    = Array.isArray(t('vip.tiers.lite_points'))    ? t('vip.tiers.lite_points')    : (lang==='EN'
    ? [
      '100+ page personalised destiny blueprint',
      'Talent & potential analysis',
      'Career & industry alignment roadmap',
      'Wealth dynamics & management guidance',
      '10-year Luck Cycle insights',
      'Life numerology decoding',
      'Actionable adjustments to balance weaknesses',
    ]
    : [
      '100+ 页个人命运蓝图',
      '天赋潜能深度解析',
      '职业定位与行业适配建议',
      '财富模式诊断与优化',
      '十年大运节奏分析',
      '生命数字命理解析',
      '针对短板的实用调整方案',
    ])

  const pro     = Array.isArray(t('vip.tiers.pro_points'))     ? t('vip.tiers.pro_points')     : (lang==='EN'
    ? [
      '200+ page destiny mastery blueprint',
      'Complete career and industry resonance mapping',
      'Wealth structure diagnostics and risk alerts',
      '10-year Luck Phases with transition strategies',
      'Numerology overlays for behavioural refinement',
      'Energy field analysis across health, relationships and productivity',
      'Name vibration audit with optimisation guidance',
      'Timing-based action plan and practical remedies',
    ]
    : [
      '200+ 页命运深度蓝图',
      '事业领域与行业共振定位',
      '财富结构诊断与风险预警',
      '十年大运转折与策略建议',
      '生命数字交叉解析',
      '健康、人际、效率的能量场分析',
      '姓名能量共振评估与优化建议',
      '结合时机的行动与化解方案',
    ])

  const supreme = Array.isArray(t('vip.tiers.supreme_points')) ? t('vip.tiers.supreme_points') : (lang==='EN'
    ? [
      '300+ page full-holographic destiny command deck',
      'Integrated destiny, numerology, name energy and Feng Shui intelligence',
      'Wealth architecture with capital, legacy and stewardship strategies',
      '10-year & annual timing roadmap with activation protocols',
      'Energy field diagnostics with advanced balancing remedies',
      'Name resonance optimisation with strategic renaming paths',
      'Residential Feng Shui assessment and spatial harmonisation plan',
      'Custom action programme aligning timing, space and energy',
    ]
    : [
      '300+ 页命运全息蓝图',
      '命理、数字、姓名能量与住宅风水全整合',
      '财富结构与传承部署策略',
      '十年与流年节奏导航及启动力度',
      '个人能量场诊断与高阶平衡方案',
      '姓名能量优化与改名路径',
      '住宅风水评估与空间共振规划',
      '同步时间·空间·能量的专属行动计划',
    ])

  return (
    <section id="vip-tiers" className="py-12">
      <SectionDivider title={title} />
      <div className="container grid md:grid-cols-3 gap-6 mt-6">
        <TierCard title={tierLite}    lines={lite}    href="/vip-report/essential"    cta={cta} />
        <TierCard title={tierPro}     lines={pro}     href="/vip-report/pro"     cta={cta} />
        <TierCard title={tierSupreme} lines={supreme} href="/vip-report/supreme" cta={cta} />
      </div>
    </section>
  )
}
