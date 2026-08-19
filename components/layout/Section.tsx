import { type ComponentPropsWithoutRef } from 'react'

// Section wrapper — vertical rhythm.
// Default: py-20 md:py-28. Compact: py-12 md:py-16. Flush: no padding.

type SectionPadding = 'default' | 'compact' | 'flush'
type SectionBackground = 'dark' | 'darkAlt' | 'cream'

const paddingStyles: Record<SectionPadding, string> = {
  default: 'py-20 md:py-28',
  compact: 'py-12 md:py-16',
  flush: '',
}

const bgStyles: Record<SectionBackground, string> = {
  dark:    'bg-[var(--color-dark)]',
  darkAlt: 'bg-[#111d15]',      // slightly lighter than dark for alternating sections
  cream:   'bg-[var(--color-cream)] text-[var(--color-dark)]',
}

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  padding?: SectionPadding
  background?: SectionBackground
}

export function Section({
  padding = 'default',
  background = 'dark',
  className = '',
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={`${paddingStyles[padding]} ${bgStyles[background]} ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}
