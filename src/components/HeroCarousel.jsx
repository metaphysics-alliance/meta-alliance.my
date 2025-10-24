// src/components/HeroCarousel.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useI18n } from '../i18n.jsx'

// Static image sources only; captions resolved from i18n at runtime
const SOURCES = [
  { src: '/assets/carousel/banner1.jpg', tKey: 1 },
  { src: '/assets/carousel/banner2.jpg', tKey: 2 },
  { src: '/assets/carousel/banner3.jpg', tKey: 3 },
  { src: '/assets/carousel/banner4.jpg', tKey: 4 },
  { src: '/assets/carousel/banner5.jpg', tKey: 5 },
]

// Adjust these to your preference
const MAX_VH_DESKTOP = 1.08   // max 68% of viewport height on ?768px
const MAX_VH_MOBILE  = 0.95   // max 45% of viewport height on <768px

export default function HeroCarousel(){
  const { t } = useI18n()
  const [idx, setIdx] = useState(0)
  const [ratio, setRatio] = useState(9 / 21) // current image H/W
  const [heightPx, setHeightPx] = useState(null)
  const timer = useRef(null)
  const hovering = useRef(false)
  const stageRef = useRef(null)

  // Resolve captions from i18n with safe fallbacks
  const slides = useMemo(() => {
    const TT = (key, fallback = '') => {
      const v = t(key)
      return v === key ? fallback : v
    }

    return SOURCES.map(({ src, tKey }) => ({
      src,
      title: TT(`hero.slide${tKey}_title`, ''),
      sub: TT(`hero.slide${tKey}_sub`, ''),
    }))
  }, [t])

  const stop = () => {
    if (timer.current){
      clearInterval(timer.current)
      timer.current = null
    }
  }

  // autoplay with pause-on-hover
  useEffect(() => {
    stop()
    timer.current = setInterval(() => {
      if (!hovering.current) setIdx(i => (i + 1) % slides.length)
    }, 5500)
    return stop
  }, [slides.length])

  // when current image loads, update ratio from natural pixels
  const onImgLoad = (e) => {
    const nw = e.target.naturalWidth
    const nh = e.target.naturalHeight
    if (nw && nh) setRatio(nh / nw)
  }

  const recomputeHeight = useCallback(() => {
    const el = stageRef.current
    if (!el) return
    const width = el.offsetWidth
    const desired = width * ratio
    const isDesktop = window.innerWidth >= 768
    const maxVH = isDesktop ? MAX_VH_DESKTOP : MAX_VH_MOBILE
    const maxPx = window.innerHeight * maxVH
    setHeightPx(Math.min(desired, maxPx))
  }, [ratio])

  useEffect(() => {
    recomputeHeight()
    const onResize = () => recomputeHeight()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [recomputeHeight])

  useEffect(() => {
    recomputeHeight()
  }, [idx, recomputeHeight])

  const prev = () => setIdx(i => (i - 1 + slides.length) % slides.length)
  const next = () => setIdx(i => (i + 1) % slides.length)

  return (
    <section className="relative group select-none">
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden bg-black/20 backdrop-blur-lg"
        style={{ height: heightPx ?? '48vh' }} // fallback until first compute
        onMouseEnter={() => { hovering.current = true }}
        onMouseLeave={() => { hovering.current = false }}
      >
        {/* Slides fill the clamped stage height */}
        <div className="relative w-full h-full">
          {slides.map((s, i) => (
            <img
              key={i}
              src={`${s.src}?v=233`}
              alt=""
              onLoad={i === idx ? onImgLoad : undefined}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out
                         ${i === idx ? 'opacity-100' : 'opacity-0'} object-contain`}
              fetchPriority={i === idx ? 'high' : undefined}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
          {/* Soft vignette for caption contrast */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        </div>

        {/* Captions */}
        <div className="absolute inset-x-0 bottom-4 md:bottom-8 px-6 sm:px-8 z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block rounded-2xl px-5 py-3 md:px-6 md:py-4" style={TITLE_PANEL_STYLES}>
              <h1 className="title-gradient text-xl md:text-4xl font-semibold drop-shadow-sm pb-[10px]">
                {slides[idx].title}
              </h1>
            </div>
            <p className="text-white/80 mt-1.5 md:mt-3">
              {slides[idx].sub}
            </p>
          </div>
        </div>

        {/* Arrows - hidden until hover */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100
                     transition rounded-xl bg-black/50 hover:bg-black/70 border border-white/15 p-2"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100
                     transition rounded-xl bg-black/50 hover:bg-black/70 border border-white/15 p-2"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}
const TITLE_PANEL_STYLES = {
  background: 'linear-gradient(125deg, rgba(255,238,184,0.92) 0%, rgba(26,46,104,0.9) 100%)',
  boxShadow: '0 16px 36px rgba(10,18,56,0.55)',
  border: '1px solid rgba(240,198,102,0.6)',
  backdropFilter: 'blur(24px)',
};
