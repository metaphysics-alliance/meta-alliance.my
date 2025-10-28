import type { Locale } from '@/lib/i18n'

type DefaultQA = { enQ: string; cnQ: string; enA: string; cnA: string }
type CustomQA = { question: string; answer: string }

const DEFAULT_ITEMS: DefaultQA[] = [
  {
    enQ: 'What is Bazi Astrology?',
    cnQ: '什么是八字命理？',
    enA: 'Bazi Astrology is a traditional Chinese astrology using birth date and time to analyze personal destiny.',
    cnA: '八字命理以出生年、月、日、时推演个人命局与路径。',
  },
  {
    enQ: 'What metaphysics services do you provide?',
    cnQ: '你们提供哪些服务？',
    enA: 'We offer consultation in BaZi, Zi Wei, Qi Men, Feng Shui layout and more.',
    cnA: '我们提供八字、紫微、奇门、风水布局等综合咨询。',
  },
  {
    enQ: 'How are the courses structured?',
    cnQ: '课程如何编排？',
    enA: 'Courses are structured into Entry, Intermediate, and Professional levels for learners at various stages.',
    cnA: '课程分为入门、进阶与专业认证，适合不同阶段学习者。',
  },
  {
    enQ: 'How do I book a consultation?',
    cnQ: '如何预约咨询？',
    enA: 'Book via our website contact page or calendar link; we’ll confirm by email.',
    cnA: '可通过官网联系页面或预约日历提交信息，我们会邮件确认。',
  },
  {
    enQ: 'What are your business hours?',
    cnQ: '营运时间？',
    enA: 'Our office hours are Monday to Friday, 10:00–18:00.',
    cnA: '周一至周五 10:00–18:00。',
  },
  {
    enQ: 'Do you support bilingual sessions?',
    cnQ: '是否支持双语？',
    enA: 'Yes — English and Chinese.',
    cnA: '支持中英文。',
  },
]

interface FAQProps {
  locale?: Locale
  items?: CustomQA[]
}

export default function FAQ({ locale = 'EN' as Locale, items }: FAQProps){
  const isEN = locale === 'EN'

  const resolved = items
    ? items
    : DEFAULT_ITEMS.map((item) => ({
        question: isEN ? item.enQ : item.cnQ,
        answer: isEN ? item.enA : item.cnA
      }))

  return (
    <section id="faq" className="container">
      <div className="grid gap-6 md:grid-cols-2">
        {resolved.map((item, i) => (
          <details
            key={i}
            className="rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5 backdrop-blur-xl open:bg-black/25"
          >
            <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
              <h4 className="font-semibold text-base md:text-lg text-white">
                {item.question}
              </h4>
              <span className="shrink-0 mt-0.5 rounded-md border border-white/15 px-2 text-xs text-white/70">
                {isEN ? 'Expand' : '展开'}
              </span>
            </summary>
            <div className="mt-3 text-sm text-white/80 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
