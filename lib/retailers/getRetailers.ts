import { getAllDispensaries } from '@/lib/sanity/queries'
import { googleMapsDirectionsUrl } from '@/lib/geo/directions'
import { MOCK_RETAILERS } from './catalog'
import type { Retailer, RetailerDataSource } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityDispensary = any

// Only Sanity's "carries" status maps to a locator listing. "intermittent"
// and "out" are excluded entirely rather than shown with a status badge —
// the Find GSX page identifies retailers that carry GSX, and section 10 of
// the build spec prohibits any store-level inventory signal (no "Limited",
// no "Temporarily Out"), so there's no compliant way to surface that
// distinction on this page. Flagged in the completion report for review.
function mapDispensaryToRetailer(doc: SanityDispensary): Retailer | null {
  if (doc.availabilityStatus !== 'carries') return null
  if (typeof doc.coordinates?.lat !== 'number' || typeof doc.coordinates?.lng !== 'number') return null

  return {
    id: doc._id,
    slug: doc.slug?.current ?? doc._id,
    name: doc.name,
    address: doc.address,
    city: doc.city,
    state: doc.state,
    zip: doc.zip,
    lat: doc.coordinates.lat,
    lng: doc.coordinates.lng,
    phone: doc.phone || undefined,
    website: doc.website || undefined,
    directionsUrl: doc.directionsUrl || googleMapsDirectionsUrl(doc.coordinates.lat, doc.coordinates.lng),
    active: true,
  }
}

// TEMPORARY, per explicit instruction: the rebuild is a development/review
// deployment, not the live customer-facing GSX site, so it's acceptable to
// show clearly-labeled test data here. Forced to false so the deployed
// rebuild renders MOCK_RETAILERS instead of the "unavailable" fallback.
// MUST be reverted to `process.env.NODE_ENV === 'production'` before this
// rebuild replaces the real GSX website, and before Larry's real retailer
// list goes into Sanity.
const isProduction = false

export async function getRetailers(): Promise<{ retailers: Retailer[]; source: RetailerDataSource }> {
  try {
    const docs = await getAllDispensaries()
    if (Array.isArray(docs) && docs.length > 0) {
      const retailers = docs
        .map(mapDispensaryToRetailer)
        .filter((r: Retailer | null): r is Retailer => r !== null)
      if (retailers.length > 0) {
        return { retailers, source: 'sanity' }
      }
    }
  } catch {
    // Sanity unreachable/misconfigured — fall through below rather than
    // breaking the page.
  }

  // No real retailer data. In production, that must render as a truthful
  // "we don't have this yet" state (see RetailerLocator's 'unavailable'
  // branch) — never as placeholder stores standing in for real ones.
  if (isProduction) {
    return { retailers: [], source: 'unavailable' }
  }

  return { retailers: MOCK_RETAILERS, source: 'mock' }
}
