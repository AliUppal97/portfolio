"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo })
    
    // Log to external service (Sentry, LogRocket, etc.)
    // Only log to console in development, production should use error tracking service
    if (process.env.NODE_ENV === 'development') {
      console.error("Error caught by boundary:", error, errorInfo)
    }
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div 
          className="min-h-[400px] flex items-center justify-center p-8"
          style={{ backgroundColor: "hsl(var(--bg))" }}
        >
          <div 
            className="max-w-md w-full rounded-3xl p-8 text-center"
            style={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #EF4444 0%, #F97316 100%)",
                boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)"
              }}
            >
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            
            <h2 
              className="text-2xl font-bold mb-3"
              style={{ color: "hsl(var(--text-primary))" }}
            >
              Something went wrong
            </h2>
            
            <p 
              className="text-base mb-6"
              style={{ color: "hsl(var(--text-secondary))" }}
            >
              We apologize for the inconvenience. Please try again or return to the home page.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div 
                className="mb-6 p-4 rounded-xl text-left overflow-auto max-h-32"
                style={{ 
                  backgroundColor: "hsl(var(--surface-variant))",
                  border: "1px solid hsl(var(--border))"
                }}
              >
                <code 
                  className="text-xs font-mono"
                  style={{ color: "hsl(var(--text-error))" }}
                >
                  {this.state.error.message}
                </code>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Button
                onClick={this.handleRetry}
                className="rounded-full px-6"
                style={{
                  background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                  color: "white"
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = "/"}
                className="rounded-full px-6"
                style={{
                  backgroundColor: "hsl(var(--surface))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--text-primary))"
                }}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook-based error boundary wrapper for functional components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}

// Section-specific error boundary with customizable message
export function SectionErrorBoundary({ 
  children, 
  sectionName 
}: { 
  children: React.ReactNode
  sectionName: string 
}) {
  return (
    <ErrorBoundary
      fallback={
        <div 
          className="py-16 text-center"
          style={{ backgroundColor: "hsl(var(--surface))" }}
        >
          <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-amber-500" />
          <p style={{ color: "hsl(var(--text-secondary))" }}>
            Unable to load {sectionName}. Please refresh the page.
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}









