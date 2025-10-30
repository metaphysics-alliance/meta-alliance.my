import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useI18n } from '../i18n.jsx'

const SOURCES = [
  { src: '/assets/carousel/banner1.jpg', tKey: 1, href: '/services/celestial/destiny-algorithm' },
  { src: '/assets/carousel/banner2.jpg', tKey: 2, href: '/vip-report/essential' },
  { src: '/assets/carousel/banner3.jpg', tKey: 3, href: '/enterprise/audit' },
  { src: '/assets/carousel/banner4.jpg', tKey: 4, href: '/oracle/celestial-numbers' },
  { src: '/assets/carousel/banner5.jpg', tKey: 5, href: '/services/fengshui/office-power-alignment' },
]

const MAX_VH_DESKTOP = 0.82
const MAX_VH_MOBILE = 0.68
const SLIDE_INTERVAL = 6000
const CTA_LABELS = {
  EN: 'Explore Our Services',
  CN: '了解我们的服务',
}

export default function HeroCarousel() {
  const { t, lang } = useI18n()
  const [idx, setIdx] = useState(0)
  const [ratio, setRatio] = useState(9 / 21)
  const [heightPx, setHeightPx] = useState(null)
  const timer = useRef(null)
  const hovering = useRef(false)
  const stageRef = useRef(null)

  const slides = useMemo(() => {
    const pick = (key, fallback = '') => {
      const value = t(key)
      return value === key ? fallback : value
    }

    return SOURCES.map(({ src, tKey, href }) => ({
      src,
      href,
      title: pick(`hero.slide${tKey}_title`, ''),
      sub: pick(`hero.slide${tKey}_sub`, ''),
    }))
  }, [t])

  const totalSlides = slides.length

  const advance = useCallback((step) => {
    if (!totalSlides) return
    setIdx((current) => (current + step + totalSlides) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    if (idx >= totalSlides && totalSlides > 0) {
      setIdx(0)
    }
  }, [idx, totalSlides])

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
  }, [])

  useEffect(() => {
    if (!totalSlides) return undefined

    stop()
    timer.current = setInterval(() => {
      if (!hovering.current) {
        advance(1)
      }
    }, SLIDE_INTERVAL)

    return stop
  }, [advance, stop, totalSlides])

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
  }, [idx, ratio, recomputeHeight])

  const prev = useCallback(() => {
    advance(-1)
  }, [advance])

  const next = useCallback(() => {
    advance(1)
  }, [advance])

  const badgeText = useMemo(() => {
    const badge = t('hero.badge')
    return badge && badge !== 'hero.badge' ? badge : 'Metaphysics Alliance'
  }, [t])

  const ctaLabel = useMemo(() => {
    const fallback = CTA_LABELS[lang] || CTA_LABELS.EN
    const fromDict = t('hero.cta')
    return fromDict && fromDict !== 'hero.cta' ? fromDict : fallback
  }, [lang, t])

  const currentSlide = totalSlides ? slides[idx % totalSlides] : null

  const panelStyle = useMemo(
    () => ({
      backgroundColor: '#050818',
      backgroundImage: [
        'radial-gradient(circle at 20% 22%, rgba(70,112,255,0.28), transparent 58%)',
        'radial-gradient(circle at 76% 18%, rgba(255,214,140,0.32), transparent 54%)',
        'radial-gradient(circle at 64% 82%, rgba(92,186,255,0.22), transparent 52%)',
        'linear-gradient(135deg, rgba(5,9,25,0.96), rgba(11,16,42,0.88))'
      ].join(', '),
      backgroundBlendMode: 'screen, screen, screen, normal',
      boxShadow: '0 30px 80px rgba(4,8,24,0.55), inset 0 0 40px rgba(24,38,88,0.38)',
      backdropFilter: 'blur(14px)',
    }),
    []
  )

  if (!totalSlides) {
    return null
  }

  return (
    <section className="relative select-none">
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden bg-black/20 shadow-[0_28px_60px_rgba(7,12,32,0.45)] transition-all duration-500 ease-out"
        style={{ height: heightPx ?? '46vh' }}
        onMouseEnter={() => {
          hovering.current = true
        }}
        onMouseLeave={() => {
          hovering.current = false
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={`${currentSlide.src}?v=233`}
            alt=""
            className="h-full w-full scale-[1.4] object-cover blur-[60px] brightness-[0.72]"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/82 via-black/55 to-black/20" />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col-reverse items-stretch md:flex-row md:items-stretch">
          <div className="flex h-full w-full flex-1 md:w-1/2">
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-6 text-center md:px-8 md:py-7"
              style={panelStyle}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.48em] text-[#d9bc7d]/75 md:text-xs">
                {badgeText}
              </span>
              <h1 className="text-2xl font-semibold leading-tight text-white drop-shadow-[0_0_26px_rgba(255,214,138,0.45)] md:text-[3.1rem] md:leading-[1.14]">
                {currentSlide.title}
              </h1>
              <p className="max-w-3xl text-sm font-medium text-[#ecedf5]/85 md:text-lg md:leading-relaxed">
                {currentSlide.sub}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/services"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-[14px] bg-black/85 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-gold transition-all duration-300 md:px-7 md:py-2.5 md:text-sm"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#f8d884cc] via-[#f6e7b8aa] to-[#f8d884cc] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                  <span className="absolute inset-0 scale-[0.86] rounded-[12px] border border-[#f8d88433] transition duration-300 group-hover:scale-100 group-hover:border-[#f8d88480]" />
                  <span className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-40" style={{ boxShadow: '0 0 45px 10px rgba(248,216,132,0.32)' }} />
                  <span className="relative tracking-[0.28em] text-[#f4deb4] group-hover:text-[#fff5dc]">
                  {ctaLabel}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex h-full w-full flex-1 md:w-1/2">
            <div className="relative h-full w-full overflow-hidden border border-white/10 bg-black/35 shadow-[0_24px_60px_rgba(7,12,32,0.55)]">
              {slides.map((slide, slideIndex) => {
                const relative = ((slideIndex - idx) % totalSlides + totalSlides) % totalSlides
                let transform = 'translateX(100%)'
                if (relative === 0) {
                  transform = 'translateX(0%)'
                } else if (relative === totalSlides - 1) {
                  transform = 'translateX(-100%)'
                }

                const isVisible = relative === 0 || relative === totalSlides - 1

                return (
                  <div
                    key={slide.src}
                    className="absolute inset-0 transition-transform duration-[850ms] ease-out"
                    style={{
                      transform,
                      zIndex: relative === 0 ? 30 : relative === totalSlides - 1 ? 20 : 10,
                    }}
                  >
                    <img
                      src={`${slide.src}?v=233`}
                      alt=""
                      className={`h-full w-full object-cover transition-opacity duration-[850ms] ease-out ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={(event) => {
                        if (relative === 0) {
                          const el = event.currentTarget
                          if (el.naturalWidth && el.naturalHeight) {
                            setRatio(el.naturalHeight / el.naturalWidth)
                          }
                        }
                      }}
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-bl from-black/10 via-black/0 to-black/35 transition-opacity duration-[850ms] ease-out ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          className="group absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:border-gold/80 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 md:left-7"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
        </button>
        <button
          type="button"
          onClick={next}
          className="group absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:border-gold/80 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 md:right-7"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, slideIndex) => (
            <span
              key={`dot-${slideIndex}`}
              className={`h-[5px] w-8 rounded-full transition-all duration-300 ${
                slideIndex === idx ? 'bg-gold shadow-[0_0_18px_rgba(248,216,132,0.65)]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
