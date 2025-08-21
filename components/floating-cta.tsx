"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Settings2, MessageCircle, Sparkles, Zap } from "lucide-react"
import { useEffect, useState } from "react"

// WhatsApp phone can be customized by editing the 'phone' and 'prefill' variables below.
const phone = "1234567890" // e.g., 14155550123 (no '+' sign)
const prefill = encodeURIComponent("Hi! I saw your portfolio and would like to discuss a project opportunity.")

export function FloatingCTA() {
  const [supportsBackdrop, setSupportsBackdrop] = useState(false)
  useEffect(() => {
    setSupportsBackdrop(CSS.supports("backdrop-filter: blur(4px)"))
  }, [])

  const openCustomizer = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-customizer"))
    }
  }

  return (
    <div
      className={[
        "fixed inset-x-4 bottom-6 z-40 mx-auto max-w-2xl",
        "md:inset-x-auto md:right-6 md:left-auto md:max-w-none",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center gap-3 rounded-full p-3 shadow-2xl transition-all duration-300 hover:scale-105",
          supportsBackdrop ? "backdrop-blur-xl" : "",
        ].join(" ")}
        style={{
          background: supportsBackdrop
            ? "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)",
        }}
        role="region"
        aria-label="Quick actions"
      >
        {/* Premium hire me button */}
        <Button
          asChild
          size="lg"
          className="group rounded-full px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
          }}
        >
          <a href="#contact" aria-label="Hire Me" className="flex items-center gap-2">
            <Zap className="w-5 h-5 group-hover:animate-pulse" />
            <span>Hire Me</span>
            <Sparkles className="w-4 h-4 group-hover:animate-spin" />
          </a>
        </Button>

        {/* Schedule call */}
        <Button
          asChild
          size="lg"
          variant="outline"
          className="group rounded-full px-5 py-3 font-semibold transition-all duration-300 hover:scale-110 bg-transparent"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(20px)",
            color: "white",
          }}
        >
          <a
            href="https://calendly.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Schedule a Call"
            className="flex items-center gap-2"
          >
            <Calendar className="w-5 h-5 group-hover:animate-bounce" />
            <span className="hidden sm:inline">Schedule Call</span>
          </a>
        </Button>

        {/* WhatsApp */}
        <Button
          asChild
          size="lg"
          variant="outline"
          className="group rounded-full px-5 py-3 font-semibold transition-all duration-300 hover:scale-110 bg-transparent"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(20px)",
            color: "white",
          }}
        >
          <a
            href={`https://wa.me/${phone}?text=${prefill}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="WhatsApp chat"
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </Button>

        {/* Customizer */}
        <Button
          size="lg"
          variant="ghost"
          className="group rounded-full px-4 py-3 transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
          }}
          aria-label="Open Customizer"
          onClick={openCustomizer}
          title="Customize theme and layout"
        >
          <Settings2 className="h-5 w-5 group-hover:animate-spin" />
          <span className="sr-only">Customize</span>
        </Button>

        {/* Floating sparkles */}
        <div className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400 animate-pulse">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 text-blue-400 animate-bounce">
          <div className="w-3 h-3 rounded-full bg-blue-400 opacity-60" />
        </div>
      </div>
    </div>
  )
}
