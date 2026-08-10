'use client'

import { cn } from '@/lib/utils'
import { useSystem } from '@/components/system-provider'
import { Button } from '@/components/ui/button'
import { Check, TriangleAlert, Loader, ShieldCheck } from 'lucide-react'
import type { Requirement } from '@/lib/mock-data'

function StatusIcon({ status }: { status: Requirement['status'] }) {
  if (status === 'Ready')
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-success/15 text-success">
        <Check className="size-3" />
      </span>
    )
  if (status === 'Preparing')
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Loader className="size-3 animate-spin" />
      </span>
    )
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-warning/20 text-warning">
      <TriangleAlert className="size-3" />
    </span>
  )
}

export function PrepChecklist() {
  const { prep, resolvePrep, prepareAll } = useSystem()
  const done = prep.filter((p) => p.status === 'Ready').length
  const pct = Math.round((done / prep.length) * 100)

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-primary" />
          <h3 className="font-semibold">Hospital Preparation</h3>
        </div>
        <span className="font-mono text-xs font-semibold text-muted-foreground tabular-nums">
          {done}/{prep.length}
        </span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-success transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="mt-4 flex flex-col gap-1.5">
        {prep.map((p) => (
          <li
            key={p.label}
            className={cn(
              'flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm',
              p.status !== 'Ready' && 'bg-muted/40',
            )}
          >
            <StatusIcon status={p.status} />
            <div className="min-w-0 flex-1">
              <p className={cn('truncate', p.status === 'Ready' ? 'text-foreground' : 'font-medium')}>
                {p.label}
              </p>
              {p.note && <p className="text-[11px] text-warning">{p.note}</p>}
            </div>
            {p.status !== 'Ready' && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-primary hover:bg-primary/10"
                onClick={() => resolvePrep(p.label)}
              >
                Resolve
              </Button>
            )}
          </li>
        ))}
      </ul>

      <Button className="mt-4 w-full" onClick={prepareAll} disabled={done === prep.length}>
        {done === prep.length ? 'Hospital Fully Prepared' : 'Prepare Hospital'}
      </Button>
    </div>
  )
}
