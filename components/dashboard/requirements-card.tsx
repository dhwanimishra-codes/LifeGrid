import { cn } from '@/lib/utils'
import { Pill } from '@/components/kit'
import { medicalRequirements } from '@/lib/mock-data'
import { Droplet, Wind, BedDouble, Pill as PillIcon, Stethoscope } from 'lucide-react'
import type { Requirement } from '@/lib/mock-data'

function reqTone(status: Requirement['status']) {
  switch (status) {
    case 'Ready':
      return 'success'
    case 'Preparing':
      return 'primary'
    case 'Pending':
      return 'warning'
    default:
      return 'critical'
  }
}

function ReqList({ items }: { items: Requirement[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((r) => (
        <li key={r.label} className="flex items-center justify-between gap-2 text-sm">
          <span className="min-w-0 truncate text-foreground/90">{r.label}</span>
          <Pill tone={reqTone(r.status) as never}>{r.status}</Pill>
        </li>
      ))}
    </ul>
  )
}

export function RequirementsCard() {
  const { medicines, equipment, critical } = medicalRequirements
  const criticalIcons = [Droplet, Wind, BedDouble]

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-card">
      <div className="flex items-center gap-2">
        <Stethoscope className="size-4 text-primary" />
        <h3 className="font-semibold">Medical Requirements</h3>
        <span className="ml-auto text-[11px] text-muted-foreground">Sent ahead of arrival</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {critical.map((c, i) => {
          const Icon = criticalIcons[i]
          return (
            <div
              key={c.label}
              className={cn(
                'rounded-2xl border p-3',
                c.status === 'Pending'
                  ? 'border-warning/40 bg-warning/5'
                  : 'border-border/70 bg-muted/30',
              )}
            >
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon className="size-3.5 text-primary" />
                <span className="text-[10px] font-medium uppercase tracking-wide">{c.label}</span>
              </div>
              <p className="mt-1.5 text-sm font-semibold">{c.value}</p>
              <Pill tone={c.status === 'Pending' ? 'warning' : 'success'} className="mt-1.5">
                {c.status}
              </Pill>
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <PillIcon className="size-3.5 text-primary" />
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Medicines Required
            </h4>
          </div>
          <ReqList items={medicines} />
        </div>
        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <Stethoscope className="size-3.5 text-primary" />
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Equipment Required
            </h4>
          </div>
          <ReqList items={equipment} />
        </div>
      </div>
    </div>
  )
}
