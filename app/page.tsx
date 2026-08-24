import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ImageHero } from '@/components/marketing/ImageHero'
import { ManufacturingHero } from '@/components/marketing/ManufacturingHero'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/layout/SectionLabel'
import { Button } from '@/components/ui/Button'
import { getSiteSettings, getAllProductFamilies, getAllArticles } from '@/lib/sanity/queries'

export const revalidate = 3600

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

        {/* ── 1. Hero ─────────────────────────────────────────────────────────
            Full-bleed, immersive. Let the photo carry the weight.
            Upload 56E9BD64 or 55323CB6 via Sanity Studio > Site Settings.
        ─────────────────────────────────────────────────────────────────────── */}
        <ImageHero
          eyebrow="Oklahoma Cannabis Manufacturer"
          headline="Built for retailers who care what they sell."
          subheadline="GSX makes precision-dosed edibles in-house, from formulation to final package."
          image={heroImage}
          overlayStrength={heroImage ? 'medium' : 'heavy'}
          minHeight="95vh"
          primaryCta={{ label: 'View Products', href: '/products' }}
          secondaryCta={{ label: 'Find GSX', href: '/find-gsx' }}
        />

        {/* ── 2. Brand Statement ──────────────────────────────────────────────
            No chrome. No badges. Direct prose. Credentialing through
            confident language, not a row of chips.
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="bg-[var(--color-dark)]">
          <Container className="py-24 md:py-32">
            <div className="max-w-3xl">
              <p className="text-h3 md:text-h2 text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-normal leading-snug">
                We develop, manufacture, and package every product ourselves&mdash;in our
                facility in Chelsea, Oklahoma.
              </p>
              <p className="text-body-lg text-[rgba(250,248,243,0.55)] mt-6 leading-relaxed max-w-2xl">
                No contract manufacturing. No outsourced formulation. We control every
                step because consistent product requires consistent process.
              </p>
              <p className="text-label text-[rgba(250,248,243,0.28)] mt-10 tracking-widest uppercase">
                OMMA Licensed Manufacturer &nbsp;&middot;&nbsp; Chelsea, OK 74016
              </p>
            </div>
          </Container>
        </div>

        {/* ── 3. Manufacturing Moment ─────────────────────────────────────────
            Cinematic. Large. Let the process image do the talking.
            Upload F1ABAA24 via Sanity Studio > Site Settings.
        ─────────────────────────────────────────────────────────────────────── */}
        <ManufacturingHero
          eyebrow="How We Work"
          headline="Documented process. Required testing. Consistent product."
          body="From ingredient sourcing to final packaging, every step follows written procedures. We track every batch so problems stay small and product stays reliable."
          image={processImage}
          cta={{ label: 'Our manufacturing process', href: '/manufacturing' }}
        />

        {/* ── 4. Products ─────────────────────────────────────────────────────
            Editorial statement, not a storefront grid.
            If Sanity has families, they appear as inline text links — not cards.
            Section hidden entirely when Sanity is empty.
        ─────────────────────────────────────────────────────────────────────── */}
        <Section background="darkAlt">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Left: statement */}
              <div className="flex flex-col gap-6">
                <SectionLabel>Products</SectionLabel>
                <h2 className="text-h1 text-[var(--color-cream)] leading-tight">
                  A focused lineup.<br />Built right.
                </h2>
                <p className="text-body-lg text-[rgba(250,248,243,0.55)] leading-relaxed">
                  Every GSX product is developed and manufactured in-house. We keep the
                  catalog tight because we&apos;re not interested in products we can&apos;t
                  do well.
                </p>
                <div className="pt-2">
                  <Button href="/products" variant="primary" size="lg">
                    View Products
                  </Button>
                </div>
              </div>

              {/* Right: family list — editorial inline links, only when Sanity has content */}
              {families.length > 0 && (
                <div className="flex flex-col gap-0 border-t border-[rgba(250,248,243,0.08)] lg:border-t-0 lg:border-l lg:border-[rgba(250,248,243,0.08)] pt-12 lg:pt-0 lg:pl-16 self-center">
                  {families.map((family, i) => (
                    <Link
                      key={family._id}
                      href={`/products?family=${family.slug.current}`}
                      className={`group flex items-center justify-between py-5 border-b border-[rgba(250,248,243,0.07)] hover:border-[rgba(250,248,243,0.18)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]${i === 0 ? ' border-t border-t-[rgba(250,248,243,0.07)]' : ''}`}
                    >
                      <span className="text-h4 text-[rgba(250,248,243,0.65)] group-hover:text-[var(--color-cream)] transition-colors duration-150">
                        {family.name}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="text-[rgba(250,248,243,0.25)] group-hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="square"
                          strokeLinejoin="miter"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </Section>

        {/* ── 5. Find GSX ─────────────────────────────────────────────────────
            Minimal. One line, one button. Not a boxed module.
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="bg-[var(--color-dark)] border-t border-[rgba(250,248,243,0.06)]">
          <Container className="py-20 md:py-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-h2 text-[var(--color-cream)] leading-tight">
                  Find GSX near you.
                </h2>
                <p className="text-body text-[rgba(250,248,243,0.5)]">
                  Available at select dispensaries across Oklahoma.
                </p>
              </div>
              <Button href="/find-gsx" variant="secondary" size="lg" className="shrink-0">
                Find a Retailer
              </Button>
            </div>
          </Container>
        </div>

        {/* ── 6. Education Teaser ─────────────────────────────────────────────
            Hidden until articles exist in Sanity Studio.
        ─────────────────────────────────────────────────────────────────────── */}
        {featuredArticles.length > 0 && (
          <Section background="darkAlt">
            <Container>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="flex flex-col gap-3">
                  <SectionLabel>Education</SectionLabel>
                  <h2 className="text-h2 text-[var(--color-cream)] leading-tight">
                    Know what you&apos;re buying.
                  </h2>
                </div>
                <Button href="/learn" variant="secondary" size="md" className="shrink-0">
                  All Articles
                </Button>
              </div>
              <div className="flex flex-col divide-y divide-[rgba(250,248,243,0.07)]">
                {featuredArticles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/learn/${article.slug.current}`}
                    className="group flex flex-col sm:flex-row sm:items-start gap-4 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    {article.category && (
                      <span className="text-label text-[var(--color-accent)] shrink-0 sm:w-36 sm:pt-1">
                        {article.category.name}
                      </span>
                    )}
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="text-h4 text-[var(--color-cream)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-150">
                        {article.title}
                      </h3>
                      {article.summary && (
                        <p className="text-body-sm text-[rgba(250,248,243,0.45)] line-clamp-2">
                          {article.summary}
                        </p>
                      )}
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="text-[rgba(250,248,243,0.2)] group-hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0 mt-1 hidden sm:block"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* ── 7. Retailer Strip ────────────────────────────────────────────────
            Persistent retailer path. Green, direct, unfussy.
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="bg-[var(--color-green)]">
          <Container className="py-16 md:py-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-h2 text-[var(--color-cream)] leading-tight">
                  Carry GSX in your store.
                </h2>
                <p className="text-body text-[rgba(250,248,243,0.72)]">
                  Oklahoma-licensed dispensaries can apply to stock GSX products.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5 shrink-0">
                <Button href="/contact" variant="secondary" size="lg">
                  Carry GSX
                </Button>
                <Link
                  href="/login"
                  className="text-label text-[rgba(250,248,243,0.72)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:rounded-sm"
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
