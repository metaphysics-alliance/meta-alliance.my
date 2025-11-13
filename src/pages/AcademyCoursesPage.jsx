import { useEffect } from 'react';
/* eslint-disable import/order */
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import Banner from '../components/Banner.jsx';
import SectionDivider from '../components/SectionDivider.jsx';
import CTAButton from '../components/CTAButton.jsx';

const noopArray = [];

export default function AcademyCoursesPage() {
  const { t } = useI18n();
  const overview = t('academyOverview') || {};
  const foundation = t('academyFoundation') || {};
  const sections = Array.isArray(overview.sections) ? overview.sections : noopArray;
  const foundationFaq = Array.isArray(foundation.faq) ? foundation.faq : noopArray;
  const primaryTextSection = sections.find((section) => section.type === 'text');
  const heroDescription = Array.isArray(primaryTextSection?.paragraphs) ? primaryTextSection.paragraphs[0] : null;

  useEffect(() => {
    document.title = `${overview.title || 'Courses Overview'} | Metaphysics Alliance`;
  }, [overview.title]);

  return (
    <main className="space-y-14 pb-20">
      <Banner title={overview.title} sub={overview.badge} description={heroDescription || overview.subtitle} />

      <div className="space-y-16">
        {sections.map((section) => (
          <SectionBlock key={section.key ?? section.dividerTitle ?? section.title} section={section} />
        ))}

        {foundationFaq.length ? <FoundationFaq items={foundationFaq} lang={overview.lang} /> : null}

        {overview.cta ? <CtaBlock cta={overview.cta} /> : null}
      </div>
    </main>
  );
}

function FoundationFaq({ items, lang: _lang }) {
  const isEN = _lang === 'EN';
  return (
    <section className="space-y-6">
      <SectionDivider
        title={isEN ? 'Course FAQs' : '课程常见问题'}
        subtitle={isEN ? 'Answers before you enrol' : '报名前的关键答疑'}
      />
      <div className="container grid gap-5 md:grid-cols-2">
        {items.map((item, idx) => (
          <details
            key={item.question + '-' + idx}
            className="rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5 backdrop-blur transition open:bg-black/30"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
              <h4 className="text-base font-semibold text-white md:text-lg">{item.question}</h4>
              <span className="mt-0.5 min-w-[64px] rounded-md border border-white/15 px-2 text-center text-xs text-white/70">
                {isEN ? 'Expand' : '展开'}
              </span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed text-white/80">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

function SectionBlock({ section }) {
  const title = section.dividerTitle || section.title || '';
  const subtitle = section.dividerSubtitle || '';

  return (
    <section className="space-y-6">
      <SectionDivider title={title} subtitle={subtitle} />
      <div className="container">
        {renderSectionContent(section)}
      </div>
    </section>
  );
}

function renderSectionContent(section) {
  const type = section.type || 'text';

  if (type === 'levels') {
    const levels = Array.isArray(section.levels) ? section.levels : noopArray;
    return (
      <div className="space-y-6">
        {section.title ? <h3 className="text-2xl font-semibold text-white">{section.title}</h3> : null}
        {section.intro ? <p className="text-white/70 md:text-lg">{section.intro}</p> : null}
        <div className="grid gap-6 md:grid-cols-2">
          {levels.map((level) => (
            <LevelCard key={level.key ?? level.title} level={level} />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'bullets') {
    return (
      <article className="card-3d space-y-4 p-6 md:p-10">
        {section.title ? <h3 className="text-2xl font-semibold text-white">{section.title}</h3> : null}
        {Array.isArray(section.points) && section.points.length ? (
          <ul className="space-y-2 text-base leading-relaxed text-white/75">
            {section.points.map((point, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold-soft/80" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    );
  }

  if (type === 'details') {
    return (
      <article className="card-3d space-y-6 p-6 md:p-10">
        {section.title ? <h3 className="text-2xl font-semibold text-white">{section.title}</h3> : null}
        {section.body ? <p className="text-white/70">{section.body}</p> : null}
        <ul className="divide-y divide-white/10 text-white/75">
          {(section.details ?? noopArray).map((detail, idx) => (
            <li key={`${detail.label ?? idx}-${detail.value ?? idx}`} className="flex flex-col justify-between gap-2 py-3 md:flex-row md:items-center">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-soft">{detail.label}</span>
              <span className="text-base text-white/80">{detail.value}</span>
            </li>
          ))}
        </ul>
      </article>
    );
  }

  const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : noopArray;

  return (
    <article className="card-3d space-y-4 p-6 md:p-10">
      {section.title ? <h3 className="text-2xl font-semibold text-white">{section.title}</h3> : null}
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className="text-base leading-relaxed text-white/75">
          {paragraph}
        </p>
      ))}
    </article>
  );
}

function LevelCard({ level }) {
  const href = resolveCourseHref(level.slug);
  const anchorId = level.anchor || undefined;

  return (
    <article id={anchorId} className="card-3d flex flex-col justify-between space-y-4 p-6 md:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/60">
          {level.badge ? <span className="font-semibold text-gold-soft">{level.badge}</span> : null}
          {level.duration ? (
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/70">
              {level.duration}
            </span>
          ) : null}
        </div>
        {level.title ? <h4 className="text-xl font-semibold text-white md:text-2xl">{level.title}</h4> : null}
        {level.body ? <p className="text-white/75">{level.body}</p> : null}
      </div>

      {level.ctaLabel && href ? (
        href.startsWith('#') ? (
          <CTAButton href={href} size="md" className="border border-gold/50 bg-transparent text-gold hover:bg-gold/10">
            {level.ctaLabel}
          </CTAButton>
        ) : (
          <CTAButton to={href} size="md" className="border border-gold/50 bg-transparent text-gold hover:bg-gold/10">
            {level.ctaLabel}
          </CTAButton>
        )
      ) : null}
    </article>
  );
}

function CtaBlock({ cta }) {
  const href = resolveCtaHref(cta.primaryHref);

  return (
    <section className="space-y-6">
      <SectionDivider title={cta.dividerTitle || ''} subtitle={cta.dividerSubtitle || ''} />
      <div className="container">
        <div className="card-3d space-y-4 p-6 text-center md:p-10">
          {cta.title ? <h3 className="text-2xl font-semibold text-white md:text-3xl">{cta.title}</h3> : null}
          {cta.message ? <p className="text-white/75 md:text-lg">{cta.message}</p> : null}
          {cta.primaryLabel && href ? (
            href.startsWith('#') ? (
              <CTAButton href={href} size="lg">
                {cta.primaryLabel}
              </CTAButton>
            ) : (
              <CTAButton to={href} size="lg">
                {cta.primaryLabel}
              </CTAButton>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}

function resolveCourseHref(slug) {
  if (!slug) return null;
  switch (slug) {
    case 'foundation':
      return '/academy/foundation';
    case 'beginner':
      return '/academy/beginner';
    case 'advanced':
      return '/academy/intermediate';
    case 'professional':
      return '/academy/professional';
    default:
      return '/academy/courses';
  }
}

function resolveCtaHref(href) {
  if (!href) return '/pricing';
  if (href.startsWith('#')) return href;
  if (href.startsWith('http')) return href;
  return href.startsWith('/') ? href : `/${href}`;
}
