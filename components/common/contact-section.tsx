'use client'

import type React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
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
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const formVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const socialVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'backOut' },
  },
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting form data:', formData)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Message sent successfully!', {
          description: "We'll get back to you as soon as possible.",
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending form:', error)
      toast.error('Error sending message', {
        description: 'Please try again later or contact us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-slate-900 py-16 lg:py-24 px-6">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - Contact Info */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="space-y-6">
              <motion.div
                className="inline-block bg-[#F4AD20] text-black px-4 py-2 rounded-full text-sm font-medium"
                variants={itemVariants}
              >
                Contact
              </motion.div>

              <motion.h2
                className="text-4xl lg:text-5xl font-bold text-white leading-tight"
                variants={itemVariants}
              >
                Let's get together
              </motion.h2>

              <motion.p
                className="text-gray-300 text-lg"
                variants={itemVariants}
              >
                Whether you're building, fundraising or scaling, <br /> we're
                here to help.
              </motion.p>
            </div>

            {/* Contact Details */}
            <motion.div className="space-y-4" variants={itemVariants}>
              {[
                { label: 'Office', value: '28 Araromi Street, Yaba Lagos.' },
                { label: 'Email', value: 'projects@applegrove.co' },
                { label: 'Telephone', value: '+234 906 414 0851' },
                { label: 'Whatsapp', value: '+234 813 959 7690' },
              ].map((contact, index) => (
                <motion.div
                  key={contact.label}
                  className={`flex justify-between items-center py-2 ${
                    index === 3 ? 'border-b border-gray-700' : ''
                  }`}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-gray-300">{contact.label}</span>
                  <span className="text-white">{contact.value}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Media */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <p className="text-gray-300">Follow us at</p>
              <div className="flex space-x-4">
                {[
                  { Icon: Instagram, href: '#' },
                  { Icon: Facebook, href: '#' },
                  { Icon: Twitter, href: '#' },
                  { Icon: Linkedin, href: '#' },
                ].map(({ Icon, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-colors"
                    variants={socialVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} className="text-black" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-xl"
            variants={formVariants}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              method="POST"
              className="space-y-6"
            >
              {[
                {
                  id: 'name',
                  label: 'Name',
                  type: 'text',
                  placeholder: 'John Miller',
                },
                {
                  id: 'email',
                  label: 'Email',
                  type: 'email',
                  placeholder: 'johnmiller@email.com',
                },
                {
                  id: 'phone',
                  label: 'Phone Number',
                  type: 'tel',
                  placeholder: '+234 705 678 6789',
                },
              ].map((field) => (
                <motion.div
                  key={field.id}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Label
                    htmlFor={field.id}
                    className="text-gray-900 font-medium"
                  >
                    {field.label}
                    <span className="text-red-500">*</span>
                  </Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:border-orange-500 focus:ring-orange-500 md:h-[60px] h-[30px] bg-[#CCCCCCCC]/20 text-gray-900 placeholder:text-gray-500"
                    />
                  </motion.div>
                </motion.div>
              ))}

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Label htmlFor="message" className="text-gray-900 font-medium">
                  Message<span className="text-red-500">*</span>
                </Label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Hello, I'd like to inquire about"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="border-gray-200 focus:border-orange-500 focus:ring-orange-500 resize-none md:h-[120px] h-[60px] bg-[#CCCCCCCC]/20 text-gray-900 placeholder:text-gray-500"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#454545] hover:bg-gray-900 text-white py-6 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
