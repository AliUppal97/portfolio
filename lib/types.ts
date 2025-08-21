export interface SkillItem {
  name: string
  level: number
}

export interface SkillCategory {
  category: string
  items: SkillItem[]
}

export interface TechnologyItem {
  name: string
  category: string
  years: number
  yearsLabel: string
  description: string
  icon?: string
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  highlights: string[]
  tech: string[]
  logoSrc?: string
  logoAlt?: string
}

export interface ProjectItem {
  title: string
  summary: string
  description: string
  highlights: string[]
  tags: string[]
  results: string
  imageAlt: string
}

export interface TestimonialItem {
  name: string
  title: string
  quote: string
  date?: string
  avatarSrc?: string
}

export interface CertificationItem {
  name: string
  organization: string
  category: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  verificationUrl?: string
  description: string
  skills: string[]
  badgeSrc?: string
  badgeAlt?: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  content: string
}

export interface ToolItem {
  name: string
  category: string
  description: string
  logoSrc: string
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  yearsUsed: number
}
