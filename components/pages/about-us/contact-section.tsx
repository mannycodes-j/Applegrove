"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactSection() {
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
    <section className="bg-[#1e2a4a] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Contact
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">Let's get together</h2>
              <p className="text-gray-300 text-lg">
                Whether you're building, fundraising or scaling, we're here to help.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Office</span>
                <span className="text-white">28 Araromi Street, Yaba Lagos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Email</span>
                <span className="text-white">projects@applegrove.co</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Telephone</span>
                <span className="text-white">+234 906 414 0851</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">WhatsApp</span>
                <span className="text-white">+234 813 959 7690</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <p className="text-gray-300">Follow us at</p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#1e2a4a] text-sm font-bold">in</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#1e2a4a] text-sm font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#1e2a4a] text-sm font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#1e2a4a] text-sm font-bold">ig</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Phone Number<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+234 705 678 9123"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Message<span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Hello, I'd like to inquire about..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="border-gray-200 focus:border-orange-500 focus:ring-orange-500 resize-none"
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

export default ContactSection
