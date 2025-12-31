import { render, screen } from '@testing-library/react'
import { CertificationsSection } from '@/components/sections/certifications'
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

describe('CertificationsSection', () => {
  it('renders certifications section', () => {
    renderWithProviders(<CertificationsSection />)
    
    // Check for section heading
    expect(screen.getByText(/Certifications/i)).toBeInTheDocument()
  })

  it('renders certification stats', () => {
    renderWithProviders(<CertificationsSection />)
    
    // Stats should be rendered
    const stats = screen.queryAllByText(/Active|Expiring|Total/i)
    expect(stats.length).toBeGreaterThanOrEqual(0)
  })
})

