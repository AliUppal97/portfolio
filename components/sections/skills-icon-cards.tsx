"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Tech = { src: string; alt: string; desc: string }

const techs: Tech[] = [
  { src: "/logos/nextjs.png", alt: "Next.js", desc: "React framework for hybrid SSR/RSC apps with great DX." },
  { src: "/logos/react.png", alt: "React", desc: "Component-based UI library for building interactive interfaces." },
  {
    src: "/logos/typescript.png",
    alt: "TypeScript",
    desc: "Typed JavaScript that catches errors early and scales teams.",
  },
  { src: "/logos/tailwind.png", alt: "Tailwind CSS", desc: "Utility-first CSS for fast, consistent styling." },
  { src: "/logos/node.png", alt: "Node.js", desc: "JavaScript runtime for backend APIs and tooling." },
  { src: "/logos/graphql.png", alt: "GraphQL", desc: "Query APIs for exactly the data you need." },
  { src: "/logos/postgres.png", alt: "PostgreSQL", desc: "Reliable SQL database with rich features." },
  { src: "/logos/kafka.png", alt: "Kafka", desc: "High-throughput event streaming for microservices." },
  { src: "/logos/aws.png", alt: "AWS", desc: "Cloud platform for compute, storage, and networking." },
  { src: "/logos/docker.png", alt: "Docker", desc: "Containerization for consistent deployments." },
  { src: "/logos/kubernetes.png", alt: "Kubernetes", desc: "Orchestrates containers at scale." },
  { src: "/logos/redis.png", alt: "Redis", desc: "In‑memory datastore for caching and queues." },
]

// Google Material Design icon cards with elevation instead of borders
export function SkillsIconCardsSection({ className = "" }: { className?: string }) {
  return (
    <section aria-label="Languages and stacks" className={cn("container mx-auto px-4 py-8 md:py-10", className)}>
      <h3 className="mb-6 text-xl font-semibold">Languages & Stacks</h3>
      <TooltipProvider>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {techs.map((t) => (
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
                    border: "none", // Google Material Design - no borders
                    boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 1px 4px -1px rgba(0, 0, 0, 0.06)", // Material elevation
                  }}
                  onMouseEnter={(e) => {
                    // Google Material Design hover elevation
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.04)"
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
                  <Image
                    src={t.src || "/placeholder.svg"}
                    alt={`${t.alt} logo`}
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-xs text-center rounded-2xl"
                style={{
                  backgroundColor: "var(--card)",
                  border: "none", // Google Material Design - no borders
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Material elevation
                }}
              >
                <p className="text-sm font-medium">{t.alt}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </section>
  )
}
