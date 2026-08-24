import Image from 'next/image'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { getSiteSettings, getAllProductFamilies, getAllArticles } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'

export const revalidate = 3600

// ── Types ────────────────────────────────────────────────────────────────────

type SanitySettings = Record<string, unknown>
type ProductFamily  = { _id: string; name: string; slug: { current: string }; description?: string }
type Article        = { _id: string; title: string; slug: { current: string }; summary?: string; category?: { name: string } }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImage    = any

function hotspotPos(img?: SanityImage) {
  if (!img?.hotspot) return 'center center'
  return `${Math.round(img.hotspot.x * 100)}% ${Math.round(img.hotspot.y * 100)}%`
}

// ── Shared layout constants ───────────────────────────────────────────────────
//
// gutter : matches the Container component — px-6 md:px-16 xl:px-24
// max    : 1280px — every section aligns to this same grid
// These two values create the "one continuous grid" feel across the page.

const OUTER = 'w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24'

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [settings, productFamilies, articles] = await Promise.allSettled([
    getSiteSettings(),
    getAllProductFamilies(),
    getAllArticles(),
  ])

  const s         = settings.status       === 'fulfilled' ? (settings.value as SanitySettings) : null
  const families  = productFamilies.status === 'fulfilled' && Array.isArray(productFamilies.value) ? productFamilies.value as ProductFamily[] : []
  const featured  = (articles.status      === 'fulfilled' && Array.isArray(articles.value) ? articles.value as Article[] : []).slice(0, 3)

  const heroImg    : SanityImage = s?.heroImage    ?? null
  const processImg : SanityImage = s?.processImage ?? null

  const heroSrc    = heroImg    ? urlFor(heroImg).auto('format').fit('max').width(1920).url() : null
  const processSrc = processImg ? urlFor(processImg).auto('format').fit('max').width(1400).url() : null

  return (
    <>
      <Nav />
      <main>

        {/* ════════════════════════════════════════════════════════════════════
            ZONE 1 — Ink (#0c0c0b)
            Hero and statement share one unbroken background.
            No seam. No section marker. One composition.
        ════════════════════════════════════════════════════════════════════ */}
        <div className="bg-[#0c0c0b]">

          {/* ── Hero ──────────────────────────────────────────────────────────
              78vh keeps the hero impactful without becoming a full-page slab.
              Content lives in the lower portion — photography fills the frame.
              Upload 56E9BD64 or 55323CB6 via Sanity Studio → Site Settings.
          ─────────────────────────────────────────────────────────────────── */}
          <section
            aria-label="Hero"
            className="relative flex flex-col justify-end overflow-hidden"
            style={{ minHeight: '78vh' }}
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

            {/* Bottom-weighted gradient — photo reads at top, text at bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: heroSrc
                  ? 'linear-gradient(to top, #0c0c0b 0%, rgba(12,12,11,0.72) 35%, rgba(12,12,11,0.18) 70%, transparent 100%)'
                  : 'linear-gradient(160deg, #0c0c0b 0%, #111110 100%)',
              }}
            />

            {/* Attribution — top right, very quiet */}
            <p className="absolute top-6 right-6 md:top-8 md:right-8 z-10 text-label text-[rgba(250,248,243,0.22)] hidden md:block">
              Chelsea, OK &middot; OMMA Licensed
            </p>

            {/* Hero content */}
            <div className={`${OUTER} relative z-10 pb-12 md:pb-14 pt-24`}>
              <h1
                className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold leading-[0.96] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)', maxWidth: '16ch' }}
              >
                Built for retailers who care what they sell.
              </h1>
              <p
                className="text-[rgba(250,248,243,0.55)] font-[family-name:var(--font-manrope)] font-light leading-[1.65]"
                style={{ fontSize: 'clamp(0.9375rem, 1.15vw, 1.0625rem)', marginTop: '1.25rem', maxWidth: '38ch' }}
              >
                GSX makes precision-dosed edibles in-house, from formulation to final package.
              </p>
              <div className="flex flex-wrap items-center gap-4" style={{ marginTop: '1.75rem' }}>
                <Button href="/products" variant="primary" size="lg">View Products</Button>
                <Link
                  href="/find-gsx"
                  className="text-button text-[rgba(250,248,243,0.45)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                >
                  Find GSX →
                </Link>
              </div>
            </div>
          </section>

          {/* ── Statement ─────────────────────────────────────────────────────
              Continues directly from the hero — same bg, no gap.
              One paragraph. One attribution. No eyebrow, no label.
              The transition is seamless: photography fades to raw dark bg.
          ─────────────────────────────────────────────────────────────────── */}
          <div className={`${OUTER}`} style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>
            {/* Thin rule — marks the start of the statement without a new section */}
            <hr className="border-0 border-t border-[rgba(250,248,243,0.09)] mb-8 md:mb-10" />
            <div style={{ maxWidth: '54ch' }}>
              <p
                className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-normal leading-[1.16] tracking-[-0.025em]"
                style={{ fontSize: 'clamp(1.375rem, 2.5vw, 2.125rem)' }}
              >
                We develop, manufacture, and package every product ourselves&mdash;in Chelsea, Oklahoma. No contract manufacturing. No outsourced formulation.
              </p>
              <p
                className="text-label text-[rgba(250,248,243,0.26)]"
                style={{ marginTop: '2rem' }}
              >
                OMMA Licensed Manufacturer &nbsp;&middot;&nbsp; Chelsea, OK 74016
              </p>
            </div>
          </div>

        </div>{/* end Zone 1 */}

        {/* ════════════════════════════════════════════════════════════════════
            ZONE 2 — Brand Dark (#0f1a14)
            Manufacturing. The one justified background shift on the page.
            The green-tinted dark signals facility/process identity.
            Upload F1ABAA24 via Sanity Studio → Site Settings.
        ════════════════════════════════════════════════════════════════════ */}
        <div
          className="bg-[#0f1a14] overflow-hidden"
          style={{ minHeight: processSrc ? '520px' : 'auto' }}
        >
          <div className={processSrc ? 'lg:grid lg:grid-cols-2' : ''} style={{ minHeight: 'inherit' }}>

            {/* Text — left column, aligned to page grid */}
            <div
              className="flex flex-col justify-center py-14 md:py-20"
              style={{
                paddingLeft:  'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
                paddingRight: processSrc ? '3rem' : 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
              }}
            >
              <div style={{ maxWidth: '460px' }}>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold leading-[1.0] tracking-[-0.035em]"
                  style={{ fontSize: 'clamp(1.875rem, 3.75vw, 3.25rem)' }}
                >
                  Documented process.<br />Consistent product.
                </h2>
                <p
                  className="text-[rgba(250,248,243,0.52)] font-[family-name:var(--font-manrope)] font-light leading-[1.7]"
                  style={{ fontSize: 'clamp(0.9375rem, 1.15vw, 1.0625rem)', marginTop: '1.25rem' }}
                >
                  From ingredient sourcing to final packaging, every step follows written procedures. We track every batch so problems stay small and product stays reliable.
                </p>
                <Link
                  href="/manufacturing"
                  className="inline-flex items-center gap-2 text-label text-[rgba(250,248,243,0.45)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                  style={{ marginTop: '2rem' }}
                >
                  Our manufacturing process
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Photo — right column, bleeds to viewport edge */}
            {processSrc && (
              <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden">
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
                  style={{ background: 'linear-gradient(to right, #0f1a14, transparent)' }}
                />
              </div>
            )}

          </div>
        </div>{/* end Zone 2 */}

        {/* ════════════════════════════════════════════════════════════════════
            ZONE 3 — Ink (#0c0c0b)
            Products and Find GSX share one continuous background.
            A thin rule separates them — not a background shift.
        ════════════════════════════════════════════════════════════════════ */}
        <div className="bg-[#0c0c0b]">

          {/* ── Products ────────────────────────────────────────────────────
              Two columns: statement left, family list right.
              Family list hidden until Sanity has real content.
          ─────────────────────────────────────────────────────────────────── */}
          <div className={OUTER} style={{ paddingTop: '4rem', paddingBottom: families.length > 0 ? '3rem' : '4rem' }}>
            <div className={`flex flex-col ${families.length > 0 ? 'lg:grid lg:grid-cols-[1fr_0.85fr] lg:gap-20' : ''} lg:items-start`}>

              {/* Statement */}
              <div>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold leading-[1.0] tracking-[-0.035em]"
                  style={{ fontSize: 'clamp(1.875rem, 3.75vw, 3.25rem)', maxWidth: '14ch' }}
                >
                  A focused lineup. Built right.
                </h2>
                <p
                  className="text-[rgba(250,248,243,0.5)] font-[family-name:var(--font-manrope)] font-light leading-[1.7]"
                  style={{ fontSize: 'clamp(0.9375rem, 1.15vw, 1.0625rem)', marginTop: '1.125rem', maxWidth: '42ch' }}
                >
                  Every GSX product is developed and manufactured in-house. We keep the catalog tight because we&apos;re not interested in products we can&apos;t do well.
                </p>
                <div style={{ marginTop: '1.75rem' }}>
                  <Button href="/products" variant="primary" size="lg">View Products</Button>
                </div>
              </div>

              {/* Family list — editorial stacked links */}
              {families.length > 0 && (
                <div className="mt-12 lg:mt-0 border-t border-[rgba(250,248,243,0.08)] lg:border-t-0 lg:border-l lg:border-[rgba(250,248,243,0.08)] pt-8 lg:pt-0 lg:pl-14 self-center">
                  <div className="border-t border-[rgba(250,248,243,0.08)]">
                    {families.map((f) => (
                      <Link
                        key={f._id}
                        href={`/products?family=${f.slug.current}`}
                        className="group flex items-center justify-between border-b border-[rgba(250,248,243,0.07)] hover:border-[rgba(250,248,243,0.15)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                        style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
                      >
                        <span
                          className="text-[rgba(250,248,243,0.58)] font-[family-name:var(--font-space-grotesk)] font-medium group-hover:text-[var(--color-cream)] transition-colors duration-150 tracking-[-0.018em]"
                          style={{ fontSize: 'clamp(1rem, 1.75vw, 1.5rem)' }}
                        >
                          {f.name}
                        </span>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"
                          className="text-[rgba(250,248,243,0.18)] group-hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0 ml-6">
                          <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter"/>
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Find GSX ────────────────────────────────────────────────────
              Same background. Thin rule provides separation — not a bg shift.
              Compact and direct.
          ─────────────────────────────────────────────────────────────────── */}
          <div
            className={OUTER}
            style={{ borderTop: '1px solid rgba(250,248,243,0.08)', paddingTop: '2.5rem', paddingBottom: '3rem' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold tracking-[-0.025em] leading-[1.08]"
                  style={{ fontSize: 'clamp(1.375rem, 2.25vw, 2rem)' }}
                >
                  Find GSX near you.
                </h2>
                <p
                  className="text-[rgba(250,248,243,0.42)] font-[family-name:var(--font-manrope)]"
                  style={{ fontSize: '0.9375rem', marginTop: '0.375rem' }}
                >
                  Available at select dispensaries across Oklahoma.
                </p>
              </div>
              <Button href="/find-gsx" variant="secondary" size="md" className="shrink-0">
                Find a Retailer
              </Button>
            </div>
          </div>

          {/* ── Education ───────────────────────────────────────────────────
              Same bg. Thin rule. Hidden until Sanity has articles.
          ─────────────────────────────────────────────────────────────────── */}
          {featured.length > 0 && (
            <div
              className={OUTER}
              style={{ borderTop: '1px solid rgba(250,248,243,0.08)', paddingTop: '2.5rem', paddingBottom: '3.5rem' }}
            >
              <div className="flex items-baseline justify-between gap-6 mb-8">
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold tracking-[-0.025em]"
                  style={{ fontSize: 'clamp(1.125rem, 1.75vw, 1.5rem)' }}
                >
                  From the lab
                </h2>
                <Link
                  href="/learn"
                  className="text-label text-[rgba(250,248,243,0.32)] hover:text-[var(--color-cream)] transition-colors duration-150 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                >
                  All articles →
                </Link>
              </div>
              <div>
                {featured.map((a, i) => (
                  <Link
                    key={a._id}
                    href={`/learn/${a.slug.current}`}
                    className={`group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 border-b border-[rgba(250,248,243,0.07)] hover:border-[rgba(250,248,243,0.14)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${i === 0 ? 'border-t border-t-[rgba(250,248,243,0.07)]' : ''}`}
                    style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
                  >
                    {a.category && (
                      <span className="text-label text-[rgba(250,248,243,0.32)] shrink-0 sm:w-28">{a.category.name}</span>
                    )}
                    <span
                      className="text-[rgba(250,248,243,0.62)] font-[family-name:var(--font-space-grotesk)] font-medium group-hover:text-[var(--color-cream)] transition-colors duration-150 tracking-[-0.015em] flex-1"
                      style={{ fontSize: 'clamp(0.9375rem, 1.4vw, 1.25rem)' }}
                    >
                      {a.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>{/* end Zone 3 */}

        {/* ════════════════════════════════════════════════════════════════════
            ZONE 4 — Green (#1a7a4a)
            Retailer strip. Green used once, deliberately.
            Tight. Direct.
        ════════════════════════════════════════════════════════════════════ */}
        <div className="bg-[var(--color-green)]">
          <div className={OUTER} style={{ paddingTop: '2.75rem', paddingBottom: '3rem' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold tracking-[-0.025em] leading-[1.08]"
                  style={{ fontSize: 'clamp(1.375rem, 2.25vw, 2rem)' }}
                >
                  Carry GSX in your store.
                </h2>
                <p
                  className="text-[rgba(250,248,243,0.65)] font-[family-name:var(--font-manrope)]"
                  style={{ fontSize: '0.9375rem', marginTop: '0.375rem' }}
                >
                  Oklahoma-licensed dispensaries can apply to stock GSX products.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5 shrink-0">
                <Button href="/contact" variant="secondary" size="md">Carry GSX</Button>
                <Link
                  href="/login"
                  className="text-button text-[rgba(250,248,243,0.55)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:rounded-sm"
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
