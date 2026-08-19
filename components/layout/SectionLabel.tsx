// Section label — uppercase text with a leading green vertical line.
// From Brand Bible: .section-label with ::before green 24px line.
// Used above section headings to establish context (e.g., "Our Process").

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  light?: boolean // For use on light/cream backgrounds
}

export function SectionLabel({ children, className = '', light = false }: SectionLabelProps) {
  return (
    <p
      className={`section-label text-label ${
        light ? 'text-[var(--color-dark)]' : 'text-[rgba(250,248,243,0.6)]'
      } ${className}`}
    >
      {children}
    </p>
  )
}
