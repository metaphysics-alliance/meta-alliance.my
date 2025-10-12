import { Link } from 'react-router-dom'

import Newsletter from '../components/Newsletter.jsx'
import SectionDivider from '../components/SectionDivider.jsx'
import { useI18n } from '../i18n.jsx'

const copyByLang = {
  EN: {
    hero: {
      badge: 'CRITICAL LOGO LOCK',
      title: 'Metaphysics Alliance',
      subtitle: 'We are the black-gold, cosmic blue strategy studio harmonising classical metaphysics with high-stakes human decisions.',
      primaryLabel: 'Work with us',
      primaryHref: '/contact',
      secondaryLabel: 'View celestial services',
      secondaryHref: '/services/celestial/destiny-algorithm',
      videoLabel: 'Watch founder message',
      videoHref: 'https://youtu.be/placeholder',
    },
    mission: {
      title: 'Mission and Vision',
      subtitle: 'Who we serve and why we exist',
      missionTitle: 'Mission',
      missionBody: 'Equip leaders with precise timing intelligence so every launch, hire and investment aligns with True Solar Time and classical charts.',
      visionTitle: 'Vision',
      visionBody: 'Build the most trusted metaphysics alliance in Asia Pacific, fusing research labs, digital tools and human mentorship into one Taiji-guided ecosystem.',
    },
    story: {
      title: 'Brand Story',
      subtitle: 'Milestones across the alliance',
      milestones: [
        {
          year: '2014',
          headline: 'Research collective forms',
          body: 'Shaun Tan and a small guild of consultants began codifying BaZi, Zi Wei and Qi Men correlations across 120 case files.',
        },
        {
          year: '2017',
          headline: 'True Solar Time lab built',
          body: 'We engineered proprietary calibration tables so every reading maps to the actual solar reference for latitude and longitude.',
        },
        {
          year: '2019',
          headline: 'Enterprise engagements',
          body: 'Family offices and growth stage founders commissioned multi-market destiny blueprints with on-site Feng Shui audits.',
        },
        {
          year: '2022',
          headline: 'Meta Alliance charter',
          body: 'Mission, values and quality controls formalised, creating a shared service desk and double-review protocol.',
        },
        {
          year: '2024',
          headline: 'Cosmic blueprint platform',
          body: 'Launched a secure client portal with Taiji halo visualisation, integrating analytics, video briefings and milestone tracking.',
        },
      ],
      dataPoints: [
        '850+ multivariate charts modelled',
        '92 percent repeat engagements year on year',
        '17 countries consulted virtually and on-site',
        'Black-gold archival studio in Kuala Lumpur HQ',
      ],
    },
    values: {
      title: 'Core Values',
      subtitle: 'Principles with proof of execution',
      items: [
        {
          title: 'Precision with proof',
          body: 'Every recommendation is cross-verified by at least two senior consultants before delivery.',
          proof: 'Documented dual sign-off in 100 percent of 2024 case files.',
        },
        {
          title: 'Client-centred storytelling',
          body: 'We translate dense metaphysical language into decision-ready strategy narratives.',
          proof: 'Average NPS 9.4 across enterprise accounts.',
        },
        {
          title: 'Sacred confidentiality',
          body: 'Data vaultrooms encrypt charts, audio and transcripts with rotating access keys.',
          proof: 'Zero data incidents in eleven years of operations.',
        },
        {
          title: 'Research obsession',
          body: 'Weekly Taiji halo calibration sprints keep the alliance ahead of cosmic shifts.',
          proof: 'Internal R and D team publishes quarterly timing bulletins.',
        },
        {
          title: 'Embodied integrity',
          body: 'Our consultants practice the rituals we recommend, grounding insights in lived experience.',
          proof: 'Mandatory annual retreat for re-alignment and case study reflection.',
        },
      ],
    },
    leadership: {
      title: 'Leadership Team',
      subtitle: 'Meet the guardians of the alliance',
      people: [
        {
          name: 'Shaun Tan',
          role: 'Founder and Chief Strategist',
          bio: 'Architect of the Metaphysics Alliance framework, fusing BaZi, Zi Wei and Qi Men into executive-grade playbooks.',
          credentials: [
            'Certified BaZi and Zi Wei Dou Shu practitioner',
            'Former brand strategist for regional luxury groups',
          ],
        },
        {
          name: 'Evelyn Ng',
          role: 'Director of Research and Analytics',
          bio: 'Leads the True Solar Time calibration lab and data modelling across multi-market engagements.',
          credentials: [
            'MSc Applied Analytics, Columbia University',
            'Published researcher on metaphysics decision models',
          ],
        },
        {
          name: 'Rahman Idris',
          role: 'Principal Feng Shui and Spatial Advisor',
          bio: 'Specialises in residential and enterprise Feng Shui with a lens on capital allocation and team flow.',
          credentials: [
            'IFSA accredited Feng Shui consultant',
            'Delivered over 300 on-site audits across APAC',
          ],
        },
      ],
      advisoryNote: 'Extended alliance network includes certified numerologists, signature consultants and cosmic timing analysts on retainer.',
    },
    socialProof: {
      title: 'Trusted by visionary leaders',
      subtitle: 'Social proof and signal',
      stats: [
        {
          label: 'Case studies delivered',
          value: '180+',
        },
        {
          label: 'Average ROI uplift after timing realignment',
          value: '26%',
        },
        {
          label: 'Client satisfaction rating',
          value: '9.4 / 10',
        },
      ],
      logos: [
        'APAC Futures Council Laureate 2023',
        'Oracle Society Gold Pin 2024',
        'Asia Metaphysics Guild Charter Member',
      ],
      testimonials: [
        {
          quote: 'The Alliance reframed our expansion calendar and prevented a seven figure misstep. Their decks read like CEO briefings, not mystic notes.',
          author: 'Elaine Goh',
          role: 'Managing Partner, Meridian Capital',
        },
      ],
    },
    cta: {
      dividerTitle: 'Ready to align your next move?',
      dividerSubtitle: 'Book a confidential consultation',
      title: 'Partner with Metaphysics Alliance',
      message: 'Share your objectives and we will map the metaphysical windows, team alignments and spatial upgrades required for momentum.',
      primaryLabel: 'Book a diagnostic call',
      primaryHref: '/contact',
      secondaryLabel: 'Download capabilities deck',
      secondaryHref: '/vip-report',
    },
    newsletter: {
      title: 'Stay aligned with celestial timing',
      subtitle: 'Quarterly signals, timing alerts and alliance research.',
    },
  },
  CN: {
    hero: {
      badge: 'CRITICAL LOGO LOCK',
      title: '????????',
      subtitle: '??????????,???,??????',
      primaryLabel: '????',
      primaryHref: '/contact',
      secondaryLabel: '????',
      secondaryHref: '/services/celestial/destiny-algorithm',
      videoLabel: '????',
      videoHref: 'https://youtu.be/placeholder',
    },
    mission: {
      title: '????',
      subtitle: '??????',
      missionTitle: '??',
      missionBody: '?????????????????????????????????',
      visionTitle: '??',
      visionBody: '???????????,??????????????????',
    },
    story: {
      title: '????',
      subtitle: '???????',
      milestones: [
        {
          year: '2014',
          headline: '??????',
          body: '??????????????????????????120??????',
        },
        {
          year: '2017',
          headline: '????????',
          body: '?????????????????????????',
        },
        {
          year: '2019',
          headline: '??????',
          body: '?????????????????????????',
        },
        {
          year: '2022',
          headline: '??????',
          body: '???????????????????????',
        },
        {
          year: '2024',
          headline: '????????',
          body: '??????????Taiji halo??????????????',
        },
      ],
      dataPoints: [
        '850+????????',
        '92%?????????',
        '17????????????',
        '????????????',
      ],
    },
    values: {
      title: '????',
      subtitle: '????????',
      items: [
        {
          title: '????',
          body: '???????????????????',
          proof: '2024??????????????',
        },
        {
          title: '??????',
          body: '?????????????????',
          proof: 'NPS 9.4?????????',
        },
        {
          title: '????',
          body: '??????????????????',
          proof: '11?????????????',
        },
        {
          title: '????',
          body: 'Taiji halo???????????????',
          proof: '?????????????????',
        },
        {
          title: '????',
          body: '????????????????',
          proof: '????????????????',
        },
      ],
    },
    leadership: {
      title: '????',
      subtitle: '?????????',
      people: [
        {
          name: 'Shaun Tan',
          role: '??????????',
          bio: '???????????????????????????',
          credentials: [
            '??BaZi????Zi Wei Dou Shu????',
            '?????????????????',
          ],
        },
        {
          name: 'Evelyn Ng',
          role: '??????????',
          bio: '?????????????????????????????True Solar Time??',
          credentials: [
            '??????????',
            '???????????',
          ],
        },
        {
          name: 'Rahman Idris',
          role: '????????????',
          bio: '??????????????????,??????????????',
          credentials: [
            'IFSA?????????',
            'APAC????????300+',
          ],
        },
      ],
      advisoryNote: '??????????????????????',
    },
    socialProof: {
      title: '??????????',
      subtitle: '??????',
      stats: [
        {
          label: '????',
          value: '180+',
        },
        {
          label: '??????????ROI',
          value: '26%',
        },
        {
          label: '???????',
          value: '9.4 / 10',
        },
      ],
      logos: [
        'APAC Futures Council 2023',
        'Oracle Society Gold Pin 2024',
        'Asia Metaphysics Guild',
      ],
      testimonials: [
        {
          quote: '???????????????????????????????????????????',
          author: 'Elaine Goh',
          role: 'Meridian Capital????',
        },
      ],
    },
    cta: {
      dividerTitle: '?????????',
      dividerSubtitle: '?????????',
      title: '??????',
      message: '????????????????????????????????????????',
      primaryLabel: '????????',
      primaryHref: '/contact',
      secondaryLabel: '??????',
      secondaryHref: '/vip-report',
    },
    newsletter: {
      title: '????????',
      subtitle: '???????????????????',
    },
  },
}

export default function AboutPage(){
  const { lang } = useI18n()
  const copy = copyByLang[lang] ?? copyByLang.EN

  return (
    <main className="space-y-16 md:space-y-20 pb-20">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-[#030b24] to-[#0b1e3b] px-6 py-16 md:px-12 md:py-20">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-gold/40 via-transparent to-blue-500/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border border-gold/40 bg-gradient-to-tr from-transparent via-gold/20 to-white/10 opacity-80" />
        </div>
        <div className="relative max-w-3xl space-y-6 text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.4em] text-gold/80">
            {copy.hero.badge}
          </span>
          <h1 className="text-4xl font-semibold text-gold md:text-5xl">{copy.hero.title}</h1>
          <p className="text-lg text-white/80 md:text-xl">{copy.hero.subtitle}</p>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Link
              to={copy.hero.primaryHref}
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-base font-semibold text-black shadow-lg shadow-gold/30 transition hover:brightness-110"
            >
              {copy.hero.primaryLabel}
            </Link>
            <Link
              to={copy.hero.secondaryHref}
              className="inline-flex items-center justify-center rounded-xl border border-gold/60 px-6 py-3 text-base font-semibold text-gold transition hover:bg-gold/10"
            >
              {copy.hero.secondaryLabel}
            </Link>
          </div>
          <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center">
            <a
              href={copy.hero.videoHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-white/80 transition hover:border-gold/60 hover:text-gold"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-gold">></span>
              <span>{copy.hero.videoLabel}</span>
            </a>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40">Taiji halo alignment protocol</div>
          </div>
        </div>
      </section>

      <div className="space-y-12">
        <SectionDivider title={copy.mission.title} subtitle={copy.mission.subtitle} />
        <section className="grid gap-6 md:grid-cols-2">
          <div className="card-3d space-y-4 rounded-2xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-2xl font-semibold text-gold">{copy.mission.missionTitle}</h2>
            <p className="text-white/75">{copy.mission.missionBody}</p>
          </div>
          <div className="card-3d space-y-4 rounded-2xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-2xl font-semibold text-gold">{copy.mission.visionTitle}</h2>
            <p className="text-white/75">{copy.mission.visionBody}</p>
          </div>
        </section>
      </div>

      <div className="space-y-12">
        <SectionDivider title={copy.story.title} subtitle={copy.story.subtitle} />
        <section className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-8 border-l border-white/10 pl-6">
            {copy.story.milestones.map((item) => (
              <div key={`${item.year}-${item.headline}`} className="space-y-2">
                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-gold/80">{item.year}</div>
                <h3 className="text-2xl font-semibold text-white">{item.headline}</h3>
                <p className="text-white/70">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {copy.story.dataPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70"
              >
                {point}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-12">
        <SectionDivider title={copy.values.title} subtitle={copy.values.subtitle} />
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {copy.values.items.map((value) => (
            <div key={value.title} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/25 p-6">
              <h3 className="text-xl font-semibold text-gold">{value.title}</h3>
              <p className="text-white/75">{value.body}</p>
              <div className="rounded-lg border border-gold/30 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold/70">
                {value.proof}
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="space-y-12">
        <SectionDivider title={copy.leadership.title} subtitle={copy.leadership.subtitle} />
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {copy.leadership.people.map((person) => (
            <div key={person.name} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gold">{person.name}</h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-white/50">{person.role}</p>
                </div>
                <div className="h-12 w-12 rounded-full border border-gold/40 bg-gradient-to-br from-gold/30 to-blue-500/30" />
              </div>
              <p className="text-white/75">{person.bio}</p>
              <ul className="space-y-2 text-sm text-white/60">
                {person.credentials.map((cred) => (
                  <li key={cred} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <p className="text-center text-sm uppercase tracking-[0.3em] text-white/40">{copy.leadership.advisoryNote}</p>
      </div>

      <div className="space-y-12">
        <SectionDivider title={copy.socialProof.title} subtitle={copy.socialProof.subtitle} />
        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="grid gap-6 md:grid-cols-3">
            {copy.socialProof.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-gold/30 bg-black/30 p-6 text-center">
                <div className="text-3xl font-semibold text-gold">{stat.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
              {copy.socialProof.testimonials.map((item) => (
                <div key={item.quote} className="space-y-3">
                  <p className="text-base italic text-white/80">"{item.quote}"</p>
                  <div className="text-xs uppercase tracking-[0.2em] text-gold/70">
                    {item.author}  -  {item.role}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-xs uppercase tracking-[0.3em] text-white/50">
              {copy.socialProof.logos.join(' | ')}
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-12">
        <SectionDivider title={copy.cta.dividerTitle} subtitle={copy.cta.dividerSubtitle} />
        <section className="card-3d flex flex-col items-center gap-6 rounded-3xl border border-gold/40 bg-gradient-to-br from-gold/10 via-black to-[#05142a] p-10 text-center">
          <h2 className="text-3xl font-semibold text-gold">{copy.cta.title}</h2>
          <p className="max-w-2xl text-white/80">{copy.cta.message}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to={copy.cta.primaryHref}
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-base font-semibold text-black shadow-lg shadow-gold/30 transition hover:brightness-110"
            >
              {copy.cta.primaryLabel}
            </Link>
            <Link
              to={copy.cta.secondaryHref}
              className="inline-flex items-center justify-center rounded-xl border border-gold/60 px-6 py-3 text-base font-semibold text-gold transition hover:bg-gold/10"
            >
              {copy.cta.secondaryLabel}
            </Link>
          </div>
        </section>
      </div>

      <div className="space-y-8">
        <SectionDivider title={copy.newsletter.title} subtitle={copy.newsletter.subtitle} />
        <Newsletter />
      </div>
    </main>
  )
}
