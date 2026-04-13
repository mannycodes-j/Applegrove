"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  HandCoins,
  ShieldCheck,
  Clock3,
  BadgeCheck,
} from "lucide-react"
import FinancingApplicationForm from "./financing-application-form"

const benefits = [
  {
    icon: HandCoins,
    title: "Flexible Financing",
    description:
      "Competitive rates tailored to your income, with repayment plans up to 20 years.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    description:
      "NDPA-compliant KYC with bank-grade protection for your personal data.",
  },
  {
    icon: Clock3,
    title: "Fast Turnaround",
    description:
      "Formal response within 2 business days of receiving your application.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Partners",
    description:
      "Backed by leading Nigerian banks and licensed mortgage institutions.",
  },
]

export default function WorkCTASection() {
  const [showForm, setShowForm] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [showForm])

  return (
    <section
      id="apply-for-financing"
      className="py-20 px-4 bg-gradient-to-r from-slate-900 to-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        {!showForm ? (
          <>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="inline-block bg-[#F4AD20]/15 text-[#F4AD20] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-5">
                Apply for Financing
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
                Own Your Next Property With Apple Grove
              </h2>
              <p className="text-lg md:text-xl text-gray-300">
                Start a secure 9-step financing application and get matched
                with the right loan for your next home, land or commercial
                property.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F4AD20]/15 flex items-center justify-center mb-4">
                    <b.icon className="w-5 h-5 text-[#F4AD20]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Ready when you are.
                </h3>
                <p className="text-gray-300">
                  Takes about 8–10 minutes. Have your NIN, BVN and a valid ID
                  ready.
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => setShowForm(true)}
                className="bg-[#F4AD20] hover:bg-orange-600 text-white px-8 py-6 rounded-full text-base font-semibold hover:scale-105 transition-all duration-200 flex items-center gap-2 shrink-0"
              >
                Start Application
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </div>
          </>
        ) : (
          <div ref={formRef} className="scroll-mt-24">
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Financing Application
              </h2>
              <p className="text-gray-300">
                Your details are submitted directly to{" "}
                <span className="font-semibold text-white">
                  projects@applegrove.co
                </span>{" "}
                over a secure connection.
              </p>
            </div>
            <FinancingApplicationForm onClose={() => setShowForm(false)} />
          </div>
        )}
      </div>
    </section>
  )
}
