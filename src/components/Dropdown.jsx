/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Dropdown({ value, onChange, items, placeholder, className = '', disabled = false }){
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const btnRef = useRef(null)
  const menuRef = useRef(null)
  const [menuStyle, setMenuStyle] = useState({})

  useEffect(() => {
    const onDocMouseDown = (e) => {
      const target = e.target
      const insideButton = ref.current && ref.current.contains(target)
      const insideMenu = menuRef.current && menuRef.current.contains(target)
      if (!insideButton && !insideMenu) setOpen(false)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [])

  useEffect(() => {
    function positionMenu(){
      if (!btnRef.current) return
      const rect = btnRef.current.getBoundingClientRect()
      setMenuStyle({ position: 'fixed', top: Math.round(rect.bottom + 6), left: Math.round(rect.left), width: Math.round(rect.width), zIndex: 50 })
    }
    if (open){
      positionMenu()
      window.addEventListener('scroll', positionMenu, true)
      window.addEventListener('resize', positionMenu)
      return () => {
        window.removeEventListener('scroll', positionMenu, true)
        window.removeEventListener('resize', positionMenu)
      }
    }
  }, [open])

  const selectedLabel = useMemo(() => {
    const found = items.find((it) => it.type === 'option' && it.value === value)
    return (found && found.label) || placeholder || ''
  }, [items, value, placeholder])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button ref={btnRef} type="button" aria-haspopup="listbox" aria-expanded={open}
        onClick={() => { if (!disabled) setOpen(v => !v) }} disabled={disabled}
        className={`w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 pr-10 text-left text-white focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/40 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <span>{selectedLabel}</span>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">▾</span>
      </button>
      {open ? createPortal(
        <div ref={menuRef} style={menuStyle}>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-black/90 shadow-xl backdrop-blur-md">
            <ul role="listbox" className="max-h-64 overflow-auto py-1">
              {items.map((it, idx) => (
                it.type === 'heading' ? (
                  <li key={`h-${idx}`} className="px-3 py-1.5 text-xs uppercase tracking-wide text-white/50">{it.label}</li>
                ) : (
                  <li key={it.value} role="option" aria-selected={value === it.value}
                      tabIndex={0}
                      onClick={() => { if (it.value){ onChange(it.value); setOpen(false) } }}
                      onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && it.value){ onChange(it.value); setOpen(false) } }}
                      className={`cursor-pointer px-3 py-2 text-sm text-white hover:bg-white/10 ${value === it.value ? 'bg-white/10' : ''}`}>
                    {it.label}
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>, document.body) : null}
    </div>
  )
}
