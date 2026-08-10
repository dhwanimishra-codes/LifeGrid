import type { ReactNode } from 'react'
import { SystemProvider } from '@/components/system-provider'
import { TopNav } from '@/components/dashboard/top-nav'
import { ToastViewport } from '@/components/kit'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SystemProvider>
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">{children}</main>
        <ToastViewport />
      </div>
    </SystemProvider>
  )
}
