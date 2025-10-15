import type { ReactNode } from 'react'

interface HeroProps {
  title?: string
  sub?: string
  eyebrow?: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  className?: string
  fullBleed?: boolean
  bannerSrc?: string
  bannerOpacity?: number // 0..1, default 0.2 when bannerSrc provided
  fullHeight?: boolean // if true, min-h-screen
  minVh?: number // optional override for min-height in vh (e.g., 50)
  noPaddingY?: boolean // remove top/bottom padding for edge-to-edge banner
}

export default function Hero({ title, sub, eyebrow, description, actions, children, className, fullBleed, bannerSrc, bannerOpacity, fullHeight, minVh, noPaddingY }: HeroProps){
  const pad = noPaddingY ? 'px-8 md:px-12 py-0' : 'p-8 md:p-12'
  const base = `relative overflow-hidden ${pad}`
  const framed = 'rounded-3xl border border-white/10 shadow-soft-xl'
  const bleed = "w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] rounded-none border-0 shadow-none"
  const useFullHeight = Boolean((fullHeight || bannerSrc) && !minVh)
  const opacity = bannerSrc ? (typeof bannerOpacity === 'number' ? bannerOpacity : 0.2) : undefined
  const inlineStyle = typeof minVh === 'number' ? { minHeight: `${minVh}vh` } : undefined
  return (
    <section className={`${base} ${fullBleed ? bleed : framed} ${useFullHeight ? 'min-h-screen' : ''} ${className ?? ''}`} style={inlineStyle}>
      {bannerSrc ? (
        <>
          <img src={bannerSrc} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ opacity }} />
          <div className="absolute inset-0 bg-black/30" />
        </>
      ) : (
        <div className="absolute inset-0 bg-black/30" />
      )}
      <div className="relative z-10 space-y-4 text-center md:text-left flex flex-col justify-center">
        {eyebrow ? <span className="text-xs uppercase tracking-[0.3em] text-white/60">{eyebrow}</span> : null}
        {title ? <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-white">{title}</h1> : null}
        {sub ? <p className="text-lg text-white/70 md:max-w-2xl">{sub}</p> : null}
        {description ? <p className="text-base text-white/60 md:max-w-3xl">{description}</p> : null}
        {actions ? <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">{actions}</div> : null}
      </div>
      {children ? <div className="relative z-10 mt-6 md:mt-8">{children}</div> : null}
    </section>
  )
}
