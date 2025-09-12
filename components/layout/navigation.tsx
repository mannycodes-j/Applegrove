'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  // WhatsApp message
  const whatsappNumber = '2348139597690' 
  const message = encodeURIComponent(
    'Hello, I’d like to learn more about your services at Applegrove Advisory Limited.'
  )
  const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`


  return (
    <nav className="absolute top-0 left-0 right-0 z-[9999] flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="Applegrove Advisory Limited"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="/about"
          className="text-white hover:text-gray-300 transition-colors"
        >
          About Us
        </Link>
        <Link
          href="/services"
          className="text-white hover:text-gray-300 transition-colors"
        >
          Services
        </Link>
        <Link
          href="/work"
          className="text-white hover:text-gray-300 transition-colors"
        >
          Our Work
        </Link>
        <Link
          href="/contact"
          className="text-white hover:text-gray-300 transition-colors"
        >
          Contact Us
        </Link>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#F4AD20] hover:bg-orange-600 text-white px-6 py-2 rounded-full cursor-pointer">
            Let&apos;s Talk
          </Button>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            // Close icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </Button>
      </div>

      {/* Mobile Slide-in Menu + Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black md:hidden z-[9998]"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-3/4 bg-[#151D3BCC] text-center items-center shadow-lg flex flex-col space-y-6 px-6 py-16 md:hidden z-[99999]"
            >
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300"
              >
                About Us
              </Link>
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300"
              >
                Services
              </Link>
              <Link
                href="/work"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300"
              >
                Our Work
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300"
              >
                Contact Us
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                <Button className="bg-[#F4AD20] hover:bg-orange-600 text-white px-6 py-2 rounded-full">
                  Let&apos;s Talk
                </Button>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
