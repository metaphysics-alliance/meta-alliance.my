import type { ReactNode } from 'react'

import type { Dictionary, Locale } from '@/lib/i18n'
import { pick } from '@/lib/i18n'

interface ContentProps {
  title?: string
  dict?: Dictionary[Locale]
  path?: string
  highlight?: string
  paragraphs?: string[]
  footer?: ReactNode
}

const fallbackParagraphs = [
  'Metaphysics Alliance distils classical metaphysics into practical decision systems for modern leaders. Each engagement triangulates multiple lineages to ensure every insight is cross-validated before it informs a move.',
  'This page is a scaffold for the upcoming Next.js experience. Detailed copy, programmes, case studies, and conversion flows are being translated from the current Vite implementation.'
]

export default function Content({ title, dict, path, highlight, paragraphs, footer }: ContentProps){
  const resolved = (() => {
    if (dict && path){
      const value = pick(dict, path)
      if (Array.isArray(value)) return value.map(String)
      if (typeof value === 'string') return [value]
      if (value && typeof value === 'object'){
        const nodes = [] as string[]
        if (typeof value.title === 'string') nodes.push(value.title)
        if (typeof value.body === 'string') nodes.push(value.body)
        if (typeof value.long === 'string') nodes.push(value.long)
        return nodes.length ? nodes : undefined
      }
    }
    return undefined
  })()

  const copy = resolved ?? paragraphs ?? fallbackParagraphs

  return (
    <section className="grid gap-6 rounded-3xl border border-white/10 bg-black/20 p-6 md:grid-cols-[minmax(0,320px)_1fr] md:p-10">
      <div className="space-y-3">
        {title ? <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2> : null}
        {highlight ? <p className="text-base text-gold-soft/90">{highlight}</p> : null}
      </div>
      <div className="space-y-4 text-base leading-relaxed text-white/75">
        {copy.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {footer ? <div className="pt-4 text-sm text-white/60">{footer}</div> : null}
      </div>
    </section>
  )
}
