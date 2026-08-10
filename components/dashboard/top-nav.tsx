'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Activity,
  Ambulance,
  Bot,
  FileText,
  LayoutDashboard,
  Map,
  Menu,
  Stethoscope,
  Users,
  Hospital,
  X,
  Radio,
} from 'lucide-react'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/ambulances', label: 'Ambulances', icon: Ambulance },
  { href: '/dashboard/patients', label: 'Patients', icon: Users },
  { href: '/dashboard/hospitals', label: 'Hospitals', icon: Hospital },
  { href: '/dashboard/map', label: 'Live Map', icon: Map },
  { href: '/dashboard/doctors', label: 'Doctors', icon: Stethoscope },
  { href: '/dashboard/ai', label: 'AI Assistant', icon: Bot },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
]

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-navy text-primary-foreground shadow-soft">
        <Activity className="size-5" />
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-destructive ring-2 ring-background" />
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          Life<span className="text-primary">Grid</span>
        </span>
      )}
    </Link>
  )
}

export function TopNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === href : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 sm:px-6">
        <BrandMark />

        <nav className="ml-2 hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success ring-1 ring-inset ring-success/20 sm:flex">
            <Radio className="size-3.5 animate-pulse" />
            Live · Bengaluru Grid
          </span>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 lg:hidden">
          <div className="grid grid-cols-2 gap-1.5">
            {NAV.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
