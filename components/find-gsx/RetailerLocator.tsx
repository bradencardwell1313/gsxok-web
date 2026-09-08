'use client'

import { useId, useMemo, useState } from 'react'
import type { Retailer, RetailerDataSource, RetailerWithDistance } from '@/lib/retailers/types'
import { distanceMiles } from '@/lib/geo/distance'
import { RetailerResult } from './RetailerResult'

// The Find GSX locator: a ZIP-code search plus a full retailer directory.
// No map — see the earlier Mapbox implementation this replaced. The
// primary flow is deliberately simple: enter a ZIP, see the nearest
// eligible retailers and their addresses; browse the full list below that
// without searching at all.

const RESULTS_PAGE_SIZE = 5

// Retailers beyond this are not shown as a search result, even if they're
// technically the "nearest" one on file — a ZIP search for a distant or
// out-of-state code shouldn't present a retailer hundreds of miles away as
// if it were a normal nearby result. Wider than the old map-based radius
// (100mi) since a ZIP centroid is less precise than a geocoded address.
const NEARBY_RADIUS_MILES = 150

const ZIP_PATTERN = /^\d{5}$/

type SearchStatus = 'idle' | 'loading' | 'error' | 'not-found'

interface RetailerLocatorProps {
  retailers: Retailer[]
  dataSource: RetailerDataSource
}

function sortByCity(list: Retailer[]): Retailer[] {
  return [...list].sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name))
}

export function RetailerLocator({ retailers, dataSource }: RetailerLocatorProps) {
  const zipInputId = useId()
  const zipErrorId = useId()

  const [zip, setZip] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [status, setStatus] = useState<SearchStatus>('idle')
  const [searchedZip, setSearchedZip] = useState<string | null>(null)
  const [nearestResults, setNearestResults] = useState<RetailerWithDistance[]>([])
  const [showAllNearest, setShowAllNearest] = useState(false)

  const baseList = useMemo(() => sortByCity(retailers), [retailers])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = zip.trim()

    if (!ZIP_PATTERN.test(trimmed)) {
      setValidationError('Enter a valid 5-digit ZIP code.')
      setSearchedZip(null)
      return
    }

    setValidationError(null)
    setStatus('loading')

    try {
      const res = await fetch(`/api/zip-lookup?zip=${trimmed}`)
      if (!res.ok) {
        setStatus(res.status === 404 ? 'not-found' : 'error')
        setSearchedZip(null)
        return
      }
      const { location } = await res.json()

      const withDistance = baseList
        .map((r) => ({ ...r, distanceMiles: distanceMiles(location, r) }))
        .filter((r) => r.distanceMiles <= NEARBY_RADIUS_MILES)
        .sort((a, b) => a.distanceMiles - b.distanceMiles)

      setNearestResults(withDistance)
      setSearchedZip(trimmed)
      setShowAllNearest(false)
      setStatus('idle')
    } catch {
      setStatus('error')
      setSearchedZip(null)
    }
  }

  // Production with zero real Sanity retailers — a truthful "we don't have
  // this yet" state, never placeholder stores standing in for real ones.
  // Unchanged from the map-based build: approved as-is, not being redesigned.
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

  const visibleNearest = showAllNearest ? nearestResults : nearestResults.slice(0, RESULTS_PAGE_SIZE)
  const hasMoreNearest = !showAllNearest && nearestResults.length > RESULTS_PAGE_SIZE

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
            className="text-label px-4 py-2.5 mb-8"
            style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-cream-2)' }}
            role="status"
          >
            Development preview: showing placeholder retailer data, not real GSX retailers
          </div>
        )}

        {/* ZIP search — prominent but constrained, not a full-bleed hero
            control. */}
        <div style={{ maxWidth: '640px' }}>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              <label htmlFor={zipInputId} className="text-label" style={{ color: 'var(--color-muted)' }}>
                ZIP code
              </label>
              <input
                id={zipInputId}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/[^\d]/g, ''))}
                placeholder="Enter ZIP code"
                aria-invalid={validationError ? true : undefined}
                aria-describedby={validationError ? zipErrorId : undefined}
                className="h-12 px-4 text-body bg-white text-[var(--color-dark)] border border-[var(--color-border)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-green)] transition-colors duration-150"
              />
            </div>
            <button
              type="submit"
              className="text-button px-6 h-12 bg-[var(--color-green)] text-[var(--color-cream)] border border-[var(--color-green)] hover:bg-[#155f3a] hover:border-[#155f3a] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dark)]"
            >
              Find GSX
            </button>
          </form>

          {validationError && (
            <p id={zipErrorId} role="alert" className="text-body-sm mt-3" style={{ color: 'var(--color-muted)' }}>
              {validationError}
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="text-body-sm mt-3" style={{ color: 'var(--color-muted)' }}>
              We couldn&rsquo;t complete that search. Please try again.
            </p>
          )}
          {status === 'not-found' && (
            <p role="alert" className="text-body-sm mt-3" style={{ color: 'var(--color-muted)' }}>
              We couldn&rsquo;t find that ZIP code. Please check it and try again.
            </p>
          )}
        </div>

        {/* Nearest results — only after a successful search. */}
        {searchedZip && (
          <div className="mt-10" style={{ maxWidth: '640px' }}>
            <h2 className="text-h4 text-[var(--color-dark)]">GSX near {searchedZip}</h2>

            {nearestResults.length === 0 ? (
              <div className="mt-4 px-4 py-8 text-center border border-[var(--color-border)]">
                <p className="text-h4 text-[var(--color-dark)]">No nearby GSX retailers found</p>
                <p className="text-body-sm mt-2" style={{ color: 'var(--color-muted)' }}>
                  Try another ZIP code or check back as we continue expanding retailer locations.
                </p>
              </div>
            ) : (
              <>
                <ul className="mt-4 border border-[var(--color-border)]">
                  {visibleNearest.map((r) => (
                    <RetailerResult key={r.id} retailer={r} />
                  ))}
                </ul>
                {hasMoreNearest && (
                  <button
                    type="button"
                    onClick={() => setShowAllNearest(true)}
                    className="text-button mt-4 px-5 h-11 bg-transparent text-[var(--color-dark)] border border-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)]"
                  >
                    Show More
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* All GSX retailers — always browseable, no search required. */}
        <div className="mt-12" style={{ maxWidth: '640px' }}>
          <h2 className="text-h4 text-[var(--color-dark)]">All GSX retailers</h2>
          <ul className="mt-4 border border-[var(--color-border)]">
            {baseList.map((r) => (
              <RetailerResult key={r.id} retailer={r} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
