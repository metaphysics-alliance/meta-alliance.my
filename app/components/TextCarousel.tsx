"use client"
import { useEffect, useRef, useState } from 'react'

type Item = { date?: string; title?: string; body?: string }

export default function TextCarousel({ items = [], intervalMs = 6000 }: { items: Item[]; intervalMs?: number }){
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const count = Array.isArray(items) ? items.length : 0

  useEffect(() => {
    if (!count) return
    const id = window.setInterval(() => setIndex(i => (i + 1) % count), intervalMs)
    timerRef.current = id
    return () => { if (timerRef.current) window.clearInterval(timerRef.current) }
  }, [count, intervalMs])

  if (!count) return null

  const go = (dir: -1 | 1) => setIndex(i => (i + dir + count) % count)

  const it = items[index] || {}

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between text-xs text-white/60">
        <div>{it.date}</div>
        <div>{index + 1} / {count}</div>
      </div>
      {it.title ? <h4 className="text-lg font-semibold text-white">{it.title}</h4> : null}
      {it.body ? <p className="mt-2 text-sm leading-relaxed text-white/75">{it.body}</p> : null}
      <div className="mt-4 flex gap-2">
        <button aria-label="Previous" onClick={() => go(-1)} className="rounded-md border border-white/15 px-3 py-1 text-sm text-white/85 hover:bg-white/5">‹</button>
        <button aria-label="Next" onClick={() => go(1)} className="rounded-md border border-white/15 px-3 py-1 text-sm text-white/85 hover:bg-white/5">›</button>
      </div>
    </div>
  )
}

