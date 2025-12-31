import { render } from '@testing-library/react'
import { AnalyticsProvider } from '@/components/providers/analytics-provider'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/web-vitals
jest.mock('next/web-vitals', () => ({
  useReportWebVitals: () => jest.fn(),
}))

// Mock analytics
jest.mock('@/lib/analytics', () => ({
  initGA: jest.fn(),
  trackPageView: jest.fn(),
  initScrollTracking: () => jest.fn(),
  initTimeTracking: () => jest.fn(),
  trackWebVitals: jest.fn(),
}))

describe('AnalyticsProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <AnalyticsProvider>
        <div>Test Content</div>
      </AnalyticsProvider>
    )
    
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('initializes analytics with GA ID', () => {
    const { initGA } = require('@/lib/analytics')
    
    render(
      <AnalyticsProvider gaId="test-ga-id">
        <div>Test</div>
      </AnalyticsProvider>
    )
    
    expect(initGA).toHaveBeenCalledWith('test-ga-id')
  })
})

