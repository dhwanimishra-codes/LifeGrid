import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/dashboard/top-nav'
import { ArrowRight } from 'lucide-react'

export function CtaBand() {
  return (
    <section id="network" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-primary to-navy px-6 py-14 text-center shadow-float sm:px-12">
        <div className="pointer-events-none absolute inset-0 grid-hero opacity-20" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary-foreground text-balance sm:text-4xl">
            An intelligent network that prepares hospitals before the patient arrives
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
            Step into the command center and see the full emergency response flow in action.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              render={<Link href="/dashboard" />}
              size="lg"
              className="h-12 bg-background px-6 text-base text-foreground hover:bg-background/90"
            >
              Launch Emergency Dashboard
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <BrandMark />
        <p className="text-sm text-muted-foreground">
          LifeGrid — Smart Ambulance Management System · Prototype
        </p>
        <p className="text-xs text-muted-foreground">Demo data · Not for clinical use</p>
      </div>
    </footer>
  )
}
