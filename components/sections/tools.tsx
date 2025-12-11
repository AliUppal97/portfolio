"use client"

import { useMemo, useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { tools } from "@/lib/data"
import { useCustomization } from "@/components/providers/customization-provider"
import { cn } from "@/lib/utils"
import type { ToolItem } from "@/lib/types"
import {
  Star,
  Zap,
  TrendingUp,
  Clock,
  Code2,
  Palette,
  Server,
  MessageSquare,
  Settings,
  Database,
  Monitor,
  Github,
  Terminal,
  Layers,
  GitBranch,
  Cloud,
  Container,
  HardDrive,
  Search,
  Workflow,
  Sparkles,
  Award,
  Target,
  Rocket,
  Send,
  FileCode,
  Figma,
  Slack,
  Layout,
  Cpu,
  Box,
  type LucideIcon,
} from "lucide-react"

type Category = "All" | "Development" | "Design" | "DevOps" | "Communication" | "Productivity" | "Database"

const categoryIcons = {
  Development: Code2,
  Design: Palette,
  DevOps: Server,
  Communication: MessageSquare,
  Productivity: Settings,
  Database: Database,
}

const proficiencyConfig = {
  Expert: {
    icon: Zap,
    color: "hsl(142, 76%, 36%)",
    bgLight: "hsl(142, 76%, 96%)",
    bgDark: "hsl(142, 76%, 8%)",
    label: "Expert",
    dots: 5,
    glow: "0 0 20px hsl(142, 76%, 36%, 0.3)",
  },
  Advanced: {
    icon: TrendingUp,
    color: "hsl(217, 91%, 60%)",
    bgLight: "hsl(217, 91%, 96%)",
    bgDark: "hsl(217, 91%, 8%)",
    label: "Advanced",
    dots: 4,
    glow: "0 0 20px hsl(217, 91%, 60%, 0.3)",
  },
  Intermediate: {
    icon: Star,
    color: "hsl(43, 96%, 56%)",
    bgLight: "hsl(43, 96%, 95%)",
    bgDark: "hsl(43, 96%, 10%)",
    label: "Intermediate",
    dots: 3,
    glow: "0 0 20px hsl(43, 96%, 56%, 0.3)",
  },
  Beginner: {
    icon: Clock,
    color: "hsl(220, 9%, 46%)",
    bgLight: "hsl(220, 9%, 95%)",
    bgDark: "hsl(220, 9%, 15%)",
    label: "Beginner",
    dots: 2,
    glow: "0 0 20px hsl(220, 9%, 46%, 0.3)",
  },
}

// Clean Lucide icons for all tools - no backgrounds, crisp SVG
const toolIcons: Record<string, LucideIcon> = {
  "VS Code": Monitor,
  GitHub: Github,
  Postman: Send,
  React: Layers,
  "Next.js": Layout,
  TypeScript: FileCode,
  "Node.js": Terminal,
  Python: Code2,
  Figma: Figma,
  Framer: Box,
  Docker: Container,
  Vercel: Cloud,
  AWS: Cloud,
  Kubernetes: Cpu,
  Slack: Slack,
  Notion: Settings,
  Linear: Workflow,
  Raycast: Search,
  TablePlus: Database,
  PostgreSQL: Database,
  MySQL: Database,
  MongoDB: Database,
  Redis: HardDrive,
  GraphQL: GitBranch,
}

function PremiumToolCard({ tool, index, theme }: { tool: ToolItem; index: number; theme: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const [inView, setInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const config = proficiencyConfig[tool.proficiency as keyof typeof proficiencyConfig]
  const isDark = theme === "dark" || theme === "futuristic"
  const ToolIcon = toolIcons[tool.name] || Code2

  // Premium brand colors with enhanced gradients
  const brandColors: Record<string, { primary: string; secondary: string; accent: string; background: string; gradient: string }> = {
    "VS Code": {
      primary: "#007ACC",
      secondary: "#1177BB",
      accent: "#40A9FF",
      background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      gradient: "linear-gradient(135deg, #007ACC 0%, #1177BB 100%)",
    },
    Figma: {
      primary: "#F24E1E",
      secondary: "#FF6B35",
      accent: "#A259FF",
      background: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)",
      gradient: "linear-gradient(135deg, #F24E1E 0%, #A259FF 50%, #0ACF83 100%)",
    },
    GitHub: {
      primary: "#238636",
      secondary: "#2EA043",
      accent: "#58A6FF",
      background: "linear-gradient(135deg, #0D1117 0%, #161B22 100%)",
      gradient: "linear-gradient(135deg, #238636 0%, #2EA043 100%)",
    },
    Postman: {
      primary: "#FF6C37",
      secondary: "#FF8A50",
      accent: "#FFB74D",
      background: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)",
      gradient: "linear-gradient(135deg, #FF6C37 0%, #FF8A50 100%)",
    },
    Docker: {
      primary: "#2496ED",
      secondary: "#0085D1",
      accent: "#384D54",
      background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      gradient: "linear-gradient(135deg, #2496ED 0%, #0085D1 100%)",
    },
    Slack: {
      primary: "#E01E5A",
      secondary: "#36C5F0",
      accent: "#2EB67D",
      background: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)",
      gradient: "linear-gradient(135deg, #E01E5A 0%, #36C5F0 50%, #2EB67D 100%)",
    },
    Notion: {
      primary: "#000000",
      secondary: "#333333",
      accent: "#FA5252",
      background: "linear-gradient(135deg, #F5F5F5 0%, #EEEEEE 100%)",
      gradient: "linear-gradient(135deg, #000000 0%, #333333 100%)",
    },
    Linear: {
      primary: "#5E6AD2",
      secondary: "#7B83EB",
      accent: "#8B5CF6",
      background: "linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)",
      gradient: "linear-gradient(135deg, #5E6AD2 0%, #7B83EB 100%)",
    },
    Vercel: {
      primary: "#000000",
      secondary: "#333333",
      accent: "#0070F3",
      background: "linear-gradient(135deg, #F5F5F5 0%, #EEEEEE 100%)",
      gradient: "linear-gradient(135deg, #000000 0%, #333333 100%)",
    },
    Framer: {
      primary: "#0055FF",
      secondary: "#00AAFF",
      accent: "#FF0080",
      background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      gradient: "linear-gradient(135deg, #0055FF 0%, #00AAFF 50%, #FF0080 100%)",
    },
    Raycast: {
      primary: "#FF6363",
      secondary: "#FF8A80",
      accent: "#7C3AED",
      background: "linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)",
      gradient: "linear-gradient(135deg, #FF6363 0%, #7C3AED 100%)",
    },
    TablePlus: {
      primary: "#3B82F6",
      secondary: "#60A5FA",
      accent: "#A78BFA",
      background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
    },
    React: {
      primary: "#61DAFB",
      secondary: "#21CBF3",
      accent: "#087EA4",
      background: "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)",
      gradient: "linear-gradient(135deg, #61DAFB 0%, #087EA4 100%)",
    },
    "Next.js": {
      primary: "#000000",
      secondary: "#333333",
      accent: "#0070F3",
      background: "linear-gradient(135deg, #F5F5F5 0%, #EEEEEE 100%)",
      gradient: "linear-gradient(135deg, #000000 0%, #333333 100%)",
    },
    TypeScript: {
      primary: "#3178C6",
      secondary: "#5B9BD5",
      accent: "#235A97",
      background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      gradient: "linear-gradient(135deg, #3178C6 0%, #5B9BD5 100%)",
    },
    "Node.js": {
      primary: "#339933",
      secondary: "#68BB59",
      accent: "#215732",
      background: "linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)",
      gradient: "linear-gradient(135deg, #339933 0%, #68BB59 100%)",
    },
    Python: {
      primary: "#3776AB",
      secondary: "#FFD43B",
      accent: "#4B8BBE",
      background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      gradient: "linear-gradient(135deg, #3776AB 0%, #FFD43B 100%)",
    },
    PostgreSQL: {
      primary: "#336791",
      secondary: "#4A90A4",
      accent: "#0064A5",
      background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      gradient: "linear-gradient(135deg, #336791 0%, #4A90A4 100%)",
    },
    MySQL: {
      primary: "#4479A1",
      secondary: "#F29111",
      accent: "#5B9BD5",
      background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      gradient: "linear-gradient(135deg, #4479A1 0%, #F29111 100%)",
    },
    MongoDB: {
      primary: "#47A248",
      secondary: "#68BB59",
      accent: "#13AA52",
      background: "linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)",
      gradient: "linear-gradient(135deg, #47A248 0%, #68BB59 100%)",
    },
    Redis: {
      primary: "#DC382D",
      secondary: "#F44336",
      accent: "#A41E11",
      background: "linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)",
      gradient: "linear-gradient(135deg, #DC382D 0%, #F44336 100%)",
    },
    AWS: {
      primary: "#FF9900",
      secondary: "#232F3E",
      accent: "#FFB74D",
      background: "linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)",
      gradient: "linear-gradient(135deg, #FF9900 0%, #232F3E 100%)",
    },
    GraphQL: {
      primary: "#E10098",
      secondary: "#F48FB1",
      accent: "#B7178C",
      background: "linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)",
      gradient: "linear-gradient(135deg, #E10098 0%, #F48FB1 100%)",
    },
    Kubernetes: {
      primary: "#326CE5",
      secondary: "#5B9BD5",
      accent: "#2B5797",
      background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      gradient: "linear-gradient(135deg, #326CE5 0%, #5B9BD5 100%)",
    },
  }

  const toolBrandColor = brandColors[tool.name] || {
    primary: "#6B7280",
    secondary: "#9CA3AF",
    accent: "#4B5563",
    background: "linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)",
    gradient: "linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)",
  }

  // Proficiency percentage for progress bar
  const proficiencyPercent = {
    Expert: 95,
    Advanced: 80,
    Intermediate: 60,
    Beginner: 35,
  }[tool.proficiency] || 50

  // Intersection observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setInView(true), index * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  // Category icon
  const CategoryIcon = categoryIcons[tool.category as keyof typeof categoryIcons] || Code2

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-3xl transition-all duration-500 ease-out",
        "transform-gpu will-change-transform cursor-pointer h-[220px]",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        isHovered ? "scale-[1.02] -translate-y-3 z-50" : "z-10 overflow-hidden",
      )}
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
        boxShadow: isHovered
          ? `0 25px 50px -12px rgba(0, 0, 0, ${isDark ? "0.4" : "0.15"}), ${config?.glow || ""}`
          : `0 10px 25px -5px rgba(0, 0, 0, ${isDark ? "0.2" : "0.08"})`,
        transitionDelay: `${index * 30}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-interactive="true"
    >
      {/* Premium gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${toolBrandColor.primary}08, ${toolBrandColor.secondary}15)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Animated border gradient */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${toolBrandColor.primary}30, ${toolBrandColor.secondary}30)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          padding: "1px",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Status indicator with glow */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div
          className="w-2.5 h-2.5 rounded-full animate-pulse"
          style={{
            backgroundColor: "#10B981",
            boxShadow: "0 0 10px #10B981",
          }}
        />
        <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
      </div>

      {/* Main content */}
      <div className="p-6 h-full flex flex-col justify-center items-center text-center relative z-10">
        {/* Clean icon container - using Lucide icons only */}
        <div className="flex justify-center mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${toolBrandColor.primary}15, ${toolBrandColor.secondary}25)`,
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              boxShadow: isHovered ? `0 12px 28px -4px ${toolBrandColor.primary}35` : "none",
              border: `1px solid ${toolBrandColor.primary}20`,
            }}
          >
            <ToolIcon
              className="w-8 h-8 relative z-10 transition-all duration-300"
              style={{
                color: toolBrandColor.primary,
                strokeWidth: 1.5,
              }}
            />
          </div>
        </div>

        {/* Tool name with premium typography */}
        <h3
          className="font-bold text-lg mb-2 leading-tight tracking-tight"
          style={{
            color: "var(--fg)",
            textShadow: isHovered ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
          }}
        >
          {tool.name}
        </h3>

        {/* Experience with premium styling */}
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-4 h-4" style={{ color: toolBrandColor.primary }} />
          <p className="text-sm font-medium" style={{ color: "var(--fg-secondary)" }}>
            {tool.yearsUsed}+ years experience
          </p>
        </div>

        {/* Proficiency indicator */}
        <div className="flex items-center gap-2">
          {config && <config.icon className="w-4 h-4" style={{ color: config.color }} />}
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{
              backgroundColor: config?.bgLight,
              color: config?.color,
            }}
          >
            {config?.label}
          </span>
        </div>

        {/* ✨ REFINED HOVER OVERLAY - Better UX ✨ */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 flex flex-col transition-all duration-400 rounded-3xl overflow-hidden",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          style={{
            minHeight: "220px",
          }}
        >
          {/* Clean gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? `linear-gradient(160deg, rgba(18, 18, 24, 0.98) 0%, rgba(24, 24, 32, 0.99) 100%)`
                : `linear-gradient(160deg, rgba(255, 255, 255, 0.99) 0%, rgba(250, 251, 253, 0.99) 100%)`,
            }}
          />

          {/* Subtle accent glow - top corner */}
          <div
            className="absolute top-0 right-0 w-32 h-32 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at top right, ${toolBrandColor.primary}15 0%, transparent 70%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Elegant left accent bar */}
          <div
            className="absolute left-0 top-4 bottom-4 w-1 rounded-full transition-all duration-500"
            style={{
              background: toolBrandColor.gradient,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              boxShadow: `0 0 12px ${toolBrandColor.primary}40`,
            }}
          />

          {/* Content container */}
          <div className="relative z-10 p-5 pl-6 flex flex-col h-full">
            {/* Header - Icon + Title inline */}
            <div
              className="flex items-center gap-3 mb-4 transition-all duration-400"
              style={{
                transform: isHovered ? "translateY(0)" : "translateY(-8px)",
                opacity: isHovered ? 1 : 0,
                transitionDelay: "50ms",
              }}
            >
              {/* Compact icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: toolBrandColor.gradient,
                  boxShadow: `0 4px 14px -2px ${toolBrandColor.primary}40`,
                }}
              >
                <ToolIcon className="w-5 h-5 text-white" style={{ strokeWidth: 2.5 }} />
              </div>

              {/* Title + Quick stats */}
              <div className="flex-1 min-w-0">
                <h4
                  className="font-bold text-base leading-tight truncate"
                  style={{ color: isDark ? "#ffffff" : "#0f0f0f" }}
                >
                  {tool.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="text-[11px] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      background: `${config?.color}18`,
                      color: config?.color,
                    }}
                  >
                    {tool.proficiency}
                  </span>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}
                  >
                    •
                  </span>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}
                  >
                    {tool.yearsUsed}+ years
                  </span>
                </div>
              </div>
            </div>

            {/* Skill level visualization - Dots */}
            <div
              className="flex items-center gap-3 mb-4 transition-all duration-400"
              style={{
                transform: isHovered ? "translateY(0)" : "translateY(-6px)",
                opacity: isHovered ? 1 : 0,
                transitionDelay: "100ms",
              }}
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: dot <= (config?.dots || 0)
                        ? toolBrandColor.gradient
                        : isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
                      boxShadow: dot <= (config?.dots || 0)
                        ? `0 0 6px ${toolBrandColor.primary}50`
                        : "none",
                      transitionDelay: `${150 + dot * 50}ms`,
                      transform: isHovered && dot <= (config?.dots || 0) ? "scale(1)" : "scale(0.8)",
                    }}
                  />
                ))}
              </div>
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)" }}
              >
                Skill Level
              </span>
            </div>

            {/* Description - Main content */}
            <p
              className="text-[13px] leading-relaxed flex-1 transition-all duration-400"
              style={{
                color: isDark ? "rgba(255, 255, 255, 0.72)" : "rgba(0, 0, 0, 0.62)",
                transform: isHovered ? "translateY(0)" : "translateY(-4px)",
                opacity: isHovered ? 1 : 0,
                transitionDelay: "150ms",
                lineHeight: "1.65",
              }}
            >
              {tool.description}
            </p>

            {/* Footer - Category chip */}
            <div
              className="flex items-center justify-between mt-auto pt-3 transition-all duration-400"
              style={{
                borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
                transform: isHovered ? "translateY(0)" : "translateY(-2px)",
                opacity: isHovered ? 1 : 0,
                transitionDelay: "200ms",
              }}
            >
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
                  color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
                }}
              >
                <CategoryIcon className="w-3 h-3" style={{ color: toolBrandColor.primary }} />
                {tool.category}
              </div>

              {/* Hover indicator */}
              <div
                className="flex items-center gap-1 text-[10px] font-medium transition-all duration-300"
                style={{
                  color: toolBrandColor.primary,
                  opacity: isHovered ? 0.7 : 0,
                  transform: isHovered ? "translateX(0)" : "translateX(4px)",
                  transitionDelay: "300ms",
                }}
              >
                <span>Active</span>
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    background: toolBrandColor.primary,
                    boxShadow: `0 0 6px ${toolBrandColor.primary}`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ToolsSection() {
  const { customization } = useCustomization()
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const categories: Category[] = ["All", "Development", "Design", "DevOps", "Communication", "Productivity", "Database"]

  const counts = useMemo(() => {
    const base: Record<Category, number> = {
      All: tools.length,
      Development: 0,
      Design: 0,
      DevOps: 0,
      Communication: 0,
      Productivity: 0,
      Database: 0,
    }
    tools.forEach((tool) => {
      base[tool.category as Exclude<Category, "All">] += 1
    })
    return base
  }, [])

  const filteredTools = useMemo(() => {
    if (activeCategory === "All") return tools
    return tools.filter((tool) => tool.category === activeCategory)
  }, [activeCategory])

  const stats = useMemo(() => {
    const expertCount = tools.filter((t) => t.proficiency === "Expert").length
    const avgYears = Math.round(tools.reduce((acc, t) => acc + t.yearsUsed, 0) / tools.length)
    const totalCategories = categories.length - 1

    return [
      {
        label: "Professional Tools",
        value: tools.length,
        icon: "🛠️",
        color: "hsl(217, 91%, 60%)",
        description: "Curated arsenal",
      },
      {
        label: "Expert Mastery",
        value: expertCount,
        icon: "⚡",
        color: "hsl(142, 76%, 36%)",
        description: "Advanced proficiency",
      },
      {
        label: "Average Experience",
        value: `${avgYears}y`,
        icon: "📈",
        color: "hsl(43, 96%, 56%)",
        description: "Years of expertise",
      },
      {
        label: "Specialized Areas",
        value: totalCategories,
        icon: "🎯",
        color: "hsl(262, 83%, 58%)",
        description: "Domain coverage",
      },
    ]
  }, [categories.length])

  return (
    <section
      id="tools"
      className={cn(
        "container mx-auto px-4 relative",
        customization.spacing === "compact" ? "py-16" : customization.spacing === "comfortable" ? "py-20" : "py-24",
      )}
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />
      </div>

      {/* Premium header */}
      <header className="text-center mb-16 max-w-5xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Professional Toolkit
          </h2>
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>
        <p
          className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium"
          style={{ color: "var(--fg-secondary)" }}
        >
          Masterfully curated technologies and tools that power enterprise-grade solutions.
          <span className="block mt-2 text-base opacity-80">
            Each tool represents years of hands-on expertise and production-proven results.
          </span>
        </p>

        {/* Premium filter chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons]
            return (
              <Button
                key={category}
                size="lg"
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full transition-all duration-300 gap-3 px-6 py-3 font-semibold",
                  activeCategory === category ? "shadow-lg scale-105" : "shadow-md hover:shadow-lg hover:scale-105",
                )}
                style={
                  activeCategory === category
                    ? {
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "#ffffff",
                        boxShadow: "0 10px 25px -5px rgba(102, 126, 234, 0.4)",
                      }
                    : {
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        color: "var(--fg)",
                        backdropFilter: "blur(10px)",
                      }
                }
              >
                {CategoryIcon && category !== "All" && <CategoryIcon className="w-4 h-4" />}
                {category}
                <span
                  className="text-xs font-bold px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: activeCategory === category ? "rgba(255,255,255,0.25)" : "var(--surface)",
                    color: activeCategory === category ? "#ffffff" : "var(--fg-secondary)",
                  }}
                >
                  {counts[category] ?? 0}
                </span>
              </Button>
            )
          })}
        </div>
      </header>

      {/* Premium symmetrical grid */}
      <div className="max-w-7xl mx-auto mb-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8">
          {filteredTools.map((tool, index) => (
            <PremiumToolCard key={tool.name} tool={tool} index={index} theme={customization.theme} />
          ))}
        </div>
      </div>

      {/* Premium statistics */}
      <div className="max-w-5xl mx-auto mb-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group text-center p-8 rounded-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.1)",
              }}
              data-interactive="true"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold mb-3" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-base font-semibold mb-1" style={{ color: "var(--fg)" }}>
                  {stat.label}
                </div>
                <div className="text-sm opacity-75" style={{ color: "var(--fg-secondary)" }}>
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium call-to-action footer */}
      <div className="text-center relative z-10">
        <div
          className="inline-flex items-center gap-6 px-8 py-4 rounded-full relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 animate-pulse" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: "#10B981" }} />
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-base font-semibold" style={{ color: "var(--fg)" }}>
              Ready to build something extraordinary?
            </span>
          </div>
          <div className="w-px h-6" style={{ backgroundColor: "var(--border)" }} />
          <div className="flex items-center gap-2 relative z-10">
            <Rocket className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <span className="text-sm font-medium" style={{ color: "var(--fg-secondary)" }}>
              Let's create the future together
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
