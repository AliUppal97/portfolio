"use client"

import { Zap } from "lucide-react"

export default function Loading() {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "hsl(var(--bg, 0 0% 100%))" }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center animate-pulse"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 20px 40px -10px rgba(102, 126, 234, 0.4)",
            }}
          >
            <Zap className="w-10 h-10 text-white animate-bounce" />
          </div>
          
          {/* Spinning ring */}
          <div 
            className="absolute inset-0 rounded-3xl border-4 border-transparent animate-spin"
            style={{
              borderTopColor: "#667eea",
              borderRightColor: "#764ba2",
              animationDuration: "1.5s",
            }}
          />
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 
            className="text-2xl font-bold mb-2"
            style={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Loading
          </h2>
          <p 
            className="text-sm animate-pulse"
            style={{ color: "hsl(var(--text-secondary, 215.4 16.3% 46.9%))" }}
          >
            Preparing your experience...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: "#667eea",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


