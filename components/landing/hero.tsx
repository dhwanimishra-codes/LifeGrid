'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPanel } from '@/components/map/map-panel'
import { Pill } from '@/components/kit'
import { ArrowRight, Clock, Navigation, Play } from 'lucide-react'
import {
  ambulances,
  hospitals,
  activeRoute,
  trafficSegments,
  patientLocation,
} from '@/lib/mock-data'

export function Hero() {
  const active = ambulances.filter((a) => a.id === 'AMB-07')
  const nearHospitals = hospitals.filter((h) => h.id === 'HOS-1')

  return (
    <section className="relative overflow-hidden">
      <div className="grid-hero pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-0 size-[32rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-40 size-[28rem] rounded-full bg-accent/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="animate-in-up">
          <Pill tone="critical" dot pulse className="mb-5">
            Emergency Response Network
          </Pill>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Smarter Ambulances.{' '}
            <span className="text-gradient">Faster Treatment.</span> Better Outcomes.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Connecting ambulances, patients, doctors and hospitals in real time to prepare for
            emergencies before the patient arrives.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button render={<Link href="/dashboard" />} size="lg" className="h-12 px-6 text-base">
              Launch Emergency Dashboard
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<a href="#workflow" />}
              variant="outline"
              size="lg"
              className="h-12 px-6 text-base"
            >
              <Play className="size-4" />
              Explore How It Works
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {[
              ['3 min', 'Avg. dispatch time'],
              ['42%', 'Faster ER readiness'],
              ['24/7', 'Live coordination'],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-bold text-foreground">{v}</p>
                <p className="text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-in-up relative [animation-delay:120ms]">
          <div className="glass rounded-3xl p-3 shadow-float">
            <MapPanel
              className="h-[380px] w-full sm:h-[440px]"
              ambulances={active}
              hospitals={nearHospitals}
              patient={patientLocation}
              route={activeRoute}
              traffic={trafficSegments}
              zoom={14}
            />
          </div>

          <div className="glass animate-float absolute -left-3 top-8 flex items-center gap-3 rounded-2xl p-3 shadow-float sm:-left-6">
            <span className="grid size-9 place-items-center rounded-xl bg-destructive/10 text-destructive">
              <Navigation className="size-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Ambulance AMB-07</p>
              <p className="text-sm font-semibold">Transporting · Critical</p>
            </div>
          </div>

          <div className="glass animate-float absolute -bottom-4 right-2 flex items-center gap-3 rounded-2xl p-3 shadow-float [animation-delay:1.5s] sm:right-6">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <Clock className="size-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">ETA to Apollo Trauma</p>
              <p className="text-sm font-semibold">08 min · Route optimized</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
