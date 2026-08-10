'use client'

import { cn } from '@/lib/utils'
import { Pill, Meter, AiDisclaimer } from '@/components/kit'
import { aiSummary } from '@/lib/mock-data'
import {
  Sparkles,
  TriangleAlert,
  ListChecks,
  MessageCircleQuestion,
  Activity,
} from 'lucide-react'

export function AiPanel({ inDialog = false }: { inDialog?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Headline */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card to-card p-5">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Sparkles className="size-4" />
          </span>
          <div>
            <h3 className="font-display text-base font-semibold">AI Emergency Summary</h3>
            <p className="text-[11px] text-muted-foreground">Case #1042 · Aarav Sharma</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Confidence</p>
            <p className="font-mono text-sm font-semibold text-primary">{aiSummary.confidence}%</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground/90">{aiSummary.headline}</p>
      </div>

      <div className={cn('grid gap-5', !inDialog && 'lg:grid-cols-2')}>
        {/* Critical Alerts */}
        <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <TriangleAlert className="size-4 text-destructive" />
            <h4 className="text-sm font-semibold">Critical Alerts</h4>
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {aiSummary.alerts.map((a) => (
              <li
                key={a.label}
                className="flex items-start gap-2.5 rounded-2xl bg-muted/40 p-3"
              >
                <span
                  className={cn(
                    'mt-1 size-2.5 shrink-0 rounded-full',
                    a.level === 'critical' ? 'bg-destructive' : 'bg-warning',
                  )}
                />
                <div>
                  <p className="text-sm font-semibold">{a.label}</p>
                  <p className="text-xs text-muted-foreground">{a.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Suggested Actions */}
        <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <ListChecks className="size-4 text-primary" />
            <h4 className="text-sm font-semibold">Suggested Actions</h4>
          </div>
          <ul className="mt-3 flex flex-col gap-1.5">
            {aiSummary.actions.map((a, i) => (
              <li key={a} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-foreground/90">{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Risk assessment */}
        <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-primary" />
            <h4 className="text-sm font-semibold">Preliminary Risk Assessment</h4>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {aiSummary.risks.map((r) => (
              <li key={r.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{r.label}</span>
                  <span className="font-mono text-muted-foreground">{r.score}%</span>
                </div>
                <Meter
                  value={r.score}
                  tone={r.score >= 60 ? 'critical' : r.score >= 40 ? 'warning' : 'success'}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Questions to ask */}
        <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <MessageCircleQuestion className="size-4 text-primary" />
            <h4 className="text-sm font-semibold">Questions to Ask</h4>
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {aiSummary.questions.map((q) => (
              <li
                key={q}
                className="rounded-2xl border border-dashed border-border px-3 py-2 text-sm text-foreground/90"
              >
                {q}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <AiDisclaimer />
    </div>
  )
}
