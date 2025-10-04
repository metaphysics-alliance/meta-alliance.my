// src/components/AutoImageBox.jsx
import { useState } from 'react'

/**
 * AutoImageBox
 * - Measures intrinsic image ratio on load and sets a matching aspect box.
 * - Keeps the image fully visible via object-contain.
 * - Optional maxHeight to prevent giant portraits from stretching layout.
 */
export default function AutoImageBox({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  maxHeight = 780,      // px cap on the box height (optional)
  ring = true,
}){
  const [pb, setPb] = useState(56.25) // percentage padding-bottom (default 16:9)

  function handleLoad(e){
    const w = e?.target?.naturalWidth || 1
    const h = e?.target?.naturalHeight || 1
    setPb((h / w) * 100)
  }

  return (
    <div
      className={[
        'relative w-full mx-auto overflow-hidden bg-black/15 backdrop-blur-md rounded-xl',
        ring ? 'ring-1 ring-white/10' : '',
        maxHeight ? 'max-h-[var(--maxh)]' : '',
        className
      ].join(' ')}
      style={{ '--maxh': `${maxHeight}px` }}
    >
      {/* Spacer to enforce aspect based on the measured image ratio */}
      <div style={{ paddingBottom: `${pb}%` }} />
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        className={['absolute inset-0 w-full h-full object-contain', imgClassName].join(' ')}
        loading="lazy"
      />
    </div>
  )
}
