"use client"

import type React from "react"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { Inter, Space_Grotesk, Source_Serif_4 } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const grotesk = Space_Grotesk({ subsets: ["latin"] })
const serif = Source_Serif_4({ subsets: ["latin"] })

export type ThemePreset = "light" | "dark" | "minimalist" | "futuristic" | "creative"
export type LayoutMode = "grid" | "stacked"
export type ImageSize = "sm" | "md" | "lg"
export type Spacing = "compact" | "comfortable" | "spacious"

export type Customization = {
  theme: ThemePreset
  font: "inter" | "grotesk" | "serif"
  fontScale: number // 0.85 - 1.25
  primary: string // hex color
  layout: LayoutMode
  imageSize: ImageSize
  spacing: Spacing
}

const defaultCustomization: Customization = {
  theme: "light",
  font: "inter",
  fontScale: 1,
  primary: "#1a73e8", // Google Blue
  layout: "grid",
  imageSize: "md",
  spacing: "comfortable",
}

const CustomizationContext = createContext<{
  customization: Customization
  setCustomization: (c: Partial<Customization>) => void
} | null>(null)

const STORAGE_KEY = "portfolio.customization.v1"

export function CustomizationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [customization, setCustomizationState] = useState<Customization>(defaultCustomization)
  const [mounted, setMounted] = useState(false)

  // Load settings from localStorage
  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setCustomizationState({ ...defaultCustomization, ...parsed })
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist settings
  const setCustomization = useCallback((patch: Partial<Customization>) => {
    setCustomizationState((prev) => {
      const next = { ...prev, ...patch }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  // Resolve font classes - always use inter initially to match server render, then switch after mount
  const fontClass = mounted
    ? customization.font === "inter"
      ? inter.className
      : customization.font === "grotesk"
        ? grotesk.className
        : serif.className
    : inter.className // Always use inter initially to prevent hydration mismatch

  // Google Material Design 3 Color System with premium typography hierarchy
  const presetVars: Record<ThemePreset, React.CSSProperties> = {
    light: {
      // Google's actual light theme colors with enhanced typography
      "--bg": "#ffffff", // Pure white background
      "--surface": "#f8f9fa", // Google Gray 50 - slightly off-white for main surface
      "--surface-variant": "#f1f3f4", // Google Gray 100 - for elevated surfaces
      "--surface-container": "#f3f4f6", // Container surfaces
      "--surface-container-high": "#e5e7eb", // High emphasis containers

      // Premium Typography Hierarchy
      "--text-primary": "#1f2937", // Gray 800 - Primary headings and important text
      "--text-secondary": "#374151", // Gray 700 - Secondary text and subheadings
      "--text-tertiary": "#6b7280", // Gray 500 - Supporting text and captions
      "--text-quaternary": "#9ca3af", // Gray 400 - Placeholder and disabled text
      "--text-inverse": "#ffffff", // White text for dark backgrounds

      // Legacy support (mapped to new system)
      "--fg": "#1f2937", // Maps to text-primary
      "--fg-secondary": "#6b7280", // Maps to text-tertiary
      "--muted": "#9ca3af", // Maps to text-quaternary

      // Surface and interaction colors
      "--card": "#ffffff", // Pure white for cards (elevated above surface)
      "--card-hover": "#f9fafb", // Gray 50 for hover states
      "--accent": "#eff6ff", // Blue 50 - subtle accent
      "--border": "#e5e7eb", // Gray 200 - subtle borders
      "--divider": "#f3f4f6", // Gray 100 - dividers

      // Semantic colors for text
      "--text-success": "#059669", // Emerald 600
      "--text-warning": "#d97706", // Amber 600
      "--text-error": "#dc2626", // Red 600
      "--text-info": "#2563eb", // Blue 600
      "--text-link": "#1d4ed8", // Blue 700
      "--text-link-hover": "#1e40af", // Blue 800

      // Google Material Design 3 elevation system
      "--shadow-1": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      "--shadow-2": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "--shadow-3": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "--shadow-4": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "--shadow-5": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "--shadow-card": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "--shadow-card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    } as React.CSSProperties,

    dark: {
      // Google's actual dark theme colors with enhanced typography
      "--bg": "#0f172a", // Slate 900 - Deep professional background
      "--surface": "#1e293b", // Slate 800 - Elevated surface
      "--surface-variant": "#334155", // Slate 700 - Higher elevated surface
      "--surface-container": "#475569", // Slate 600 - Container surfaces
      "--surface-container-high": "#64748b", // Slate 500 - High emphasis containers

      // Premium Typography Hierarchy for Dark Theme
      "--text-primary": "#f8fafc", // Slate 50 - Primary headings and important text
      "--text-secondary": "#e2e8f0", // Slate 200 - Secondary text and subheadings
      "--text-tertiary": "#cbd5e1", // Slate 300 - Supporting text and captions
      "--text-quaternary": "#94a3b8", // Slate 400 - Placeholder and disabled text
      "--text-inverse": "#0f172a", // Dark text for light backgrounds

      // Legacy support (mapped to new system)
      "--fg": "#f8fafc", // Maps to text-primary
      "--fg-secondary": "#cbd5e1", // Maps to text-tertiary
      "--muted": "#94a3b8", // Maps to text-quaternary

      // Surface and interaction colors
      "--card": "#1e293b", // Slate 800 - Card surface
      "--card-hover": "#334155", // Slate 700 - Card hover state
      "--accent": "#1e40af", // Blue 800 - Accent color
      "--border": "#475569", // Slate 600 - Borders
      "--divider": "#374151", // Gray 700 - Subtle dividers

      // Semantic colors for text (adjusted for dark theme)
      "--text-success": "#10b981", // Emerald 500
      "--text-warning": "#f59e0b", // Amber 500
      "--text-error": "#ef4444", // Red 500
      "--text-info": "#3b82f6", // Blue 500
      "--text-link": "#60a5fa", // Blue 400
      "--text-link-hover": "#93c5fd", // Blue 300

      // Dark theme elevation shadows
      "--shadow-1": "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
      "--shadow-2": "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)",
      "--shadow-3": "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
      "--shadow-4": "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
      "--shadow-5": "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
      "--shadow-card": "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)",
      "--shadow-card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
    } as React.CSSProperties,

    minimalist: {
      // Apple-inspired minimalist design with refined typography
      "--bg": "#ffffff",
      "--surface": "#fafafa", // Slightly off-white
      "--surface-variant": "#f5f5f5",
      "--surface-container": "#f0f0f0",
      "--surface-container-high": "#e8e8e8",

      // Apple-inspired Typography Hierarchy
      "--text-primary": "#1d1d1f", // Apple's primary text color
      "--text-secondary": "#424245", // Apple's secondary text
      "--text-tertiary": "#6e6e73", // Apple's tertiary text
      "--text-quaternary": "#8e8e93", // Apple's quaternary text
      "--text-inverse": "#ffffff",

      // Legacy support
      "--fg": "#1d1d1f",
      "--fg-secondary": "#6e6e73",
      "--muted": "#8e8e93",

      "--card": "#ffffff",
      "--card-hover": "#fafafa",
      "--accent": "#f5f5f7",
      "--border": "#d2d2d7", // Apple's separator color
      "--divider": "#e5e5e7",

      // Semantic colors (Apple-inspired)
      "--text-success": "#30d158", // Apple Green
      "--text-warning": "#ff9f0a", // Apple Orange
      "--text-error": "#ff453a", // Apple Red
      "--text-info": "#007aff", // Apple Blue
      "--text-link": "#007aff",
      "--text-link-hover": "#0051d5",

      "--shadow-1": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "--shadow-2": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "--shadow-3": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "--shadow-4": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "--shadow-5": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "--shadow-card": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "--shadow-card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    } as React.CSSProperties,

    futuristic: {
      // Microsoft Fluent Design inspired with premium typography
      "--bg": "#000000", // Pure black background
      "--surface": "#111111", // Very dark surface
      "--surface-variant": "#1a1a1a",
      "--surface-container": "#222222",
      "--surface-container-high": "#2a2a2a",

      // Futuristic Typography Hierarchy
      "--text-primary": "#ffffff", // Pure white for maximum contrast
      "--text-secondary": "#e1e1e1", // Light gray for secondary text
      "--text-tertiary": "#b3b3b3", // Medium gray for supporting text
      "--text-quaternary": "#808080", // Darker gray for disabled text
      "--text-inverse": "#000000",

      // Legacy support
      "--fg": "#ffffff",
      "--fg-secondary": "#b3b3b3",
      "--muted": "#808080",

      "--card": "#111111",
      "--card-hover": "#1a1a1a",
      "--accent": "#0078d4", // Microsoft Blue
      "--border": "#333333",
      "--divider": "#2a2a2a",

      // Semantic colors (Microsoft-inspired)
      "--text-success": "#00cc6a", // Microsoft Green
      "--text-warning": "#ffb900", // Microsoft Yellow
      "--text-error": "#d13438", // Microsoft Red
      "--text-info": "#0078d4", // Microsoft Blue
      "--text-link": "#4cc2ff", // Light Blue
      "--text-link-hover": "#80d4ff",

      "--shadow-1": "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.24)",
      "--shadow-2": "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.24)",
      "--shadow-3": "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.24)",
      "--shadow-4": "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.24)",
      "--shadow-5": "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      "--shadow-card": "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.24)",
      "--shadow-card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.24)",
    } as React.CSSProperties,

    creative: {
      // Warm, creative palette with sophisticated typography
      "--bg": "#fffef7", // Warm white
      "--surface": "#faf9f2",
      "--surface-variant": "#f5f4ed",
      "--surface-container": "#f0ede6",
      "--surface-container-high": "#e8e4dc",

      // Creative Typography Hierarchy
      "--text-primary": "#292524", // Stone 800 - Warm dark text
      "--text-secondary": "#44403c", // Stone 700 - Secondary warm text
      "--text-tertiary": "#78716c", // Stone 500 - Supporting warm text
      "--text-quaternary": "#a8a29e", // Stone 400 - Muted warm text
      "--text-inverse": "#fffef7",

      // Legacy support
      "--fg": "#292524",
      "--fg-secondary": "#78716c",
      "--muted": "#a8a29e",

      "--card": "#ffffff",
      "--card-hover": "#faf9f2",
      "--accent": "#fef3c7", // Warm accent
      "--border": "#d6d3d1", // Stone 300
      "--divider": "#e7e5e4", // Stone 200

      // Semantic colors (warm palette)
      "--text-success": "#16a34a", // Green 600
      "--text-warning": "#ea580c", // Orange 600
      "--text-error": "#dc2626", // Red 600
      "--text-info": "#0369a1", // Sky 700
      "--text-link": "#c2410c", // Orange 700
      "--text-link-hover": "#9a3412", // Orange 800

      "--shadow-1": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "--shadow-2": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "--shadow-3": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "--shadow-4": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "--shadow-5": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "--shadow-card": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "--shadow-card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    } as React.CSSProperties,
  }

  const styleVars: React.CSSProperties = useMemo(() => {
    const base = presetVars[customization.theme]
    return {
      ...base,
      "--primary": customization.primary,
      "--font-scale": String(customization.fontScale),
    } as React.CSSProperties
  }, [customization.primary, customization.theme, customization.fontScale])

  useEffect(() => {
    // Mirror theme variables to :root for Portals (e.g., Radix sheets)
    if (typeof document !== "undefined") {
      const root = document.documentElement
      try {
        Object.entries(styleVars).forEach(([key, value]) => {
          if (key.startsWith("--")) root.style.setProperty(key, String(value))
        })
        root.style.setProperty("--primary", customization.primary)
        root.style.setProperty("--font-scale", String(customization.fontScale))
      } catch {
        // ignore
      }
    }
  }, [styleVars, customization.primary, customization.fontScale])

  return (
    <CustomizationContext.Provider
      value={{
        customization,
        setCustomization,
      }}
    >
      <div
        className={fontClass}
        style={{
          ...styleVars,
          color: "var(--text-primary)",
          backgroundColor: "var(--bg)",
        }}
      >
        <div
          // Apply scaling without breaking REM-based spacing
          style={{ fontSize: `calc(1rem * var(--font-scale))` }}
        >
          {children}
        </div>
      </div>
    </CustomizationContext.Provider>
  )
}

export function useCustomization() {
  const ctx = useContext(CustomizationContext)
  if (!ctx) throw new Error("useCustomization must be used within CustomizationProvider")
  return ctx
}