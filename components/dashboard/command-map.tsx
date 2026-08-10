'use client'

import { MapPanel } from '@/components/map/map-panel'
import { Pill } from '@/components/kit'
import { useSystem } from '@/components/system-provider'
import {
  hospitals,
  activeRoute,
  trafficSegments,
  patientLocation,
  patients,
} from '@/lib/mock-data'
import { Navigation, Clock, Route as RouteIcon } from 'lucide-react'

export function CommandMap() {
  const { ambulances } = useSystem()
  const patient = patients[0]

  return (
    <MapPanel
      className="h-[420px] shadow-card lg:h-full"
      ambulances={ambulances.filter((a) => a.status !== 'Offline')}
      hospitals={hospitals}
      patient={patientLocation}
      route={activeRoute}
      traffic={trafficSegments}
      overlay={
        <>
          {/* Top-left live badge */}
          <div className="pointer-events-none absolute left-4 top-4 z-[500] flex flex-wrap gap-2">
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-soft">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-destructive" />
              </span>
              Live Tracking
            </span>
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium shadow-soft">
              <RouteIcon className="size-3.5 text-primary" />
              Fastest route active
            </span>
          </div>

          {/* Top-right ETA */}
          <div className="glass pointer-events-none absolute right-4 top-4 z-[500] rounded-2xl px-3.5 py-2 shadow-soft">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">ETA to Apollo</p>
                <p className="font-mono text-base font-semibold tabular-nums">08 min</p>
              </div>
            </div>
          </div>

          {/* Bottom traffic legend */}
          <div className="glass pointer-events-none absolute bottom-4 left-4 z-[500] flex items-center gap-3 rounded-2xl px-3.5 py-2 text-xs shadow-soft">
            <span className="font-semibold text-foreground">Traffic</span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-success" /> Clear
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-warning" /> Moderate
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-destructive" /> Heavy
            </span>
          </div>

          {/* Bottom-right ambulance chip */}
          <div className="glass pointer-events-none absolute bottom-4 right-4 z-[500] rounded-2xl px-3.5 py-2 shadow-soft">
            <div className="flex items-center gap-2">
              <Navigation className="size-4 text-destructive" />
              <div>
                <p className="text-xs font-semibold">AMB-07 · Transporting</p>
                <p className="text-[11px] text-muted-foreground">
                  {patient.name} · {patient.priority}
                </p>
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}
