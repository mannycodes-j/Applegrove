'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { SELECTED_WORK } from '@/lib/constants/selected-work'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const cardHoverVariants: Variants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

const imageVariants: Variants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export function SelectedWorkSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#F4AD20] text-black text-sm font-medium rounded-full mb-6"
            variants={headerVariants}
          >
            Selected Work
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 text-balance"
            variants={headerVariants}
          >
            Our top project highlights
          </motion.h2>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {SELECTED_WORK.projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-[#151D3B0D] rounded-2xl p-6 md:w-[550px] w-full shadow-lg"
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <motion.div variants={cardHoverVariants}>
                {/* Project Image */}
                <div className="mb-6 rounded-xl overflow-hidden bg-white">
                  <motion.div variants={imageVariants}>
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      width={300}
                      height={340}
                      className="w-full h-56 object-cover"
                    />
                  </motion.div>
                </div>

                {/* Project Content */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
