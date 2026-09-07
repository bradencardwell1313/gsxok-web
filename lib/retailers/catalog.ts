// Development-only retailer data for the Find GSX locator.
//
// Sanity has a full `dispensary` schema (sanity/schemas/dispensary.ts) but
// zero documents exist in the dataset yet (verified against the live
// dataset — same situation lib/products/catalog.ts was in before real
// product records existed). Unlike that file, there is no real approved
// asset to fall back to here: there is no such thing as a "real but
// unpublished" dispensary name, so this data is 100% placeholder.
//
// Every name below is deliberately written as "Placeholder Dispensary -
// <city>" (plain hyphen, no em dash — see the site-wide "no em dashes in
// rendered copy" rule) rather than anything that could pass for a real
// business. Do not rename these to sound more realistic — the point is that
// anyone looking at the rendered page can tell at a glance this is
// development data, not a real GSX retailer list. lib/retailers/getRetailers.ts
// only serves this array in non-production runs when Sanity has no live
// dispensary documents (see that file's `isProduction` gate) — a production
// build never receives this array, even if Sanity is empty.
//
// Coordinates are approximate real city centers (public geography, not
// retailer data) so the map/search/zoom behavior can be tested against a
// realistic Oklahoma spread. Addresses and ZIPs are generic placeholders.

import type { Retailer } from './types'

export const MOCK_RETAILERS: Retailer[] = [
  {
    id: 'mock-tulsa',
    slug: 'placeholder-dispensary-tulsa',
    name: 'Placeholder Dispensary - Tulsa',
    address: '100 Placeholder Ave',
    city: 'Tulsa',
    state: 'OK',
    zip: '74103',
    lat: 36.154,
    lng: -95.9928,
    active: true,
  },
  {
    id: 'mock-okc',
    slug: 'placeholder-dispensary-oklahoma-city',
    name: 'Placeholder Dispensary - Oklahoma City',
    address: '200 Placeholder Ave',
    city: 'Oklahoma City',
    state: 'OK',
    zip: '73102',
    lat: 35.4676,
    lng: -97.5164,
    active: true,
  },
  {
    id: 'mock-norman',
    slug: 'placeholder-dispensary-norman',
    name: 'Placeholder Dispensary - Norman',
    address: '300 Placeholder Ave',
    city: 'Norman',
    state: 'OK',
    zip: '73069',
    lat: 35.2226,
    lng: -97.4395,
    active: true,
  },
  {
    id: 'mock-broken-arrow',
    slug: 'placeholder-dispensary-broken-arrow',
    name: 'Placeholder Dispensary - Broken Arrow',
    address: '400 Placeholder Ave',
    city: 'Broken Arrow',
    state: 'OK',
    zip: '74012',
    lat: 36.0526,
    lng: -95.7908,
    active: true,
  },
  {
    id: 'mock-chelsea',
    slug: 'placeholder-dispensary-chelsea',
    name: 'Placeholder Dispensary - Chelsea',
    address: '500 Placeholder Ave',
    city: 'Chelsea',
    state: 'OK',
    zip: '74016',
    lat: 36.5334,
    lng: -95.4335,
    active: true,
  },
  {
    id: 'mock-stillwater',
    slug: 'placeholder-dispensary-stillwater',
    name: 'Placeholder Dispensary - Stillwater',
    address: '600 Placeholder Ave',
    city: 'Stillwater',
    state: 'OK',
    zip: '74074',
    lat: 36.1156,
    lng: -97.0584,
    active: true,
  },
]
