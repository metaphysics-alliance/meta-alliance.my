import { useEffect, useRef, useState } from 'react'

/**
 * MapEmbedWide — MAP-ONLY Google iframe (no side text), wide aspect.
 * - Default aspect: 24:9 (wider, not taller)
 * - Lazy-loads iframe near viewport
 * - No API key required
 *
 * Props:
 *   query?: string
 *   embedUrl?: string   // overrides query
 *   aspectW?: number    // default 24
 *   aspectH?: number    // default 9
 *   maxWidth?: number   // default undefined (full container width)
 *   className?: string
 *   rounded?: boolean   // default true
 *   zoom?: number       // default 16
 */
export default function MapEmbedWide({
  query = 'Inspace Co-Working & Serviced Office, Kota Damansara (Mitraland)',
  embedUrl,
  aspectW = 24,
  aspectH = 9,
  maxWidth,
  className = '',
  rounded = true,
  zoom = 16,
}) {
  const [src, setSrc] = useState('')
  const holderRef = useRef(null)

  useEffect(() => {
    const el = holderRef.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const url = embedUrl || `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`
          setSrc(url)
          io.disconnect()
        }
      })
    }, { rootMargin: '240px' })
    io.observe(el)
    return () => io.disconnect()
  }, [query, embedUrl, zoom])

  const radius = rounded ? 'rounded-2xl' : ''

  return (
    <section id="map" className={`container py-10 ${className}`}>
      <div
        className={`mx-auto w-full ${radius} overflow-hidden ring-1 ring-white/10 bg-black/15 backdrop-blur-md`}
        style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
      >
        <div ref={holderRef} className="relative w-full" style={{ aspectRatio: `${aspectW} / ${aspectH}` }}>
          {src ? (
            <iframe
              src={src}
              title="Google Map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}
        </div>
      </div>
    </section>
  )
}
