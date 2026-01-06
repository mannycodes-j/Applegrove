'use client'

import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { TypewriterText } from '@/components/animations/typewriter-text'
import { motion } from 'framer-motion'

export function HeroSection() {
  // WhatsApp message
  const whatsappNumber = '2348139597690'
  const message = encodeURIComponent(
    "Hello, I'd like to learn more about your services at Applegrove Advisory Limited."
  )
  const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 animate-in fade-in duration-1000"
        style={{
          backgroundImage: "url('/assets/images/hero-1.png')",
        }}
      />

      {/* Overlay with blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-slate-900/60 to-slate-900/40" />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 lg:px-12">
        <div className="max-w-2xl">
          {/* Main Heading with Typewriter Animation */}
          <TypewriterText
            text="Build. Fund. Scale"
            className="text-4xl lg:text-7xl font-bold text-white mb-2 leading-tight"
            speed={150}
            delay={3000}
          />

          {/* Subheading */}
          <motion.p
            className="text-[13px] lg:text-xl text-gray-300 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            We build scalable businesses and structure financing for growth.
          </motion.p>

          <motion.p
            className="text-[13px] lg:text-xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.2 }}
          >
            AppleGrove is a venture development and advisory platform supporting
            founders, operators, and institutions with venture building,
            financing strategy, and market expansion across capital‑intensive
            and emerging markets.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.9 }}
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-[#F4AD20] hover:bg-orange-600 text-white px-6 py-8 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                Let's Talk
              </Button>
            </a>
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="text-white bg-white/10 border-none hover:bg-white hover:text-slate-900 px-8 py-8 rounded-full text-lg font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                Explore Services
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-white">
                  <ArrowUpRight className="w-30 h-30 text-slate-900" />
                </div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
