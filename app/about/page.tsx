import { AboutHeroSection } from "@/components/pages/about-us/about-hero-section"
import { OurStorySection } from "@/components/pages/about-us/our-story-section"
import { StrategicExpertsSection } from "@/components/pages/about-us/strategic-experts-section"
import { ValuesSection } from "@/components/pages/about-us/values-section"
import { TeamSection } from "@/components/pages/about-us/team-section"
import { ContactSection } from "@/components/common/contact-section"
import { Footer } from "@/components/layout/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHeroSection />
      <OurStorySection />
      <StrategicExpertsSection />
      <ValuesSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
