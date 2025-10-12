import type { Dictionary, Locale } from '@/lib/i18n'
import { pick } from '@/lib/i18n'

interface Testimonial {
  name: string
  role?: string
  quote: string
  score?: number
}

interface TestimonialsProps {
  dict?: Dictionary[Locale]
  path?: string
}

const fallbackTestimonials: Testimonial[] = [
  {
    name: 'Joshua Wu · Cheras',
    quote: 'After aligning yearly rhythm and industry path, cash flow stabilised. Feng Shui plus timing truly compounds outcomes.',
    score: 4.9,
  },
  {
    name: 'Wei Ling · Petaling Jaya',
    quote: 'The analysis corrected my True Solar Time and mirrored real life chapters. The depth and practicality is rare.',
    score: 4.8,
  },
  {
    name: 'Alicia Wong · Shah Alam',
    quote: 'Spatial adjustments and numeric calibrations lifted team morale and deal velocity within weeks.',
    score: 4.7,
  },
]

function derive(dict?: Dictionary[Locale], path?: string): Testimonial[]{
  if (!dict || !path) return []
  const value = pick(dict, path)
  if (!value) return []
  if (Array.isArray(value)){
    return value.map((entry) => {
      if (typeof entry === 'string') return { name: 'Client', quote: entry }
      if (entry && typeof entry === 'object'){
        const record = entry as Record<string, unknown>
        return {
          name: String(record.name ?? record.author ?? 'Client'),
          role: typeof record.role === 'string' ? record.role : undefined,
          quote: String(record.quote ?? record.text ?? record.body ?? ''),
          score: typeof record.score === 'number' ? record.score : undefined,
        }
      }
      return { name: 'Client', quote: String(entry) }
    }).filter((item) => item.quote)
  }
  if (typeof value === 'string'){
    return [{ name: 'Client', quote: value }]
  }
  return []
}

export default function Testimonials({ dict, path }: TestimonialsProps){
  const testimonials = (() => {
    const derived = derive(dict, path)
    if (derived.length) return derived
    return fallbackTestimonials
  })()

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold text-white">Trusted by strategic leaders</h2>
        <p className="text-sm text-white/60">A sampling of feedback from clients across Malaysia and the region.</p>
      </header>
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <article key={`${item.name}-${index}`} className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-soft-xl">
            <p className="text-sm leading-relaxed text-white/80">“{item.quote}”</p>
            <div className="mt-4 flex items-center justify-between text-xs text-white/55">
              <span>{item.name}</span>
              {typeof item.score === 'number' ? <span>{item.score.toFixed(1)} / 5</span> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
