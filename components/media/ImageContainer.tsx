import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Aspect ratios used across the site
type AspectRatio = '1/1' | '4/3' | '3/2' | '16/9' | '3/4' | '9/16' | 'auto'

const ratioStyles: Record<AspectRatio, string> = {
  '1/1':  'aspect-square',
  '4/3':  'aspect-[4/3]',
  '3/2':  'aspect-[3/2]',
  '16/9': 'aspect-video',
  '3/4':  'aspect-[3/4]',
  '9/16': 'aspect-[9/16]',
  'auto': '',
}

interface ImageContainerProps {
  image: SanityImageSource & { alt?: string; hotspot?: { x: number; y: number } }
  ratio?: AspectRatio
  sizes?: string
  priority?: boolean
  className?: string
  fill?: boolean
}

// Map Sanity hotspot (0–1 coords) to CSS object-position
function hotspotToObjectPosition(hotspot?: { x: number; y: number }) {
  if (!hotspot) return 'center center'
  return `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
}

export function ImageContainer({
  image,
  ratio = '3/2',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  className = '',
  fill = false,
}: ImageContainerProps) {
  const src = urlFor(image).auto('format').fit('max').url()
  const alt = (image as { alt?: string }).alt ?? ''
  const hotspot = (image as { hotspot?: { x: number; y: number } }).hotspot
  const objectPosition = hotspotToObjectPosition(hotspot)

  if (fill) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${ratioStyles[ratio]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        style={{ objectPosition }}
      />
    </div>
  )
}
