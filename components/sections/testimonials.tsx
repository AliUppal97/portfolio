"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { testimonials } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useCustomization } from "@/components/providers/customization-provider"

export function TestimonialsSection() {
  const { customization } = useCustomization()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [])

  const t = testimonials[index]

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
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Testimonials</h2>
      </header>

      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border bg-card p-8">
        <div key={t.name} className="transition-opacity duration-300">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border">
              <Image src="/professional-headshot.png" alt={`${t.name} profile photo`} fill className="object-cover" />
            </div>
            <div>
              <div className="font-medium">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.title}</div>
            </div>
          </div>
          <blockquote className="mt-4 text-lg">
            {'"'}
            {t.quote}
            {'"'}
          </blockquote>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cn(
                "h-2 w-2 rounded-full transition-colors duration-200",
                i === index ? "bg-primary" : "bg-muted",
              )}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
