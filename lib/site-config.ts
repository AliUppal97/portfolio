/**
 * Site Configuration
 * 
 * This is the central configuration file for all personal information
 * used throughout the portfolio. Update these values to customize the site.
 */

export const siteConfig = {
  // ============================================
  // PERSONAL INFORMATION
  // ============================================
  personal: {
    name: "Muhammad Ali",
    firstName: "Muhammad",
    lastName: "Ali",
    title: "Senior Software Engineer",
    subtitle: "Full Stack Developer",
    bio: "7+ years of experience building enterprise-grade applications. Specializing in React, Node.js, and cloud architecture.",
    shortBio: "I lead teams, design systems, and deliver measurable business impact.",
    location: "Lahore, Pakistan",
    timezone: "Asia/Karachi",
    avatarUrl: "/muhammad-ali.png",
    resumeUrl: "/resume.pdf",
    introVideoUrl: "https://youtu.be/k5c2sJ5_hbU?si=22bYVRepNLJtejt5",
  },

  // ============================================
  // CONTACT INFORMATION
  // ============================================
  contact: {
    email: "aliuppal9797@gmail.com",
    phone: "+92 323 4218194",
    phoneRaw: "+92 323 4218194", // For tel: links
  },

  // ============================================
  // SOCIAL LINKS
  // ============================================
  social: {
    github: "https://github.com/AliUppal97",
    linkedin: "https://linkedin.com/in/aliuppal97",
    twitter: "https://twitter.com/",
    youtube: "https://www.youtube.com/@ALIUppal97",
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    dribbble: "https://dribbble.com/",
    behance: "https://behance.net/",
    medium: "https://medium.com/",
    devto: "https://dev.to/",
    stackoverflow: "https://stackoverflow.com/",
    calendly: "https://calendly.com/",
    personalWebsite: "https://AliUppal.com",
  },

  // ============================================
  // PROFESSIONAL STATS
  // ============================================
  stats: {
    yearsOfExperience: 7,
    projectsCompleted: 150,
    monthlyVolume: "$50M+",
    uptime: "99.9%",
    clientsServed: 50,
    coffeeConsumed: 2000, // Just for fun!
  },

  // ============================================
  // AVAILABILITY
  // ============================================
  availability: {
    isAvailable: true,
    status: "Available for Projects",
    nextAvailableQuarter: "Q1 2025",
    responseTime: "24 hours",
  },

  // ============================================
  // SEO & METADATA
  // ============================================
  seo: {
    siteName: "Muhammad Ali",
    siteDescription: "Portfolio of a Senior Software Engineer with 7+ years of experience building enterprise-grade applications in React, Node.js, and cloud architecture.",
    siteUrl: "https://AliUppal.com",
    ogImage: "/opengraph-portfolio-cover.png",
    twitterHandle: "@AliUppal97",
    keywords: [
      "Muhammad Ali",
      "Senior Software Engineer", 
      "React Developer",
      "Node.js Developer",
      "Cloud Architect",
      "Software Engineer",
      "Full Stack Developer",
      "React",
      "Node.js",
      "Cloud Architecture",
    ],
  },

  // ============================================
  // BRANDING
  // ============================================
  branding: {
    logoText: "Muhammad Ali",
    tagline: "Building Enterprise-Grade Experiences in React, Node.js, and cloud architecture.",
    primaryColor: "#667eea",
    secondaryColor: "#764ba2",
  },

  // ============================================
  // NAVIGATION LINKS
  // ============================================
  navigation: {
    quickLinks: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    resourceLinks: [
      { label: "Blog", href: "/blog" },
      { label: "Resume", href: "/resume.pdf" },
      { label: "Certifications", href: "#certifications" },
      { label: "Technologies", href: "#technologies" },
    ],
  },
} as const

// ============================================
// TYPE EXPORTS
// ============================================
export type SiteConfig = typeof siteConfig
export type PersonalInfo = typeof siteConfig.personal
export type ContactInfo = typeof siteConfig.contact
export type SocialLinks = typeof siteConfig.social
export type ProfessionalStats = typeof siteConfig.stats
export type Availability = typeof siteConfig.availability
export type SEOConfig = typeof siteConfig.seo
export type Branding = typeof siteConfig.branding

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get full name
 */
export function getFullName(): string {
  return `${siteConfig.personal.firstName} ${siteConfig.personal.lastName}`
}

/**
 * Get email link
 */
export function getEmailLink(): string {
  return `mailto:${siteConfig.contact.email}`
}

/**
 * Get phone link
 */
export function getPhoneLink(): string {
  return `tel:${siteConfig.contact.phoneRaw}`
}

/**
 * Get social link by platform
 */
export function getSocialLink(platform: keyof typeof siteConfig.social): string {
  return siteConfig.social[platform]
}

/**
 * Check if a social link is configured (not empty)
 */
export function hasSocialLink(platform: keyof typeof siteConfig.social): boolean {
  const link = siteConfig.social[platform]
  return Boolean(link && link.trim() !== "" && !link.endsWith("/"))
}

/**
 * Get all configured social links (filters out empty/placeholder links)
 */
export function getConfiguredSocialLinks(): Partial<Record<keyof typeof siteConfig.social, string>> {
  const configured: Record<string, string> = {}
  
  for (const [key, value] of Object.entries(siteConfig.social)) {
    // Only include if it has a username/path after the base URL
    if (value && !value.endsWith(".com/") && !value.endsWith(".net/") && !value.endsWith("/")) {
      configured[key] = value
    }
  }
  
  return configured
}

/**
 * Get contact methods for display
 */
export function getContactMethods() {
  return [
    {
      label: "Email",
      value: siteConfig.contact.email,
      href: getEmailLink(),
    },
    {
      label: "Phone",
      value: siteConfig.contact.phone,
      href: getPhoneLink(),
    },
    {
      label: "Location",
      value: siteConfig.personal.location,
      href: "#",
    },
  ]
}

/**
 * Get social links for footer/contact with icons info
 */
export function getSocialLinksForDisplay() {
  const links = []
  
  if (hasSocialLink("github")) {
    links.push({
      name: "GitHub",
      platform: "github" as const,
      href: siteConfig.social.github,
      color: "#333333",
      hoverColor: "#6e5494",
    })
  }
  
  if (hasSocialLink("linkedin")) {
    links.push({
      name: "LinkedIn",
      platform: "linkedin" as const,
      href: siteConfig.social.linkedin,
      color: "#0077B5",
      hoverColor: "#00a0dc",
    })
  }
  
  if (hasSocialLink("twitter")) {
    links.push({
      name: "Twitter",
      platform: "twitter" as const,
      href: siteConfig.social.twitter,
      color: "#1DA1F2",
      hoverColor: "#0c85d0",
    })
  }
  
  if (hasSocialLink("youtube")) {
    links.push({
      name: "YouTube",
      platform: "youtube" as const,
      href: siteConfig.social.youtube,
      color: "#FF0000",
      hoverColor: "#cc0000",
    })
  }
  
  if (hasSocialLink("calendly")) {
    links.push({
      name: "Schedule Call",
      platform: "calendly" as const,
      href: siteConfig.social.calendly,
      color: "#006BFF",
      hoverColor: "#0052cc",
    })
  }
  
  return links
}

/**
 * Get years of experience string
 */
export function getExperienceString(): string {
  return `${siteConfig.stats.yearsOfExperience}+ years`
}

/**
 * Get availability status
 */
export function getAvailabilityStatus() {
  return {
    isAvailable: siteConfig.availability.isAvailable,
    status: siteConfig.availability.status,
    quarter: siteConfig.availability.nextAvailableQuarter,
  }
}

/**
 * Get SEO metadata
 */
export function getSEOMetadata() {
  return {
    title: siteConfig.seo.siteName,
    description: siteConfig.seo.siteDescription,
    url: siteConfig.seo.siteUrl,
    image: siteConfig.seo.ogImage,
    twitterHandle: siteConfig.seo.twitterHandle,
    keywords: siteConfig.seo.keywords,
  }
}

/**
 * Get navigation links
 */
export function getQuickLinks() {
  return siteConfig.navigation.quickLinks
}

export function getResourceLinks() {
  return siteConfig.navigation.resourceLinks
}

/**
 * Get branding info
 */
export function getBranding() {
  return siteConfig.branding
}

/**
 * Get professional stats for display
 */
export function getProfessionalStats() {
  return [
    {
      label: "Monthly Volume",
      value: siteConfig.stats.monthlyVolume,
    },
    {
      label: "Uptime",
      value: siteConfig.stats.uptime,
    },
    {
      label: "Projects",
      value: `${siteConfig.stats.projectsCompleted}+`,
    },
  ]
}

/**
 * Check if intro video is configured
 */
export function hasIntroVideo(): boolean {
  return Boolean(siteConfig.personal.introVideoUrl && siteConfig.personal.introVideoUrl.trim() !== "")
}

/**
 * Get intro video URL
 */
export function getIntroVideoUrl(): string {
  return siteConfig.personal.introVideoUrl
}


