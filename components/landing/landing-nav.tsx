import { BrandMark } from '@/components/dashboard/top-nav'
import { ButtonLink } from '@/components/kit'
import { ArrowRight } from 'lucide-react'

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        <BrandMark />
        <nav className="ml-10 hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#workflow" className="transition-colors hover:text-foreground">
            How It Works
          </a>
          <a href="#network" className="transition-colors hover:text-foreground">
            Network
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ButtonLink href="/dashboard" size="lg" className="h-10 px-4">
            Launch Dashboard
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
