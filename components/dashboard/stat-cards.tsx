'use client'

import { cn } from '@/lib/utils'
import { useSystem } from '@/components/system-provider'
import { hospitals } from '@/lib/mock-data'
import { Ambulance, Siren, Hospital as HospitalIcon, Timer } from 'lucide-react'

export function StatCards() {
  const { ambulances } = useSystem()
  const active = ambulances.filter((a) => ['En Route', 'At Patient', 'Transporting'].includes(a.status)).length
  const available = ambulances.filter((a) => a.status === 'Available').length
  const readyHospitals = hospitals.filter((h) => h.readiness >= 75).length

  const stats = [
    { icon: Siren, label: 'Active Emergencies', value: '3', tone: 'critical', hint: '1 critical' },
    { icon: Ambulance, label: 'Ambulances Active', value: `${active}`, tone: 'primary', hint: `${available} available` },
    { icon: HospitalIcon, label: 'Hospitals Ready', value: `${readyHospitals}`, tone: 'success', hint: `of ${hospitals.length} partnered` },
    { icon: Timer, label: 'Avg Response', value: '6.4', unit: 'min', tone: 'primary', hint: '↓ 38% vs baseline' },
  ] as const

  const toneBg: Record<string, string> = {
    critical: 'bg-destructive/10 text-destructive',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
  }

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className={cn('flex size-9 items-center justify-center rounded-xl', toneBg[s.tone])}>
              <s.icon className="size-5" />
            </span>
          </div>
          <p className="mt-3 font-mono text-2xl font-semibold tabular-nums">
            {s.value}
            {'unit' in s && s.unit ? (
              <span className="ml-1 text-sm font-normal text-muted-foreground">{s.unit}</span>
            ) : null}
          </p>
          <p className="text-xs font-medium text-foreground">{s.label}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{s.hint}</p>
        </div>
      ))}
    </div>
  )
}
