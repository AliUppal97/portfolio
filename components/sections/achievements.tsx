"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import {
  BadgeCheck,
  Briefcase,
  DollarSign,
  Award,
  Trophy,
  Star,
  Rocket,
  TrendingUp,
  Users,
  Clock,
  Target,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useCustomization } from "@/components/providers/customization-provider"
import { Badge } from "@/components/ui/badge"

type Metric = {
  title: string
  value: string // fallback display
  sub?: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  // Count-up configuration (optional)
  countTo?: number
  prefix?: string
  suffix?: string
  decimals?: number
  // Optional brand color for badges
  brandColor?: string
  category?: "primary" | "success" | "warning" | "info"
}

function CountUp({
  to,
  duration = 1200,
  prefix = "",
  suffix = "",
  decimals = 0,
  start = false,
}: {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  start?: boolean
}) {
  const [val, setVal] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startTsRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return

    // Reset when re-entering view
    startTsRef.current = null
    setVal(0)

    const step = (ts: number) => {
      if (!startTsRef.current) startTsRef.current = ts
      const progress = Math.min(1, (ts - startTsRef.current) / duration)
      // Smooth easing function for premium feel
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(to * eased)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [to, duration, start])

  const formatted = useMemo(() => {
    const n = Number.isFinite(val) ? val : 0
    return `${prefix}${n.toFixed(decimals)}${suffix}`
  }, [val, prefix, suffix, decimals])

  return <span className="tabular-nums font-bold">{formatted}</span>
}

function MetricCard({ m, i, delay = 0 }: { m: Metric; i: number; delay?: number }) {
  const Icon = m.icon
  const [inView, setInView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)

  // Enhanced intersection observer with staggered animations
  useEffect(() => {
    if (!elementRef.current) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting && !inView) {
          // Staggered animation delay
          setTimeout(() => {
            setInView(true)
          }, delay * 150)
          observerRef.current?.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -5% 0px",
      },
    )

    observerRef.current.observe(elementRef.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [inView, delay])

  // Premium hover handlers with smooth transitions
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  // Category-based styling
  const getCategoryStyles = (category?: string) => {
    switch (category) {
      case "success":
        return {
          iconBg:
            "linear-gradient(135deg, var(--text-success), color-mix(in oklab, var(--text-success), transparent 20%))",
          iconColor: "#ffffff",
          accentColor: "var(--text-success)",
        }
      case "warning":
        return {
          iconBg:
            "linear-gradient(135deg, var(--text-warning), color-mix(in oklab, var(--text-warning), transparent 20%))",
          iconColor: "#ffffff",
          accentColor: "var(--text-warning)",
        }
      case "info":
        return {
          iconBg: "linear-gradient(135deg, var(--text-info), color-mix(in oklab, var(--text-info), transparent 20%))",
          iconColor: "#ffffff",
          accentColor: "var(--text-info)",
        }
      default:
        return {
          iconBg: "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary), transparent 20%))",
          iconColor: "#ffffff",
          accentColor: "var(--primary)",
        }
    }
  }

  const categoryStyles = getCategoryStyles(m.category)

  return (
    <div
      ref={elementRef}
      className={cn(
        "group h-full transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      {/* Premium glass morphism card with enhanced shadows */}
      <div
        className={cn(
          "h-full rounded-3xl transition-all duration-300 ease-out flex flex-col relative overflow-hidden",
          "backdrop-blur-xl border border-opacity-20",
          isHovered ? "scale-[1.02] -translate-y-2" : "scale-100 translate-y-0",
        )}
        style={{
          background: `linear-gradient(135deg, 
            color-mix(in oklab, var(--card), transparent 5%) 0%, 
            color-mix(in oklab, var(--surface), transparent 10%) 100%)`,
          borderColor: "color-mix(in oklab, var(--border), transparent 30%)",
          boxShadow: isHovered
            ? `0 25px 50px -12px color-mix(in oklab, ${categoryStyles.accentColor}, transparent 70%), var(--shadow-4)`
            : "var(--shadow-2)",
          minHeight: "180px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle gradient overlay for depth */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${categoryStyles.accentColor}, transparent 70%)`,
          }}
        />

        {/* Premium accent border on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-3xl transition-opacity duration-300 pointer-events-none",
            isHovered ? "opacity-100" : "opacity-0",
          )}
          style={{
            background: `linear-gradient(135deg, ${categoryStyles.accentColor}, transparent)`,
            padding: "1px",
          }}
        >
          <div className="w-full h-full rounded-3xl" style={{ backgroundColor: "var(--card)" }} />
        </div>

        <div className="p-8 flex-1 flex flex-col justify-between relative z-10">
          <div className="flex items-start gap-6">
            {/* Clean icon container - matching Professional Toolkit style */}
            <div
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl shrink-0 transition-all duration-300 relative overflow-hidden",
                isHovered ? "scale-110" : "scale-100",
              )}
              style={{
                background: categoryStyles.iconBg,
                boxShadow: `0 4px 14px -2px color-mix(in oklab, ${categoryStyles.accentColor}, transparent 65%)`,
              }}
            >
              <Icon
                className="h-8 w-8 relative z-10 transition-transform duration-300"
                style={{ color: categoryStyles.iconColor, strokeWidth: 2.5 }}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              {/* Premium number display with enhanced typography */}
              <div
                className={cn(
                  "text-4xl font-bold leading-none tracking-tight transition-all duration-300",
                  isHovered ? "scale-105" : "scale-100",
                )}
                style={{ color: "var(--text-primary)" }}
              >
                {typeof m.countTo === "number" ? (
                  <CountUp
                    to={m.countTo}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    decimals={m.decimals ?? 0}
                    start={inView}
                    duration={1200 + delay * 200}
                  />
                ) : (
                  m.value
                )}
              </div>

              {/* Enhanced title with premium typography */}
              <div className="font-semibold text-lg leading-tight" style={{ color: "var(--text-primary)" }}>
                {m.title}
              </div>

              {/* Refined subtitle with proper hierarchy */}
              {m.sub && (
                <div className="text-sm leading-relaxed font-medium" style={{ color: "var(--text-tertiary)" }}>
                  {m.sub}
                </div>
              )}
            </div>
          </div>

          {/* Premium progress indicator */}
          <div className="mt-6 pt-4 border-t border-opacity-10" style={{ borderColor: "var(--border)" }}>
            <div
              className={cn("h-1 rounded-full transition-all duration-1000 ease-out", inView ? "w-full" : "w-0")}
              style={{
                background: `linear-gradient(90deg, ${categoryStyles.accentColor}, color-mix(in oklab, ${categoryStyles.accentColor}, transparent 40%))`,
                transitionDelay: `${delay * 150 + 500}ms`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function PlatformBadge({
  title,
  color,
  icon: Icon,
}: {
  title: string
  color: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}) {
  return (
    <div className="text-center group">
      <Badge
        className={cn(
          "px-6 py-3 text-sm font-semibold shadow-lg rounded-2xl border-0 transition-all duration-300",
          "hover:scale-105 hover:-translate-y-1",
        )}
        style={{
          backgroundColor: color,
          color: "#ffffff",
          boxShadow: `0 4px 15px color-mix(in oklab, ${color}, transparent 60%)`,
        }}
      >
        <Icon className="h-4 w-4 mr-2" />
        {title}
      </Badge>
    </div>
  )
}

export function AchievementsSection() {
  const { customization } = useCustomization()

  // Enhanced brand colors with better contrast
  const upwork = "#14a800"
  const fiverr = "#1dbf73"
  const freelancer = "#0e74bc"

  const overall: Metric[] = [
    {
      title: "Projects Delivered",
      value: "150+",
      countTo: 150,
      suffix: "+",
      icon: Briefcase,
      sub: "End‑to‑end solutions",
      category: "primary",
    },
    {
      title: "Success Rate",
      value: "100%",
      countTo: 100,
      suffix: "%",
      icon: BadgeCheck,
      sub: "Perfect delivery record",
      category: "success",
    },
    {
      title: "Client Revenue Impact",
      value: "$2.5M+",
      prefix: "$",
      countTo: 2.5,
      suffix: "M+",
      icon: TrendingUp,
      sub: "Direct business growth",
      category: "warning",
    },
    {
      title: "Years of Excellence",
      value: "4+",
      countTo: 4,
      suffix: "+",
      icon: Rocket,
      sub: "Senior‑level expertise",
      category: "info",
    },
  ]

  const upworkMetrics: Metric[] = [
    {
      title: "Top Rated Plus",
      value: "Elite Status",
      icon: Award,
      sub: "Top 3% of talent",
      brandColor: upwork,
      category: "success",
    },
    {
      title: "Job Success Score",
      value: "100%",
      countTo: 100,
      suffix: "%",
      icon: Target,
      sub: "Perfect completion rate",
      brandColor: upwork,
      category: "success",
    },
    {
      title: "Total Earned",
      value: "$250K+",
      prefix: "$",
      countTo: 250,
      suffix: "K+",
      icon: DollarSign,
      sub: "Platform earnings",
      brandColor: upwork,
      category: "warning",
    },
    {
      title: "Client Satisfaction",
      value: "5.0★",
      countTo: 5.0,
      suffix: "★",
      decimals: 1,
      icon: Star,
      sub: "Average rating",
      brandColor: upwork,
      category: "warning",
    },
  ]

  const fiverrMetrics: Metric[] = [
    {
      title: "Level 2 Seller",
      value: "Premium Status",
      icon: Trophy,
      sub: "Elite seller badge",
      brandColor: fiverr,
      category: "success",
    },
    {
      title: "Customer Rating",
      value: "4.9★",
      countTo: 4.9,
      suffix: "★",
      decimals: 1,
      icon: Star,
      sub: "Exceptional reviews",
      brandColor: fiverr,
      category: "warning",
    },
    {
      title: "Revenue Generated",
      value: "$180K+",
      prefix: "$",
      countTo: 180,
      suffix: "K+",
      icon: DollarSign,
      sub: "Marketplace success",
      brandColor: fiverr,
      category: "warning",
    },
    {
      title: "Response Time",
      value: "<1hr",
      icon: Clock,
      sub: "Lightning fast",
      brandColor: fiverr,
      category: "info",
    },
  ]

  return (
    <section
      id="achievements"
      className={cn(
        "relative overflow-hidden",
        customization.spacing === "compact" ? "py-20" : customization.spacing === "comfortable" ? "py-28" : "py-36",
      )}
    >
      {/* Premium background with subtle patterns */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, color-mix(in oklab, var(--primary), transparent 95%) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, color-mix(in oklab, var(--text-info), transparent 95%) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Premium section header with enhanced typography */}
        <header className="text-center mb-20 max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Premium badge */}
            <div className="flex justify-center">
              <Badge
                className="px-4 py-2 text-xs font-medium rounded-full border-0 backdrop-blur-sm"
                style={{
                  backgroundColor: "color-mix(in oklab, var(--primary), transparent 85%)",
                  color: "var(--primary)",
                }}
              >
                <Zap className="h-3 w-3 mr-1" />
                PROVEN RESULTS
              </Badge>
            </div>

            {/* Main heading with gradient effect */}
            <h2
              className="text-5xl md:text-6xl font-bold tracking-tight leading-tight"
              style={{
                background: `linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Delivering Excellence
            </h2>

            {/* Enhanced subtitle */}
            <p
              className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Real metrics from client work and top-tier marketplaces —
              <span style={{ color: "var(--text-primary)" }}> credibility you can trust</span>
            </p>
          </div>
        </header>

        {/* Enhanced layout with better spacing */}
        <div className="max-w-8xl mx-auto space-y-24">
          {/* Overall highlights with staggered animations */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {overall.map((m, i) => (
              <MetricCard key={m.title} m={m} i={i} delay={i} />
            ))}
          </div>

          {/* Platform sections with enhanced design */}
          <div className="grid gap-20 lg:grid-cols-2">
            {/* Upwork Section */}
            <div className="space-y-10">
              <PlatformBadge title="Upwork Performance" color={upwork} icon={Users} />
              <div className="grid gap-8 sm:grid-cols-2">
                {upworkMetrics.map((m, i) => (
                  <MetricCard key={`upwork-${m.title}`} m={m} i={i} delay={i + 4} />
                ))}
              </div>
            </div>

            {/* Fiverr Section */}
            <div className="space-y-10">
              <PlatformBadge title="Fiverr Excellence" color={fiverr} icon={Trophy} />
              <div className="grid gap-8 sm:grid-cols-2">
                {fiverrMetrics.map((m, i) => (
                  <MetricCard key={`fiverr-${m.title}`} m={m} i={i} delay={i + 8} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Premium call-to-action */}
        <div className="text-center mt-20">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "color-mix(in oklab, var(--surface), transparent 20%)",
              color: "var(--text-secondary)",
              border: "1px solid color-mix(in oklab, var(--border), transparent 50%)",
            }}
          >
            <Star className="h-4 w-4" style={{ color: "var(--text-warning)" }} />
            Ready to deliver similar results for your project
          </div>
        </div>
      </div>
    </section>
  )
}
