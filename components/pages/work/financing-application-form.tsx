"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, X, AlertCircle } from "lucide-react"

interface FormState {
  full_name: string
  email: string
  phone: string
  address: string
}

const initialState: FormState = {
  full_name: "",
  email: "",
  phone: "",
  address: "",
}

export default function FinancingApplicationForm({
  onClose,
}: {
  onClose?: () => void
}) {
  const [data, setData] = useState<FormState>(initialState)
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const update = (key: keyof FormState, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }))
    if (errorMsg) setErrorMsg(null)
  }

  const validate = (): string | null => {
    if (!data.full_name.trim()) return "Full name is required."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      return "Enter a valid email address."
    if (!data.phone.trim()) return "Phone number is required."
    if (!data.address.trim()) return "Address is required."
    return null
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const msg = validate()
    if (msg) {
      setErrorMsg(msg)
      return
    }
    setStatus("submitting")
    setErrorMsg(null)
    try {
      const res = await fetch("/api/financing-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || "Submission failed. Please try again.")
      }
      setStatus("success")
    } catch (e) {
      setErrorMsg(
        e instanceof Error ? e.message : "Something went wrong. Try again.",
      )
      setStatus("idle")
    }
  }

  if (status === "submitting") {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="py-20 flex flex-col items-center text-center px-6">
          <Loader2 className="w-14 h-14 text-[#F4AD20] animate-spin mb-6" />
          <h4 className="text-xl font-semibold text-slate-900 mb-2">
            Sending your enquiry...
          </h4>
          <p className="text-slate-600 max-w-md">
            Please stay on this page while we securely transmit your details.
          </p>
        </div>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="py-16 flex flex-col items-center text-center px-6">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-3">
            Enquiry Received
          </h4>
          <p className="text-slate-600 max-w-lg mb-8">
            Thank you. Your financing enquiry has been sent to our team. A
            confirmation has been sent to{" "}
            <span className="font-semibold text-slate-900">{data.email}</span>.
            We typically respond within 2 business days.
          </p>
          {onClose && (
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-full px-6"
            >
              Close
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 md:px-10 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[#F4AD20] text-sm font-semibold tracking-wider uppercase mb-2">
              Financing Enquiry
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Tell us about yourself
            </h3>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      <form onSubmit={submit} className="px-6 md:px-10 py-8 md:py-10 space-y-5">
        {errorMsg && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-900">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={data.full_name}
              onChange={(e) => update("full_name", e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-900">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="jane@email.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-900">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+234 801 234 5678"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-900">
            Address <span className="text-red-500">*</span>
          </Label>
          <Textarea
            rows={3}
            value={data.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Street, City, State"
            className="resize-none"
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-4 border-t border-slate-200">
          {onClose && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full px-6"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            className="rounded-full px-8 bg-[#F4AD20] hover:bg-orange-600 text-white"
          >
            Submit Enquiry
          </Button>
        </div>
      </form>
    </div>
  )
}
