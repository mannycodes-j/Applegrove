'use client'

import { Marquee } from '@/components/animations/marquee'
import { WHO_WE_WORK_WITH_DATA } from '@/lib/constants/who-we-work-with'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
}

const marqueeVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.6,
    },
  },
}

export function WhoWeWorkWithSection() {
  return (
    <section className="bg-slate-900 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="inline-block bg-[#F4AD20] text-white px-6 py-2 rounded-full text-sm font-medium mb-6"
            variants={itemVariants}
          >
            Our Services
          </motion.div>
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-white mb-8"
            variants={itemVariants}
          >
            Who We Work With
          </motion.h2>

          {/* Category Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            variants={containerVariants}
          >
            {WHO_WE_WORK_WITH_DATA.categories.map((category, index) => (
              <motion.button
                key={category}
                className="px-6 py-2 border border-[#F4AD20]/50 text-white rounded-[10px] text-sm font-medium transition-colors"
                variants={pillVariants}
                whileHover="hover"
                whileTap="tap"
                custom={index}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Marquee Images */}
        <motion.div
          variants={marqueeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Marquee className="py-8" speed="normal" pauseOnHover>
            <div className="flex gap-6 mr-6">
              {WHO_WE_WORK_WITH_DATA.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative flex-shrink-0"
                  style={{ width: '403px', height: '576px' }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Image
                    src={image.src || '/placeholder.svg'}
                    alt={image.alt}
                    fill
                    className="object-cover shadow-lg"
                    style={{ borderRadius: '20px', opacity: 1 }}
                  />
                </motion.div>
              ))}
            </div>
          </Marquee>
        </motion.div>
      </div>
    </section>
  )
}
