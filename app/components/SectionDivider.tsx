interface SectionDividerProps {
  title: string
  subtitle?: string
}

export default function SectionDivider({ title, subtitle = '' }: SectionDividerProps){
  return (
    <div className="py-8 md:py-10">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-semibold tracking-wide text-white">{title}</h3>
          {subtitle ? <p className="mt-2 text-xs md:text-sm text-white/60">{subtitle}</p> : null}
        </div>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  )
}

