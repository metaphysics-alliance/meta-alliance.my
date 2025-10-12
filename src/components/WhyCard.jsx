// src/components/WhyCard.jsx
import { ShieldCheck, Sparkles, Compass, Clock, LineChart, Layers } from 'lucide-react'

import { useI18n } from '../i18n.jsx'

const IconMap = { ShieldCheck, Sparkles, Compass, Clock, LineChart, Layers }

/**
 * WhyCard - inner icon cards variant
 * - Uses i18n keys if present: why.title, why.subtitle, why.items[]
 * - Falls back to embedded EN/CN text if i18n not provided
 */
export default function WhyCard(){
  const { t, lang } = useI18n()

  // Safe getter to avoid crashes if key missing
  const safe = (key, fallback = null) => {
    try {
      const val = t(key)
      if (val === key || val == null) return fallback
      return val
    } catch {
      return fallback
    }
  }

  const title = safe('why.title', lang === 'CN' ? '为什么选择我们？' : 'Why Choose Us?')
  const subtitle = safe(
    'why.subtitle',
    lang === 'CN'
      ? '严谨且实战——以经典玄学打造可执行的策略。'
      : 'Rigorous and practical - classical metaphysics turned into execution.'
  )

  const defaultItems = [
    {
      icon: 'ShieldCheck',
      titleEN: 'Evidence-Driven Methods',
      titleCN: '证据驱动的方法',
      descEN: 'Classical lineages cross-checked with modern audit trails. No fluff-only reproducible logic.',
      descCN: '经典传承与现代审计交叉验证，杜绝空泛结论，确保可复现逻辑。',
    },
    {
      icon: 'Layers',
      titleEN: 'Multi-System Cross-Validation',
      titleCN: '多体系交叉验证',
      descEN: 'BaZi, Zi Wei, Qi Men, Numerology, and Feng Shui aligned for consistency before advising.',
      descCN: '八字、紫微、奇门、数术与风水多维校准，确保建议前后一致。',
    },
    {
      icon: 'LineChart',
      titleEN: 'Timing & Trend Windows',
      titleCN: '时序与趋势窗口',
      descEN: 'Clear phases to act, pause, and hedge-mapped to your practical calendar.',
      descCN: '明确行动、缓冲与对冲的节点，与实际日程精确对齐。',
    },
    {
      icon: 'Compass',
      titleEN: 'Actionable Strategy',
      titleCN: '可执行策略',
      descEN: 'From insight to steps: prioritized plays you can execute tomorrow morning.',
      descCN: '从洞察到行动清单——优先级分明的执行路径。',
    },
    {
      icon: 'Clock',
      titleEN: 'True Solar Time Discipline',
      titleCN: '真太阳时校准',
      descEN: 'Charts corrected by True Solar Time and the 24 Solar Terms for precision.',
      descCN: '以真太阳时与二十四节气校准，确保推算精度。',
    },
    {
      icon: 'Sparkles',
      titleEN: 'Life GPS',
      titleCN: '人生GPS',
      descEN: 'Life GPS moves beyond destiny charts, guiding the very next coordinate with clarity.',
      descCN: '人生GPS不仅是命盘，更是下一步坐标的清晰指引。',
    },
  ]

  const i18nItems = safe('why.items', null)
  const items = Array.isArray(i18nItems) && i18nItems.length ? i18nItems : defaultItems

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-semibold text-center">{title}</h3>
      <p className="mt-2 text-white/70 text-center max-w-2xl mx-auto">{subtitle}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const iconName = it.icon || 'Sparkles'
          const Ico = IconMap[iconName] || Sparkles
          const titleText = lang === 'CN' ? (it.titleCN || it.titleEN) : (it.titleEN || it.titleCN)
          const descText = lang === 'CN' ? (it.descCN || it.descEN) : (it.descEN || it.descCN)

          return (
            <article
              key={i}
              className="rounded-2xl p-5 bg-black/25 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-yellow-500/60 p-2">
                  <Ico size={22} className="text-yellow-400" />
                </div>
                <h4 className="text-lg font-semibold">{titleText}</h4>
              </div>
              <p className="mt-3 text-white/75 leading-relaxed">{descText}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
