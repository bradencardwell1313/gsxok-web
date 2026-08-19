import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/layout/SectionLabel'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { urlFor } from '@/lib/sanity/client'

// Manufacturing-led hero — text left, full-bleed process image right.
// Best candidate: F1ABAA24 (horizontal process image from media review).
// On mobile: image stacks below text.
// image is optional — text takes full width when Sanity is not yet populated.

type ProcessImage = SanityImageSource & { alt?: string; hotspot?: { x: number; y: number } }

interface ManufacturingHeroProps {
  eyebrow: string
  headline: string
  body: string
  image?: ProcessImage | null
  stat?: { value: string; label: string }[]
  cta?: { label: string; href: string }
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
  cta,
}: ManufacturingHeroProps) {
  const hasImage = image != null
  const src = hasImage ? urlFor(image!).auto('format').fit('max').width(1200).url() : null
  const alt = hasImage ? ((image as ProcessImage).alt ?? '') : ''
  const objectPosition = hasImage ? hotspotToPosition((image as ProcessImage).hotspot) : 'center center'

  return (
    <section className="bg-[var(--color-dark)] overflow-hidden">
      <div className={`grid grid-cols-1 ${hasImage ? 'lg:grid-cols-2' : ''} min-h-[600px]`}>

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

            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 text-label text-[var(--color-accent)] hover:text-[var(--color-cream)] transition-colors duration-150 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
              >
                {cta.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                </svg>
              </Link>
            )}
          </div>
        </Container>

        {/* Image column — only rendered when image is available */}
        {hasImage && src && (
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
        )}
      </div>
    </section>
  )
}
