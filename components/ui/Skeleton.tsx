// Skeleton — animated placeholder for content that's loading.
// Usage: drop in wherever you'd render a UI element while data fetches.
// Combines naturally with conditional rendering: {data ? <RealComponent /> : <Skeleton ... />}

interface SkeletonProps {
  /** Width — any valid CSS value, or 'full' for 100% */
  width?: string | 'full'
  /** Height — any valid CSS value */
  height?: string
  /** Shape shorthand */
  variant?: 'text' | 'rectangular' | 'circular'
  className?: string
}

const variantDefaults: Record<NonNullable<SkeletonProps['variant']>, { height: string; borderRadius: string }> = {
  text:        { height: '1em',   borderRadius: '2px' },
  rectangular: { height: '120px', borderRadius: '0px' },
  circular:    { height: '40px',  borderRadius: '50%' },
}

export function Skeleton({
  width,
  height,
  variant = 'rectangular',
  className = '',
}: SkeletonProps) {
  const defaults = variantDefaults[variant]
  const resolvedWidth = width === 'full' ? '100%' : (width ?? '100%')
  const resolvedHeight = height ?? defaults.height

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`animate-pulse bg-[rgba(250,248,243,0.07)] ${className}`}
      style={{
        width: resolvedWidth,
        height: resolvedHeight,
        borderRadius: defaults.borderRadius,
        minHeight: resolvedHeight,
      }}
    />
  )
}

// ── Preset compositions ───────────────────────────────────────

/** A one-line text skeleton that spans ~80% of its container */
export function SkeletonText({ lines = 1, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`} aria-hidden="true" role="presentation">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="text"
          // Last line is shorter — mirrors natural paragraph text
          width={i === lines - 1 && lines > 1 ? '65%' : '100%'}
        />
      ))}
    </div>
  )
}

/** Product card skeleton — mirrors ProductCard dimensions */
export function SkeletonProductCard() {
  return (
    <div aria-hidden="true" role="presentation" className="flex flex-col gap-4">
      <Skeleton variant="rectangular" height="200px" width="full" />
      <div className="flex flex-col gap-2 px-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <div className="flex gap-2 mt-1">
          <Skeleton variant="text" width="48px" height="20px" />
          <Skeleton variant="text" width="48px" height="20px" />
        </div>
      </div>
    </div>
  )
}

/** Nav right-side skeleton — used while session loads */
export function SkeletonNavRight() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="w-24 h-4 bg-[rgba(250,248,243,0.1)] animate-pulse"
    />
  )
}
