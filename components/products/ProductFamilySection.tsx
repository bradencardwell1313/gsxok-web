import { ProductShowcaseCard } from './ProductShowcaseCard'
import type { ProductFamily } from '@/lib/products/catalog'

const G = 'w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24'

interface ProductFamilySectionProps {
  family: ProductFamily
  index: number
  /** Flagship gets larger package artwork and a wider product column (not a larger heading, headings stay uniform across families). */
  emphasis?: 'flagship' | 'standard' | 'simple'
  tone?: 'cream' | 'cream-2'
  /** Anchor id for footer/nav deep links (e.g. footer's "/products#gummies"). */
  id?: string
}

export function ProductFamilySection({ family, index, emphasis = 'standard', tone = 'cream', id }: ProductFamilySectionProps) {
  // Flagship (Chocolate Bites) gets larger artwork; single-SKU families
  // (The Hammer) stay at the original size rather than being stretched to
  // fill their column. Standard families sit at the row-favoring end of the
  // approved 30-35 / 65-70 split (30/70) so their 3-across row is as wide as
  // spec allows; flagship goes slightly past that (26/74) specifically so
  // its artwork still reads as visibly larger than standard's, which is
  // already at the spec ceiling. The split only activates at xl (1280px+);
  // below that, three fixed-width cards in a ~65-70% column would be too
  // cramped to read as a "horizontal editorial row" rather than "squeezed",
  // so it stacks instead (full-width row, same responsive column count as
  // before this pass).
  const cardSize = emphasis === 'flagship' ? 'large' : emphasis === 'simple' ? 'default' : 'medium'
  const count = family.variants.length
  const introSplit = emphasis === 'flagship' ? 'xl:grid-cols-[26fr_74fr]' : 'xl:grid-cols-[30fr_70fr]'

  const rowCols =
    count >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : count === 2 ? 'sm:grid-cols-2' : ''

  return (
    <section
      id={id}
      className="relative border-t border-[var(--color-border)] scroll-mt-16 md:scroll-mt-18 bg-[length:100%_96px] md:bg-[length:100%_160px] bg-no-repeat bg-top"
      style={{
        backgroundColor: tone === 'cream' ? 'var(--color-cream)' : 'var(--color-cream-2)',
        // Shallow green-to-cream fade at the very top edge only — strongest
        // in the first 20% of the fade box (roughly 19px mobile / 32px
        // desktop), fully resolved to transparent (pure cream showing
        // through) by 60% of the box (roughly 58px mobile / 96px desktop),
        // well before the family intro/product content renders. Percentage
        // stops so the same gradient scales correctly for the two
        // background-size heights set in className above.
        backgroundImage:
          'linear-gradient(to bottom, rgba(26,122,74,0.32) 0%, rgba(26,122,74,0.12) 20%, rgba(26,122,74,0) 60%, rgba(26,122,74,0) 100%)',
      }}
    >
      <div className={`${G} ${emphasis === 'simple' ? 'py-10 md:py-12' : 'py-12 md:py-16'}`}>
        <div className={`xl:grid ${introSplit} xl:items-center xl:gap-x-12`}>
          {/* Family intro: heading, green rule, description */}
          <div>
            <h2 className="text-h2 text-[var(--color-dark)] mt-2">
              {family.name}
            </h2>
            <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-green)', marginTop: '0.9rem' }} />
            <p className="text-body text-[var(--color-muted)] mt-3 max-w-[42ch]">{family.description}</p>
          </div>

          {/* Product row: horizontal on desktop, stacks under the intro below xl */}
          <div
            className={`grid grid-cols-1 ${rowCols} gap-x-6 gap-y-10 mt-8 xl:mt-0 ${
              count === 1 ? 'max-w-xs xl:max-w-none' : ''
            }`}
          >
            {family.variants.map((variant) => (
              <ProductShowcaseCard key={variant.slug} variant={variant} size={cardSize} alignToRow={count > 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
