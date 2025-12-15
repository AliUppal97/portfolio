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
            className="flex items-center gap-3 group logo-link"
            data-no-hover="true"
            style={{
              textDecoration: 'none',
              transform: 'translateY(0) !important',
              transition: 'opacity 200ms ease',
              boxShadow: 'none !important',
              willChange: 'opacity',
            }}
          >
            {/* Rounded square icon with gradient background - animated */}
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center logo-icon-container relative overflow-visible"
              style={{
                background: `linear-gradient(135deg, ${siteConfig.branding.primaryColor} 0%, ${siteConfig.branding.secondaryColor} 100%)`,
                boxShadow: 'none',
              }}
            >
              {/* Animated glow effect on hover */}
              <div className="logo-icon-glow absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shine effect */}
              <div className="logo-icon-shine absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* White lightning bolt icon */}
              <Zap 
                className="w-5 h-5 text-white logo-icon-zap relative z-10" 
                strokeWidth={2.5}
              />
            </div>
            
            {/* Logo text */}
            <span 
              className="font-bold text-lg hidden sm:block logo-text"
              style={{ 
                color: "hsl(var(--text-primary))",
                transform: 'none',
                transition: 'none',
              }}
            >
              {siteConfig.branding.logoText}
            </span>
          </a>
          

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 nav-container">
            {navItems.slice(0, 7).map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "nav-item relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-500",
                    "flex items-center gap-2 group/item overflow-hidden"
                  )}
                  data-no-hover="true"
                  style={{
                    backgroundColor: isActive 
                      ? "hsl(var(--primary) / 0.1)" 
                      : "transparent",
                    color: isActive 
                      ? "hsl(var(--primary))" 
                      : "hsl(var(--text-secondary))",
                    // Reserve space for border to prevent layout shift
                    border: '1px solid transparent',
                    transform: 'none',
                    boxShadow: 'none',
                  }}
                >
                  {/* Premium animated background gradient on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-all duration-500 nav-item-bg"
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--primary) / 0.2) 0%, hsl(var(--primary) / 0.08) 50%, hsl(var(--primary) / 0.05) 100%)`,
                      backdropFilter: 'blur(12px)',
                    }}
                  />
                  
                  {/* Enhanced glow effect with animation */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-all duration-500 nav-item-glow"
                    style={{
                      background: `radial-gradient(circle at center, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0.15) 40%, transparent 70%)`,
                      filter: 'blur(14px)',
                    }}
                  />
                  
                  {/* Shine sweep effect */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 nav-item-shine pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)`,
                      backgroundSize: '200% 200%',
                    }}
                  />
                  
                  {/* Premium border glow on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-all duration-500 nav-item-border pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0 1.5px hsl(var(--primary) / 0.4), 0 0 24px hsl(var(--primary) / 0.3), inset 0 0 24px hsl(var(--primary) / 0.15)`,
                    }}
                  />
                  
                  {/* Subtle scale effect using pseudo-element (doesn't affect layout) */}
                  <div className="absolute inset-0 rounded-xl nav-item-scale pointer-events-none" />
                  
                  {/* Icon with rotation and scale */}
                  <item.icon className="w-4 h-4 relative z-10 transition-all duration-500 nav-item-icon" />
                  
                  {/* Text with slide effect */}
                  <span className="relative z-10 transition-all duration-500 nav-item-text">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full nav-item-indicator"
                      style={{
                        background: `linear-gradient(135deg, ${siteConfig.branding.primaryColor}, ${siteConfig.branding.secondaryColor})`,
                        boxShadow: `0 0 8px ${siteConfig.branding.primaryColor}80`,
                      }}
                    />
                  )}
                </button>
              )
            })}
            

            {/* Premium More dropdown */}
            <div className="relative group nav-more">
              <button
                className="nav-item relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-500 flex items-center gap-2 overflow-hidden nav-more-button"
                data-no-hover="true"
                style={{ 
                  color: "var(--fg-secondary)",
                  backgroundColor: "transparent",
                  // Reserve space for border to prevent layout shift
                  border: '1px solid transparent',
                  transform: 'none',
                  boxShadow: 'none',
                }}
              >
                {/* Premium animated background */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 nav-more-bg"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--primary) / 0.2) 0%, hsl(var(--primary) / 0.08) 50%, hsl(var(--primary) / 0.05) 100%)`,
                    backdropFilter: 'blur(12px)',
                  }}
                />
                
                {/* Enhanced glow effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 nav-more-glow"
                  style={{
                    background: `radial-gradient(circle at center, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0.15) 40%, transparent 70%)`,
                    filter: 'blur(14px)',
                  }}
                />
                
                {/* Shine sweep effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 nav-more-shine pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)`,
                    backgroundSize: '200% 200%',
                  }}
                />
                
                <span className="relative z-10 transition-all duration-500 group-hover:text-[hsl(var(--primary))] nav-more-text">More</span>
                <ChevronDown className="w-4 h-4 relative z-10 transition-all duration-500 group-hover:rotate-180 group-hover:text-[hsl(var(--primary))] nav-more-icon" style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
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
                          "flex items-center gap-3 group/item relative overflow-hidden"
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
              className="nav-cta relative rounded-full px-6 py-2 font-semibold transition-all duration-500 overflow-hidden group/cta"
              style={{
                background: `linear-gradient(135deg, ${siteConfig.branding.primaryColor} 0%, ${siteConfig.branding.secondaryColor} 100%)`,
                color: "white",
                boxShadow: `0 10px 25px -5px ${siteConfig.branding.primaryColor}66`,
              }}
            >
              {/* Animated shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 cta-shine"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)`,
                  backgroundSize: '200% 200%',
                }}
              />
              
              {/* Enhanced glow on hover */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${siteConfig.branding.primaryColor}80 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                  transform: 'scale(1.5)',
                }}
              />
              
              <MessageSquare className="w-4 h-4 mr-2 relative z-10 transition-all duration-500 group-hover/cta:rotate-12" style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
              <span className="relative z-10 transition-all duration-500">Let's Talk</span>
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
      
      {/* Consolidated styles - all navigation styles in one block */}
      <style jsx>{`
        .logo-link {
          position: relative;
          display: inline-flex;
        }
        
        .logo-link:hover {
          transform: translateY(0) !important;
          box-shadow: none !important;
          filter: none !important;
          scale: 1 !important;
        }
        
        .logo-link:active {
          transform: translateY(0) !important;
          box-shadow: none !important;
          scale: 1 !important;
        }
        
        .logo-icon-container {
          position: relative;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform;
          /* Ensure transforms don't affect parent layout */
          transform-origin: center;
        }
        
        .logo-link:hover .logo-icon-container {
          transform: scale(1.08) rotate(8deg);
        }
        
        .logo-icon-glow {
          background: radial-gradient(circle, ${siteConfig.branding.primaryColor}70 0%, transparent 70%);
          filter: blur(10px);
          transform: scale(1.3);
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        
        .logo-icon-shine {
          background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%);
          background-size: 200% 200%;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        
        .logo-link:hover .logo-icon-shine {
          animation: logoShine 2s linear infinite;
        }
        
        .logo-icon-zap {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
          filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0));
          transform-origin: center;
          will-change: transform, filter;
        }
        
        .logo-link:hover .logo-icon-zap {
          transform: scale(1.15) rotate(-8deg);
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 20px ${siteConfig.branding.primaryColor}80);
        }
        
        @keyframes logoShine {
          0% {
            background-position: -200% -200%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
        
        .logo-text {
          position: relative;
        }
        
        .logo-text:hover {
          transform: none !important;
        }
        
        .nav-container {
          /* Prevent container from shifting */
          min-height: 2.5rem;
          align-items: center;
          /* Prevent overflow from glow effects */
          overflow: visible;
          /* Ensure stable positioning */
          position: relative;
        }
        
        .nav-item {
          position: relative;
          /* Prevent any layout shifts */
          will-change: auto;
          /* Ensure consistent sizing */
          min-height: 2.5rem;
          box-sizing: border-box;
          /* Smooth transitions for all properties */
          transition: border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease;
          /* Force no transforms or shadows from global styles */
          transform: none !important;
          box-shadow: none !important;
          /* Prevent any position changes */
          margin: 0;
          padding: 0.5rem 0.75rem;
        }
        
        .nav-item:hover {
          /* Only opacity/color changes, no size/position changes */
          transform: none !important;
          box-shadow: none !important;
          /* Enhanced border color on hover */
          border-color: hsl(var(--primary) / 0.4);
          /* Prevent any margin/padding changes */
          margin: 0 !important;
          padding: 0.5rem 0.75rem !important;
        }
        
        /* Premium scale effect using pseudo-element (doesn't affect layout) */
        .nav-item-scale {
          background: linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, transparent 100%);
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .nav-item:hover .nav-item-scale {
          opacity: 1;
          transform: scale(1);
        }
        
        /* Enhanced background animation */
        .nav-item-bg {
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: scale(0.98);
        }
        
        .nav-item:hover .nav-item-bg {
          transform: scale(1);
        }
        
        /* Enhanced glow with pulse effect */
        .nav-item-glow {
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: scale(0.9);
          animation: navGlowPulse 3s ease-in-out infinite;
          /* Ensure glow doesn't cause overflow */
          pointer-events: none;
          overflow: hidden;
        }
        
        .nav-item:hover .nav-item-glow {
          transform: scale(1.1);
          /* Keep glow contained */
          overflow: hidden;
        }
        
        @keyframes navGlowPulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
        
        /* Shine sweep animation */
        .nav-item-shine {
          transition: opacity 0.4s ease;
        }
        
        .nav-item:hover .nav-item-shine {
          animation: navShineSweep 2s linear infinite;
        }
        
        @keyframes navShineSweep {
          0% {
            background-position: -200% -200%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
        
        /* Enhanced border animation */
        .nav-item-border {
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
        }
        
        .nav-item-icon {
          transform: translateX(0) rotate(0deg) scale(1);
          /* Fixed size to prevent layout shift */
          width: 1rem;
          height: 1rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          /* Ensure icon rotation doesn't affect parent */
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                      color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 0.4s ease;
        }
        
        .nav-item:hover .nav-item-icon {
          /* Enhanced transform with scale and rotation */
          transform: rotate(8deg) scale(1.1);
          color: hsl(var(--primary));
          filter: drop-shadow(0 0 6px hsl(var(--primary) / 0.6)) drop-shadow(0 0 12px hsl(var(--primary) / 0.4));
        }
        
        .nav-item-text {
          transform: translateX(0);
          /* Keep font-weight constant to prevent layout shift */
          font-weight: 500;
          display: inline-block;
          /* Prevent text from shifting */
          white-space: nowrap;
          transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                      text-shadow 0.4s ease;
          /* Reserve space by using consistent metrics */
          line-height: 1.5;
          letter-spacing: 0;
          /* Prevent any layout shifts */
          width: auto;
          min-width: 0;
        }
        
        .nav-item:hover .nav-item-text {
          /* Only color change, no position/weight/letter-spacing change to prevent layout shift */
          transform: none !important;
          color: hsl(var(--primary));
          /* Keep font-weight constant - use text-shadow for emphasis instead */
          font-weight: 500;
          text-shadow: 0 0 8px hsl(var(--primary) / 0.4), 
                       0 1px 2px rgba(0, 0, 0, 0.1);
          /* Keep letter-spacing constant to prevent width changes */
          letter-spacing: 0;
        }
        
        .nav-item-indicator {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: translateX(-50%);
          }
          50% {
            opacity: 0.7;
            transform: translateX(-50%);
          }
        }
        
        .nav-more-button {
          /* Prevent any layout shifts */
          will-change: auto;
          transition: border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          /* Force no transforms or shadows from global styles */
          transform: none !important;
          box-shadow: none !important;
          margin: 0;
          padding: 0.5rem 0.75rem;
        }
        
        .nav-more-button:hover {
          transform: none !important;
          box-shadow: none !important;
          border-color: hsl(var(--primary) / 0.4);
          /* Prevent any margin/padding changes */
          margin: 0 !important;
          padding: 0.5rem 0.75rem !important;
        }
        
        .nav-more-text {
          font-weight: 500;
          white-space: nowrap;
          transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                      text-shadow 0.4s ease;
          letter-spacing: 0;
          width: auto;
          min-width: 0;
        }
        
        .nav-more-button:hover .nav-more-text {
          color: hsl(var(--primary));
          font-weight: 500;
          text-shadow: 0 0 8px hsl(var(--primary) / 0.4), 
                       0 1px 2px rgba(0, 0, 0, 0.1);
          /* Keep letter-spacing constant to prevent width changes */
          letter-spacing: 0;
        }
        
        .nav-more-icon {
          transform-origin: center;
          /* Ensure rotation doesn't affect layout */
          will-change: transform;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                      color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 0.4s ease;
          transform: rotate(0deg) scale(1);
        }
        
        .nav-more-button:hover .nav-more-icon {
          transform: rotate(180deg) scale(1.1);
          color: hsl(var(--primary));
          filter: drop-shadow(0 0 6px hsl(var(--primary) / 0.6));
        }
        
        /* Enhanced More button background effects */
        .nav-more-bg {
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: scale(0.98);
        }
        
        .nav-more-button:hover .nav-more-bg {
          transform: scale(1);
        }
        
        .nav-more-glow {
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: scale(0.9);
          animation: navGlowPulse 3s ease-in-out infinite;
        }
        
        .nav-more-button:hover .nav-more-glow {
          transform: scale(1.1);
        }
        
        .nav-more-shine {
          transition: opacity 0.4s ease;
        }
        
        .nav-more-button:hover .nav-more-shine {
          animation: navShineSweep 2s linear infinite;
        }
        
        .nav-cta {
          position: relative;
        }
        
        .nav-cta:hover {
          /* Only shadow change, no transform to prevent layout shift */
          transform: none;
          box-shadow: 0 15px 35px -5px ${siteConfig.branding.primaryColor}99, 0 0 30px ${siteConfig.branding.primaryColor}40 !important;
        }
        
        .cta-shine {
          animation: shine 2s linear infinite;
        }
        
        @keyframes shine {
          0% {
            background-position: -200% -200%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
      `}</style>
    </header>
  )
}

