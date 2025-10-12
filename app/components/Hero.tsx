import type { ReactNode } from 'react'

interface HeroProps {
  title?: string
  sub?: string
  eyebrow?: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}

export default function Hero({ title, sub, eyebrow, description, actions, children }: HeroProps){
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-8 md:p-12 shadow-soft-xl">
      <div className="space-y-4 text-center md:text-left">
        {eyebrow ? <span className="text-xs uppercase tracking-[0.3em] text-white/60">{eyebrow}</span> : null}
        {title ? <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-white">{title}</h1> : null}
        {sub ? <p className="text-lg text-white/70 md:max-w-2xl">{sub}</p> : null}
        {description ? <p className="text-base text-white/60 md:max-w-3xl">{description}</p> : null}
        {actions ? <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">{actions}</div> : null}
      </div>
      {children ? <div className="mt-6 md:mt-8">{children}</div> : null}
    </section>
  )
}
