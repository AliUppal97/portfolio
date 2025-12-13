"use client"

import { useState, useEffect, useCallback } from "react"
import { useCustomization } from "@/components/providers/customization-provider"
import { cn } from "@/lib/utils"
import { 
  Home, 
  User, 
  Briefcase, 
  FolderGit2, 
  Award, 
  MessageSquare, 
  FileText, 
  Menu, 
  X,
  Zap,
  Code2,
  Wrench,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  BadgeCheck,
  Newspaper,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/lib/site-config"

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "#home" },
  { id: "about", label: "About", icon: User, href: "#about" },
  { id: "achievements", label: "Achievement", icon: Award, href: "#achievements" },
  { id: "technologies", label: "Tech Stack", icon: Code2, href: "#technologies" },
  { id: "tools", label: "Tool", icon: Wrench, href: "#tools" },
  { id: "experience", label: "Experience", icon: Briefcase, href: "#experience" },
  { id: "projects", label: "Project", icon: FolderGit2, href: "#projects" },
  { id: "certifications", label: "Certification", icon: BadgeCheck, href: "#certifications" },
  { id: "articles", label: "Article", icon: Newspaper, href: "#articles" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
]

// Enhanced dropdown items with descriptions and accent colors
const dropdownItems = [
  { 
    id: "certifications", 
    label: "Certifications", 
    icon: BadgeCheck, 
    href: "#certifications",
    description: "Professional credentials",
    accent: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  },
  { 
    id: "articles", 
    label: "Articles", 
    icon: Newspaper, 
    href: "#articles",
    description: "Technical insights & guides",
    accent: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
  },
  { 
    id: "contact", 
    label: "Contact", 
    icon: Mail, 
    href: "#contact",
    description: "Let's work together",
    accent: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  },
]

export function Navigation() {
  const { customization } = useCustomization()
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Handle scroll to update active section and header style
  useEffect(() => {
    const handleScroll = () => {
      // Update header style
      setIsScrolled(window.scrollY > 50)

      // Update active section
      const sections = navItems.map(item => item.id)
      let current = "home"

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = sectionId
            break
          }
        }
      }

      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setIsMobileOpen(false)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "backdrop-blur-xl shadow-lg" 
          : "backdrop-blur-sm"
      )}
      style={{
        backgroundColor: isScrolled 
          ? "hsl(var(--surface) / 0.95)" 
          : "hsl(var(--surface) / 0.7)",
        borderBottom: isScrolled 
          ? "1px solid hsl(var(--border) / 0.3)" 
          : "none",
      }}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a 
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#home")
            }}
            className="flex items-center gap-3 group relative"
            style={{ 
              overflow: 'visible', 
              transform: 'translateZ(0)',
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
          >
            <div className="relative w-10 h-10 logo-container" style={{ willChange: 'transform', overflow: 'visible' }}>
              {/* Animated gradient background with rotation */}
              <div
                className="absolute inset-0 rounded-xl flex items-center justify-center transition-all duration-500 logo-bg"
                style={{
                  background: `linear-gradient(135deg, ${siteConfig.branding.primaryColor} 0%, ${siteConfig.branding.secondaryColor} 50%, ${siteConfig.branding.primaryColor} 100%)`,
                  backgroundSize: '200% 200%',
                  boxShadow: 'none',
                  transform: 'scale(1) rotate(0deg) translateZ(0)',
                  transformOrigin: 'center center',
                }}
              >
                {/* Holographic shimmer overlay */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 logo-shimmer"
                  style={{
                    background: `linear-gradient(
                      135deg,
                      transparent 0%,
                      rgba(255, 255, 255, 0.3) 25%,
                      transparent 50%,
                      rgba(255, 255, 255, 0.2) 75%,
                      transparent 100%
                    )`,
                    backgroundSize: '200% 200%',
                    mixBlendMode: 'overlay',
                  }}
                />
                
                
                {/* Icon with animated glow */}
                <Zap 
                  className="w-5 h-5 text-white relative z-10 transition-all duration-500 logo-icon" 
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))',
                    transform: 'scale(1) rotate(0deg)',
                  }}
                />
              </div>
            </div>
            
            <span 
              className="font-bold text-lg hidden sm:block transition-all duration-300 relative logo-text inline-block"
              style={{ 
                color: "hsl(var(--text-primary))",
                letterSpacing: 'normal',
              }}
            >
              {siteConfig.branding.logoText}
              {/* Elegant gradient underline on hover */}
              <span
                className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r transition-all duration-500 opacity-0 group-hover:opacity-100 logo-underline"
                style={{
                  width: '0%',
                  background: `linear-gradient(90deg, ${siteConfig.branding.primaryColor}, ${siteConfig.branding.secondaryColor})`,
                  transform: '',
                }}
              />
            </span>
            
            {/* CSS Animations */}
            <style jsx>{`
              .logo-container {
                overflow: visible;
                contain: layout style paint;
              }
              
              .logo-bg {
                animation: gradientShift 3s ease infinite;
                will-change: transform;
                contain: layout style paint;
                transform-origin: center center;
              }
              
              .group {
                transform: translateZ(0);
              }
              
              .group:hover {
                transform: translateZ(0) translateY(0);
                background-color: transparent !important;
                box-shadow: none !important;
              }
              
              .group:hover .logo-bg {
                transform: scale(1.1) rotate(12deg) translateZ(0);
                transform-origin: center center;
                box-shadow: none !important;
              }
              
              .logo-shimmer {
                animation: shimmer 2s linear infinite;
                contain: layout style paint;
              }
              
              .logo-icon {
                animation: iconPulse 2s ease-in-out infinite;
                will-change: transform, filter;
                contain: layout style paint;
                transform-origin: center center;
              }
              
              .group:hover .logo-icon {
                transform: scale(1.1) rotate(12deg) translateZ(0);
                transform-origin: center center;
              }
              
              .logo-text {
                position: relative;
                display: inline-block;
                transform: translateZ(0);
              }
              
              .group:hover .logo-text {
                transform: translateZ(0) translateY(0);
              }
              
              .logo-underline {
                transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
                contain: layout style paint;
              }
              
              .group:hover .logo-underline {
                width: 100%;
              }
              
              @keyframes gradientShift {
                0% {
                  background-position: 0% 50%;
                }
                25% {
                  background-position: 100% 25%;
                }
                50% {
                  background-position: 100% 50%;
                }
                75% {
                  background-position: 0% 75%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }
              
              @keyframes shimmer {
                0% {
                  background-position: -200% -200%;
                }
                50% {
                  background-position: 200% 200%;
                }
                100% {
                  background-position: -200% -200%;
                }
              }
              
              @keyframes iconPulse {
                0% {
                  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)) brightness(1);
                  transform: scale(1);
                }
                20% {
                  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.7)) brightness(1.1);
                  transform: scale(1.05);
                }
                40% {
                  filter: drop-shadow(0 0 9px rgba(255, 255, 255, 0.9)) brightness(1.2);
                  transform: scale(1.1);
                }
                60% {
                  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.7)) brightness(1.1);
                  transform: scale(1.05);
                }
                80% {
                  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6)) brightness(1.05);
                  transform: scale(1.02);
                }
                100% {
                  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)) brightness(1);
                  transform: scale(1);
                }
              }
              
            `}</style>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 7).map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    "hover:scale-105 flex items-center gap-2"
                  )}
                  style={{
                    backgroundColor: isActive 
                      ? "hsl(var(--primary) / 0.1)" 
                      : "transparent",
                    color: isActive 
                      ? "hsl(var(--primary))" 
                      : "hsl(var(--text-secondary))",
                  }}
                  data-no-hover="true"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}

            {/* Premium More dropdown */}
            <div className="relative group">
              <button
                className="px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2"
                style={{ 
                  color: "var(--fg-secondary)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--surface-variant)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
                data-no-hover="true"
              >
                <span>More</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              {/* Premium Dropdown Panel - Following Project Standards */}
              <div 
                className="absolute right-0 top-full mt-3 w-72 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden"
                style={{
                  backgroundColor: "var(--card)",
                  border: "none",
                  boxShadow: "var(--shadow-5)",
                }}
              >
                {/* Subtle top accent line using primary color */}
                <div 
                  className="absolute top-0 left-0 right-0 h-px z-10"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%)`,
                    opacity: 0.4,
                  }}
                />
                
                {/* Dropdown header */}
                <div 
                  className="px-4 py-3 relative"
                  style={{ 
                    borderBottom: "1px solid var(--border)",
                    backgroundColor: "var(--surface)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" style={{ color: "var(--primary)" }} />
                    <span 
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--fg-secondary)" }}
                    >
                      Explore More
                    </span>
                  </div>
                </div>

                {/* Dropdown items */}
                <div className="p-2">
                  {dropdownItems.map((item, index) => {
                    const isActive = activeSection === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.href)}
                        className={cn(
                          "w-full px-3 py-3 rounded-xl text-left transition-all duration-300",
                          "flex items-center gap-3 group/item relative overflow-hidden",
                          "hover:translate-x-1"
                        )}
                        style={{
                          backgroundColor: isActive 
                            ? "var(--surface-variant)"
                            : "transparent",
                          transitionDelay: `${index * 30}ms`,
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "var(--surface)"
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "transparent"
                          }
                        }}
                        data-no-hover="true"
                      >
                        {/* Icon container with gradient */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/item:scale-110"
                          style={{
                            background: isActive ? item.gradient : `${item.accent}18`,
                            boxShadow: isActive ? `0 4px 12px -2px ${item.accent}40` : "none",
                          }}
                        >
                          <item.icon 
                            className="w-5 h-5 transition-colors duration-300" 
                            style={{ 
                              color: isActive ? "#ffffff" : item.accent,
                            }} 
                          />
                        </div>

                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span 
                              className="font-semibold text-sm"
                              style={{ 
                                color: isActive ? item.accent : "var(--fg)" 
                              }}
                            >
                              {item.label}
                            </span>
                            {isActive && (
                              <div 
                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{ backgroundColor: item.accent }}
                              />
                            )}
                          </div>
                          <p 
                            className="text-xs mt-0.5 truncate"
                            style={{ color: "var(--fg-secondary)" }}
                          >
                            {item.description}
                          </p>
                        </div>

                        {/* Arrow indicator on hover */}
                        <ArrowUpRight 
                          className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform translate-x-1 group-hover/item:translate-x-0"
                          style={{ color: item.accent }}
                        />
                      </button>
                    )
                  })}
                </div>

                {/* Bottom accent bar using primary color */}
                <div 
                  className="h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, var(--primary) 0%, ${customization.primary}88 50%, var(--primary) 100%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => scrollToSection("#contact")}
              className="rounded-full px-6 py-2 font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${siteConfig.branding.primaryColor} 0%, ${siteConfig.branding.secondaryColor} 100%)`,
                color: "white",
                boxShadow: `0 10px 25px -5px ${siteConfig.branding.primaryColor}66`,
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                style={{
                  backgroundColor: "hsl(var(--surface-variant) / 0.5)",
                }}
              >
                <Menu className="w-5 h-5" style={{ color: "hsl(var(--text-primary))" }} />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-80 p-0"
              style={{
                backgroundColor: "hsl(var(--surface))",
                border: "none",
              }}
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${siteConfig.branding.primaryColor} 0%, ${siteConfig.branding.secondaryColor} 100%)`,
                      }}
                    >
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span 
                      className="font-bold text-lg"
                      style={{ color: "hsl(var(--text-primary))" }}
                    >
                      {siteConfig.branding.logoText}
                    </span>
                  </div>
                </div>

                {/* Mobile Nav Items */}
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.href)}
                        className={cn(
                          "w-full px-4 py-3 rounded-2xl text-left font-medium transition-all duration-300",
                          "flex items-center gap-4"
                        )}
                        style={{
                          backgroundColor: isActive 
                            ? "hsl(var(--primary) / 0.1)" 
                            : "hsl(var(--surface-variant) / 0.5)",
                          color: isActive 
                            ? "hsl(var(--primary))" 
                            : "hsl(var(--text-primary))",
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: isActive 
                              ? "hsl(var(--primary) / 0.2)" 
                              : "hsl(var(--surface))",
                          }}
                        >
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8">
                  <Button
                    onClick={() => scrollToSection("#contact")}
                    className="w-full rounded-2xl py-6 font-semibold"
                    style={{
                      background: `linear-gradient(135deg, ${siteConfig.branding.primaryColor} 0%, ${siteConfig.branding.secondaryColor} 100%)`,
                      color: "white",
                      boxShadow: `0 10px 25px -5px ${siteConfig.branding.primaryColor}66`,
                    }}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Get In Touch
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

