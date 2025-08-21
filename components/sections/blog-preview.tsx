"use client"

import Link from "next/link"
import { posts } from "@/lib/data"
import { useCustomization } from "@/components/providers/customization-provider"
import { cn } from "@/lib/utils"

export function BlogPreviewSection() {
  const { customization } = useCustomization()
  const preview = posts.slice(0, 3)
  return (
    <section
      id="articles"
      className={cn(
        "container mx-auto px-4",
        customization.spacing === "compact"
          ? "py-10"
          : customization.spacing === "comfortable"
            ? "py-16 md:py-24"
            : "py-24 md:py-32",
      )}
    >
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Articles</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Thoughts on engineering, DX, and leadership.</p>
        </div>
        <Link href="/blog" className="text-primary underline">
          All posts
        </Link>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {preview.map((p) => (
          <article
            key={p.slug}
            className="rounded-3xl p-6"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h3 className="text-lg font-semibold">
              <Link href={`/blog/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h3>
            <time className="text-xs text-muted-foreground">{p.date}</time>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
