"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useMemo, useState, useCallback, useRef, useEffect } from "react"
import { skills } from "@/lib/data"
import { useCustomization } from "@/components/providers/customization-provider"
import { cn } from "@/lib/utils"
import {
  Code2,
  Server,
  Users,
  Award,
  TrendingUp,
  Target,
  Sparkles,
  Crown,
  Star,
  ChevronRight,
  BarChart3,
  Layers,
  Shield,
  Layout,
  FileCode,
  Palette,
  Terminal,
  Database,
  GitBranch,
  Cloud,
  Container,
  Settings,
  Activity,
  HardDrive,
  TestTube,
  Smartphone,
  Monitor,
  Eye,
  UserCheck,
  Network,
  MessageSquare,
  type LucideIcon,
} from "lucide-react"

// Clean Lucide icons for all skills - no backgrounds, crisp SVG
const skillIcons: Record<string, LucideIcon> = {
  "React / Next.js": Layout,
  React: Layers,
  TypeScript: FileCode,
  "Tailwind CSS": Palette,
  "Node.js": Terminal,
  PostgreSQL: Database,
  "REST / GraphQL": GitBranch,
  GraphQL: GitBranch,
  Kafka: Activity,
  AWS: Cloud,
  "CI/CD": Settings,
  "Docker / Kubernetes": Container,
  Docker: Container,
  Kubernetes: Container,
  Observability: Eye,
  Redis: HardDrive,
  Jest: TestTube,
  Playwright: TestTube,
  "React Native": Smartphone,
  Electron: Monitor,
  "Vue.js": Layers,
  Python: Code2,
  "Team Leadership": UserCheck,
  "System Architecture": Network,
  "Code Review": GitBranch,
  Mentoring: MessageSquare,
}

// Premium brand colors for each skill
const skillBrandColors: Record<string, { primary: string; secondary: string }> = {
  "React / Next.js": { primary: "#000000", secondary: "#333333" },
  React: { primary: "#61DAFB", secondary: "#087EA4" },
  TypeScript: { primary: "#3178C6", secondary: "#5B9BD5" },
  "Tailwind CSS": { primary: "#06B6D4", secondary: "#38BDF8" },
  "Node.js": { primary: "#339933", secondary: "#68BB59" },
  PostgreSQL: { primary: "#336791", secondary: "#4A90A4" },
  "REST / GraphQL": { primary: "#E10098", secondary: "#F48FB1" },
  GraphQL: { primary: "#E10098", secondary: "#F48FB1" },
  Kafka: { primary: "#231F20", secondary: "#555555" },
  AWS: { primary: "#FF9900", secondary: "#232F3E" },
  "CI/CD": { primary: "#2088FF", secondary: "#58A6FF" },
  "Docker / Kubernetes": { primary: "#2496ED", secondary: "#326CE5" },
  Docker: { primary: "#2496ED", secondary: "#0085D1" },
  Kubernetes: { primary: "#326CE5", secondary: "#5B9BD5" },
  Observability: { primary: "#FF6B6B", secondary: "#FF8E8E" },
  Redis: { primary: "#DC382D", secondary: "#F44336" },
  Jest: { primary: "#C21325", secondary: "#FF5555" },
  Playwright: { primary: "#2EAD33", secondary: "#4BC54F" },
  "React Native": { primary: "#61DAFB", secondary: "#087EA4" },
  Electron: { primary: "#47848F", secondary: "#9FEAF9" },
  "Vue.js": { primary: "#42B883", secondary: "#35495E" },
  Python: { primary: "#3776AB", secondary: "#FFD43B" },
  "Team Leadership": { primary: "#F59E0B", secondary: "#FBBF24" },
  "System Architecture": { primary: "#8B5CF6", secondary: "#A78BFA" },
  "Code Review": { primary: "#238636", secondary: "#2EA043" },
  Mentoring: { primary: "#EC4899", secondary: "#F472B6" },
}

const categoryIcons = {
  "Frontend Development": Code2,
  "Backend Development": Server,
  "Cloud & DevOps": Layers,
  "Leadership & Soft Skills": Users,
}

const categoryColors = {
  "Frontend Development": {
    primary: "#3B82F6",
    secondary: "#60A5FA",
    gradient: "from-blue-500 to-cyan-500",
    bg: "from-blue-500/10 to-cyan-500/10",
  },
  "Backend Development": {
    primary: "#10B981",
    secondary: "#34D399",
    gradient: "from-green-500 to-emerald-500",
    bg: "from-green-500/10 to-emerald-500/10",
  },
  "Cloud & DevOps": {
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    gradient: "from-purple-500 to-violet-500",
    bg: "from-purple-500/10 to-violet-500/10",
  },
  "Leadership & Soft Skills": {
    primary: "#F59E0B",
    secondary: "#FBBF24",
    gradient: "from-amber-500 to-orange-500",
    bg: "from-amber-500/10 to-orange-500/10",
  },
}

function SkillLogo({ name, color }: { name: string; color?: string }) {
  const Icon = skillIcons[name] || Code2
  const brandColor = skillBrandColors[name]?.primary || color || "#6B7280"
  return (
    <div className="relative h-6 w-6 shrink-0 flex items-center justify-center">
      <Icon
        className="w-5 h-5 transition-all duration-300"
        style={{
          color: brandColor,
          strokeWidth: 2,
        }}
      />
    </div>
  )
}

function PremiumProgressBar({ value, inView = false, color }: { value: number; inView?: boolean; color: string }) {
  return (
    <div className="relative">
      {/* Background track */}
      <div
        className="h-2 w-full rounded-full overflow-hidden"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Animated fill */}
        <div
          className="h-2 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}90)`,
            width: inView ? `${value}%` : "0%",
            boxShadow: `0 0 10px ${color}40`,
          }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
            style={{
              animation: inView ? "shimmer 2s infinite" : "none",
            }}
          />
        </div>
      </div>

      {/* Percentage indicator */}
      <div
        className="absolute -top-8 transition-all duration-1000 ease-out"
        style={{
          left: inView ? `${Math.max(value - 5, 0)}%` : "0%",
        }}
      >
        <div
          className="px-2 py-1 rounded-lg text-xs font-bold text-white shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}90)`,
            boxShadow: `0 4px 12px ${color}40`,
          }}
        >
          {value}%
        </div>
      </div>
    </div>
  )
}

function ProficiencyBadge({ level, color }: { level: number; color: string }) {
  const getProficiencyLabel = (level: number) => {
    if (level >= 90) return { label: "Expert", icon: Crown }
    if (level >= 80) return { label: "Advanced", icon: Award }
    if (level >= 70) return { label: "Proficient", icon: Star }
    return { label: "Intermediate", icon: Target }
  }

  const { label, icon: Icon } = getProficiencyLabel(level)

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
      style={{
        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </div>
  )
}

export function SkillsSection() {
  const { customization } = useCustomization()
  const categories = useMemo(() => skills.map((c) => c.category), [])
  const [active, setActive] = useState<string>("All")

  const visible = useMemo(() => {
    if (active === "All") return skills
    return skills.filter((c) => c.category === active)
  }, [active])

  // Calculate overall stats
  const stats = useMemo(() => {
    const allSkills = skills.flatMap((cat) => cat.items)
    const expertSkills = allSkills.filter((skill) => skill.level >= 90).length
    const avgLevel = Math.round(allSkills.reduce((acc, skill) => acc + skill.level, 0) / allSkills.length)
    const totalSkills = allSkills.length

    return [
      {
        label: "Total Skills",
        value: totalSkills,
        icon: BarChart3,
        color: "#3B82F6",
        description: "Technical competencies",
      },
      {
        label: "Expert Level",
        value: expertSkills,
        icon: Crown,
        color: "#F59E0B",
        description: "90%+ proficiency",
      },
      {
        label: "Avg Proficiency",
        value: `${avgLevel}%`,
        icon: TrendingUp,
        color: "#10B981",
        description: "Overall skill level",
      },
      {
        label: "Categories",
        value: categories.length,
        icon: Layers,
        color: "#8B5CF6",
        description: "Specialized domains",
      },
    ]
  }, [categories.length])

  return (
    <section
      id="skills"
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

      <div className="relative z-10">
        {/* Premium header */}
        <header className="text-center mb-16 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Core Skills Mastery
            </h2>
            <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
          </div>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium"
            style={{ color: "var(--fg-secondary)" }}
          >
            Proven expertise across the full development stack with{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              measurable proficiency levels
            </span>{" "}
            and years of hands-on experience.
            <span className="block mt-2 text-base" style={{ color: "var(--fg-muted)" }}>
              Each skill represents real-world project delivery and continuous learning.
            </span>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-6" />
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
                <div className="text-xs" style={{ color: "var(--fg-muted)" }}>
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium filter chips */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            variant={active === "All" ? "default" : "outline"}
            onClick={() => setActive("All")}
            className={cn(
              "rounded-full transition-all duration-300 px-6 py-3 font-semibold",
              active === "All" ? "shadow-lg scale-105" : "shadow-md hover:shadow-lg hover:scale-105",
            )}
            style={
              active === "All"
                ? {
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#ffffff",
                    boxShadow: "0 10px 25px -5px rgba(102, 126, 234, 0.4)",
                  }
                : {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(20px)",
                    color: "var(--fg)",
                  }
            }
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            All Skills
          </Button>
          {categories.map((cat) => {
            const CategoryIcon = categoryIcons[cat as keyof typeof categoryIcons]
            const colors = categoryColors[cat as keyof typeof categoryColors]
            return (
              <Button
                key={cat}
                size="lg"
                variant={active === cat ? "default" : "outline"}
                onClick={() => setActive(cat)}
                className={cn(
                  "rounded-full transition-all duration-300 px-6 py-3 font-semibold",
                  active === cat ? "shadow-lg scale-105" : "shadow-md hover:shadow-lg hover:scale-105",
                )}
                style={
                  active === cat
                    ? {
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        color: "#ffffff",
                        boxShadow: `0 10px 25px -5px ${colors.primary}40`,
                      }
                    : {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(20px)",
                        color: "var(--fg)",
                      }
                }
              >
                {CategoryIcon && <CategoryIcon className="w-4 h-4 mr-2" />}
                {cat.replace(" Development", "").replace(" & ", "/")}
              </Button>
            )
          })}
        </div>

        {/* Premium skills display */}
        <div className="max-w-6xl mx-auto">
          {active === "All" ? (
            // Show all categories in premium grid
            <div className="grid gap-8 lg:grid-cols-2">
              {visible.map((category, i) => (
                <PremiumSkillCategory key={category.category} category={category} index={i} />
              ))}
            </div>
          ) : (
            // Show single category in expanded view
            <div className="max-w-4xl mx-auto">
              {visible.map((category, i) => (
                <PremiumSkillCategoryExpanded key={category.category} category={category} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

function PremiumSkillCategory({ category, index }: { category: (typeof skills)[0]; index: number }) {
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)
  const colors = categoryColors[category.category as keyof typeof categoryColors]
  const CategoryIcon = categoryIcons[category.category as keyof typeof categoryIcons]

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
          setTimeout(() => setInView(true), index * 200)
          observerRef.current?.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    observerRef.current.observe(elementRef.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [inView, index])

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      requestAnimationFrame(() => {
        if (e.currentTarget) {
          e.currentTarget.style.boxShadow = `0 25px 50px -12px ${colors.primary}20`
          e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"
        }
      })
    },
    [colors.primary],
  )

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      if (e.currentTarget) {
        e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(0,0,0,0.1)"
        e.currentTarget.style.transform = "translateY(0px) scale(1)"
      }
    })
  }, [])

  return (
    <div ref={elementRef} className="group">
      <div
        className={cn(
          "rounded-3xl transition-all duration-500 p-8 backdrop-blur-md relative overflow-hidden",
          inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Clean gradient overlay - matching Professional Toolkit style */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(160deg, ${colors.primary}05 0%, ${colors.secondary}08 100%)`,
          }}
        />

        {/* Category header - Clean icon container */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                boxShadow: `0 4px 14px -2px ${colors.primary}35`,
              }}
            >
              <CategoryIcon className="w-7 h-7 text-white" style={{ strokeWidth: 2.5 }} />
            </div>
            <div>
              <h3 className="text-xl font-bold" style={{ color: "var(--fg)" }}>
                {category.category}
              </h3>
              <p className="text-sm opacity-75" style={{ color: "var(--fg-secondary)" }}>
                {category.items.length} specialized skills
              </p>
            </div>
          </div>

          {/* Category proficiency indicator */}
          <div className="text-right">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>
              {Math.round(category.items.reduce((acc, skill) => acc + skill.level, 0) / category.items.length)}%
            </div>
            <div className="text-xs opacity-75" style={{ color: "var(--fg-secondary)" }}>
              Avg Proficiency
            </div>
          </div>
        </div>

        {/* Skills list */}
        <div className="space-y-6 relative z-10">
          {category.items.map((skill, skillIndex) => (
            <div key={skill.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <SkillLogo name={skill.name} />
                  <span className="font-semibold text-base truncate" style={{ color: "var(--fg)" }}>
                    {skill.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <ProficiencyBadge level={skill.level} color={colors.primary} />
                  <span
                    className="text-sm font-bold tabular-nums min-w-[3rem] text-right"
                    style={{ color: colors.primary }}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>
              <div className="relative">
                <PremiumProgressBar value={skill.level} inView={inView} color={colors.primary} />
              </div>
            </div>
          ))}
        </div>

        {/* Premium footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-sm font-medium" style={{ color: "var(--fg-secondary)" }}>
              Production Ready
            </span>
          </div>
          <ChevronRight
            className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
            style={{ color: colors.primary }}
          />
        </div>
      </div>
    </div>
  )
}

function PremiumSkillCategoryExpanded({ category, index }: { category: (typeof skills)[0]; index: number }) {
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)
  const colors = categoryColors[category.category as keyof typeof categoryColors]
  const CategoryIcon = categoryIcons[category.category as keyof typeof categoryIcons]

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
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    observerRef.current.observe(elementRef.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [inView])

  return (
    <div ref={elementRef} className="space-y-8">
      {/* Premium category header - Clean icon container */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 4px 14px -2px ${colors.primary}35`,
            }}
          >
            <CategoryIcon className="w-8 h-8 text-white" style={{ strokeWidth: 2.5 }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--fg)" }}>
          {category.category}
        </h3>
        <div className="flex items-center justify-center gap-4 text-sm" style={{ color: "var(--fg-secondary)" }}>
          <span>{category.items.length} Skills</span>
          <div className="w-1 h-1 rounded-full bg-current opacity-50" />
          <span>
            {Math.round(category.items.reduce((acc, skill) => acc + skill.level, 0) / category.items.length)}% Avg
            Proficiency
          </span>
        </div>
        <div
          className="w-32 h-1 rounded-full mx-auto mt-4"
          style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}
        />
      </div>

      {/* Expanded skills grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {category.items.map((skill, skillIndex) => (
          <div
            key={skill.name}
            className="group rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <SkillLogo name={skill.name} />
                <span className="font-bold text-lg" style={{ color: "var(--fg)" }}>
                  {skill.name}
                </span>
              </div>
              <ProficiencyBadge level={skill.level} color={colors.primary} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "var(--fg-secondary)" }}>
                  Proficiency Level
                </span>
                <span className="text-lg font-bold tabular-nums" style={{ color: colors.primary }}>
                  {skill.level}%
                </span>
              </div>
              <PremiumProgressBar value={skill.level} inView={inView} color={colors.primary} />
            </div>

            {/* Clean hover overlay - matching Professional Toolkit style */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              style={{
                background: `linear-gradient(160deg, ${colors.primary}05 0%, ${colors.secondary}08 100%)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
