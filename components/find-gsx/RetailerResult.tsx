import { googleMapsDirectionsUrl } from '@/lib/geo/directions'
import type { RetailerWithDistance } from '@/lib/retailers/types'

// A single retailer row — reused by both the ZIP search results and the
// "All GSX retailers" directory in RetailerLocator.tsx. Purely
// presentational: with no map to sync selection with, this is just a
// semantic list item (name, address, optional distance, a real Directions
// link) rather than an interactive control.

interface RetailerResultProps {
  retailer: RetailerWithDistance
}

export function RetailerResult({ retailer }: RetailerResultProps) {
  const directionsUrl = retailer.directionsUrl ?? googleMapsDirectionsUrl(retailer.lat, retailer.lng)

  return (
    <li className="border-b border-[var(--color-border)] last:border-b-0 px-4 py-4">
      <p className="text-h4 text-[var(--color-dark)]">{retailer.name}</p>
      <p className="text-body-sm text-[var(--color-muted)] mt-1">
        {retailer.address}
        <br />
        {retailer.city}, {retailer.state} {retailer.zip}
      </p>
      {typeof retailer.distanceMiles === 'number' && (
        <p className="text-label mt-1.5" style={{ color: 'var(--color-green)' }}>
          {retailer.distanceMiles < 0.1 ? 'Approx. <0.1 miles' : `Approx. ${retailer.distanceMiles.toFixed(1)} miles`}
        </p>
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
