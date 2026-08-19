'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

interface VerticalVideoProps {
  src: string
  posterSrc?: string
  posterAlt?: string
  className?: string
  label?: string
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
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // IntersectionObserver autoplay — respects user's manual pause choice
  useEffect(() => {
    if (reducedMotion) return
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) {
          video.play().then(() => setPlaying(true)).catch(() => {})
        } else if (!entry.isIntersecting) {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion, userPaused])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => { setPlaying(true); setUserPaused(false) }).catch(() => {})
    } else {
      video.pause()
      setPlaying(false)
      setUserPaused(true)
    }
  }, [])

  return (
    <div
      className={`relative overflow-hidden aspect-[9/16] bg-[var(--color-dark)] group ${className}`}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      {/* Poster */}
      {posterSrc && (
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          className={`object-cover transition-opacity duration-500 ${
            videoReady && playing && !reducedMotion ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 640px) 100vw, 400px"
        />
      )}

      {/* Video */}
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
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}

      {/* Play/Pause button — visible on hover or when paused */}
      {!reducedMotion && videoReady && (
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className={`absolute bottom-4 right-4 z-10 w-10 h-10 flex items-center justify-center
            bg-[rgba(15,26,20,0.7)] border border-[rgba(250,248,243,0.2)]
            text-[var(--color-cream)] transition-opacity duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
            ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}
          `}
        >
          {playing ? (
            // Pause icon
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <rect x="2" y="1" width="4" height="12" rx="1"/>
              <rect x="8" y="1" width="4" height="12" rx="1"/>
            </svg>
          ) : (
            // Play icon
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d="M3 1.5l9 5.5-9 5.5V1.5z"/>
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
