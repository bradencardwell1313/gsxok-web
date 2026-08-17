import type { Metadata } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import './globals.css'

// ── Fonts ────────────────────────────────────────────────────
// Both fonts are self-hosted via next/font (no external requests).
// CSS variables are defined here and consumed in globals.css.

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
})

// ── Metadata ─────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'GSX — Oklahoma Cannabis Manufacturer',
    template: '%s | GSX',
  },
  description:
    'GSX is an Oklahoma-based cannabis manufacturer specializing in precision-dosed edibles. Every product is developed and manufactured in-house.',
  metadataBase: new URL('https://gsxok.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gsxok.com',
    siteName: 'GSX',
  },
}

// ── Root Layout ───────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
