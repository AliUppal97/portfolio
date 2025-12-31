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
    // Use getAllByText and filter to find the copyright element specifically
    // This avoids matching "Q1 2025" text which also contains the year
    const yearElements = screen.getAllByText((content, element) => {
      const text = element?.textContent || ''
      return text.includes(currentYear.toString())
    })
    
    // Find the one that contains the copyright symbol
    const copyrightElement = yearElements.find((el) => {
      return el.textContent?.includes('©')
    })
    
    expect(copyrightElement).toBeInTheDocument()
    expect(copyrightElement?.textContent).toContain(`© ${currentYear}`)
  })
})

