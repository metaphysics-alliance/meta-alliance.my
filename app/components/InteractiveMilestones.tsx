"use client"

import { useMemo, useState, useRef, useEffect } from 'react'
import { FiFlag, FiCompass, FiClock, FiLayers, FiVideo, FiUsers, FiGlobe, FiCheckCircle } from 'react-icons/fi'

type StoryItem = { date: string; title?: string; body?: string; outcome?: string }
type MilestoneItem = { date: string; title?: string; outcome: string }

export default function InteractiveMilestones({
  title,
  subtitle,
  storyItems = [],
  milestoneItems = [],
  locale,
}: {
  title: string
  subtitle?: string
  storyItems?: StoryItem[]
  milestoneItems?: MilestoneItem[]
  locale?: 'EN' | 'CN'
}){
  // Merge Story + Milestones: show one unified roadmap; on hover we display the story/outcome
  const items = useMemo(() => {
    const len = Math.max(storyItems?.length || 0, milestoneItems?.length || 0)
    const merged: { date: string; title?: string; text?: string }[] = []
    for (let i = 0; i < len; i++){
      const s = (storyItems as any[])[i] || {}
      const m = (milestoneItems as any[])[i] || {}
      const date = m.date || s.date
      if (!date) continue
      merged.push({
        date,
        title: s.title || m.title,
        text: s.body || m.outcome || '',
      })
    }
    return merged
  }, [storyItems, milestoneItems])

  return (
    <section
      className="rounded-2xl border border-white/10 p-0 overflow-hidden backdrop-blur-md min-h-[26rem]"
      style={{
        background:
          'radial-gradient(120% 80% at 20% 0%, rgba(212,175,55,0.08), transparent 60%), radial-gradient(120% 80% at 80% 100%, rgba(146,111,28,0.08), transparent 60%), linear-gradient(180deg, rgba(8,10,20,0.85), rgba(6,8,16,0.85))',
      }}
    >
      <div className="flex flex-wrap items-end justify-between gap-3 px-4 py-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle ? <p className="text-xs text-white/70">{subtitle}</p> : null}
        </div>
      </div>

      <Timeline items={items} locale={locale} />
    </section>
  )
}

function MobileModal({ header, body, onClose, onPrev, onNext, hasPrev, hasNext, currentIndex, total }:{ header?: string; body?: string; onClose: () => void; onPrev?: () => void; onNext?: () => void; hasPrev?: boolean; hasNext?: boolean; currentIndex?: number; total?: number }){
  const touchStart = useRef<number | null>(null)
  const touchDelta = useRef<number>(0)
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientY; touchDelta.current = 0 }}
      onTouchMove={(e) => { if (touchStart.current!=null){ touchDelta.current = e.touches[0].clientY - touchStart.current } }}
      onTouchEnd={() => { if (touchDelta.current > 48) onClose() }}
    >
      <div className="w-full max-w-[92vw] rounded-xl border border-white/15 bg-black/90 p-3 text-white shadow-2xl" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between gap-2">
          <button disabled={!hasPrev} onClick={onPrev} className={`rounded-md px-2 py-1 text-sm ${hasPrev? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white/5 text-white/40'}`}>‹</button>
          <div className="flex-1 px-2 text-center text-base font-semibold truncate">{header}</div>
          {total ? <div className="px-2 text-xs text-white/70 whitespace-nowrap">{currentIndex ?? 1} / {total}</div> : null}
          <button disabled={!hasNext} onClick={onNext} className={`rounded-md px-2 py-1 text-sm ${hasNext? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white/5 text-white/40'}`}>›</button>
          <button className="ml-2 rounded-md bg-white/10 px-2 py-1 text-sm text-white hover:bg-white/20" onClick={onClose}>×</button>
        </div>
        <div className="mt-2 max-h-[70vh] overflow-auto text-[14px] leading-relaxed text-white/85">{body}</div>
      </div>
    </div>
  )
}

function Timeline({ items, locale }: { items: { date: string; title?: string; text?: string }[]; locale?: 'EN' | 'CN' }){
  if (!items || !items.length) return null
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState<number>(1200)
  // Measure container width
  useEffect(() => {
    const onResize = () => {
      const w = containerRef.current?.clientWidth || window.innerWidth
      setWidth(Math.max(640, w))
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Serpentine (snake) layout: wrap items into rows, alternating direction
  // Responsive serpentine settings
  const { margin, rowHeight, baseY, minGap } = useMemo(() => {
    if (width >= 1600) return { margin: 200, rowHeight: 220, baseY: 120, minGap: 400 }
    if (width >= 1280) return { margin: 180, rowHeight: 200, baseY: 110, minGap: 360 }
    if (width >= 1024) return { margin: 160, rowHeight: 180, baseY: 100, minGap: 320 }
    if (width >= 768)  return { margin: 140, rowHeight: 150, baseY: 96,  minGap: 280 }
    return { margin: 120, rowHeight: 120, baseY: 90,  minGap: 240 }
  }, [width])
  const columns = Math.max(2, Math.min(items.length, Math.floor((width - margin * 2) / minGap) + 1))
  const gapX = (width - margin * 2) / Math.max(1, columns - 1)
  const rows = Math.ceil(items.length / columns)
  const curve = 64

  const pos = items.map((_, i) => {
    const r = Math.floor(i / columns)
    const c = i % columns
    const dirLeftToRight = r % 2 === 0
    const effectiveC = dirLeftToRight ? c : (columns - 1 - c)
    const x = margin + effectiveC * gapX
    const y = baseY + r * rowHeight
    return { x, y, r, c, dirLeftToRight }
  })

  const totalWidth = width
  const totalHeight = baseY + (rows - 1) * rowHeight + 120

  // Responsive sizes for mobile/tablet/desktop
  const sizes = useMemo(() => {
    if (width < 480) return { date: 12, title: 11, dot: 5.5, svgH: '22rem', tipW: 320, tipPad: 'p-3' }
    if (width < 768) return { date: 14, title: 12, dot: 6.0, svgH: '24rem', tipW: 380, tipPad: 'p-4' }
    if (width < 1024) return { date: 16, title: 14, dot: 7.0, svgH: '28rem', tipW: 480, tipPad: 'p-5' }
    return { date: 18, title: 16, dot: 7.5, svgH: '32rem', tipW: 520, tipPad: 'p-5' }
  }, [width])
  
  const [hover, setHover] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const pushedRef = useRef(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onPop = () => {
      setSelected(null)
      pushedRef.current = false
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const active = hover != null ? items[hover] : null
  const header = active ? (active.title ? (locale==='CN' ? `${active.date}｜${active.title}` : `${active.date} — ${active.title}`) : active.date) : ''

  return (
    <div ref={containerRef} className="relative flex min-h-[18rem] items-center justify-center overflow-x-auto">
      {/* Desktop hover tooltip */}
      {width >= 768 && hover != null ? (
        <div
          className={`pointer-events-none absolute z-10 max-w-[96vw] rounded-lg border border-white/15 bg-black/85 text-white shadow-2xl ${sizes.tipPad}`}
          style={{
            width: Math.min(sizes.tipW, Math.max(260, totalWidth - margin * 2 - 40)),
            left: Math.min(Math.max(pos[hover].x, margin + 160), totalWidth - margin - 160),
            top: Math.min(Math.max(pos[hover].y, 72), totalHeight - 72),
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="text-[15px] font-semibold text-white/90">{header}</div>
          {active?.text ? (
            <div
              className="mt-1 text-white/85"
              style={{
                fontSize: width < 480 ? 13 : 14,
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: width < 480 ? 3 as any : 5 as any,
                WebkitBoxOrient: 'vertical' as any,
                overflow: 'hidden',
              }}
            >
              {active.text}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Mobile modal tooltip (centered) */}
      {width < 768 && selected != null ? (
        <MobileModal
          header={items[selected]?.title ? (locale==='CN' ? `${items[selected]?.date}｜${items[selected]?.title}` : `${items[selected]?.date} — ${items[selected]?.title}`) : items[selected]?.date}
          body={items[selected]?.text}
          currentIndex={(selected ?? 0) + 1}
          total={items.length}
          hasPrev={selected > 0}
          hasNext={selected < items.length - 1}
          onPrev={() => {
            if (selected != null && selected > 0){
              const nextIdx = selected - 1
              setSelected(nextIdx)
              history.pushState({ milestone: nextIdx }, '')
              pushedRef.current = true
            }
          }}
          onNext={() => {
            if (selected != null && selected < items.length - 1){
              const nextIdx = selected + 1
              setSelected(nextIdx)
              history.pushState({ milestone: nextIdx }, '')
              pushedRef.current = true
            }
          }}
          onClose={() => {
            if (pushedRef.current){
              history.back()
            } else {
              setSelected(null)
            }
          }}
        />
      ) : null}
            <div className="flex items-start justify-between gap-3">
              <div className="text-base font-semibold">{items[selected]?.title ? (locale==='CN' ? `${items[selected]?.date}｜${items[selected]?.title}` : `${items[selected]?.date} — ${items[selected]?.title}`) : items[selected]?.date}</div>
              <button className="rounded-md bg-white/10 px-2 py-1 text-sm text-white hover:bg-white/20" onClick={()=>setSelected(null)}>×</button>
            </div>
            <div className="mt-2 max-h-[70vh] overflow-auto text-[14px] leading-relaxed text-white/85">{items[selected]?.text}</div>
          </div>
        </div>
      ) : null}

      <svg viewBox={`0 0 ${totalWidth} ${totalHeight}`} className="w-full block" style={{ height: sizes.svgH }}>
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
        {/* Row baselines */}
        {new Array(rows).fill(0).map((_, r) => (
          <line key={`row-${r}`} x1={margin} y1={baseY + r * rowHeight} x2={width - margin} y2={baseY + r * rowHeight} stroke="url(#grad-line)" strokeWidth="3.25" filter="url(#glow)" />
        ))}
        {/* Curves between consecutive milestones */}
        {pos.map((p, i) => {
          if (i === 0) return null
          const prev = pos[i-1]
          const sameRow = prev.r === p.r
          const c1x = sameRow ? (prev.x + (p.x - prev.x) * 0.35) : prev.x
          const c2x = sameRow ? (prev.x + (p.x - prev.x) * 0.65) : p.x
          const c1y = sameRow ? prev.y + (prev.dirLeftToRight ? -curve : curve) : prev.y + curve
          const c2y = sameRow ? p.y + (prev.dirLeftToRight ? -curve : curve) : p.y - curve
          const d = `M ${prev.x} ${prev.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p.x} ${p.y}`
          return <path key={`c-${i}`} d={d} fill="none" stroke="url(#grad-line)" strokeWidth="3.25" markerEnd="url(#arrow-gold)" opacity="0.98" filter="url(#glow)" />
        })}
        {/* Labels only (dates/titles). Icons are overlaid via HTML for flexibility */}
        {items.map((it, idx) => {
          const label = (it.title || it.date || '').slice(0, width < 640 ? 18 : 28)
          const p = pos[idx]
          return (
            <g key={`lbl-${idx}`}>
              <text x={p.x} y={p.y - (sizes.date + 20)} textAnchor="middle" fontSize={sizes.date} fill="rgba(255,255,255,0.97)" style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.6)', strokeWidth: 0.35 }}>{it.date}</text>
              <text x={p.x} y={p.y + (sizes.title + 26)} textAnchor="middle" fontSize={sizes.title} fill="rgba(255,255,255,0.92)" style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.5)', strokeWidth: 0.3 }}>{label}</text>
            </g>
          )
        })}
      </svg>
      {/* React Icons overlay (clickable) */}
      <div className="pointer-events-none absolute inset-0">
        {items.map((it, idx) => {
          const p = pos[idx]
          const Icon = (() => {
            const title = (it.title || '').toLowerCase()
            if (/foundation|创立|愿景/.test(title)) return FiFlag
            if (/core|框架|framework/.test(title)) return FiLayers
            if (/team|团队/.test(title)) return FiUsers
            if (/digital|平台|infrastructure|数位/.test(title)) return FiGlobe
            if (/refine|优化|recognition|认可/.test(title)) return FiCompass
            if (/video|workshop|报告|report/.test(title)) return FiVideo
            if (/time|时序|quarter|季度/.test(title)) return FiClock
            if (/expand|扩展|legacy|传承/.test(title)) return FiCheckCircle
            const set = [FiFlag, FiCompass, FiClock, FiLayers, FiVideo, FiUsers, FiGlobe, FiCheckCircle]
            return set[idx % set.length]
          })()
          const px = Math.min(Math.max(p.x, 0), totalWidth)
          const py = Math.min(Math.max(p.y, 0), totalHeight)
          const sz = Math.max(18, sizes.dot * 6)
          return (
            <button
              key={`ico-${idx}`}
              type="button"
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/20 p-1 backdrop-blur-sm ring-1 ring-white/10 hover:bg-black/30"
              style={{ left: px, top: py }}
              onMouseEnter={()=> setHover(idx)}
              onMouseLeave={()=> setHover(null)}
              onClick={()=> {
                setSelected(idx)
                if (!pushedRef.current && width < 768){
                  history.pushState({ milestone: idx }, '')
                  pushedRef.current = true
                }
              }}
            >
              <Icon size={sz} color="#ffd86b" style={{ filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.55))' }} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Dot({ cx, date, title, text, locale }:{ cx:number; date:string; title?:string; text?:string; locale?: 'EN' | 'CN' }){
  const [open, setOpen] = useState(false)
  const header = title ? (locale === 'CN' ? `${date}｜${title}` : `${date} — ${title}`) : date
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
