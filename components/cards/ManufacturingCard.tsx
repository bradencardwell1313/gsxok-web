import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface ManufacturingCardProps {
  order: number
  title: string
  description: string
  icon?: SanityImageSource & { alt?: string }
}

export function ManufacturingCard({ order, title, description, icon }: ManufacturingCardProps) {
  return (
    <div className="flex flex-col gap-5 p-6 border-t border-[rgba(250,248,243,0.12)]">
      {/* Step number + icon row */}
      <div className="flex items-center gap-4">
        <span className="text-display text-[rgba(250,248,243,0.08)] font-[family-name:var(--font-space-grotesk)] font-bold leading-none select-none">
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
        <h3 className="text-h3 text-[var(--color-cream)]">{title}</h3>
        <p className="text-body text-[rgba(250,248,243,0.55)] leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
