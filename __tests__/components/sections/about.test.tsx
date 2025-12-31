import { render, screen } from '@testing-library/react'
import { AboutSection } from '@/components/sections/about'
import { CustomizationProvider } from '@/components/providers/customization-provider'
import { ThemeProvider } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ resolvedTheme: 'light' }),
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

describe('AboutSection', () => {
  it('renders about section', () => {
    renderWithProviders(<AboutSection />)
    
    // Check for section heading
    expect(screen.getByText(/About/i)).toBeInTheDocument()
  })

  it('renders highlights', () => {
    renderWithProviders(<AboutSection />)
    
    // Check for highlight titles
    expect(screen.getByText(/Team Leadership/i)).toBeInTheDocument()
    expect(screen.getByText(/Zero Downtime/i)).toBeInTheDocument()
    expect(screen.getByText(/Performance Gains/i)).toBeInTheDocument()
  })

  it('renders expertise areas', () => {
    renderWithProviders(<AboutSection />)
    
    // Check for expertise labels - use getAllByText since they may appear multiple times
    const fintechElements = screen.getAllByText(/Fintech/i)
    expect(fintechElements.length).toBeGreaterThan(0)
    const healthcareElements = screen.getAllByText(/Healthcare/i)
    expect(healthcareElements.length).toBeGreaterThan(0)
  })

  it('renders strengths', () => {
    renderWithProviders(<AboutSection />)
    
    // Check for strength labels - use getAllByText since "Leadership" appears in both highlights and strengths
    const leadershipElements = screen.getAllByText(/Leadership/i)
    expect(leadershipElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/Architecture/i)).toBeInTheDocument()
  })
})

