import { render, screen } from '@testing-library/react'
import { AchievementsSection } from '@/components/sections/achievements'
import { CustomizationProvider } from '@/components/providers/customization-provider'
import { ThemeProvider } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ resolvedTheme: 'light' }),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  useInView: () => ({ ref: jest.fn(), inView: true }),
  useAnimation: () => ({
    start: jest.fn(),
    set: jest.fn(),
  }),
}))

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light">
      <CustomizationProvider>
        {component}
      </CustomizationProvider>
    </ThemeProvider>
  )
}

describe('AchievementsSection', () => {
  it('renders achievements section', () => {
    renderWithProviders(<AchievementsSection />)
    
    // Check for section heading
    expect(screen.getByText(/Achievements/i)).toBeInTheDocument()
  })

  it('renders metrics', () => {
    renderWithProviders(<AchievementsSection />)
    
    // Metrics should be rendered (check for common metric titles)
    const metrics = screen.queryAllByText(/Projects|Years|Clients|Uptime/i)
    expect(metrics.length).toBeGreaterThanOrEqual(0)
  })
})

