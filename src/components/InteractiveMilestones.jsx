import { useMemo, useState } from 'react'

export default function InteractiveMilestones({ title, subtitle, storyItems = [], milestoneItems = [], lang }){
  // Merge Story + Milestones; on hover we reveal the story/outcome
  const items = useMemo(() => {
    const len = Math.max(storyItems?.length || 0, milestoneItems?.length || 0)
    const merged = []
    for (let i=0;i<len;i++){
      const s = (storyItems || [])[i] || {}
      const m = (milestoneItems || [])[i] || {}
      const date = m.date || s.date
      if (!date) continue
      merged.push({ date, title: s.title || m.title, text: s.body || m.outcome || '' })
    }
    return merged
  }, [storyItems, milestoneItems])

  return (
    <section className="rounded-2xl border border-white/10 bg-black/25 p-0 overflow-hidden backdrop-blur-md min-h-[24rem]">
      <div className="flex flex-wrap items-end justify-between gap-3 px-4 py-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle ? <p className="text-xs text-white/70">{subtitle}</p> : null}
        </div>
      </div>
      <Timeline items={items} lang={lang} />
    </section>
  )
}

function Timeline({ items, lang }){
  if (!items || !items.length) return null
  // Pixel-based layout for wider spacing
  const y = 90
  const curve = 52
  const spacing = 360
  const margin = 180
  const positions = items.map((_, idx) => margin + idx * spacing)
  const totalWidth = positions.length ? margin + positions[positions.length - 1] : 600
  const [hover, setHover] = useState(null)
  const active = hover != null ? items[hover] : null
  const header = active ? (active.title ? (lang==='CN' ? `${active.date}｜${active.title}` : `${active.date} — ${active.title}`) : active.date) : ''

  return (
    <div className="relative flex min-h-[18rem] items-center justify-center overflow-x-auto">
      {hover != null ? (
        <div
          className="pointer-events-none absolute z-10 w-[480px] max-w-[94vw] rounded-lg border border-white/15 bg-black/85 p-5 text-white shadow-2xl"
          style={{ left: positions[hover], top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="text-[15px] font-semibold text-white/90">{header}</div>
          {active?.text ? <div className="mt-1.5 text-[14px] leading-snug text-white/85">{active.text}</div> : null}
        </div>
      ) : null}
      <svg
        viewBox={`0 0 ${Math.max(totalWidth, margin * 2)} 200`}
        className="h-[28rem] block"
        style={{ width: Math.max(totalWidth, margin * 2) }}
      >
        <defs>
          <marker id="arrow-gold" markerWidth="6" markerHeight="6" refX="5.2" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L6,3 L0,6 Z" fill="#d4af37" />
          </marker>
          <linearGradient id="grad-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff3b0" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#f3c969" />
          </linearGradient>
          <radialGradient id="dot-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff9d6" />
            <stop offset="60%" stopColor="#ffd86b" />
            <stop offset="100%" stopColor="#d4af37" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <line x1={margin} y1={y} x2={Math.max(totalWidth - margin, margin)} y2={y} stroke="url(#grad-line)" strokeWidth="3" filter="url(#glow)" />
        {positions.map((px, i) => {
          if (i === 0) return null
          const prev = positions[i-1]
          const dirUp = i % 2 === 1
          const c1x = prev + (px - prev) * 0.35
          const c2x = prev + (px - prev) * 0.65
          const c1y = y + (dirUp ? -curve : curve)
          const c2y = y + (dirUp ? -curve : curve)
          const d = `M ${prev} ${y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${px} ${y}`
          return (
            <path key={`curve-${i}`} d={d} fill="none" stroke="url(#grad-line)" strokeWidth="3" markerEnd="url(#arrow-gold)" opacity="0.98" filter="url(#glow)" />
          )
        })}
        {items.map((it, idx) => {
          const label = (it.title || it.date || '').slice(0, 22)
          return (
            <g key={idx} onMouseEnter={()=>setHover(idx)} onMouseLeave={()=>setHover(null)}>
              <circle cx={positions[idx]} cy={y} r={7.5} fill="url(#dot-grad)" stroke="#000" strokeWidth="1.2" filter="url(#glow)" />
              <text x={positions[idx]} y={y-30} textAnchor="middle" fontSize="18" fill="rgba(255,255,255,0.96)" style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.6)', strokeWidth: 0.35 }}>{it.date}</text>
              <text x={positions[idx]} y={y+36} textAnchor="middle" fontSize="16" fill="rgba(255,255,255,0.9)" style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.5)', strokeWidth: 0.3 }}>{label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function Dot({ cx, date, title, text, lang }){
  const [open, setOpen] = useState(false)
  const header = title ? (lang === 'CN' ? `${date}｜${title}` : `${date} — ${title}`) : date
  return (
    <g>
      <circle cx={cx} cy={10} r={4} fill="#d4af37" stroke="#000" strokeWidth="0.75" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} />
      <foreignObject x={cx-20} y={-1} width={40} height={14} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
        <div className="pointer-events-none select-none text-[9px] leading-3 text-white/70 text-center">{date}</div>
      </foreignObject>
      {open ? (
        <foreignObject x={Math.max(0,cx-150)} y={16} width={300} height={110}>
          <div className="pointer-events-none rounded-lg border border-white/15 bg-black/85 p-2.5 text-white shadow-xl">
            <div className="text-[11px] font-medium text-white/85">{header}</div>
            {text ? <div className="mt-1 text-[11px] leading-snug text-white/75">{text}</div> : null}
          </div>
        </foreignObject>
      ) : null}
    </g>
  )
}
