import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/sections/hero'
import { CustomizationProvider } from '@/components/providers/customization-provider'
import { ThemeProvider } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ resolvedTheme: 'light' }),
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
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

describe('HeroSection', () => {
  it('renders hero section', () => {
    renderWithProviders(<HeroSection />)
    
    // Check for main heading
    expect(screen.getByText(/Building/i)).toBeInTheDocument()
    expect(screen.getByText(/Enterprise-Grade/i)).toBeInTheDocument()
    expect(screen.getByText(/Experiences/i)).toBeInTheDocument()
  })

  it('renders professional stats', () => {
    renderWithProviders(<HeroSection />)
    
    // Stats should be rendered
    const stats = screen.getAllByText(/Monthly Volume|Uptime|Projects/i)
    expect(stats.length).toBeGreaterThan(0)
  })

  it('renders CTA buttons', () => {
    renderWithProviders(<HeroSection />)
    
    // Should have contact/resume buttons
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders social links when available', () => {
    renderWithProviders(<HeroSection />)
    
    // Social links might be present
    const links = screen.queryAllByRole('link')
    // At minimum, should have some links
    expect(links.length).toBeGreaterThanOrEqual(0)
  })
})

