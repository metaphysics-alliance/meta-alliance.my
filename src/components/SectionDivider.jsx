// src/components/SectionDivider.jsx
export default function SectionDivider({ title, subtitle = '' }){
  const titleGlow = { textShadow: '0 0 6px rgba(255,215,128,0.85), 0 0 14px rgba(17,31,78,0.65), 0 0 2px rgba(0,0,0,0.55)' }
  const subtitleGlow = titleGlow
  const blueLineGlow = { boxShadow: '0 0 16px rgba(14,30,88,0.65)' }
  const goldLineGlow = { boxShadow: '0 0 18px rgba(246,212,125,0.7)' }
  const panelStyles = {
    background: 'linear-gradient(125deg, rgba(255,238,184,0.92) 0%, rgba(26,46,104,0.9) 100%)',
    boxShadow: '0 16px 36px rgba(10,18,56,0.55)',
    border: '1px solid rgba(240,198,102,0.6)',
    backdropFilter: 'blur(20px)'
  }
  return (
    <div className="container py-10 md:py-12">
      <div className="flex items-center gap-4">
        <span className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#11205a] to-transparent brightness-125" style={blueLineGlow} />
        <div className="text-center inline-block px-5 py-3 rounded-2xl" style={panelStyles}>
          <h3 className="text-xl md:text-2xl font-semibold tracking-wide text-[#0b122f]" style={titleGlow}>
            {title}
          </h3>
          {subtitle ? (
            <p className="text-xs md:text-sm mt-2 font-medium text-[#0b122f]" style={subtitleGlow}>
              {subtitle}
            </p>
          ) : null}
        </div>
        <span className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#f2d488] to-transparent" style={goldLineGlow} />
      </div>
    </div>
  )
}
