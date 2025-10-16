import { useMemo, useState, useRef, useEffect } from 'react'
import { FiFlag, FiCompass, FiClock, FiLayers, FiVideo, FiUsers, FiGlobe, FiCheckCircle } from 'react-icons/fi'

export default function InteractiveMilestonesSerpentine({ title, subtitle, storyItems = [], milestoneItems = [], lang }){
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
    <section className="rounded-2xl border border-white/10 bg-black/25 p-0 overflow-hidden backdrop-blur-md min-h-[26rem]">
      <div className="flex flex-wrap items-end justify-between gap-3 px-4 py-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle ? <p className="text-xs text-white/70">{subtitle}</p> : null}
        </div>
      </div>
      <SerpentineTimeline items={items} lang={lang} />
    </section>
  )
}

function MobileModal({ header, body, onClose }){
  const touchStart = useRef(null)
  const touchDelta = useRef(0)
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientY; touchDelta.current = 0 }}
      onTouchMove={(e) => { if (touchStart.current!=null){ touchDelta.current = e.touches[0].clientY - touchStart.current } }}
      onTouchEnd={() => { if (touchDelta.current > 48) onClose() }}
    >
      <div className="w-full max-w-[92vw] rounded-xl border border-white/15 bg-black/90 p-4 text-white shadow-2xl" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div className="text-base font-semibold">{header}</div>
          <button className="rounded-md bg-white/10 px-2 py-1 text-sm text-white hover:bg-white/20" onClick={onClose}>×</button>
        </div>
        <div className="mt-2 max-h-[70vh] overflow-auto text-[14px] leading-relaxed text-white/85">{body}</div>
      </div>
    </div>
  )
}

function SerpentineTimeline({ items, lang }){
  if (!items || !items.length) return null
  const containerRef = useRef(null)
  const [width, setWidth] = useState(1200)

  useEffect(() => {
    const onResize = () => {
      const w = (containerRef.current?.clientWidth) || window.innerWidth
      setWidth(Math.max(640, w))
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const { margin, rowHeight, minGap, baseY, curve } = useMemo(() => {
    if (width >= 1600) return { margin: 200, rowHeight: 220, minGap: 400, baseY: 120, curve: 64 }
    if (width >= 1280) return { margin: 180, rowHeight: 200, minGap: 360, baseY: 110, curve: 58 }
    if (width >= 1024) return { margin: 160, rowHeight: 180, minGap: 320, baseY: 100, curve: 52 }
    if (width >= 768)  return { margin: 140, rowHeight: 160, minGap: 280, baseY: 96,  curve: 48 }
    return { margin: 120, rowHeight: 140, minGap: 240, baseY: 90,  curve: 44 }
  }, [width])

  const columns = useMemo(() => {
    const usable = Math.max(1, width - margin * 2)
    const cols = Math.floor(usable / minGap) + 1
    return Math.max(2, Math.min(items.length, cols))
  }, [width, margin, minGap, items.length])

  const rows = Math.ceil(items.length / columns)
  const pos = items.map((_, i) => {
    const r = Math.floor(i / columns)
    const c = i % columns
    const dirLR = r % 2 === 0
    const effectiveC = dirLR ? c : (columns - 1 - c)
    const gapX = columns > 1 ? (width - margin * 2) / (columns - 1) : 0
    const x = margin + effectiveC * gapX
    const y = baseY + r * rowHeight
    return { x, y, r, dirLR }
  })

  const totalWidth = width
  const totalHeight = baseY + (rows - 1) * rowHeight + 140

  const [hover, setHover] = useState(null)
  const [selected, setSelected] = useState(null)
  const pushedRef = useRef(false)
  useEffect(() => {
    const onPop = () => { setSelected(null); pushedRef.current = false }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const active = hover != null ? items[hover] : null

  const sizes = useMemo(() => {
    if (width >= 1600) return { date: 22, title: 20, dot: 9 }
    if (width >= 1280) return { date: 20, title: 18, dot: 8.5 }
    if (width >= 1024) return { date: 18, title: 16, dot: 7.5 }
    if (width >= 768)  return { date: 16, title: 14, dot: 7 }
    return { date: 14, title: 12, dot: 6.5 }
  }, [width])

  return (
    <div ref={containerRef} className="relative flex min-h-[18rem] items-center justify-center overflow-x-auto">
      {width >= 768 && hover != null ? (
        <div
          className={"pointer-events-none absolute z-30 max-w-[96vw] rounded-lg border border-white/15 bg-black/85 text-white shadow-2xl " + (width<480? 'p-3':'p-5')}
          style={{
            width: Math.min(width - margin*2 - 40, width<480? 300 : width<768? 380 : 520),
            left: Math.min(Math.max(pos[hover].x, margin + 160), width - margin - 160),
            top: Math.min(Math.max(pos[hover].y, 72), totalHeight - 72),
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="text-[15px] font-semibold text-white/90">{active?.date}</div>
          <div className="text-[14px] font-medium text-white/80 mt-1">{active?.title}</div>
          {active?.text ? (
            <div
              className="mt-2 text-white/85"
              style={{
                fontSize: width < 480 ? 13 : 14,
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: width < 480 ? 3 : 5,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {active.text}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Mobile modal */}
      {width < 768 && selected != null ? (
        <MobileModal
          header={items[selected] ? (
            <div className="text-center">
              <div className="text-base font-semibold">{items[selected].date}</div>
              <div className="text-sm font-medium text-white/80">{items[selected].title}</div>
            </div>
          ) : null}
          body={items[selected]?.text}
          onClose={() => { if (pushedRef.current){ history.back() } else { setSelected(null) } }}
        />
      ) : null}
      <svg viewBox={`0 0 ${totalWidth} ${totalHeight}`} className="w-full block relative z-20 pointer-events-none" style={{ height: width<480? '22rem' : width<768? '24rem' : '32rem' }}>
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
        {new Array(rows).fill(0).map((_, r) => (
          <line key={`row-${r}`} x1={margin} y1={baseY + r * rowHeight} x2={width - margin} y2={baseY + r * rowHeight} stroke="url(#grad-line)" strokeWidth="3.25" filter="url(#glow)" />
        ))}
        {pos.map((p, i) => {
          if (i === 0) return null
          const prev = pos[i-1]
          const sameRow = prev.r === p.r
          const c1x = sameRow ? (prev.x + (p.x - prev.x) * 0.35) : prev.x
          const c2x = sameRow ? (prev.x + (p.x - prev.x) * 0.65) : p.x
          const c1y = sameRow ? prev.y + (prev.dirLR ? -curve : curve) : prev.y + curve
          const c2y = sameRow ? p.y + (prev.dirLR ? -curve : curve) : p.y - curve
          const d = `M ${prev.x} ${prev.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p.x} ${p.y}`
          return <path key={`seg-${i}`} d={d} fill="none" stroke="url(#grad-line)" strokeWidth="3.25" markerEnd="url(#arrow-gold)" opacity="0.98" filter="url(#glow)" />
        })}
        {items.map((it, idx) => {
          const p = pos[idx]
          // Increase clearances to fully avoid overlap across DPIs and glow
          const iconSize = Math.max(18, sizes.dot * 5.5)
          const buttonPad = 10 // adjusted for p-0.5 + ring + blur
          const padTop = width < 640 ? 40 : 42
          const dateDescent = sizes.date * 0.35
          const dateY = p.y - (iconSize / 2 + buttonPad + padTop) - dateDescent
          return (
            <g key={`lbl-${idx}`}>
              <text x={p.x} y={dateY} textAnchor="middle" fontSize={sizes.date} fill="rgba(255,255,255,0.97)" style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.6)', strokeWidth: 0.35 }}>{it.date}</text>
            </g>
          )
        })}
      </svg>
      {/* React Icons overlay (behind SVG labels) */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {items.map((it, idx) => {
          const p = pos[idx]
          const Icon = (() => {
            const t = (it.title || '').toLowerCase()
            if (/foundation|创立|愿景/.test(t)) return FiFlag
            if (/core|框架|framework/.test(t)) return FiLayers
            if (/team|团队/.test(t)) return FiUsers
            if (/digital|平台|infrastructure|数位/.test(t)) return FiGlobe
            if (/refine|优化|recognition|认可/.test(t)) return FiCompass
            if (/video|workshop|报告|report/.test(t)) return FiVideo
            if (/time|时序|quarter|季度/.test(t)) return FiClock
            if (/expand|扩展|legacy|传承/.test(t)) return FiCheckCircle
            const set = [FiFlag, FiCompass, FiClock, FiLayers, FiVideo, FiUsers, FiGlobe, FiCheckCircle]
            return set[idx % set.length]
          })()
          const sz = Math.max(18, sizes.dot * 5.5)
          return (
            <button
              key={`ico-${idx}`}
              type="button"
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/20 p-0.5 backdrop-blur-sm ring-1 ring-white/10 hover:bg-black/30"
              style={{ left: p.x, top: p.y }}
              onMouseEnter={()=>setHover(idx)}
              onMouseLeave={()=>setHover(null)}
              onClick={()=>{ setSelected(idx); if (!pushedRef.current){ history.pushState({ milestone: idx }, ''); pushedRef.current = true } }}
            >
              <Icon size={sz} color="#ffd86b" style={{ filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.55))' }} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
