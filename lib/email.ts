// Email Service Integration with Resend
// Install: pnpm add resend

interface EmailPayload {
  name: string
  email: string
  message: string
  company?: string
  website?: string
}

interface EmailResponse {
  success: boolean
  messageId?: string
  error?: string
}

// Resend Email Service
export async function sendEmailWithResend(payload: EmailPayload): Promise<EmailResponse> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const TO_EMAIL = process.env.CONTACT_EMAIL || 'hello@example.com'
  
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, falling back to console log')
    console.log('Contact form submission:', payload)
    return { success: true }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [TO_EMAIL],
        subject: `New Contact: ${payload.name} - ${payload.company || 'Personal'}`,
        html: generateEmailHTML(payload),
        text: generateEmailText(payload),
        reply_to: payload.email,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to send email')
    }

    const data = await response.json()
    return { success: true, messageId: data.id }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

function generateEmailHTML(payload: EmailPayload): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🚀 New Contact Form Submission</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 16px 16px;">
          <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #6b7280;">Name:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  ${payload.name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #6b7280;">Email:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="mailto:${payload.email}" style="color: #3b82f6;">${payload.email}</a>
                </td>
              </tr>
              ${payload.company ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #6b7280;">Company:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  ${payload.company}
                </td>
              </tr>
              ` : ''}
              ${payload.website ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #6b7280;">Website:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="${payload.website}" style="color: #3b82f6;">${payload.website}</a>
                </td>
              </tr>
              ` : ''}
            </table>
            
            <div style="margin-top: 24px;">
              <strong style="color: #6b7280;">Message:</strong>
              <div style="margin-top: 12px; padding: 16px; background: #f3f4f6; border-radius: 8px; white-space: pre-wrap;">
                ${payload.message}
              </div>
            </div>
          </div>
          
          <div style="margin-top: 24px; text-align: center; color: #9ca3af; font-size: 14px;">
            <p>Sent from your Portfolio Contact Form</p>
            <p>Reply directly to this email to respond to ${payload.name}</p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generateEmailText(payload: EmailPayload): string {
  return `
New Contact Form Submission
============================

Name: ${payload.name}
Email: ${payload.email}
${payload.company ? `Company: ${payload.company}` : ''}
${payload.website ? `Website: ${payload.website}` : ''}

Message:
${payload.message}

---
Sent from your Portfolio Contact Form
Reply directly to this email to respond to ${payload.name}
  `.trim()
}

// Auto-reply to the sender
export async function sendAutoReply(payload: EmailPayload): Promise<EmailResponse> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  
  if (!RESEND_API_KEY) {
    return { success: true }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [payload.email],
        subject: "Thanks for reaching out! I'll be in touch soon.",
        html: generateAutoReplyHTML(payload),
        text: generateAutoReplyText(payload),
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to send auto-reply')
    }

    const data = await response.json()
    return { success: true, messageId: data.id }
  } catch (error) {
    console.error('Auto-reply failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

function generateAutoReplyHTML(payload: EmailPayload): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thanks for reaching out, ${payload.name}! 👋</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 16px 16px;">
          <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <p>I've received your message and I'm excited to learn more about your project!</p>
            
            <p>I typically respond within <strong>24 hours</strong> during business days. In the meantime, feel free to:</p>
            
            <ul>
              <li>Check out my <a href="https://github.com/" style="color: #3b82f6;">GitHub</a> for code samples</li>
              <li>Connect with me on <a href="https://linkedin.com/" style="color: #3b82f6;">LinkedIn</a></li>
              <li>Browse my portfolio for more project details</li>
            </ul>
            
            <p>Looking forward to connecting!</p>
            
            <p>Best regards,<br><strong>Senior Software Engineer</strong></p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generateAutoReplyText(payload: EmailPayload): string {
  return `
Thanks for reaching out, ${payload.name}!

I've received your message and I'm excited to learn more about your project!

I typically respond within 24 hours during business days. In the meantime, feel free to:
- Check out my GitHub for code samples
- Connect with me on LinkedIn
- Browse my portfolio for more project details

Looking forward to connecting!

Best regards,
Senior Software Engineer
  `.trim()
}






