import { useMemo, useState } from 'react'

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

  return (
    <div className="rounded-3xl border border-white/10 bg-black/15 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/60">Swipe to explore</div>
        <div className="inline-flex overflow-hidden rounded-lg border border-white/15 text-xs">
          <button className={`px-3 py-1.5 ${lang === 'EN' ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10'}`} onClick={() => setLang('EN')}>EN</button>
          <button className={`px-3 py-1.5 ${lang === 'CN' ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10'}`} onClick={() => setLang('CN')}>中文</button>
        </div>
      </div>
      <div className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {derived.map((v, idx) => (
          <article key={`${v.title}-${idx}`} className="min-w-[280px] max-w-[320px] shrink-0 snap-start rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-md">
            <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl ring-1 ring-white/10">
              <img src={v.thumbnail || '/images/video/placeholder.svg'} alt={v.title} className="h-full w-full object-cover object-center" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-black/50 ring-1 ring-white/30" />
              </div>
            </div>
            <h3 className="text-base font-semibold text-white/90">{v.title}</h3>
            {v.description ? <p className="mt-1 text-sm text-white/65">{v.description}</p> : null}
            <div className="mt-3 flex gap-2">
              <button onClick={() => { setOpenIndex(idx); setTab(v.src ? 'video' : 'script') }} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/85 transition hover:border-gold/40 hover:text-white">{v.src ? 'Play' : 'View Script'}</button>
              <button onClick={() => { setOpenIndex(idx); setTab('script') }} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/85 transition hover:border-gold/40 hover:text-white">Script</button>
            </div>
          </article>
        ))}
      </div>

      {openIndex !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpenIndex(null)} />
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
                  <video key={`video-${openIndex}`} src={derived[openIndex]?.src} poster={derived[openIndex]?.thumbnail || '/images/video/placeholder.svg'} controls preload="metadata" className="h-auto w-full rounded-xl ring-1 ring-white/15" />
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

