import { LandingNav } from '@/components/landing/landing-nav'
import { Hero } from '@/components/landing/hero'
import { FeatureCards } from '@/components/landing/feature-cards'
import { WorkflowBand } from '@/components/landing/workflow-band'
import { CtaBand, SiteFooter } from '@/components/landing/site-footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <Hero />
      <FeatureCards />
      <WorkflowBand />
      <CtaBand />
      <SiteFooter />
    </div>
  )
}
