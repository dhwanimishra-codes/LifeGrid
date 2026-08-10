'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Sparkles, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'
import { useSystem } from './system-provider'

export function ButtonLink({
  href,
  external,
  children,
  className,
  variant,
  size,
}: {
  href: string
  external?: boolean
  children: React.ReactNode
  className?: string
} & VariantProps<typeof buttonVariants>) {
  const el = external ? (
    <a href={href} />
  ) : (
    <Link href={href} />
  )
  return (
    <Button nativeButton={false} render={el} variant={variant} size={size} className={className}>
      {children}
    </Button>
  )
}

type Tone = 'primary' | 'success' | 'warning' | 'critical' | 'muted'

const toneMap: Record<Tone, string> = {
  primary: 'bg-primary/10 text-primary ring-primary/20',
  success: 'bg-success/10 text-success ring-success/20',
  warning: 'bg-warning/15 text-warning-foreground ring-warning/30',
  critical: 'bg-destructive/10 text-destructive ring-destructive/20',
  muted: 'bg-muted text-muted-foreground ring-border',
}

const dotMap: Record<Tone, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  critical: 'bg-destructive',
  muted: 'bg-muted-foreground',
}

export function Pill({
  children,
  tone = 'muted',
  dot = false,
  pulse = false,
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  dot?: boolean
  pulse?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        toneMap[tone],
        className,
      )}
    >
      {dot && (
        <span className="relative inline-flex size-1.5">
          <span className={cn('absolute inline-flex size-full rounded-full', dotMap[tone])} />
          {pulse && (
            <span
              className={cn('absolute inline-flex size-full animate-ping rounded-full opacity-75', dotMap[tone])}
            />
          )}
        </span>
      )}
      {children}
    </span>
  )
}

export function Meter({
  value,
  tone = 'primary',
  className,
}: {
  value: number
  tone?: Tone
  className?: string
}) {
  const bar: Record<Tone, string> = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    critical: 'bg-destructive',
    muted: 'bg-muted-foreground',
  }
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-muted', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-700', bar[tone])}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}

export function AiDisclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        'flex items-start gap-2 rounded-xl bg-primary/5 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground ring-1 ring-primary/10',
        className,
      )}
    >
      <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
      <span>
        <strong className="font-semibold text-foreground">AI-Assisted Recommendation</strong> — Doctor&apos;s
        confirmation required. Final clinical decisions must be made by qualified medical professionals.
      </span>
    </p>
  )
}

export function ToastViewport() {
  const { toasts, dismissToast } = useSystem()
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[1000] flex w-[min(92vw,22rem)] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'animate-in-up glass pointer-events-auto flex items-start gap-3 rounded-2xl p-3.5 shadow-float',
          )}
        >
          <span
            className={cn(
              'mt-0.5 size-2 shrink-0 rounded-full',
              t.tone === 'success' ? 'bg-success' : t.tone === 'warning' ? 'bg-warning' : 'bg-primary',
            )}
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">{t.title}</p>
            {t.desc && <p className="truncate text-xs text-muted-foreground">{t.desc}</p>}
          </div>
          <button
            onClick={() => dismissToast(t.id)}
            className="rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
