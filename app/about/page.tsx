import Link from 'next/link'
import Image from 'next/image'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { ManufacturingCard } from '@/components/cards/ManufacturingCard'
import { PROCESS_STEPS, OPERATING_PILLARS } from '@/lib/about/content'
import { PRODUCT_FAMILIES } from '@/lib/products/catalog'

export const metadata = {
  title: 'About',
  description: 'GSX develops, manufactures, and packages its edible lineup in Chelsea, Oklahoma. One team and one facility, from formulation through final package.',
}

const G = 'w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24'

// Same green-to-cream fade used at the top of cream sections on the
// Products page — reused selectively here, only where a dark (or photo)
// section hands off directly into a cream one.
const GREEN_FADE = {
  backgroundImage:
    'linear-gradient(to bottom, rgba(26,122,74,0.32) 0%, rgba(26,122,74,0.12) 20%, rgba(26,122,74,0) 60%, rgba(26,122,74,0) 100%)',
}
const GREEN_FADE_CLASS = 'relative bg-[length:100%_96px] md:bg-[length:100%_160px] bg-no-repeat bg-top'

// Approved Chelsea facility photo (production line, American and Oklahoma
// flags, GSX wall logo). Already used on the homepage's "Built in Oklahoma.
// Made by GSX." section — same asset, reused here rather than substituting
// a different building photo.
const FACILITY_PHOTO_URL = 'https://cdn.sanity.io/images/o7wavkxv/production/488d2b67b8289033440ea79284b9772023b2961c-1310x1200.jpg'

// Approved worker/process photo. Confirmed via direct Sanity query to be the
// same 1152x1536 asset currently live as the homepage's
// siteSettings.processImage (gloved worker holding a tray of product beside
// production equipment) — i.e. the same source referred to elsewhere as
// 6EFF0F4E-CD06-4965-A2CC-F6F1FC7A7FC2.jpeg.
const PROCESS_PHOTO_URL = 'https://cdn.sanity.io/images/o7wavkxv/production/bb306e10297bb4f4b01bbac5b03ad393bd8a1ccd-1152x1536.jpg'

// Approved Oklahoma-outline / "Respect the Dose" lockup — the same current
// (non-legacy) mark used in the site nav.
const RESPECT_LOGO_URL = 'https://cdn.sanity.io/images/o7wavkxv/production/1b4c22a1c2ffe8f8ef712f03a818baf7260aa18d-808x448.png'

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>

        {/* ── 1. ABOUT HERO — compact, typographic, dark. No image. ──────
            Scaled close to the Products intro (same padding rhythm) but
            with its own slightly different clamp range and an eyebrow. */}
        <section className="bg-[var(--color-ink)]">
          <div className={G} style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <p className="text-label" style={{ color: 'rgba(250,248,243,0.5)', marginBottom: '1rem' }}>
              About GSX
            </p>
            <h1
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.125rem)', lineHeight: '1.05', letterSpacing: '-0.03em', maxWidth: '18ch' }}
            >
              Made in Oklahoma. Built by GSX.
            </h1>
            <p
              className="text-[rgba(250,248,243,0.5)] font-[family-name:var(--font-manrope)] font-light"
              style={{ fontSize: '1.0625rem', lineHeight: '1.68', marginTop: '1.25rem', maxWidth: '56ch' }}
            >
              GSX develops, manufactures, and packages its edible lineup in Chelsea, Oklahoma. Our products move through one team and one facility, from formulation through final package.
            </p>
          </div>
        </section>

        {/* ── 2. COMPANY STORY — first cream section after the hero. ─────
            Green fade applied here: a genuine dark-to-cream handoff. */}
        <section className={`${GREEN_FADE_CLASS} bg-[var(--color-cream)]`} style={GREEN_FADE}>
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <div className="lg:grid lg:grid-cols-[54fr_46fr] lg:items-center lg:gap-16">
              <div className="w-full">
                <Image
                  src={FACILITY_PHOTO_URL}
                  alt="GSX production line with American and Oklahoma flags and the GSX Green Science Extracts wall logo in Chelsea, Oklahoma"
                  width={1310}
                  height={1200}
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-10 lg:mt-0">
                <h2 className="text-h2 text-[var(--color-dark)]">
                  Built here from the beginning.
                </h2>
                <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-green)', marginTop: '1.1rem', marginBottom: '1.25rem' }} />
                <p className="text-body text-[var(--color-muted)]" style={{ maxWidth: '46ch' }}>
                  GSX is an Oklahoma edible manufacturer based in Chelsea. Rather than separating formulation, manufacturing, and packaging across outside vendors, we built our operation around doing the work ourselves.
                </p>
                <p className="text-body text-[var(--color-muted)]" style={{ maxWidth: '46ch', marginTop: '1rem' }}>
                  That means the same company developing the product is also responsible for making it, packaging it, and putting the GSX name on the final result.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. OPERATING MODEL — dark, one strong statement + 3 plain
            typographic columns (no cards, no icons). ───────────────────── */}
        <section className="bg-[var(--color-dark)]">
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <h2
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
              style={{ fontSize: 'clamp(2.125rem, 3.6vw, 3.25rem)', lineHeight: '1.08', letterSpacing: '-0.03em', maxWidth: '20ch' }}
            >
              One facility. One team. One standard.
            </h2>
            <p
              className="font-[family-name:var(--font-manrope)] font-light"
              style={{ color: 'rgba(250,248,243,0.55)', fontSize: '1.0625rem', lineHeight: '1.68', marginTop: '1.25rem', maxWidth: '52ch' }}
            >
              Keeping the process under one roof gives GSX direct responsibility for how its products move from an idea to a finished package.
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-3"
              style={{ gap: '2rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(250,248,243,0.12)' }}
            >
              {OPERATING_PILLARS.map((item) => (
                <div key={item.title}>
                  <p className="text-label" style={{ color: 'var(--color-accent)' }}>{item.title}</p>
                  <p className="text-body-sm" style={{ color: 'rgba(250,248,243,0.55)', marginTop: '0.6rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. MANUFACTURING IMAGE MOMENT — full-bleed editorial band.
            Desktop height is fixed (not aspect-ratio-based) so it reads as
            a deliberate band rather than however-tall-the-crop-happens-to-be.
            object-position keeps the tray/equipment/worker in frame at any
            viewport width (verified: cover always crops vertically here,
            never horizontally, since this portrait photo is narrower than
            any realistic band-shaped container — so only the Y value below
            actually matters). Text sits inside the normal G container,
            bottom-left, over a short, localized scrim only (not a full
            card, not a half-image gradient). */}
        <section className="relative w-full aspect-[4/3] md:aspect-auto md:h-[480px] bg-[var(--color-ink)] overflow-hidden">
          <Image
            src={PROCESS_PHOTO_URL}
            alt="GSX team member in gloves holding a tray of product beside production equipment in the Chelsea, Oklahoma facility"
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{ objectPosition: '50% 26%' }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-[rgba(12,12,11,0.65)] to-transparent" />
          <div className={`absolute inset-x-0 bottom-0 ${G}`} style={{ paddingBottom: '1.75rem' }}>
            <p
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
              style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', letterSpacing: '-0.015em', maxWidth: '22ch' }}
            >
              Real equipment. Real process. Made here.
            </p>
          </div>
        </section>

        {/* ── 5. PROCESS — cream, 4-step horizontal sequence. No fade:
            this follows a photo section, not a flat dark one. id="process"
            matches the footer's existing "/about#process" link. ────────── */}
        <section id="process" className="bg-[var(--color-cream)] scroll-mt-16 md:scroll-mt-18">
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <h2 className="text-h2 text-[var(--color-dark)]">
              From formulation to final package.
            </h2>
            <p className="text-body text-[var(--color-muted)]" style={{ marginTop: '0.75rem', maxWidth: '54ch' }}>
              GSX keeps the core production path connected inside its own operation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: '2.5rem', gap: '1.5rem' }}>
              {PROCESS_STEPS.map((step) => (
                <ManufacturingCard
                  key={step.order}
                  order={step.order}
                  title={step.title}
                  description={step.description}
                  tone="light"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. RESPECT THE DOSE — dark philosophy statement, now a
            balanced two-column composition. The small logo that used to
            float above the heading is removed; the same mark returns
            larger on the right, providing the visual balance instead. */}
        <section className="bg-[var(--color-dark)]">
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
              <div>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                  style={{ fontSize: 'clamp(2.125rem, 3.8vw, 3.25rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
                >
                  Respect the Dose.
                </h2>
                <p
                  className="font-[family-name:var(--font-manrope)] font-light"
                  style={{ color: 'rgba(250,248,243,0.6)', fontSize: '1.0625rem', lineHeight: '1.68', marginTop: '1.25rem', maxWidth: '58ch' }}
                >
                  For GSX, Respect the Dose is more than a line on the package. It is a reminder that an edible should be made deliberately, labeled clearly, and treated like the product it is.
                </p>
                <p
                  className="font-[family-name:var(--font-manrope)] font-light"
                  style={{ color: 'rgba(250,248,243,0.45)', fontSize: '0.9375rem', lineHeight: '1.68', marginTop: '1rem', maxWidth: '58ch' }}
                >
                  That idea runs through how we formulate, manufacture, package, and present the GSX lineup.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end mt-10 lg:mt-0">
                <Image
                  src={RESPECT_LOGO_URL}
                  alt="Oklahoma outline, Respect the Dose, GSX Green Science Extracts"
                  width={808}
                  height={448}
                  className="w-full h-auto"
                  style={{ maxWidth: '360px' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. PRODUCT FAMILY PROOF — cream, lightweight proof strip.
            Bridges back into Products. Green fade applied: another
            genuine dark-to-cream handoff. One representative image per
            family (its first/flagship variant) rendered in a fixed-size,
            object-contain image area so all five stay visually aligned
            despite each source image having a different native aspect
            ratio — same principle used to align artwork on the Products
            page, just applied at the box level here since these are much
            smaller and don't need pixel-level baseline matching. Still not
            a catalog: no descriptions, specs, per-product CTAs, or SKUs
            beyond the one representative image. ───────────────────────── */}
        <section className={`${GREEN_FADE_CLASS} bg-[var(--color-cream)]`} style={GREEN_FADE}>
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <h2 className="text-h2 text-[var(--color-dark)]">
              One operation. Multiple product lines.
            </h2>
            <p className="text-body text-[var(--color-muted)]" style={{ marginTop: '0.75rem', maxWidth: '62ch' }}>
              Chocolate Bites, Chocolate Bites Singles, Precision Crafted Gummies, Fruit Crunchers, and The Hammer are all part of the GSX lineup produced in Chelsea.
            </p>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
              style={{ gap: '2rem 1.5rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}
            >
              {PRODUCT_FAMILIES.map((family) => {
                const rep = family.variants[0]
                return (
                  <div key={family.slug} className="flex flex-col items-center text-center">
                    <div className="relative" style={{ width: '80px', height: '80px' }}>
                      {rep.imageUrl && (
                        <Image
                          src={rep.imageUrl}
                          alt={`GSX ${family.name} package`}
                          fill
                          sizes="80px"
                          className="object-contain"
                        />
                      )}
                    </div>
                    <p className="text-h4 text-[var(--color-dark)]" style={{ marginTop: '0.85rem' }}>
                      {family.name}
                    </p>
                  </div>
                )
              })}
            </div>

            <Button href="/products" variant="primary" size="lg" style={{ marginTop: '2.5rem' }}>
              View Products
            </Button>
          </div>
        </section>

        {/* ── 8. FIND GSX — reused verbatim from Homepage / Products ──── */}
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

        {/* ── 9. RETAILER STRIP — reused verbatim from Homepage / Products ── */}
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
