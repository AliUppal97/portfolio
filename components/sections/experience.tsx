"use client"

import Image from "next/image"
import { useMemo, useState, useCallback, useRef, useEffect } from "react"
import { experience } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useCustomization } from "@/components/providers/customization-provider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  CheckCircle2,
  Building2,
  ExternalLink,
  TrendingUp,
  Users,
  Award,
  Target,
  Sparkles,
  Crown,
  Zap,
  BarChart3,
  Rocket,
  Shield,
  Code2,
  Globe,
  DollarSign,
  Clock,
  ArrowRight,
  Play,
  ChevronRight,
  Briefcase,
  MapPin,
} from "lucide-react"

// High-resolution, static banners (no placeholders)
const BANNERS = [
  "/enterprise-fintech-dashboard-ui.png",
  "/healthcare-platform-portal-ui.png",
  "/images/banners/saas-analytics-dashboard.png",
]

// Generic, high-res brand circles in case a logo is missing (cycled)
const GENERIC_LOGOS = [
  "/images/companies/acme-fintech-logo.png",
  "/images/companies/healthcore-systems-logo.png",
  "/images/companies/saasify-logo.png",
]

// Company brand colors for premium theming
const COMPANY_COLORS = {
  "ACME FinTech": {
    primary: "#1E40AF",
    secondary: "#3B82F6",
    gradient: "from-blue-600 to-blue-400",
    bg: "rgba(30, 64, 175, 0.1)",
  },
  "HealthCore Systems": {
    primary: "#059669",
    secondary: "#10B981",
    gradient: "from-emerald-600 to-emerald-400",
    bg: "rgba(5, 150, 105, 0.1)",
  },
  SaaSify: {
    primary: "#7C3AED",
    secondary: "#8B5CF6",
    gradient: "from-violet-600 to-violet-400",
    bg: "rgba(124, 58, 237, 0.1)",
  },
}

// Impact metrics for visual emphasis
const IMPACT_METRICS = {
  "ACME FinTech": [
    { label: "Monthly Volume", value: "$50M+", icon: DollarSign, color: "#10B981" },
    { label: "API Performance", value: "60%↑", icon: TrendingUp, color: "#3B82F6" },
    { label: "Team Growth", value: "3x", icon: Users, color: "#8B5CF6" },
    { label: "Test Coverage", value: "95%", icon: Shield, color: "#F59E0B" },
  ],
  "HealthCore Systems": [
    { label: "Active Users", value: "100K+", icon: Users, color: "#10B981" },
    { label: "API Integrations", value: "15+", icon: Globe, color: "#3B82F6" },
    { label: "Performance", value: "40%↑", icon: TrendingUp, color: "#8B5CF6" },
    { label: "Compliance", value: "HIPAA", icon: Shield, color: "#F59E0B" },
  ],
  SaaSify: [
    { label: "Bundle Size", value: "35%↓", icon: Zap, color: "#10B981" },
    { label: "Component Lib", value: "5+ Teams", icon: Code2, color: "#3B82F6" },
    { label: "Real-time Viz", value: "D3.js", icon: BarChart3, color: "#8B5CF6" },
    { label: "Performance", value: "A+ Grade", icon: Award, color: "#F59E0B" },
  ],
}

function PremiumTimelineNode({ index, isActive }: { index: number; isActive: boolean }) {
  return (
    <div className="absolute left-6 top-16 -translate-x-1/2 flex flex-col items-center md:left-8">
      {/* Animated timeline line */}
      <div
        className="absolute top-8 w-0.5 h-full transition-all duration-1000"
        style={{
          background: isActive
            ? "linear-gradient(to bottom, var(--primary), var(--primary)60, transparent)"
            : "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.1), transparent)",
        }}
      />

      {/* Premium node */}
      <div
        className={cn(
          "relative z-10 w-4 h-4 rounded-full transition-all duration-500",
          "ring-4 ring-background shadow-lg",
          isActive ? "scale-125" : "scale-100",
        )}
        style={{
          background: isActive
            ? `linear-gradient(135deg, var(--primary), var(--primary)90)`
            : "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
          boxShadow: isActive ? `0 0 20px var(--primary)40` : "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        {/* Pulse animation for active node */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: "var(--primary)", opacity: 0.4 }}
          />
        )}
      </div>

      {/* Position indicator */}
      <div
        className="mt-2 text-xs font-bold px-2 py-1 rounded-full"
        style={{
          backgroundColor: isActive ? "var(--primary)" : "rgba(255,255,255,0.2)",
          color: isActive ? "white" : "var(--fg-secondary)",
        }}
      >
        {index + 1}
      </div>
    </div>
  )
}

function PremiumCompanyCard({
  item,
  index,
  onOpenModal,
  inView,
}: {
  item: (typeof experience)[0]
  index: number
  onOpenModal: () => void
  inView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const bannerSrc = BANNERS[index % BANNERS.length]
  const fallbackLogo = GENERIC_LOGOS[index % GENERIC_LOGOS.length]
  const companyColors = COMPANY_COLORS[item.company as keyof typeof COMPANY_COLORS] || COMPANY_COLORS["ACME FinTech"]
  const metrics = IMPACT_METRICS[item.company as keyof typeof IMPACT_METRICS] || IMPACT_METRICS["ACME FinTech"]

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl backdrop-blur-md transition-all duration-700",
        "ml-12 md:ml-16 mb-12",
        inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
      )}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: isHovered ? `0 30px 60px -12px ${companyColors.primary}20` : "0 20px 40px -10px rgba(0,0,0,0.1)",
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transitionDelay: `${index * 150}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Premium gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${companyColors.primary}08, ${companyColors.secondary}15)`,
        }}
      />

      {/* Hero banner with overlay */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <Image
          src={bannerSrc || "/placeholder.svg"}
          alt={`${item.company} workspace`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 800px"
          priority={index === 0}
        />

        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Company logo badge */}
        <div className="absolute top-6 left-6">
          <div
            className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-white/20 backdrop-blur-md"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <Image
              src={item.logoSrc || fallbackLogo}
              alt={item.logoAlt ?? `${item.company} logo`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Status indicators */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-white">Active</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10">
            <Crown className="w-3 h-3 text-yellow-400" />
            <span className="text-xs font-medium text-white">Senior</span>
          </div>
        </div>

        {/* Company info overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.role}</h3>
              <div className="flex items-center gap-3 text-white/90">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span className="font-semibold">{item.company}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/50" />
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{item.period}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={onOpenModal}
              size="sm"
              className="rounded-full px-4 py-2 font-medium backdrop-blur-md transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${companyColors.primary}, ${companyColors.secondary})`,
                color: "white",
                boxShadow: `0 8px 25px -5px ${companyColors.primary}40`,
              }}
            >
              <Play className="w-4 h-4 mr-2" />
              Case Study
            </Button>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-8 relative z-10">
        {/* Impact metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="text-center p-4 rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{
                  background: `linear-gradient(135deg, ${metric.color}, ${metric.color}90)`,
                  boxShadow: `0 4px 12px ${metric.color}30`,
                }}
              >
                <metric.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-lg font-bold" style={{ color: metric.color }}>
                {metric.value}
              </div>
              <div className="text-xs opacity-75" style={{ color: "var(--fg-secondary)" }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Key achievements */}
        <div className="mb-8">
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--fg)" }}>
            <Award className="w-5 h-5" style={{ color: companyColors.primary }} />
            Key Achievements
          </h4>
          <div className="grid gap-3 md:grid-cols-2">
            {item.highlights.slice(0, 4).map((highlight, i) => (
              <div key={i} className="flex items-start gap-3 group/item">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${companyColors.primary}20, ${companyColors.secondary}10)`,
                    border: `1px solid ${companyColors.primary}30`,
                  }}
                >
                  <CheckCircle2 className="w-3 h-3" style={{ color: companyColors.primary }} />
                </div>
                <span
                  className="text-sm leading-relaxed group-hover/item:text-opacity-100 transition-opacity"
                  style={{ color: "var(--fg-secondary)" }}
                >
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology stack */}
        <div className="mb-8">
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--fg)" }}>
            <Code2 className="w-5 h-5" style={{ color: companyColors.primary }} />
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((tech) => (
              <Badge
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-full border-0 transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${companyColors.primary}15, ${companyColors.secondary}10)`,
                  color: companyColors.primary,
                  border: `1px solid ${companyColors.primary}20`,
                }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <Button
              onClick={onOpenModal}
              className="rounded-full px-6 py-2 font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${companyColors.primary}, ${companyColors.secondary})`,
                color: "white",
                boxShadow: `0 8px 25px -5px ${companyColors.primary}40`,
              }}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Full Case Study
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-4 py-2 font-medium bg-transparent"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                color: "var(--fg)",
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Related Projects
            </Button>
          </div>

          <ChevronRight
            className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
            style={{ color: companyColors.primary }}
          />
        </div>
      </div>
    </article>
  )
}

function PremiumExperienceModal({
  item,
  index,
  isOpen,
  onClose,
}: {
  item: (typeof experience)[0] | null
  index: number
  isOpen: boolean
  onClose: () => void
}) {
  if (!item) return null

  const bannerSrc = BANNERS[index % BANNERS.length]
  const companyColors = COMPANY_COLORS[item.company as keyof typeof COMPANY_COLORS] || COMPANY_COLORS["ACME FinTech"]
  const metrics = IMPACT_METRICS[item.company as keyof typeof IMPACT_METRICS] || IMPACT_METRICS["ACME FinTech"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl rounded-3xl border-0 p-0 overflow-hidden">
        <div className="relative">
          {/* Hero section */}
          <div className="relative h-80 w-full">
            <Image
              src={bannerSrc || "/placeholder.svg"}
              alt={`${item.company} case study`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Header content */}
            <div className="absolute bottom-8 left-8 right-8">
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-white/20"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <Image
                      src={item.logoSrc || GENERIC_LOGOS[index % GENERIC_LOGOS.length]}
                      alt={`${item.company} logo`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-3xl font-bold text-white mb-2">
                      {item.role} — {item.company}
                    </DialogTitle>
                    <div className="flex items-center gap-4 text-white/90">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Remote / San Francisco</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Impact metrics showcase */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: "var(--fg)" }}>
                <BarChart3 className="w-6 h-6" style={{ color: companyColors.primary }} />
                Business Impact & Results
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.map((metric, i) => (
                  <div
                    key={metric.label}
                    className="text-center p-6 rounded-3xl backdrop-blur-md transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${metric.color}10, ${metric.color}05)`,
                      border: `1px solid ${metric.color}20`,
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${metric.color}, ${metric.color}90)`,
                        boxShadow: `0 8px 25px -5px ${metric.color}40`,
                      }}
                    >
                      <metric.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-2xl font-bold mb-2" style={{ color: metric.color }}>
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Detailed achievements */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: "var(--fg)" }}>
                  <Award className="w-6 h-6" style={{ color: companyColors.primary }} />
                  Key Achievements
                </h3>
                <div className="space-y-4">
                  {item.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                        style={{
                          background: `linear-gradient(135deg, ${companyColors.primary}, ${companyColors.secondary})`,
                          boxShadow: `0 4px 12px ${companyColors.primary}30`,
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-base leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
                          {highlight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology deep dive */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: "var(--fg)" }}>
                  <Code2 className="w-6 h-6" style={{ color: companyColors.primary }} />
                  Technology Stack
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {item.tech.map((tech) => (
                      <Badge
                        key={tech}
                        className="px-4 py-2 text-sm font-semibold rounded-full border-0 transition-all duration-300 hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${companyColors.primary}20, ${companyColors.secondary}15)`,
                          color: companyColors.primary,
                          border: `1px solid ${companyColors.primary}30`,
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Additional context */}
                  <div
                    className="p-6 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${companyColors.primary}08, ${companyColors.secondary}05)`,
                      border: `1px solid ${companyColors.primary}15`,
                    }}
                  >
                    <h4 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--fg)" }}>
                      <Target className="w-5 h-5" style={{ color: companyColors.primary }} />
                      Technical Leadership
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
                      Led architectural decisions, mentored junior developers, established coding standards, and drove
                      technical excellence across the engineering organization. Collaborated with product and design
                      teams to deliver user-centric solutions at scale.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 py-3 font-bold transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${companyColors.primary}, ${companyColors.secondary})`,
                    color: "white",
                    boxShadow: `0 10px 25px -5px ${companyColors.primary}40`,
                  }}
                >
                  <a href="#contact" className="flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    <span>Discuss Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6 py-3 font-semibold bg-transparent"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    color: "var(--fg)",
                  }}
                >
                  <a href="#projects" className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>View Related Projects</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ExperienceSection() {
  const { customization } = useCustomization()
  const [activeModal, setActiveModal] = useState<{ item: (typeof experience)[0]; index: number } | null>(null)
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)

  // Intersection observer for animations
  useEffect(() => {
    if (!elementRef.current) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting && !inView) {
          setInView(true)
          observerRef.current?.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    observerRef.current.observe(elementRef.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [inView])

  // Calculate career stats
  const careerStats = useMemo(() => {
    const totalYears = 7 // Based on experience data
    const companiesWorked = experience.length
    const totalProjects = 150 // From achievements data
    const teamSize = 8 // Maximum team size led

    return [
      {
        label: "Years Experience",
        value: `${totalYears}+`,
        icon: Clock,
        color: "#3B82F6",
        description: "Senior-level expertise",
      },
      {
        label: "Companies",
        value: companiesWorked,
        icon: Building2,
        color: "#10B981",
        description: "Enterprise clients",
      },
      {
        label: "Projects Delivered",
        value: `${totalProjects}+`,
        icon: Rocket,
        color: "#8B5CF6",
        description: "End-to-end solutions",
      },
      {
        label: "Team Leadership",
        value: `${teamSize}+`,
        icon: Users,
        color: "#F59E0B",
        description: "Engineers mentored",
      },
    ]
  }, [])

  return (
    <section
      id="experience"
      className={cn(
        "container mx-auto px-4 relative overflow-hidden",
        customization.spacing === "compact"
          ? "py-16"
          : customization.spacing === "comfortable"
            ? "py-20 md:py-28"
            : "py-28 md:py-36",
      )}
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10" ref={elementRef}>
        {/* Premium header */}
        <header className="text-center mb-16 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Briefcase className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <Crown className="w-8 h-8 text-purple-500" />
          </div>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium"
            style={{ color: "var(--fg-secondary)" }}
          >
            A proven track record of{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              delivering enterprise-grade solutions
            </span>{" "}
            across fintech, healthcare, and SaaS industries.
            <span className="block mt-2 text-base opacity-80">
              Each role represents significant business impact and technical leadership growth.
            </span>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-6" />
        </header>

        {/* Career stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          {careerStats.map((stat, index) => (
            <div
              key={stat.label}
              className="group text-center p-6 rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-105 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}90)`,
                    boxShadow: `0 8px 25px -5px ${stat.color}40`,
                  }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: "var(--fg)" }}>
                  {stat.label}
                </div>
                <div className="text-xs opacity-75" style={{ color: "var(--fg-secondary)" }}>
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline background */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 md:left-8"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          />

          {/* Experience cards */}
          <div className="space-y-0">
            {experience.map((item, index) => (
              <div key={`${item.company}-${index}`} className="relative">
                <PremiumTimelineNode index={index} isActive={inView} />
                <PremiumCompanyCard
                  item={item}
                  index={index}
                  onOpenModal={() => setActiveModal({ item, index })}
                  inView={inView}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Premium call-to-action */}
        <div className="text-center mt-16">
          <div
            className="inline-flex items-center gap-6 px-8 py-4 rounded-full relative overflow-hidden backdrop-blur-md"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.2)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 animate-pulse" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-3 h-3 rounded-full animate-pulse bg-green-500" />
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-base font-semibold" style={{ color: "var(--fg)" }}>
                Ready to add similar results to your team?
              </span>
            </div>
            <div className="w-px h-6" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
            <div className="flex items-center gap-2 relative z-10">
              <Target className="w-4 h-4" style={{ color: "var(--primary)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--fg-secondary)" }}>
                Let's discuss your next challenge
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium modal */}
      <PremiumExperienceModal
        item={activeModal?.item || null}
        index={activeModal?.index || 0}
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
      />
    </section>
  )
}
