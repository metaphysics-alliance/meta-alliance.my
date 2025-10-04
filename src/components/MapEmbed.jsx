// src/components/MapEmbed.jsx
export default function MapEmbed({
  lat = 3.15494,
  lng = 101.59737,
  zoom = 17,
  ratio = 9/21,
  lang = 'en'
}) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=${lang}&output=embed`;
  return (
    <div className="relative w-full overflow-hidden">
      {/* Aspect ratio box */}
      <div style={{ paddingBottom: `${ratio * 100}%` }} />
      <iframe
        title="Google Map"
        src={src}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
