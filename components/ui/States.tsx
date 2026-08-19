// Empty, loading, and error state components.
// Used in portal pages, product grids, and async data sections.

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-12 h-12 mb-6 rounded-full border border-[rgba(250,248,243,0.15)] flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[rgba(250,248,243,0.3)]">
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
      </div>
      <p className="text-h4 text-[var(--color-cream)] mb-2">{title}</p>
      {description && (
        <p className="text-body text-[rgba(250,248,243,0.5)] max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  )
}

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-20 gap-3">
      <span
        className="block w-5 h-5 border-2 border-[rgba(250,248,243,0.2)] border-t-[var(--color-accent)] rounded-full animate-spin"
        aria-hidden="true"
      />
      <span className="text-body text-[rgba(250,248,243,0.5)]">{label}</span>
    </div>
  )
}

interface ErrorStateProps {
  title?: string
  description?: string
  retry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again or contact support if the problem persists.',
  retry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <p className="text-h4 text-red-400 mb-2">{title}</p>
      <p className="text-body text-[rgba(250,248,243,0.5)] max-w-sm mb-6">{description}</p>
      {retry && (
        <button
          onClick={retry}
          className="text-button text-[var(--color-accent)] uppercase tracking-[0.1em] hover:underline underline-offset-4"
        >
          Try again
        </button>
      )}
    </div>
  )
}
