'use client'

import { useMemo, useRef, useState } from 'react'
import type { Retailer, RetailerDataSource, RetailerWithDistance } from '@/lib/retailers/types'
import { distanceMiles } from '@/lib/geo/distance'
import { geocodeLocation } from '@/lib/geo/geocode'
import { RetailerMap, type RetailerMapHandle } from './RetailerMap'
import { RetailerResult } from './RetailerResult'

// The Find GSX locator: search controls, map, and retailer results as one
// integrated experience. Desktop layout is a 2-column grid (~38% controls +
// results / ~62% map); mobile reflows to controls → map → results via
// grid-template-areas rather than squeezing the desktop layout down (see
// the <style> block below) — a single CSS grid keeps controls+results in
// one DOM order for both breakpoints while only the map's position in the
// visual flow changes, so nothing needs to render twice.

const OKLAHOMA_DEFAULT_CENTER = { lat: 35.55, lng: -97.4 }
const OKLAHOMA_DEFAULT_ZOOM = 6.2
const SEARCH_ZOOM = 10.5
const NEARBY_RADIUS_MILES = 100

type SearchStatus = 'idle' | 'loading' | 'error' | 'location-denied'

interface RetailerLocatorProps {
  retailers: Retailer[]
  dataSource: RetailerDataSource
  mapboxToken: string
}

function sortByCity(list: Retailer[]): Retailer[] {
  return [...list].sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name))
}

export function RetailerLocator({ retailers, dataSource, mapboxToken }: RetailerLocatorProps) {
  const hasMapbox = mapboxToken.length > 0
  const mapRef = useRef<RetailerMapHandle>(null)

  const [query, setQuery] = useState('')
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [status, setStatus] = useState<SearchStatus>('idle')
  const [locationDeniedOnce, setLocationDeniedOnce] = useState(false)

  const baseList = useMemo(() => sortByCity(retailers), [retailers])

  const results: RetailerWithDistance[] = useMemo(() => {
    if (!userLocation) return baseList

    return baseList
      .map((r) => ({ ...r, distanceMiles: distanceMiles(userLocation, r) }))
      .filter((r) => r.distanceMiles <= NEARBY_RADIUS_MILES)
      .sort((a, b) => a.distanceMiles - b.distanceMiles)
  }, [baseList, userLocation])

  function selectAndFocus(id: string) {
    setSelectedId(id)
    const target = results.find((r) => r.id === id) ?? retailers.find((r) => r.id === id)
    if (target) mapRef.current?.flyTo({ lat: target.lat, lng: target.lng }, 12.5)
  }

  async function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return

    if (!hasMapbox) {
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const result = await geocodeLocation(query.trim(), mapboxToken)
      if (!result) {
        setStatus('error')
        return
      }
      setUserLocation({ lat: result.lat, lng: result.lng })
      setSelectedId(null)
      setStatus('idle')
      mapRef.current?.flyTo({ lat: result.lat, lng: result.lng }, SEARCH_ZOOM)
    } catch {
      setStatus('error')
    }
  }

  function handleUseMyLocation() {
    if (!('geolocation' in navigator)) {
      setStatus('error')
      return
    }

    setStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = { lat: position.coords.latitude, lng: position.coords.longitude }
        setUserLocation(loc)
        setSelectedId(null)
        setStatus('idle')
        mapRef.current?.flyTo(loc, SEARCH_ZOOM)
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setLocationDeniedOnce(true)
          setStatus('location-denied')
        } else {
          setStatus('error')
        }
      },
      { timeout: 8000 }
    )
  }

  // Production with zero real Sanity retailers (see getRetailers.ts) — a
  // truthful "we don't have this yet" state, never placeholder stores
  // standing in for real ones. Replaces the whole locator (search/map/
  // results) rather than showing controls that can only ever return
  // nothing.
  if (dataSource === 'unavailable') {
    return (
      <section
        className="relative bg-[var(--color-cream)] bg-[length:100%_96px] md:bg-[length:100%_160px] bg-no-repeat bg-top"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(26,122,74,0.32) 0%, rgba(26,122,74,0.12) 20%, rgba(26,122,74,0) 60%, rgba(26,122,74,0) 100%)',
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <h2 className="text-h4 text-[var(--color-dark)]">Retailer locations are being updated</h2>
          <p className="text-body-sm mt-2" style={{ color: 'var(--color-muted)', maxWidth: '56ch' }}>
            Check back soon, or contact GSX at sales@gsxok.com for current availability.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative bg-[var(--color-cream)] bg-[length:100%_96px] md:bg-[length:100%_160px] bg-no-repeat bg-top"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(26,122,74,0.32) 0%, rgba(26,122,74,0.12) 20%, rgba(26,122,74,0) 60%, rgba(26,122,74,0) 100%)',
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        {dataSource === 'mock' && (
          <div
            className="text-label px-4 py-2.5 mb-6"
            style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-cream-2)' }}
            role="status"
          >
            Development preview: showing placeholder retailer data, not real GSX retailers
          </div>
        )}

        <style>{`
          .find-gsx-grid {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-areas: "controls" "map" "results";
            gap: 1.75rem;
          }
          .find-gsx-grid > .fg-controls { grid-area: controls; }
          .find-gsx-grid > .fg-map { grid-area: map; }
          .find-gsx-grid > .fg-results { grid-area: results; }
          @media (min-width: 1024px) {
            .find-gsx-grid {
              grid-template-columns: 38fr 62fr;
              grid-template-areas: "controls map" "results map";
              align-items: start;
              gap: 2.5rem;
            }
          }
        `}</style>

        <div className="find-gsx-grid">
          {/* Search controls */}
          <div className="fg-controls">
            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3">
              <label htmlFor="retailer-search" className="text-label" style={{ color: 'var(--color-muted)' }}>
                Search by location
              </label>
              <div className="flex gap-3">
                <input
                  id="retailer-search"
                  type="text"
                  inputMode="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="City or ZIP code"
                  className="flex-1 h-12 px-4 text-body bg-white text-[var(--color-dark)] border border-[var(--color-border)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-green)] transition-colors duration-150"
                />
                <button
                  type="submit"
                  className="text-button px-6 h-12 bg-[var(--color-green)] text-[var(--color-cream)] border border-[var(--color-green)] hover:bg-[#155f3a] hover:border-[#155f3a] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dark)]"
                >
                  Search
                </button>
              </div>

              {/* Independent of Mapbox — plain browser geolocation plus the
                  haversine distance helper, so this still works even when
                  NEXT_PUBLIC_MAPBOX_TOKEN isn't configured (see the map/
                  search fallbacks below, which do require it). */}
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="self-start text-button px-5 h-11 bg-transparent text-[var(--color-dark)] border border-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)]"
              >
                Use My Location
              </button>
            </form>

            {status === 'error' && (
              <p className="text-body-sm mt-3" style={{ color: 'var(--color-muted)' }}>
                {hasMapbox
                  ? "We couldn't complete that search. Please try a different city or ZIP code."
                  : 'Location search is not available in this environment yet. Try Use My Location, or check back soon.'}
              </p>
            )}
            {status === 'location-denied' && (
              <p className="text-body-sm mt-3" style={{ color: 'var(--color-muted)' }}>
                Location access was denied. You can still search by city or ZIP code above.
              </p>
            )}
          </div>

          {/* Map */}
          <div className="fg-map" style={{ height: 340 }}>
            <div className="w-full h-full lg:h-[560px] lg:sticky lg:top-24 overflow-hidden border border-[var(--color-border)]" style={{ height: 340 }}>
              {hasMapbox ? (
                <RetailerMap
                  ref={mapRef}
                  token={mapboxToken}
                  retailers={results}
                  selectedId={selectedId}
                  onSelect={selectAndFocus}
                  initialCenter={OKLAHOMA_DEFAULT_CENTER}
                  initialZoom={OKLAHOMA_DEFAULT_ZOOM}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[var(--color-cream-2)] px-8 text-center">
                  <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
                    Map is temporarily unavailable in this environment. Retailer results are still shown below.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="fg-results">
            <div className="lg:max-h-[560px] lg:overflow-y-auto border border-[var(--color-border)]">
              {results.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-h4 text-[var(--color-dark)]">No nearby GSX retailers found</p>
                  <p className="text-body-sm mt-2" style={{ color: 'var(--color-muted)' }}>
                    Try another city or ZIP code.
                  </p>
                </div>
              ) : (
                <ul>
                  {results.map((r) => (
                    <RetailerResult key={r.id} retailer={r} selected={selectedId === r.id} onSelect={selectAndFocus} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
