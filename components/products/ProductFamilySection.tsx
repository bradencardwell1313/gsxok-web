import { ProductShowcaseCard } from './ProductShowcaseCard'
import type { ProductFamily } from '@/lib/products/catalog'

const G = 'w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24'

interface ProductFamilySectionProps {
  family: ProductFamily
  index: number
  /** Flagship gets a larger heading and larger package presentation. */
  emphasis?: 'flagship' | 'standard' | 'simple'
  tone?: 'cream' | 'cream-2'
}

export function ProductFamilySection({ family, index, emphasis = 'standard', tone = 'cream' }: ProductFamilySectionProps) {
  const cardSize = emphasis === 'flagship' ? 'large' : 'default'
  const count = family.variants.length

  const gridCols =
    count >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : count === 2 ? 'sm:grid-cols-2' : ''

  const singleItemWidth = count === 1 ? (emphasis === 'flagship' ? 'max-w-sm' : 'max-w-xs') : ''

  return (
    <section
      className="border-t border-[var(--color-border)]"
      style={{ backgroundColor: tone === 'cream' ? 'var(--color-cream)' : 'var(--color-cream-2)' }}
    >
      <div className={`${G} ${emphasis === 'simple' ? 'py-14 md:py-16' : 'py-16 md:py-20'}`}>
        <p className="text-label text-[var(--color-muted)]">{String(index).padStart(2, '0')}</p>
        <h2 className={`${emphasis === 'flagship' ? 'text-h1' : 'text-h2'} text-[var(--color-dark)] mt-2`}>
          {family.name}
        </h2>
        <p className="text-body text-[var(--color-muted)] mt-3 max-w-[52ch]">{family.description}</p>

        <div
          className={`grid grid-cols-1 ${gridCols} gap-x-8 gap-y-12 md:gap-x-12 mt-8 md:mt-10 ${
            singleItemWidth ? `${singleItemWidth} mx-auto` : ''
          }`}
        >
          {family.variants.map((variant) => (
            <ProductShowcaseCard key={variant.slug} variant={variant} size={cardSize} />
          ))}
        </div>
      </div>
    </section>
  )
}
