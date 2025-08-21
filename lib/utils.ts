import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility to suppress ResizeObserver errors in development
export function suppressResizeObserverErrors() {
  if (typeof window !== "undefined") {
    // Suppress ResizeObserver loop errors
    const resizeObserverErrorHandler = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.stopImmediatePropagation()
        return false
      }
      return true
    }

    window.addEventListener("error", resizeObserverErrorHandler)

    // Also handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (e) => {
      if (e.reason?.message?.includes("ResizeObserver")) {
        e.preventDefault()
      }
    })
  }
}
