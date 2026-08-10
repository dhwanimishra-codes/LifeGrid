import { cn } from '@/lib/utils'
import { workflowSteps } from '@/lib/mock-data'
import { Check } from 'lucide-react'

export function WorkflowStrip() {
  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Pre-Arrival Workflow</h3>
          <p className="text-xs text-muted-foreground">
            Patient prepared before the ambulance reaches the hospital
          </p>
        </div>
        <span className="hidden rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary sm:inline">
          7 of 10 stages complete
        </span>
      </div>

      <ol className="mt-5 flex gap-1 overflow-x-auto pb-2">
        {workflowSteps.map((s, i) => {
          const state = s.done ? 'done' : s.current ? 'current' : 'todo'
          return (
            <li key={s.key} className="flex min-w-[92px] flex-1 flex-col items-center text-center">
              <div className="flex w-full items-center">
                <span
                  className={cn(
                    'h-0.5 flex-1 rounded-full',
                    i === 0 ? 'opacity-0' : s.done || s.current ? 'bg-primary' : 'bg-border',
                  )}
                />
                <span
                  className={cn(
                    'relative flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ring-4 ring-card',
                    state === 'done' && 'bg-primary text-primary-foreground',
                    state === 'current' && 'bg-warning text-warning-foreground',
                    state === 'todo' && 'bg-muted text-muted-foreground',
                  )}
                >
                  {state === 'done' ? <Check className="size-3.5" /> : i + 1}
                  {state === 'current' && (
                    <span className="absolute inline-flex size-7 animate-ping rounded-full bg-warning/40" />
                  )}
                </span>
                <span
                  className={cn(
                    'h-0.5 flex-1 rounded-full',
                    i === workflowSteps.length - 1 ? 'opacity-0' : s.done ? 'bg-primary' : 'bg-border',
                  )}
                />
              </div>
              <p
                className={cn(
                  'mt-2 text-[11px] font-medium leading-tight',
                  state === 'todo' ? 'text-muted-foreground' : 'text-foreground',
                )}
              >
                {s.label}
              </p>
              <p className="text-[10px] text-muted-foreground">{s.time}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
