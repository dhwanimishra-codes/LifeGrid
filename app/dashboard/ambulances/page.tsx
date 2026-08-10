'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/dashboard/page-header'
import { AmbulanceCard } from '@/components/ambulance/ambulance-card'
import { AmbulanceDetail } from '@/components/ambulance/ambulance-detail'
import { MapPanel } from '@/components/map/map-panel'
import { useSystem } from '@/components/system-provider'
import type { Ambulance, AmbulanceStatus } from '@/lib/mock-data'

const FILTERS: ('All' | AmbulanceStatus)[] = [
  'All',
  'Available',
  'En Route',
  'At Patient',
  'Transporting',
  'Offline',
]

export default function AmbulancesPage() {
  const { ambulances } = useSystem()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [selected, setSelected] = useState<Ambulance | null>(null)

  const list = useMemo(
    () => (filter === 'All' ? ambulances : ambulances.filter((a) => a.status === filter)),
    [ambulances, filter],
  )

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: ambulances.length }
    ambulances.forEach((a) => (c[a.status] = (c[a.status] ?? 0) + 1))
    return c
  }, [ambulances])

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        eyebrow="Fleet"
        title="Ambulance Fleet"
        description="Monitor and dispatch the emergency response fleet in real time."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-4">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors',
                  filter === f
                    ? 'bg-primary text-primary-foreground ring-primary'
                    : 'bg-card text-muted-foreground ring-border hover:text-foreground',
                )}
              >
                {f}
                <span className={cn('ml-1.5 text-xs', filter === f ? 'opacity-80' : 'text-muted-foreground/70')}>
                  {counts[f] ?? 0}
                </span>
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {list.map((amb) => (
              <AmbulanceCard key={amb.id} amb={amb} onClick={() => setSelected(amb)} />
            ))}
            {list.length === 0 && (
              <p className="col-span-full rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No ambulances with status “{filter}”.
              </p>
            )}
          </div>
        </div>

        {/* Sticky map */}
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
          <MapPanel
            className="h-[360px] shadow-card lg:h-full"
            ambulances={list.filter((a) => a.status !== 'Offline')}
            onSelectAmbulance={(id) => {
              const a = ambulances.find((x) => x.id === id)
              if (a) setSelected(a)
            }}
          />
        </div>
      </div>

      <AmbulanceDetail amb={selected} onOpenChange={(v) => !v && setSelected(null)} />
    </div>
  )
}
