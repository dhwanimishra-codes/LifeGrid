'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Pill } from '@/components/kit'
import { VitalsGrid } from '@/components/dashboard/vitals'
import { TrendChart } from './trend-chart'
import { AiPanel } from '@/components/dashboard/ai-panel'
import { WorkflowStrip } from '@/components/dashboard/workflow-strip'
import {
  priorityColor,
  hospitals,
  postTreatment,
  type Patient,
} from '@/lib/mock-data'
import {
  User,
  Droplet,
  Phone,
  TriangleAlert,
  HeartPulse,
  Pill as PillIcon,
  ClipboardList,
  Activity,
  Sparkles,
  Stethoscope,
} from 'lucide-react'

const TABS = [
  'Overview',
  'Vitals',
  'Medical History',
  'Medications',
  'AI Summary',
  'Treatment',
  'Timeline',
] as const
type Tab = (typeof TABS)[number]

export function PatientProfile({ patient }: { patient: Patient }) {
  const [tab, setTab] = useState<Tab>('Overview')
  const hospital = hospitals.find((h) => h.id === patient.hospitalId)

  return (
    <div className="rounded-3xl border border-border/70 bg-card shadow-card">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-border/70 p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-navy text-primary-foreground">
            <User className="size-7" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-semibold">{patient.name}</h2>
              <Pill tone={priorityColor(patient.priority) as never} dot pulse={patient.priority === 'Critical'}>
                {patient.priority}
              </Pill>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Case #{patient.caseId} · {patient.age} yrs · {patient.gender} · Reported {patient.reportedAt}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          <Info icon={Droplet} label="Blood" value={patient.bloodGroup} />
          <Info icon={TriangleAlert} label="Emergency" value={patient.emergencyType} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border/70 px-3">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'relative whitespace-nowrap px-3.5 py-3 text-sm font-medium transition-colors',
              tab === t ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t}
            {tab === t && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5">
        {tab === 'Overview' && (
          <div className="flex flex-col gap-5">
            <VitalsGrid vitals={patient.vitals} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MiniList icon={TriangleAlert} title="Allergies" items={patient.allergies} tone="critical" />
              <MiniList icon={HeartPulse} title="Conditions" items={patient.conditions} />
              <MiniList icon={PillIcon} title="Medications" items={patient.medications} />
              <div className="rounded-2xl border border-border/70 p-3.5">
                <div className="mb-2 flex items-center gap-1.5 text-muted-foreground">
                  <Phone className="size-3.5 text-primary" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide">Emergency Contact</span>
                </div>
                <p className="text-sm font-semibold">{patient.emergencyContact.name}</p>
                <p className="text-xs text-muted-foreground">{patient.emergencyContact.relation}</p>
                <p className="mt-1 font-mono text-xs text-primary">{patient.emergencyContact.phone}</p>
              </div>
            </div>
            {hospital && (
              <div className="rounded-2xl bg-muted/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Transport Destination
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="font-semibold">{hospital.name}</p>
                  <span className="font-mono text-sm text-primary">ETA {hospital.eta} min</span>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'Vitals' && (
          <div className="flex flex-col gap-5">
            <VitalsGrid vitals={patient.vitals} />
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Activity className="size-4 text-primary" /> Vitals Trend (last 10 minutes)
              </h4>
              <TrendChart
                labels={patient.vitalsTrend.map((v) => v.t)}
                series={[
                  { key: 'hr', label: 'Heart Rate', unit: 'BPM', color: '#e2483a', values: patient.vitalsTrend.map((v) => v.hr) },
                  { key: 'spo2', label: 'SpO₂', unit: '%', color: '#2f5fd6', values: patient.vitalsTrend.map((v) => v.spo2) },
                  { key: 'bp', label: 'BP (Sys)', unit: 'mmHg', color: '#e08a2b', values: patient.vitalsTrend.map((v) => v.bp) },
                ]}
              />
            </div>
          </div>
        )}

        {tab === 'Medical History' && (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniList icon={TriangleAlert} title="Allergies" items={patient.allergies} tone="critical" />
            <MiniList icon={HeartPulse} title="Existing Conditions" items={patient.conditions} />
            <MiniList icon={ClipboardList} title="Notes" items={['No prior surgeries recorded', 'Last visit: 3 months ago']} />
          </div>
        )}

        {tab === 'Medications' && (
          <div className="flex flex-col gap-2">
            {patient.medications.length === 0 || patient.medications[0] === 'None' ? (
              <p className="text-sm text-muted-foreground">No current medications on record.</p>
            ) : (
              patient.medications.map((m) => (
                <div key={m} className="flex items-center gap-3 rounded-2xl border border-border/70 p-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <PillIcon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{m}</p>
                    <p className="text-xs text-muted-foreground">Ongoing · patient-reported</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'AI Summary' && <AiPanel inDialog />}

        {tab === 'Treatment' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-2xl bg-warning/10 px-3 py-2 text-xs font-medium text-warning-foreground ring-1 ring-inset ring-warning/20">
              <Stethoscope className="size-4" />
              Treatment recorded post-arrival. Preview shown from care plan.
            </div>
            <TreatmentRow label="Diagnosis" value={postTreatment.diagnosis} />
            <TreatmentRow label="Treatment Provided" value={postTreatment.treatment} />
            <div className="grid gap-3 sm:grid-cols-2">
              <MiniList icon={PillIcon} title="Medicines Administered" items={postTreatment.medicines} />
              <MiniList icon={ClipboardList} title="Procedures Performed" items={postTreatment.procedures} />
            </div>
          </div>
        )}

        {tab === 'Timeline' && <WorkflowStrip />}
      </div>
    </div>
  )
}

function Info({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 px-3 py-2">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5 text-primary" />
        <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  )
}

function MiniList({
  icon: Icon,
  title,
  items,
  tone = 'primary',
}: {
  icon: React.ElementType
  title: string
  items: string[]
  tone?: 'primary' | 'critical'
}) {
  return (
    <div className="rounded-2xl border border-border/70 p-3.5">
      <div className="mb-2 flex items-center gap-1.5 text-muted-foreground">
        <Icon className={cn('size-3.5', tone === 'critical' ? 'text-destructive' : 'text-primary')} />
        <span className="text-[10px] font-semibold uppercase tracking-wide">{title}</span>
      </div>
      <ul className="flex flex-col gap-1">
        {items.map((it) => (
          <li key={it} className="text-sm text-foreground/90">
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TreatmentRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-foreground/90">{value}</p>
    </div>
  )
}
