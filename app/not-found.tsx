"use client"

import Link from "next/link"
import { Home, ArrowLeft, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: "hsl(var(--bg, 0 0% 100%))" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <div
            className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 20px 40px -10px rgba(102, 126, 234, 0.4)",
            }}
          >
            <Zap className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* 404 Display */}
        <div className="mb-8">
          <h1 
            className="text-9xl font-black mb-4"
            style={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            404
          </h1>
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "hsl(var(--text-primary, 222.2 84% 4.9%))" }}
          >
            Page Not Found
          </h2>
          <p 
            className="text-lg leading-relaxed mb-8"
            style={{ color: "hsl(var(--text-secondary, 215.4 16.3% 46.9%))" }}
          >
            Oops! The page you're looking for seems to have wandered off into the digital void. 
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-6 font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              boxShadow: "0 15px 30px -8px rgba(102, 126, 234, 0.4)",
            }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 font-semibold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "hsl(var(--surface, 0 0% 100%) / 0.5)",
              borderColor: "hsl(var(--border, 214.3 31.8% 91.4%))",
              color: "hsl(var(--text-primary, 222.2 84% 4.9%))",
            }}
          >
            <Link href="/#projects" className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              View Projects
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div 
          className="mt-12 pt-8"
          style={{ borderTop: "1px solid hsl(var(--border, 214.3 31.8% 91.4%) / 0.3)" }}
        >
          <p 
            className="text-sm mb-4"
            style={{ color: "hsl(var(--text-tertiary, 217.2 32.6% 17.5%))" }}
          >
            Or explore these sections:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "About", href: "/#about" },
              { label: "Experience", href: "/#experience" },
              { label: "Projects", href: "/#projects" },
              { label: "Contact", href: "/#contact" },
              { label: "Blog", href: "/blog" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "hsl(var(--surface-variant, 210 40% 96%))",
                  color: "hsl(var(--text-secondary, 215.4 16.3% 46.9%))",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}







