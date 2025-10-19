// src/components/MapCard.jsx
import MapEmbed from './MapEmbed.jsx'
import { useI18n } from '../i18n.jsx'

export default function MapCard({ variant = 'section', id = 'location', className = '' } = {}){
  const { lang } = useI18n()

  const title = lang === 'EN'
    ? 'Metaphysics Alliance · Menara Mitraland, Kota Damansara'
    : '玄域联盟 · Menara Mitraland（Kota Damansara）'

  const lines = [
    'Menara Mitraland,',
    '13A, Jalan PJU 5/1, Kota Damansara,',
    '47810 Petaling Jaya, Selangor,',
    'Malaysia.'
  ]

  const email = 'sales@meta-alliance.my'
  const whatsappDisplay = '+60-16-587-3141'
  const whatsappLink = 'https://wa.me/60165873141'

  const lat = 3.15494
  const lng = 101.59737
  const zoom = 18
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`

  const cardClasses = ['card-3d p-6 md:p-8', className].filter(Boolean).join(' ')

  const card = (
    <div className={cardClasses}>
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        <div className="text-white/85 text-sm leading-relaxed">
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="whitespace-pre-line">{lines.join('\n')}</p>

          <div className="mt-3 space-y-1">
            <p>
              <span className="text-white/60">{lang === 'EN' ? 'Email' : '邮箱'}: </span>
              <a href={`mailto:${email}`} className="text-gold hover:underline">{email}</a>
            </p>
            <p>
              <span className="text-white/60">{lang === 'EN' ? 'WhatsApp' : '微信/WhatsApp'}: </span>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">{whatsappDisplay}</a>
            </p>
            <p className="text-white/60 mt-2">{lang === 'EN' ? 'Appointments by booking only.' : '仅限预约来访。'}</p>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden ring-1 ring-white/10 bg-black/20 backdrop-blur-lg">
          <MapEmbed lat={lat} lng={lng} zoom={zoom} ratio={9/21} lang={lang === 'EN' ? 'en' : 'zh-CN'} />

          <div className="absolute top-2 left-2 z-10">
            <div className="px-3 py-1.5 rounded-lg bg-black/35 backdrop-blur-md border border-white/15 text-white/90 text-xs shadow-soft">
              <strong>Menara Mitraland</strong><br />
              13A, Jalan PJU 5/1, Kota Damansara
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={lang === 'EN' ? 'Open in Google Maps (new tab)' : '在新标签页打开 Google 地图'}
            title={lang === 'EN' ? 'Open in Google Maps' : '打开 Google 地图'}
            className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/35 backdrop-blur-md border border-white/15 text-white/90 text-xs hover:bg-black/55 hover:border-gold/40 transition"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
              <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
            </svg>
            {lang === 'EN' ? 'Open in Google Maps' : '在 Google 地图中打开'}
          </a>
        </div>
      </div>
    </div>
  )

  if (variant === 'inline'){
    return card
  }

  return (
    <section id={id} className="container py-12">
      {card}
    </section>
  )
}
