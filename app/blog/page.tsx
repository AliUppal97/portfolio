import Link from "next/link"
import type { Metadata } from "next"
import { posts } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ArrowLeft, Home, Calendar, Clock, Tag, ArrowRight, Zap, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog — Senior Software Engineer",
  description: "Articles, notes, and deep dives on software engineering topics.",
}

export default function BlogIndex() {
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
            <span className="font-bold" style={{ color: "hsl(var(--text-primary))" }}>
              Portfolio
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: "hsl(var(--surface-variant))",
                color: "hsl(var(--text-secondary))"
              }}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link 
              href="/#contact"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white"
              }}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section id="blog" className={cn("container mx-auto px-4 py-16 md:py-24")}>
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm" style={{ color: "hsl(var(--text-tertiary))" }}>
          <Link href="/" className="hover:underline" style={{ color: "hsl(var(--text-link))" }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: "hsl(var(--text-primary))" }}>Blog</span>
        </nav>

        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 
                className="text-3xl md:text-5xl font-bold tracking-tight"
                style={{ color: "hsl(var(--text-primary))" }}
              >
                Blog
              </h1>
              <p className="text-sm mt-1" style={{ color: "hsl(var(--text-tertiary))" }}>
                {posts.length} articles
              </p>
            </div>
          </div>
          <p 
            className="text-lg max-w-2xl"
            style={{ color: "hsl(var(--text-secondary))" }}
          >
            Thoughts on engineering, architecture, developer experience, and leadership. 
            Deep dives into modern web technologies and best practices.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post, index) => (
            <article 
              key={post.slug} 
              className="group rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
              style={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--text-tertiary))" }}>
                  <Calendar className="w-3.5 h-3.5" />
                  <time>{post.date}</time>
                </div>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "hsl(var(--text-tertiary))" }} />
                <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--text-tertiary))" }}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>5 min read</span>
                </div>
              </div>

              <h2 
                className="text-xl md:text-2xl font-bold mb-3"
                style={{ color: "hsl(var(--text-primary))" }}
              >
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              
              <p 
                className="text-base mb-6 leading-relaxed"
                style={{ color: "hsl(var(--text-secondary))" }}
              >
                {post.excerpt}
              </p>

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

              <Link 
                href={`/blog/${post.slug}`} 
                className="inline-flex items-center gap-2 font-medium transition-all duration-300 group-hover:gap-3"
                style={{ color: "hsl(var(--primary))" }}
              >
                Read article
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "hsl(var(--surface-variant))",
              color: "hsl(var(--text-secondary))"
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  )
}
