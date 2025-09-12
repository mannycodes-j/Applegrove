'use client'

import { Header } from '@/components/layout/header'
import PageLoader from '@/components/common/page-loader'
import { ServicesSection } from '@/components/common/services-section'
import { WhoWeWorkWithSection } from '@/components/common/who-we-work-with-section'
import { SelectedWorkSection } from '@/components/common/selected-work-section'
import { AboutSection } from '@/components/common/about-section'
import { ContactSection } from '@/components/common/contact-section'
import { Footer } from '@/components/layout/footer'
import { useAuthStore } from '@/lib/store/auth'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  const { showLoader } = useAuthStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Show loader for 2.5 seconds

    return () => clearTimeout(timer)
  }, [])
  return (
    <>
      <PageLoader isVisible={showLoader || isLoading} isLoading={isLoading} />
      <main>
        <Header />
        <ServicesSection />
        <WhoWeWorkWithSection />
        <SelectedWorkSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
