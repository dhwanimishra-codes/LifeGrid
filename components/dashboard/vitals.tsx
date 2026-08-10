'use client'

import { cn } from '@/lib/utils'
import { Heart, Activity, Wind, Gauge, Thermometer, Brain } from 'lucide-react'
import type { Vitals } from '@/lib/mock-data'

type Tone = 'ok' | 'warn' | 'crit'

function build(v: Vitals) {
  return [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: `${v.heartRate}`,
      unit: 'BPM',
      status: (v.heartRate > 100 || v.heartRate < 55 ? 'warn' : 'ok') as Tone,
    },
    {
      icon: Wind,
      label: 'SpO₂',
      value: `${v.spo2}`,
      unit: '%',
      status: (v.spo2 < 92 ? 'crit' : v.spo2 < 95 ? 'warn' : 'ok') as Tone,
    },
    {
      icon: Gauge,
      label: 'Blood Pressure',
      value: `${v.bpSys}/${v.bpDia}`,
      unit: 'mmHg',
      status: (v.bpSys < 95 || v.bpSys > 150 ? 'crit' : 'ok') as Tone,
    },
    {
      icon: Activity,
      label: 'Resp. Rate',
      value: `${v.respRate}`,
      unit: '/min',
      status: (v.respRate > 22 ? 'warn' : 'ok') as Tone,
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: `${v.tempC}`,
      unit: '°C',
      status: (v.tempC > 37.8 || v.tempC < 35 ? 'warn' : 'ok') as Tone,
    },
    {
      icon: Brain,
      label: 'GCS',
      value: `${v.gcs}`,
      unit: '/15',
      status: (v.gcs < 13 ? 'crit' : v.gcs < 15 ? 'warn' : 'ok') as Tone,
    },
  ]
}

const tone: Record<Tone, string> = {
  ok: 'text-success',
  warn: 'text-warning',
  crit: 'text-destructive',
}

export function VitalsGrid({ vitals, compact = false }: { vitals: Vitals; compact?: boolean }) {
  return (
    <div
      className={cn(
        'grid gap-2.5',
        compact ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
      )}
    >
      {build(vitals).map((it) => (
        <div key={it.label} className="rounded-2xl border border-border/70 bg-card p-3 shadow-soft">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <it.icon className={cn('size-3.5', tone[it.status])} />
            <span className="text-[10px] font-medium uppercase tracking-wide">{it.label}</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className={cn('font-mono text-lg font-semibold tabular-nums', tone[it.status])}>
              {it.value}
            </span>
            <span className="text-[11px] text-muted-foreground">{it.unit}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
