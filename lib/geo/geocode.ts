// Client-side forward geocoding via the Mapbox Geocoding API — turns a
// "City or ZIP code" search into coordinates. Uses the same public Mapbox
// token as the map (NEXT_PUBLIC_MAPBOX_TOKEN); a public Mapbox token is
// designed to be used directly from the browser, so no server proxy route
// is needed. Requires that token — see RetailerLocator.tsx for the
// disabled/degraded search state when it's missing.

export interface GeocodeResult {
  lat: number
  lng: number
  placeName: string
}

const OKLAHOMA_PROXIMITY = '-97.5,35.5'

export async function geocodeLocation(query: string, token: string): Promise<GeocodeResult | null> {
  const params = new URLSearchParams({
    access_token: token,
    country: 'us',
    types: 'place,postcode,locality,region,district',
    proximity: OKLAHOMA_PROXIMITY,
    limit: '1',
  })

  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?${params.toString()}`
  )

  if (!res.ok) {
    throw new Error('geocode_request_failed')
  }

  const data = await res.json()
  const feature = data.features?.[0]
  if (!feature || !Array.isArray(feature.center)) return null

  const [lng, lat] = feature.center
  return { lat, lng, placeName: feature.place_name as string }
}
