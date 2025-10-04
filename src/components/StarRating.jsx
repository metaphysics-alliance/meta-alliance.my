// src/components/StarRating.jsx
function Star({ className = '' }){
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  )
}

/**
 * StarRating
 * Renders 0..5 stars with precise fractional fill using overlay clipping.
 * score: number (0..5), e.g. 4.7
 * size: tailwind size classes for icons
 */
export default function StarRating({ score = 5, size = 'w-4 h-4', showNumber = true }){
  const pct = Math.max(0, Math.min(100, (score / 5) * 100))
  const StarsRow = ({ colorClass }) => (
    <div className="flex gap-1">
      <Star className={`${size} ${colorClass}`} />
      <Star className={`${size} ${colorClass}`} />
      <Star className={`${size} ${colorClass}`} />
      <Star className={`${size} ${colorClass}`} />
      <Star className={`${size} ${colorClass}`} />
    </div>
  )
  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-block" aria-label={`${score.toFixed(1)} out of 5 stars`}>
        <StarsRow colorClass="text-white/25" />
        <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: pct + '%' }}>
          <StarsRow colorClass="text-gold" />
        </div>
      </div>
      {showNumber ? <span className="text-white/80 text-sm font-medium">{score.toFixed(1)}<span className="text-white/50 text-xs">/5</span></span> : null}
    </div>
  )
}
