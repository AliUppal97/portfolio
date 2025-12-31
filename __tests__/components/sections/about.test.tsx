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
    
    // Check for expertise labels
    expect(screen.getByText(/Fintech/i)).toBeInTheDocument()
    expect(screen.getByText(/Healthcare/i)).toBeInTheDocument()
  })

  it('renders strengths', () => {
    renderWithProviders(<AboutSection />)
    
    // Check for strength labels
    expect(screen.getByText(/Leadership/i)).toBeInTheDocument()
    expect(screen.getByText(/Architecture/i)).toBeInTheDocument()
  })
})

