"use client"

import { cn } from "@/lib/utils"
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

type Tile = { icon: LucideIcon; alt: string; color: string }

const techTiles: Tile[] = [
  { icon: Layout, alt: "Next.js", color: "#000000" },
  { icon: Layers, alt: "React", color: "#61DAFB" },
  { icon: FileCode, alt: "TypeScript", color: "#3178C6" },
  { icon: Palette, alt: "Tailwind CSS", color: "#06B6D4" },
  { icon: Terminal, alt: "Node.js", color: "#339933" },
  { icon: GitBranch, alt: "GraphQL", color: "#E10098" },
  { icon: Database, alt: "PostgreSQL", color: "#336791" },
  { icon: Activity, alt: "Kafka", color: "#231F20" },
  { icon: Cloud, alt: "AWS", color: "#FF9900" },
  { icon: Container, alt: "Docker", color: "#2496ED" },
  { icon: Cpu, alt: "Kubernetes", color: "#326CE5" },
  { icon: HardDrive, alt: "Redis", color: "#DC382D" },
]

// Google Material Design tile marquee with elevation - using clean Lucide icons
export function SkillsTileRowSection({ className = "" }: { className?: string }) {
  const row = [...techTiles, ...techTiles] // duplicate for seamless loop

  return (
    <section aria-label="Stacks and languages" className={cn("relative overflow-hidden py-8 md:py-10", className)}>
      {/* Edge blur overlays */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-y-0 left-0 w-24 bg-[linear-gradient(to_right,var(--bg),transparent)]" />
        <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(to_left,var(--bg),transparent)]" />
      </div>

      <div className="container mx-auto">
        <div
          className="-mx-2 flex min-w-max items-center gap-4 px-2"
          style={{
            animation: "marquee 28s linear infinite",
          }}
        >
          {row.map((t, i) => {
            const Icon = t.icon
            return (
              <div
                key={`${t.alt}-${i}`}
                className="group relative h-16 w-16 shrink-0 rounded-3xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
                style={{
                  backgroundColor: "var(--card)",
                  border: "none",
                  boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 1px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                title={t.alt}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}15, ${t.color}25)`,
                    border: `1px solid ${t.color}20`,
                  }}
                >
                  <Icon
                    className="w-6 h-6 transition-all duration-300"
                    style={{
                      color: t.color,
                      strokeWidth: 1.5,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  )
}
