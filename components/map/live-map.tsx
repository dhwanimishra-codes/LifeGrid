'use client'

import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import {
  type Ambulance,
  type Hospital,
  type LatLng,
  CITY_CENTER,
} from '@/lib/mock-data'

const ambGlyph = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10H6"/><path d="M8 8v4"/><path d="M9 18h6"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"/><path d="M2 8a2 2 0 0 1 2-2h10a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>`
const hosGlyph = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v4"/><path d="M14 8h-4"/><path d="M18 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"/><path d="M4 21V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13"/><path d="M2 21h20"/></svg>`
const patGlyph = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>`

const COLORS: Record<string, string> = {
  primary: '#2f5fd6',
  critical: '#e2483a',
  warning: '#e08a2b',
  success: '#2e9968',
  muted: '#8a93a6',
}

function statusHex(status: Ambulance['status']) {
  switch (status) {
    case 'Available':
      return COLORS.success
    case 'En Route':
      return COLORS.primary
    case 'At Patient':
      return COLORS.warning
    case 'Transporting':
      return COLORS.critical
    default:
      return COLORS.muted
  }
}

function makeIcon(html: string, color: string, size = 34, pulse = false) {
  return L.divIcon({
    className: 'amb-div-icon',
    html: `<div class="map-marker${pulse ? ' map-pulse' : ''}" style="width:${size}px;height:${size}px;background:${color};color:${color};position:relative">${html}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

function FitBounds({ points }: { points: LatLng[] }) {
  const map = useMap()
  useEffect(() => {
    if (points.length === 0) return
    if (points.length === 1) {
      map.setView(points[0], 14, { animate: true })
      return
    }
    const bounds = L.latLngBounds(points.map((p) => L.latLng(p[0], p[1])))
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 })
  }, [map, points])
  return null
}

export interface LiveMapProps {
  ambulances?: Ambulance[]
  hospitals?: Hospital[]
  patient?: LatLng | null
  route?: LatLng[]
  traffic?: { path: LatLng[]; level: 'clear' | 'moderate' | 'heavy' }[]
  onSelectAmbulance?: (id: string) => void
  onSelectHospital?: (id: string) => void
  fitTo?: LatLng[]
  center?: LatLng
  zoom?: number
}

export default function LiveMap({
  ambulances = [],
  hospitals = [],
  patient = null,
  route = [],
  traffic = [],
  onSelectAmbulance,
  onSelectHospital,
  fitTo,
  center = CITY_CENTER,
  zoom = 13,
}: LiveMapProps) {
  const trafficColor = { clear: COLORS.success, moderate: COLORS.warning, heavy: COLORS.critical }

  const autoFit = useMemo<LatLng[]>(() => {
    if (fitTo && fitTo.length) return fitTo
    const pts: LatLng[] = []
    ambulances.forEach((a) => pts.push(a.location))
    hospitals.forEach((h) => pts.push(h.location))
    if (patient) pts.push(patient)
    return pts
  }, [fitTo, ambulances, hospitals, patient])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false}
      className="size-full"
      style={{ minHeight: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {traffic.map((seg, i) => (
        <Polyline
          key={`t-${i}`}
          positions={seg.path}
          pathOptions={{ color: trafficColor[seg.level], weight: 7, opacity: 0.85, lineCap: 'round' }}
        />
      ))}

      {route.length > 1 && (
        <Polyline
          positions={route}
          pathOptions={{ color: COLORS.primary, weight: 3, opacity: 0.9, dashArray: '2 8', lineCap: 'round' }}
        />
      )}

      {patient && (
        <Marker position={patient} icon={makeIcon(patGlyph, COLORS.critical, 30, true)}>
          <Popup>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-[#e2483a]">Patient Location</p>
              <p className="text-xs text-slate-500">Emergency scene · Richmond Road</p>
            </div>
          </Popup>
        </Marker>
      )}

      {hospitals.map((h) => (
        <Marker
          key={h.id}
          position={h.location}
          icon={makeIcon(hosGlyph, COLORS.primary, 30)}
          eventHandlers={{ click: () => onSelectHospital?.(h.id) }}
        >
          <Popup>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-800">{h.name}</p>
              <p className="text-[11px] text-slate-500">
                {h.distanceKm} km · ETA {h.eta} min
              </p>
              <p className="text-[11px] text-slate-600">
                ICU {h.icuBeds} · ER {h.emergencyBeds} · O₂ {h.oxygen}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {ambulances.map((a) => (
        <Marker
          key={a.id}
          position={a.location}
          icon={makeIcon(ambGlyph, statusHex(a.status), 34, a.status === 'Transporting' || a.status === 'En Route')}
          eventHandlers={{ click: () => onSelectAmbulance?.(a.id) }}
        >
          <Popup>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-800">
                {a.id} · {a.callSign}
              </p>
              <p className="text-[11px] text-slate-500">
                {a.status} · {a.area}
              </p>
              {a.eta != null && <p className="text-[11px] text-slate-600">ETA {a.eta} min</p>}
            </div>
          </Popup>
        </Marker>
      ))}

      <FitBounds points={autoFit} />
    </MapContainer>
  )
}
