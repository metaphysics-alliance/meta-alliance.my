// src/components/FAQ.jsx
import { useI18n } from '../i18n.jsx'

const DEFAULT_QA = [
  {
    enQ: 'What is Bazi Astrology?',
    cnQ: '什么是八字命理？',
    enA: 'Bazi Astrology is a traditional Chinese astrology using birth date and time to analyze personal destiny.',
    cnA: '八字命理是一种通过出生日期和时间分析个人命运的传统中国占星术。',
  },
  {
    enQ: 'What metaphysics services do you provide?',
    cnQ: '您提供哪些玄学服务？',
    enA: 'We offer expert consultation in Bazi, Zi Wei, Qimen, Feng Shui Layout, and more.',
    cnA: '我们提供八字、紫微斗数、奇门遁甲、风水布局等专业咨询服务。',
  },
  {
    enQ: 'How are the courses structured?',
    cnQ: '课程如何安排？',
    enA: 'Courses are structured into Entry, Intermediate, and Professional levels for learners at various stages.',
    cnA: '课程分为入门、中级和专业三级，适合不同学习阶段的学员。',
  },
  {
    enQ: 'How do I book a consultation?',
    cnQ: '如何预约咨询服务？',
    enA: 'You can book a consultation via our website booking system or the embedded Calendly widget by selecting a suitable time.',
    cnA: '您可以通过我们网站的预约系统或Calendly小部件选择合适的时间进行预约。',
  },
  {
    enQ: 'Can I cancel or reschedule my booking?',
    cnQ: '预约后可以取消或更改时间吗？',
    enA: 'Yes, please notify us at least 24 hours in advance via the website or customer service to change or cancel your appointment.',
    cnA: '是的，请至少提前24小时通过网站或联系我们客服更改或取消预约。',
  },
  {
    enQ: 'What payment methods are supported for bookings?',
    cnQ: '预约咨询服务支持哪些支付方式？',
    enA: 'We support multiple payment methods including Stripe, PayPal, FPX, TNG, and Bank QR payments.',
    cnA: '我们支持多种支付方式，包括Stripe、PayPal、FPX、TNG和银行二维码支付。',
  },
  {
    enQ: 'What are Metaphysics Alliance’s business hours?',
    cnQ: '玄域联盟的营业时间是？',
    enA: 'Our office hours are Monday to Friday, 9 AM to 6 PM.',
    cnA: '我们的办公时间是周一到周五，上午9点至下午6点。',
  },
  {
    enQ: 'Does the website support bilingual toggling?',
    cnQ: '网站是否支持双语切换？',
    enA: 'Yes, the website supports toggling between Chinese and English.',
    cnA: '是的，网站提供中文和英文双语切换功能。',
  },
  {
    enQ: 'How can I contact Metaphysics Alliance?',
    cnQ: '如何联系玄域联盟？',
    enA: 'You can reach us via the website contact form, WhatsApp, or phone.',
    cnA: '您可以通过网站的联系表单、WhatsApp或电话与我们取得联系。',
  },
]

export default function FAQ({ items }){
  const { lang } = useI18n()
  const isEN = lang === 'EN'

  const resolved = Array.isArray(items) && items.length
    ? items
    : DEFAULT_QA.map((item) => ({
        question: isEN ? item.enQ : item.cnQ,
        answer: isEN ? item.enA : item.cnA
      }))

  return (
    <section id="faq" className="container py-12">
      <div className="grid md:grid-cols-2 gap-6">
        {resolved.map((item, i) => (
          <details
            key={i}
            className="group card-3d p-4 md:p-5"
          >
            <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
              <h4 className="font-semibold text-base md:text-lg">
                {item.question}
              </h4>
              <span className="shrink-0 mt-0.5 rounded-md border border-white/15 px-2 text-xs text-white/70 group-open:bg-white/10">
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
