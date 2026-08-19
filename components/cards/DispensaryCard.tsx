import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

type AvailabilityStatus = 'carries' | 'intermittent' | 'out'

const badgeMap: Record<AvailabilityStatus, 'available' | 'limited' | 'out'> = {
  carries:      'available',
  intermittent: 'limited',
  out:          'out',
}

const badgeLabels: Record<AvailabilityStatus, string> = {
  carries:      'Carries GSX',
  intermittent: 'Intermittent',
  out:          'Temporarily Out',
}

interface DispensaryCardProps {
  name: string
  address: string
  city: string
  state: string
  zip: string
  availabilityStatus?: AvailabilityStatus
  directionsUrl?: string
  orderingUrl?: string
  phone?: string
}

export function DispensaryCard({
  name,
  address,
  city,
  state,
  zip,
  availabilityStatus = 'carries',
  directionsUrl,
  orderingUrl,
  phone,
}: DispensaryCardProps) {
  return (
    <div className="flex flex-col gap-4 p-5 bg-[rgba(250,248,243,0.04)] border border-[rgba(250,248,243,0.08)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-h4 text-[var(--color-cream)] leading-snug">{name}</h3>
          <address className="not-italic text-body-sm text-[rgba(250,248,243,0.5)] mt-1">
            {address}<br />
            {city}, {state} {zip}
          </address>
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-body-sm text-[rgba(250,248,243,0.4)] hover:text-[var(--color-accent)] transition-colors duration-150 mt-1 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
            >
              {phone}
            </a>
          )}
        </div>
        <Badge
          variant={badgeMap[availabilityStatus]}
          label={badgeLabels[availabilityStatus]}
          className="shrink-0 mt-0.5"
        />
      </div>

      {/* Actions */}
      {(directionsUrl || orderingUrl) && (
        <div className="flex flex-wrap gap-3 pt-3 border-t border-[rgba(250,248,243,0.06)]">
          {directionsUrl && (
            <Button
              href={directionsUrl}
              variant="secondary"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions
            </Button>
          )}
          {orderingUrl && availabilityStatus !== 'out' && (
            <Button
              href={orderingUrl}
              variant="primary"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Online
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
