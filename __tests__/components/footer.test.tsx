import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'
import { CustomizationProvider } from '@/components/providers/customization-provider'
import { ThemeProvider } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ resolvedTheme: 'light', theme: 'light' }),
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

describe('Footer', () => {
  it('renders footer', () => {
    renderWithProviders(<Footer />)
    
    // Footer should be rendered
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders copyright year', () => {
    renderWithProviders(<Footer />)
    
    const currentYear = new Date().getFullYear()
    // Check for copyright text that includes the year
    // Use a more specific pattern that matches the copyright line format
    const copyrightText = screen.getByText((content, element) => {
      return element?.textContent?.includes(`© ${currentYear}`) || false
    })
    expect(copyrightText).toBeInTheDocument()
  })
})

