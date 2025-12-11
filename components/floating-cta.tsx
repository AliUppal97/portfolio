"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Settings2, MessageCircle, Zap, Star, ChevronRight, ExternalLink, Sparkles, Crown, Award, FileText } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { useCustomization } from "@/components/providers/customization-provider"
import { cn } from "@/lib/utils"

const phone = "1234567890" // Update this with your actual phone number
const prefill = encodeURIComponent("Hi! I saw your portfolio and would like to discuss a project opportunity.")
const calendlyUrl = "https://calendly.com/yourusername" // Update this with your actual Calendly URL
const resumeUrl = "/resume.pdf" // Update this with your actual resume file path

export function FloatingCTA() {
  const [supportsBackdrop, setSupportsBackdrop] = useState(false)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const { customization } = useCustomization()
  
  useEffect(() => {
    setSupportsBackdrop(CSS.supports("backdrop-filter: blur(4px)"))
  }, [])

  const openCustomizer = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-customizer"))
    }
  }, [])

  const getPremiumThemeColors = useCallback(() => {
    const isLightTheme = ["light", "minimalist", "creative"].includes(customization.theme)
    
    if (isLightTheme) {
      return {
        background: supportsBackdrop ? "rgba(255, 255, 255, 0.98)" : "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.9)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.95)",
        tooltipBg: "rgba(255, 255, 255, 0.95)",
        tooltipColor: "#1f2937",
        tooltipBorder: "rgba(0, 0, 0, 0.1)"
      }
    } else {
      return {
        background: supportsBackdrop ? "rgba(15, 23, 42, 0.98)" : "#0f172a",
        border: "1px solid rgba(148, 163, 184, 0.3)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 163, 184, 0.2)",
        tooltipBg: "rgba(15, 23, 42, 0.95)",
        tooltipColor: "#f8fafc",
        tooltipBorder: "rgba(148, 163, 184, 0.2)"
      }
    }
  }, [customization.theme, supportsBackdrop])

  const themeColors = getPremiumThemeColors()

  // Enhanced button configurations with vibrant, visible color schemes
  const buttonConfigs = [
    {
      id: "hire",
      icon: Crown,
      label: "Hire Me",
      href: "#contact",
      description: "Ready to build something extraordinary? Let's create the next big thing together.",
      subtitle: "Premium Development Services",
      priority: "high",
      action: "scroll",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      hoverGradient: "from-indigo-500 via-purple-500 to-pink-500",
      glowColor: "rgba(99, 102, 241, 0.6)",
      accentGlow: "from-indigo-400/50 via-purple-400/50 to-pink-400/50",
      borderGlow: "from-indigo-400/80 via-purple-400/80 to-pink-400/80"
    },
    {
      id: "resume",
      icon: FileText,
      label: "Download Resume",
      href: resumeUrl,
      description: "Download my professional resume to learn more about my experience and skills.",
      subtitle: "Professional Resume",
      priority: "high",
      action: "download",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      hoverGradient: "from-blue-500 via-cyan-500 to-teal-500",
      glowColor: "rgba(59, 130, 246, 0.6)",
      accentGlow: "from-blue-400/50 via-cyan-400/50 to-teal-400/50",
      borderGlow: "from-blue-400/80 via-cyan-400/80 to-teal-400/80"
    },
    {
      id: "schedule",
      icon: Calendar,
      label: "Schedule Call",
      href: calendlyUrl,
      description: "Book a strategic consultation call to discuss your project vision.",
      subtitle: "Free Strategy Session",
      priority: "medium",
      action: "external",
      gradient: "from-emerald-600 via-green-600 to-lime-600",
      hoverGradient: "from-emerald-500 via-green-500 to-lime-500",
      glowColor: "rgba(16, 185, 129, 0.6)",
      accentGlow: "from-emerald-400/50 via-green-400/50 to-lime-400/50",
      borderGlow: "from-emerald-400/80 via-green-400/80 to-lime-400/80"
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${phone}?text=${prefill}`,
      description: "Quick chat about your project requirements and timeline.",
      subtitle: "Instant Response",
      priority: "medium",
      action: "whatsapp",
      gradient: "from-green-600 via-emerald-600 to-teal-600",
      hoverGradient: "from-green-500 via-emerald-500 to-teal-500",
      glowColor: "rgba(34, 197, 94, 0.6)",
      accentGlow: "from-green-400/50 via-emerald-400/50 to-teal-400/50",
      borderGlow: "from-green-400/80 via-emerald-400/80 to-teal-400/80"
    },
    {
      id: "customizer",
      icon: Settings2,
      label: "Customize",
      href: "#",
      description: "Personalize your portfolio experience with custom themes and layouts.",
      subtitle: "Theme & Layout Options",
      priority: "low",
      action: "customizer",
      gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
      hoverGradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      glowColor: "rgba(139, 92, 246, 0.6)",
      accentGlow: "from-violet-400/50 via-purple-400/50 to-fuchsia-400/50",
      borderGlow: "from-violet-400/80 via-purple-400/80 to-fuchsia-400/80"
    }
  ]

  const handleButtonClick = useCallback((button: typeof buttonConfigs[0]) => {
    switch (button.action) {
      case "scroll":
        const contactSection = document.querySelector(button.href)
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" })
        }
        break
      case "download":
        const link = document.createElement('a')
        link.href = button.href
        link.download = 'resume.pdf'
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        break
      case "external":
        window.open(button.href, "_blank", "noopener,noreferrer")
        break
      case "whatsapp":
        window.open(button.href, "_blank", "noopener,noreferrer")
        break
      case "customizer":
        openCustomizer()
        break
      default:
        if (button.href.startsWith('http')) {
          window.open(button.href, "_blank", "noopener,noreferrer")
        } else {
          window.location.href = button.href
        }
    }
  }, [openCustomizer])

  // Enhanced Button Component with Guaranteed Visible Background Colors
  const EnhancedButton = ({ button }: { button: typeof buttonConfigs[0] }) => {
    const IconComponent = button.icon
    
    return (
      <div
        className={cn(
          "relative h-16 w-16 rounded-2xl transition-all duration-500 ease-out cursor-pointer",
          "hover:scale-105 hover:rotate-2 shadow-xl hover:shadow-2xl ",
          "focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50 focus:outline-none ",
          "active:scale-95 group overflow-hidden bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60 shadow-lg",
          "transform-gpu will-change-transform"
        )}
        onClick={() => handleButtonClick(button)}
        aria-label={`${button.label} - ${button.description}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleButtonClick(button)
          }
        }}
      >
        {/* Primary Background Layer - This ensures the gradient is always visible */}
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${button.gradient})`
          }}
        />

        {/* Secondary Background Layer for Enhanced Depth */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-90"
          style={{
            background: `linear-gradient(135deg, ${button.gradient})`,
            filter: "brightness(1.1) saturate(1.2)"
          }}
        />

        {/* Button Content with Icon */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <IconComponent className="h-8 w-8 text-white transition-all duration-300 group-hover:scale-110 drop-shadow-lg" />
        </div>

        {/* Enhanced Hover Glow Effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-500 ease-out"
          style={{
            background: `linear-gradient(135deg, ${button.accentGlow})`,
            transform: "scale(1.1)"
          }}
        />

        {/* Premium Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />

        {/* Enhanced Border Glow on Hover */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${button.borderGlow})`,
            filter: "blur(1px)"
          }}
        />

        {/* Subtle Inner Shadow for Depth */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-60" />

        {/* Enhanced Box Shadow for Better Visibility */}
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: `0 20px 40px -12px ${button.glowColor}, 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
          }}
        />
      </div>
    )
  }

  return (
    <>
      {/* Enhanced Premium Vertical Floating CTA */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6">
        {buttonConfigs.map((button, index) => (
          <div 
            key={button.id} 
            className="relative group"
            onMouseEnter={() => setHoveredButton(button.id)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {/* Button Container */}
            <div className="relative">
              {/* Enhanced Button with Guaranteed Colors */}
              <EnhancedButton button={button} />

              {/* Priority Indicator - Only for High Priority */}
              {button.priority === "high" && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-pulse shadow-md" />
                </div>
              )}

              {/* Connection Line - Enhanced */}
              {index < buttonConfigs.length - 1 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent mt-2" />
              )}
            </div>

            {/* Enhanced Tooltip with Theme Colors */}
            <div 
              className={cn(
                "absolute right-full top-1/2 -translate-y-1/2 mr-5 opacity-0 group-hover:opacity-100",
                "transition-all duration-300 ease-out pointer-events-none transform translate-x-2 group-hover:translate-x-0"
              )}
            >
              <div 
                className={cn(
                  "relative px-5 py-4 rounded-xl shadow-xl backdrop-blur-xl border",
                  "min-w-[260px] max-w-sm",
                  "bg-white/95 dark:bg-gray-900/95",
                  "border border-white/20 dark:border-gray-700/50"
                )}
              >
                {/* Tooltip Header - Enhanced */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "p-2.5 rounded-lg bg-gradient-to-r shadow-md",
                    button.accentGlow
                  )}>
                    <button.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base leading-tight text-gray-900 dark:text-white">{button.label}</h3>
                    <p className="text-sm opacity-80 leading-relaxed text-gray-600 dark:text-gray-300">{button.subtitle}</p>
                  </div>
                </div>

                {/* Tooltip Content */}
                <p className="text-sm leading-relaxed opacity-90 mb-3 text-gray-700 dark:text-gray-200">{button.description}</p>

                {/* Action Indicator */}
                <div className="flex items-center gap-2 text-xs opacity-70 text-gray-600 dark:text-gray-400">
                  <span>
                    {button.action === "scroll" && "Click to scroll to contact"}
                    {button.action === "download" && "Click to download resume"}
                    {button.action === "external" && "Click to open Calendly"}
                    {button.action === "whatsapp" && "Click to open WhatsApp"}
                    {button.action === "customizer" && "Click to open customizer"}
                  </span>
                  {(button.action === "external" || button.action === "whatsapp" || button.action === "download") && (
                    <ExternalLink className="h-3 w-3 ml-1" />
                  )}
                </div>

                {/* Tooltip Arrow */}
                <div 
                  className="absolute left-full top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-white/95 dark:bg-gray-900/95 border-l border-b border-white/20 dark:border-gray-700/50"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Enhanced Accent Line - Matches Button Theme */}
        <div className="flex justify-center mt-4">
          <div className="w-1 h-16 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60 shadow-lg" />
        </div>
      </div>

      {/* Mobile Bottom CTA - Enhanced */}
      <div className="fixed inset-x-4 bottom-6 z-40 mx-auto max-w-2xl md:hidden">
        <div
          className={cn(
            "flex items-center gap-4 rounded-xl p-5 transition-all duration-300",
            "hover:scale-105 shadow-xl backdrop-blur-xl border"
          )}
          style={{
            background: themeColors.background,
            border: themeColors.border,
            boxShadow: themeColors.boxShadow,
          }}
        >
          <Button
            size="lg"
            className={cn(
              "group relative rounded-lg px-6 py-3 font-semibold text-white",
              "transition-all duration-300 hover:scale-105 shadow-xl",
              "focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50",
              "active:scale-100 cursor-pointer"
            )}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              boxShadow: "0 15px 30px -8px rgba(102, 126, 234, 0.4)",
            }}
            onClick={() => handleButtonClick(buttonConfigs[0])}
            aria-label="Hire Me - Premium Development Services"
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5" />
              <span>Hire Me</span>
            </div>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className={cn(
              "rounded-lg px-5 py-3 shadow-lg hover:shadow-xl",
              "transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/50",
              "active:scale-100 cursor-pointer"
            )}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #06B6D4 100%)",
              boxShadow: "0 15px 30px -8px rgba(102, 126, 234, 0.4)",
              border: "none",
              color: "#ffffff",
            }}
            onClick={() => handleButtonClick(buttonConfigs[4])}
            aria-label="Customize - Theme & Layout Options"
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span>Customize</span>
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}
