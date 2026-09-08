import { googleMapsDirectionsUrl } from '@/lib/geo/directions'
import type { RetailerWithDistance } from '@/lib/retailers/types'

// A single retailer row — reused by both the ZIP search results and the
// "All GSX retailers" directory in RetailerLocator.tsx. Purely
// presentational: with no map to sync selection with, this is just a
// semantic list item (name, address, optional distance, a real Directions
// link) rather than an interactive control.
//
// Distance only ever renders here when the caller passes a retailer with
// `distanceMiles` set — the directory listing never sets it, so it's
// naturally omitted there without any extra prop or branch. When present,
// it's sized and weighted as the strongest secondary element (bigger than
// the address), with green as an accent rather than the only signal.

interface RetailerResultProps {
  retailer: RetailerWithDistance
}

export function RetailerResult({ retailer }: RetailerResultProps) {
  const directionsUrl = retailer.directionsUrl ?? googleMapsDirectionsUrl(retailer.lat, retailer.lng)

  // Always keep the bottom border, including on the last item — this
  // component renders inside both a plain single-column list (search
  // results) and a 2-column grid (the full directory). In a grid,
  // ":last-child" only ever matches one literal item, which would leave
  // its row-neighbor's border in place and read as a lopsided last row.
  // The container's own bottom border sits directly against this one on
  // the true last item, reading as a single line, not a doubled one.
  return (
    <li className="border-b border-[var(--color-border)] px-4 py-4">
      <p className="text-h4 text-[var(--color-dark)]">{retailer.name}</p>
      <p className="text-body-sm text-[var(--color-muted)] mt-1">
        {retailer.address}
        <br />
        {retailer.city}, {retailer.state} {retailer.zip}
      </p>
      {typeof retailer.distanceMiles === 'number' && (
        <div className="mt-2">
          <p
            className="font-[family-name:var(--font-space-grotesk)] font-semibold"
            style={{ fontSize: '1.25rem', lineHeight: '1.2', letterSpacing: '-0.01em', color: 'var(--color-green)' }}
          >
            {retailer.distanceMiles < 0.1 ? '<0.1 miles away' : `${retailer.distanceMiles.toFixed(1)} miles away`}
          </p>
          <p className="text-caption" style={{ color: 'var(--color-muted)' }}>
            Approximate distance
          </p>
        </div>
      )}
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get directions to ${retailer.name}`}
        className="text-button inline-flex items-center gap-1.5 text-[var(--color-dark)] border border-[var(--color-dark)] px-4 py-2 mt-3 hover:bg-[var(--color-dark)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)]"
      >
        Get Directions
      </a>
    </li>
  )
}
