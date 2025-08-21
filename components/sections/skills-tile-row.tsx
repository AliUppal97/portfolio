"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type Tile = { src: string; alt: string }

const techTiles: Tile[] = [
  { src: "/logos/nextjs.png", alt: "Next.js" },
  { src: "/logos/react.png", alt: "React" },
  { src: "/logos/typescript.png", alt: "TypeScript" },
  { src: "/logos/tailwind.png", alt: "Tailwind CSS" },
  { src: "/logos/node.png", alt: "Node.js" },
  { src: "/logos/graphql.png", alt: "GraphQL" },
  { src: "/logos/postgres.png", alt: "PostgreSQL" },
  { src: "/logos/kafka.png", alt: "Kafka" },
  { src: "/logos/aws.png", alt: "AWS" },
  { src: "/logos/docker.png", alt: "Docker" },
  { src: "/logos/kubernetes.png", alt: "Kubernetes" },
  { src: "/logos/redis.png", alt: "Redis" },
]

// Google Material Design tile marquee with elevation instead of borders
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
          {row.map((t, i) => (
            <div
              key={`${t.alt}-${i}`}
              className="relative h-16 w-16 shrink-0 rounded-3xl transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "var(--card)",
                border: "none", // Google Material Design - no borders
                boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 1px 4px -1px rgba(0, 0, 0, 0.06)", // Material elevation
              }}
              title={t.alt}
            >
              <Image
                src={t.src || "/placeholder.svg"}
                alt={`${t.alt} logo`}
                fill
                sizes="64px"
                className="p-3 object-contain"
              />
            </div>
          ))}
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
