"use client"

// Analytics & Performance Monitoring
// Supports: Google Analytics, Vercel Analytics, Plausible, or custom solution

interface EventParams {
  action: string
  category: string
  label?: string
  value?: number
  [key: string]: string | number | undefined
}

interface PageViewParams {
  url: string
  title?: string
  referrer?: string
}

// Google Analytics 4
export function initGA(measurementId: string) {
  if (typeof window === 'undefined') return
  
  // Load GA script
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script.async = true
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', measurementId, {
    page_path: window.location.pathname,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  })

  // Make gtag available globally
  window.gtag = gtag
}

// Track page views
export function trackPageView(params: PageViewParams) {
  if (typeof window === 'undefined') return

  // Google Analytics
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: params.url,
      page_title: params.title,
    })
  }

  // Vercel Analytics
  if (window.va) {
    window.va('pageview', params)
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Page View:', params)
  }
}

// Track custom events
export function trackEvent(params: EventParams) {
  if (typeof window === 'undefined') return

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', params.action, {
      event_category: params.category,
      event_label: params.label,
      value: params.value,
    })
  }

  // Vercel Analytics
  if (window.va) {
    window.va('event', params)
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Event:', params)
  }
}

// Pre-defined event trackers
export const analytics = {
  // Navigation
  navClick: (section: string) => trackEvent({
    action: 'nav_click',
    category: 'Navigation',
    label: section,
  }),

  // Projects
  projectView: (projectTitle: string) => trackEvent({
    action: 'project_view',
    category: 'Projects',
    label: projectTitle,
  }),

  projectCaseStudy: (projectTitle: string) => trackEvent({
    action: 'case_study_open',
    category: 'Projects',
    label: projectTitle,
  }),

  // Contact
  contactFormStart: () => trackEvent({
    action: 'form_start',
    category: 'Contact',
    label: 'contact_form',
  }),

  contactFormSubmit: (success: boolean) => trackEvent({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'Contact',
    label: 'contact_form',
  }),

  // Resume
  resumeDownload: () => trackEvent({
    action: 'download',
    category: 'Resume',
    label: 'resume_pdf',
  }),

  // Social
  socialClick: (platform: string) => trackEvent({
    action: 'social_click',
    category: 'Social',
    label: platform,
  }),

  // Blog
  blogPostView: (slug: string) => trackEvent({
    action: 'post_view',
    category: 'Blog',
    label: slug,
  }),

  blogPostShare: (slug: string, platform: string) => trackEvent({
    action: 'post_share',
    category: 'Blog',
    label: `${slug}_${platform}`,
  }),

  // Certifications
  certificationVerify: (certName: string) => trackEvent({
    action: 'verify_click',
    category: 'Certifications',
    label: certName,
  }),

  // Theme
  themeChange: (theme: string) => trackEvent({
    action: 'theme_change',
    category: 'Customization',
    label: theme,
  }),

  // Experience
  experienceModalOpen: (company: string) => trackEvent({
    action: 'modal_open',
    category: 'Experience',
    label: company,
  }),

  // Scroll Depth
  scrollDepth: (percentage: number) => trackEvent({
    action: 'scroll_depth',
    category: 'Engagement',
    value: percentage,
    label: `${percentage}%`,
  }),

  // Time on Page
  timeOnPage: (seconds: number) => trackEvent({
    action: 'time_on_page',
    category: 'Engagement',
    value: seconds,
    label: `${Math.floor(seconds / 60)}min ${seconds % 60}s`,
  }),

  // CTA Clicks
  ctaClick: (ctaName: string, location: string) => trackEvent({
    action: 'cta_click',
    category: 'CTA',
    label: `${ctaName}_${location}`,
  }),
}

// Scroll depth tracking
export function initScrollTracking() {
  if (typeof window === 'undefined') return

  const depths = [25, 50, 75, 100]
  const trackedDepths = new Set<number>()

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollTop = window.scrollY
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)

    depths.forEach(depth => {
      if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth)
        analytics.scrollDepth(depth)
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => window.removeEventListener('scroll', handleScroll)
}

// Time on page tracking
export function initTimeTracking() {
  if (typeof window === 'undefined') return

  const startTime = Date.now()
  const intervals = [30, 60, 120, 300, 600] // seconds
  const trackedIntervals = new Set<number>()

  const checkTime = () => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
    
    intervals.forEach(interval => {
      if (elapsedSeconds >= interval && !trackedIntervals.has(interval)) {
        trackedIntervals.add(interval)
        analytics.timeOnPage(interval)
      }
    })
  }

  const intervalId = setInterval(checkTime, 5000)

  return () => clearInterval(intervalId)
}

// Web Vitals tracking
export function trackWebVitals(metric: {
  name: string
  value: number
  id: string
}) {
  trackEvent({
    action: metric.name,
    category: 'Web Vitals',
    label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  })
}

// Type declarations for global window object
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
    va: (action: string, params?: unknown) => void
  }
}


