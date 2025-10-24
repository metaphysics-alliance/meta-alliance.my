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
  overlayOpacity?: number // 0..1, optional dark overlay above banner image (default 0)
  titlePanel?: boolean // wrap title in gradient panel
}

export default function Hero({ title, sub, eyebrow, description, actions, children, className, fullBleed, bannerSrc, bannerOpacity, fullHeight, minVh, noPaddingY, overlayOpacity, titlePanel }: HeroProps){
  const pad = noPaddingY ? 'px-8 md:px-12 py-0' : 'p-8 md:p-12'
  const base = `relative overflow-hidden ${pad}`
  const framed = 'rounded-3xl border border-white/10 shadow-soft-xl'
  const bleed = "w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] rounded-none border-0 shadow-none"
  const useFullHeight = Boolean((fullHeight || bannerSrc) && !minVh)
  const opacity = bannerSrc ? (typeof bannerOpacity === 'number' ? bannerOpacity : 0.2) : undefined
  const inlineStyle = typeof minVh === 'number' ? { minHeight: `${minVh}vh` } : undefined
  const titlePanelStyles = {
    background: 'linear-gradient(125deg, rgba(255,238,184,0.92) 0%, rgba(26,46,104,0.9) 100%)',
    boxShadow: '0 16px 36px rgba(10,18,56,0.55)',
    border: '1px solid rgba(240,198,102,0.6)',
    backdropFilter: 'blur(24px)'
  } as const
  const renderTitle = () => {
    if (!title) return null
    const heading = <h1 className="title-gradient text-3xl md:text-5xl font-semibold leading-tight pb-[10px]">{title}</h1>
    if (!titlePanel) return heading
    return (
      <div className="inline-block rounded-2xl px-6 py-4" style={titlePanelStyles}>
        {heading}
      </div>
    )
  }
  return (
    <section className={`${base} ${fullBleed ? bleed : framed} ${useFullHeight ? 'min-h-screen' : ''} ${className ?? ''}`} style={inlineStyle}>
      {bannerSrc ? (
        <>
          <img src={bannerSrc} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ opacity }} />
          {typeof overlayOpacity === 'number' && overlayOpacity > 0 ? (
            <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
          ) : null}
        </>
      ) : null}
      <div className="relative z-10 space-y-4 text-center md:text-left flex flex-col justify-center">
        {eyebrow ? <span className="text-xs uppercase tracking-[0.3em] text-white/60">{eyebrow}</span> : null}
        {renderTitle()}
        {sub ? <p className="text-lg text-white/70 md:max-w-2xl">{sub}</p> : null}
        {description ? <p className="text-base text-white/60 md:max-w-3xl">{description}</p> : null}
        {actions ? <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">{actions}</div> : null}
      </div>
      {children ? <div className="relative z-10 mt-6 md:mt-8">{children}</div> : null}
    </section>
  )
}
