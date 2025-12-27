"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Play, ArrowRight, Sparkles, Award, TrendingUp } from "lucide-react"
import { useTheme } from "next-themes"
import { useCustomization } from "@/components/providers/customization-provider"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { siteConfig, hasSocialLink, getProfessionalStats, hasIntroVideo } from "@/lib/site-config"
import { VideoModal } from "@/components/ui/video-modal"

export function HeroSection() {
  const { customization } = useCustomization()
  const { resolvedTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setMounted(true)
  }, [])
  
  // Determine if we're in dark mode (only after mount to avoid hydration mismatch)
  const isDark = mounted && resolvedTheme === "dark"
  
  // Premium icon colors - consistent across themes for premium look
  const githubIconColor = "#FFFFFF"
  const linkedinIconColor = "#FFFFFF"
  const githubBgColor = "#24292E" // GitHub's official dark color
  const linkedinBgColor = "#0077B5" // LinkedIn's vibrant blue

  return (
    <section
      id="home"
      className={cn(
        "container mx-auto px-4 relative overflow-hidden",
        customization.spacing === "compact"
          ? "py-16"
          : customization.spacing === "comfortable"
            ? "py-20 md:py-28"
            : "py-28 md:py-36",
      )}
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      {/* Premium background effects */}
      <div className="fixed left-0 top-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-0 w-full h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 w-full h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[800px] bg-gradient-to-r from-blue-400/3 to-purple-400/3 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 relative z-10">
        {/* Content */}
        <div className={cn("space-y-8", isVisible ? "animate-in slide-in-from-left duration-1000" : "opacity-0")}>
          {/* Premium badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 bg-gradient-to-r from-white/10 to-white/5">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {siteConfig.personal.title}
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>

          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              <span className="block text-text-primary dark:text-text-inverse">
                Building
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 animate-gradient">
                Enterprise-Grade
              </span>
              <span className="block text-text-primary dark:text-text-inverse">
                Experiences
              </span>
            </h1>
          </div>

          {/* Premium description */}
          <div className="space-y-4 max-w-2xl">
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-text-secondary">
              {siteConfig.stats.yearsOfExperience}+ years architecting scalable solutions across{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                fintech, healthcare, and SaaS
              </span>
              . {siteConfig.personal.shortBio}
            </p>

            {/* Key metrics */}
            <div className="flex flex-wrap gap-6 pt-4">
              {getProfessionalStats().map((stat, index) => {
                const icons = [TrendingUp, Award, Sparkles]
                const colors = ["text-text-success", "text-text-info", "text-text-warning"]
                const Icon = icons[index % icons.length]
                const color = colors[index % colors.length]
                return (
                  <div key={stat.label} className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className={`font-bold text-2xl ${color}`}>{stat.value}</span>
                    <span className="text-sm text-text-tertiary">{stat.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Premium CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden rounded-full px-8 py-4 text-lg font-bold shadow-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 20px 40px -10px rgba(102, 126, 234, 0.4)",
                color: "white",
              }}
            >
              <a href="#projects" className="flex items-center gap-2">
                <span>View Projects</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group rounded-full px-8 py-4 text-lg font-bold backdrop-blur-md border-2 transition-all duration-300 hover:scale-105 bg-transparent"
              style={{
                backgroundColor: "hsl(var(--surface) / 0.1)",
                borderColor: "hsl(var(--border) / 0.2)",
                backdropFilter: "blur(20px)",
                color: "hsl(var(--text-primary))",
              }}
            >
              <a href="#contact" className="flex items-center gap-2">
                <span>Let's Talk</span>
                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              </a>
            </Button>

            {/* Social links */}
            <div className="flex items-center gap-3 ml-4">
              {hasSocialLink("github") && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{
                    backgroundColor: githubBgColor,
                    color: githubIconColor,
                    boxShadow: `0 4px 12px -2px ${githubBgColor}40`,
                  }}
                  data-interactive="true"
                >
                  <Github className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  <span>GitHub</span>
                </a>
              )}
              {hasSocialLink("linkedin") && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{
                    backgroundColor: linkedinBgColor,
                    color: linkedinIconColor,
                    boxShadow: `0 4px 12px -2px ${linkedinBgColor}40`,
                  }}
                  data-interactive="true"
                >
                  <Linkedin className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Premium avatar */}
        <div
          className={cn("relative", isVisible ? "animate-in slide-in-from-right duration-1000 delay-300" : "opacity-0")}
        >
          <div className="relative mx-auto aspect-square w-full max-w-lg">
            
            {/* Elegant outer ring with subtle animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/50 via-indigo-400/50 to-purple-400/50 animate-spin-slow" />
            
            {/* Inner ring with complementary gradient */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-rose-400/40 animate-spin-reverse" />

            {/* Main image container with premium styling */}
            <div
              className="absolute inset-6 rounded-full shadow-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--surface) / 0.15) 0%, hsl(var(--surface) / 0.05) 100%)",
                backdropFilter: "blur(20px)",
                border: "3px solid hsl(var(--border) / 0.4)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              }}
            >
              <Image
                src={siteConfig.personal.avatarUrl}
                alt={`${siteConfig.personal.name} - ${siteConfig.personal.title}`}
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 80vw, 500px"
                priority
              />

              {/* Premium floating badge - top right */}
              <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg animate-float">
                <Award className="w-8 h-8 text-white drop-shadow-sm" />
              </div>

              {/* Premium floating badge - bottom left */}
              <div className="absolute -bottom-2 -left-2 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg animate-float-delayed">
                <Sparkles className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
            </div>

            {/* Premium play button with enhanced styling */}
            {hasIntroVideo() && (
              <button
                onClick={() => setIsVideoOpen(true)}
                className="absolute bottom-6 right-6 group flex items-center gap-3 rounded-full px-6 py-3 font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
                aria-label="Play introduction video"
              >
                <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium">Watch Intro</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {hasIntroVideo() && (
        <VideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl={siteConfig.personal.introVideoUrl}
          title={`${siteConfig.personal.name} - Introduction`}
        />
      )}

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
