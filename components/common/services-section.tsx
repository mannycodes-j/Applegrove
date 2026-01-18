'use client'

import { Lightbulb, Database, Earth } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

const services = [
  {
    id: 1,
    icon: Lightbulb,
    title: 'Venture Development',
    description:
      'We co-build and support businesses from idea to scale, providing strategic guidance and operational support.',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    id: 2,
    icon: Database,
    title: 'Capital & Investment Advisory',
    description:
      'We make companies investable, helping ventures raise smart capital with clarity and confidence.',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    id: 3,
    icon: Earth,
    title: 'Strategic Expansion & Transaction Advisory',
    description:
      'We guide companies through complex growth opportunities including market entry, partnerships, and transactions.',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
]

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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
}

export function ServicesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Badge */}
        <div className="flex justify-center mb-6">
          <motion.span
            className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium text-white bg-[#F4AD20]"
            variants={badgeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            Our Services
          </motion.span>
        </div>

        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          What We Do
        </motion.h2>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.id}
                className={`p-8 rounded-2xl ${service.bgColor} cursor-pointer`}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`w-12 h-12 ${service.iconColor} mb-6`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <IconComponent size={48} />
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold text-gray-900 mb-4 leading-tight"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
