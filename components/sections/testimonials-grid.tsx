"use client"

import Image from "next/image"
import { testimonials } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useCustomization } from "@/components/providers/customization-provider"

// Grid of testimonial cards inspired by the screenshot (avatar, name, title, quote, date)
export function TestimonialsGridSection() {
  const { customization } = useCustomization()

  return (
    <section
      id="testimonials"
      className={cn(
        "container mx-auto px-4",
        customization.spacing === "compact"
          ? "py-10"
          : customization.spacing === "comfortable"
            ? "py-16 md:py-24"
            : "py-24 md:py-32",
      )}
    >
      <header className="mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">What People Say</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Feedback from leaders and collaborators across industries.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <article key={i} className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border">
                <Image
                  src={t.avatarSrc || "/avatars/avatar-1.png"}
                  alt={`${t.name} avatar`}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.title}</div>
              </div>
            </div>
            <p className="mt-4 text-sm md:text-base">{t.quote}</p>
            {t.date && <div className="mt-4 text-xs text-muted-foreground">{t.date}</div>}
          </article>
        ))}
      </div>
    </section>
  )
}
