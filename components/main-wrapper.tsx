"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MainWrapperProps {
  children: React.ReactNode
  className?: string
}

export function MainWrapper({ children, className }: MainWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check scroll position directly (same logic as Navigation component)
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
      setIsScrolled(scrollY > 10)
    }

    // Check initial scroll position immediately
    handleScroll()
    
    // Also check after a frame to catch any late scroll position changes
    requestAnimationFrame(() => {
      handleScroll()
    })

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main 
      className={cn("scroll-smooth pt-20 transition-colors duration-300", className)}
      style={{ 
        backgroundColor: isScrolled ? "var(--bg)" : "transparent"
      }}
    >
      {children}
    </main>
  )
}

