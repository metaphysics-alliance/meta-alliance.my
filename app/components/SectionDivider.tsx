import type { CSSProperties } from 'react'

interface SectionDividerProps {
  title: string
  subtitle?: string
}

export default function SectionDivider({ title, subtitle = '' }: SectionDividerProps){
  const titleGlow: CSSProperties = {
    textShadow: '0 0 6px rgba(255,215,128,0.85), 0 0 14px rgba(17,31,78,0.65), 0 0 2px rgba(0,0,0,0.55)'
  }
  const subtitleGlow: CSSProperties = {
    textShadow: '0 0 8px rgba(17,31,78,0.5)'
  }
  const blueLineGlow: CSSProperties = {
    boxShadow: '0 0 16px rgba(14,30,88,0.65)'
  }
  const goldLineGlow: CSSProperties = {
    boxShadow: '0 0 18px rgba(246,212,125,0.7)'
  }
  const panelStyles: CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(8,12,28,0.75))',
    boxShadow: '0 14px 32px rgba(3,6,20,0.48)',
    border: '1px solid rgba(212,175,55,0.35)',
    backdropFilter: 'blur(20px)'
  }
  return (
    <div className="py-8 md:py-10">
      <div className="flex items-center gap-4">
        <span className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#11205a] to-transparent brightness-125" style={blueLineGlow} />
        <div className="text-center inline-block px-5 py-3 rounded-2xl" style={panelStyles}>
          <h3 className="text-xl md:text-2xl font-semibold tracking-wide text-[#0b122f]" style={titleGlow}>
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-2 text-xs md:text-sm text-[#1d2f6f] font-medium" style={subtitleGlow}>
              {subtitle}
            </p>
          ) : null}
        </div>
        <span className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#f2d488] to-transparent" style={goldLineGlow} />
      </div>
    </div>
  )
}
