"use client"

import { cn } from "@/lib/utils"
import { useCustomization } from "@/components/providers/customization-provider"
import { Award, Target, Users, Zap, TrendingUp, Shield, Code, Lightbulb } from "lucide-react"

export function AboutSection() {
  const { customization } = useCustomization()

  const highlights = [
    {
      icon: Users,
      title: "Team Leadership",
      description: "Led cross-functional teams up to 8 engineers and cross-org stakeholders",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Zero Downtime",
      description: "Shipped large-scale migrations with zero downtime and seamless transitions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Performance Gains",
      description: "Drove performance improvements achieving 30–60% latency reduction",
      color: "from-purple-500 to-violet-500",
    },
  ]

  const expertise = [
    { label: "Fintech", icon: "💰", color: "from-green-500 to-emerald-600" },
    { label: "Healthcare", icon: "🏥", color: "from-blue-500 to-cyan-600" },
    { label: "SaaS", icon: "☁️", color: "from-purple-500 to-violet-600" },
    { label: "E-commerce", icon: "🛒", color: "from-orange-500 to-red-600" },
  ]

  const strengths = [
    { label: "Leadership", icon: Users, color: "hsl(217, 91%, 60%)" },
    { label: "Architecture", icon: Code, color: "hsl(142, 76%, 36%)" },
    { label: "DX & Tooling", icon: Lightbulb, color: "hsl(43, 96%, 56%)" },
    { label: "Quality", icon: Shield, color: "hsl(262, 83%, 58%)" },
  ]

  return (
    <section
      id="about"
      className={cn(
        "container mx-auto px-4 relative overflow-hidden",
        customization.spacing === "compact"
          ? "py-16"
          : customization.spacing === "comfortable"
            ? "py-20 md:py-28"
            : "py-28 md:py-36",
      )}
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Premium header */}
        <header className="text-center mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Target className="w-8 h-8 text-text-info" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-text-primary via-blue-600 to-text-primary dark:from-text-inverse dark:via-blue-400 dark:to-text-inverse bg-clip-text text-transparent">
              About Me
            </h2>
            <Award className="w-8 h-8 text-text-warning" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
        </header>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Premium intro */}
            <div
              className="rounded-3xl p-8 backdrop-blur-md relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--surface) / 0.1) 0%, hsl(var(--surface) / 0.05) 100%)",
                border: "1px solid hsl(var(--border) / 0.2)",
                boxShadow: "var(--shadow-card)",
                backgroundColor: "hsl(var(--surface))",
                borderColor: "hsl(var(--border))",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              <div className="relative z-10">
                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-text-primary">
                  I'm a{" "}
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Senior Software Engineer
                  </span>{" "}
                  with 7+ years of experience building enterprise applications that process millions of requests daily.
                  I architect platforms, mentor teams, and deliver measurable outcomes.
                </p>
                <p className="text-lg leading-relaxed text-text-secondary">
                  My work spans microservices, event-driven systems, and modern web apps. I've led initiatives in
                  fintech, healthcare, and SaaS, improving reliability, security, and user experience at scale.
                </p>
              </div>
            </div>

            {/* Key highlights */}
            <div className="grid gap-6 md:grid-cols-1">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className="group rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--surface) / 0.08) 0%, hsl(var(--surface) / 0.03) 100%)",
                    border: "1px solid hsl(var(--border) / 0.1)",
                    boxShadow: "var(--shadow-card)",
                    backgroundColor: "hsl(var(--surface))",
                    borderColor: "hsl(var(--border))",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.9))`,
                      }}
                    >
                      <highlight.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 text-text-primary">{highlight.title}</h3>
                      <p className="leading-relaxed text-text-secondary">{highlight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Industries */}
            <div
              className="rounded-3xl p-6 backdrop-blur-md"
              style={{
                background: "linear-gradient(135deg, hsl(var(--surface) / 0.1) 0%, hsl(var(--surface) / 0.05) 100%)",
                border: "1px solid hsl(var(--border) / 0.2)",
                boxShadow: "var(--shadow-card)",
                backgroundColor: "hsl(var(--surface))",
                borderColor: "hsl(var(--border))",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                <h3 className="text-lg font-bold text-text-primary">Industries</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {expertise.map((item) => (
                  <div
                    key={item.label}
                    className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--surface-variant) / 0.1) 0%, hsl(var(--surface-variant) / 0.05) 100%)",
                      border: "1px solid hsl(var(--border) / 0.1)",
                      backgroundColor: "hsl(var(--surface-variant))",
                      borderColor: "hsl(var(--border))",
                    }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-sm text-text-primary">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Strengths */}
            <div
              className="rounded-3xl p-6 backdrop-blur-md"
              style={{
                background: "linear-gradient(135deg, hsl(var(--surface) / 0.1) 0%, hsl(var(--surface) / 0.05) 100%)",
                border: "1px solid hsl(var(--border) / 0.2)",
                boxShadow: "var(--shadow-card)",
                backgroundColor: "hsl(var(--surface))",
                borderColor: "hsl(var(--border))",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
                <h3 className="text-lg font-bold text-text-primary">Core Strengths</h3>
              </div>
              <div className="space-y-3">
                {strengths.map((strength) => (
                  <div
                    key={strength.label}
                    className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--surface-variant) / 0.1) 0%, hsl(var(--surface-variant) / 0.05) 100%)",
                      border: "1px solid hsl(var(--border) / 0.1)",
                      backgroundColor: "hsl(var(--surface-variant))",
                      borderColor: "hsl(var(--border))",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: strength.color + "20" }}
                    >
                      <strength.icon className="w-4 h-4" style={{ color: strength.color }} />
                    </div>
                    <span className="font-medium text-text-primary">{strength.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div
              className="rounded-3xl p-6 backdrop-blur-md text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.1) 100%)",
                border: "1px solid hsl(var(--primary) / 0.2)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="relative z-10">
                <Award className="w-12 h-12 mx-auto mb-4 text-text-info" />
                <h3 className="text-lg font-bold mb-2 text-text-primary">Ready to Build Something Amazing?</h3>
                <p className="text-sm mb-4 text-text-secondary">
                  Let's discuss how I can help drive your next project to success.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                    color: "white",
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                  }}
                >
                  <span>Let's Connect</span>
                  <Target className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
