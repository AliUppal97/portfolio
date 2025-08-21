"use client"

import Image from "next/image"
import { testimonials } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useCustomization } from "@/components/providers/customization-provider"

function TestimonialCard({
  name,
  title,
  quote,
  date,
  avatarSrc,
}: {
  name: string
  title: string
  quote: string
  date?: string
  avatarSrc?: string
}) {
  return (
    <article
      className="min-w-[320px] max-w-[360px] rounded-3xl p-6 shadow-sm md:min-w-[420px] md:max-w-[440px]"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="relative h-10 w-10 overflow-hidden rounded-full"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <Image
            src={avatarSrc || "/avatars/avatar-1.png"}
            alt={`${name} avatar`}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{title}</div>
        </div>
      </div>
      <p className="mt-4 text-sm md:text-base">{quote}</p>
      {date && <div className="mt-4 text-xs text-muted-foreground">{date}</div>}
    </article>
  )
}

// Clean testimonial marquee without complex animations
export function TestimonialsMarqueeSection({ className = "" }: { className?: string }) {
  const { customization } = useCustomization()
  const row = [...testimonials, ...testimonials] // duplicate for seamless loop

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className={cn(
        "container mx-auto px-4",
        customization.spacing === "compact"
          ? "py-10"
          : customization.spacing === "comfortable"
            ? "py-16 md:py-24"
            : "py-24 md:py-32",
        className,
      )}
    >
      <header className="mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">What People Say</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Feedback from leaders and collaborators across industries.
        </p>
      </header>

      {/* Marquee viewport constrained to container width */}
      <div
        className="relative overflow-hidden rounded-3xl p-3"
        style={{
          backgroundColor: "var(--card)/50",
          borderColor: "var(--border)",
        }}
      >
        {/* Edge blur overlays inside the viewport */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-24 bg-[linear-gradient(to_right,var(--bg),transparent)]" />
          <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(to_left,var(--bg),transparent)]" />
        </div>

        <div className="space-y-6">
          {/* Lane 1: right -> left */}
          <div
            className="flex min-w-max items-stretch gap-6"
            style={{
              animation: "marquee-right 40s linear infinite",
            }}
          >
            {row.map((t, i) => (
              <TestimonialCard key={`lane1-${i}`} {...t} />
            ))}
          </div>

          {/* Lane 2: left -> right */}
          <div
            className="flex min-w-max items-stretch gap-6"
            style={{
              animation: "marquee-left 36s linear infinite",
            }}
          >
            {row.map((t, i) => (
              <TestimonialCard key={`lane2-${i}`} {...t} />
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee-right {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-left {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
        `}</style>
      </div>
    </section>
  )
}
