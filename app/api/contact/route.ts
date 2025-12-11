import { NextResponse } from "next/server"
import { sendEmailWithResend, sendAutoReply } from "@/lib/email"
import { z } from "zod"

// Validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  company: z.string().max(100).optional(),
  website: z.string().url().optional().or(z.literal("")),
  honeypot: z.string().max(0).optional(), // Should be empty
})

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // 5 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }
  
  record.count++
  return true
}

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting
    const forwarded = req.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : "unknown"
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const data = await req.json()

    // Validate input
    const result = contactSchema.safeParse(data)
    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email, message, company, website, honeypot } = result.data

    // Honeypot check - if filled, it's likely a bot
    if (honeypot && honeypot.trim().length > 0) {
      // Pretend success to fool bots
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    // Send email notification
    const emailResult = await sendEmailWithResend({
      name,
      email,
      message,
      company: company || undefined,
      website: website || undefined,
    })

    if (!emailResult.success) {
      console.error("Failed to send notification email:", emailResult.error)
      // Still return success to user - we don't want to expose email issues
    }

    // Send auto-reply to the sender
    const autoReplyResult = await sendAutoReply({
      name,
      email,
      message,
      company: company || undefined,
      website: website || undefined,
    })

    if (!autoReplyResult.success) {
      console.error("Failed to send auto-reply:", autoReplyResult.error)
    }

    // Log successful submission
    console.log("Contact form submission:", {
      name,
      email,
      company,
      website,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ 
      ok: true,
      message: "Thank you! Your message has been sent successfully."
    }, { status: 200 })

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: "ok",
    timestamp: new Date().toISOString()
  })
}
