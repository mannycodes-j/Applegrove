import Navigation from "@/components/layout/navigation"
import ServicesHeroSection from "@/components/pages/services/services-hero-section"
import ServicesContentSection from "@/components/pages/services/services-content-section"
import SectorsSection from "@/components/pages/services/sectors-section"
import { ContactSection } from '@/components/common/contact-section'
import { Footer } from "@/components/layout/footer"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ServicesHeroSection />
      <ServicesContentSection />
      <SectorsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
