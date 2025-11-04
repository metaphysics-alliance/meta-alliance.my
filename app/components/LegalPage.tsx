import Hero from '@/components/Hero';
import { getDict, type Locale } from '@/lib/i18n';

interface LegalPageProps {
  policyKey: string;
  locale: Locale;
}

interface PolicySummaryItem {
  title?: string;
  description?: string;
}

interface PolicySectionItem {
  title?: string;
  description?: string;
  legal?: string;
  bullets?: string[];
}

interface PolicySectionColumn {
  title?: string;
  points?: string[];
}

interface PolicySection {
  heading?: string;
  intro?: string;
  items?: PolicySectionItem[];
  bullets?: string[];
  columns?: PolicySectionColumn[];
  note?: string;
}

interface PolicyContact {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
}

export default function LegalPage({ policyKey, locale }: LegalPageProps) {
  const dict = getDict(locale);
  const policy = dict.legal?.[policyKey];

  if (!policy) {
    return (
      <div className="space-y-10">
        <Hero title="Policy Not Found" locale={locale} />
        <div className="container py-10 text-white/75">
          <p>The requested legal policy could not be found.</p>
        </div>
      </div>
    );
  }

  const summary: PolicySummaryItem[] = Array.isArray(policy.summary) ? policy.summary : [];
  const sections: PolicySection[] = Array.isArray(policy.sections) ? policy.sections : [];
  const fallbackParagraphs: string[] = Array.isArray(policy.paragraphs) ? policy.paragraphs : [];
  const contact: PolicyContact | undefined = policy.contact;

  return (
    <div className="space-y-12 md:space-y-16">
      <Hero
        title={policy.title}
        description={policy.intro}
        className="bg-black/40 backdrop-blur-xl"
        locale={locale}
      />

      {summary.length ? (
        <section className="container">
          <div className="grid gap-4 md:grid-cols-3">
            {summary.map((item, index) => (
              <article
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-soft-xl backdrop-blur"
              >
                {item.title ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                    {item.title}
                  </p>
                ) : null}
                {item.description ? (
                  <p
                    className="mt-3 text-sm leading-relaxed text-white/70"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container space-y-12 text-white/75">
        {policy.last_updated ? (
          <p className="text-sm text-white/50">
            {locale === 'CN' ? '最后更新：' : 'Last Updated: '}
            {policy.last_updated}
          </p>
        ) : null}

        {sections.length
          ? sections.map((section, index) => (
              <article
                key={index}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-soft-xl backdrop-blur"
              >
                {section.heading ? (
                  <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
                ) : null}
                {section.intro ? (
                  <p
                    className="mt-3 text-base leading-relaxed text-white/70"
                    dangerouslySetInnerHTML={{ __html: section.intro }}
                  />
                ) : null}

                {Array.isArray(section.items) && section.items.length ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="rounded-2xl border border-white/10 bg-black/30 p-5"
                      >
                        {item.title ? (
                          <h3 className="text-base font-semibold text-white">{item.title}</h3>
                        ) : null}
                        {item.description ? (
                          <p
                            className="mt-2 text-sm leading-relaxed text-white/70"
                            dangerouslySetInnerHTML={{ __html: item.description }}
                          />
                        ) : null}
                        {Array.isArray(item.bullets) && item.bullets.length ? (
                          <ul className="mt-3 space-y-2 text-sm text-white/65 list-disc list-inside">
                            {item.bullets.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} dangerouslySetInnerHTML={{ __html: bullet }} />
                            ))}
                          </ul>
                        ) : null}
                        {item.legal ? (
                          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/45">
                            {item.legal}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {Array.isArray(section.columns) && section.columns.length ? (
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {section.columns.map((column, columnIndex) => (
                      <div key={columnIndex} className="space-y-3">
                        {column.title ? (
                          <h3 className="text-base font-semibold text-white">{column.title}</h3>
                        ) : null}
                        {Array.isArray(column.points) && column.points.length ? (
                          <ul className="space-y-2 text-sm leading-relaxed text-white/70 list-disc list-inside">
                            {column.points.map((point, pointIndex) => (
                              <li key={pointIndex} dangerouslySetInnerHTML={{ __html: point }} />
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {Array.isArray(section.bullets) && section.bullets.length ? (
                  <ul className="mt-6 space-y-2 text-base leading-relaxed text-white/70 list-disc list-inside">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} dangerouslySetInnerHTML={{ __html: bullet }} />
                    ))}
                  </ul>
                ) : null}

                {section.note ? (
                  <p
                    className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm leading-relaxed text-gold"
                    dangerouslySetInnerHTML={{ __html: section.note }}
                  />
                ) : null}
              </article>
            ))
          : null}

        {!sections.length && fallbackParagraphs.length
          ? fallbackParagraphs.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))
          : null}

        {contact ? (
          <div className="rounded-3xl border border-white/15 bg-black/40 p-8 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">
              {locale === 'CN' ? '联系支持团队' : 'Contact Our Support Team'}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2 text-sm text-white/70">
                {contact.name ? <p className="font-semibold text-white">{contact.name}</p> : null}
                {contact.email ? (
                  <p>
                    <span className="text-white/50">
                      {locale === 'CN' ? '电子邮箱：' : 'Email: '}
                    </span>
                    <a
                      className="text-gold hover:underline"
                      href={`mailto:${contact.email}`}
                    >
                      {contact.email}
                    </a>
                  </p>
                ) : null}
                {contact.phone ? (
                  <p>
                    <span className="text-white/50">
                      {locale === 'CN' ? '电话：' : 'Phone: '}
                    </span>
                    <a className="text-gold hover:underline" href={`tel:${contact.phone}`}>
                      {contact.phone}
                    </a>
                  </p>
                ) : null}
                {contact.hours ? (
                  <p>
                    <span className="text-white/50">
                      {locale === 'CN' ? '回复时间：' : 'Response window: '}
                    </span>
                    {contact.hours}
                  </p>
                ) : null}
              </div>
              {contact.address ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/70">
                  <p className="text-white/60">
                    {locale === 'CN' ? '邮寄地址' : 'Postal address'}
                  </p>
                  <p className="mt-2 whitespace-pre-line">{contact.address}</p>
                </div>
              ) : null}
            </div>
            {policy.downloadUrl ? (
              <p className="mt-6">
                <a
                  href={policy.downloadUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-soft"
                >
                  {locale === 'CN' ? '下载 PDF 版本' : 'Download PDF version'}
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
