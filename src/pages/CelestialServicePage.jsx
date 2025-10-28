import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Banner from '../components/Banner.jsx';
import SectionDivider from '../components/SectionDivider.jsx';
import { useI18n } from '../i18n.jsx';

const placeholderStyles =
  'flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white/60 text-sm uppercase tracking-wide';

const Card = ({ section }) => (
  <div className="card-3d p-6 md:p-8 flex flex-col md:flex-row gap-6">
    <div className="w-full md:w-1/3 aspect-video md:aspect-square">
      {section.imageUrl ? (
        <img
          src={section.imageUrl}
          alt={section.title || 'Service Image'}
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <div className={`${placeholderStyles} w-full h-full`}>
          {section.imageLabel || 'Visual Preview'}
        </div>
      )}
    </div>
    <div className="flex-1 space-y-4">
      {section.title ? (
        <h3 className="text-2xl font-semibold text-gold">{section.title}</h3>
      ) : null}
      {section.body ? (
        <p className="text-white/75 leading-relaxed">{section.body}</p>
      ) : null}
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

const GallerySection = ({ images = [] }) => (
  <div className="container">
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((image) => (
        <figure key={image.src} className="card-3d overflow-hidden rounded-xl">
          <img
            src={image.src}
            alt={image.alt || image.label || 'Service visual'}
            className="h-full w-full object-cover"
          />
          {image.label || image.caption ? (
            <figcaption className="px-4 py-3 text-sm text-white/70">
              {image.label || image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  </div>
);

export default function CelestialServicePage({ serviceKey }) {
  const { t, lang } = useI18n();

  let data = null;

  if (serviceKey) {
    const dictValue = t(`services.${serviceKey}`);
    if (dictValue && typeof dictValue === 'object') {
      data = dictValue;
    }
  }

  if (!data) {
    return null;
  }

  const sections = Array.isArray(data.sections) ? data.sections : [];
  const galleryImages = Array.isArray(data.gallery) ? data.gallery : [];
  const galleryDividerTitle = data.galleryDividerTitle;
  const galleryDividerSubtitle = data.galleryDividerSubtitle;
  const cta = data.cta;

  const primaryLabel = (() => {
    if (serviceKey === 'taiyiNumbers') {
      return lang === 'CN' ? '开启太乙推策' : 'Start Tai Yi Computation';
    }
    if (typeof cta?.primaryLabel === 'string') {
      if (cta.primaryLabel.includes('｜')) {
        const [en, cn] = cta.primaryLabel.split('｜');
        return (lang === 'CN' ? cn || en : en || cn)?.trim?.() || cta.primaryLabel;
      }
      return cta.primaryLabel;
    }
    return lang === 'CN' ? '立即预约' : 'Book now';
  })();

  const secondaryLabel = (() => {
    if (!cta?.secondaryLabel) return null;
    if (cta.secondaryLabel.includes('｜')) {
      const [en, cn] = cta.secondaryLabel.split('｜');
      return (lang === 'CN' ? cn || en : en || cn)?.trim?.() || cta.secondaryLabel;
    }
    return cta.secondaryLabel;
  })();

  const primaryHref = cta?.primaryHref || '/contact';
  const secondaryHref = cta?.secondaryHref || null;
  const primaryClass = 'px-5 py-2.5 rounded-lg bg-gold text-black font-semibold shadow-soft-xl hover:brightness-110 transition';

  return (
    <main className="space-y-14 pb-20">
      <SEOService lang={lang} title={data.title} description={data.subtitle} />
      <Banner
        title={data.title}
        sub={data.badge}
        description={data.subtitle}
        showDefaultCta={Boolean(primaryLabel)}
        ctaLabel={primaryLabel}
        ctaHref={primaryHref}
        ctaClassName={primaryClass}
      />

      <div className="space-y-16">
        {sections.map((section) => (
          <section
            key={section.key ?? section.title}
            className="space-y-6"
          >
            <SectionDivider
              title={section.dividerTitle}
              subtitle={section.dividerSubtitle}
            />
            <div className="container">
              <Card section={section} />
            </div>
          </section>
        ))}

        {galleryImages.length ? (
          <section className="space-y-6">
            <SectionDivider
              title={galleryDividerTitle}
              subtitle={galleryDividerSubtitle}
            />
            <GallerySection images={galleryImages} />
          </section>
        ) : null}

        {cta ? (
          <section className="space-y-6">
            <SectionDivider
              title={cta.dividerTitle}
              subtitle={cta.dividerSubtitle}
            />
            <div className="container">
              <div className="card-3d p-6 md:p-8 text-center space-y-4">
                {cta.title ? (
                  <h3 className="text-2xl font-semibold text-gold">{cta.title}</h3>
                ) : null}
                {cta.message ? (
                  <p className="text-white/75 md:text-lg leading-relaxed">{cta.message}</p>
                ) : null}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                  <Link
                    to={primaryHref}
                    className={primaryClass}
                  >
                    {primaryLabel}
                  </Link>
                  {secondaryHref && secondaryLabel ? (
                    <Link
                      to={secondaryHref}
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

function SEOService({ lang, title, description }) {
  useEffect(() => {
    const path = window.location.pathname;
    document.title = `${title || 'Service'} | Metaphysics Alliance`;

    const setMeta = (name, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const setOg = (property, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    const desc = (description || '').slice(0, 160);
    setMeta('description', desc);
    setLink('canonical', path);
    setOg('og:title', title);
    setOg('og:description', desc);
    setOg('og:image', '/images/og-default.jpg');

    const json = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang, item: `/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `/${lang}/services` },
        { '@type': 'ListItem', position: 3, name: title, item: path },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(json);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [lang, title, description]);

  return null;
}
