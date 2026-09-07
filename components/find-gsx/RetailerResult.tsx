import { googleMapsDirectionsUrl } from '@/lib/geo/directions'
import type { RetailerWithDistance } from '@/lib/retailers/types'

// A single retailer row in the Find GSX locator list.
//
// Structure: the name/address block is a real <button> (selection only —
// syncs with the map marker), and Directions is a separate <a> alongside
// it, not nested inside the button. Nesting a link inside a button is
// invalid HTML and breaks keyboard/screen-reader navigation, so both stay
// independently reachable via Tab.
//
// Selected state is never color-only (accessibility spec, section 15): a
// filled square indicator swaps in next to the name, the left rule
// thickens, and aria-current is set — green is reinforcement, not the
// only signal.

interface RetailerResultProps {
  retailer: RetailerWithDistance
  selected: boolean
  onSelect: (id: string) => void
}

export function RetailerResult({ retailer, selected, onSelect }: RetailerResultProps) {
  const directionsUrl = retailer.directionsUrl ?? googleMapsDirectionsUrl(retailer.lat, retailer.lng)

  return (
    <li
      className="border-b border-[var(--color-border)] last:border-b-0"
      style={{
        borderLeft: selected ? '3px solid var(--color-green)' : '3px solid transparent',
        backgroundColor: selected ? 'rgba(26,122,74,0.05)' : 'transparent',
      }}
    >
      <button
        type="button"
        onClick={() => onSelect(retailer.id)}
        aria-current={selected ? 'true' : undefined}
        className="w-full text-left flex items-start gap-3 px-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-inset"
      >
        <span
          aria-hidden="true"
          className="mt-1.5 shrink-0"
          style={{
            width: 7,
            height: 7,
            backgroundColor: selected ? 'var(--color-green)' : 'transparent',
            border: `1.5px solid ${selected ? 'var(--color-green)' : 'var(--color-border)'}`,
          }}
        />
        <span className="flex-1">
          <span className="text-h4 text-[var(--color-dark)] block">{retailer.name}</span>
          <span className="text-body-sm text-[var(--color-muted)] block mt-1">
            {retailer.address}
            <br />
            {retailer.city}, {retailer.state} {retailer.zip}
          </span>
          {typeof retailer.distanceMiles === 'number' && (
            <span className="text-label block mt-1.5" style={{ color: 'var(--color-green)' }}>
              {retailer.distanceMiles < 0.1 ? '<0.1' : retailer.distanceMiles.toFixed(1)} mi
            </span>
          )}
        </span>
      </button>

      <div className="px-4 pb-4 -mt-1">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${retailer.name}`}
          className="text-button inline-flex items-center gap-1.5 text-[var(--color-dark)] border border-[var(--color-dark)] px-4 py-2 hover:bg-[var(--color-dark)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)]"
        >
          Directions
        </a>
      </div>
    </li>
  )
}
