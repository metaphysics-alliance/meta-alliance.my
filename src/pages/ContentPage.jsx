import { Link } from 'react-router-dom'

export default function ContentPage({ title, intro, sections = [], cta }){
  return (
    <main className="container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-gold mb-4">{title}</h1>
        {intro ? <p className="text-white/80 leading-relaxed text-lg mb-8">{intro}</p> : null}

        <div className="space-y-10">
          {sections.map((section, index) => (
            <section key={index} className="bg-black/20 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              {section.heading ? (
                <h2 className="text-xl font-semibold text-white mb-3">{section.heading}</h2>
              ) : null}
              {section.body ? (
                <p className="text-white/75 leading-relaxed">{section.body}</p>
              ) : null}
              {Array.isArray(section.bullets) && section.bullets.length ? (
                <ul className="mt-4 space-y-2 text-white/75 list-disc list-inside">
                  {section.bullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {cta ? (
          <div className="mt-12 text-center">
            <p className="text-white/70 mb-4">{cta.body}</p>
            <Link
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gold/40 text-gold hover:bg-gold/15 transition"
              to={cta.href}
            >
              {cta.label}
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  )
}
