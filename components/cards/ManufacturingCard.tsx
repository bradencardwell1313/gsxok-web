// components/cards/ManufacturingCard.tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface ManufacturingCardProps {
  order: number
  title: string
  description: string
  icon?: SanityImageSource & { alt?: string }
  /**
   * 'dark' (default) = cream text, for use on dark section backgrounds
   * (existing behavior, unchanged). 'light' = ink text, for use on cream
   * section backgrounds (e.g. About page's process section).
   */
  tone?: 'dark' | 'light'
}

export function ManufacturingCard({ order, title, description, icon, tone = 'dark' }: ManufacturingCardProps) {
  const isLight = tone === 'light'
  return (
    <div className={`flex flex-col gap-5 p-6 border-t ${isLight ? 'border-[var(--color-border)]' : 'border-[rgba(250,248,243,0.12)]'}`}>
      {/* Step number + icon row */}
      <div className="flex items-center gap-4">
        <span
          className={`text-display font-[family-name:var(--font-space-grotesk)] font-bold leading-none select-none ${
            isLight ? 'text-[rgba(15,26,20,0.08)]' : 'text-[rgba(250,248,243,0.08)]'
          }`}
        >
          {String(order).padStart(2, '0')}
        </span>
        {icon && (
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src={urlFor(icon).width(80).height(80).url()}
              alt={(icon as { alt?: string }).alt ?? title}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className={`text-h3 ${isLight ? 'text-[var(--color-dark)]' : 'text-[var(--color-cream)]'}`}>{title}</h3>
        <p className={`text-body leading-relaxed ${isLight ? 'text-[var(--color-muted)]' : 'text-[rgba(250,248,243,0.55)]'}`}>{description}</p>
      </div>
    </div>
  )
}
