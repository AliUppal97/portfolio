import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { posts } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ArrowLeft, Home, Calendar, Clock, Tag, Share2, Bookmark, Zap, ChevronLeft, ChevronRight } from "lucide-react"

type Props = { params: Promise<{ slug: string }> }

// Generate static paths for all blog posts
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: "/blog-cover.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return notFound()

  // Get adjacent posts for navigation
  const currentIndex = posts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--bg))" }}>
      {/* Navigation Header */}
      <header 
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{ 
          backgroundColor: "hsl(var(--surface) / 0.95)",
          borderBottom: "1px solid hsl(var(--border) / 0.3)"
        }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold hidden sm:block" style={{ color: "hsl(var(--text-primary))" }}>
              Portfolio
            </span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/blog"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: "hsl(var(--surface-variant))",
                color: "hsl(var(--text-secondary))"
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">All Posts</span>
            </Link>
            <Link 
              href="/"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: "hsl(var(--surface-variant))",
                color: "hsl(var(--text-secondary))"
              }}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </nav>
        </div>
      </header>

      <article className={cn("container mx-auto px-4 py-12 md:py-20 max-w-4xl")}>
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm" style={{ color: "hsl(var(--text-tertiary))" }}>
          <Link href="/" className="hover:underline" style={{ color: "hsl(var(--text-link))" }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:underline" style={{ color: "hsl(var(--text-link))" }}>
            Blog
          </Link>
          <span>/</span>
          <span className="truncate max-w-[200px]" style={{ color: "hsl(var(--text-primary))" }}>
            {post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs font-medium rounded-full px-3 py-1 flex items-center gap-1"
                style={{
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))"
                }}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
            style={{ color: "hsl(var(--text-primary))" }}
          >
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 pb-8" style={{ borderBottom: "1px solid hsl(var(--border) / 0.3)" }}>
            <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--text-tertiary))" }}>
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "hsl(var(--text-tertiary))" }} />
            <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--text-tertiary))" }}>
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          style={{ 
            color: "hsl(var(--text-secondary))",
            lineHeight: "1.8"
          }}
        >
          {post.content.split("\n").map((para, i) => (
            <p 
              key={i} 
              className="mb-6 text-lg leading-relaxed"
              style={{ color: "hsl(var(--text-secondary))" }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Share & Actions */}
        <div 
          className="flex items-center justify-between py-6 mb-12"
          style={{ borderTop: "1px solid hsl(var(--border) / 0.3)", borderBottom: "1px solid hsl(var(--border) / 0.3)" }}
        >
          <span className="text-sm font-medium" style={{ color: "hsl(var(--text-tertiary))" }}>
            Share this article
          </span>
          <div className="flex items-center gap-3">
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: "hsl(var(--surface-variant))" }}
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" style={{ color: "hsl(var(--text-secondary))" }} />
            </button>
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: "hsl(var(--surface-variant))" }}
              aria-label="Bookmark"
            >
              <Bookmark className="w-4 h-4" style={{ color: "hsl(var(--text-secondary))" }} />
            </button>
          </div>
        </div>

        {/* Post Navigation */}
        <nav className="grid gap-4 sm:grid-cols-2 mb-12">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "hsl(var(--surface-variant) / 0.5)",
                border: "1px solid hsl(var(--border) / 0.3)"
              }}
            >
              <div className="flex items-center gap-2 mb-2 text-sm" style={{ color: "hsl(var(--text-tertiary))" }}>
                <ChevronLeft className="w-4 h-4" />
                Previous
              </div>
              <h3 
                className="font-semibold line-clamp-2 group-hover:underline"
                style={{ color: "hsl(var(--text-primary))" }}
              >
                {prevPost.title}
              </h3>
            </Link>
          ) : <div />}
          
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group p-6 rounded-2xl text-right transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "hsl(var(--surface-variant) / 0.5)",
                border: "1px solid hsl(var(--border) / 0.3)"
              }}
            >
              <div className="flex items-center justify-end gap-2 mb-2 text-sm" style={{ color: "hsl(var(--text-tertiary))" }}>
                Next
                <ChevronRight className="w-4 h-4" />
              </div>
              <h3 
                className="font-semibold line-clamp-2 group-hover:underline"
                style={{ color: "hsl(var(--text-primary))" }}
              >
                {nextPost.title}
              </h3>
            </Link>
          )}
        </nav>

        {/* Back to Blog */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              boxShadow: "0 10px 25px -5px rgba(102, 126, 234, 0.4)"
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Posts
          </Link>
        </div>
      </article>
    </div>
  )
}
