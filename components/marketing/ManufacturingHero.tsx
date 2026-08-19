import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/layout/SectionLabel'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { urlFor } from '@/lib/sanity/client'

// Manufacturing-led hero — text left, full-bleed process image right.
// Best candidate: F1ABAA24 (horizontal process image from media review).
// On mobile: image stacks below text.

interface ManufacturingHeroProps {
  eyebrow: string
  headline: string
  body: string
  image: SanityImageSource & { alt?: string; hotspot?: { x: number; y: number } }
  stat?: { value: string; label: string }[]  // e.g. [{ value: "100%", label: "Third-party tested" }]
}

function hotspotToPosition(hotspot?: { x: number; y: number }) {
  if (!hotspot) return 'center center'
  return `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
}

export function ManufacturingHero({
  eyebrow,
  headline,
  body,
  image,
  stat,
}: ManufacturingHeroProps) {
  const src = urlFor(image).auto('format').fit('max').width(1200).url()
  const alt = (image as { alt?: string }).alt ?? ''
  const hotspot = (image as { hotspot?: { x: number; y: number } }).hotspot
  const objectPosition = hotspotToPosition(hotspot)

  return (
    <section className="bg-[var(--color-dark)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* Text column */}
        <Container className="flex flex-col justify-center py-20 md:py-28 lg:py-32 lg:pr-16 lg:max-w-none">
          <div className="max-w-[520px] flex flex-col gap-6">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-h1 text-[var(--color-cream)] leading-tight">{headline}</h2>
            <p className="text-body-lg text-[rgba(250,248,243,0.6)] leading-relaxed">{body}</p>

            {stat && stat.length > 0 && (
              <div className="flex flex-wrap gap-8 pt-4 border-t border-[rgba(250,248,243,0.1)]">
                {stat.map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-h2 text-[var(--color-accent)] font-[family-name:var(--font-space-grotesk)]">
                      {value}
                    </span>
                    <span className="text-label text-[rgba(250,248,243,0.45)]">{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>

        {/* Image column — full height, no padding */}
        <div className="relative min-h-[400px] lg:min-h-0 overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition }}
          />
          {/* Subtle left-edge fade to blend with text column on desktop */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-dark)] to-transparent" />
        </div>
      </div>
    </section>
  )
}
