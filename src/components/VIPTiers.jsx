// src/components/VIPTiers.jsx
import SectionDivider from './SectionDivider.jsx'
import { useI18n } from '../i18n.jsx'

function TierCard({ title, lines, href, cta }){
  return (
    <article className="card-3d p-6 md:p-7 rounded-xl flex flex-col">
      <h4 className="text-xl font-semibold text-gold mb-3">{title}</h4>
      <ul className="text-sm text-white/85 leading-relaxed space-y-1.5 flex-1">
        {lines.map((l, i) => <li key={i}>• {l}</li>)}
      </ul>
      <a href={href} className="mt-5 inline-flex items-center justify-center rounded-lg border border-gold/40 text-gold px-4 py-2 hover:bg-gold/10">
        {cta}
      </a>
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
    ? ['100+ page destiny report','Talents & potentials, destined industries, earning models','10-year Luck Pillars (Da Yun) analysis','Life numbers (numerology) analysis','Practical remediation advice']
    : ['一百页以上命理报告','天赋潜能，命定行业，赚钱模式','十年大运分析','生命数字分析','改运建议'])

  const pro     = Array.isArray(t('vip.tiers.pro_points'))     ? t('vip.tiers.pro_points')     : (lang==='EN'
    ? ['200+ page destiny report','Talents & potentials, destined industries, earning models','10-year Luck Pillars (Da Yun) analysis','Life numbers (numerology) analysis','Practical remediation advice','Numeric field analysis','Name auspiciousness analysis']
    : ['二百页以上命理报告','天赋潜能，命定行业，赚钱模式','十年大运分析','生命数字分析','改运建议','数字磁场分析','姓名吉凶分析'])

  const supreme = Array.isArray(t('vip.tiers.supreme_points')) ? t('vip.tiers.supreme_points') : (lang==='EN'
    ? ['300+ page destiny report','Talents & potentials, destined industries, earning models','10-year Luck Pillars (Da Yun) analysis','Life numbers (numerology) analysis','Practical remediation advice','Numeric field analysis & change recommendations','Name auspiciousness analysis & change recommendations','Feng Shui evaluation (residential only)']
    : ['三百页以上命理报告','天赋潜能，命定行业，赚钱模式','十年大运分析','生命数字分析','改运建议','数字磁场分析与更换建议','姓名吉凶分析与更换建议','风水评估 (只限于居家评估)'])

  return (
    <section id="vip-tiers" className="py-12">
      <SectionDivider title={title} />
      <div className="container grid md:grid-cols-3 gap-6 mt-6">
        <TierCard title={tierLite}    lines={lite}    href="/vip-report/essential"    cta={cta} />
        <TierCard title={tierPro}     lines={pro}     href="/vip-report/advanced"     cta={cta} />
        <TierCard title={tierSupreme} lines={supreme} href="/vip-report/supreme" cta={cta} />
      </div>
    </section>
  )
}

