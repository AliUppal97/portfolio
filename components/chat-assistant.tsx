"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { MessageCircle, X, Bot, User, Loader2 } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { experience, projects, skills, certifications } from "@/lib/data"
import { useTheme } from "next-themes"
import { useCustomization } from "@/components/providers/customization-provider"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  isLoading?: boolean
}

interface Question {
  id: string
  text: string
  category: string
}

// Pre-defined questions that clients would typically ask
const predefinedQuestions: Question[] = [
  {
    id: "experience",
    text: "What's your experience and background?",
    category: "About",
  },
  {
    id: "skills",
    text: "What are your core technical skills?",
    category: "Skills",
  },
  {
    id: "availability",
    text: "Are you available for new projects?",
    category: "Availability",
  },
  {
    id: "projects",
    text: "Can you tell me about your recent projects?",
    category: "Projects",
  },
  {
    id: "expertise",
    text: "What industries have you worked in?",
    category: "Experience",
  },
  {
    id: "process",
    text: "What's your development process?",
    category: "Process",
  },
  {
    id: "certifications",
    text: "What certifications do you have?",
    category: "Credentials",
  },
  {
    id: "contact",
    text: "How can I get in touch with you?",
    category: "Contact",
  },
]

// Answer generation function
function generateAnswer(questionId: string): string {
  const { personal, stats, availability, contact } = siteConfig

  switch (questionId) {
    case "experience":
      return `I'm ${personal.name}, a ${personal.title} with ${stats.yearsOfExperience}+ years of experience building enterprise-grade applications. I specialize in ${personal.subtitle}, with a strong focus on React, Node.js, and cloud architecture.

Throughout my career, I've worked with companies like ${experience[0]?.company || "leading tech companies"}, where I've led development of platforms handling ${stats.monthlyVolume} monthly volume. I've completed ${stats.projectsCompleted}+ projects and served ${stats.clientsServed}+ clients, maintaining ${stats.uptime} uptime.

My approach combines technical excellence with leadership - I've mentored teams, established best practices, and delivered measurable business impact. I'm passionate about building scalable, maintainable systems that solve real-world problems.`

    case "skills":
      const topSkills = skills
        .flatMap((cat) => cat.items)
        .sort((a, b) => b.level - a.level)
        .slice(0, 6)
        .map((s) => s.name)
        .join(", ")

      return `My core technical skills span across multiple domains:

**Frontend Development:**
${skills.find((s) => s.category === "Frontend Development")?.items.map((i) => `• ${i.name} (${i.level}%)`).join("\n") || ""}

**Backend Development:**
${skills.find((s) => s.category === "Backend Development")?.items.map((i) => `• ${i.name} (${i.level}%)`).join("\n") || ""}

**Cloud & DevOps:**
${skills.find((s) => s.category === "Cloud & DevOps")?.items.map((i) => `• ${i.name} (${i.level}%)`).join("\n") || ""}

**Leadership & Soft Skills:**
${skills.find((s) => s.category === "Leadership & Soft Skills")?.items.map((i) => `• ${i.name} (${i.level}%)`).join("\n") || ""}

My top expertise areas include: ${topSkills}. I'm always learning and staying current with the latest technologies and best practices.`

    case "availability":
      return `${availability.isAvailable ? "Yes, I'm currently available" : "I'm currently engaged"} for new projects! 

**Current Status:** ${availability.status}
**Next Available:** ${availability.nextAvailableQuarter}
**Response Time:** ${availability.responseTime}

I'm open to discussing exciting opportunities, whether it's a full-time role, contract work, or consulting projects. I'm particularly interested in:
• Enterprise-scale applications
• Fintech and healthcare solutions
• Modern web applications with React/Next.js
• Cloud architecture and DevOps

Feel free to reach out if you'd like to discuss how I can help with your project!`

    case "projects":
      const recentProjects = projects.slice(0, 3)
      return `Here are some of my recent notable projects:

**${recentProjects[0]?.title || "Payments Platform"}**
${recentProjects[0]?.summary || ""}
${recentProjects[0]?.highlights?.slice(0, 2).map((h) => `• ${h}`).join("\n") || ""}

**${recentProjects[1]?.title || "Care Portal"}**
${recentProjects[1]?.summary || ""}
${recentProjects[1]?.highlights?.slice(0, 2).map((h) => `• ${h}`).join("\n") || ""}

**${recentProjects[2]?.title || "Analytics SaaS"}**
${recentProjects[2]?.summary || ""}
${recentProjects[2]?.highlights?.slice(0, 2).map((h) => `• ${h}`).join("\n") || ""}

These projects demonstrate my ability to handle complex, high-scale systems with ${stats.uptime} uptime and excellent performance. Each project involved end-to-end development, from architecture design to deployment and maintenance.`

    case "expertise":
      const industries = experience.map((exp) => {
        if (exp.company.includes("FinTech") || exp.company.includes("ACME")) return "Fintech"
        if (exp.company.includes("Health") || exp.company.includes("Care")) return "Healthcare"
        if (exp.company.includes("SaaS")) return "SaaS"
        return exp.company
      })
      const uniqueIndustries = [...new Set(industries)]

      return `I have extensive experience across multiple industries:

**${uniqueIndustries[0] || "Fintech"}**
${experience[0]?.highlights?.slice(0, 2).map((h) => `• ${h}`).join("\n") || ""}

**${uniqueIndustries[1] || "Healthcare"}**
${experience[1]?.highlights?.slice(0, 2).map((h) => `• ${h}`).join("\n") || ""}

**${uniqueIndustries[2] || "SaaS"}**
${experience[2]?.highlights?.slice(0, 2).map((h) => `• ${h}`).join("\n") || ""}

This diverse experience has given me a deep understanding of industry-specific requirements, compliance standards (like HIPAA for healthcare), and the unique challenges each sector faces. I'm comfortable working in regulated environments and building systems that meet strict security and compliance standards.`

    case "process":
      return `My development process is collaborative and results-driven:

**1. Discovery & Planning**
I start by understanding your business goals, technical requirements, and constraints. This includes stakeholder interviews, technical feasibility analysis, and architecture planning.

**2. Design & Architecture**
I design scalable, maintainable systems with clear documentation. I focus on:
• Scalability and performance
• Security best practices
• Developer experience
• Long-term maintainability

**3. Development**
I follow agile methodologies with:
• Regular code reviews
• Comprehensive testing (aiming for 95%+ coverage)
• Continuous integration/deployment
• Clear communication and progress updates

**4. Deployment & Optimization**
I ensure smooth deployments with:
• Monitoring and observability
• Performance optimization
• Documentation and knowledge transfer
• Post-launch support

**5. Iteration & Improvement**
I believe in continuous improvement through:
• Regular retrospectives
• Performance monitoring
• User feedback integration
• Technical debt management

I maintain ${stats.uptime} uptime and typically respond within ${availability.responseTime}.`

    case "certifications":
      const activeCerts = certifications.filter((c) => {
        if (!c.expiryDate) return true
        return new Date(c.expiryDate) > new Date()
      })

      return `I hold several industry-recognized certifications:

${activeCerts.slice(0, 4).map((cert) => {
        return `**${cert.name}** (${cert.organization})
• Category: ${cert.category}
• Valid until: ${cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString() : "No expiry"}
• Focus: ${cert.skills?.slice(0, 3).join(", ") || ""}`
      }).join("\n\n")}

These certifications demonstrate my commitment to staying current with industry best practices and maintaining expertise in cloud architecture, security, and modern development practices.`

    case "contact":
      return `I'd love to hear from you! Here are the best ways to reach me:

**Email:** ${contact.email}
**Phone:** ${contact.phone}
**Location:** ${siteConfig.personal.location}

**Social Links:**
${siteConfig.social.linkedin && siteConfig.social.linkedin.length > "https://linkedin.com/in/".length ? `• LinkedIn: ${siteConfig.social.linkedin}` : ""}
${siteConfig.social.github && siteConfig.social.github.length > "https://github.com/".length ? `• GitHub: ${siteConfig.social.github}` : ""}
${siteConfig.social.personalWebsite && siteConfig.social.personalWebsite.length > "https://".length ? `• Website: ${siteConfig.social.personalWebsite}` : ""}

**Response Time:** ${availability.responseTime}

You can also:
• Fill out the contact form on this website
• Schedule a call if you have a Calendly link
• Reach out via LinkedIn for professional inquiries

I'm always open to discussing new opportunities, collaborations, or just having a conversation about technology and development!`

    default:
      return `I'm ${personal.name}, a ${personal.title} with ${stats.yearsOfExperience}+ years of experience. ${personal.bio}

I specialize in building enterprise-grade applications using modern technologies like React, Node.js, and cloud architecture. I've completed ${stats.projectsCompleted}+ projects and I'm currently ${availability.isAvailable ? "available" : "engaged"} for new opportunities.

Feel free to ask me about my experience, skills, projects, or availability!`
  }
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const userHasScrolledRef = useRef(false)
  const { resolvedTheme } = useTheme()
  const { customization } = useCustomization()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if user is near the bottom of the scroll container
  const isNearBottom = () => {
    if (!messagesContainerRef.current) return true
    const container = messagesContainerRef.current
    const threshold = 100 // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold
  }

  const scrollToBottom = (force = false) => {
    if (!force && userHasScrolledRef.current && !isNearBottom()) {
      return // Don't auto-scroll if user has manually scrolled up
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle scroll events to detect manual scrolling
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      if (isNearBottom()) {
        userHasScrolledRef.current = false // User is at bottom, allow auto-scroll
      } else {
        userHasScrolledRef.current = true // User has scrolled up
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [isOpen])

  // Auto-scroll only when appropriate
  useEffect(() => {
    // Always scroll to bottom on initial load or when new message is added and user is at bottom
    if (messages.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }, [messages.length]) // Only trigger on message count change, not content changes

  const handleQuestionClick = useCallback((question: Question) => {
    // Reset scroll tracking when new question is clicked
    userHasScrolledRef.current = false

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question.text,
    }

    setMessages((prev) => [...prev, userMessage])

    // Show typing indicator
    setIsTyping(true)

    // Simulate AI thinking/typing delay
    setTimeout(() => {
      setIsTyping(false)
      const answer = generateAnswer(question.id)

      // Simulate typing effect
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "",
        isLoading: true,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Type out the answer character by character
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex < answer.length) {
          setMessages((prev) => {
            const updated = [...prev]
            const lastMessage = updated[updated.length - 1]
            if (lastMessage && lastMessage.role === "assistant") {
              lastMessage.content = answer.slice(0, currentIndex + 1)
              lastMessage.isLoading = false
            }
            return updated
          })
          currentIndex++
          
          // Only auto-scroll during typing if user is near bottom
          if (isNearBottom()) {
            setTimeout(() => scrollToBottom(true), 50)
          }
        } else {
          clearInterval(typingInterval)
          // Final scroll to bottom when typing completes (only if user is at bottom)
          if (isNearBottom()) {
            setTimeout(() => scrollToBottom(true), 100)
          }
        }
      }, 15) // Adjust speed here (lower = faster)
    }, 800) // Initial delay before starting to type
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  // Initialize with welcome message when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: `Hi! I'm an AI assistant here to help you learn more about ${siteConfig.personal.name}. Feel free to ask me any of the questions below, or ask your own!`,
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  // Reset messages when closing (optional - remove if you want to keep chat history)
  useEffect(() => {
    if (!isOpen) {
      // Uncomment the line below if you want to clear messages on close
      // setMessages([])
    }
  }, [isOpen])

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
          <div
            onClick={() => setIsOpen(true)}
            className={cn(
              "relative h-14 w-14 rounded-full shadow-lg transition-all duration-300",
              "hover:scale-110 hover:shadow-xl cursor-pointer group",
              "focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50 focus:outline-none",
              "transform-gpu will-change-transform overflow-hidden",
              "bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60"
            )}
            role="button"
            tabIndex={0}
            aria-label="Open chat assistant"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setIsOpen(true)
              }
            }}
          >
            {/* Primary Background Layer */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(96, 165, 250, 0.6) 0%, rgba(168, 85, 247, 0.6) 50%, rgba(244, 114, 182, 0.6) 100%)"
              }}
            />

            {/* Secondary Background Layer for Enhanced Depth */}
            <div 
              className="absolute inset-0 rounded-full opacity-90"
              style={{
                background: "linear-gradient(135deg, rgba(96, 165, 250, 0.6) 0%, rgba(168, 85, 247, 0.6) 50%, rgba(244, 114, 182, 0.6) 100%)",
                filter: "brightness(1.1) saturate(1.2)"
              }}
            />

            {/* Button Content with Icon */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <MessageCircle className="h-6 w-6 text-white transition-all duration-300 group-hover:scale-110 drop-shadow-lg" />
            </div>

            {/* Enhanced Hover Glow Effect */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 ease-out"
              style={{
                background: "linear-gradient(135deg, rgba(96, 165, 250, 0.25) 0%, rgba(168, 85, 247, 0.25) 50%, rgba(244, 114, 182, 0.25) 100%)",
                transform: "scale(1.1)"
              }}
            />

            {/* Premium Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />

            {/* Enhanced Border Glow on Hover */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(96, 165, 250, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(244, 114, 182, 0.4) 100%)",
                filter: "blur(1px)"
              }}
            />

            {/* Subtle Inner Shadow for Depth */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-60" />

            {/* Enhanced Box Shadow for Better Visibility */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "0 20px 40px -12px rgba(96, 165, 250, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
              }}
            />

            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse border-2 border-white z-20" />
          </div>
        </div>
      )}

      {/* Floating Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] flex flex-col shadow-2xl rounded-2xl overflow-hidden border chat-widget-container"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-5)",
            backdropFilter: "none",
          }}
        >
          {/* Header */}
          <div 
            className="px-4 pt-4 pb-3 border-b flex-shrink-0"
            style={{
              borderColor: "color-mix(in srgb, var(--border) 60%, transparent)",
              background: "linear-gradient(135deg, var(--surface) 0%, var(--surface-variant) 100%)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="h-9 w-9 rounded-full flex items-center justify-center shadow-md flex-shrink-0 opacity-60"
                  style={{
                    background: "linear-gradient(135deg, rgba(96, 165, 250, 0.6) 0%, rgba(168, 85, 247, 0.6) 50%, rgba(244, 114, 182, 0.6) 100%)"
                  }}
                >
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 
                    className="text-base font-semibold truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Chat with {siteConfig.personal.firstName}
                  </h3>
                  <p 
                    className="text-xs truncate"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Ask me anything
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-7 w-7 rounded-full flex-shrink-0"
                style={{
                  color: "var(--text-primary)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--surface-variant)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3 chat-messages-scroll min-h-0"
            style={{
              backgroundColor: "var(--card)",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div 
                    className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm opacity-60"
                    style={{
                      background: "linear-gradient(135deg, rgba(96, 165, 250, 0.6) 0%, rgba(168, 85, 247, 0.6) 50%, rgba(244, 114, 182, 0.6) 100%)"
                    }}
                  >
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-xl px-3 py-2 shadow-sm",
                    message.role === "user"
                      ? "bg-primary"
                      : "",
                    message.isLoading && "flex items-center gap-2"
                  )}
                  style={
                    message.role === "assistant"
                      ? {
                          background: "linear-gradient(135deg, var(--surface-container) 0%, var(--surface-variant) 100%)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border)",
                          borderColor: "color-mix(in srgb, var(--border) 50%, transparent)",
                        }
                      : {
                          background: "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 90%, var(--text-primary) 10%) 100%)",
                          color: "var(--primary-foreground)",
                          boxShadow: "0 2px 8px -2px color-mix(in srgb, var(--primary) 30%, transparent)",
                        }
                  }
                >
                  {message.isLoading ? (
                    <div className="flex items-center gap-1.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ 
                        color: "var(--text-tertiary)"
                      }} />
                      <span className="text-xs" style={{ 
                        color: "var(--text-tertiary)"
                      }}>Typing...</span>
                    </div>
                  ) : (
                    <p 
                      className="text-xs whitespace-pre-wrap leading-relaxed"
                      style={{
                        color: message.role === "user" 
                          ? "var(--primary-foreground)"
                          : "var(--text-primary)",
                      }}
                    >
                      {message.content}
                    </p>
                  )}
                </div>
                {message.role === "user" && (
                  <div 
                    className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{
                      backgroundColor: "var(--primary)",
                    }}
                  >
                    <User 
                      className="h-3.5 w-3.5" 
                      style={{
                        color: "var(--primary-foreground)",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div 
                  className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm opacity-60"
                  style={{
                    background: "linear-gradient(135deg, rgba(96, 165, 250, 0.6) 0%, rgba(168, 85, 247, 0.6) 50%, rgba(244, 114, 182, 0.6) 100%)"
                  }}
                >
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <div 
                  className="rounded-xl px-3 py-2 shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, var(--surface-container) 0%, var(--surface-variant) 100%)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)",
                    borderColor: "color-mix(in srgb, var(--border) 50%, transparent)",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ 
                      color: "var(--text-tertiary)"
                    }} />
                    <span className="text-xs" style={{ 
                      color: "var(--text-tertiary)"
                    }}>Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Pre-defined Questions */}
          <div 
            className="border-t px-3 py-3 flex-shrink-0"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface-variant)",
            }}
          >
            <p 
              className="text-[10px] font-semibold mb-2 uppercase tracking-wide"
              style={{ color: "var(--text-secondary)" }}
            >
              Suggested Questions
            </p>
            <div className="grid grid-cols-1 gap-1.5 max-h-[120px] overflow-y-auto chat-questions-scroll">
              {predefinedQuestions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  disabled={isTyping}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-md text-[11px] transition-colors duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "hover:bg-primary hover:text-primary-foreground"
                  )}
                  style={{
                    border: "1px solid var(--border)",
                    borderColor: "color-mix(in srgb, var(--border) 60%, transparent)",
                    background: "linear-gradient(135deg, var(--card) 0%, var(--surface) 100%)",
                    color: "var(--text-primary)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isTyping) {
                      e.currentTarget.style.background = "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 90%, var(--text-primary) 10%) 100%)"
                      e.currentTarget.style.color = "var(--primary-foreground)"
                      e.currentTarget.style.borderColor = "var(--primary)"
                      e.currentTarget.style.boxShadow = "0 2px 8px -2px color-mix(in srgb, var(--primary) 30%, transparent)"
                      e.currentTarget.style.transform = "translateY(-1px)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isTyping) {
                      e.currentTarget.style.background = "linear-gradient(135deg, var(--card) 0%, var(--surface) 100%)"
                      e.currentTarget.style.color = "var(--text-primary)"
                      e.currentTarget.style.borderColor = "color-mix(in srgb, var(--border) 60%, transparent)"
                      e.currentTarget.style.boxShadow = "none"
                      e.currentTarget.style.transform = "translateY(0)"
                    }
                  }}
                >
                  <span className="truncate block">{question.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </>
  )
}

