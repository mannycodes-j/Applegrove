import { type NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { full_name, email, phone, address } = await request.json()

    if (!full_name || !email || !phone || !address) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const htmlLogo = `<img src="https://applegrove.vercel.app/assets/images/logo.png" alt="Apple Grove Logo" style="max-width: 180px; height: auto; display:block; margin:0 auto;" />`

    const companyMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'projects@applegrove.co',
      replyTo: email,
      subject: `New Financing Enquiry from ${full_name}`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align:center; background:#151D3BCC; padding:20px;">
        ${htmlLogo}
      </div>
      <h2 style="color: #F4AD20; border-bottom: 2px solid #F4AD20; padding-bottom: 10px;">
        New Financing Enquiry
      </h2>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>Submitted via the Apple Grove financing enquiry form.</p>
      </div>
    </div>
  `,
    }

    const autoReplyOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "We've received your Apple Grove financing enquiry",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align:center; background:#151D3BCC; padding:20px;">
        ${htmlLogo}
      </div>
      <h2 style="color: #F4AD20; border-bottom: 2px solid #F4AD20; padding-bottom: 10px;">
        Enquiry Received
      </h2>
      <p>Dear ${full_name},</p>
      <p>Thank you for reaching out to Apple Grove about financing. We have received your enquiry and will get back to you as soon as possible.</p>
      <p>If you have any urgent inquiries, please feel free to contact us directly:</p>
      <ul style="line-height: 1.8;">
        <li><strong>Email:</strong> projects@applegrove.co</li>
        <li><strong>Phone:</strong> +234 906 414 0851</li>
        <li><strong>WhatsApp:</strong> +234 813 959 7690</li>
      </ul>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>Best regards,<br/>The Apple Grove Team</p>
      </div>
    </div>
  `,
    }

    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(autoReplyOptions),
    ])

    return NextResponse.json(
      { message: 'Enquiry submitted successfully.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Financing enquiry error:', error)
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    )
  }
}
