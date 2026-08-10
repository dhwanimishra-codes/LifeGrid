import { PageHeader } from '@/components/dashboard/page-header'
import { StatCards } from '@/components/dashboard/stat-cards'
import { CommandMap } from '@/components/dashboard/command-map'
import { CasePanel } from '@/components/dashboard/case-panel'
import { WorkflowStrip } from '@/components/dashboard/workflow-strip'
import { RequirementsCard } from '@/components/dashboard/requirements-card'
import { Pill } from '@/components/kit'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        eyebrow="Command Center"
        title="Emergency Operations"
        description="Real-time coordination across ambulances, patients, doctors and hospitals."
        actions={
          <Pill tone="success" dot pulse>
            System Online
          </Pill>
        }
      />

      <StatCards />

      {/* Map + Case panel */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="flex flex-col gap-5">
          <CommandMap />
          <WorkflowStrip />
        </div>
        <CasePanel />
      </div>

      <RequirementsCard />
    </div>
  )
}
