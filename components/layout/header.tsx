import { Navigation } from "./navigation"
import { HeroSection } from "./hero-section"

export function Header() {
  return (
    <header className="relative">
      <Navigation />
      <HeroSection />
    </header>
  )
}
