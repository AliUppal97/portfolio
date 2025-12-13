"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { 
  initGA, 
  trackPageView, 
  initScrollTracking, 
  initTimeTracking,
  trackWebVitals
} from '@/lib/analytics'
import { useReportWebVitals } from 'next/web-vitals'

interface AnalyticsProviderProps {
  children: React.ReactNode
  gaId?: string
}

export function AnalyticsProvider({ children, gaId }: AnalyticsProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize Google Analytics
  useEffect(() => {
    const measurementId = gaId || process.env.NEXT_PUBLIC_GA_ID
    if (measurementId) {
      initGA(measurementId)
    }
  }, [gaId])

  // Track page views on route changes
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackPageView({
      url,
      title: document.title,
      referrer: document.referrer,
    })
  }, [pathname, searchParams])

  // Initialize engagement tracking
  useEffect(() => {
    const cleanupScroll = initScrollTracking()
    const cleanupTime = initTimeTracking()

    return () => {
      cleanupScroll?.()
      cleanupTime?.()
    }
  }, [])

  // Track Web Vitals
  useReportWebVitals((metric) => {
    trackWebVitals({
      name: metric.name,
      value: metric.value,
      id: metric.id,
    })
  })

  return <>{children}</>
}

// Consent Banner Component
export function CookieConsent() {
  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('analytics-consent')
    if (consent !== null) return

    // Show consent banner after a delay
    const timer = setTimeout(() => {
      // Implementation would go here
      // For now, we'll auto-consent (you should implement a proper UI)
      localStorage.setItem('analytics-consent', 'true')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return null
}






