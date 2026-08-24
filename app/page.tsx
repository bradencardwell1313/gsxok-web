import Image from 'next/image'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { getSiteSettings, getAllProductFamilies, getAllArticles } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'

export const revalidate = 3600

type SanitySettings = Record<string, unknown>
type ProductFamily  = { _id: string; name: string; slug: { current: string } }
type Article        = { _id: string; title: string; slug: { current: string }; summary?: string; category?: { name: string } }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImage    = any

function hotspotPos(img?: SanityImage) {
  if (!img?.hotspot) return 'center center'
  return `${Math.round(img.hotspot.x * 100)}% ${Math.round(img.hotspot.y * 100)}%`
}

// One horizontal grid used everywhere — creates the continuous column feel
const G = 'w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24'

// Visible structural rule — the "actual separation holder" between sections
function Rule() {
  return <div className={`${G}`}><div className="h-px bg-[rgba(250,248,243,0.13)]" /></div>
}

export default async function HomePage() {
  const [settings, productFamilies, articles] = await Promise.allSettled([
    getSiteSettings(),
    getAllProductFamilies(),
    getAllArticles(),
  ])

  const s        = settings.status        === 'fulfilled' ? (settings.value as SanitySettings) : null
  const families = productFamilies.status === 'fulfilled' && Array.isArray(productFamilies.value) ? productFamilies.value as ProductFamily[] : []
  const featured = (articles.status       === 'fulfilled' && Array.isArray(articles.value) ? articles.value as Article[] : []).slice(0, 3)

  const heroImg    : SanityImage = s?.heroImage    ?? null
  const processImg : SanityImage = s?.processImage ?? null
  const heroSrc    = heroImg    ? urlFor(heroImg).auto('format').fit('max').width(1920).url() : null
  const processSrc = processImg ? urlFor(processImg).auto('format').fit('max').width(1400).url() : null

  return (
    <>
      <Nav />
      <main className="bg-[#0c0c0b]">

        {/* ── HERO ──────────────────────────────────────────────────────────────
            65vh — impactful but not a full-page slab.
            Content is in the lower portion; photo fills the rest.
        ─────────────────────────────────────────────────────────────────────── */}
        <section
          aria-label="Hero"
          className="relative flex flex-col justify-end overflow-hidden"
          style={{ minHeight: '65vh' }}
        >
          {heroSrc && (
            <Image
              src={heroSrc}
              alt={heroImg?.alt ?? ''}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: hotspotPos(heroImg) }}
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: heroSrc
                ? 'linear-gradient(to top, #0c0c0b 0%, rgba(12,12,11,0.65) 38%, rgba(12,12,11,0.1) 75%, transparent 100%)'
                : 'linear-gradient(160deg, #111110 0%, #0c0c0b 100%)',
            }}
          />
          <div className={`${G} relative z-10 pb-10 md:pb-12 pt-20`}>
            <h1
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: '0.97', letterSpacing: '-0.04em', maxWidth: '16ch' }}
            >
              Built for retailers who care what they sell.
            </h1>
            <p
              className="text-[rgba(250,248,243,0.52)] font-[family-name:var(--font-manrope)] font-light"
              style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', lineHeight: '1.65', marginTop: '1rem', maxWidth: '40ch' }}
            >
              GSX makes precision-dosed edibles in-house, from formulation to final package.
            </p>
            <div className="flex flex-wrap items-center gap-4" style={{ marginTop: '1.5rem' }}>
              <Button href="/products" variant="primary" size="lg">View Products</Button>
              <Link
                href="/find-gsx"
                className="text-button text-[rgba(250,248,243,0.42)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
              >
                Find GSX →
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATEMENT ─────────────────────────────────────────────────────────
            Tight. Flows directly from the hero — same bg, no gap between them.
        ─────────────────────────────────────────────────────────────────────── */}
        <div className={G} style={{ paddingTop: '2.5rem', paddingBottom: '2.75rem' }}>
          <div className="h-px bg-[rgba(250,248,243,0.1)] mb-7" />
          <div style={{ maxWidth: '52ch' }}>
            <p
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-normal"
              style={{ fontSize: 'clamp(1.25rem, 2.25vw, 1.875rem)', lineHeight: '1.18', letterSpacing: '-0.022em' }}
            >
              We develop, manufacture, and package every product ourselves&mdash;in Chelsea, Oklahoma. No contract manufacturing. No outsourced formulation.
            </p>
            <p className="text-label text-[rgba(250,248,243,0.24)]" style={{ marginTop: '1.5rem' }}>
              OMMA Licensed Manufacturer &nbsp;&middot;&nbsp; Chelsea, OK 74016
            </p>
          </div>
        </div>

        <Rule />

        <div className="bg-[#0f1a14] overflow-hidden" style={{ minHeight: processSrc ? '460px' : 'auto' }}>
          <div className={processSrc ? 'lg:grid lg:grid-cols-2' : ''} style={{ minHeight: 'inherit' }}>
            <div
              className="flex flex-col justify-center"
              style={{
                paddingTop: '3rem',
                paddingBottom: '3rem',
                paddingLeft:  'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
                paddingRight: processSrc ? '2.5rem' : 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
              }}
            >
              <div style={{ maxWidth: '440px' }}>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                  style={{ fontSize: 'clamp(1.625rem, 3.25vw, 2.875rem)', lineHeight: '1.02', letterSpacing: '-0.032em' }}
                >
                  Documented process.<br />Consistent product.
                </h2>
                <p
                  className="text-[rgba(250,248,243,0.5)] font-[family-name:var(--font-manrope)] font-light"
                  style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', lineHeight: '1.68', marginTop: '1rem' }}
                >
                  From ingredient sourcing to final packaging, every step follows written procedures. We track every batch so problems stay small and product stays reliable.
                </p>
                <Link
                  href="/manufacturing"
                  className="inline-flex items-center gap-2 text-label text-[rgba(250,248,243,0.4)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                  style={{ marginTop: '1.75rem' }}
                >
                  Our manufacturing process
                  <svg width="13" height="9" viewBox="0 0 13 9" fill="none" aria-hidden="true">
                    <path d="M1 4.5h11M7.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"/>
                  </svg>
                </Link>
              </div>
            </div>
            {processSrc && (
              <div className="relative min-h-[280px] lg:min-h-0 overflow-hidden">
                <Image
                  src={processSrc}
                  alt={processImg?.alt ?? ''}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: hotspotPos(processImg) }}
                />
                <div
                  className="hidden lg:block absolute inset-y-0 left-0 w-16 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, #0f1a14, transparent)' }}
                />
              </div>
            )}
          </div>
        </div>

        <Rule />

        <div className={G} style={{ paddingTop: '2.75rem', paddingBottom: '2.75rem' }}>
          <div className={`flex flex-col ${families.length > 0 ? 'lg:grid lg:grid-cols-[1fr_0.9fr] lg:gap-16' : ''} lg:items-start`}>
            <div>
              <h2
                className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                style={{ fontSize: 'clamp(1.625rem, 3.25vw, 2.875rem)', lineHeight: '1.02', letterSpacing: '-0.032em', maxWidth: '14ch' }}
              >
                A focused lineup. Built right.
              </h2>
              <p
                className="text-[rgba(250,248,243,0.48)] font-[family-name:var(--font-manrope)] font-light"
                style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', lineHeight: '1.68', marginTop: '1rem', maxWidth: '42ch' }}
              >
                Every GSX product is developed and manufactured in-house. We keep the catalog tight because we&apos;re not interested in products we can&apos;t do well.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <Button href="/products" variant="primary" size="lg">View Products</Button>
              </div>
            </div>
            {families.length > 0 && (
              <div className="mt-10 lg:mt-0 border-t border-[rgba(250,248,243,0.08)] pt-6 lg:border-t-0 lg:border-l lg:border-[rgba(250,248,243,0.1)] lg:pt-0 lg:pl-12 self-center">
                {families.map((f) => (
                  <Link
                    key={f._id}
                    href={`/products?family=${f.slug.current}`}
                    className="group flex items-center justify-between border-b border-[rgba(250,248,243,0.07)] hover:border-[rgba(250,248,243,0.15)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                    style={{ paddingTop: '0.9rem', paddingBottom: '0.9rem' }}
                  >
                    <span
                      className="text-[rgba(250,248,243,0.56)] font-[family-name:var(--font-space-grotesk)] font-medium group-hover:text-[var(--color-cream)] transition-colors duration-150"
                      style={{ fontSize: 'clamp(1rem, 1.6vw, 1.375rem)', letterSpacing: '-0.015em' }}
                    >
                      {f.name}
                    </span>
                    <svg width="13" height="9" viewBox="0 0 13 9" fill="none" aria-hidden="true"
                      className="text-[rgba(250,248,243,0.18)] group-hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0 ml-5">
                      <path d="M1 4.5h11M7.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <Rule />

        <div className={G} style={{ paddingTop: '2rem', paddingBottom: '2.25rem' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2
                className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', lineHeight: '1.1', letterSpacing: '-0.022em' }}
              >
                Find GSX near you.
              </h2>
              <p
                className="text-[rgba(250,248,243,0.4)] font-[family-name:var(--font-manrope)]"
                style={{ fontSize: '0.875rem', marginTop: '0.3rem' }}
              >
                Available at select dispensaries across Oklahoma.
              </p>
            </div>
            <Button href="/find-gsx" variant="secondary" size="md" className="shrink-0">
              Find a Retailer
            </Button>
          </div>
        </div>

        {featured.length > 0 && (
          <>
            <Rule />
            <div className={G} style={{ paddingTop: '2rem', paddingBottom: '2.5rem' }}>
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', letterSpacing: '-0.015em' }}
                >
                  From the lab
                </h2>
                <Link
                  href="/learn"
                  className="text-label text-[rgba(250,248,243,0.3)] hover:text-[var(--color-cream)] transition-colors duration-150 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                >
                  All articles →
                </Link>
              </div>
              {featured.map((a, i) => (
                <Link
                  key={a._id}
                  href={`/learn/${a.slug.current}`}
                  className={`group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-[rgba(250,248,243,0.07)] hover:border-[rgba(250,248,243,0.14)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${i === 0 ? 'border-t border-t-[rgba(250,248,243,0.07)]' : ''}`}
                  style={{ paddingTop: '0.875rem', paddingBottom: '0.875rem' }}
                >
                  {a.category && (
                    <span className="text-label text-[rgba(250,248,243,0.28)] shrink-0 sm:w-24">{a.category.name}</span>
                  )}
                  <span
                    className="text-[rgba(250,248,243,0.6)] font-[family-name:var(--font-space-grotesk)] font-medium group-hover:text-[var(--color-cream)] transition-colors duration-150 flex-1"
                    style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1.125rem)', letterSpacing: '-0.012em' }}
                  >
                    {a.title}
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="bg-[var(--color-green)]">
          <div className={G} style={{ paddingTop: '2rem', paddingBottom: '2.25rem' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                  style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', lineHeight: '1.1', letterSpacing: '-0.022em' }}
                >
                  Carry GSX in your store.
                </h2>
                <p
                  className="text-[rgba(250,248,243,0.62)] font-[family-name:var(--font-manrope)]"
                  style={{ fontSize: '0.875rem', marginTop: '0.3rem' }}
                >
                  Oklahoma-licensed dispensaries can apply to stock GSX products.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <Button href="/contact" variant="secondary" size="md">Carry GSX</Button>
                <Link
                  href="/login"
                  className="text-button text-[rgba(250,248,243,0.52)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:rounded-sm"
                >
                  Retailer Portal →
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
