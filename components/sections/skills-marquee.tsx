"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

const logos = [
  { src: "/logos/nextjs.png", alt: "Next.js" },
  { src: "/logos/react.png", alt: "React" },
  { src: "/logos/typescript.png", alt: "TypeScript" },
  { src: "/logos/tailwind.png", alt: "Tailwind CSS" },
  { src: "/logos/node.png", alt: "Node.js" },
  { src: "/logos/postgres.png", alt: "PostgreSQL" },
  { src: "/logos/graphql.png", alt: "GraphQL" },
  { src: "/logos/kafka.png", alt: "Kafka" },
  { src: "/logos/aws.png", alt: "AWS" },
  { src: "/logos/docker.png", alt: "Docker" },
  { src: "/logos/kubernetes.png", alt: "Kubernetes" },
  { src: "/logos/redis.png", alt: "Redis" },
]

// Simple marquee with clean animation
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
          className="flex min-w-max items-center gap-8 opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
          style={{
            animation: "marquee 26s linear infinite",
          }}
        >
          {row.map((l, i) => (
            <div key={i} className="relative h-8 w-28">
              <Image
                src={l.src || "/placeholder.svg"}
                alt={`${l.alt} logo`}
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
          ))}
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
