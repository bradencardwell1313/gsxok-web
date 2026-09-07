// Shared fallback for retailer directions links — used whenever a retailer
// record (mock or Sanity) doesn't carry its own pre-built directionsUrl.
// External maps destination only; no proprietary turn-by-turn navigation.

export function googleMapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}
