import { type ComponentPropsWithoutRef } from 'react'

// Responsive grid. Default gap: 24px (gap-6).
// cols prop: number of columns on desktop. Always 1 col on mobile, 2 on sm.

type Cols = 2 | 3 | 4

const colStyles: Record<Cols, string> = {
  2: 'md:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

interface GridProps extends ComponentPropsWithoutRef<'div'> {
  cols?: Cols
  gap?: 'sm' | 'md' | 'lg'
}

const gapStyles = { sm: 'gap-4', md: 'gap-6', lg: 'gap-8' }

export function Grid({
  cols = 3,
  gap = 'md',
  className = '',
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={`grid grid-cols-1 ${colStyles[cols]} ${gapStyles[gap]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
