// Availability badges — used on product cards and dispensary cards.
// Brand Bible: 2px border-radius max for chips/tags.

type BadgeVariant = 'available' | 'limited' | 'out' | 'pending' | 'active' | 'suspended'

const styles: Record<BadgeVariant, string> = {
  available: 'bg-[var(--color-green)] text-[var(--color-cream)]',
  limited:   'bg-[#7c5c1a] text-[var(--color-cream)]',
  out:       'bg-[rgba(250,248,243,0.12)] text-[rgba(250,248,243,0.5)] border border-[rgba(250,248,243,0.2)]',
  pending:   'bg-[#7c5c1a] text-[var(--color-cream)]',
  active:    'bg-[var(--color-green)] text-[var(--color-cream)]',
  suspended: 'bg-[rgba(250,248,243,0.12)] text-[rgba(250,248,243,0.5)] border border-[rgba(250,248,243,0.2)]',
}

const labels: Record<BadgeVariant, string> = {
  available: 'In Stock',
  limited:   'Limited',
  out:       'Out of Stock',
  pending:   'Pending Approval',
  active:    'Active',
  suspended: 'Suspended',
}

interface BadgeProps {
  variant: BadgeVariant
  label?: string
  className?: string
}

export function Badge({ variant, label, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-label px-2 py-0.5 rounded-[2px] ${styles[variant]} ${className}`}
    >
      {label ?? labels[variant]}
    </span>
  )
}
