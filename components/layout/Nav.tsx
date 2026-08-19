'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/find-gsx', label: 'Find GSX' },
  { href: '/about', label: 'About' },
  { href: '/learn', label: 'Learn' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add border on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[rgba(15,26,20,0.96)] backdrop-blur-md border-b border-[rgba(250,248,243,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Green Science Extracts home">
            {/* Text logo — replaced with <Image> once Larry provides the logo file */}
            <span className="text-h4 text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] tracking-tight group-hover:text-[var(--color-accent)] transition-colors duration-150">
              GSX
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-label transition-colors duration-150 ${
                    active
                      ? 'text-[var(--color-cream)]'
                      : 'text-[rgba(250,248,243,0.55)] hover:text-[var(--color-cream)]'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-label text-[rgba(250,248,243,0.55)] hover:text-[var(--color-cream)] transition-colors duration-150"
            >
              Portal Login
            </Link>
            <Button href="/contact" variant="primary" size="sm">
              Carry GSX
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span
              className={`block w-5 h-[1.5px] bg-[var(--color-cream)] origin-center transition-transform duration-200 ${
                open ? 'translate-y-[6.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[var(--color-cream)] transition-opacity duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[var(--color-cream)] origin-center transition-transform duration-200 ${
                open ? '-translate-y-[6.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out ${
          open ? 'max-h-[400px] border-b border-[rgba(250,248,243,0.06)]' : 'max-h-0'
        } bg-[rgba(15,26,20,0.98)] backdrop-blur-md`}
      >
        <nav className="flex flex-col px-6 py-6 gap-6" aria-label="Mobile navigation">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`text-body transition-colors duration-150 ${
                  active ? 'text-[var(--color-cream)]' : 'text-[rgba(250,248,243,0.6)]'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/login"
            className="text-body text-[rgba(250,248,243,0.6)] transition-colors duration-150"
          >
            Portal Login
          </Link>
          <Button href="/contact" variant="primary" size="sm" className="self-start">
            Carry GSX
          </Button>
        </nav>
      </div>
    </header>
  )
}
