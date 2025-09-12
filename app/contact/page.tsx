import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactHeroSection } from "@/components/pages/contact/contact-hero-section"
import { ContactMainSection } from "@/components/pages/contact/contact-main-section"
import { Navigation } from "@/components/layout/navigation"
import { ContactSection } from "@/components/common/contact-section"  

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
        <div className="relative z-50">
              <Navigation />
            </div>
      <ContactHeroSection />
      {/* <ContactMainSection /> */}
         <ContactSection />
      <Footer />
    </div>
  )
}
