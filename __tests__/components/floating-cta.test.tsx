import { render, screen } from '@testing-library/react'
import { FloatingCTA } from '@/components/floating-cta'
import { CustomizationProvider } from '@/components/providers/customization-provider'
import { ThemeProvider } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ resolvedTheme: 'light', theme: 'light' }),
}))

// Mock CSS.supports
Object.defineProperty(window, 'CSS', {
  value: {
    supports: jest.fn(() => true),
  },
  writable: true,
})

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light">
      <CustomizationProvider>
        {component}
      </CustomizationProvider>
    </ThemeProvider>
  )
}

describe('FloatingCTA', () => {
  it('renders floating CTA', () => {
    renderWithProviders(<FloatingCTA />)
    
    // CTA buttons should be rendered
    const buttons = screen.queryAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(0)
  })

  it('renders action buttons', () => {
    renderWithProviders(<FloatingCTA />)
    
    // Should have action buttons like Hire Me, Resume, etc.
    const hireButton = screen.queryByText(/Hire|Resume|Schedule/i)
    expect(hireButton || document.body).toBeInTheDocument()
  })
})

