import { Ambulance, MapPin, Bot, Hospital } from 'lucide-react'

const FEATURES = [
  {
    icon: Ambulance,
    title: 'Smart Ambulance',
    desc: 'Every unit streams live location, patient vitals, equipment status and priority to the network.',
    tone: 'text-destructive bg-destructive/10',
  },
  {
    icon: MapPin,
    title: 'Live Tracking',
    desc: 'Real-time GPS, traffic-aware routing and accurate ETAs to the best-prepared hospital.',
    tone: 'text-primary bg-primary/10',
  },
  {
    icon: Bot,
    title: 'AI Doctor Assistance',
    desc: 'Clinical decision support that summarizes cases and flags critical risks — doctors decide.',
    tone: 'text-navy bg-navy/10',
  },
  {
    icon: Hospital,
    title: 'Hospital Readiness',
    desc: 'Beds, ICU, oxygen and blood are arranged before the ambulance arrives at the door.',
    tone: 'text-success bg-success/10',
  },
]

export function FeatureCards() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          One connected emergency network
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          Four systems working as one — so critical minutes are never lost to coordination.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-float"
          >
            <span className={`grid size-12 place-items-center rounded-2xl ${f.tone}`}>
              <f.icon className="size-6" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
