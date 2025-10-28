/* eslint-disable jsx-a11y/media-has-caption, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
/* eslint-disable import/order, react-hooks/exhaustive-deps */
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState, useEffect, useRef } from 'react'

function normalise(value){
  if (!value) return []
  if (Array.isArray(value)){
    return value.map((entry) => {
      if (typeof entry === 'string') return { title: entry }
      if (entry && typeof entry === 'object'){
        const { title, description, desc, src, thumbnail, script_en, script_cn } = entry
        return {
          title: typeof title === 'string' ? title : 'Untitled',
          description: typeof description === 'string' ? description : (typeof desc === 'string' ? desc : undefined),
          src: typeof src === 'string' ? src : undefined,
          thumbnail: typeof thumbnail === 'string' ? thumbnail : undefined,
          script_en: typeof script_en === 'string' ? script_en : undefined,
          script_cn: typeof script_cn === 'string' ? script_cn : undefined,
        }
      }
      return { title: 'Untitled' }
    })
  }
  return []
}

export default function VideoCarousel({ items, locale = 'EN' }){
  const derived = useMemo(() => normalise(items), [items])
  const [openIndex, setOpenIndex] = useState(null)
  const [lang, setLang] = useState(locale === 'CN' ? 'CN' : 'EN')
  const [tab, setTab] = useState('video')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef(null)

  function handleOverlayKey(e){
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') setOpenIndex(null)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % derived.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + derived.length) % derived.length)
  }

  useEffect(() => {
    if (!isHovering) {
      timerRef.current = setInterval(() => {
        handleNext()
      }, 5000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isHovering, derived.length])

  return (
    <div
      className="relative w-full aspect-video bg-black/20 overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {derived.map((v, idx) => (
        <div
          key={`${v.title}-${idx}`}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${currentIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={v.thumbnail || '/images/video/placeholder.svg'}
            alt={v.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => { setOpenIndex(idx); setTab(v.src ? 'video' : 'script') }}
              className="w-20 h-20 rounded-full bg-black/50 flex items-center justify-center text-white/80 hover:bg-black/70 transition-colors">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-2xl font-semibold">{v.title}</h3>
            <p className="text-white/80">{v.description}</p>
          </div>
        </div>
      ))}

      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition rounded-xl bg-black/50 hover:bg-black/70 border border-white/15 p-2"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition rounded-xl bg-black/50 hover:bg-black/70 border border-white/15 p-2"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {openIndex !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            role="button"
            tabIndex={0}
            onClick={() => setOpenIndex(null)}
            onKeyDown={handleOverlayKey}
          />
          <div className="relative z-10 w-[min(880px,92vw)] max-h-[86vh] overflow-auto rounded-2xl border border-white/15 bg-black/90 p-5 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-lg font-semibold text-white/95">{derived[openIndex]?.title}</h4>
              <button onClick={() => setOpenIndex(null)} className="rounded-md border border-white/15 px-2 py-1 text-xs text-white/70 hover:text-white">Close</button>
            </div>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex overflow-hidden rounded-lg border border-white/15 text-xs">
                  <button className={`px-3 py-1.5 ${tab === 'video' ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10'}`} onClick={() => setTab('video')}>{lang === 'CN' ? '视频' : 'Video'}</button>
                  <button className={`px-3 py-1.5 ${tab === 'script' ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10'}`} onClick={() => setTab('script')}>{lang === 'CN' ? '脚本' : 'Script'}</button>
                </div>
                <div className="inline-flex overflow-hidden rounded-lg border border-white/15 text-xs">
                  <button className={`px-3 py-1.5 ${lang === 'EN' ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10'}`} onClick={() => setLang('EN')}>EN</button>
                  <button className={`px-3 py-1.5 ${lang === 'CN' ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10'}`} onClick={() => setLang('CN')}>中文</button>
                </div>
              </div>
              {tab === 'video' ? (
                derived[openIndex]?.src ? (
                  <video key={`video-${openIndex}`} src={derived[openIndex]?.src} poster={derived[openIndex]?.thumbnail || '/images/video/placeholder.svg'} controls autoPlay preload="metadata" className="h-auto w-full rounded-xl ring-1 ring-white/15" />
                ) : (
                  <div className="rounded-xl border border-white/15 bg-black/40 p-4 text-sm text-white/70">{lang === 'CN' ? '暂无视频源，请稍后添加。' : 'No video source yet. Add a src to enable playback.'}</div>
                )
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">{lang === 'EN' ? (derived[openIndex]?.script_en || 'Script not available.') : (derived[openIndex]?.script_cn || '暂无脚本。')}</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
