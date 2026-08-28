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

const G = 'w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24'

function Rule({ className = '' }: { className?: string }) {
  return (
    <div className={`${G} ${className}`}>
      <div className="h-px bg-[rgba(250,248,243,0.1)]" />
    </div>
  )
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg width="13" height="9" viewBox="0 0 13 9" fill="none" aria-hidden="true" className={className}>
      <path d="M1 4.5h11M7.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  )
}

// Verified, already-approved facts only — no invented stats.
const TRUST_BAR = [
  { label: 'OMMA Licensed', detail: 'Manufacturer' },
  { label: 'Chelsea, Oklahoma', detail: 'Made in-house' },
  { label: 'No Contract Manufacturing', detail: 'Formulated & packaged ourselves' },
]

const PROCESS_MARKERS = ['Ingredient sourcing', 'Written batch procedures', 'Final packaging']

// Real GSX product photography. Name/flavor/type copied directly off the
// real packaging — not a stand-in for real productFamily CMS records,
// which don't exist yet.
const PRODUCT_SHOWCASE = [
  { name: 'Relax', flavor: 'Cherry Berry', type: 'Indica Enhanced', url: 'https://cdn.sanity.io/images/o7wavkxv/production/700d25707bcc7fbd61ca0a7b69021cfb300b89f6-1840x1812.png' },
  { name: 'Balance', flavor: 'Strawberry-Watermelon', type: 'Hybrid Enhanced', url: 'https://cdn.sanity.io/images/o7wavkxv/production/a58f9591f98e011ab78255b76fbc296a025eea00-1840x1812.png' },
  { name: 'Focus', flavor: 'Wild Berry', type: 'Sativa Enhanced', url: 'https://cdn.sanity.io/images/o7wavkxv/production/642f1bec68400ec93d8c30bc752775cf29508755-1840x1812.png' },
]

export default async function HomePage() {
  const [settings, productFamilies, articles] = await Promise.allSettled([
    getSiteSettings(),
    getAllProductFamilies(),
    getAllArticles(),
  ])

  const s        = settings.status        === 'fulfilled' ? (settings.value as SanitySettings) : null
  const families = productFamilies.status === 'fulfilled' && Array.isArray(productFamilies.value) ? productFamilies.value as ProductFamily[] : []
  const featured = (articles.status       === 'fulfilled' && Array.isArray(articles.value) ? articles.value as Article[] : []).slice(0, 3)
  void families // reserved for when real productFamily records exist

  const heroImg    : SanityImage = s?.heroImage    ?? null
  const processImg : SanityImage = s?.processImage ?? null
  const heroSrc    = heroImg    ? urlFor(heroImg).auto('format').fit('max').width(1600).url() : null
  const processSrc = processImg ? urlFor(processImg).auto('format').fit('max').width(1600).url() : null

  return (
    <>
      <Nav />
      <main className="bg-[#0c0c0b]">

        {/* ── HERO — side-by-side, not text-over-photo ───────────────── */}
        <section aria-label="Hero" className="lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
          <div className="flex flex-col justify-center" style={{ paddingTop: '7rem', paddingBottom: '3rem' }}>
            <div className={G} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className="pl-6 md:pl-16 xl:pl-24 pr-6 lg:pr-10">
                <p className="text-label text-[rgba(250,248,243,0.32)]" style={{ marginBottom: '1.25rem' }}>
                  OMMA Licensed Manufacturer &nbsp;·&nbsp; Chelsea, Oklahoma
                </p>
                <h1
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                  style={{
                    fontSize: 'clamp(2.25rem, 3.6vw, 3.5rem)',
                    lineHeight: '1.03',
                    letterSpacing: '-0.03em',
                    maxWidth: '15ch',
                  }}
                >
                  Built for retailers who care what they sell.
                </h1>
                <p
                  className="text-[rgba(250,248,243,0.5)] font-[family-name:var(--font-manrope)] font-light"
                  style={{ fontSize: '1.0625rem', lineHeight: '1.68', marginTop: '1.25rem', maxWidth: '36ch' }}
                >
                  GSX makes precision-dosed edibles in-house, from formulation to final package.
                </p>
                <div className="flex flex-wrap items-center gap-5" style={{ marginTop: '2rem' }}>
                  <Button href="/products" variant="primary" size="lg">View Products</Button>
                  <Link
                    href="/find-gsx"
                    className="text-button text-[rgba(250,248,243,0.4)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                  >
                    Find GSX →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-0">
            {heroSrc ? (
              <Image
                src={heroSrc}
                alt={heroImg?.alt ?? ''}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                style={{ objectPosition: hotspotPos(heroImg) }}
              />
            ) : (
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0f1a14 0%, #0c0c0b 100%)' }} />
            )}
          </div>
        </section>

        {/* ── BRAND / CREDIBILITY — connected credibility block ───────── */}
        <section className="border-t border-[rgba(250,248,243,0.06)]">
          <div className={G} style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
              <span className="section-label">Our Standard</span>
            </div>
            <p
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] mx-auto text-center"
              style={{
                fontSize: 'clamp(1.375rem, 2.4vw, 2.125rem)',
                lineHeight: '1.28',
                letterSpacing: '-0.02em',
                fontWeight: 400,
                maxWidth: '38ch',
              }}
            >
              We develop, manufacture, and package every product ourselves — in Chelsea, Oklahoma. No contract manufacturing. No outsourced formulation.
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 mx-auto"
              style={{ marginTop: '2.5rem', maxWidth: '760px', borderTop: '1px solid rgba(250,248,243,0.1)', paddingTop: '2rem' }}
            >
              {TRUST_BAR.map((item, i) => (
                <div
                  key={item.label}
                  className={`text-center py-3 sm:py-0 ${i > 0 ? 'sm:border-l border-[rgba(250,248,243,0.1)]' : ''}`}
                >
                  <p className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold" style={{ fontSize: '0.9375rem' }}>
                    {item.label}
                  </p>
                  <p className="text-[rgba(250,248,243,0.38)] font-[family-name:var(--font-manrope)]" style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Rule />

        {/* ── MANUFACTURING — dominant image, content-rich text panel ── */}
        <section aria-label="Manufacturing" className="lg:grid lg:grid-cols-[1fr_1.35fr] lg:items-stretch">
          <div className="flex flex-col justify-center" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <div className="pl-6 md:pl-16 xl:pl-24 pr-6 lg:pr-10" style={{ maxWidth: '460px' }}>
              <h2
                className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)', lineHeight: '1.05', letterSpacing: '-0.028em' }}
              >
                Documented process. Consistent product.
              </h2>
              <p
                className="text-[rgba(250,248,243,0.48)] font-[family-name:var(--font-manrope)] font-light"
                style={{ fontSize: '1rem', lineHeight: '1.7', marginTop: '1.25rem' }}
              >
                Every step follows written procedures. We track every batch so problems stay small and product stays reliable.
              </p>
              <ul style={{ marginTop: '1.75rem' }} className="flex flex-col gap-2.5">
                {PROCESS_MARKERS.map((step) => (
                  <li key={step} className="flex items-center gap-3 text-[rgba(250,248,243,0.55)] font-[family-name:var(--font-manrope)]" style={{ fontSize: '0.875rem' }}>
                    <span className="inline-block w-1.5 h-1.5 bg-[var(--color-accent)] shrink-0" />
                    {step}
                  </li>
                ))}
              </ul>
              <Link
                href="/manufacturing"
                className="inline-flex items-center gap-2 text-label text-[rgba(250,248,243,0.4)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                style={{ marginTop: '2rem' }}
              >
                Our manufacturing process
                <Arrow />
              </Link>
            </div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-0">
            {processSrc ? (
              <Image
                src={processSrc}
                alt={processImg?.alt ?? ''}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                style={{ objectPosition: hotspotPos(processImg) }}
              />
            ) : (
              <div className="absolute inset-0 bg-[var(--color-ink-alt)]" />
            )}
          </div>
        </section>

        <Rule />

        {/* ── PRODUCTS — major visual section: header row + card grid ── */}
        <section className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
          <div style={{ maxWidth: '640px', marginBottom: '2.5rem' }}>
            <h2
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
              style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)', lineHeight: '1.05', letterSpacing: '-0.028em' }}
            >
              A focused lineup. Built right.
            </h2>
            <p
              className="text-[rgba(250,248,243,0.46)] font-[family-name:var(--font-manrope)] font-light"
              style={{ fontSize: '1rem', lineHeight: '1.6', marginTop: '0.75rem' }}
            >
              Every GSX product is developed and manufactured in-house. We keep the catalog tight on purpose.
            </p>
            <div style={{ marginTop: '1.75rem' }}>
              <Button href="/products" variant="primary" size="lg">View Products</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PRODUCT_SHOWCASE.map((p) => (
              <div key={p.name} className="bg-[var(--color-ink-alt)] border border-[rgba(250,248,243,0.06)] flex flex-col">
                <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
                  <Image
                    src={p.url}
                    alt={`GSX ${p.name} gummies`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-contain"
                    style={{ padding: '1.5rem' }}
                  />
                </div>
                <div className="px-5 pb-5 pt-1 border-t border-[rgba(250,248,243,0.06)]">
                  <p className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold" style={{ fontSize: '1.125rem', letterSpacing: '-0.01em', marginTop: '0.75rem' }}>
                    {p.name}
                  </p>
                  <p className="text-[rgba(250,248,243,0.42)] font-[family-name:var(--font-manrope)]" style={{ fontSize: '0.8125rem', marginTop: '0.2rem' }}>
                    {p.flavor}
                  </p>
                  <p className="text-label text-[rgba(250,248,243,0.28)]" style={{ marginTop: '0.5rem' }}>
                    {p.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {featured.length > 0 && (
          <>
            <Rule />
            <div className={G} style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <h2 className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', letterSpacing: '-0.015em' }}>
                  From the lab
                </h2>
                <Link href="/learn" className="text-label text-[rgba(250,248,243,0.28)] hover:text-[var(--color-cream)] transition-colors duration-150 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm">
                  All articles →
                </Link>
              </div>
              {featured.map((a, i) => (
                <Link
                  key={a._id}
                  href={`/learn/${a.slug.current}`}
                  className={`group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-4 border-b border-[rgba(250,248,243,0.07)] hover:border-[rgba(250,248,243,0.14)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${i === 0 ? 'border-t border-t-[rgba(250,248,243,0.07)]' : ''}`}
                >
                  {a.category && <span className="text-label text-[rgba(250,248,243,0.26)] shrink-0 sm:w-28">{a.category.name}</span>}
                  <span className="text-[rgba(250,248,243,0.56)] font-[family-name:var(--font-space-grotesk)] font-medium group-hover:text-[var(--color-cream)] transition-colors duration-150 flex-1" style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1.125rem)', letterSpacing: '-0.012em' }}>
                    {a.title}
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ── FIND GSX — distinct surface (ink-alt), icon + inline CTA ── */}
        <section className="bg-[var(--color-ink-alt)] border-t border-[rgba(250,248,243,0.06)]">
          <div className={G} style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 sm:gap-12 mx-auto"
              style={{ maxWidth: '780px' }}
            >
              <div className="flex items-center gap-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--color-accent)]" aria-hidden="true">
                  <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8Z" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                <div>
                  <h2 className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold" style={{ fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', letterSpacing: '-0.02em' }}>
                    Find GSX near you.
                  </h2>
                  <p className="text-[rgba(250,248,243,0.4)] font-[family-name:var(--font-manrope)]" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Available at select dispensaries across Oklahoma.
                  </p>
                </div>
              </div>
              <Button href="/find-gsx" variant="secondary" size="lg" className="shrink-0">
                Find a Retailer
              </Button>
            </div>
          </div>
        </section>

        {/* ── CARRY GSX — compact horizontal CTA band ─────────────────── */}
        <section className="bg-[var(--color-green)]">
          <div className={G} style={{ paddingTop: '1.75rem', paddingBottom: '1.75rem' }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-3 lg:gap-10 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4 shrink-0">
                <p className="text-label" style={{ color: 'rgba(250,248,243,0.7)' }}>
                  For Retailers
                </p>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold whitespace-nowrap"
                  style={{ fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)', letterSpacing: '-0.02em' }}
                >
                  Carry GSX in your store.
                </h2>
              </div>
              <p
                className="text-[rgba(250,248,243,0.68)] font-[family-name:var(--font-manrope)]"
                style={{ fontSize: '0.875rem', maxWidth: '32ch' }}
              >
                Oklahoma-licensed dispensaries can apply to stock GSX products.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5 shrink-0">
                <Button href="/contact" variant="secondary" size="lg">Carry GSX</Button>
                <Link
                  href="/login"
                  className="text-button text-[rgba(250,248,243,0.55)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:rounded-sm"
                >
                  Retailer Portal →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
