import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { PRODUCT_FAMILIES } from '@/lib/products/catalog'

export const metadata = {
  title: 'Learn',
  description: 'Simple guidance for understanding GSX edibles, serving sizes, product formats, and responsible use.',
}

const G = 'w-full max-w-[1280px] mx-auto px-6 md:px-16 xl:px-24'

// Same green-to-cream fade used on every other public page — reused
// selectively here, only where a dark section hands off directly into a
// cream one.
const GREEN_FADE = {
  backgroundImage:
    'linear-gradient(to bottom, rgba(26,122,74,0.32) 0%, rgba(26,122,74,0.12) 20%, rgba(26,122,74,0) 60%, rgba(26,122,74,0) 100%)',
}
const GREEN_FADE_CLASS = 'relative bg-[length:100%_96px] md:bg-[length:100%_160px] bg-no-repeat bg-top'

const STORAGE_POINTS = [
  'Keep products in their original packaging',
  'Store them away from children and pets',
  'Store them securely',
  'Do not leave products where they could be mistaken for ordinary food or candy',
  'Follow the labeling on the package',
]

// Verbatim from the approved brief — do not rephrase or add to these.
const FAQ_ITEMS = [
  {
    q: 'How much should I take?',
    a: 'Follow the serving information on the package and avoid taking more before giving the edible time to take effect.',
  },
  {
    q: 'Why do edibles take longer?',
    a: 'Edibles are consumed and processed differently from inhaled cannabis products, so the experience is not immediate.',
  },
  {
    q: 'Can I split a serving?',
    a: 'Follow the portioning and serving information shown on the specific GSX package.',
  },
  {
    q: 'How should I store GSX products?',
    a: 'Keep them secured, in their original packaging, and away from children and pets.',
  },
  {
    q: 'Where can I find GSX?',
    a: 'Use the Find GSX page to search by ZIP code or browse current GSX retailers.',
  },
]

export default function LearnPage() {
  return (
    <>
      <Nav />
      <main>

        {/* ── 1. HERO — compact, dark, typographic. Matches the
            Products/Find GSX intro pattern exactly. ─────────────────── */}
        <section className="bg-[var(--color-ink)]">
          <div className={G} style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
            <p className="text-label" style={{ color: 'rgba(250,248,243,0.5)', marginBottom: '1rem' }}>
              Learn
            </p>
            <h1
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
            >
              Know what you&rsquo;re taking
            </h1>
            <p
              className="text-[rgba(250,248,243,0.5)] font-[family-name:var(--font-manrope)] font-light"
              style={{ fontSize: '1.0625rem', lineHeight: '1.68', marginTop: '1rem', maxWidth: '56ch' }}
            >
              Simple guidance for understanding GSX edibles, serving sizes, product formats, and responsible use
            </p>
          </div>
        </section>

        {/* ── 2. RESPECT THE DOSE — cream, the strongest section on the
            page by virtue of being first after the hero and using the
            same text-h2 scale as every other page's lead cream section,
            not by any one-off decorative treatment. ────────────────── */}
        <section className={`${GREEN_FADE_CLASS} bg-[var(--color-cream)]`} style={GREEN_FADE}>
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <h2 className="text-h2 text-[var(--color-dark)]">Respect the Dose</h2>
            <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-green)', marginTop: '1.1rem', marginBottom: '1.25rem' }} />
            <p className="text-body text-[var(--color-muted)]" style={{ maxWidth: '60ch' }}>
              Edibles can take time to fully take effect. Start with the labeled serving size, give it time before taking more, and always read the package before use.
            </p>
            <p className="text-body-sm text-[var(--color-muted)]" style={{ marginTop: '1rem', maxWidth: '60ch' }}>
              GSX packages are labeled to help consumers understand serving size and total package content.
            </p>
          </div>
        </section>

        {/* ── 3. HOW EDIBLES WORK — dark. No onset-time promises, no
            "kicks in fast" / "lasts X hours" language. ───────────────── */}
        <section className="bg-[var(--color-dark)]">
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <h2
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
              style={{ fontSize: 'clamp(2.125rem, 3.6vw, 3.25rem)', lineHeight: '1.08', letterSpacing: '-0.03em', maxWidth: '20ch' }}
            >
              Edibles take time
            </h2>
            <p
              className="font-[family-name:var(--font-manrope)] font-light"
              style={{ color: 'rgba(250,248,243,0.55)', fontSize: '1.0625rem', lineHeight: '1.68', marginTop: '1.25rem', maxWidth: '58ch' }}
            >
              Edible products are consumed and processed differently than inhaled products, so effects are usually felt more slowly. Give an edible time to take effect before deciding whether to take more, and do not assume nothing is happening just because you do not feel an effect right away.
            </p>
          </div>
        </section>

        {/* ── 4. PRODUCT FORMATS — cream. Family names sourced from the
            same catalog Products/About already use, not a hardcoded
            duplicate list. Names only, no artwork — keeps this section
            educational rather than a second product showcase, and avoids
            any question of reusing locked packaging imagery here. ────── */}
        <section className={`${GREEN_FADE_CLASS} bg-[var(--color-cream)]`} style={GREEN_FADE}>
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <h2 className="text-h2 text-[var(--color-dark)]">Different formats, same responsibility</h2>
            <p className="text-body text-[var(--color-muted)]" style={{ marginTop: '1.1rem', maxWidth: '62ch' }}>
              GSX products come in a range of formats, including Chocolate Bites, Chocolate Bites Singles, Precision Crafted Gummies, Fruit Crunchers, and The Hammer. Formats differ in size, texture, serving format, and packaging, so the serving information on one product does not necessarily apply to another.
            </p>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
              style={{ gap: '1.5rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}
            >
              {PRODUCT_FAMILIES.map((family) => (
                <p key={family.slug} className="text-h4 text-[var(--color-dark)]">
                  {family.name}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. STORE RESPONSIBLY — dark. Same bullet-marker convention
            already used for the process markers on the Homepage. ────── */}
        <section className="bg-[var(--color-dark)]">
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <h2
              className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
              style={{ fontSize: 'clamp(2.125rem, 3.6vw, 3.25rem)', lineHeight: '1.08', letterSpacing: '-0.03em', maxWidth: '20ch' }}
            >
              Store responsibly
            </h2>
            <ul style={{ marginTop: '1.75rem', maxWidth: '58ch' }} className="flex flex-col gap-2.5">
              {STORAGE_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 font-[family-name:var(--font-manrope)]"
                  style={{ color: 'rgba(250,248,243,0.6)', fontSize: '0.9375rem', lineHeight: '1.6' }}
                >
                  <span className="inline-block w-1.5 h-1.5 mt-2 bg-[var(--color-accent)] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 6. FAQ — cream. Plain stacked Q&A, no accordion: nothing in
            the project already has a clean accordion pattern, and the
            brief is explicit not to introduce a new interaction just for
            this page. Fully static, no client-side JS required. ──────── */}
        <section className={`${GREEN_FADE_CLASS} bg-[var(--color-cream)]`} style={GREEN_FADE}>
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <h2 className="text-h2 text-[var(--color-dark)]">Frequently asked questions</h2>

            <div style={{ marginTop: '2rem' }}>
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={item.q}
                  style={{
                    paddingTop: '1.5rem',
                    paddingBottom: '1.5rem',
                    borderTop: i === 0 ? 'none' : '1px solid var(--color-border)',
                  }}
                >
                  <h3 className="text-h4 text-[var(--color-dark)]">{item.q}</h3>
                  <p className="text-body-sm text-[var(--color-muted)]" style={{ marginTop: '0.6rem', maxWidth: '60ch' }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. CTA AREA — dark, two simple consumer paths. ──────────── */}
        <section className="bg-[var(--color-dark)]">
          <div className={G} style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '2.5rem' }}>
              <div>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                  style={{ fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', letterSpacing: '-0.02em' }}
                >
                  Explore GSX products
                </h2>
                <Button href="/products" variant="primary" size="lg" style={{ marginTop: '1.5rem' }}>
                  View Products
                </Button>
              </div>
              <div>
                <h2
                  className="text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] font-semibold"
                  style={{ fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', letterSpacing: '-0.02em' }}
                >
                  Find GSX near you
                </h2>
                <Button href="/find-gsx" variant="primary" size="lg" style={{ marginTop: '1.5rem' }}>
                  Find GSX
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. RETAILER CONVERSION BAND — reused verbatim from
            Homepage / Products / About / Find GSX. ─────────────────── */}
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
                  Carry GSX in your store
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
