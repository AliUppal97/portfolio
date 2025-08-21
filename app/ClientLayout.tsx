"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { suppressResizeObserverErrors } from "@/lib/utils"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={inter.className}>
        <ErrorSuppressor />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
