"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { projects } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useCustomization } from "@/components/providers/customization-provider"
import { cn } from "@/lib/utils"
import { ExternalLink, Github, Play, Award, TrendingUp, Users, Zap } from "lucide-react"

type Project = (typeof projects)[number]

const projectImageMap: Record<string, string> = {
  "Payments Platform": "/images/projects/payments-platform.png",
  "Care Portal": "/images/projects/care-portal.png",
  "Analytics SaaS": "/images/projects/analytics-saas.png",
}
const projectFallback = "/images/projects/generic-project-1.png"

const projectIcons = {
  "Payments Platform": TrendingUp,
  "Care Portal": Users,
  "Analytics SaaS": Zap,
}

export function ProjectsSection() {
  const { customization } = useCustomization()
  const [filter, setFilter] = useState<string>("All")
  const [active, setActive] = useState<Project | null>(null)

  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))], [])
  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  )

  const imgClass = customization.imageSize === "sm" ? "h-48" : customization.imageSize === "md" ? "h-64" : "h-80"

  return (
    <section
      id="projects"
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
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Premium header */}
        <header className="text-center mb-16 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Award className="w-8 h-8 text-purple-500" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-900 via-purple-600 to-blue-900 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium"
            style={{ color: "var(--fg-secondary)" }}
          >
            Enterprise-grade solutions with measurable business impact.
            <span className="block mt-2 text-base opacity-80">
              Each project represents months of strategic planning, technical excellence, and successful delivery.
            </span>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-6" />
        </header>

        {/* Premium filter chips */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="lg"
              variant={filter === cat ? "default" : "outline"}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full transition-all duration-300 px-6 py-3 font-semibold",
                filter === cat ? "shadow-lg scale-105" : "shadow-md hover:shadow-lg hover:scale-105",
              )}
              style={
                filter === cat
                  ? {
                      background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
                      color: "#ffffff",
                      boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)",
                    }
                  : {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(20px)",
                      color: "var(--fg)",
                    }
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Premium project grid */}
        <div
          className={cn(
            "grid gap-8 max-w-7xl mx-auto",
            customization.layout === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl",
          )}
        >
          {filtered.map((p, index) => {
            const img = projectImageMap[p.title] || projectFallback
            const ProjectIcon = projectIcons[p.title as keyof typeof projectIcons] || Award

            return (
              <article
                key={p.title}
                className="group relative overflow-hidden rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
                }}
              >
                {/* Premium image container */}
                <div className={cn("relative w-full overflow-hidden", imgClass)}>
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={p.imageAlt}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Floating project icon - Clean style */}
                  <div 
                    className="absolute top-4 left-4 w-12 h-12 rounded-2xl backdrop-blur-md flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))",
                      border: "1px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 4px 14px -2px rgba(0,0,0,0.15)",
                    }}
                  >
                    <ProjectIcon className="w-6 h-6 text-white" style={{ strokeWidth: 2.5 }} />
                  </div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => setActive(p)}
                      className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md text-white font-medium transition-all duration-300 hover:scale-110"
                    >
                      <Play className="w-5 h-5" />
                      <span>View Case Study</span>
                    </button>
                  </div>
                </div>

                {/* Premium content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: "var(--fg)" }}>
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium text-green-500">Live</span>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed mb-6" style={{ color: "var(--fg-secondary)" }}>
                    {p.summary}
                  </p>

                  {/* Premium tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.slice(0, 3).map((t) => (
                      <Badge
                        key={t}
                        className="px-3 py-1 text-xs font-medium rounded-full border-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
                          color: "var(--fg)",
                        }}
                      >
                        {t}
                      </Badge>
                    ))}
                    {p.tags.length > 3 && (
                      <Badge
                        className="px-3 py-1 text-xs font-medium rounded-full border-0"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "var(--fg-secondary)",
                        }}
                      >
                        +{p.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Results and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-bold text-green-500">{p.results}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setActive(p)}
                      className="rounded-full px-4 py-2 font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                        color: "white",
                        boxShadow: "0 5px 15px -3px rgba(59, 130, 246, 0.4)",
                      }}
                    >
                      Case Study
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Premium modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl rounded-3xl border-0 p-0 overflow-hidden">
          {active && (
            <div className="relative">
              {/* Modal header image */}
              <div className="relative h-80 w-full">
                <Image
                  src={projectImageMap[active.title] || projectFallback}
                  alt={active.imageAlt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-white mb-2">{active.title}</DialogTitle>
                    <p className="text-white/90 text-lg">{active.summary}</p>
                  </DialogHeader>
                </div>
              </div>

              {/* Modal content */}
              <div className="p-8 space-y-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="text-xl font-bold mb-4" style={{ color: "var(--fg)" }}>
                      Project Overview
                    </h4>
                    <p className="text-base leading-relaxed mb-6" style={{ color: "var(--fg-secondary)" }}>
                      {active.description}
                    </p>

                    <h4 className="text-xl font-bold mb-4" style={{ color: "var(--fg)" }}>
                      Key Achievements
                    </h4>
                    <ul className="space-y-3">
                      {active.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Award className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-4" style={{ color: "var(--fg)" }}>
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {active.tags.map((t) => (
                        <Badge
                          key={t}
                          className="px-4 py-2 text-sm font-medium rounded-full border-0"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
                            color: "var(--fg)",
                          }}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div
                        className="p-6 rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
                          border: "1px solid rgba(34, 197, 94, 0.2)",
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <TrendingUp className="w-6 h-6 text-green-500" />
                          <span className="font-bold text-2xl text-green-500">{active.results}</span>
                        </div>
                        <p className="text-sm" style={{ color: "var(--fg-secondary)" }}>
                          Measurable business impact achieved
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          asChild
                          className="flex-1 rounded-full font-medium"
                          style={{
                            background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                            color: "white",
                          }}
                        >
                          <a href="#contact" className="flex items-center justify-center gap-2">
                            <span>Discuss Similar Project</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full px-6 bg-transparent"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            borderColor: "rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(20px)",
                          }}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
