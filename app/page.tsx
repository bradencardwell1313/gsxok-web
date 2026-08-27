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

const G = 'w-full max-w-[1280px] px-6 md:px-16 xl:px-24'

// Real GSX product photography (flavor renders already in the Sanity asset
// library). Shown as genuine product imagery — not a stand-in for real
// productFamily records, which don't exist yet.
const PRODUCT_SHOWCASE = [
  { name: 'Relax', url: 'https://cdn.sanity.io/images/o7wavkxv/production/700d25707bcc7fbd61ca0a7b69021cfb300b89f6-1840x1812.png' },
  { name: 'Balance', url: 'https://cdn.sanity.io/images/o7wavkxv/production/a58f9591f98e011ab78255b76fbc296a025eea00-1840x1812.png' },
  { name: 'Focus', url: 'https://cdn.sanity.io/images/o7wavkxv/production/642f1bec68400ec93d8c30bc752775cf29508755-1840x1812.png' },
]

function Rule({ className = '' }: { className?: string }) {
  return (
    <div className={`${G} ${className}`}>
      <div className="h-px bg-[rgba(250,248,243,0.12)]" />
    </div>
  )
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

        <section
          aria-label="Hero"
          className="relative flex flex-col justify-end overflow-hidden"
          style={{ minHeight: 'clamp(420px, 56vh, 600px)' }}
        >
          {heroSrc ? (
            <Image
              src={heroSrc}
              alt={heroImg?.alt ?? ''}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: hotspotPos(heroImg) }}
            />
          ) : null}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: heroSrc
                ? 'linear-gradient(to top, #0c0c0b 0%, rgba(12,12,11,0.72) 40%, rgba(12,12,11,0.15) 80%, transparent 100%)'
                : 'linear-gradient(160deg, #0f1a14 0%, #0c0c0b 100%)',
            }}
          />
          <div className={`${G} relative z-10`} style={{ paddingBottom: '3rem', paddingTop: '5rem' }}>
            <h1
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                lineHeight: '0.98',
                letterSpacing: '-0.04em',
                maxWidth: '14ch',
              }}
            >
              Built for retailers who care what they sell.
            </h1>
            <p
              className="text-[rgba(250,248,243,0.5)] font-[family-name:var(--font-manrope)] font-light"
              style={{
                fontSize: 'clamp(0.9375rem, 1.15vw, 1.0625rem)',
                lineHeight: '1.68',
                marginTop: '1.25rem',
                maxWidth: '38ch',
              }}
            >
              GSX makes precision-dosed edibles in-house, from formulation to final package. Oklahoma-based. OMMA licensed.
            </p>
            <div className="flex flex-wrap items-center gap-4" style={{ marginTop: '1.5rem' }}>
              <Button href="/products" variant="primary" size="lg">View Products</Button>
              <Link
                href="/find-gsx"
                className="text-button text-[rgba(250,248,243,0.38)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
              >
                Find GSX →
              </Link>
            </div>
          </div>
        </section>

        <div className={G} style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <p
            className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)]"
            style={{
              fontSize: 'clamp(1.375rem, 2.6vw, 2.25rem)',
              lineHeight: '1.15',
              letterSpacing: '-0.025em',
              fontWeight: 400,
              maxWidth: '26ch',
            }}
          >
            We develop, manufacture, and package every product ourselves — in Chelsea, Oklahoma. No contract manufacturing. No outsourced formulation.
          </p>
          <p
            className="text-label text-[rgba(250,248,243,0.22)]"
            style={{ marginTop: '2rem' }}
          >
            OMMA Licensed Manufacturer &nbsp;&middot;&nbsp; Chelsea, OK 74016
          </p>
        </div>

        <Rule />

        <div
          className="overflow-hidden"
          style={{ minHeight: processSrc ? '440px' : 'auto' }}
        >
          <div className={processSrc ? 'lg:grid lg:grid-cols-[1.15fr_1fr]' : ''} style={{ minHeight: 'inherit' }}>
            <div
              className={`flex flex-col justify-center pl-6 md:pl-16 xl:pl-24 ${processSrc ? '' : 'pr-6 md:pr-16 xl:pr-24'}`}
              style={{
                paddingTop: '5rem',
                paddingBottom: '5rem',
                paddingRight: processSrc ? '3rem' : undefined,
              }}
            >
              <div style={{ maxWidth: '520px' }}>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                  style={{
                    fontSize: 'clamp(1.75rem, 3.25vw, 2.875rem)',
                    lineHeight: '1.02',
                    letterSpacing: '-0.032em',
                  }}
                >
                  Documented process.<br />Consistent product.
                </h2>
                <p
                  className="text-[rgba(250,248,243,0.48)] font-[family-name:var(--font-manrope)] font-light"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                    lineHeight: '1.7',
                    marginTop: '1.25rem',
                  }}
                >
                  From ingredient sourcing to final packaging, every step follows written procedures. We track every batch so problems stay small and product stays reliable.
                </p>
                <Link
                  href="/manufacturing"
                  className="inline-flex items-center gap-2 text-label text-[rgba(250,248,243,0.36)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                  style={{ marginTop: '2rem' }}
                >
                  Our manufacturing process
                  <svg width="13" height="9" viewBox="0 0 13 9" fill="none" aria-hidden="true">
                    <path d="M1 4.5h11M7.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"/>
                  </svg>
                </Link>
              </div>
            </div>
            {processSrc && (
              <div className="relative min-h-[300px] lg:min-h-0 overflow-hidden">
                <Image
                  src={processSrc}
                  alt={processImg?.alt ?? ''}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: hotspotPos(processImg) }}
                />
                <div
                  className="hidden lg:block absolute inset-y-0 left-0 w-20 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, #0c0c0b, transparent)' }}
                />
              </div>
            )}
          </div>
        </div>

        <Rule />

        <div className={G} style={{ paddingTop: '5rem', paddingBottom: '3.5rem' }}>
          <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-center">
            <div>
              <h2
                className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                style={{
                  fontSize: 'clamp(1.75rem, 3.25vw, 2.875rem)',
                  lineHeight: '1.02',
                  letterSpacing: '-0.032em',
                  maxWidth: '13ch',
                }}
              >
                A focused lineup. Built right.
              </h2>
              <p
                className="text-[rgba(250,248,243,0.46)] font-[family-name:var(--font-manrope)] font-light"
                style={{
                  fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                  lineHeight: '1.7',
                  marginTop: '1.25rem',
                  maxWidth: '38ch',
                }}
              >
                Every GSX product is developed and manufactured in-house. We keep the catalog tight because we&apos;re not interested in products we can&apos;t do well.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Button href="/products" variant="primary" size="lg">View Products</Button>
              </div>

              {families.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[rgba(250,248,243,0.08)]">
                  {families.map((f) => (
                    <Link
                      key={f._id}
                      href={`/products?family=${f.slug.current}`}
                      className="group flex items-center justify-between py-3 border-b border-[rgba(250,248,243,0.07)] hover:border-[rgba(250,248,243,0.16)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                    >
                      <span
                        className="text-[rgba(250,248,243,0.52)] font-[family-name:var(--font-space-grotesk)] font-medium group-hover:text-[var(--color-cream)] transition-colors duration-150"
                        style={{ fontSize: 'clamp(1rem, 1.6vw, 1.375rem)', letterSpacing: '-0.015em' }}
                      >
                        {f.name}
                      </span>
                      <svg
                        width="13" height="9" viewBox="0 0 13 9" fill="none" aria-hidden="true"
                        className="text-[rgba(250,248,243,0.16)] group-hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0 ml-6"
                      >
                        <path d="M1 4.5h11M7.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10 lg:mt-0 grid grid-cols-3 gap-4 md:gap-6">
              {PRODUCT_SHOWCASE.map((p) => (
                <div key={p.name} className="relative aspect-square">
                  <Image
                    src={p.url}
                    alt={`GSX ${p.name} gummies`}
                    fill
                    sizes="(max-width: 1024px) 33vw, 220px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Rule />

        <div className={G} style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2
                className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                style={{
                  fontSize: 'clamp(1.375rem, 2.2vw, 2rem)',
                  lineHeight: '1.05',
                  letterSpacing: '-0.025em',
                }}
              >
                Find GSX near you.
              </h2>
              <p
                className="text-[rgba(250,248,243,0.38)] font-[family-name:var(--font-manrope)]"
                style={{ fontSize: '0.875rem', marginTop: '0.35rem' }}
              >
                Available at select dispensaries across Oklahoma.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex lg:justify-end">
              <Button href="/find-gsx" variant="secondary" size="md" className="shrink-0">
                Find a Retailer
              </Button>
            </div>
          </div>
        </div>

        {featured.length > 0 && (
          <>
            <Rule />
            <div className={G} style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
              <div className="flex items-baseline justify-between gap-4 mb-8">
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                  style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', letterSpacing: '-0.015em' }}
                >
                  From the lab
                </h2>
                <Link
                  href="/learn"
                  className="text-label text-[rgba(250,248,243,0.28)] hover:text-[var(--color-cream)] transition-colors duration-150 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                >
                  All articles →
                </Link>
              </div>
              {featured.map((a, i) => (
                <Link
                  key={a._id}
                  href={`/learn/${a.slug.current}`}
                  className={`group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-4 border-b border-[rgba(250,248,243,0.07)] hover:border-[rgba(250,248,243,0.14)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${i === 0 ? 'border-t border-t-[rgba(250,248,243,0.07)]' : ''}`}
                >
                  {a.category && (
                    <span className="text-label text-[rgba(250,248,243,0.26)] shrink-0 sm:w-28">{a.category.name}</span>
                  )}
                  <span
                    className="text-[rgba(250,248,243,0.56)] font-[family-name:var(--font-space-grotesk)] font-medium group-hover:text-[var(--color-cream)] transition-colors duration-150 flex-1"
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
          <div className={G} style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
            <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(1.375rem, 2vw, 2rem)',
                    lineHeight: '1.05',
                    letterSpacing: '-0.025em',
                  }}
                >
                  Carry GSX in your store.
                </h2>
                <p
                  className="text-[rgba(250,248,243,0.6)] font-[family-name:var(--font-manrope)]"
                  style={{ fontSize: '0.875rem', marginTop: '0.35rem' }}
                >
                  Oklahoma-licensed dispensaries can apply to stock GSX products.
                </p>
              </div>
              <div className="mt-6 lg:mt-0 flex flex-wrap items-center gap-4 lg:justify-end">
                <Button href="/contact" variant="secondary" size="md">Carry GSX</Button>
                <Link
                  href="/login"
                  className="text-button text-[rgba(250,248,243,0.5)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:rounded-sm"
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
