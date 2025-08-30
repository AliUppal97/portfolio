"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Settings2, MessageCircle, Zap, Star, ChevronRight, ExternalLink, Sparkles, Crown, Award } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { useCustomization } from "@/components/providers/customization-provider"
import { cn } from "@/lib/utils"

const phone = "1234567890"
const prefill = encodeURIComponent("Hi! I saw your portfolio and would like to discuss a project opportunity.")

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
        buttonBg: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        buttonHoverBg: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 50%, #e085e8 100%)",
        buttonColor: "#ffffff",
        iconBg: "rgba(255, 255, 255, 0.15)",
        iconColor: "#ffffff",
        tooltipBg: "rgba(15, 23, 42, 0.98)",
        tooltipColor: "#ffffff",
        tooltipBorder: "rgba(255, 255, 255, 0.2)",
        accentGlow: "rgba(102, 126, 234, 0.3)"
      }
    } else {
      return {
        background: supportsBackdrop ? "rgba(15, 23, 42, 0.98)" : "#0f172a",
        border: "1px solid rgba(148, 163, 184, 0.3)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 163, 184, 0.2)",
        buttonBg: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        buttonHoverBg: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 50%, #e085e8 100%)",
        buttonColor: "#ffffff",
        iconBg: "rgba(255, 255, 255, 0.15)",
        iconColor: "#ffffff",
        tooltipBg: "rgba(255, 255, 255, 0.98)",
        tooltipColor: "#0f172a",
        tooltipBorder: "rgba(0, 0, 0, 0.1)",
        accentGlow: "rgba(102, 126, 234, 0.4)"
      }
    }
  }, [customization.theme, supportsBackdrop])

  const themeColors = getPremiumThemeColors()

  const buttonConfigs = [
    {
      id: "hire",
      icon: Crown,
      label: "Hire Me",
      href: "#contact",
      variant: "primary" as const,
      description: "Ready to build something extraordinary? Let's create the next big thing together.",
      subtitle: "Premium Development Services",
      badge: "Premium",
      accent: "from-yellow-400 via-orange-400 to-red-400",
      priority: "high"
    },
    {
      id: "schedule",
      icon: Calendar,
      label: "Schedule Call",
      href: "https://calendly.com/",
      variant: "secondary" as const,
      description: "Book a strategic consultation call to discuss your project vision.",
      subtitle: "Free Strategy Session",
      badge: "Free",
      accent: "from-blue-400 to-cyan-400",
      priority: "medium"
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${phone}?text=${prefill}`,
      variant: "secondary" as const,
      description: "Quick chat about your project requirements and timeline.",
      subtitle: "Instant Response",
      badge: "Live",
      accent: "from-green-400 to-emerald-400",
      priority: "medium"
    },
    {
      id: "customizer",
      icon: Settings2,
      label: "Customize",
      href: "#",
      variant: "icon" as const,
      description: "Personalize your portfolio experience with custom themes and layouts.",
      subtitle: "Theme & Layout Options",
      badge: "Pro",
      accent: "from-purple-400 to-pink-400",
      priority: "low"
    }
  ]

  return (
    <>
      {/* World-Class Premium Vertical Floating CTA */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6">
        {buttonConfigs.map((button, index) => (
          <div 
            key={button.id} 
            className="relative group"
            onMouseEnter={() => setHoveredButton(button.id)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {/* Premium Button Container */}
            <div className="relative">
              {/* World-Class Premium Button */}
              {button.variant === "icon" ? (
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "relative h-16 w-16 rounded-2xl transition-all duration-500 ease-out",
                    "hover:scale-110 hover:rotate-2 shadow-2xl hover:shadow-3xl",
                    "focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/50",
                    "active:scale-95 active:rotate-0"
                  )}
                  style={{
                    background: themeColors.buttonBg,
                    border: "none",
                    color: themeColors.buttonColor,
                    boxShadow: `0 20px 40px -12px ${themeColors.accentGlow}, 0 0 0 1px rgba(255, 255, 255, 0.2)`
                  }}
                  onClick={openCustomizer}
                  aria-label={`${button.label} - ${button.description}`}
                >
                  <div className="relative">
                    <button.icon className="h-7 w-7" />
                    <div className="absolute -inset-3 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" />
                  </div>
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  variant={button.variant === "primary" ? "default" : "outline"}
                  className={cn(
                    "relative h-16 w-16 rounded-2xl transition-all duration-500 ease-out",
                    "hover:scale-110 hover:rotate-2 shadow-2xl hover:shadow-3xl",
                    "focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/50",
                    "active:scale-95 active:rotate-0"
                  )}
                  style={{
                    background: themeColors.buttonBg,
                    border: "none",
                    color: themeColors.buttonColor,
                    boxShadow: `0 20px 40px -12px ${themeColors.accentGlow}, 0 0 0 1px rgba(255, 255, 255, 0.2)`
                  }}
                >
                  <a
                    href={button.href}
                    target={button.href.startsWith('http') ? "_blank" : "_self"}
                    rel={button.href.startsWith('http') ? "noopener noreferrer" : ""}
                    className="flex items-center justify-center w-full h-full relative"
                    aria-label={`${button.label} - ${button.description}`}
                  >
                    <div className="relative">
                      <button.icon className="h-7 w-7" />
                      <div className="absolute -inset-3 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" />
                    </div>
                  </a>
                </Button>
              )}

              {/* Premium Badge */}
              <div 
                className={cn(
                  "absolute -top-3 -right-3 px-3 py-1.5 rounded-full shadow-xl transform scale-0 group-hover:scale-100",
                  "transition-all duration-500 ease-out font-bold text-xs text-white",
                  "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400",
                  "border-2 border-white/30 backdrop-blur-sm"
                )}
              >
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>{button.badge}</span>
                </div>
              </div>

              {/* Priority Indicator */}
              {button.priority === "high" && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-pulse shadow-lg" />
                </div>
              )}

              {/* Hover Glow Ring */}
              <div 
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-500 ease-out blur-xl"
                )}
                style={{
                  background: `linear-gradient(135deg, ${button.accent})`,
                  transform: "scale(1.2)"
                }}
              />

              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </div>
            </div>

            {/* Premium Tooltip */}
            <div 
              className={cn(
                "absolute right-full top-1/2 -translate-y-1/2 mr-5 opacity-0 group-hover:opacity-100",
                "transition-all duration-500 ease-out pointer-events-none transform translate-x-3 group-hover:translate-x-0"
              )}
            >
              <div 
                className={cn(
                  "relative px-6 py-5 rounded-2xl shadow-2xl backdrop-blur-2xl border",
                  "min-w-[320px] max-w-sm"
                )}
                style={{
                  backgroundColor: themeColors.tooltipBg,
                  color: themeColors.tooltipColor,
                  border: `1px solid ${themeColors.tooltipBorder}`,
                }}
              >
                {/* Tooltip Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-xl bg-gradient-to-r shadow-lg",
                      button.accent
                    )}>
                      <button.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{button.label}</h3>
                      <p className="text-sm opacity-80 leading-relaxed">{button.subtitle}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "p-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-sm"
                  )}>
                    <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>

                {/* Tooltip Content */}
                <p className="text-sm leading-relaxed opacity-90 mb-4">{button.description}</p>

                {/* Action Indicator */}
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <Award className="h-3 w-3" />
                  <span>Click to {button.variant === "icon" ? "open" : "visit"}</span>
                  {button.href.startsWith('http') && (
                    <ExternalLink className="h-3 w-3 ml-1" />
                  )}
                </div>

                {/* Tooltip Arrow */}
                <div 
                  className="absolute left-full top-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
                  style={{
                    backgroundColor: themeColors.tooltipBg,
                    borderRight: `1px solid ${themeColors.tooltipBorder}`,
                    borderTop: `1px solid ${themeColors.tooltipBorder}`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Premium Accent Line */}
        <div className="flex justify-center mt-4">
          <div className="w-1.5 h-16 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60 shadow-lg" />
        </div>
      </div>

      {/* Mobile Bottom CTA */}
      <div className="fixed inset-x-4 bottom-6 z-40 mx-auto max-w-2xl md:hidden">
        <div
          className={cn(
            "flex items-center gap-4 rounded-2xl p-6 transition-all duration-500",
            "hover:scale-105 shadow-2xl backdrop-blur-xl border"
          )}
          style={{
            background: themeColors.background,
            border: themeColors.border,
            boxShadow: themeColors.boxShadow,
          }}
        >
          <Button
            asChild
            size="lg"
            className={cn(
              "group relative rounded-xl px-8 py-4 font-bold text-white",
              "transition-all duration-500 hover:scale-110 shadow-2xl",
              "focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/50",
              "active:scale-105"
            )}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              boxShadow: "0 20px 40px -12px rgba(102, 126, 234, 0.4)",
            }}
          >
            <a href="#contact" className="flex items-center gap-3">
              <Crown className="w-6 h-6 group-hover:animate-pulse" />
              <span>Hire Me</span>
              <Star className="w-4 h-4 text-yellow-300" />
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className={cn(
              "rounded-xl px-6 py-4 shadow-xl hover:shadow-2xl",
              "transition-all duration-300 focus:ring-4 focus:ring-offset-2 focus:ring-purple-500/50",
              "active:scale-95"
            )}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #06B6D4 100%)",
              boxShadow: "0 20px 40px -12px rgba(102, 126, 234, 0.4)",
              border: "none",
              color: "#ffffff",
            }}
            onClick={openCustomizer}
          >
            <Settings2 className="h-5 w-5 mr-2" />
            <span>Customize</span>
          </Button>
        </div>
      </div>
    </>
  )
}
   