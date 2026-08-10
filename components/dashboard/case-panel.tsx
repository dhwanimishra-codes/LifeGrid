'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Pill, Meter } from '@/components/kit'
import { VitalsGrid } from './vitals'
import { PrepChecklist } from './prep-checklist'
import { AiSummaryDialog } from './ai-summary-dialog'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/kit'
import { patients, hospitals, priorityColor } from '@/lib/mock-data'
import { ArrowUpRight, Clock, Droplet, Navigation, Sparkles, User } from 'lucide-react'

export function CasePanel() {
  const patient = patients[0]
  const hospital = hospitals.find((h) => h.id === patient.hospitalId)!
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              Active Emergency
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold tracking-tight">
              Case #{patient.caseId}
            </h2>
          </div>
          <Pill tone="critical" dot pulse>
            {patient.priority}
          </Pill>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-muted/50 p-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold">{patient.name}</p>
            <p className="text-xs text-muted-foreground">
              {patient.age} yrs · {patient.gender} · {patient.bloodGroup}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[11px] uppercase text-muted-foreground">Emergency</p>
            <p className="text-xs font-medium">{patient.emergencyType}</p>
          </div>
        </div>

        <div className="mt-4">
          <VitalsGrid vitals={patient.vitals} compact />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border/70 p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Navigation className="size-3.5 text-primary" />
              <span className="text-[10px] font-medium uppercase tracking-wide">Destination</span>
            </div>
            <p className="mt-1.5 truncate text-sm font-semibold">{hospital.name}</p>
            <p className="text-xs text-muted-foreground">{hospital.distanceKm} km away</p>
          </div>
          <div className="rounded-2xl border border-border/70 p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="size-3.5 text-primary" />
              <span className="text-[10px] font-medium uppercase tracking-wide">ETA</span>
            </div>
            <p className="mt-1.5 font-mono text-lg font-semibold tabular-nums">
              {patient.vitals ? hospital.eta : 8}
              <span className="ml-1 text-xs font-normal text-muted-foreground">min</span>
            </p>
            <Meter value={62} tone="critical" className="mt-1.5" />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <ButtonLink href={`/dashboard/patients?id=${patient.id}`} className="flex-1">
            Open Patient Details
            <ArrowUpRight className="size-4" />
          </ButtonLink>
          <Button variant="outline" className="flex-1" onClick={() => setAiOpen(true)}>
            <Sparkles className="size-4 text-primary" />
            AI Clinical Summary
          </Button>
        </div>
      </div>

      <PrepChecklist />

      <AiSummaryDialog open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  )
}
