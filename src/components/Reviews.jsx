// src/components/Reviews.jsx
import { useI18n } from '../i18n.jsx'
import SectionDivider from './SectionDivider.jsx'
import StarRating from './StarRating.jsx'

const REVIEWERS = [
  { name: 'Joshua Wu', area: 'Cheras', score: 4.9 },
  { name: 'Wei Ling', area: 'Petaling Jaya', score: 4.8 },
  { name: 'Steve Ma', area: 'Puchong', score: 5.0 },
  { name: 'Alicia Wong', area: 'Shah Alam', score: 4.7 },
  { name: 'Victor Thang', area: 'Subang Jaya', score: 4.9 },
  { name: 'Jin Yee', area: 'Kepong', score: 4.8 },
]

export default function Reviews(){
  const { lang, t } = useI18n()
  const title = lang === 'EN' ? "What Our Client's Says About Us" : '客户对我们的评价'

  // Always avoid tx; only use t('review_texts') if it's an array
  const raw = t('review_texts')
  const fallbackEN = [
    'After aligning my yearly rhythm and industry path, cash flow finally smoothed out. Feng Shui + timing is powerful!',
    'The report is detailed, and they even corrected my True Solar Time — timelines match what actually happened. Worth it!',
    'Office layout tweaks boosted the team state and deal speed. Highly recommended!',
  ]
  const fallbackCN = [
    '老师把我的流年节奏与行业路径对上号后，现金流真的顺起来了。风水+时运很强！',
    '报告很细，还帮我修正真太阳时，时间线与实际很吻合，值得！',
    '办公室布局调整后，团队状态与签单速度明显提升，推荐！',
  ]
  const texts = Array.isArray(raw) ? raw : (lang === 'EN' ? fallbackEN : fallbackCN)

  const getText = (i) => texts[i % texts.length]

  return (
    <section id="reviews" className="py-12">
      <SectionDivider title={title} />

      <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {REVIEWERS.map((r, i) => (
          <article key={i} className="card-3d p-5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold text-white/90">{r.name}</div>
              <div className="text-xs text-white/50">{r.area}</div>
            </div>
            <StarRating score={r.score} />
            <p className="text-white/80 text-sm leading-relaxed mt-3">
              {getText(i)}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
