"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useMemo, useState, useCallback, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useCustomization } from "@/components/providers/customization-provider"
import { technologies } from "@/lib/data"
import type { TechnologyItem } from "@/lib/types"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  Code2,
  Palette,
  Server,
  Database,
  Cloud,
  Settings,
  Sparkles,
  Award,
  TrendingUp,
  Zap,
  Crown,
  Star,
  Target,
  Layers,
  Shield,
  Rocket,
  BarChart3,
  Layout,
  FileCode,
  Terminal,
  Container,
  HardDrive,
  GitBranch,
  Cpu,
  Box,
  Figma,
  Send,
  type LucideIcon,
} from "lucide-react"

// Clean Lucide icons for all technologies - no backgrounds, crisp SVG
const techIcons: Record<string, LucideIcon> = {
  React: Layers,
  "Next.js": Layout,
  TypeScript: FileCode,
  JavaScript: Code2,
  "Tailwind CSS": Palette,
  "Node.js": Terminal,
  Python: Code2,
  Prisma: Database,
  PostgreSQL: Database,
  MySQL: Database,
  MongoDB: Database,
  Redis: HardDrive,
  AWS: Cloud,
  Docker: Container,
  Vercel: Cloud,
  Git: GitBranch,
  GitHub: GitBranch,
  OpenAI: Sparkles,
  Figma: Figma,
  Stripe: Send,
  GraphQL: GitBranch,
  Kubernetes: Cpu,
}

const categoryIcons = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Cloud: Cloud,
  DevOps: Settings,
  AI: Sparkles,
  Design: Palette,
}

const categoryColors = {
  Frontend: {
    primary: "#3B82F6",
    secondary: "#60A5FA",
    gradient: "from-blue-500 to-cyan-500",
    bg: "rgba(59, 130, 246, 0.1)",
  },
  Backend: {
    primary: "#10B981",
    secondary: "#34D399",
    gradient: "from-green-500 to-emerald-500",
    bg: "rgba(16, 185, 129, 0.1)",
  },
  Database: {
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    gradient: "from-purple-500 to-violet-500",
    bg: "rgba(139, 92, 246, 0.1)",
  },
  Cloud: {
    primary: "#F59E0B",
    secondary: "#FBBF24",
    gradient: "from-amber-500 to-orange-500",
    bg: "rgba(245, 158, 11, 0.1)",
  },
  DevOps: {
    primary: "#EF4444",
    secondary: "#F87171",
    gradient: "from-red-500 to-pink-500",
    bg: "rgba(239, 68, 68, 0.1)",
  },
  AI: {
    primary: "#EC4899",
    secondary: "#F472B6",
    gradient: "from-pink-500 to-rose-500",
    bg: "rgba(236, 72, 153, 0.1)",
  },
  Design: {
    primary: "#06B6D4",
    secondary: "#22D3EE",
    gradient: "from-cyan-500 to-teal-500",
    bg: "rgba(6, 182, 212, 0.1)",
  },
}

// Premium brand colors for each technology
const techBrandColors: Record<string, { primary: string; secondary: string }> = {
  React: { primary: "#61DAFB", secondary: "#087EA4" },
  "Next.js": { primary: "#000000", secondary: "#333333" },
  TypeScript: { primary: "#3178C6", secondary: "#5B9BD5" },
  JavaScript: { primary: "#F7DF1E", secondary: "#D4C01B" },
  "Tailwind CSS": { primary: "#06B6D4", secondary: "#38BDF8" },
  "Node.js": { primary: "#339933", secondary: "#68BB59" },
  Python: { primary: "#3776AB", secondary: "#FFD43B" },
  Prisma: { primary: "#2D3748", secondary: "#4A5568" },
  PostgreSQL: { primary: "#336791", secondary: "#4A90A4" },
  MySQL: { primary: "#4479A1", secondary: "#F29111" },
  MongoDB: { primary: "#47A248", secondary: "#68BB59" },
  Redis: { primary: "#DC382D", secondary: "#F44336" },
  AWS: { primary: "#FF9900", secondary: "#232F3E" },
  Docker: { primary: "#2496ED", secondary: "#0085D1" },
  Vercel: { primary: "#000000", secondary: "#333333" },
  Git: { primary: "#F05032", secondary: "#E94E32" },
  GitHub: { primary: "#238636", secondary: "#2EA043" },
  OpenAI: { primary: "#10A37F", secondary: "#1A7F5A" },
  Figma: { primary: "#F24E1E", secondary: "#A259FF" },
  Stripe: { primary: "#635BFF", secondary: "#8B83FF" },
  GraphQL: { primary: "#E10098", secondary: "#F48FB1" },
  Kubernetes: { primary: "#326CE5", secondary: "#5B9BD5" },
}

function TechIcon({ name, size = 24, color }: { name: string; size?: number; color?: string }) {
  const Icon = techIcons[name] || Code2
  const brandColor = techBrandColors[name]?.primary || color || "#6B7280"
  return (
    <Icon
      className="transition-all duration-300 relative z-10"
      style={{
        width: size,
        height: size,
        color: brandColor,
        strokeWidth: 2,
      }}
    />
  )
}

function ExperienceIndicator({ years, color, lightBg = false }: { years: number; color: string; lightBg?: boolean }) {
  const dots = Math.min(years, 5)
  const getProficiencyLevel = (years: number) => {
    if (years >= 5) return { label: "Expert", icon: Crown }
    if (years >= 3) return { label: "Advanced", icon: Award }
    if (years >= 2) return { label: "Proficient", icon: Star }
    return { label: "Learning", icon: Target }
  }

  const { label, icon: Icon } = getProficiencyLevel(years)
  // Use appropriate inactive color based on background
  const inactiveColor = lightBg ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.2)"

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="h-2 w-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: idx < dots ? color : inactiveColor,
              boxShadow: idx < dots ? `0 0 6px ${color}50` : "none",
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" style={{ color, strokeWidth: 2 }} />
        <span className="text-xs font-semibold" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  )
}

const defaultColors = {
  primary: "#6B7280",
  secondary: "#9CA3AF",
  gradient: "from-gray-500 to-gray-400",
  bg: "rgba(107, 114, 128, 0.1)",
}

function PremiumTechCard({ item, index, inView }: { item: TechnologyItem; index: number; inView: boolean }) {
  const colors = categoryColors[item.category as keyof typeof categoryColors] ?? defaultColors
  const CategoryIcon = categoryIcons[item.category as keyof typeof categoryIcons] ?? Code2
  const primaryColor = colors.primary

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      requestAnimationFrame(() => {
        if (e.currentTarget) {
          e.currentTarget.style.boxShadow = `0 25px 50px -12px ${primaryColor}30`
          e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"
        }
      })
    },
    [primaryColor],
  )

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      if (e.currentTarget) {
        e.currentTarget.style.boxShadow = "0 15px 35px -5px rgba(0,0,0,0.1)"
        e.currentTarget.style.transform = "translateY(0px) scale(1)"
      }
    })
  }, [])

  return (
    <HoverCard openDelay={300} closeDelay={150}>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            "group relative overflow-hidden rounded-3xl backdrop-blur-md transition-all duration-500 cursor-pointer",
            "p-6 h-full flex flex-col justify-between",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 15px 35px -5px rgba(0,0,0,0.1)",
            transitionDelay: `${index * 50}ms`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="button"
          tabIndex={0}
          aria-label={`${item.name} technology`}
          data-interactive="true"
        >
          {/* Clean gradient overlay - matching Professional Toolkit style */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(160deg, ${colors.primary}05 0%, ${colors.secondary}08 100%)`,
            }}
          />

          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
              <CategoryIcon className="w-4 h-4" style={{ color: colors.primary }} />
            </div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
            {/* Tech icon and name - Clean icon container like Professional Toolkit */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${techBrandColors[item.name]?.primary || colors.primary}12, ${techBrandColors[item.name]?.secondary || colors.secondary}18)`,
                  border: `1px solid ${techBrandColors[item.name]?.primary || colors.primary}15`,
                  boxShadow: `0 4px 14px -2px ${techBrandColors[item.name]?.primary || colors.primary}25`,
                }}
              >
                <TechIcon name={item.name} size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold leading-tight mb-1" style={{ color: "var(--fg)" }}>
                  {item.name}
                </h3>
                <p className="text-sm opacity-75" style={{ color: "var(--fg-secondary)" }}>
                  {item.category}
                </p>
              </div>
            </div>

            {/* Experience and proficiency */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "var(--fg-secondary)" }}>
                  Experience
                </span>
                <span className="text-sm font-bold" style={{ color: colors.primary }}>
                  {item.yearsLabel}
                </span>
              </div>
              <ExperienceIndicator years={item.years} color={colors.primary} />
            </div>

            {/* Description preview */}
            <p className="text-sm leading-relaxed opacity-90 line-clamp-2" style={{ color: "var(--fg-secondary)" }}>
              {item.description}
            </p>

            {/* Premium footer */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-500">Production Ready</span>
              </div>
              <Rocket
                className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ color: colors.primary }}
              />
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className="z-50 w-80 rounded-3xl border-0 p-5"
        style={{
          background: "linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: `0 25px 50px -12px ${colors.primary}30, 0 0 0 1px rgba(0,0,0,0.06)`,
        }}
        align="center"
        side="top"
        sideOffset={8}
        avoidCollisions={true}
        sticky="partial"
      >
        <PremiumTechDetails item={item} colors={colors} />
      </HoverCardContent>
    </HoverCard>
  )
}

function PremiumTechDetails({ item, colors }: { item: TechnologyItem; colors: any }) {
  const CategoryIcon = categoryIcons[item.category as keyof typeof categoryIcons]
  const brandColor = techBrandColors[item.name] || { primary: colors.primary, secondary: colors.secondary }

  // High contrast colors for the light popover background
  const textPrimary = "#0f172a" // slate-900 for maximum contrast
  const textSecondary = "#475569" // slate-600 for secondary text
  
  // Ensure icon color has enough contrast (darken if needed for light colors)
  const ensureContrast = (color: string) => {
    // For very light colors like yellow, use the secondary or category color
    const lightColors = ["#F7DF1E", "#FBBF24", "#FFD43B", "#FCD34D"]
    if (lightColors.some(c => color.toUpperCase().includes(c.slice(1).toUpperCase()))) {
      return colors.primary
    }
    return color
  }
  const iconColor = ensureContrast(brandColor.primary)

  return (
    <div className="space-y-4">
      {/* Header - Premium icon container with high contrast */}
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${brandColor.primary}, ${brandColor.secondary || brandColor.primary})`,
            boxShadow: `0 6px 20px -4px ${brandColor.primary}50`,
          }}
        >
          <TechIcon name={item.name} size={28} color="#ffffff" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-lg leading-tight" style={{ color: textPrimary }}>
            {item.name}
          </h4>
          {/* Category badge with icon container for better contrast */}
          <div 
            className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-lg"
            style={{ 
              backgroundColor: `${colors.primary}12`,
              border: `1px solid ${colors.primary}20`,
            }}
          >
            <CategoryIcon className="w-3.5 h-3.5" style={{ color: colors.primary, strokeWidth: 2.5 }} />
            <span className="text-xs font-bold" style={{ color: colors.primary }}>
              {item.category}
            </span>
          </div>
        </div>
      </div>

      {/* Description with high contrast */}
      <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>
        {item.description}
      </p>

      {/* Experience details with improved layout */}
      <div className="space-y-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: textSecondary }}>
            Years of Experience
          </span>
          <span className="text-lg font-bold" style={{ color: iconColor }}>
            {item.yearsLabel}
          </span>
        </div>
        <ExperienceIndicator years={item.years} color={iconColor} lightBg={true} />
      </div>

      {/* Status indicators with icon containers for better contrast */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ backgroundColor: "rgba(16, 185, 129, 0.12)" }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500" style={{ boxShadow: "0 0 6px rgba(16, 185, 129, 0.6)" }} />
          </div>
          <span className="text-xs font-bold text-emerald-600">Production Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ backgroundColor: `${iconColor}12` }}
          >
            <Award className="w-3.5 h-3.5" style={{ color: iconColor, strokeWidth: 2.5 }} />
          </div>
          <span className="text-xs font-bold" style={{ color: iconColor }}>
            Enterprise Grade
          </span>
        </div>
      </div>
    </div>
  )
}

type Category = "All" | "Frontend" | "Backend" | "Database" | "Cloud" | "DevOps" | "AI" | "Design"

export function TechnologiesSection() {
  const { customization } = useCustomization()
  const [active, setActive] = useState<Category>("All")
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)

  const counts = useMemo(() => {
    const base: Record<Category, number> = {
      All: technologies.length,
      Frontend: 0,
      Backend: 0,
      Database: 0,
      Cloud: 0,
      DevOps: 0,
      AI: 0,
      Design: 0,
    }
    technologies.forEach((t) => {
      base[t.category as Exclude<Category, "All">] += 1
    })
    return base
  }, [])

  const filters: Category[] = ["All", "Frontend", "Backend", "Database", "Cloud", "DevOps", "AI", "Design"]
  const list = useMemo(() => {
    const arr = active === "All" ? technologies : technologies.filter((t) => t.category === active)
    return [...arr].sort((a, b) => (b.years ?? 0) - (a.years ?? 0) || a.name.localeCompare(b.name))
  }, [active])

  // Calculate stats
  const stats = useMemo(() => {
    const expertTechs = technologies.filter((t) => t.years >= 5).length
    const avgYears = Math.round(technologies.reduce((acc, t) => acc + t.years, 0) / technologies.length)
    const categories = filters.length - 1

    return [
      {
        label: "Technologies",
        value: technologies.length,
        icon: BarChart3,
        color: "#3B82F6",
        description: "Production-ready stack",
      },
      {
        label: "Expert Level",
        value: expertTechs,
        icon: Crown,
        color: "#F59E0B",
        description: "5+ years mastery",
      },
      {
        label: "Avg Experience",
        value: `${avgYears}y`,
        icon: TrendingUp,
        color: "#10B981",
        description: "Years per technology",
      },
      {
        label: "Specializations",
        value: categories,
        icon: Layers,
        color: "#8B5CF6",
        description: "Domain expertise",
      },
    ]
  }, [filters.length])

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

  return (
    <section
      id="technologies"
      className={cn(
        "container mx-auto px-4 relative overflow-hidden",
        customization.spacing === "compact"
          ? "py-16"
          : customization.spacing === "comfortable"
            ? "py-20 md:py-28"
            : "py-28 md:py-36",
      )}
      aria-labelledby="technologies-title"
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10" ref={elementRef}>
        {/* Premium header */}
        <header className="text-center mb-16 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-purple-500 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Technical Expertise
            </h2>
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium"
            style={{ color: "var(--fg-secondary)" }}
          >
            Comprehensive technology mastery with{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              deep expertise across the full development lifecycle
            </span>
            .
            <span className="block mt-2 text-base opacity-80">
              Each technology represents years of hands-on experience and production-proven results.
            </span>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-6" />
        </header>

        {/* Premium stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
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
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}90)`,
                    boxShadow: `0 4px 14px -2px ${stat.color}35`,
                  }}
                >
                  <stat.icon className="w-6 h-6 text-white" style={{ strokeWidth: 2.5 }} />
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

        {/* Premium filter chips */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filters.map((f) => {
            const CategoryIcon = categoryIcons[f as keyof typeof categoryIcons]
            const colors = categoryColors[f as keyof typeof categoryColors]

            return (
              <Button
                key={f}
                size="lg"
                variant={active === f ? "default" : "outline"}
                onClick={() => setActive(f)}
                className={cn(
                  "rounded-full transition-all duration-300 px-6 py-3 font-semibold",
                  active === f ? "shadow-lg scale-105" : "shadow-md hover:shadow-lg hover:scale-105",
                )}
                style={
                  active === f
                    ? {
                        background: colors
                          ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "#ffffff",
                        boxShadow: colors
                          ? `0 10px 25px -5px ${colors.primary}40`
                          : "0 10px 25px -5px rgba(102, 126, 234, 0.4)",
                      }
                    : {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(20px)",
                        color: "var(--fg)",
                      }
                }
              >
                {CategoryIcon && f !== "All" && <CategoryIcon className="w-4 h-4 mr-2" />}
                {f}
                <span
                  className="ml-2 text-xs font-bold px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: active === f ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
                    color: active === f ? "#ffffff" : "var(--fg-secondary)",
                  }}
                >
                  {counts[f] ?? 0}
                </span>
              </Button>
            )
          })}
        </div>

        {/* Premium technologies grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map((tech, index) => (
              <PremiumTechCard key={tech.name} item={tech} index={index} inView={inView} />
            ))}
          </div>
        </div>

        {/* Premium call-to-action */}
        <div className="text-center mt-16">
          <div
            className="inline-flex items-center gap-6 px-8 py-4 rounded-full relative overflow-hidden backdrop-blur-md"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.2)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-purple-400/10 animate-pulse" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-3 h-3 rounded-full animate-pulse bg-green-500" />
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-base font-semibold" style={{ color: "var(--fg)" }}>
                Ready to leverage this expertise for your next project?
              </span>
            </div>
            <div className="w-px h-6" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
            <div className="flex items-center gap-2 relative z-10">
              <Rocket className="w-4 h-4" style={{ color: "var(--primary)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--fg-secondary)" }}>
                Let's build something extraordinary together
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
