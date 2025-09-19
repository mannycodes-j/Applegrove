'use client'

import type React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
// import { useToast } from '@/hooks/use-toast'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  // const { toast } = useToast()

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
    console.log('Submitting form data:', formData) // 🔍 Debug log
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
      console.error('Error sending form:', error) // 🔍 Debug log
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left side - Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block bg-[#F4AD20] text-black px-4 py-2 rounded-full text-sm font-medium">
                Contact
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Let's get together
              </h2>

              <p className="text-gray-300 text-lg">
                Whether you're building, fundraising or scaling, <br /> we're
                here to help.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2  border-gray-700">
                <span className="text-gray-300">Office</span>
                <span className="text-white">
                  28 Araromi Street, Yaba Lagos.
                </span>
              </div>

              <div className="flex justify-between items-center py-2  border-gray-700">
                <span className="text-gray-300">Email</span>
                <span className="text-white">projects@applegrove.co</span>
              </div>

              <div className="flex justify-between items-center py-2  border-gray-700">
                <span className="text-gray-300">Telephone</span>
                <span className="text-white">+234 906 414 0851</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">Whatsapp</span>
                <span className="text-white">+234 813 959 7690</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <p className="text-gray-300">Follow us at</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-colors"
                >
                  <Instagram size={20} className="text-black" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-orange-500 transition-colors"
                >
                  <Facebook size={20} className="text-black" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-orange-500 transition-colors"
                >
                  <Twitter size={20} className="text-black" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-orange-500 transition-colors"
                >
                  <Linkedin size={20} className="text-black" />
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl ">
            <form
              onSubmit={handleSubmit}
              noValidate
              method="POST"
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-900 font-medium">
                  Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Miller"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="border-gray-200 focus:border-orange-500 focus:ring-orange-500 md:h-[60px] h-[30px] bg-[#CCCCCCCC]/20 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-medium">
                  Email<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johnmiller@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-gray-200 focus:border-orange-500 focus:ring-orange-500 md:h-[60px] h-[30px] bg-[#CCCCCCCC]/20 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-900 font-medium">
                  Phone Number<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+234 705 678 6789"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="border-gray-200 focus:border-orange-500 focus:ring-orange-500 md:h-[60px] h-[30px] bg-[#CCCCCCCC]/20 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-900 font-medium">
                  Message<span className="text-red-500">*</span>
                </Label>
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
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#454545] hover:bg-gray-900 text-white py-6 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
