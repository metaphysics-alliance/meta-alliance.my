/* eslint-disable import/order */
import { useI18n } from '../i18n.jsx';
import Banner from '../components/Banner.jsx';
import SectionDivider from '../components/SectionDivider.jsx';
import CTAButton from '../components/CTAButton.jsx';

export default function AcademyCourseDetail({ courseKey = 'academyFoundation' }){
  const { t } = useI18n();
  const course = t(courseKey) || {};
  const hero = course.hero || {};
  const sections = Array.isArray(course.sections) ? course.sections : [];
  const cta = course.cta || null;

  const primaryHref = resolveHref(hero.primaryHref || '/pricing');
  const secondaryHref = resolveHref(hero.secondaryHref || '/academy/courses');

  const heroActions = [
    hero.primaryLabel && primaryHref ? { label: hero.primaryLabel, href: primaryHref } : null,
    hero.secondaryLabel && secondaryHref ? { label: hero.secondaryLabel, href: secondaryHref } : null,
  ].filter(Boolean);

  return (
    <main className="space-y-16 pb-20">
      <Banner
        title={hero.title || ''}
        sub={hero.badge}
        description={hero.subtitle}
        actions={heroActions}
        showDefaultCta={false}
      />

      {sections.map((section) => (
        <CourseSection key={section?.key || section?.title || section?.dividerTitle} section={section} />
      ))}

      {cta ? <CourseCta cta={cta} /> : null}
    </main>
  );
}

function CourseSection({ section }){
  if (!section) return null;
  const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
  const points = Array.isArray(section.points) ? section.points : [];

  return (
    <section className="space-y-6">
      <SectionDivider title={section.dividerTitle || ''} subtitle={section.dividerSubtitle || ''} />
      <div className="container">
        <article className="card-3d space-y-4 p-6 md:p-10">
          {section.title ? <h2 className="text-2xl font-semibold text-white md:text-3xl">{section.title}</h2> : null}
          {paragraphs.map((paragraph, idx) => (
            <p key={idx} className="text-base leading-relaxed text-white/75">
              {paragraph}
            </p>
          ))}
          {points.length ? (
            <ul className="grid gap-2 text-base leading-relaxed text-white/75 md:gap-3">
              {points.map((point, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gold-soft/80" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      </div>
    </section>
  );
}

function CourseCta({ cta }){
  const primaryHref = resolveHref(cta.primaryHref || '/pricing');
  const secondaryHref = resolveHref(cta.secondaryHref || '/academy/courses');

  return (
    <section className="space-y-6">
      <SectionDivider title={cta.dividerTitle || ''} subtitle={cta.dividerSubtitle || ''} />
      <div className="container">
        <div className="card-3d space-y-5 p-6 text-center md:p-10">
          {cta.title ? <h3 className="text-2xl font-semibold text-white md:text-3xl">{cta.title}</h3> : null}
          {cta.message ? <p className="text-white/75 md:text-lg">{cta.message}</p> : null}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {cta.primaryLabel && primaryHref ? (
              <CTAButton to={primaryHref} size="lg">
                {cta.primaryLabel}
              </CTAButton>
            ) : null}
            {cta.secondaryLabel && secondaryHref ? (
              <CTAButton to={secondaryHref} size="lg" className="border border-gold/50 bg-transparent text-gold hover:bg-gold/10">
                {cta.secondaryLabel}
              </CTAButton>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function resolveHref(href){
  if (!href) return null;
  if (href.startsWith('#') || href.startsWith('http')) return href;
  return href.startsWith('/') ? href : `/${href}`;
}
