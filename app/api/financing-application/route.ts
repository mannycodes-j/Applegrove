import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"
export const maxDuration = 60

const MAX_FILE_BYTES = 5 * 1024 * 1024
const FILE_FIELDS = [
  "bank_statement",
  "id_document",
  "proof_of_address",
  "employment_letter",
] as const

const formatCurrency = (v: string) => {
  const digits = (v || "").replace(/\D/g, "")
  if (!digits) return "—"
  return `₦${Number(digits).toLocaleString("en-US")}`
}

const labelMap: Record<string, string> = {
  employed: "Employed",
  self_employed: "Self-Employed",
  retired: "Retired",
  student: "Student",
  unemployed: "Unemployed",
  apartment: "Apartment",
  house: "House",
  land: "Land",
  commercial: "Commercial",
  townhouse: "Townhouse",
  yes: "Yes",
  no: "No",
  true: "Yes",
  false: "No",
}
const pretty = (v: string) => labelMap[v] || v || "—"
const maskDigits = (v: string) => {
  if (!v) return "—"
  if (v.length <= 4) return v
  return `${"•".repeat(v.length - 4)}${v.slice(-4)}`
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const get = (k: string) => String(form.get(k) || "").trim()

    const full_name = get("full_name")
    const email = get("email")
    const phone = get("phone")

    if (!full_name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required personal information." },
        { status: 400 },
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      )
    }
    if (get("nin").length !== 11 || get("bvn").length !== 11) {
      return NextResponse.json(
        { error: "NIN and BVN must each be exactly 11 digits." },
        { status: 400 },
      )
    }
    if (
      get("consent_given") !== "true" ||
      get("data_privacy_accepted") !== "true" ||
      get("declaration_accepted") !== "true"
    ) {
      return NextResponse.json(
        { error: "All consent checkboxes must be accepted." },
        { status: 400 },
      )
    }

    const attachments: {
      filename: string
      content: Buffer
      contentType?: string
    }[] = []

    for (const field of FILE_FIELDS) {
      const entry = form.get(field)
      if (entry instanceof File && entry.size > 0) {
        if (entry.size > MAX_FILE_BYTES) {
          return NextResponse.json(
            { error: `${field.replaceAll("_", " ")} exceeds 5MB limit.` },
            { status: 400 },
          )
        }
        const buf = Buffer.from(await entry.arrayBuffer())
        attachments.push({
          filename: `${field}-${entry.name}`,
          content: buf,
          contentType: entry.type || undefined,
        })
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const FROM = process.env.RESEND_FROM ?? "Apple Grove <onboarding@resend.dev>"

    const htmlLogo = `<img src="https://applegrove.vercel.app/assets/images/logo.png" alt="Apple Grove Logo" style="max-width: 180px; height: auto; display:block; margin:0 auto;" />`

    const submittedAt = new Date().toLocaleString("en-NG", {
      timeZone: "Africa/Lagos",
      dateStyle: "full",
      timeStyle: "short",
    })

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;color:#475569;width:40%;">${label}</td>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:13px;color:#0f172a;">${value || "—"}</td>
      </tr>`

    const sectionHtml = (title: string, rows: string) => `
      <h3 style="color:#0f172a;margin:28px 0 10px;font-size:16px;border-left:4px solid #F4AD20;padding-left:10px;">${title}</h3>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto; color:#0f172a;">
        <div style="text-align:center; background:#151D3BCC; padding:20px;">${htmlLogo}</div>
        <h2 style="color:#F4AD20;border-bottom:2px solid #F4AD20;padding-bottom:10px;margin-top:24px;">
          New Financing Application
        </h2>
        <p style="color:#475569;font-size:13px;">Submitted: ${submittedAt}</p>

        ${sectionHtml(
          "Personal Information",
          row("Full Name", full_name) +
            row("Email", email) +
            row("Phone", phone) +
            row("Date of Birth", get("date_of_birth")) +
            row("NIN", maskDigits(get("nin"))) +
            row("BVN", maskDigits(get("bvn"))) +
            row("Address", get("address")),
        )}

        ${sectionHtml(
          "Employment",
          row("Employment Status", pretty(get("employment_status"))) +
            row("Employer", get("employer_name")) +
            row("Occupation", get("occupation")) +
            row("Years Employed", get("years_employed")) +
            row("Monthly Income", formatCurrency(get("monthly_income"))),
        )}

        ${sectionHtml(
          "Financial Profile",
          row("Annual Income", formatCurrency(get("annual_income"))) +
            row(
              "Monthly Expenses",
              formatCurrency(get("monthly_expenses")),
            ) +
            row("Existing Debts", formatCurrency(get("existing_debts"))) +
            row(
              "Savings Balance",
              formatCurrency(get("savings_account_balance")),
            ),
        )}

        ${sectionHtml(
          "Property & Financing Intent",
          row("Found Property", pretty(get("found_property"))) +
            row(
              "Target Property Price",
              formatCurrency(get("target_property_price")),
            ) +
            row("Preferred Location", get("preferred_location")) +
            row("Property Type", pretty(get("property_type"))) +
            row(
              "Desired Loan Amount",
              formatCurrency(get("desired_loan_amount")),
            ) +
            row(
              "Max Monthly Payment",
              formatCurrency(get("max_monthly_payment")),
            ) +
            row(
              "Preferred Repayment Period",
              get("preferred_repayment_period")
                ? `${get("preferred_repayment_period")} years`
                : "—",
            ) +
            row(
              "Owns Existing Property",
              pretty(get("own_existing_property")),
            ),
        )}

        ${sectionHtml(
          "Documents",
          row(
            "Bank Statement",
            attachmentStatus(attachments, "bank_statement"),
          ) +
            row(
              "ID Document",
              attachmentStatus(attachments, "id_document"),
            ) +
            row(
              "Proof of Address",
              attachmentStatus(attachments, "proof_of_address"),
            ) +
            row(
              "Employment Letter",
              attachmentStatus(attachments, "employment_letter"),
            ),
        )}

        ${sectionHtml(
          "Consent",
          row("Credit & Identity Verification", "Accepted") +
            row("Data Privacy (NDPA)", "Accepted") +
            row("Truthful Declaration", "Accepted"),
        )}

        <div style="margin-top:30px;padding-top:20px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;">
          <p>Submitted via the Apple Grove financing application form. All attached documents are in this email.</p>
        </div>
      </div>`

    const resendAttachments = attachments.map((a) => ({
      filename: a.filename,
      content: a.content,
    }))

    const companyMailOptions = {
      from: FROM,
      to: [process.env.FINANCING_EMAIL ?? "projects@applegrove.co"],
      replyTo: email,
      subject: `New Financing Application — ${full_name}`,
      html,
      attachments: resendAttachments,
    }

    const autoReplyOptions = {
      from: FROM,
      to: [email],
      subject: "We've received your Apple Grove financing application",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color:#0f172a;">
          <div style="text-align:center; background:#151D3BCC; padding:20px;">${htmlLogo}</div>
          <h2 style="color:#F4AD20;border-bottom:2px solid #F4AD20;padding-bottom:10px;margin-top:24px;">
            Application Received
          </h2>
          <p>Dear ${full_name},</p>
          <p>
            Thank you for applying for financing with Apple Grove. We've received
            your application and supporting documents, and our credit team will
            begin reviewing them shortly.
          </p>
          <div style="background-color: #f8fafc; padding: 16px 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin:0 0 8px;"><strong>What happens next?</strong></p>
            <ol style="margin:0;padding-left:18px;line-height:1.8;">
              <li>Our team reviews your profile and documents.</li>
              <li>We match you with the most suitable financing partner.</li>
              <li>You receive a formal response within 2 business days.</li>
            </ol>
          </div>
          <p>If we need any additional information, we will contact you directly on the email or phone number provided.</p>
          <p>For urgent enquiries:</p>
          <ul style="line-height:1.8;">
            <li><strong>Email:</strong> projects@applegrove.co</li>
            <li><strong>Phone:</strong> +234 906 414 0851</li>
            <li><strong>WhatsApp:</strong> +234 813 959 7690</li>
          </ul>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color:#64748b; font-size:12px;">
            <p>Best regards,<br/>The Apple Grove Team</p>
          </div>
        </div>`,
    }

    await Promise.all([
      resend.emails.send(companyMailOptions),
      resend.emails.send(autoReplyOptions),
    ])

    return NextResponse.json(
      { message: "Application submitted successfully." },
      { status: 200 },
    )
  } catch (error) {
    console.error("Financing application error:", error)
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 },
    )
  }
}

function attachmentStatus(
  attachments: { filename: string }[],
  field: string,
): string {
  const found = attachments.find((a) => a.filename.startsWith(`${field}-`))
  return found
    ? `Attached: ${found.filename.replace(`${field}-`, "")}`
    : "Not provided"
}
