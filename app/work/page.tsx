import Navigation from "@/components/layout/navigation"
import WorkHeroSection from "@/components/pages/work/work-hero-section"
import ProjectHighlightsSection from "@/components/pages/work/project-highlights-section"
import { ContactSection } from '@/components/common/contact-section'
import { Footer } from '@/components/layout/footer'
import WorkCTASection from "@/components/pages/work/work-cta-section"

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <WorkHeroSection />
      <ProjectHighlightsSection />
      <WorkCTASection/>
      <ContactSection />
      <Footer />
    </div>
  )
}
