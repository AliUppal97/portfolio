import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { posts } from "@/lib/data"
import { cn } from "@/lib/utils"

type Props = { params: { slug: string } }

export function generateMetadata({ params }: Props): Metadata {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: "/blog-cover.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <article className={cn("container mx-auto px-4 py-16 md:py-24")}>
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{post.title}</h1>
        <time className="text-xs text-muted-foreground">{post.date}</time>
      </header>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {post.content.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  )
}
