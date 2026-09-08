// Development-only retailer data for the Find GSX locator.
//
// Sanity has a full `dispensary` schema (sanity/schemas/dispensary.ts) but
// zero documents exist in the dataset yet — GSX is waiting on a real
// retailer list. This data exists purely so the ZIP locator and directory
// can be fully QA'd (search, sorting, Show More, directions, empty states,
// responsive layout) before real records arrive.
//
// Every name below is deliberately written as "Development Retailer <city>
// 0N" rather than anything that could pass for a real business, so anyone
// looking at the rendered page can tell at a glance this is development
// data, not a real GSX retailer list. lib/retailers/getRetailers.ts only
// ever serves this array in non-production runs (see that file's
// `isProduction` gate) — a production build with zero real Sanity
// documents shows the "Retailer locations are being updated" fallback
// instead, never this data. The locator also shows a visible
// "development preview" notice whenever this array is in use.
//
// Coordinates are approximate real city centers (public geography, not
// retailer data) so ZIP search / distance sort / radius filtering can be
// tested against a realistic, spread-out Oklahoma dataset. Addresses and
// ZIPs are generic placeholders.

import type { Retailer } from './types'

export const MOCK_RETAILERS: Retailer[] = [
  {
    id: 'mock-tulsa-01',
    slug: 'development-retailer-tulsa-01',
    name: 'Development Retailer Tulsa 01',
    address: '100 Placeholder Ave',
    city: 'Tulsa',
    state: 'OK',
    zip: '74103',
    lat: 36.154,
    lng: -95.9928,
    active: true,
  },
  {
    id: 'mock-okc-01',
    slug: 'development-retailer-oklahoma-city-01',
    name: 'Development Retailer Oklahoma City 01',
    address: '200 Placeholder Ave',
    city: 'Oklahoma City',
    state: 'OK',
    zip: '73102',
    lat: 35.4676,
    lng: -97.5164,
    active: true,
  },
  {
    id: 'mock-norman-01',
    slug: 'development-retailer-norman-01',
    name: 'Development Retailer Norman 01',
    address: '300 Placeholder Ave',
    city: 'Norman',
    state: 'OK',
    zip: '73069',
    lat: 35.2226,
    lng: -97.4395,
    active: true,
  },
  {
    id: 'mock-broken-arrow-01',
    slug: 'development-retailer-broken-arrow-01',
    name: 'Development Retailer Broken Arrow 01',
    address: '400 Placeholder Ave',
    city: 'Broken Arrow',
    state: 'OK',
    zip: '74012',
    lat: 36.0526,
    lng: -95.7908,
    active: true,
  },
  {
    id: 'mock-chelsea-01',
    slug: 'development-retailer-chelsea-01',
    name: 'Development Retailer Chelsea 01',
    address: '500 Placeholder Ave',
    city: 'Chelsea',
    state: 'OK',
    zip: '74016',
    lat: 36.5334,
    lng: -95.4335,
    active: true,
  },
  {
    id: 'mock-stillwater-01',
    slug: 'development-retailer-stillwater-01',
    name: 'Development Retailer Stillwater 01',
    address: '600 Placeholder Ave',
    city: 'Stillwater',
    state: 'OK',
    zip: '74074',
    lat: 36.1156,
    lng: -97.0584,
    active: true,
  },
  {
    id: 'mock-bartlesville-01',
    slug: 'development-retailer-bartlesville-01',
    name: 'Development Retailer Bartlesville 01',
    address: '700 Placeholder Ave',
    city: 'Bartlesville',
    state: 'OK',
    zip: '74003',
    lat: 36.7473,
    lng: -95.9808,
    active: true,
  },
  {
    id: 'mock-muskogee-01',
    slug: 'development-retailer-muskogee-01',
    name: 'Development Retailer Muskogee 01',
    address: '800 Placeholder Ave',
    city: 'Muskogee',
    state: 'OK',
    zip: '74401',
    lat: 35.7479,
    lng: -95.3697,
    active: true,
  },
]
