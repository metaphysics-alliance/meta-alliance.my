// src/components/WhyCard.jsx
import { useI18n } from '../i18n.jsx';
import { ShieldCheck, Sparkles, Compass, Clock, LineChart, Layers } from 'lucide-react';

const IconMap = { ShieldCheck, Sparkles, Compass, Clock, LineChart, Layers };

/**
 * WhyCard — inner icon cards variant
 * - Uses i18n keys if present: why.title, why.subtitle, why.items[]
 * - Falls back to embedded EN/CN text if i18n not provided
 */
export default function WhyCard() {
  const { t, lang } = useI18n ? useI18n() : { t: (k)=>k, lang: 'EN' };

  // Safe getter to avoid crashes if key missing
  const safe = (key, fallback = null) => {
    try {
      const val = t(key);
      if (val === key || val == null) return fallback;
      return val;
    } catch {
      return fallback;
    }
  };

  const title = safe('why.title', lang === 'CN' ? '为什么选择我们？' : 'Why Choose Us?');
  const subtitle = safe(
    'why.subtitle',
    lang === 'CN'
      ? '以严谨与实用为核心，把传统玄学转化为可执行方案。'
      : 'Rigorous and practical — classical metaphysics turned into execution.'
  );

  const defaultItems = [
    {
      icon: 'ShieldCheck',
      titleEN: 'Evidence-Driven Methods',
      titleCN: '证据导向的方法',
      descEN: 'Classical lineages cross-checked with modern audit trails. No fluff—only reproducible logic.',
      descCN: '以经典传承为本，辅以现代验证路径；去伪存真，可复现的推演逻辑。',
    },
    {
      icon: 'Layers',
      titleEN: 'Multi-System Cross-Validation',
      titleCN: '多术数交叉验证',
      descEN: 'BaZi, Zi Wei, Qi Men, Numerology, and Feng Shui aligned for consistency before advising.',
      descCN: '八字、紫微、奇门、数字、风水多体系对齐，一致后才落地建议。',
    },
    {
      icon: 'LineChart',
      titleEN: 'Timing & Trend Windows',
      titleCN: '时机与趋势窗口',
      descEN: 'Clear phases to act, pause, and hedge—mapped to your practical calendar.',
      descCN: '行动/观望/对冲的清晰阶段，与您的实际日程精准衔接。',
    },
    {
      icon: 'Compass',
      titleEN: 'Actionable Strategy',
      titleCN: '可执行战略',
      descEN: 'From insight to steps: prioritized plays you can execute tomorrow morning.',
      descCN: '从洞见到步骤：明早即可执行的优先级清单。',
    },
    {
      icon: 'Clock',
      titleEN: 'True Solar Time Discipline',
      titleCN: '真太阳时严谨校正',
      descEN: 'Charts corrected by True Solar Time and the 24 Solar Terms for precision.',
      descCN: '以真太阳时与二十四节气校正盘局，确保高精度。',
    },
    {
      icon: 'Sparkles',
      titleEN: 'Life GPS',
      titleCN: '人生GPS',
      descEN: 'Life GPS is more than a chart of destiny; it becomes your personal Life GPS—instantly highlighting the next coordinate on your journey. At every turning point, it offers clarity and assurance, guiding you forward with confidence and purpose.',
      descCN: '人生GPS，如同点亮夜空的坐标系。它不仅是一张命运的图表，更是随时为你指引方向的人生GPS——在关键时刻，精准标注你下一步的坐标，让你带着清晰与笃定前行。',
    },
  ];

  // Optional i18n override for items (array of objects), else fall back
  const i18nItems = safe('why.items', null);
  const items = Array.isArray(i18nItems) && i18nItems.length ? i18nItems : defaultItems;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-semibold text-center">{title}</h3>
      <p className="mt-2 text-white/70 text-center max-w-2xl mx-auto">{subtitle}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const iconName = it.icon || 'Sparkles';
          const Ico = IconMap[iconName] || Sparkles;
          const titleText = lang === 'CN' ? (it.titleCN || it.titleEN) : (it.titleEN || it.titleCN);
          const descText = lang === 'CN' ? (it.descCN || it.descEN) : (it.descEN || it.descCN);
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
          );
        })}
      </div>
    </div>
  );
}

