'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

const publicNavLinks = [
  { href: '/products', label: 'Products' },
  { href: '/find-gsx', label: 'Find GSX' },
  { href: '/about', label: 'About' },
  { href: '/learn', label: 'Learn' },
]

const retailerNavLinks = [
  { href: '/products', label: 'Products' },
  { href: '/portal', label: 'My Portal' },
  { href: '/portal/orders', label: 'Orders' },
  { href: '/find-gsx', label: 'Find GSX' },
]

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/accounts', label: 'Accounts' },
  { href: '/products', label: 'Products' },
]

export function Nav() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isAdmin = session?.user?.role === 'ADMIN'
  const isRetailer = session?.user && !isAdmin
  const isLoggedIn = Boolean(session?.user)

  const navLinks = isAdmin
    ? adminNavLinks
    : isRetailer
    ? retailerNavLinks
    : publicNavLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[rgba(15,26,20,0.96)] backdrop-blur-md border-b border-[rgba(250,248,243,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1280px] px-6 md:px-12 xl:px-20">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link
            href={isAdmin ? '/admin' : isRetailer ? '/portal' : '/'}
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="Green Science Extracts home"
          >
            <span className="text-h4 text-[var(--color-cream)] font-[family-name:var(--font-space-grotesk)] tracking-tight group-hover:text-[var(--color-accent)] transition-colors duration-150">
              GSX
            </span>
            {isAdmin && (
              <span className="text-label text-[rgba(250,248,243,0.4)] hidden sm:block">Admin</span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-label transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm ${
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

          {/* Desktop right CTAs — differ by auth state */}
          <div className="hidden md:flex items-center gap-4">
            {status === 'loading' ? (
              // Skeleton while session resolves — prevents layout shift
              <div className="w-24 h-4 bg-[rgba(250,248,243,0.1)] animate-pulse" />
            ) : isLoggedIn ? (
              <>
                <span className="text-label text-[rgba(250,248,243,0.45)] truncate max-w-[140px]">
                  {session?.user?.name ?? session?.user?.email}
                </span>
                <Button href="/api/auth/signout" variant="secondary" size="sm">
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-label text-[rgba(250,248,243,0.55)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
                >
                  Portal Login
                </Link>
                <Button href="/contact" variant="primary" size="sm">
                  Carry GSX
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(v => !v)}
          >
            <span className={`block w-5 h-[1.5px] bg-[var(--color-cream)] origin-center transition-transform duration-200 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[var(--color-cream)] transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[var(--color-cream)] origin-center transition-transform duration-200 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out ${
          open ? 'max-h-[480px] border-b border-[rgba(250,248,243,0.06)]' : 'max-h-0'
        } bg-[rgba(15,26,20,0.98)] backdrop-blur-md`}
      >
        <nav className="flex flex-col px-6 py-6 gap-6" aria-label="Mobile navigation">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`text-body transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm ${
                  active ? 'text-[var(--color-cream)]' : 'text-[rgba(250,248,243,0.6)]'
                }`}
              >
                {label}
              </Link>
            )
          })}
          {isLoggedIn ? (
            <Button href="/api/auth/signout" variant="secondary" size="sm" className="self-start">
              Sign out
            </Button>
          ) : (
            <>
              <Link href="/login" className="text-body text-[rgba(250,248,243,0.6)]">Portal Login</Link>
              <Button href="/contact" variant="primary" size="sm" className="self-start">Carry GSX</Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
