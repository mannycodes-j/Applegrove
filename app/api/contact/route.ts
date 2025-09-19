import { type NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Zoho transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your project.applegrove.co email
        pass: process.env.SMTP_PASSWORD, // your app password
      },
    })

    // Email to company
    // Utility to decide whether to embed or link the logo
    function getLogoConfig() {
      return {
        htmlLogo: `<img src="https://applegrove.vercel.app/assets/images/logo.png" 
                 alt="Apple Grove Logo" 
                 style="max-width: 180px; height: auto; display:block; margin:0 auto;" />`,
        attachments: [], // no need for inline attachments
      }
    }

    const { htmlLogo, attachments } = getLogoConfig()

    // Company Mail
    const companyMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'projects@applegrove.co',
      subject: `New Contact Form Submission from ${name}`,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

This email was sent from the Apple Grove Website contact form.
  `,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
     <div style="text-align:center; background:#151D3BCC; padding:20px;">
  ${htmlLogo}
    </div>


      <h2 style="color: #F4AD20; border-bottom: 2px solid #F4AD20; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border-left: 4px solid #F4AD20; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Message:</h3>
        <p style="line-height: 1.6;">${message}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>This email was sent from the Apple Grove Website contact form.</p>
      </div>
    </div>
  `,
      attachments,
    }

    // Auto-Reply Mail
    const autoReplyOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting Apple Grove',
      text: `
Dear ${name},

Thank you for reaching out to Apple Grove. We have received your message and will get back to you as soon as possible.

Your Message:
"${message}"

If you have any urgent inquiries, please contact us:
- Email: projects@applegrove.co
- Phone: +234 906 414 0851
- WhatsApp: +234 813 959 7690

Best regards,
The Apple Grove Team
  `,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
   <div style="text-align:center; background:#151D3BCC; padding:20px;">
  ${htmlLogo}
  </div>


      <h2 style="color: #F4AD20; border-bottom: 2px solid #F4AD20; padding-bottom: 10px;">
        Thank You for Contacting Us!
      </h2>
      
      <p>Dear ${name},</p>
      
      <p>Thank you for reaching out to Apple Grove. We have received your message and will get back to you as soon as possible.</p>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
        <p style="line-height: 1.6; font-style: italic;">"${message}"</p>
      </div>
      
      <p>If you have any urgent inquiries, please feel free to contact us directly:</p>
      <ul style="line-height: 1.8;">
        <li><strong>Email:</strong> projects@applegrove.co</li>
        <li><strong>Phone:</strong> +234 906 414 0851</li>
        <li><strong>WhatsApp:</strong> +234 813 959 7690</li>
      </ul>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>Best regards,<br>The Apple Grove Team</p>
      </div>
    </div>
  `,
      attachments,
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(autoReplyOptions),
    ])

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
