import { useEffect, useState } from "react";

/**
 * AutoAspectImage
 * - Reads the image's intrinsic width/height (naturalWidth/Height)
 * - Sets a responsive wrapper with matching aspect ratio (padding-bottom trick)
 * - No cropping by default (object-contain)
 *
 * Props:
 *   src: string (public path or imported asset)
 *   alt: string
 *   fit: 'contain' | 'cover'   (default 'contain')
 *   className: wrapper extra classes
 *   imgClass:   image extra classes
 *   maxWidth: number (px)      optional max width cap for large screens
 *   fallbackRatio: number      % number if image fails to load (default 56.25 for 16:9)
 */
export default function AutoAspectImage({
  src,
  alt = "",
  fit = "contain",
  className = "",
  imgClass = "",
  maxWidth,
  fallbackRatio = 56.25,
}) {
  const [ratio, setRatio] = useState(fallbackRatio);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (!mounted) return;
      const w = img.naturalWidth || 0;
      const h = img.naturalHeight || 0;
      if (w > 0 && h > 0) {
        setRatio((h / w) * 100);
      }
      setReady(true);
    };
    img.onerror = () => { setReady(true); };
    return () => { mounted = false; };
  }, [src]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
    >
      {/* padding-bottom ratio box */}
      <div style={{ paddingBottom: `${ratio}%` }} />
      {/* image layer */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute inset-0 w-full h-full ${fit === "cover" ? "object-cover" : "object-contain"} ${imgClass}`}
        style={{ opacity: ready ? 1 : 0, transition: "opacity .25s ease" }}
      />
    </div>
  );
}
