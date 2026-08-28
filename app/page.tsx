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

// Verified, already-approved facts only, no invented stats or certifications.
const PROOF_POINTS = [
  { label: 'Chelsea, Oklahoma', detail: 'Manufactured in-house, start to finish' },
  { label: 'Formulation to Final Package', detail: 'Every step handled under one roof' },
  { label: 'Multiple Product Lines', detail: 'Gummies, chocolates, and fruit crunchers' },
]

const PROCESS_MARKERS = ['Ingredient sourcing', 'Written batch procedures', 'Final packaging']

// Approved "Built in Oklahoma. Made by GSX." section graphic. Locked composed
// asset (typography, proof strip, and equipment photo baked in by design), used
// as-is. Native resolution is 640x427; display width is capped so upscaling
// stays mild rather than stretching it across the full 1280px+ grid.
const BUILT_IN_OKLAHOMA_URL = 'https://cdn.sanity.io/images/o7wavkxv/production/06eba6c058919fc95e0abdd164ac519fb1e127bc-640x427.png'

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

        {/* ── HERO — locked brand/product-universe graphic, 46/54 split ──── */}
        <section aria-label="Hero" className="lg:grid lg:grid-cols-[46fr_54fr] lg:items-center">
          <div className="flex flex-col justify-center" style={{ paddingTop: '6.5rem', paddingBottom: '3rem' }}>
            <div className={G} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className="pl-6 md:pl-16 xl:pl-24 pr-6 lg:pr-12" style={{ maxWidth: '460px' }}>
                <h1
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                  style={{
                    fontSize: 'clamp(2.25rem, 3.4vw, 3.25rem)',
                    lineHeight: '1.05',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Oklahoma&rsquo;s own edible company.
                </h1>
                <p
                  className="text-[rgba(250,248,243,0.5)] font-[family-name:var(--font-manrope)] font-light"
                  style={{ fontSize: '1.0625rem', lineHeight: '1.68', marginTop: '1.25rem', maxWidth: '36ch' }}
                >
                  GSX formulates, manufactures, and packages every product itself, from Chelsea, Oklahoma to dispensary shelves across the state.
                </p>
                <p className="text-label text-[rgba(250,248,243,0.32)]" style={{ marginTop: '1.25rem' }}>
                  OMMA Licensed Manufacturer &nbsp;·&nbsp; Chelsea, Oklahoma
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
          <div className="flex items-center justify-center lg:justify-end w-full" style={{ paddingBottom: '2rem' }}>
            {heroSrc ? (
              <Image
                src={heroSrc}
                alt={heroImg?.alt ?? 'GSX product lineup: Precision Crafted Gummies, The Hammer, Fruit Crunchers, and Chocolate Bites'}
                width={1672}
                height={941}
                priority
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="w-full h-auto lg:max-w-[820px]"
              />
            ) : (
              <div className="w-full" style={{ aspectRatio: '16 / 9', background: 'linear-gradient(160deg, #0f1a14 0%, #0c0c0b 100%)' }} />
            )}
          </div>
        </section>

        {/* ── COMPANY PROOF STATEMENT — compact editorial 2/3 + proof points ── */}
        <section className="border-t border-[rgba(250,248,243,0.06)]">
          <div className={G} style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div className="lg:flex lg:items-start lg:gap-16">
              <p
                className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)]"
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                  lineHeight: '1.35',
                  letterSpacing: '-0.015em',
                  fontWeight: 400,
                  maxWidth: '46ch',
                }}
              >
                GSX develops, manufactures, and packages every product it sells, right here in Chelsea, Oklahoma. No contract manufacturing. No outsourced formulation.
              </p>
              <div
                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 lg:shrink-0"
                style={{ marginTop: '2rem', gap: '1.5rem', maxWidth: '360px', paddingTop: '1.5rem', borderTop: '1px solid rgba(250,248,243,0.1)' }}
              >
                {PROOF_POINTS.map((item) => (
                  <div key={item.label}>
                    <p className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold" style={{ fontSize: '0.875rem' }}>
                      {item.label}
                    </p>
                    <p className="text-[rgba(250,248,243,0.4)] font-[family-name:var(--font-manrope)]" style={{ fontSize: '0.8125rem', marginTop: '0.2rem' }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── BUILT IN OKLAHOMA. MADE BY GSX. — locked full-width graphic ── */}
        <section className="w-full" style={{ backgroundColor: '#050505' }}>
          <div className="w-full flex justify-center" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div className="relative w-full" style={{ maxWidth: '1000px', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
              <Image
                src={BUILT_IN_OKLAHOMA_URL}
                alt="Built in Oklahoma. Made by GSX. From formulation through manufacturing and final packaging, every GSX edible is produced by our team in Chelsea, Oklahoma. Formulated in-house, manufactured in-house, packaged in-house."
                width={640}
                height={427}
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        <Rule />

        {/* ── REAL EQUIPMENT, REAL PEOPLE, REAL PRODUCT — inset editorial photo ── */}
        <section aria-label="Manufacturing" className={G} style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div className="lg:grid lg:grid-cols-[1fr_1.35fr] lg:items-center lg:gap-12">
            <div className="flex flex-col justify-center">
              <h2
                className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)', lineHeight: '1.05', letterSpacing: '-0.028em' }}
              >
                Real equipment. Real people. Real product.
              </h2>
              <p
                className="text-[rgba(250,248,243,0.48)] font-[family-name:var(--font-manrope)] font-light"
                style={{ fontSize: '1rem', lineHeight: '1.7', marginTop: '1.25rem' }}
              >
                Our Chelsea, Oklahoma facility handles every step: formulation, production, and packaging, all under one roof, by our own team.
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
            <div className="relative w-full mt-10 lg:mt-0" style={{ aspectRatio: '4 / 3' }}>
              {processSrc ? (
                <Image
                  src={processSrc}
                  alt={processImg?.alt ?? 'GSX team member in gloves packaging product on the production line'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  style={{ objectPosition: processImg?.hotspot ? hotspotPos(processImg) : '38% 42%' }}
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--color-ink-alt)]" />
              )}
            </div>
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

        {/* ── FIND GSX — compact, functional, no photo ─────────────────── */}
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

        {/* ── RETAILER STRIP — thin 3-part band: label+headline / copy / CTAs ── */}
        <section className="bg-[var(--color-green)]">
          <div className={G} style={{ paddingTop: '2.25rem', paddingBottom: '2.25rem' }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="shrink-0">
                <p className="text-label" style={{ color: 'rgba(250,248,243,0.7)', marginBottom: '0.3rem' }}>
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
                style={{ fontSize: '0.9375rem', maxWidth: '34ch' }}
              >
                Oklahoma-licensed dispensaries can apply to stock GSX products.
              </p>
              <div className="flex flex-wrap items-center gap-5 shrink-0">
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
