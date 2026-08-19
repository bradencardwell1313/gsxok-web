'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Vertical video component for 9:16 phone footage (512×910).
// - Muted autoplay + loop when in viewport
// - poster image shown until video is ready
// - prefers-reduced-motion: shows poster only, no autoplay
// - Contained in a framed module — never stretched full-width on desktop

interface VerticalVideoProps {
  src: string                 // Absolute URL or /public path
  posterSrc?: string          // Image URL for before video loads
  posterAlt?: string
  className?: string
  label?: string              // Accessible label
}

export function VerticalVideo({
  src,
  posterSrc,
  posterAlt = 'Manufacturing process',
  className = '',
  label,
}: VerticalVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Autoplay when in viewport, pause when out
  useEffect(() => {
    if (reducedMotion) return
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {/* autoplay blocked */})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div
      className={`relative overflow-hidden aspect-[9/16] bg-[var(--color-dark)] ${className}`}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      {/* Poster image — shown until video plays */}
      {posterSrc && (
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          className={`object-cover transition-opacity duration-500 ${
            videoReady && !reducedMotion ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 640px) 100vw, 400px"
        />
      )}

      {/* Video — hidden when prefers-reduced-motion */}
      {!reducedMotion && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          onCanPlay={() => setVideoReady(true)}
        />
      )}
    </div>
  )
}
