// Email Service Integration with Resend
// Install: pnpm add resend

interface ClientMetadata {
  ip: string
  userAgent: string
  browser?: {
    name: string
    version: string
  }
  os?: {
    name: string
    version: string
  }
  device?: {
    type: string
    vendor?: string
    model?: string
  }
  location?: {
    country?: string
    region?: string
    city?: string
    timezone?: string
  }
  referer?: string
  timestamp: string
  language?: string
}

interface EmailPayload {
  name: string
  email: string
  message: string
  company?: string
  website?: string
  metadata?: ClientMetadata
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
    const errorMsg = 'RESEND_API_KEY environment variable is not configured'
    console.error('Email configuration error:', {
      error: errorMsg,
      hasApiKey: false,
      contactEmail: TO_EMAIL,
      environment: process.env.NODE_ENV,
    })
    
    // In development, log the submission for testing
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  RESEND_API_KEY not configured - emails will not be sent')
      console.log('📧 Contact form submission (logged only):', {
        to: TO_EMAIL,
        from: payload.email,
        name: payload.name,
        message: payload.message.substring(0, 100) + '...',
      })
    }
    
    return { 
      success: false, 
      error: errorMsg 
    }
  }

  // Validate email addresses
  if (!TO_EMAIL || TO_EMAIL === 'hello@example.com') {
    const errorMsg = 'CONTACT_EMAIL environment variable is not configured or is using default value'
    console.error('Email configuration error:', {
      error: errorMsg,
      contactEmail: TO_EMAIL,
    })
    return { 
      success: false, 
      error: errorMsg 
    }
  }

  try {
    const emailPayload = {
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [TO_EMAIL],
      subject: `New Contact: ${payload.name} - ${payload.company || 'Personal'}`,
      html: generateEmailHTML(payload),
      text: generateEmailText(payload),
      reply_to: payload.email,
    }

    console.log('Attempting to send email via Resend:', {
      to: TO_EMAIL,
      from: emailPayload.from,
      subject: emailPayload.subject,
      hasApiKey: !!RESEND_API_KEY,
      apiKeyPrefix: RESEND_API_KEY.substring(0, 7) + '...',
    })

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const errorMessage = responseData.message || responseData.error?.message || 'Failed to send email'
      console.error('Resend API error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
        message: errorMessage,
      })
      throw new Error(errorMessage)
    }

    console.log('✅ Email sent successfully:', {
      messageId: responseData.id,
      to: TO_EMAIL,
      timestamp: new Date().toISOString(),
    })

    return { success: true, messageId: responseData.id }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('❌ Email sending failed:', {
      error: errorMessage,
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      to: TO_EMAIL,
      timestamp: new Date().toISOString(),
    })
    
    return { 
      success: false, 
      error: errorMessage 
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
            
            ${payload.metadata ? `
            <div style="margin-top: 24px; padding-top: 24px; border-top: 2px solid #e5e7eb;">
              <h3 style="color: #374151; font-size: 16px; margin-bottom: 16px; font-weight: 600;">📊 Client Information</h3>
              <div style="background: #f9fafb; padding: 16px; border-radius: 8px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  ${payload.metadata.location?.country ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; width: 120px;"><strong>Location:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">
                      ${payload.metadata.location.city ? `${payload.metadata.location.city}, ` : ''}
                      ${payload.metadata.location.region ? `${payload.metadata.location.region}, ` : ''}
                      ${payload.metadata.location.country || ''}
                      ${payload.metadata.location.timezone ? ` (${payload.metadata.location.timezone})` : ''}
                    </td>
                  </tr>
                  ` : ''}
                  ${payload.metadata.device ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;"><strong>Device:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">
                      ${payload.metadata.device.type}
                      ${payload.metadata.device.vendor ? ` • ${payload.metadata.device.vendor}` : ''}
                      ${payload.metadata.device.model ? ` • ${payload.metadata.device.model}` : ''}
                    </td>
                  </tr>
                  ` : ''}
                  ${payload.metadata.os ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;"><strong>Operating System:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${payload.metadata.os.name} ${payload.metadata.os.version}</td>
                  </tr>
                  ` : ''}
                  ${payload.metadata.browser ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;"><strong>Browser:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${payload.metadata.browser.name} ${payload.metadata.browser.version}</td>
                  </tr>
                  ` : ''}
                  ${payload.metadata.language ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;"><strong>Language:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${payload.metadata.language}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;"><strong>IP Address:</strong></td>
                    <td style="padding: 8px 0; color: #111827; font-family: monospace; font-size: 12px;">${payload.metadata.ip}</td>
                  </tr>
                  ${payload.metadata.referer ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;"><strong>Referer:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">
                      <a href="${payload.metadata.referer}" style="color: #3b82f6; text-decoration: none; word-break: break-all;">${payload.metadata.referer}</a>
                    </td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;"><strong>Submitted:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${new Date(payload.metadata.timestamp).toLocaleString()}</td>
                  </tr>
                </table>
              </div>
            </div>
            ` : ''}
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
  let text = `
New Contact Form Submission
============================

Name: ${payload.name}
Email: ${payload.email}
${payload.company ? `Company: ${payload.company}` : ''}
${payload.website ? `Website: ${payload.website}` : ''}

Message:
${payload.message}
`

  if (payload.metadata) {
    text += `\n\nClient Information
-------------------`
    
    if (payload.metadata.location?.country) {
      const locationParts = [
        payload.metadata.location.city,
        payload.metadata.location.region,
        payload.metadata.location.country
      ].filter(Boolean)
      text += `\nLocation: ${locationParts.join(', ')}`
      if (payload.metadata.location.timezone) {
        text += ` (${payload.metadata.location.timezone})`
      }
    }
    
    if (payload.metadata.device) {
      const deviceParts = [
        payload.metadata.device.type,
        payload.metadata.device.vendor,
        payload.metadata.device.model
      ].filter(Boolean)
      text += `\nDevice: ${deviceParts.join(' • ')}`
    }
    
    if (payload.metadata.os) {
      text += `\nOperating System: ${payload.metadata.os.name} ${payload.metadata.os.version}`
    }
    
    if (payload.metadata.browser) {
      text += `\nBrowser: ${payload.metadata.browser.name} ${payload.metadata.browser.version}`
    }
    
    if (payload.metadata.language) {
      text += `\nLanguage: ${payload.metadata.language}`
    }
    
    text += `\nIP Address: ${payload.metadata.ip}`
    
    if (payload.metadata.referer) {
      text += `\nReferer: ${payload.metadata.referer}`
    }
    
    text += `\nSubmitted: ${new Date(payload.metadata.timestamp).toLocaleString()}`
  }

  text += `\n\n---
Sent from your Portfolio Contact Form
Reply directly to this email to respond to ${payload.name}
  `
  
  return text.trim()
}

// Auto-reply to the sender
export async function sendAutoReply(payload: EmailPayload): Promise<EmailResponse> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  
  if (!RESEND_API_KEY) {
    console.warn('Auto-reply skipped: RESEND_API_KEY not configured')
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }

  try {
    const emailPayload = {
      from: 'Portfolio <onboarding@resend.dev>',
      to: [payload.email],
      subject: "Thanks for reaching out! I'll be in touch soon.",
      html: generateAutoReplyHTML(payload),
      text: generateAutoReplyText(payload),
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const errorMessage = responseData.message || responseData.error?.message || 'Failed to send auto-reply'
      console.error('Auto-reply failed:', {
        status: response.status,
        error: responseData,
        message: errorMessage,
      })
      throw new Error(errorMessage)
    }

    console.log('✅ Auto-reply sent successfully:', {
      messageId: responseData.id,
      to: payload.email,
      timestamp: new Date().toISOString(),
    })

    return { success: true, messageId: responseData.id }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ Auto-reply failed:', {
      error: errorMessage,
      to: payload.email,
      timestamp: new Date().toISOString(),
    })
    return { success: false, error: errorMessage }
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








