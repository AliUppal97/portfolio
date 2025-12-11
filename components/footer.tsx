"use client"

import { Github, Linkedin, Mail, Heart, ArrowUp, Twitter, Youtube, MapPin, Zap } from "lucide-react"
import { useCustomization } from "@/components/providers/customization-provider"
import { 
  siteConfig, 
  getEmailLink, 
  getSocialLinksForDisplay, 
  getQuickLinks, 
  getResourceLinks,
  getAvailabilityStatus,
} from "@/lib/site-config"

const currentYear = new Date().getFullYear()

// Map platform names to icons
const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  email: Mail,
} as const

// Get social links from config
const socialLinksData = getSocialLinksForDisplay()
const socialLinks = [
  ...socialLinksData.map(link => ({
    name: link.name,
    icon: iconMap[link.platform as keyof typeof iconMap] || Mail,
    href: link.href,
    color: link.color,
    hoverColor: link.hoverColor,
  })),
  { 
    name: "Email", 
    icon: Mail, 
    href: getEmailLink(), 
    color: "#EA4335",
    hoverColor: "#c5221f"
  },
]

const quickLinks = getQuickLinks()
const resourceLinks = getResourceLinks()

export function Footer() {
  const { customization } = useCustomization()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({ top: offsetPosition, behavior: "smooth" })
      }
    } else {
      window.location.href = href
    }
  }

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "hsl(var(--surface))" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl" />
      </div>

      {/* Top border gradient */}
      <div 
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--primary) / 0.5), transparent)"
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${siteConfig.branding.primaryColor} 0%, ${siteConfig.branding.secondaryColor} 100%)`,
                  boxShadow: `0 8px 25px -5px ${siteConfig.branding.primaryColor}66`,
                }}
              >
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 
                  className="font-bold text-xl"
                  style={{ color: "hsl(var(--text-primary))" }}
                >
                  {siteConfig.branding.logoText}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: "hsl(var(--text-tertiary))" }}
                >
                  {siteConfig.personal.subtitle}
                </p>
              </div>
            </div>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: "hsl(var(--text-secondary))" }}
            >
              {siteConfig.personal.bio}
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a 
                href={getEmailLink()}
                className="flex items-center gap-3 text-sm transition-colors duration-300 hover:opacity-80"
                style={{ color: "hsl(var(--text-secondary))" }}
              >
                <Mail className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
                {siteConfig.contact.email}
              </a>
              <div 
                className="flex items-center gap-3 text-sm"
                style={{ color: "hsl(var(--text-secondary))" }}
              >
                <MapPin className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
                {siteConfig.personal.location}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="font-bold text-lg mb-6"
              style={{ color: "hsl(var(--text-primary))" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2"
                    style={{ color: "hsl(var(--text-secondary))" }}
                    data-no-hover="true"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "hsl(var(--primary))" }}
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 
              className="font-bold text-lg mb-6"
              style={{ color: "hsl(var(--text-primary))" }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2"
                    style={{ color: "hsl(var(--text-secondary))" }}
                    data-no-hover="true"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "hsl(var(--text-success))" }}
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & CTA */}
          <div>
            <h4 
              className="font-bold text-lg mb-6"
              style={{ color: "hsl(var(--text-primary))" }}
            >
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: "hsl(var(--surface-variant))",
                    color: social.color,
                  }}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Availability */}
            {getAvailabilityStatus().isAvailable && (
              <div 
                className="p-4 rounded-2xl"
                style={{
                  backgroundColor: "hsl(var(--surface-variant) / 0.5)",
                  border: "1px solid hsl(var(--border) / 0.3)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: "hsl(var(--text-success))" }}
                  >
                    {siteConfig.availability.status}
                  </span>
                </div>
                <p 
                  className="text-xs"
                  style={{ color: "hsl(var(--text-tertiary))" }}
                >
                  Currently taking on new clients for {siteConfig.availability.nextAvailableQuarter}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid hsl(var(--border) / 0.3)" }}
        >
          <p 
            className="text-sm flex items-center gap-2"
            style={{ color: "hsl(var(--text-tertiary))" }}
          >
            © {currentYear} {siteConfig.personal.name}. Crafted with
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            using Next.js & Tailwind CSS.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "hsl(var(--surface-variant))",
              color: "hsl(var(--text-secondary))",
            }}
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  )
}


