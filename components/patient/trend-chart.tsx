'use client'

import { cn } from '@/lib/utils'

interface Series {
  key: string
  label: string
  unit: string
  color: string
  values: number[]
}

function path(values: number[], w: number, h: number, pad = 6) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const step = (w - pad * 2) / (values.length - 1)
  return values
    .map((v, i) => {
      const x = pad + i * step
      const y = h - pad - ((v - min) / range) * (h - pad * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export function TrendChart({
  labels,
  series,
}: {
  labels: string[]
  series: Series[]
}) {
  const w = 300
  const h = 90

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      {series.map((s) => {
        const last = s.values[s.values.length - 1]
        const prev = s.values[0]
        const delta = last - prev
        return (
          <div
            key={s.key}
            className="flex-1 rounded-2xl border border-border/70 bg-card p-3.5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
              <span className="flex items-baseline gap-1">
                <span className="font-mono text-base font-semibold tabular-nums" style={{ color: s.color }}>
                  {last}
                </span>
                <span className="text-[10px] text-muted-foreground">{s.unit}</span>
              </span>
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-16 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${path(s.values, w, h)} L${w - 6},${h - 6} L6,${h - 6} Z`}
                fill={`url(#grad-${s.key})`}
              />
              <path
                d={path(s.values, w, h)}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{labels[0]}</span>
              <span>{labels[labels.length - 1]}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
