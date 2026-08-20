import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ImageHero } from '@/components/marketing/ImageHero'
import { ManufacturingHero } from '@/components/marketing/ManufacturingHero'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { SectionLabel } from '@/components/layout/SectionLabel'
import { Button } from '@/components/ui/Button'
import { getSiteSettings, getAllProductFamilies, getAllArticles } from '@/lib/sanity/queries'

export const revalidate = 3600

// Opaque types returned by Sanity — typed loosely at the page level.
// Individual component interfaces handle their own typing.
type SanitySettings = Record<string, unknown>
type ProductFamily = {
  _id: string
  name: string
  slug: { current: string }
  description?: string
}
type Article = {
  _id: string
  title: string
  slug: { current: string }
  summary?: string
  category?: { name: string }
}

const PROOF_POINTS = [
  'OMMA Licensed Manufacturer',
  'Third-Party Lab Tested',
  'Made in Chelsea, Oklahoma',
  'Consistent Dosing in Every Unit',
]

export default async function HomePage() {
  const [settings, productFamilies, articles] = await Promise.allSettled([
    getSiteSettings(),
    getAllProductFamilies(),
    getAllArticles(),
  ])

  const s = settings.status === 'fulfilled' ? (settings.value as SanitySettings) : null
  const families: ProductFamily[] =
    productFamilies.status === 'fulfilled' && Array.isArray(productFamilies.value)
      ? productFamilies.value
      : []
  const allArticles: Article[] =
    articles.status === 'fulfilled' && Array.isArray(articles.value) ? articles.value : []
  const featuredArticles = allArticles.slice(0, 3)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroImage = s?.heroImage as any ?? null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processImage = s?.processImage as any ?? null

  return (
    <>
      <Nav />
      <main>
        {/* ── 1. Hero ─────────────────────────────────────────────── */}
        <ImageHero
          eyebrow="Green Science Extracts"
          headline="Oklahoma Cannabis, Manufactured Right."
          subheadline="Precision-dosed edibles developed and produced in-house. Available at dispensaries across Oklahoma."
          image={heroImage}
          overlayStrength={heroImage ? 'medium' : 'heavy'}
          primaryCta={{ label: 'View Products', href: '/products' }}
          secondaryCta={{ label: 'Find GSX', href: '/find-gsx' }}
        />

        {/* ── 2. Proof bar ─────────────────────────────────────────── */}
        <div className="bg-[#0a1410] border-b border-[rgba(250,248,243,0.06)]">
          <Container className="py-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-6 md:gap-0 md:divide-x md:divide-[rgba(250,248,243,0.08)]">
              {PROOF_POINTS.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-3 md:px-8 first:pl-0 last:pr-0"
                >
                  <span
                    className="w-1.5 h-1.5 shrink-0 bg-[var(--color-accent)]"
                    style={{ borderRadius: '0px' }}
                    aria-hidden="true"
                  />
                  <span className="text-label text-[rgba(250,248,243,0.55)]">{label}</span>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* ── 3. Product Families ──────────────────────────────────── */}
        <Section background="darkAlt">
          <Container>
            <SectionLabel>What We Make</SectionLabel>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4 mb-12">
              <h2 className="text-h1 text-[var(--color-cream)] max-w-md leading-tight">
                A focused lineup.<br />Zero shortcuts.
              </h2>
              <Button href="/products" variant="secondary" size="md" className="shrink-0">
                View All Products
              </Button>
            </div>

            {families.length > 0 ? (
              <Grid cols={3} gap="md">
                {families.map((family) => (
                  <Link
                    key={family._id}
                    href={`/products?family=${family.slug.current}`}
                    className="group flex flex-col gap-4 p-8 border border-[rgba(250,248,243,0.08)] bg-[rgba(250,248,243,0.02)] hover:border-[rgba(250,248,243,0.18)] hover:bg-[rgba(250,248,243,0.04)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    <h3 className="text-h3 text-[var(--color-cream)] group-hover:text-[var(--color-accent)] transition-colors duration-150">
                      {family.name}
                    </h3>
                    {family.description && (
                      <p className="text-body-sm text-[rgba(250,248,243,0.5)] leading-relaxed flex-1">
                        {family.description}
                      </p>
                    )}
                    <span className="flex items-center gap-2 text-label text-[var(--color-accent)] mt-auto pt-4">
                      Shop {family.name}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 7h10M8 3l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="square"
                          strokeLinejoin="miter"
                        />
                      </svg>
                    </span>
                  </Link>
                ))}
              </Grid>
            ) : (
              /* Placeholder grid while Sanity is populated via Studio */
              <Grid cols={3} gap="md">
                {['Gummies', 'Chocolates', 'Tinctures'].map((name) => (
                  <div
                    key={name}
                    className="flex flex-col gap-4 p-8 border border-[rgba(250,248,243,0.08)] bg-[rgba(250,248,243,0.02)]"
                  >
                    <h3 className="text-h3 text-[var(--color-cream)]">{name}</h3>
                    <p className="text-body-sm text-[rgba(250,248,243,0.4)] flex-1">
                      Available in multiple cannabinoid profiles and dosing options.
                    </p>
                    <span className="text-label text-[var(--color-accent)] mt-auto pt-4">
                      Shop {name} →
                    </span>
                  </div>
                ))}
              </Grid>
            )}
          </Container>
        </Section>

        {/* ── 4. Manufacturing Story ───────────────────────────────── */}
        <ManufacturingHero
          eyebrow="Our Process"
          headline="Every product made the same way, every time."
          body="We don't cut corners on process or ingredients. Every batch follows documented procedures, undergoes third-party testing, and ships only when it meets our internal standards."
          image={processImage}
          stat={[
            { value: '100%', label: 'Third-party lab tested' },
            { value: 'OMMA', label: 'Licensed facility' },
            { value: 'In-house', label: 'Development & production' },
          ]}
          cta={{ label: 'See how we make it', href: '/about' }}
        />

        {/* ── 5. Find GSX ─────────────────────────────────────────── */}
        <Section background="cream">
          <Container>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="flex flex-col gap-4 max-w-lg">
                <SectionLabel className="text-[rgba(15,26,20,0.5)]">Retail Locations</SectionLabel>
                <h2 className="text-h2 text-[var(--color-dark)] leading-tight">
                  Find GSX at a dispensary near you.
                </h2>
                <p className="text-body text-[rgba(15,26,20,0.6)] leading-relaxed">
                  GSX products are available at select Oklahoma dispensaries. Use our retailer map
                  to find a location carrying your preferred products.
                </p>
              </div>
              <div className="shrink-0">
                <Button
                  href="/find-gsx"
                  variant="primary"
                  size="lg"
                  className="bg-[var(--color-dark)] border-[var(--color-dark)] hover:bg-[rgba(15,26,20,0.85)] hover:border-[rgba(15,26,20,0.85)]"
                >
                  Find a Retailer
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* ── 6. Education Teaser — only rendered once Sanity has articles ── */}
        {featuredArticles.length > 0 && (
          <Section background="dark">
            <Container>
              <SectionLabel>From the Lab</SectionLabel>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4 mb-12">
                <h2 className="text-h2 text-[var(--color-cream)] max-w-sm leading-tight">
                  Know what you&apos;re buying.
                </h2>
                <Button href="/learn" variant="secondary" size="md" className="shrink-0">
                  All Articles
                </Button>
              </div>
              <Grid cols={3} gap="md">
                {featuredArticles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/learn/${article.slug.current}`}
                    className="group flex flex-col gap-3 p-6 border border-[rgba(250,248,243,0.08)] hover:border-[rgba(250,248,243,0.18)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    {article.category && (
                      <span className="text-label text-[var(--color-accent)]">
                        {article.category.name}
                      </span>
                    )}
                    <h3 className="text-h4 text-[var(--color-cream)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-150">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="text-body-sm text-[rgba(250,248,243,0.5)] line-clamp-3 flex-1">
                        {article.summary}
                      </p>
                    )}
                    <span className="text-label text-[rgba(250,248,243,0.35)] mt-auto pt-4">
                      Read more →
                    </span>
                  </Link>
                ))}
              </Grid>
            </Container>
          </Section>
        )}

        {/* ── 7. Retailer CTA Strip ────────────────────────────────── */}
        <div className="bg-[var(--color-green)]">
          <Container className="py-16 md:py-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex flex-col gap-2 max-w-md">
                <h2 className="text-h2 text-[var(--color-cream)] leading-tight">
                  Carry GSX in your store.
                </h2>
                <p className="text-body text-[rgba(250,248,243,0.72)]">
                  Oklahoma-licensed dispensaries can apply to stock GSX products.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <Button href="/contact" variant="secondary" size="lg">
                  Carry GSX
                </Button>
                <Link
                  href="/login"
                  className="text-label text-[rgba(250,248,243,0.72)] hover:text-[var(--color-cream)] transition-colors duration-150 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:rounded-sm"
                >
                  Retailer Portal →
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  )
}
