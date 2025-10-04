/**
 * MapOverride — a single map-only, wide component used to replace ALL previous map components.
 * This file intentionally has no left-side text panel.
 */
import MapEmbedWide from './MapEmbedWide.jsx'

export default function MapOverride(props){
  // Allow props override, but set clean map-only defaults
  return (
    <MapEmbedWide
      query={props?.query ?? 'Inspace Co-Working & Serviced Office, Kota Damansara (Mitraland)'}
      embedUrl={props?.embedUrl}
      aspectW={props?.aspectW ?? 34}
      aspectH={props?.aspectH ?? 30}
      maxWidth={props?.maxWidth ?? 1500}      // undefined => full container width
      rounded={props?.rounded ?? true}
      zoom={props?.zoom ?? 16}
      className={props?.className ?? 'py-10'}
    />
  )
}
