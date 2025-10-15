export default function Roadmap({ items = [] }){
  if (!Array.isArray(items) || !items.length) return null
  return (
    <div>
      {/* Mobile vertical timeline */}
      <div className="md:hidden relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
        {items.map((m, i) => (
          <div key={i} className="relative mb-6 last:mb-0">
            <span className="absolute -left-1.5 mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-semibold text-black ring-2 ring-black">
              {i + 1}
            </span>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
              <div className="text-xs text-white/60">{m.date}</div>
              {m.title ? <div className="mt-0.5 font-medium text-white/90">{m.title}</div> : null}
              <div className="mt-1 text-sm leading-relaxed text-white/70">{m.outcome}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop horizontal roadmap */}
      <div className="hidden md:block">
        <div className="flex items-stretch gap-6">
          {items.map((m, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="w-72 max-w-[18rem] shrink-0 rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-semibold text-black ring-2 ring-black">
                    {i + 1}
                  </div>
                  <div className="text-xs text-white/60">{m.date}</div>
                </div>
                {m.title ? <div className="mt-2 text-base font-medium text-white/90">{m.title}</div> : null}
                <div className="mt-1 text-sm leading-relaxed text-white/70">{m.outcome}</div>
              </div>
              {i < items.length - 1 ? (
                <div className="flex h-1 w-16 items-center">
                  <div className="h-1 w-full bg-gold/80" />
                  <div className="-ml-2 h-0 w-0 border-y-8 border-l-8 border-y-transparent border-l-gold/80" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
