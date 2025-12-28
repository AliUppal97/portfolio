"use client"

import { useEffect, useCallback } from "react"
import { X, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title?: string
}

/**
 * Converts various YouTube URL formats to embed URL
 */
function getYouTubeEmbedUrl(url: string): string {
  // Handle youtu.be short links
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&rel=0&modestbranding=1`
  }
  
  // Handle youtube.com/watch?v= links
  const longMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
  if (longMatch) {
    return `https://www.youtube.com/embed/${longMatch[1]}?autoplay=1&rel=0&modestbranding=1`
  }
  
  // Handle youtube.com/embed/ links (already in correct format)
  if (url.includes("youtube.com/embed/")) {
    return url.includes("?") ? url + "&autoplay=1" : url + "?autoplay=1&rel=0&modestbranding=1"
  }
  
  return url
}

export function VideoModal({ isOpen, onClose, videoUrl, title = "Introduction Video" }: VideoModalProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl)

  // Handle escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, handleEscape])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop with blur */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/80 backdrop-blur-md",
          "animate-in fade-in duration-300"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal content */}
      <div 
        className={cn(
          "relative z-10 w-full max-w-5xl mx-4",
          "animate-in zoom-in-95 fade-in duration-300"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute -top-12 right-0 md:-top-14 md:-right-14",
            "w-10 h-10 md:w-12 md:h-12 rounded-full",
            "flex items-center justify-center",
            "bg-white/10 hover:bg-white/20 backdrop-blur-md",
            "border border-white/20",
            "text-white transition-all duration-300",
            "hover:scale-110 hover:rotate-90",
            "focus:outline-none focus:ring-2 focus:ring-white/50"
          )}
          aria-label="Close video"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Video container with glow effect */}
        <div className="relative">
          {/* Glow effect behind video */}
          <div 
            className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            }}
          />
          
          {/* Video frame */}
          <div 
            className={cn(
              "relative rounded-2xl overflow-hidden",
              "bg-black shadow-2xl",
              "ring-1 ring-white/10"
            )}
            style={{
              aspectRatio: "16/9",
            }}
          >
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-white/60 text-sm mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
          Press <kbd className="px-2 py-1 rounded bg-white/10 text-white/80 text-xs font-mono mx-1">ESC</kbd> or click outside to close
        </p>
      </div>
    </div>
  )
}






