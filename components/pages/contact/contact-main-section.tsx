"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactMainSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Contact Info */}
          <div className="text-white">
            <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Contact
            </div>

            <h2 className="text-4xl font-bold mb-6">Let's get together</h2>

            <p className="text-gray-300 text-lg mb-12">
              Whether you're building, fundraising or scaling, we're here to help.
            </p>

            {/* Contact Details */}
            <div className="space-y-8 mb-12">
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <span className="text-gray-300">Office</span>
                <span className="text-white">28 Araromi Street, Yaba Lagos.</span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <span className="text-gray-300">Email</span>
                <span className="text-white">projects@applegrove.co</span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <span className="text-gray-300">Telephone</span>
                <span className="text-white">+234 906 414 0851</span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <span className="text-gray-300">Whatsapp</span>
                <span className="text-white">+234 813 959 7690</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-gray-300 mb-4">Follow us at</p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">IG</span>
                </div>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">FB</span>
                </div>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">TW</span>
                </div>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">LI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Name<span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Miller"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email<span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johnmiller@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+234 705 678 6789"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message<span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Hello, I'd like to inquire about..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-medium"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
