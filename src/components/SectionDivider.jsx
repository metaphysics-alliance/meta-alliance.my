// src/components/SectionDivider.jsx
export default function SectionDivider({ title, subtitle = '' }){
  return (
    <div className="container py-10 md:py-12">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-semibold tracking-wide">{title}</h3>
          {subtitle ? <p className="text-white/60 text-xs md:text-sm mt-2">{subtitle}</p> : null}
        </div>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  )
}
