interface MapEmbedProps {
  lat?: number
  lng?: number
  zoom?: number
  ratio?: number
  locale?: string
}

export default function MapEmbed({ lat = 3.15494, lng = 101.59737, zoom = 17, ratio = 9 / 16, locale = 'en' }: MapEmbedProps){
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=${locale}&output=embed`

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10">
      <div style={{ paddingBottom: `${ratio * 100}%` }} />
      <iframe
        title="Metaphysics Alliance Map"
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
