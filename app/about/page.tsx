'use client'

import { AboutHeroSection } from '@/components/pages/about-us/about-hero-section'
import { OurStorySection } from '@/components/pages/about-us/our-story-section'
import { StrategicExpertsSection } from '@/components/pages/about-us/strategic-experts-section'
import { ValuesSection } from '@/components/pages/about-us/values-section'
import { TeamSection } from '@/components/pages/about-us/team-section'
import { ContactSection } from '@/components/common/contact-section'
import { Footer } from '@/components/layout/footer'
import { useAuthStore } from '@/lib/store/auth'
import PageLoader from '@/components/common/page-loader'
import { useState, useEffect } from 'react'

export default function AboutPage() {
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
      <div className="min-h-screen">
        <AboutHeroSection />
        <OurStorySection />
        <StrategicExpertsSection />
        <ValuesSection />
        <TeamSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  )
}
