import Link from "next/link"
import type { Metadata } from "next"
import { posts } from "@/lib/data"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Blog — Senior Software Engineer",
  description: "Articles, notes, and deep dives on software engineering topics.",
}

export default function BlogIndex() {
  return (
    <section id="blog" className={cn("container mx-auto px-4 py-16 md:py-24")}>
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          CMS-ready blog list. Replace static data with your CMS of choice later.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-xl border bg-background p-6 transition-colors hover:bg-accent">
            <h2 className="text-xl md:text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <time className="text-xs text-muted-foreground">{post.date}</time>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs rounded-full bg-primary/10 text-primary px-2.5 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/blog/${post.slug}`} className="mt-6 inline-block text-primary underline">
              Read more
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
