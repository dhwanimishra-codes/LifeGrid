import { User, Ambulance, Bot, Hospital, HeartPulse, ArrowRight } from 'lucide-react'

const FLOW = [
  { icon: User, label: 'Patient', sub: 'Emergency reported' },
  { icon: Ambulance, label: 'Ambulance', sub: 'Dispatched & tracking' },
  { icon: Bot, label: 'AI', sub: 'Preliminary summary' },
  { icon: Hospital, label: 'Hospital', sub: 'Prepares in advance' },
  { icon: HeartPulse, label: 'Treatment', sub: 'Begins faster' },
]

export function WorkflowBand() {
  return (
    <section id="workflow" className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/40 via-background to-background" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Prepare before arrival
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Care starts before the patient reaches the door
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Patient information, vitals and an AI summary reach the hospital while the ambulance is
            still en route — so the team is ready the moment doors open.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          {FLOW.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3 md:flex-1 md:flex-col">
              <div className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft md:flex-col md:text-center">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="size-6" />
                </span>
                <div className="md:mt-1">
                  <p className="font-display font-semibold">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.sub}</p>
                </div>
              </div>
              {i < FLOW.length - 1 && (
                <ArrowRight className="size-5 shrink-0 rotate-90 text-primary/50 md:rotate-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
