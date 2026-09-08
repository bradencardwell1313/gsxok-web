import { NextRequest, NextResponse } from 'next/server'
import { lookupZip } from '@/lib/geo/zipLookup'

// Resolves a ZIP code to coordinates for the Find GSX locator (see
// components/find-gsx/RetailerLocator.tsx). Local dataset only — see
// lib/geo/zipLookup.ts for the package used and its limitations. No
// external API, no account, no token required.

const ZIP_PATTERN = /^\d{5}$/

export async function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get('zip') ?? ''

  if (!ZIP_PATTERN.test(zip)) {
    return NextResponse.json({ error: 'invalid_zip' }, { status: 400 })
  }

  const location = lookupZip(zip)
  if (!location) {
    return NextResponse.json({ error: 'zip_not_found' }, { status: 404 })
  }

  return NextResponse.json({ location })
}
