import Link from 'next/link'
import { ImageContainer } from '@/components/media/ImageContainer'
import { Badge } from '@/components/ui/Badge'
import { Tag } from '@/components/ui/Tag'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface CannabinoidEntry {
  cannabinoid: { name: string; abbreviation: string }
  amountMg: number
}

interface ProductCardProps {
  name: string
  slug: string
  shortDescription?: string
  image?: SanityImageSource & { alt?: string; hotspot?: { x: number; y: number } }
  wholesalePrice?: number
  availabilityStatus?: 'in_stock' | 'limited' | 'out_of_stock' | 'discontinued'
  cannabinoidProfile?: CannabinoidEntry[]
  totalMgPerUnit?: number
  productFamily?: { name: string }
  showPrice?: boolean  // Must be explicitly true — never shown on public-facing pages
}

const availabilityMap = {
  in_stock:     'available',
  limited:      'limited',
  out_of_stock: 'out',
  discontinued: 'out',
} as const

export function ProductCard({
  name,
  slug,
  shortDescription,
  image,
  wholesalePrice,
  availabilityStatus = 'in_stock',
  cannabinoidProfile,
  totalMgPerUnit,
  productFamily,
  showPrice = false,
}: ProductCardProps) {
  const badgeVariant = availabilityMap[availabilityStatus]

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col bg-[rgba(250,248,243,0.04)] border border-[rgba(250,248,243,0.08)] hover:border-[rgba(250,248,243,0.16)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    >
      {/* Image */}
      {image ? (
        <ImageContainer
          image={image}
          ratio="3/2"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="overflow-hidden"
        />
      ) : (
        <div className="aspect-[3/2] bg-[rgba(250,248,243,0.06)] flex items-center justify-center">
          <span className="text-label text-[rgba(250,248,243,0.2)]">No image</span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            {productFamily && (
              <p className="text-label text-[rgba(250,248,243,0.4)]">{productFamily.name}</p>
            )}
            <h3 className="text-h4 text-[var(--color-cream)] leading-snug">{name}</h3>
          </div>
          <Badge variant={badgeVariant} className="mt-0.5 shrink-0" />
        </div>

        {/* Cannabinoid profile */}
        {cannabinoidProfile && cannabinoidProfile.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {cannabinoidProfile.map(({ cannabinoid, amountMg }) => (
              <Tag key={cannabinoid.abbreviation}>
                {cannabinoid.abbreviation} {amountMg}mg
              </Tag>
            ))}
            {totalMgPerUnit && (
              <Tag>{totalMgPerUnit}mg total</Tag>
            )}
          </div>
        )}

        {/* Description */}
        {shortDescription && (
          <p className="text-body-sm text-[rgba(250,248,243,0.5)] line-clamp-2 flex-1">
            {shortDescription}
          </p>
        )}

        {/* Price — only shown when explicitly enabled (portal context) */}
        {showPrice && wholesalePrice !== undefined && (
          <p className="text-body text-[var(--color-cream)] mt-auto pt-2 border-t border-[rgba(250,248,243,0.06)]">
            ${wholesalePrice.toFixed(2)}
            <span className="text-label text-[rgba(250,248,243,0.35)] ml-1">wholesale</span>
          </p>
        )}
      </div>
    </Link>
  )
}
