'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import type { LiveMapProps } from './live-map'
import { Loader2 } from 'lucide-react'

const LiveMap = dynamic(() => import('./live-map'), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center bg-muted">
      <Loader2 className="size-5 animate-spin text-primary" />
    </div>
  ),
})

export function MapPanel({
  className,
  overlay,
  ...props
}: LiveMapProps & { className?: string; overlay?: React.ReactNode }) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl ring-1 ring-border', className)}>
      <LiveMap {...props} />
      {overlay}
    </div>
  )
}
