import type { Dictionary, Locale } from '@/lib/i18n'
import { pick } from '@/lib/i18n'

interface MediaItem {
  title: string
  description?: string
  href?: string
}

interface MediaGridProps {
  dict?: Dictionary[Locale]
  path?: string
  items?: MediaItem[]
}

const fallbackItems: MediaItem[] = [
  {
    title: 'Strategic Metaphysics',
    description: 'From BaZi and Zi Wei to Qi Men Dun Jia, engagements combine multiple systems to cross-validate every recommendation.'
  },
  {
    title: 'Spatial Mastery',
    description: 'Classical Feng Shui, San Yuan and Xuan Kong methodologies synchronised with contemporary architectural realities.'
  },
  {
    title: 'Numerical Intelligence',
    description: 'Name architecture, corporate numerology and magnetic matrices tuned to growth cycles and risk appetite.'
  }
]

function normalise(dictValue: unknown): MediaItem[]{
  if (!dictValue) return []
  if (Array.isArray(dictValue)){
    return dictValue.map((entry) => {
      if (typeof entry === 'string') return { title: entry }
      if (entry && typeof entry === 'object'){
        const { title, description, desc, href } = entry as Record<string, unknown>
        return {
          title: typeof title === 'string' ? title : typeof desc === 'string' ? desc : 'Untitled',
          description: typeof description === 'string' ? description : typeof desc === 'string' ? desc : undefined,
          href: typeof href === 'string' ? href : undefined,
        }
      }
      return { title: 'Untitled' }
    })
  }
  if (typeof dictValue === 'object'){
    const obj = dictValue as Record<string, unknown>
    return Object.entries(obj).map(([key, value]) => ({
      title: typeof value === 'string' ? value : key,
      description: typeof value === 'string' ? undefined : undefined,
    }))
  }
  if (typeof dictValue === 'string') return [{ title: dictValue }]
  return []
}

export default function MediaGrid({ dict, path, items }: MediaGridProps){
  const resolvedFromDict = dict && path ? normalise(pick(dict, path)) : []
  const data = items?.length ? items : (resolvedFromDict.length ? resolvedFromDict : fallbackItems)

  return (
    <section className="rounded-3xl border border-white/10 bg-black/15 p-6 md:p-10">
      <div className="grid gap-6 md:grid-cols-3">
        {data.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className="flex h-full flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white/95">{item.title}</h3>
              {item.description ? <p className="text-sm text-white/60">{item.description}</p> : null}
            </div>
            {item.href ? (
              <a
                href={item.href}
                className="text-sm font-medium text-gold-soft transition hover:text-gold"
              >
                Explore →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
