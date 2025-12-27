"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Download, Mail, Phone, MapPin, Calendar, Sparkles, Send, Award } from "lucide-react"
import { useTheme } from "next-themes"
import { useCustomization } from "@/components/providers/customization-provider"
import { cn } from "@/lib/utils"
import { 
  siteConfig, 
  getEmailLink, 
  getPhoneLink, 
  hasSocialLink,
  getAvailabilityStatus,
} from "@/lib/site-config"

export function ContactSection() {
  const { customization } = useCustomization()
  const { resolvedTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Determine if we're in dark mode (only after mount to avoid hydration mismatch)
  const isDark = mounted && resolvedTheme === "dark"

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    setLoading(true)
    setOk(null)
    setErrorMessage(null)
    setSuccessMessage(null)
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      
      const data = await res.json()
      
      if (res.ok && data.ok) {
        setOk(true)
        setSuccessMessage(data.message || "Thank you! Your message has been sent successfully.")
        // Clear form on success
        ;(e.target as HTMLFormElement).reset()
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } else {
        setOk(false)
        setErrorMessage(data.error || "Failed to send your message. Please try again.")
      }
    } catch (error) {
      setOk(false)
      setErrorMessage("Network error. Please check your connection and try again.")
      console.error("Contact form submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact.email,
      href: getEmailLink(),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.contact.phone,
      href: getPhoneLink(),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: siteConfig.personal.location,
      href: "#",
      color: "from-purple-500 to-violet-500",
    },
  ]

  const socialLinks = [
    ...(hasSocialLink("linkedin") ? [{
      icon: Linkedin,
      label: "LinkedIn",
      href: siteConfig.social.linkedin,
      // Premium LinkedIn colors: vibrant blue with white icon for both themes
      color: "#FFFFFF", // White icon for premium contrast
      bgColor: isDark ? "#0077B5" : "#0077B5", // Same vibrant blue for both themes
      description: "Professional network",
    }] : []),
    ...(hasSocialLink("github") ? [{
      icon: Github,
      label: "GitHub",
      href: siteConfig.social.github,
      // Premium GitHub colors: dark background with white icon for both themes
      color: "#FFFFFF", // White icon for premium contrast
      bgColor: isDark ? "#24292E" : "#24292E", // GitHub's official dark color for both themes
      description: "Code repositories",
    }] : []),
    ...(hasSocialLink("calendly") ? [{
      icon: Calendar,
      label: "Schedule Call",
      href: siteConfig.social.calendly,
      color: "#FFFFFF", // White icon for premium contrast
      bgColor: isDark ? "#006BFF" : "#006BFF", // Vibrant blue for both themes
      description: "Book a meeting",
    }] : []),
  ]

  const availability = getAvailabilityStatus()

  return (
    <section
      id="contact"
      className={cn(
        "container mx-auto px-4 relative overflow-hidden",
        customization.spacing === "compact"
          ? "py-16"
          : customization.spacing === "comfortable"
            ? "py-20 md:py-28"
            : "py-28 md:py-36",
      )}
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Premium header */}
        <header className="text-center mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-text-info animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-text-primary via-blue-600 to-text-primary dark:from-text-inverse dark:via-blue-400 dark:to-text-inverse bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h2>
            <Award className="w-8 h-8 text-text-warning" />
          </div>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium text-text-secondary">
            Ready to transform your vision into reality? Let's discuss your project and explore how we can create
            exceptional solutions together.
            <span className="block mt-2 text-base opacity-80 text-text-tertiary">
              I typically respond within 24 hours with detailed project insights.
            </span>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-6" />
        </header>

        <div className="grid gap-12 lg:grid-cols-5 max-w-7xl mx-auto">
          {/* Premium contact form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={submit}
              className="space-y-6 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--surface) / 0.1) 0%, hsl(var(--surface) / 0.05) 100%)",
                border: "1px solid hsl(var(--border) / 0.2)",
                boxShadow: "var(--shadow-card)",
                backgroundColor: "hsl(var(--surface))",
                borderColor: "hsl(var(--border))",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

              {/* Honeypot field */}
              <input
                type="text"
                name="honeypot"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="relative z-10 space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-text-primary">Start Your Project</h3>
                  <p className="text-sm text-text-secondary">Tell me about your vision and let's make it happen</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-text-primary">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="rounded-xl bg-white/10 backdrop-blur-md text-base py-3 premium-input focus-visible:ring-0 focus-visible:ring-offset-0"
                      style={{
                        backgroundColor: "hsl(var(--surface-variant))",
                        color: "hsl(var(--text-primary))",
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-text-primary">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="john@company.com"
                      className="rounded-xl bg-white/10 backdrop-blur-md text-base py-3 premium-input focus-visible:ring-0 focus-visible:ring-offset-0"
                      style={{
                        backgroundColor: "hsl(var(--surface-variant))",
                        color: "hsl(var(--text-primary))",
                      }}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium text-text-primary">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      className="rounded-xl bg-white/10 backdrop-blur-md text-base py-3 premium-input focus-visible:ring-0 focus-visible:ring-offset-0"
                      style={{
                        backgroundColor: "hsl(var(--surface-variant))",
                        color: "hsl(var(--text-primary))",
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium text-text-primary">
                      Website
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://yourcompany.com"
                      className="rounded-xl bg-white/10 backdrop-blur-md text-base py-3 premium-input focus-visible:ring-0 focus-visible:ring-offset-0"
                      style={{
                        backgroundColor: "hsl(var(--surface-variant))",
                        color: "hsl(var(--text-primary))",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-text-primary">
                    Project Details *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                    className="rounded-xl bg-white/10 backdrop-blur-md text-base resize-none premium-input focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{
                      backgroundColor: "hsl(var(--surface-variant))",
                      color: "hsl(var(--text-primary))",
                    }}
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="group flex-1 rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                      color: "white",
                      boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.4)",
                    }}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>

                  {successMessage && (
                    <div className="flex items-center gap-2 text-text-success font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                      <Award className="w-5 h-5" />
                      <span>{successMessage}</span>
                    </div>
                  )}
                  {errorMessage && (
                    <div className="flex items-center gap-2 text-text-error font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                      <span className="text-sm">{errorMessage}</span>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Premium sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact methods */}
            <div
              className="rounded-3xl p-8 backdrop-blur-md"
              style={{
                background: "linear-gradient(135deg, hsl(var(--surface) / 0.1) 0%, hsl(var(--surface) / 0.05) 100%)",
                border: "1px solid hsl(var(--border) / 0.2)",
                boxShadow: "var(--shadow-card)",
                backgroundColor: "hsl(var(--surface))",
                borderColor: "hsl(var(--border))",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                <h3 className="text-xl font-bold text-text-primary">Get In Touch</h3>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--surface-variant) / 0.1) 0%, hsl(var(--surface-variant) / 0.05) 100%)",
                      border: "1px solid hsl(var(--border) / 0.1)",
                      backgroundColor: "hsl(var(--surface-variant))",
                      borderColor: "hsl(var(--border))",
                    }}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${method.color} shadow-lg`}
                    >
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-text-tertiary">{method.label}</div>
                      <div className="font-bold text-text-primary">{method.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div
              className="rounded-3xl p-8 backdrop-blur-md"
              style={{
                background: "linear-gradient(135deg, hsl(var(--surface) / 0.1) 0%, hsl(var(--surface) / 0.05) 100%)",
                border: "1px solid hsl(var(--border) / 0.2)",
                boxShadow: "var(--shadow-card)",
                backgroundColor: "hsl(var(--surface))",
                borderColor: "hsl(var(--border))",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
                <h3 className="text-xl font-bold text-text-primary">Connect</h3>
              </div>

              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--surface-variant) / 0.1) 0%, hsl(var(--surface-variant) / 0.05) 100%)",
                      border: "1px solid hsl(var(--border) / 0.1)",
                      backgroundColor: "hsl(var(--surface-variant))",
                      borderColor: "hsl(var(--border))",
                    }}
                    data-interactive="true"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{ 
                        backgroundColor: link.bgColor || link.color + "20",
                        boxShadow: `0 4px 12px -2px ${link.bgColor || link.color}40`,
                      }}
                    >
                      <link.icon className="w-5 h-5 transition-all duration-300" style={{ color: link.color }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-text-primary">{link.label}</div>
                      <div className="text-xs text-text-tertiary">{link.description}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <div
              className="rounded-3xl p-8 backdrop-blur-md text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--text-success) / 0.1) 0%, hsl(var(--text-info) / 0.1) 100%)",
                border: "1px solid hsl(var(--text-success) / 0.2)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10" />
              <div className="relative z-10">
                <Download className="w-12 h-12 mx-auto mb-4 text-text-success" />
                <h3 className="text-lg font-bold mb-2 text-text-primary">Download Resume</h3>
                <p className="text-sm mb-6 text-text-secondary">
                  Get a detailed overview of my experience, skills, and achievements.
                </p>
                <a
                  href={siteConfig.personal.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #22C55E 0%, #3B82F6 100%)",
                    color: "white",
                    boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
                <p className="mt-4 text-xs opacity-75 text-text-tertiary">
                  PDF • Updated {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </p>
              </div>
            </div>

            {/* Availability status */}
            {availability.isAvailable && (
              <div
                className="rounded-3xl p-6 backdrop-blur-md text-center"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--surface) / 0.1) 0%, hsl(var(--surface) / 0.05) 100%)",
                  border: "1px solid hsl(var(--border) / 0.2)",
                  boxShadow: "var(--shadow-card)",
                  backgroundColor: "hsl(var(--surface))",
                  borderColor: "hsl(var(--border))",
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-bold text-text-success">{availability.status}</span>
                </div>
                <p className="text-xs text-text-tertiary">Currently accepting new client projects for {availability.quarter}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
