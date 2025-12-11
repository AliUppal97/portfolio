"use client"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Layout,
  Layers,
  FileCode,
  Palette,
  Terminal,
  GitBranch,
  Database,
  Activity,
  Cloud,
  Container,
  Cpu,
  HardDrive,
  type LucideIcon,
} from "lucide-react"

type Tech = { icon: LucideIcon; alt: string; desc: string; color: string }

const techs: Tech[] = [
  { icon: Layout, alt: "Next.js", desc: "React framework for hybrid SSR/RSC apps with great DX.", color: "#000000" },
  { icon: Layers, alt: "React", desc: "Component-based UI library for building interactive interfaces.", color: "#61DAFB" },
  { icon: FileCode, alt: "TypeScript", desc: "Typed JavaScript that catches errors early and scales teams.", color: "#3178C6" },
  { icon: Palette, alt: "Tailwind CSS", desc: "Utility-first CSS for fast, consistent styling.", color: "#06B6D4" },
  { icon: Terminal, alt: "Node.js", desc: "JavaScript runtime for backend APIs and tooling.", color: "#339933" },
  { icon: GitBranch, alt: "GraphQL", desc: "Query APIs for exactly the data you need.", color: "#E10098" },
  { icon: Database, alt: "PostgreSQL", desc: "Reliable SQL database with rich features.", color: "#336791" },
  { icon: Activity, alt: "Kafka", desc: "High-throughput event streaming for microservices.", color: "#231F20" },
  { icon: Cloud, alt: "AWS", desc: "Cloud platform for compute, storage, and networking.", color: "#FF9900" },
  { icon: Container, alt: "Docker", desc: "Containerization for consistent deployments.", color: "#2496ED" },
  { icon: Cpu, alt: "Kubernetes", desc: "Orchestrates containers at scale.", color: "#326CE5" },
  { icon: HardDrive, alt: "Redis", desc: "In‑memory datastore for caching and queues.", color: "#DC382D" },
]

// Google Material Design icon cards with elevation instead of borders - using clean Lucide icons
export function SkillsIconCardsSection({ className = "" }: { className?: string }) {
  return (
    <section aria-label="Languages and stacks" className={cn("container mx-auto px-4 py-8 md:py-10", className)}>
      <h3 className="mb-6 text-xl font-semibold">Languages & Stacks</h3>
      <TooltipProvider>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {techs.map((t) => {
            const Icon = t.icon
            return (
              <Tooltip key={t.alt}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "group relative flex h-20 w-full cursor-pointer items-center justify-center rounded-3xl",
                      "transition-all duration-300 hover:scale-105 hover:-translate-y-1",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20",
                    )}
                    style={{
                      backgroundColor: "var(--card)",
                      border: "none",
                      boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 1px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 12px 28px -4px ${t.color}25, 0 8px 25px -5px rgba(0, 0, 0, 0.1)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 1px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={t.alt}
                    data-interactive="true"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${t.color}15, ${t.color}25)`,
                        border: `1px solid ${t.color}20`,
                      }}
                    >
                      <Icon
                        className="w-7 h-7 transition-all duration-300"
                        style={{
                          color: t.color,
                          strokeWidth: 1.5,
                        }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs text-center rounded-2xl"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <p className="text-sm font-medium">{t.alt}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </section>
  )
}
