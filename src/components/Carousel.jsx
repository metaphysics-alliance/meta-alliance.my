import { useEffect, useRef, useState, useCallback } from 'react'
import { useI18n } from '../i18n.jsx'

const AUTOPLAY_MS = 3500
const PAUSE_ON_HOVER = true

export default function Carousel() {
  const { t } = useI18n()
  const slides = [
    { id: 1, title: t('slide1_title'), subtitle: t('slide1_sub'), img: '../assets/carousel/banner1.jpg' },
    { id: 2, title: t('slide2_title'), subtitle: t('slide2_sub'), img: '../assets/carousel/banner2.jpg' },
    { id: 3, title: t('slide3_title'), subtitle: t('slide3_sub'), img: '../assets/carousel/banner3.jpg' },
    { id: 4, title: t('slide4_title'), subtitle: t('slide4_sub'), img: '../assets/carousel/banner4.jpg' },
    { id: 5, title: t('slide5_title'), subtitle: t('slide5_sub'), img: '../assets/carousel/banner5.jpg' },
  ]

  const [index, setIndex] = useState(0)
  const pausedRef = useRef(false)
  const timeoutRef = useRef(null)

  const next = useCallback(() => setIndex(i => (i + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setIndex(i => (i - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    let alive = true
    function loop(){
      if (!alive) return
      if (!pausedRef.current) next()
      timeoutRef.current = setTimeout(loop, AUTOPLAY_MS)
    }
    timeoutRef.current = setTimeout(loop, AUTOPLAY_MS)
    return () => { alive = false; clearTimeout(timeoutRef.current) }
  }, [next])

  const onEnter = () => { if (PAUSE_ON_HOVER) pausedRef.current = true }
  const onLeave = () => { if (PAUSE_ON_HOVER) pausedRef.current = false }

  return (
    <div
      className="relative h-[54vh] md:h-[68vh] overflow-hidden group"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{opacity: i === index ? 1 : 0}}
          aria-hidden={i !== index}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${s.img}')` }} />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 h-full container flex flex-col justify-end md:justify-center">
            <div className="mb-10 md:mb-0">
              <h2 className="text-2xl md:text-5xl font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{s.title}</h2>
              <p className="text-sm md:text-lg text-gold-soft mt-2">{s.subtitle}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-gold' : 'bg-white/40'}`}
            aria-label={`Go to slide ${i+1}`}
          />
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-1/4 z-30 group/left">
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/30 bg-black/30 hover:bg-black/50 hover:border-gold/60 transition
                     md:opacity-0 md:pointer-events-none md:group-hover/left:opacity-100 md:group-hover/left:pointer-events-auto
                     opacity-100 pointer-events-auto"
          onClick={prev}
          aria-label="Previous slide"
          onFocus={() => (pausedRef.current = true)}
          onBlur={() => (pausedRef.current = false)}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto my-auto"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 w-1/4 z-30 group/right">
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/30 bg-black/30 hover:bg-black/50 hover:border-gold/60 transition
                     md:opacity-0 md:pointer-events-none md:group-hover/right:opacity-100 md:group-hover/right:pointer-events-auto
                     opacity-100 pointer-events-auto"
          onClick={next}
          aria-label="Next slide"
          onFocus={() => (pausedRef.current = true)}
          onBlur={() => (pausedRef.current = false)}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto my-auto"><path fill="currentColor" d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </button>
      </div>
    </div>
  )
}
