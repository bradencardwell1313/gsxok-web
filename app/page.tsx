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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImage = any

function hotspotToPosition(hotspot?: { x: number; y: number }) {
  if (!hotspot) return 'center center'
  return `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
}

// ── Page ─────────────────────────────────────────────────────────────────────

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

  const heroImage: SanityImage = s?.heroImage ?? null
  const processImage: SanityImage = s?.processImage ?? null

  const heroSrc = heroImage ? urlFor(heroImage).auto('format').fit('max').width(1920).url() : null
  const heroAlt = heroImage?.alt ?? ''
  const heroPosition = hotspotToPosition(heroImage?.hotspot)

  const processSrc = processImage
    ? urlFor(processImage).auto('format').fit('max').width(1400).url()
    : null
  const processAlt = processImage?.alt ?? ''
  const processPosition = hotspotToPosition(processImage?.hotspot)

  return (
    <>
      <Nav />
      <main>

        {/* ── HERO ────────────────────────────────────────────────────────────
            Full viewport. Photo does the visual work.
            Text is tight, deliberate — headline breaks at a natural phrase boundary.
            Upload 56E9BD64 or 55323CB6 via Sanity Studio › Site Settings.
        ──────────────────────────────────────────────────────────────────────── */}
        <section
          aria-label="Hero"
          className="relative flex flex-col justify-end overflow-hidden bg-[#0c0c0b]"
          style={{ minHeight: '100dvh' }}
        >
          {/* Photography */}
          {heroSrc && (
            <Image
              src={heroSrc}
              alt={heroAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: heroPosition }}
            />
          )}

          {/* Overlay — heavier at bottom where text lives */}
          <div
            className="absolute inset-0"
            style={{
              background: heroSrc
                ? 'linear-gradient(to top, rgba(12,12,11,0.97) 0%, rgba(12,12,11,0.55) 40%, rgba(12,12,11,0.15) 100%)'
                : 'linear-gradient(to top, rgba(12,12,11,1) 0%, rgba(12,12,11,0.85) 100%)',
            }}
          />

          {/* Attribution — top right, very small */}
          <div className="absolute top-6 right-6 md:top-8 md:right-10 z-10">
            <span className="text-label text-[rgba(250,248,243,0.28)]">
              Chelsea, OK &middot; OMMA Licensed
            </span>
          </div>

          {/* Content — sits on the lower third */}
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24 pb-16 md:pb-24">
            <div className="max-w-[640px]">
              <h1 className="text-display text-[var(--color-cream)]">
                Built for retailers<br />
                who care what<br />
                they sell.
              </h1>
              <p className="text-body-lg text-[rgba(250,248,243,0.58)] mt-6 max-w-[420px]">
                GSX makes precision-dosed edibles in-house, from formulation to final package.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <Button href="/products" variant="primary" size="lg">
                  View Products
                </Button>
                <Link
                  href="/find-gsx"
                  className="text-button text-[rgba(250,248,243,0.52)] hover:text-[var(--color-cream)] transition-colors duration-150 tracking-[0.12em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                >
                  Find GSX →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATEMENT ────────────────────────────────────────────────────────
            Direct. No section chrome. No eyebrow.
            Narrow editorial column — one powerful paragraph.
            OMMA credential is a caption line, not a badge.
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="bg-[#0c0c0b]">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24 pt-20 pb-24 md:pt-28 md:pb-32">
            <div className="max-w-[660px]">
              <p
                className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-normal leading-[1.18] tracking-[-0.025em]"
                style={{ fontSize: 'clamp(1.5rem, 2.75vw, 2.375rem)' }}
              >
                We develop, manufacture, and package every product ourselves&mdash;in our
                facility in Chelsea, Oklahoma. No contract manufacturing. No outsourced
                formulation. We control every step.
              </p>
              <div className="mt-10 pt-8 border-t border-[rgba(250,248,243,0.08)]">
                <span className="text-label text-[rgba(250,248,243,0.28)]">
                  OMMA Licensed Manufacturer &nbsp;&middot;&nbsp; Chelsea, OK 74016
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MANUFACTURING ────────────────────────────────────────────────────
            The cinematic moment. Text column left, photo bleeds to viewport edge right.
            Background shifts to --color-dark (green-tinted) — this is where the brand's
            facility identity is strongest.
            Upload F1ABAA24 via Sanity Studio › Site Settings.
        ──────────────────────────────────────────────────────────────────────── */}
        <div
          className="bg-[#0f1a14] overflow-hidden"
          style={{ minHeight: processSrc ? '560px' : 'auto' }}
        >
          <div
            className={`flex flex-col ${processSrc ? 'lg:grid lg:grid-cols-[1fr_1fr]' : ''}`}
            style={{ minHeight: 'inherit' }}
          >
            {/* Text column — stays in the left half of the page grid */}
            <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24 py-20 md:py-28 lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2+96px))] lg:pr-16 flex flex-col justify-center">
              <div className="max-w-[480px]">
                <h2 className="text-h1 text-[var(--color-cream)]">
                  Documented process.<br />Consistent product.
                </h2>
                <p className="text-body-lg text-[rgba(250,248,243,0.55)] mt-6 leading-[1.72]">
                  From ingredient sourcing to final packaging, every step follows written
                  procedures. We track every batch so problems stay small and product stays
                  reliable.
                </p>
                <Link
                  href="/manufacturing"
                  className="inline-flex items-center gap-2 text-label text-[var(--color-accent)] hover:text-[var(--color-cream)] transition-colors duration-150 mt-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                >
                  Our manufacturing process
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Photo — right column, full height, bleeds to viewport edge */}
            {processSrc && (
              <div className="relative min-h-[360px] lg:min-h-0 overflow-hidden">
                <Image
                  src={processSrc}
                  alt={processAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: processPosition }}
                />
                {/* Left-edge blend into text column on desktop */}
                <div
                  className="hidden lg:block absolute inset-y-0 left-0 w-24 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, #0f1a14, transparent)' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── PRODUCTS ─────────────────────────────────────────────────────────
            Editorial, not a storefront. Large type on the left, family list on right.
            Section hidden entirely until Sanity has real product families.
            No placeholder data.
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="bg-[#0c0c0b]">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24 py-24 md:py-32 lg:py-40">

            {/* Headline row — wider than the body copy beneath it */}
            <div className={`flex flex-col ${families.length > 0 ? 'lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:items-start' : ''}`}>

              {/* Left: statement */}
              <div className="flex flex-col gap-7">
                <h2 className="text-h1 text-[var(--color-cream)]">
                  A focused lineup.<br />Built right.
                </h2>
                <p className="text-body-lg text-[rgba(250,248,243,0.52)] max-w-[440px]">
                  Every GSX product is developed and manufactured in-house. We keep the
                  catalog tight because we&apos;re not interested in products we can&apos;t do well.
                </p>
                <div className="mt-2">
                  <Button href="/products" variant="primary" size="lg">
                    View Products
                  </Button>
                </div>
              </div>

              {/* Right: family list — editorial stacked links, only when Sanity has content */}
              {families.length > 0 && (
                <div className="mt-16 lg:mt-0 lg:pt-1">
                  <div className="border-t border-[rgba(250,248,243,0.08)]">
                    {families.map((family) => (
                      <Link
                        key={family._id}
                        href={`/products?family=${family.slug.current}`}
                        className="group flex items-center justify-between py-5 border-b border-[rgba(250,248,243,0.07)] hover:border-[rgba(250,248,243,0.16)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                      >
                        <span className="text-h3 text-[rgba(250,248,243,0.6)] group-hover:text-[var(--color-cream)] transition-colors duration-150">
                          {family.name}
                        </span>
                        <svg
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          aria-hidden="true"
                          className="text-[rgba(250,248,243,0.2)] group-hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0"
                        >
                          <path d="M1 6h14M9 2l5 4-5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter"/>
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── FIND GSX ─────────────────────────────────────────────────────────
            Compact. Thin rule creates the separation — no new background shift.
            Dense, not padded. One line, one action.
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="bg-[#0c0c0b] border-t border-[rgba(250,248,243,0.08)]">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24 py-14 md:py-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-h2 text-[var(--color-cream)]">
                  Find GSX near you.
                </h2>
                <p className="text-body text-[rgba(250,248,243,0.45)] mt-2">
                  Available at select dispensaries across Oklahoma.
                </p>
              </div>
              <Button href="/find-gsx" variant="secondary" size="lg" className="shrink-0">
                Find a Retailer
              </Button>
            </div>
          </div>
        </div>

        {/* ── EDUCATION ────────────────────────────────────────────────────────
            Hidden until articles exist in Sanity Studio.
            Editorial stacked list — category label, title, arrow.
        ──────────────────────────────────────────────────────────────────────── */}
        {featuredArticles.length > 0 && (
          <div className="bg-[#131312]">
            <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24 py-20 md:py-28">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                <h2 className="text-h2 text-[var(--color-cream)] max-w-[440px]">
                  Know what you&apos;re buying.
                </h2>
                <Link
                  href="/learn"
                  className="text-label text-[rgba(250,248,243,0.38)] hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                >
                  All Articles →
                </Link>
              </div>
              <div className="flex flex-col">
                {featuredArticles.map((article, i) => (
                  <Link
                    key={article._id}
                    href={`/learn/${article.slug.current}`}
                    className={`group flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 py-7 border-b border-[rgba(250,248,243,0.07)] hover:border-[rgba(250,248,243,0.14)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${i === 0 ? 'border-t border-t-[rgba(250,248,243,0.07)]' : ''}`}
                  >
                    {article.category && (
                      <span className="text-label text-[var(--color-accent)] shrink-0 sm:w-32">
                        {article.category.name}
                      </span>
                    )}
                    <span className="text-h3 text-[rgba(250,248,243,0.65)] group-hover:text-[var(--color-cream)] transition-colors duration-150 flex-1">
                      {article.title}
                    </span>
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      aria-hidden="true"
                      className="text-[rgba(250,248,243,0.18)] group-hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0 hidden sm:block self-center"
                    >
                      <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RETAILER STRIP ───────────────────────────────────────────────────
            Green used deliberately and intentionally here — a clear brand signal.
            Tight and direct.
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="bg-[var(--color-green)]">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24 py-14 md:py-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h2 className="text-h2 text-[var(--color-cream)]">
                  Carry GSX in your store.
                </h2>
                <p className="text-body text-[rgba(250,248,243,0.68)] mt-2">
                  Oklahoma-licensed dispensaries can apply to stock GSX products.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5 shrink-0">
                <Button href="/contact" variant="secondary" size="lg">
                  Carry GSX
                </Button>
                <Link
                  href="/login"
                  className="text-button text-[rgba(250,248,243,0.60)] hover:text-[var(--color-cream)] transition-colors duration-150 tracking-[0.12em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:rounded-sm"
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
