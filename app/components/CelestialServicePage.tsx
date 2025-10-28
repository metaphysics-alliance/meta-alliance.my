import Link from 'next/link';

import Hero from './Hero';
import SectionDivider from './SectionDivider';
import { getDict, type Locale } from '@/lib/i18n';

const placeholderStyles = 'flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white/60 text-sm uppercase tracking-wide';

type GalleryImage = {
  src: string;
  alt?: string;
  label?: string;
  caption?: string;
};

const Card = ({ section }) => (
  <div className="card-3d p-6 md:p-8 flex flex-col md:flex-row gap-6">
    <div className="w-full md:w-1/3 aspect-video md:aspect-square">
      {section.imageUrl ? (
        <img src={section.imageUrl} alt={section.title || 'Service Image'} className="w-full h-full object-cover rounded-xl" />
      ) : (
        <div className={`${placeholderStyles} w-full h-full`}>{section.imageLabel || 'Visual Preview'}</div>
      )}
    </div>
    <div className="flex-1 space-y-4">
      {section.title ? <h3 className="text-2xl font-semibold text-gold">{section.title}</h3> : null}
      {section.body ? <p className="text-white/75 leading-relaxed">{section.body}</p> : null}
      {Array.isArray(section.points) && section.points.length ? (
        <ul className="space-y-2 text-white/70 list-disc list-inside">
          {section.points.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  </div>
);

const GallerySection = ({ images }: { images: GalleryImage[] }) => (
  <div className="container">
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((image) => (
        <figure key={image.src} className="card-3d overflow-hidden rounded-xl">
          <img src={image.src} alt={image.alt || image.label || 'Service visual'} className="h-full w-full object-cover" />
          {image.label || image.caption ? (
            <figcaption className="px-4 py-3 text-sm text-white/70">{image.label || image.caption}</figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  </div>
);

interface Props {
  serviceKey: string;
  lang?: string;
}

export default function CelestialServicePage({ serviceKey, lang = 'EN' }: Props) {
  const localeKey = (lang || 'EN').toUpperCase() as Locale;
  const dict = getDict(localeKey);
  const data = serviceKey ? dict.services?.[serviceKey] : null;

  if (!data || typeof data !== 'object') {
    return null;
  }

  const sections = Array.isArray(data.sections) ? data.sections : [];
  const galleryImages: GalleryImage[] = Array.isArray(data.gallery) ? data.gallery : [];
  const galleryDividerTitle = data.galleryDividerTitle;
  const galleryDividerSubtitle = data.galleryDividerSubtitle;
  const cta = data.cta;

  const primaryLabel = (() => {
    if (!cta?.primaryLabel) {
      return lang === 'CN' ? '立即预约' : 'Book now';
    }
    if (cta.primaryLabel.includes('|')) {
      const [en, cn] = cta.primaryLabel.split('|');
      const resolved = localeKey === 'CN' ? cn || en : en || cn;
      return resolved?.trim?.() || cta.primaryLabel;
    }
    return cta.primaryLabel;
  })();

  const secondaryLabel = (() => {
    if (!cta?.secondaryLabel) {
      return null;
    }
    if (cta.secondaryLabel.includes('|')) {
      const [en, cn] = cta.secondaryLabel.split('|');
      const resolved = localeKey === 'CN' ? cn || en : en || cn;
      return resolved?.trim?.() || cta.secondaryLabel;
    }
    return cta.secondaryLabel;
  })();

  const primaryHref = cta?.primaryHref || '/contact';
  const primaryClass = 'px-5 py-2.5 rounded-lg bg-gold text-black font-semibold shadow-soft-xl hover:brightness-110 transition';
  const secondaryHref = cta?.secondaryHref || null;

  return (
    <main className="space-y-14 pb-20">
      <Hero
        title={data.title}
        sub={data.badge}
        description={data.subtitle}
        showDefaultCta={Boolean(primaryLabel)}
        ctaLabel={primaryLabel}
        ctaHref={primaryHref}
        locale={localeKey}
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

        {cta ? (
          <section className="space-y-6">
            <SectionDivider title={cta.dividerTitle} subtitle={cta.dividerSubtitle} />
            <div className="container">
              <div className="card-3d p-6 md:p-8 text-center space-y-4">
                {cta.title ? <h3 className="text-2xl font-semibold text-gold">{cta.title}</h3> : null}
                {cta.message ? <p className="text-white/75 md:text-lg leading-relaxed">{cta.message}</p> : null}
                <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href={primaryHref} prefetch={false} className={primaryClass}>
                    {primaryLabel}
                  </Link>
                  {secondaryHref && secondaryLabel ? (
                    <Link
                      href={secondaryHref}
                      prefetch={false}
                      className="px-5 py-2.5 rounded-lg border border-gold/50 text-gold hover:bg-gold/10 transition"
                    >
                      {secondaryLabel}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
