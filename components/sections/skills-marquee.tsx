"use client"

import { cn } from "@/lib/utils"
import {
  Layout,
  Layers,
  FileCode,
  Palette,
  Terminal,
  Database,
  GitBranch,
  Activity,
  Cloud,
  Container,
  Cpu,
  HardDrive,
  type LucideIcon,
} from "lucide-react"

type LogoItem = { icon: LucideIcon; alt: string; color: string }

const logos: LogoItem[] = [
  { icon: Layout, alt: "Next.js", color: "#000000" },
  { icon: Layers, alt: "React", color: "#61DAFB" },
  { icon: FileCode, alt: "TypeScript", color: "#3178C6" },
  { icon: Palette, alt: "Tailwind CSS", color: "#06B6D4" },
  { icon: Terminal, alt: "Node.js", color: "#339933" },
  { icon: Database, alt: "PostgreSQL", color: "#336791" },
  { icon: GitBranch, alt: "GraphQL", color: "#E10098" },
  { icon: Activity, alt: "Kafka", color: "#231F20" },
  { icon: Cloud, alt: "AWS", color: "#FF9900" },
  { icon: Container, alt: "Docker", color: "#2496ED" },
  { icon: Cpu, alt: "Kubernetes", color: "#326CE5" },
  { icon: HardDrive, alt: "Redis", color: "#DC382D" },
]

// Simple marquee with clean Lucide icons animation
export function SkillsMarqueeSection({ className = "" }: { className?: string }) {
  const row = [...logos, ...logos]
  return (
    <section aria-label="Technologies" className={cn("relative overflow-hidden py-6 md:py-8", className)}>
      {/* Edge blur overlays */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-y-0 left-0 w-24 bg-[linear-gradient(to_right,var(--bg),transparent)]" />
        <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(to_left,var(--bg),transparent)]" />
      </div>

      <div className="container mx-auto">
        <div
          className="flex min-w-max items-center gap-8 opacity-80 hover:opacity-100 transition-all duration-300"
          style={{
            animation: "marquee 26s linear infinite",
          }}
        >
          {row.map((l, i) => {
            const Icon = l.icon
            return (
              <div key={i} className="relative h-8 w-28 flex items-center justify-center gap-2">
                <Icon
                  className="w-6 h-6 transition-all duration-300"
                  style={{
                    color: l.color,
                    strokeWidth: 1.5,
                  }}
                />
                <span className="text-sm font-medium" style={{ color: "var(--fg-secondary)" }}>
                  {l.alt}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
