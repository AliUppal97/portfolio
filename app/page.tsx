import { HeroSection } from "@/components/sections/hero"
import { AchievementsSection } from "@/components/sections/achievements"
import { SkillsSection } from "@/components/sections/skills"
import { TechnologiesSection } from "@/components/sections/technologies"
import { ToolsSection } from "@/components/sections/tools"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { CertificationsSection } from "@/components/sections/certifications"
import { TestimonialsMarqueeSection } from "@/components/sections/testimonials-marquee"
import { ContactSection } from "@/components/sections/contact"
import { BlogPreviewSection } from "@/components/sections/blog-preview"
import { Suspense } from "react"
import type { Metadata } from "next"
import { CustomizationProvider } from "@/components/providers/customization-provider"
import { CustomizerPanel } from "@/components/customizer-panel"
import { CustomCursor } from "@/components/custom-cursor"
import { FloatingCTA } from "@/components/floating-cta"

export const metadata: Metadata = {
  title: "Senior Software Engineer Portfolio",
  description: "Portfolio of a Senior Software Engineer with 7+ years experience in enterprise full‑stack development.",
  openGraph: {
    title: "Senior Software Engineer Portfolio",
    description:
      "Portfolio of a Senior Software Engineer with 7+ years experience in enterprise full‑stack development.",
    images: [{ url: "/opengraph-portfolio-cover.png", width: 1200, height: 630, alt: "Portfolio Open Graph Image" }],
    type: "website",
    url: "https://example.com",
  },
}

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Senior Software Engineer",
    jobTitle: "Senior Software Engineer",
    url: "https://example.com",
    sameAs: ["https://www.linkedin.com/", "https://github.com/"],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

export default function HomePage() {
  return (
    <CustomizationProvider>
      <CustomCursor />
      <main className="scroll-smooth" style={{ backgroundColor: "var(--bg)" }}>
        <JsonLd />
        <div
          className="min-h-screen"
          style={{
            backgroundColor: "var(--surface)",
          }}
        >
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <HeroSection />
            <AchievementsSection />
            <SkillsSection />
            <TechnologiesSection />
            <ToolsSection />
            <ExperienceSection />
            <ProjectsSection />
            <CertificationsSection />
            <TestimonialsMarqueeSection />
            <BlogPreviewSection />
            <ContactSection />
          </Suspense>
          <CustomizerPanel />
          <FloatingCTA />
        </div>
      </main>
    </CustomizationProvider>
  )
}
