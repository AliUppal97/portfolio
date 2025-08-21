import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()
  const { name, email, message, company, website, honeypot } = data || {}

  // Basic validation
  if (honeypot && String(honeypot).trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
  }

  // In production, send an email or push to a CRM here.
  // You can integrate with Resend, SendGrid, or create a Notion/GSheets entry.
  // This demo just echoes back success.
  console.log("Contact form submission:", { name, email, company, website, message })

  return NextResponse.json({ ok: true }, { status: 200 })
}
