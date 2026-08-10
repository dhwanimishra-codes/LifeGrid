'use client'

import { Modal } from '@/components/modal'
import { Pill, Meter } from '@/components/kit'
import { Button } from '@/components/ui/button'
import { useSystem } from '@/components/system-provider'
import {
  statusColor,
  priorityColor,
  hospitals,
  patients,
  type Ambulance,
} from '@/lib/mock-data'
import {
  Navigation,
  Phone,
  User,
  MapPin,
  Fuel,
  ShieldPlus,
  Send,
  Square,
  Wrench,
} from 'lucide-react'

export function AmbulanceDetail({
  amb,
  onOpenChange,
}: {
  amb: Ambulance | null
  onOpenChange: (v: boolean) => void
}) {
  const { dispatchAmbulance, setAmbulanceStatus } = useSystem()
  if (!amb) return null

  const hospital = hospitals.find((h) => h.id === amb.destinationHospitalId)
  const patient = patients.find((p) => p.id === amb.patientId)

  return (
    <Modal open={!!amb} onOpenChange={onOpenChange} labelledBy="amb-title">
      <div className="p-5">
        <div className="flex items-center gap-3 pr-8">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-navy text-primary-foreground">
            <Navigation className="size-6" />
          </span>
          <div>
            <h2 id="amb-title" className="font-display text-lg font-semibold">
              {amb.id} · {amb.callSign}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <Pill tone={statusColor(amb.status) as never} dot>
                {amb.status}
              </Pill>
              <span className="text-xs text-muted-foreground">{amb.type}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Field icon={User} label="Driver" value={amb.driver} sub={amb.driverPhone} />
          <Field icon={ShieldPlus} label="Paramedic" value={amb.paramedic} />
          <Field icon={MapPin} label="Current Location" value={amb.area} sub={`${amb.speedKmh} km/h`} />
          <Field
            icon={Navigation}
            label="Destination"
            value={hospital ? hospital.name : 'Not assigned'}
            sub={amb.eta != null ? `ETA ${amb.eta} min` : undefined}
          />
        </div>

        {patient && (
          <div className="mt-3 rounded-2xl border border-border/70 bg-muted/30 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Onboard Patient
              </p>
              {amb.priority && (
                <Pill tone={priorityColor(amb.priority) as never}>{amb.priority}</Pill>
              )}
            </div>
            <p className="mt-1 font-semibold">{patient.name}</p>
            <p className="text-xs text-muted-foreground">
              {patient.age} yrs · {patient.gender} · {patient.emergencyType}
            </p>
          </div>
        )}

        <div className="mt-3 rounded-2xl border border-border/70 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Fuel className="size-3.5" /> Fuel Level
            </p>
            <span className="font-mono text-sm font-semibold">{amb.fuelPct}%</span>
          </div>
          <Meter value={amb.fuelPct} tone={amb.fuelPct < 30 ? 'critical' : amb.fuelPct < 60 ? 'warning' : 'success'} />
        </div>

        <div className="mt-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Medical Equipment
          </p>
          <div className="flex flex-wrap gap-1.5">
            {amb.equipment.map((e) => (
              <span key={e} className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/15">
                {e}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {amb.status === 'Available' ? (
            <Button
              className="flex-1"
              onClick={() => {
                dispatchAmbulance(amb.id)
                onOpenChange(false)
              }}
            >
              <Send className="size-4" />
              Dispatch Ambulance
            </Button>
          ) : amb.status === 'Offline' ? (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setAmbulanceStatus(amb.id, 'Available')
                onOpenChange(false)
              }}
            >
              <Wrench className="size-4" />
              Return to Service
            </Button>
          ) : (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setAmbulanceStatus(amb.id, 'Available')
                onOpenChange(false)
              }}
            >
              <Square className="size-4" />
              Mark Available
            </Button>
          )}
          <Button
            variant="secondary"
            className="flex-1"
            nativeButton={false}
            render={<a href={`tel:${amb.driverPhone.replace(/\s/g, '')}`} />}
          >
            <Phone className="size-4" />
            Call Driver
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function Field({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="rounded-2xl border border-border/70 p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
      {sub && <p className="truncate text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}
