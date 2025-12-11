"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg",
        className
      )}
      style={{
        backgroundColor: "hsl(var(--surface-variant))",
        ...style
      }}
    />
  )
}

// Premium Card Skeleton
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl p-6 space-y-4",
        className
      )}
      style={{
        backgroundColor: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "var(--shadow-card)"
      }}
    >
      <Skeleton className="h-48 w-full rounded-2xl" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

// Project Card Skeleton
export function ProjectCardSkeleton() {
  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        backgroundColor: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "var(--shadow-card)"
      }}
    >
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Experience Card Skeleton
export function ExperienceCardSkeleton() {
  return (
    <div
      className="rounded-3xl overflow-hidden ml-12 md:ml-16 mb-12"
      style={{
        backgroundColor: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "var(--shadow-card)"
      }}
    >
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center p-4 rounded-2xl" style={{ backgroundColor: "hsl(var(--surface))" }}>
              <Skeleton className="h-10 w-10 rounded-xl mx-auto mb-2" />
              <Skeleton className="h-5 w-12 mx-auto mb-1" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-6 w-6 rounded-lg flex-shrink-0" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Testimonial Card Skeleton
export function TestimonialCardSkeleton() {
  return (
    <div
      className="min-w-[320px] max-w-[360px] rounded-3xl p-6 md:min-w-[420px] md:max-w-[440px]"
      style={{
        backgroundColor: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "var(--shadow-card)"
      }}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="mt-4 h-3 w-20" />
    </div>
  )
}

// Certification Card Skeleton
export function CertificationCardSkeleton() {
  return (
    <div
      className="rounded-3xl p-8"
      style={{
        backgroundColor: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "var(--shadow-card)"
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-2xl" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-5 w-1/2 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5 mb-6" />
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap mb-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-11 w-full rounded-xl" />
    </div>
  )
}

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <Skeleton className="h-8 w-48 rounded-full" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-16 w-2/3" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>
          <div className="flex gap-6">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-14 w-40 rounded-full" />
            <Skeleton className="h-14 w-36 rounded-full" />
          </div>
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-[500px] w-[500px] rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Grid Skeleton for multiple cards
export function GridSkeleton({ 
  count = 6, 
  columns = "md:grid-cols-2 lg:grid-cols-3",
  CardComponent = CardSkeleton 
}: { 
  count?: number
  columns?: string
  CardComponent?: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className={cn("grid gap-8", columns)}>
      {[...Array(count)].map((_, i) => (
        <CardComponent key={i} />
      ))}
    </div>
  )
}

// Stats Skeleton
export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="text-center p-6 rounded-3xl"
          style={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            boxShadow: "var(--shadow-card)"
          }}
        >
          <Skeleton className="h-12 w-12 rounded-2xl mx-auto mb-4" />
          <Skeleton className="h-8 w-16 mx-auto mb-2" />
          <Skeleton className="h-4 w-24 mx-auto mb-1" />
          <Skeleton className="h-3 w-20 mx-auto" />
        </div>
      ))}
    </div>
  )
}

// Navigation Skeleton
export function NavigationSkeleton() {
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 h-20"
      style={{ backgroundColor: "hsl(var(--surface) / 0.95)" }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="hidden lg:flex items-center gap-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-10 w-28 rounded-full" />
      </div>
    </div>
  )
}


