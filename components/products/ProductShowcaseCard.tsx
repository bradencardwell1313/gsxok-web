import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import type { ProductVariant } from '@/lib/products/catalog'

// Light-theme product card for the cream product-showcase pages (Products
// page and similar catalog contexts). Distinct from components/cards/
// ProductCard.tsx, which is a dark-theme wholesale/portal card that links to
// a per-product detail route. This card never links to a detail page — it
// shows the real package art plus the consumer CTA only.

interface ProductShowcaseCardProps {
  variant: ProductVariant
  /**
   * 'large' = flagship (Chocolate Bites), 'medium' = the other multi-product
   * families (Gummies, Fruit Crunchers), 'default' = single-SKU families
   * (The Hammer) which are deliberately left at their original size rather
   * than enlarged to fill their column.
   */
  size?: 'default' | 'medium' | 'large'
}

const maxWidthClass: Record<NonNullable<ProductShowcaseCardProps['size']>, string> = {
  default: 'max-w-[220px]',
  medium: 'max-w-[250px]',
  large: 'max-w-[320px]',
}

const imageSizes: Record<NonNullable<ProductShowcaseCardProps['size']>, string> = {
  default: '(max-width: 768px) 45vw, 220px',
  medium: '(max-width: 768px) 45vw, 250px',
  large: '(max-width: 768px) 60vw, 320px',
}

export function ProductShowcaseCard({ variant, size = 'default' }: ProductShowcaseCardProps) {
  const facts = [variant.enhancement, variant.ratio, variant.netWeight, variant.pieceCount, variant.perPiece].filter(
    Boolean
  )

  return (
    <div className="flex flex-col items-center text-center">
      <div className={`w-full flex items-center justify-center ${maxWidthClass[size]}`}>
        <Image
          src={variant.imageUrl}
          alt={variant.imageAlt}
          width={variant.imageWidth}
          height={variant.imageHeight}
          sizes={imageSizes[size]}
          className="w-full h-auto"
        />
      </div>

      <h3 className={`${size === 'large' ? 'text-h3' : 'text-h4'} text-[var(--color-dark)] mt-5`}>
        {variant.name}
      </h3>

      {variant.flavor && (
        <p className="text-body-sm text-[var(--color-muted)] mt-1">{variant.flavor}</p>
      )}

      {facts.length > 0 && (
        <p className="text-label text-[var(--color-muted)] mt-2 max-w-[26ch]">
          {facts.join(' · ')}
        </p>
      )}

      <Button href="/find-gsx" variant="primary" size="sm" className="mt-5">
        Find This Product Near You
      </Button>
    </div>
  )
}
