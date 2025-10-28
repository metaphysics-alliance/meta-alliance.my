/* eslint-disable import/order, import/no-named-as-default */
import dictionary from '../../shared/i18n/dictionary.js';
import { useI18n } from '../i18n.jsx';
import Banner from './Banner.jsx';

function SummaryCard({ title, description }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-soft-xl backdrop-blur">
      {title ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          {title}
        </p>
      ) : null}
      {description ? (
        <p
          className="mt-3 text-sm leading-relaxed text-white/70"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : null}
    </article>
  );
}

function SectionItem({ title, description, legal, bullets }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      {title ? <h3 className="text-base font-semibold text-white">{title}</h3> : null}
      {description ? (
        <p
          className="mt-2 text-sm leading-relaxed text-white/70"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : null}
      {Array.isArray(bullets) && bullets.length ? (
        <ul className="mt-3 space-y-2 text-sm text-white/65 list-disc list-inside">
          {bullets.map((bullet, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: bullet }} />
          ))}
        </ul>
      ) : null}
      {legal ? (
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/45">
          {legal}
        </p>
      ) : null}
    </div>
  );
}

function SectionColumn({ title, points }) {
  return (
    <div className="space-y-3">
      {title ? <h3 className="text-base font-semibold text-white">{title}</h3> : null}
      {Array.isArray(points) && points.length ? (
        <ul className="space-y-2 text-sm leading-relaxed text-white/70 list-disc list-inside">
          {points.map((point, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function LegalPage({ policyKey }) {
  const { lang } = useI18n();
  const policy = dictionary?.[lang]?.legal?.[policyKey];

  if (!policy) {
    return (
      <main className="container py-16 text-white/75">
        <h1 className="title-gradient text-3xl font-semibold mb-4 pb-[10px]">
          {lang === 'CN' ? '未找到政策' : 'Policy Not Found'}
        </h1>
        <p>{lang === 'CN' ? '请求的政策暂时不可用。' : 'The requested policy is not available.'}</p>
      </main>
    );
  }

  const summary = Array.isArray(policy.summary) ? policy.summary : [];
  const sections = Array.isArray(policy.sections) ? policy.sections : [];
  const fallbackParagraphs = Array.isArray(policy.paragraphs) ? policy.paragraphs : [];
  const contact = policy.contact ?? null;
  const isCN = lang === 'CN';

  return (
    <main className="space-y-12 md:space-y-16 pb-16">
      <Banner title={policy.title} description={policy.intro} />

      {summary.length ? (
        <section className="container -mt-12">
          <div className="grid gap-4 md:grid-cols-3">
            {summary.map((item, index) => (
              <SummaryCard key={index} {...item} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="container space-y-12 text-white/75">
        {policy.last_updated ? (
          <p className="text-sm text-white/50">
            {isCN ? '最后更新：' : 'Last Updated: '}
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
                      <SectionItem key={itemIndex} {...item} />
                    ))}
                  </div>
                ) : null}

                {Array.isArray(section.columns) && section.columns.length ? (
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {section.columns.map((column, columnIndex) => (
                      <SectionColumn key={columnIndex} {...column} />
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

        {contact || policy.downloadUrl ? (
          <div className="rounded-3xl border border-white/15 bg-black/40 p-8 backdrop-blur space-y-6">
            {contact ? (
              <>
                <h2 className="text-xl font-semibold text-white">
                  {isCN ? '联系我们的隐私专员' : 'Contact our Data Protection Lead'}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 text-sm text-white/70">
                    {contact.name ? <p className="font-semibold text-white">{contact.name}</p> : null}
                    {contact.email ? (
                      <p>
                        <span className="text-white/50">{isCN ? '电子邮箱：' : 'Email: '}</span>
                        <a className="text-gold hover:underline" href={`mailto:${contact.email}`}>
                          {contact.email}
                        </a>
                      </p>
                    ) : null}
                    {contact.phone ? (
                      <p>
                        <span className="text-white/50">{isCN ? '电话：' : 'Phone: '}</span>
                        <a className="text-gold hover:underline" href={`tel:${contact.phone}`}>
                          {contact.phone}
                        </a>
                      </p>
                    ) : null}
                    {contact.hours ? (
                      <p>
                        <span className="text-white/50">{isCN ? '回复时间：' : 'Response window: '}</span>
                        {contact.hours}
                      </p>
                    ) : null}
                  </div>
                  {contact.address ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/70">
                      <p className="text-white/60">{isCN ? '邮寄地址' : 'Postal address'}</p>
                      <p className="mt-2 whitespace-pre-line">{contact.address}</p>
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}

            {policy.downloadUrl ? (
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                <p className="text-sm text-white/60">
                  {isCN
                    ? '需要离线版本？点击即可下载 PDF，以便备份或分享给团队。'
                    : 'Need an offline copy? Download the PDF for easy sharing and archival.'}
                </p>
                <a
                  href={policy.downloadUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-soft"
                >
                  {isCN ? '下载 PDF 版本' : 'Download PDF Version'}
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}
