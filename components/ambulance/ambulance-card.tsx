'use client'

import { cn } from '@/lib/utils'
import { Pill, Meter } from '@/components/kit'
import { statusColor, type Ambulance } from '@/lib/mock-data'
import { MapPin, Navigation, Fuel, User, Clock } from 'lucide-react'

export function AmbulanceCard({
  amb,
  onClick,
  active = false,
}: {
  amb: Ambulance
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group w-full rounded-3xl border bg-card p-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card',
        active ? 'border-primary ring-1 ring-primary' : 'border-border/70',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              'flex size-10 items-center justify-center rounded-2xl text-primary-foreground',
              amb.status === 'Available' && 'bg-success',
              amb.status === 'En Route' && 'bg-primary',
              amb.status === 'At Patient' && 'bg-warning',
              amb.status === 'Transporting' && 'bg-destructive',
              amb.status === 'Offline' && 'bg-muted-foreground',
            )}
          >
            <Navigation className="size-5" />
          </span>
          <div>
            <p className="font-semibold leading-tight">{amb.id}</p>
            <p className="text-xs text-muted-foreground">{amb.callSign}</p>
          </div>
        </div>
        <Pill
          tone={statusColor(amb.status) as never}
          dot
          pulse={amb.status === 'Transporting' || amb.status === 'En Route'}
        >
          {amb.status}
        </Pill>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate text-foreground">{amb.area}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <User className="size-3.5 shrink-0" />
          <span className="truncate text-foreground">{amb.driver}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-3.5 shrink-0" />
          <span className="text-foreground">{amb.eta != null ? `ETA ${amb.eta} min` : 'Idle'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Fuel className="size-3.5 shrink-0" />
          <span className="text-foreground">{amb.fuelPct}% fuel</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {amb.type}
        </span>
        <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          View details →
        </span>
      </div>
    </button>
  )
}
