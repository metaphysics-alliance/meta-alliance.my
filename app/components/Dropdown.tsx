"use client"

import { useEffect, useMemo, useRef, useState } from 'react'

type Item = { type: 'heading' | 'option'; label: string; value?: string }

export default function Dropdown({
  value,
  onChange,
  items,
  placeholder,
  className = '',
}: {
  value?: string
  onChange: (v: string) => void
  items: Item[]
  placeholder?: string
  className?: string
}){
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const selectedLabel = useMemo(() => {
    const found = items.find((it) => it.type === 'option' && it.value === value)
    return found?.label || placeholder || ''
  }, [items, value, placeholder])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 pr-10 text-left text-white focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
      >
        <span>{selectedLabel}</span>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">▾</span>
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-lg border border-white/10 bg-black/90 shadow-xl backdrop-blur-md">
          <ul role="listbox" className="max-h-64 overflow-auto py-1">
            {items.map((it, idx) => (
              it.type === 'heading' ? (
                <li key={`h-${idx}`} className="px-3 py-1.5 text-xs uppercase tracking-wide text-white/50">
                  {it.label}
                </li>
              ) : (
                <li key={it.value}
                    role="option"
                    aria-selected={value === it.value}
                    onClick={() => { if (it.value){ onChange(it.value); setOpen(false) } }}
                    className={`cursor-pointer px-3 py-2 text-sm text-white hover:bg-white/10 ${value === it.value ? 'bg-white/10' : ''}`}
                >
                  {it.label}
                </li>
              )
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

