"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ExternalLink,
  Calendar,
  Award,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Star,
  TrendingUp,
  Users,
  Globe,
  Zap,
} from "lucide-react"
import { certifications } from "@/lib/data"
import { useCustomization } from "@/components/providers/customization-provider"
import { cn } from "@/lib/utils"
import type { CertificationItem } from "@/lib/types"

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  })
}

const isExpired = (expiryDate?: string) => {
  if (!expiryDate) return false
  return new Date(expiryDate) < new Date()
}

const isExpiringSoon = (expiryDate?: string) => {
  if (!expiryDate) return false
  const expiry = new Date(expiryDate)
  const now = new Date()
  const sixMonthsFromNow = new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000)
  return expiry > now && expiry <= sixMonthsFromNow
}

// Premium certification statistics
const CERTIFICATION_STATS = [
  {
    label: "Active Certifications",
    value: "6",
    icon: CheckCircle2,
    color: "#10B981",
    description: "Currently valid industry certifications",
  },
  {
    label: "Years of Expertise",
    value: "7+",
    icon: TrendingUp,
    color: "#3B82F6",
    description: "Combined certification experience",
  },
  {
    label: "Industry Recognition",
    value: "Top 5%",
    icon: Star,
    color: "#F59E0B",
    description: "Among certified professionals",
  },
  {
    label: "Enterprise Ready",
    value: "100%",
    icon: Shield,
    color: "#8B5CF6",
    description: "Fortune 500 compliance standards",
  },
]

// Organization prestige levels
const ORGANIZATION_PRESTIGE = {
  "Amazon Web Services": { level: "platinum", color: "#FF9900" },
  "Cloud Native Computing Foundation": { level: "gold", color: "#326CE5" },
  "Google Cloud": { level: "platinum", color: "#4285F4" },
  ISC2: { level: "diamond", color: "#0066CC" },
  "MongoDB Inc.": { level: "gold", color: "#47A248" },
  "Scrum Alliance": { level: "silver", color: "#009639" },
}

// Category icons and colors
const CATEGORY_CONFIG = {
  Cloud: { icon: Globe, color: "#3B82F6", gradient: "from-blue-500 to-cyan-400" },
  DevOps: { icon: Zap, color: "#8B5CF6", gradient: "from-purple-500 to-pink-400" },
  Security: { icon: Shield, color: "#EF4444", gradient: "from-red-500 to-orange-400" },
  Database: { icon: Users, color: "#10B981", gradient: "from-green-500 to-emerald-400" },
  Leadership: { icon: Star, color: "#F59E0B", gradient: "from-yellow-500 to-orange-400" },
}

export function CertificationsSection() {
  const { customization } = useCustomization()
  const [filter, setFilter] = useState<string>("All")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [animatedStats, setAnimatedStats] = useState(false)

  const categories = ["All", ...Array.from(new Set(certifications.map((cert) => cert.category)))]
  const filteredCertifications =
    filter === "All" ? certifications : certifications.filter((cert) => cert.category === filter)

  const activeCertifications = certifications.filter((cert) => !isExpired(cert.expiryDate))
  const expiringSoon = certifications.filter((cert) => isExpiringSoon(cert.expiryDate))

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="certifications"
      className={cn(
        "relative overflow-hidden",
        customization.spacing === "compact"
          ? "py-16"
          : customization.spacing === "comfortable"
            ? "py-24 md:py-32"
            : "py-32 md:py-40",
      )}
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: `linear-gradient(135deg, ${CATEGORY_CONFIG.Cloud.color}40, ${CATEGORY_CONFIG.Security.color}40)`,
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: `linear-gradient(135deg, ${CATEGORY_CONFIG.DevOps.color}40, ${CATEGORY_CONFIG.Database.color}40)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="mx-auto max-w-7xl">
          {/* Premium Section Header */}
          <div className="mb-16 text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="p-3 rounded-2xl glass-effect" style={{ backgroundColor: "var(--surface)" }}>
                <Award className="h-8 w-8" style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <h2
                  className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--fg), var(--primary))`,
                  }}
                >
                  Professional Certifications
                </h2>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <div className="h-1 w-12 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
                  <Star className="h-4 w-4" style={{ color: "var(--primary)" }} />
                  <div className="h-1 w-12 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
                </div>
              </div>
            </div>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
              Industry-recognized certifications from leading technology organizations, demonstrating expertise across
              cloud platforms, security frameworks, and enterprise development practices.
            </p>
          </div>

          {/* Premium Statistics Dashboard */}
          <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {CERTIFICATION_STATS.map((stat, index) => (
              <Card
                key={stat.label}
                className="group relative overflow-hidden transition-all duration-500 hover:scale-105"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-2)",
                  transform: animatedStats ? "translateY(0)" : "translateY(20px)",
                  opacity: animatedStats ? 1 : 0,
                  transitionDelay: `${index * 100}ms`,
                }}
                data-interactive="true"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div
                      className="p-3 rounded-2xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${stat.color}20`,
                        boxShadow: `0 8px 32px ${stat.color}30`,
                      }}
                    >
                      <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2" style={{ color: "var(--fg)" }}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "var(--fg)" }}>
                    {stat.label}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
                    {stat.description}
                  </div>
                </CardContent>

                {/* Premium hover effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}10, transparent)`,
                  }}
                />
              </Card>
            ))}
          </div>

          {/* Premium Filter System */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG]
              const isActive = filter === category

              return (
                <Button
                  key={category}
                  size="lg"
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className={cn(
                    "relative overflow-hidden rounded-2xl px-6 py-3 font-semibold transition-all duration-300",
                    "hover:scale-105 hover:shadow-lg",
                    !isActive && "glass-effect",
                  )}
                  style={
                    isActive
                      ? {
                          backgroundColor: config?.color || "var(--primary)",
                          color: "white",
                          boxShadow: `0 8px 32px ${config?.color || "var(--primary)"}40`,
                        }
                      : {
                          backgroundColor: "var(--card)",
                          borderColor: "var(--border)",
                          color: "var(--fg)",
                          boxShadow: "var(--shadow-1)",
                        }
                  }
                  data-interactive="true"
                >
                  {config && <config.icon className="mr-2 h-4 w-4" />}
                  {category}
                  {category !== "All" && (
                    <Badge
                      className="ml-2 text-xs border-0"
                      style={{
                        backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "var(--surface)",
                        color: isActive ? "white" : "var(--fg-secondary)",
                      }}
                    >
                      {certifications.filter((cert) => cert.category === category).length}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </div>

          {/* Premium Certifications Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertifications.map((cert, index) => (
              <CertificationCard
                key={`${cert.name}-${index}`}
                certification={cert}
                index={index}
                isHovered={hoveredCard === cert.name}
                onHover={setHoveredCard}
              />
            ))}
          </div>

          {/* Premium Call-to-Action */}
          <div className="mt-16 text-center">
            <Card
              className="mx-auto max-w-2xl glass-effect border-0"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "var(--shadow-3)",
              }}
            >
              <CardContent className="p-8">
                <div className="mb-4 flex justify-center">
                  <div
                    className="p-4 rounded-2xl"
                    style={{
                      backgroundColor: "var(--primary)",
                      boxShadow: "0 8px 32px var(--primary)40",
                    }}
                  >
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--fg)" }}>
                  Enterprise-Grade Expertise
                </h3>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-secondary)" }}>
                  These certifications represent hundreds of hours of study and hands-on experience with
                  enterprise-grade technologies and best practices.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge
                    className="px-4 py-2 text-sm font-semibold border-0"
                    style={{
                      backgroundColor: "#10B981",
                      color: "white",
                    }}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {activeCertifications.length} Active Certifications
                  </Badge>
                  <Badge
                    className="px-4 py-2 text-sm font-semibold border-0"
                    style={{
                      backgroundColor: "#3B82F6",
                      color: "white",
                    }}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Fortune 500 Standards
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function CertificationCard({
  certification,
  index,
  isHovered,
  onHover,
}: {
  certification: CertificationItem
  index: number
  isHovered: boolean
  onHover: (name: string | null) => void
}) {
  const expired = isExpired(certification.expiryDate)
  const expiringSoon = isExpiringSoon(certification.expiryDate)
  const categoryConfig = CATEGORY_CONFIG[certification.category as keyof typeof CATEGORY_CONFIG]
  const orgPrestige = ORGANIZATION_PRESTIGE[certification.organization as keyof typeof ORGANIZATION_PRESTIGE]

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02]"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        boxShadow: isHovered ? `0 30px 60px -12px ${categoryConfig?.color}30, var(--shadow-3)` : "var(--shadow-2)",
        transform: `translateY(${isHovered ? "-8px" : "0"})`,
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => onHover(certification.name)}
      onMouseLeave={() => onHover(null)}
      data-interactive="true"
    >
      {/* Premium gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${categoryConfig?.color}10, transparent)`,
        }}
      />

      <CardContent className="relative p-8">
        {/* Premium Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Certification Badge */}
            <div className="relative">
              {certification.badgeSrc ? (
                <div className="relative">
                  <img
                    src={certification.badgeSrc || "/placeholder.svg"}
                    alt={certification.badgeAlt}
                    className="h-16 w-16 rounded-2xl object-contain transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: "var(--surface)",
                      padding: "8px",
                    }}
                  />
                  {/* Prestige indicator */}
                  {orgPrestige && (
                    <div
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: orgPrestige.color }}
                    >
                      <Star className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${categoryConfig?.color}20`,
                    border: `2px solid ${categoryConfig?.color}40`,
                  }}
                >
                  <Award className="h-8 w-8" style={{ color: categoryConfig?.color }} />
                </div>
              )}
            </div>

            {/* Category Badge */}
            <div>
              <Badge
                className="mb-2 px-3 py-1 text-xs font-semibold border-0"
                style={{
                  backgroundColor: `${categoryConfig?.color}20`,
                  color: categoryConfig?.color,
                }}
              >
                {categoryConfig && <categoryConfig.icon className="mr-1 h-3 w-3" />}
                {certification.category}
              </Badge>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex flex-col items-end gap-2">
            {!expired && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" style={{ color: "#10B981" }} />
                <span className="text-sm font-semibold" style={{ color: "#10B981" }}>
                  Active
                </span>
              </div>
            )}
            {expiringSoon && !expired && (
              <Badge
                className="text-xs font-semibold border-0"
                style={{
                  backgroundColor: "#FEF3C7",
                  color: "#D97706",
                }}
              >
                <AlertTriangle className="mr-1 h-3 w-3" />
                Expires Soon
              </Badge>
            )}
            {expired && (
              <Badge
                className="text-xs font-semibold border-0"
                style={{
                  backgroundColor: "#FEE2E2",
                  color: "#DC2626",
                }}
              >
                Expired
              </Badge>
            )}
          </div>
        </div>

        {/* Certification Information */}
        <div className="mb-6">
          <h3
            className="text-xl font-bold leading-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300"
            style={{
              color: "var(--fg)",
              backgroundImage: isHovered
                ? `linear-gradient(135deg, ${categoryConfig?.color}, var(--primary))`
                : undefined,
            }}
          >
            {certification.name}
          </h3>
          <div className="mb-3 flex items-center gap-2">
            <div className="text-lg font-semibold" style={{ color: "var(--primary)" }}>
              {certification.organization}
            </div>
            {orgPrestige && (
              <Badge
                className="text-xs font-semibold border-0"
                style={{
                  backgroundColor: `${orgPrestige.color}20`,
                  color: orgPrestige.color,
                }}
              >
                {orgPrestige.level.toUpperCase()}
              </Badge>
            )}
          </div>
          <p className="text-base leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
            {certification.description}
          </p>
        </div>

        {/* Premium Date Information */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5" style={{ color: "var(--fg-secondary)" }} />
            <div>
              <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                Issued: {formatDate(certification.issueDate)}
              </span>
            </div>
          </div>
          {certification.expiryDate && (
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5" style={{ color: "var(--fg-secondary)" }} />
              <div>
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: expired ? "#DC2626" : expiringSoon ? "#D97706" : "var(--fg)",
                  }}
                >
                  Expires: {formatDate(certification.expiryDate)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Skills Showcase */}
        <div className="mb-6">
          <div className="mb-3">
            <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
              Key Skills & Technologies
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {certification.skills.slice(0, 4).map((skill) => (
              <Badge
                key={skill}
                className="px-3 py-1 text-xs font-medium border-0 transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--fg)",
                  boxShadow: "var(--shadow-1)",
                }}
              >
                {skill}
              </Badge>
            ))}
            {certification.skills.length > 4 && (
              <Badge
                className="px-3 py-1 text-xs font-medium border-0"
                style={{
                  backgroundColor: "var(--surface-variant)",
                  color: "var(--fg-secondary)",
                }}
              >
                +{certification.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Credential Information */}
        <div className="space-y-4">
          {certification.credentialId && (
            <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--surface)" }}>
              <div className="text-xs font-semibold mb-1" style={{ color: "var(--fg-secondary)" }}>
                Credential ID
              </div>
              <div className="text-sm font-mono" style={{ color: "var(--fg)" }}>
                {certification.credentialId}
              </div>
            </div>
          )}

          {certification.verificationUrl && (
            <Button
              variant="outline"
              size="lg"
              className="w-full transition-all duration-300 hover:scale-[1.02] glass-effect border-0 bg-transparent"
              style={{
                backgroundColor: `${categoryConfig?.color}10`,
                color: categoryConfig?.color,
                borderColor: `${categoryConfig?.color}30`,
                boxShadow: "var(--shadow-1)",
              }}
              onClick={() => window.open(certification.verificationUrl, "_blank")}
              data-interactive="true"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Verify Certificate
              <div
                className="ml-2 h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: categoryConfig?.color }}
              />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}