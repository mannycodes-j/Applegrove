'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: 'easeOut' },
  },
}

const badgeVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function AboutSection() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Section - Text Content */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Badge */}
          <motion.div className="inline-flex" variants={badgeVariants}>
            <span className="bg-[#F4AD20] text-white px-4 py-2 rounded-full text-sm font-medium">
              About Us
            </span>
          </motion.div>

          {/* Two Column Text Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Main Heading */}
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Strategic
                <br />
                Advisory Experts
              </h2>
            </motion.div>

            {/* Right - Description */}
            <motion.div variants={itemVariants}>
              <p className="text-lg text-gray-600 leading-relaxed">
                AppleGrove Advisory helps businesses build, fund, and scale. We
                work with founders, capital providers, and institutions to turn
                ideas into successful ventures. Our approach blends
                venture-building expertise with transaction depth, delivering
                real results across sectors and markets.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section - Full Width Image */}
        <motion.div
          className="relative"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/assets/images/about-us.png"
              alt="Strategic advisory meeting with diverse team of professionals"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
