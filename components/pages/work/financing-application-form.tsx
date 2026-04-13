"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Upload,
  FileText,
  X,
  AlertCircle,
} from "lucide-react"

type EmploymentStatus =
  | "employed"
  | "self_employed"
  | "retired"
  | "student"
  | "unemployed"
type PropertyType = "apartment" | "house" | "land" | "commercial" | "townhouse"
type YesNo = "yes" | "no"

interface FormState {
  // Step 1 - Personal
  full_name: string
  email: string
  phone: string
  date_of_birth: string
  nin: string
  bvn: string
  address: string
  // Step 2 - Employment
  employment_status: EmploymentStatus | ""
  employer_name: string
  occupation: string
  years_employed: string
  monthly_income: string
  // Step 3 - Financial
  annual_income: string
  monthly_expenses: string
  existing_debts: string
  savings_account_balance: string
  bank_statement: File | null
  // Step 4 - Property
  found_property: YesNo | ""
  target_property_price: string
  preferred_location: string
  property_type: PropertyType | ""
  desired_loan_amount: string
  max_monthly_payment: string
  preferred_repayment_period: string
  own_existing_property: YesNo | ""
  // Step 5 - Documents
  id_document: File | null
  proof_of_address: File | null
  employment_letter: File | null
  // Step 6 - Consent
  consent_given: boolean
  data_privacy_accepted: boolean
  declaration_accepted: boolean
}

const initialState: FormState = {
  full_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  nin: "",
  bvn: "",
  address: "",
  employment_status: "",
  employer_name: "",
  occupation: "",
  years_employed: "",
  monthly_income: "",
  annual_income: "",
  monthly_expenses: "",
  existing_debts: "",
  savings_account_balance: "",
  bank_statement: null,
  found_property: "",
  target_property_price: "",
  preferred_location: "",
  property_type: "",
  desired_loan_amount: "",
  max_monthly_payment: "",
  preferred_repayment_period: "",
  own_existing_property: "",
  id_document: null,
  proof_of_address: null,
  employment_letter: null,
  consent_given: false,
  data_privacy_accepted: false,
  declaration_accepted: false,
}

const stepTitles = [
  "Personal Information",
  "Employment Details",
  "Financial Profile",
  "Property & Financing Intent",
  "Supporting Documents",
  "Consent & Declaration",
  "Review Your Application",
  "Submitting",
  "Application Received",
]

const employmentOptions: { value: EmploymentStatus; label: string }[] = [
  { value: "employed", label: "Employed" },
  { value: "self_employed", label: "Self-Employed" },
  { value: "retired", label: "Retired" },
  { value: "student", label: "Student" },
  { value: "unemployed", label: "Unemployed" },
]

const propertyOptions: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
  { value: "townhouse", label: "Townhouse" },
]

const digitsOnly = (v: string) => v.replace(/\D/g, "")
const formatCurrency = (v: string) => {
  const d = digitsOnly(v)
  if (!d) return ""
  return Number(d).toLocaleString("en-US")
}
const displayCurrency = (v: string) =>
  v ? `₦${Number(digitsOnly(v)).toLocaleString("en-US")}` : "—"

const MAX_FILE_MB = 5

export default function FinancingApplicationForm({
  onClose,
}: {
  onClose?: () => void
}) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormState>(initialState)
  const [error, setError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
    if (error) setError(null)
  }

  const handleFile = (key: keyof FormState, file: File | null) => {
    if (file && file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`File too large. Max ${MAX_FILE_MB}MB.`)
      return
    }
    update(key, file as never)
  }

  const validateStep = (): string | null => {
    switch (step) {
      case 1: {
        if (!data.full_name.trim()) return "Full name is required."
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
          return "Enter a valid email address."
        if (!data.phone.trim()) return "Phone number is required."
        if (!data.date_of_birth) return "Date of birth is required."
        if (data.nin.length !== 11) return "NIN must be exactly 11 digits."
        if (data.bvn.length !== 11) return "BVN must be exactly 11 digits."
        if (!data.address.trim()) return "Residential address is required."
        return null
      }
      case 2: {
        if (!data.employment_status) return "Select your employment status."
        if (!data.occupation.trim()) return "Occupation is required."
        if (!data.monthly_income) return "Monthly income is required."
        return null
      }
      case 3: {
        if (!data.annual_income) return "Annual income is required."
        if (!data.monthly_expenses) return "Monthly expenses are required."
        return null
      }
      case 4: {
        if (!data.found_property) return "Tell us if you've found a property."
        if (!data.property_type) return "Select a property type."
        if (!data.desired_loan_amount) return "Desired loan amount is required."
        if (!data.max_monthly_payment) return "Max monthly payment is required."
        if (!data.preferred_repayment_period)
          return "Preferred repayment period is required."
        if (!data.own_existing_property)
          return "Tell us if you own existing property."
        return null
      }
      case 5: {
        if (!data.id_document) return "Upload a valid ID document."
        if (!data.proof_of_address) return "Upload a proof of address."
        return null
      }
      case 6: {
        if (!data.consent_given) return "You must provide consent to continue."
        if (!data.data_privacy_accepted)
          return "Accept the data privacy policy."
        if (!data.declaration_accepted)
          return "Confirm the declaration to continue."
        return null
      }
      default:
        return null
    }
  }

  const next = () => {
    const msg = validateStep()
    if (msg) {
      setError(msg)
      return
    }
    setError(null)
    setStep((s) => Math.min(s + 1, 9))
  }

  const back = () => {
    setError(null)
    setStep((s) => Math.max(s - 1, 1))
  }

  const submit = async () => {
    setStep(8)
    setSubmitError(null)
    try {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        if (v instanceof File) fd.append(k, v, v.name)
        else if (typeof v === "boolean") fd.append(k, v ? "true" : "false")
        else fd.append(k, v ?? "")
      })

      const res = await fetch("/api/financing-application", {
        method: "POST",
        body: fd,
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || "Submission failed. Please try again.")
      }
      setStep(9)
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : "Something went wrong. Try again.",
      )
      setStep(7)
    }
  }

  const progressValue = (Math.min(step, 9) / 9) * 100

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 md:px-10 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[#F4AD20] text-sm font-semibold tracking-wider uppercase mb-2">
              Step {Math.min(step, 9)} of 9
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {stepTitles[step - 1]}
            </h3>
          </div>
          {onClose && step !== 8 && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="mt-6">
          <Progress
            value={progressValue}
            className="bg-white/10 [&>[data-slot=progress-indicator]]:bg-[#F4AD20]"
          />
        </div>
      </div>

      <div className="px-6 md:px-10 py-8 md:py-10">
        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {step === 1 && <PersonalStep data={data} update={update} />}
        {step === 2 && <EmploymentStep data={data} update={update} />}
        {step === 3 && (
          <FinancialStep data={data} update={update} handleFile={handleFile} />
        )}
        {step === 4 && <PropertyStep data={data} update={update} />}
        {step === 5 && <DocumentsStep data={data} handleFile={handleFile} />}
        {step === 6 && <ConsentStep data={data} update={update} />}
        {step === 7 && (
          <ReviewStep data={data} submitError={submitError} goTo={setStep} />
        )}
        {step === 8 && <SubmittingStep />}
        {step === 9 && <SuccessStep email={data.email} />}

        {step < 7 && (
          <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between mt-10 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={back}
              disabled={step === 1}
              className="rounded-full px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button
              type="button"
              onClick={next}
              className="rounded-full px-6 bg-[#F4AD20] hover:bg-orange-600 text-white"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 7 && (
          <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between mt-10 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={back}
              className="rounded-full px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button
              type="button"
              onClick={submit}
              className="rounded-full px-8 bg-[#F4AD20] hover:bg-orange-600 text-white"
            >
              Submit Application
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

type StepProps = {
  data: FormState
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-5">{children}</div>
}

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-900">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

function CurrencyInput({
  value,
  onChange,
  placeholder,
  id,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  id?: string
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
        ₦
      </span>
      <Input
        id={id}
        inputMode="numeric"
        value={formatCurrency(value)}
        onChange={(e) => onChange(digitsOnly(e.target.value))}
        placeholder={placeholder}
        className="pl-7"
      />
    </div>
  )
}

function PersonalStep({ data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <FieldRow>
        <Field label="Full Name" required>
          <Input
            value={data.full_name}
            onChange={(e) => update("full_name", e.target.value)}
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Email Address" required>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@email.com"
          />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Phone Number" required>
          <Input
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+234 801 234 5678"
          />
        </Field>
        <Field label="Date of Birth" required>
          <Input
            type="date"
            value={data.date_of_birth}
            onChange={(e) => update("date_of_birth", e.target.value)}
          />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="NIN" required hint="11-digit National Identification Number">
          <Input
            inputMode="numeric"
            maxLength={11}
            value={data.nin}
            onChange={(e) => update("nin", digitsOnly(e.target.value).slice(0, 11))}
            placeholder="12345678901"
          />
        </Field>
        <Field label="BVN" required hint="11-digit Bank Verification Number">
          <Input
            inputMode="numeric"
            maxLength={11}
            value={data.bvn}
            onChange={(e) => update("bvn", digitsOnly(e.target.value).slice(0, 11))}
            placeholder="12345678901"
          />
        </Field>
      </FieldRow>
      <Field label="Residential Address" required>
        <Textarea
          rows={3}
          value={data.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Street, City, State"
          className="resize-none"
        />
      </Field>
    </div>
  )
}

function EmploymentStep({ data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <Field label="Employment Status" required>
        <Select
          value={data.employment_status}
          onValueChange={(v) => update("employment_status", v as EmploymentStatus)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your status" />
          </SelectTrigger>
          <SelectContent>
            {employmentOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <FieldRow>
        <Field label="Employer / Company Name">
          <Input
            value={data.employer_name}
            onChange={(e) => update("employer_name", e.target.value)}
            placeholder="Acme Ltd."
          />
        </Field>
        <Field label="Occupation / Role" required>
          <Input
            value={data.occupation}
            onChange={(e) => update("occupation", e.target.value)}
            placeholder="Software Engineer"
          />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Years Employed">
          <Input
            inputMode="numeric"
            value={data.years_employed}
            onChange={(e) =>
              update("years_employed", digitsOnly(e.target.value))
            }
            placeholder="e.g. 5"
          />
        </Field>
        <Field label="Monthly Income (₦)" required>
          <CurrencyInput
            value={data.monthly_income}
            onChange={(v) => update("monthly_income", v)}
            placeholder="500,000"
          />
        </Field>
      </FieldRow>
    </div>
  )
}

function FinancialStep({
  data,
  update,
  handleFile,
}: StepProps & {
  handleFile: (key: keyof FormState, file: File | null) => void
}) {
  return (
    <div className="space-y-5">
      <FieldRow>
        <Field label="Annual Income (₦)" required>
          <CurrencyInput
            value={data.annual_income}
            onChange={(v) => update("annual_income", v)}
            placeholder="6,000,000"
          />
        </Field>
        <Field label="Monthly Expenses (₦)" required>
          <CurrencyInput
            value={data.monthly_expenses}
            onChange={(v) => update("monthly_expenses", v)}
            placeholder="200,000"
          />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Existing Debts (₦)">
          <CurrencyInput
            value={data.existing_debts}
            onChange={(v) => update("existing_debts", v)}
            placeholder="0"
          />
        </Field>
        <Field label="Savings Account Balance (₦)">
          <CurrencyInput
            value={data.savings_account_balance}
            onChange={(v) => update("savings_account_balance", v)}
            placeholder="1,000,000"
          />
        </Field>
      </FieldRow>
      <Field
        label="Bank Statement (6 months)"
        hint="PDF, JPG or PNG. Max 5MB."
      >
        <FileField
          file={data.bank_statement}
          onChange={(f) => handleFile("bank_statement", f)}
          accept=".pdf,.png,.jpg,.jpeg"
        />
      </Field>
    </div>
  )
}

function PropertyStep({ data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <Field label="Have you found a property?" required>
        <RadioGroup
          value={data.found_property}
          onValueChange={(v) => update("found_property", v as YesNo)}
          className="flex gap-6"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="yes" /> Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="no" /> Not yet
          </label>
        </RadioGroup>
      </Field>
      <FieldRow>
        <Field label="Target Property Price (₦)">
          <CurrencyInput
            value={data.target_property_price}
            onChange={(v) => update("target_property_price", v)}
            placeholder="50,000,000"
          />
        </Field>
        <Field label="Preferred Location">
          <Input
            value={data.preferred_location}
            onChange={(e) => update("preferred_location", e.target.value)}
            placeholder="Lekki, Lagos"
          />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Property Type" required>
          <Select
            value={data.property_type}
            onValueChange={(v) => update("property_type", v as PropertyType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              {propertyOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Desired Loan Amount (₦)" required>
          <CurrencyInput
            value={data.desired_loan_amount}
            onChange={(v) => update("desired_loan_amount", v)}
            placeholder="30,000,000"
          />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Max Monthly Payment (₦)" required>
          <CurrencyInput
            value={data.max_monthly_payment}
            onChange={(v) => update("max_monthly_payment", v)}
            placeholder="400,000"
          />
        </Field>
        <Field
          label="Preferred Repayment Period"
          required
          hint="In years (e.g. 10, 15, 20)"
        >
          <Input
            inputMode="numeric"
            value={data.preferred_repayment_period}
            onChange={(e) =>
              update(
                "preferred_repayment_period",
                digitsOnly(e.target.value),
              )
            }
            placeholder="15"
          />
        </Field>
      </FieldRow>
      <Field label="Do you own an existing property?" required>
        <RadioGroup
          value={data.own_existing_property}
          onValueChange={(v) => update("own_existing_property", v as YesNo)}
          className="flex gap-6"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="yes" /> Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="no" /> No
          </label>
        </RadioGroup>
      </Field>
    </div>
  )
}

function DocumentsStep({
  data,
  handleFile,
}: {
  data: FormState
  handleFile: (key: keyof FormState, file: File | null) => void
}) {
  return (
    <div className="space-y-5">
      <Field label="Valid ID Document" required hint="Passport, NIN slip, or Driver's License">
        <FileField
          file={data.id_document}
          onChange={(f) => handleFile("id_document", f)}
          accept=".pdf,.png,.jpg,.jpeg"
        />
      </Field>
      <Field label="Proof of Address" required hint="Utility bill, bank statement, or lease">
        <FileField
          file={data.proof_of_address}
          onChange={(f) => handleFile("proof_of_address", f)}
          accept=".pdf,.png,.jpg,.jpeg"
        />
      </Field>
      <Field label="Employment / Income Letter" hint="Optional but speeds up review">
        <FileField
          file={data.employment_letter}
          onChange={(f) => handleFile("employment_letter", f)}
          accept=".pdf,.png,.jpg,.jpeg"
        />
      </Field>
    </div>
  )
}

function ConsentStep({ data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <p className="text-slate-600 text-sm">
        Please review and accept the following before submitting your
        application.
      </p>
      <ConsentRow
        checked={data.consent_given}
        onChange={(v) => update("consent_given", v)}
        title="Credit & Identity Verification Consent"
        body="I authorise Apple Grove and its financing partners to verify my identity, NIN, BVN and creditworthiness with the relevant agencies."
      />
      <ConsentRow
        checked={data.data_privacy_accepted}
        onChange={(v) => update("data_privacy_accepted", v)}
        title="Data Privacy Acknowledgement"
        body="I acknowledge that my personal data will be processed in line with the Nigeria Data Protection Act and Apple Grove's privacy policy."
      />
      <ConsentRow
        checked={data.declaration_accepted}
        onChange={(v) => update("declaration_accepted", v)}
        title="Truthful Declaration"
        body="I declare that all information provided in this application is true, accurate and complete to the best of my knowledge."
      />
    </div>
  )
}

function ConsentRow({
  checked,
  onChange,
  title,
  body,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  title: string
  body: string
}) {
  return (
    <label className="flex gap-3 items-start p-4 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => onChange(Boolean(v))}
        className="mt-1"
      />
      <div>
        <p className="font-medium text-slate-900">{title}</p>
        <p className="text-sm text-slate-600 mt-1">{body}</p>
      </div>
    </label>
  )
}

function ReviewStep({
  data,
  submitError,
  goTo,
}: {
  data: FormState
  submitError: string | null
  goTo: (n: number) => void
}) {
  return (
    <div className="space-y-6">
      {submitError && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}
      <p className="text-slate-600">
        Please confirm the information below before submitting. You can return
        to any section to make edits.
      </p>

      <ReviewSection title="Personal Information" onEdit={() => goTo(1)}>
        <Item label="Full Name" value={data.full_name} />
        <Item label="Email" value={data.email} />
        <Item label="Phone" value={data.phone} />
        <Item label="Date of Birth" value={data.date_of_birth} />
        <Item label="NIN" value={maskDigits(data.nin)} />
        <Item label="BVN" value={maskDigits(data.bvn)} />
        <Item label="Address" value={data.address} full />
      </ReviewSection>

      <ReviewSection title="Employment" onEdit={() => goTo(2)}>
        <Item
          label="Status"
          value={labelFor(employmentOptions, data.employment_status)}
        />
        <Item label="Employer" value={data.employer_name} />
        <Item label="Occupation" value={data.occupation} />
        <Item label="Years Employed" value={data.years_employed} />
        <Item
          label="Monthly Income"
          value={displayCurrency(data.monthly_income)}
        />
      </ReviewSection>

      <ReviewSection title="Financial Profile" onEdit={() => goTo(3)}>
        <Item
          label="Annual Income"
          value={displayCurrency(data.annual_income)}
        />
        <Item
          label="Monthly Expenses"
          value={displayCurrency(data.monthly_expenses)}
        />
        <Item
          label="Existing Debts"
          value={displayCurrency(data.existing_debts)}
        />
        <Item
          label="Savings Balance"
          value={displayCurrency(data.savings_account_balance)}
        />
        <Item
          label="Bank Statement"
          value={data.bank_statement?.name || "—"}
          full
        />
      </ReviewSection>

      <ReviewSection title="Property & Financing" onEdit={() => goTo(4)}>
        <Item label="Found Property" value={data.found_property || "—"} />
        <Item
          label="Target Price"
          value={displayCurrency(data.target_property_price)}
        />
        <Item label="Preferred Location" value={data.preferred_location} />
        <Item
          label="Property Type"
          value={labelFor(propertyOptions, data.property_type)}
        />
        <Item
          label="Desired Loan"
          value={displayCurrency(data.desired_loan_amount)}
        />
        <Item
          label="Max Monthly Payment"
          value={displayCurrency(data.max_monthly_payment)}
        />
        <Item
          label="Repayment Period"
          value={
            data.preferred_repayment_period
              ? `${data.preferred_repayment_period} years`
              : "—"
          }
        />
        <Item
          label="Owns Existing Property"
          value={data.own_existing_property || "—"}
        />
      </ReviewSection>

      <ReviewSection title="Documents" onEdit={() => goTo(5)}>
        <Item label="ID Document" value={data.id_document?.name || "—"} />
        <Item
          label="Proof of Address"
          value={data.proof_of_address?.name || "—"}
        />
        <Item
          label="Employment Letter"
          value={data.employment_letter?.name || "—"}
        />
      </ReviewSection>
    </div>
  )
}

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between bg-slate-50 px-5 py-3 border-b border-slate-200">
        <h4 className="font-semibold text-slate-900">{title}</h4>
        <button
          type="button"
          onClick={onEdit}
          className="text-sm font-medium text-[#F4AD20] hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 p-5">{children}</div>
    </div>
  )
}

function Item({
  label,
  value,
  full,
}: {
  label: string
  value: string
  full?: boolean
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">
        {label}
      </p>
      <p className="text-sm text-slate-900 mt-0.5 break-words">
        {value || "—"}
      </p>
    </div>
  )
}

function SubmittingStep() {
  return (
    <div className="py-20 flex flex-col items-center text-center">
      <Loader2 className="w-14 h-14 text-[#F4AD20] animate-spin mb-6" />
      <h4 className="text-xl font-semibold text-slate-900 mb-2">
        Sending your application...
      </h4>
      <p className="text-slate-600 max-w-md">
        Please stay on this page while we securely transmit your details.
      </p>
    </div>
  )
}

function SuccessStep({ email }: { email: string }) {
  return (
    <div className="py-16 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h4 className="text-2xl font-bold text-slate-900 mb-3">
        Application Received
      </h4>
      <p className="text-slate-600 max-w-lg mb-8">
        Thank you. Your financing application has been sent to our team at{" "}
        <span className="font-semibold text-slate-900">
          projects@applegrove.co
        </span>
        . A confirmation will be sent to{" "}
        <span className="font-semibold text-slate-900">{email}</span>. We
        typically respond within 2 business days.
      </p>
      <div className="grid sm:grid-cols-3 gap-4 w-full max-w-xl text-left">
        <InfoCard title="Review" body="Our credit team reviews your profile." />
        <InfoCard
          title="Underwriting"
          body="Partner banks match you with the best offer."
        />
        <InfoCard
          title="Decision"
          body="You receive a formal response by email."
        />
      </div>
    </div>
  )
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <p className="font-semibold text-slate-900 mb-1">{title}</p>
      <p className="text-sm text-slate-600">{body}</p>
    </div>
  )
}

function FileField({
  file,
  onChange,
  accept,
}: {
  file: File | null
  onChange: (f: File | null) => void
  accept?: string
}) {
  if (file) {
    return (
      <div className="flex items-center justify-between gap-3 border border-slate-200 rounded-lg px-4 py-3 bg-slate-50">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="w-5 h-5 text-[#F4AD20] shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {file.name}
            </p>
            <p className="text-xs text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-slate-500 hover:text-red-600 transition-colors"
          aria-label="Remove file"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    )
  }
  return (
    <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-lg px-4 py-6 cursor-pointer hover:border-[#F4AD20] hover:bg-orange-50/50 transition-colors">
      <Upload className="w-6 h-6 text-slate-400" />
      <p className="text-sm font-medium text-slate-700">Click to upload</p>
      <p className="text-xs text-slate-500">{accept?.replaceAll(".", "").toUpperCase()} · max 5MB</p>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </label>
  )
}

function labelFor<T extends { value: string; label: string }>(
  opts: T[],
  value: string,
): string {
  return opts.find((o) => o.value === value)?.label || "—"
}

function maskDigits(v: string) {
  if (!v) return "—"
  if (v.length <= 4) return v
  return `${"•".repeat(v.length - 4)}${v.slice(-4)}`
}
