import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { urlFor } from '@/lib/sanity/client'

// Image-led hero — dark overlay on a full-bleed photo.
// Primary use: homepage hero. Image crops to available height with hotspot control.
// Best candidates: 56E9BD64 or 55323CB6 (from media library review).

interface ImageHeroProps {
  headline: string
  subheadline?: string
  image: SanityImageSource & { alt?: string; hotspot?: { x: number; y: number } }
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  eyebrow?: string       // Section label above headline
  minHeight?: string     // CSS min-height, default '90vh'
}

function hotspotToPosition(hotspot?: { x: number; y: number }) {
  if (!hotspot) return 'center center'
  return `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
}

export function ImageHero({
  headline,
  subheadline,
  image,
  primaryCta,
  secondaryCta,
  eyebrow,
  minHeight = '90vh',
}: ImageHeroProps) {
  const src = urlFor(image).auto('format').fit('max').width(1920).url()
  const alt = (image as { alt?: string }).alt ?? ''
  const hotspot = (image as { hotspot?: { x: number; y: number } }).hotspot
  const objectPosition = hotspotToPosition(hotspot)

  return (
    <section
      className="relative flex items-end overflow-hidden bg-[var(--color-dark)]"
      style={{ minHeight }}
    >
      {/* Background image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />

      {/* Gradient overlay — darker at bottom for legible text */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,26,20,0.92)] via-[rgba(15,26,20,0.45)] to-[rgba(15,26,20,0.15)]" />

      {/* Content */}
      <Container className="relative z-10 pb-20 md:pb-28 pt-32">
        <div className="max-w-[640px] flex flex-col gap-6">
          {eyebrow && (
            <p className="section-label text-label text-[rgba(250,248,243,0.6)]">{eyebrow}</p>
          )}
          <h1 className="text-h1 md:text-display text-[var(--color-cream)] leading-tight">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-body-lg text-[rgba(250,248,243,0.65)] max-w-[480px] leading-relaxed">
              {subheadline}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {primaryCta && (
                <Button href={primaryCta.href} variant="primary" size="lg">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
