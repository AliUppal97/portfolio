"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-24 left-6 z-40 w-12 h-12 rounded-2xl flex items-center justify-center",
        "transition-all duration-500 ease-out transform-gpu",
        "hover:scale-110 active:scale-95",
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "translate-y-16 opacity-0 pointer-events-none"
      )}
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 10px 25px -5px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 text-white" />
      
      {/* Pulse ring effect */}
      <span 
        className={cn(
          "absolute inset-0 rounded-2xl animate-ping opacity-20",
          isVisible ? "block" : "hidden"
        )}
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      />
    </button>
  )
}






