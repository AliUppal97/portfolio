"use client"

import type React from "react"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { suppressResizeObserverErrors } from "@/lib/utils"
import { useEffect } from "react"
import { inter } from "@/components/providers/customization-provider"

// Component to handle ResizeObserver error suppression
function ErrorSuppressor() {
  useEffect(() => {
    suppressResizeObserverErrors()
  }, [])
  return null
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ErrorSuppressor />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange suppressColorSchemeWarning>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
