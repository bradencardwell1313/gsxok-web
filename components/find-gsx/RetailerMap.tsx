'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import Map, { Marker, type MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Retailer } from '@/lib/retailers/types'

// Mapbox wrapper for the Find GSX locator. Only mounted by RetailerLocator
// when NEXT_PUBLIC_MAPBOX_TOKEN is configured — see RetailerLocator.tsx for
// the "map unavailable" fallback shown when it isn't. This component always
// assumes a valid token.
//
// Imports from the bare 'react-map-gl' package root, not a '/mapbox'
// subpath — the installed 7.1.x line has no such subpath (verified against
// the published package contents); the root export is mapbox-gl-backed by
// default (see node_modules/react-map-gl/dist/esm/index.d.ts).
//
// Style: mapbox://styles/mapbox/light-v11 (Mapbox's stock light basemap),
// not a custom dark/tinted style. The build spec requires streets and city
// names to stay readable and explicitly warns against an overly dark or
// low-contrast map — a light basemap sitting inside this section's cream
// background satisfies that directly. Brand presence comes from the
// square, green-accented markers, not from re-skinning the whole map.
//
// Markers are plain square swatches (a real <button> each, not the default
// Mapbox teardrop pin) to keep the site's square-corner geometry and avoid
// any generic map-pin/leaf iconography. No built-in NavigationControl /
// GeolocateControl widgets are added — mapbox-gl's own control chrome ships
// rounded buttons that would conflict with the square-corner system, and
// the page already has its own branded "Use My Location" control in the
// search bar. Native scroll/drag/pinch zoom and pan remain available.

export interface RetailerMapHandle {
  flyTo: (center: { lat: number; lng: number }, zoom?: number) => void
}

interface RetailerMapProps {
  token: string
  retailers: Retailer[]
  selectedId: string | null
  onSelect: (id: string) => void
  initialCenter: { lat: number; lng: number }
  initialZoom: number
}

export const RetailerMap = forwardRef<RetailerMapHandle, RetailerMapProps>(function RetailerMap(
  { token, retailers, selectedId, onSelect, initialCenter, initialZoom },
  ref
) {
  const mapRef = useRef<MapRef>(null)

  useImperativeHandle(
    ref,
    () => ({
      flyTo: (center, zoom) => {
        mapRef.current?.flyTo({
          center: [center.lng, center.lat],
          zoom: zoom ?? 11,
          duration: 800,
        })
      },
    }),
    []
  )

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={token}
      initialViewState={{
        longitude: initialCenter.lng,
        latitude: initialCenter.lat,
        zoom: initialZoom,
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      style={{ width: '100%', height: '100%' }}
    >
      {retailers.map((r) => {
        const selected = selectedId === r.id
        return (
          <Marker key={r.id} longitude={r.lng} latitude={r.lat} anchor="center">
            <button
              type="button"
              onClick={() => onSelect(r.id)}
              aria-label={`${r.name}, ${r.city}. Show in retailer list.`}
              aria-pressed={selected}
              className="block cursor-pointer border-0 bg-transparent p-2 focus-visible:outline-none"
              style={{ transform: selected ? 'scale(1.25)' : 'scale(1)', transition: 'transform 120ms ease' }}
            >
              <span
                aria-hidden="true"
                className="block"
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: selected ? 'var(--color-green)' : 'var(--color-cream)',
                  border: '2px solid var(--color-green)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
                }}
              />
            </button>
          </Marker>
        )
      })}
    </Map>
  )
})
