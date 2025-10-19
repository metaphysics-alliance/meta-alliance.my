import Banner from './Banner';
import { Link } from 'next/link';

import MapCard from './MapCard';
import Newsletter from './Newsletter';
import SectionDivider from './SectionDivider';
import { useI18n } from '../lib/i18n';

const placeholderStyles = 'flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white/60 text-sm uppercase tracking-wide'

type GalleryImage = {
  src: string
  alt?: string
  label?: string
  caption?: string
}

const Card = ({ section }) => (
  <div className="card-3d p-6 md:p-8 flex flex-col md:flex-row gap-6">
    <div className="w-full md:w-1/3 aspect-video md:aspect-square">
      {section.imageUrl ? (
        <img src={section.imageUrl} alt={section.title || 'Service Image'} className="w-full h-full object-cover rounded-xl" />
      ) : (
        <div className={`${placeholderStyles} w-full h-full`}>
          {section.imageLabel || 'Visual Preview'}
        </div>
      )}
    </div>
    <div className="flex-1 space-y-4">
      {section.title ? <h3 className="text-2xl font-semibold text-gold">{section.title}</h3> : null}
      {section.body ? <p className="text-white/75 leading-relaxed">{section.body}</p> : null}
      {Array.isArray(section.points) && section.points.length ? (
        <ul className="space-y-2 text-white/70 list-disc list-inside">
          {section.points.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      ) : null}
    </div>
  </div>
)

const GallerySection = ({ images }: { images: GalleryImage[] }) => (
  <div className="container">
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((image) => (
        <figure key={image.src} className="card-3d overflow-hidden rounded-xl">
          <img src={image.src} alt={image.alt || image.label || 'Service visual'} className="h-full w-full object-cover" />
          {(image.label || image.caption) ? (
            <figcaption className="px-4 py-3 text-sm text-white/70">
              {image.label || image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  </div>
)

export default function CelestialServicePage({ serviceKey, lang }){
  const { t } = useI18n()

  let data = null

  if (serviceKey){
    const dictValue = t(`services.${serviceKey}`)
    if (dictValue && typeof dictValue === 'object'){
      data = dictValue
    }
  }

  if (!data){
    return null
  }

  const sections = Array.isArray(data.sections) ? data.sections : []
  const galleryImages: GalleryImage[] = Array.isArray(data.gallery) ? data.gallery : []
  const galleryDividerTitle = data.galleryDividerTitle
  const galleryDividerSubtitle = data.galleryDividerSubtitle

  return (
    <main className="space-y-14 pb-20">
      <Banner
        title={data.title}
        sub={data.badge}
        description={data.subtitle}
      />

      <div className="space-y-16">
        {sections.map((section) => (
          <section key={section.key ?? section.title} className="space-y-6">
            <SectionDivider title={section.dividerTitle} subtitle={section.dividerSubtitle} />
            <div className="container">
              <Card section={section} />
            </div>
          </section>
        ))}

        {galleryImages.length ? (
          <section className="space-y-6">
            <SectionDivider title={galleryDividerTitle} subtitle={galleryDividerSubtitle} />
            <GallerySection images={galleryImages} />
          </section>
        ) : null}
      </div>
    </main>
  )
}
