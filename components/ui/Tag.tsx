// Taxonomy tags — product family, format, flavor, cannabinoid labels.
// Brand Bible: 2px border-radius max.

interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center text-label px-2 py-0.5 rounded-[2px] bg-[rgba(250,248,243,0.08)] text-[rgba(250,248,243,0.6)] border border-[rgba(250,248,243,0.12)] ${className}`}
    >
      {children}
    </span>
  )
}
