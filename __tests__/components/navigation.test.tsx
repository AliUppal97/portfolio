import { render, screen, fireEvent } from '@testing-library/react'
import { Navigation } from '@/components/navigation'
import { CustomizationProvider } from '@/components/providers/customization-provider'
import { siteConfig } from '@/lib/site-config'

// Wrapper with necessary providers
const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <CustomizationProvider>
      {component}
    </CustomizationProvider>
  )
}

describe('Navigation', () => {
  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = jest.fn()
    // Mock getBoundingClientRect for section elements
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    }))
    // Mock querySelector
    document.querySelector = jest.fn(() => ({
      getBoundingClientRect: () => ({
        top: 100,
        left: 0,
        bottom: 200,
        right: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      }),
    })) as jest.Mock
  })

  it('renders the logo and name text', () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByText(siteConfig.branding.logoText)).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Project')).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByText("Let's Talk")).toBeInTheDocument()
  })

  it('renders mobile menu button on smaller screens', () => {
    renderWithProviders(<Navigation />)
    // The mobile menu button should be present (though hidden on desktop via CSS)
    const menuButtons = screen.getAllByRole('button')
    expect(menuButtons.length).toBeGreaterThan(0)
  })

  it('scrolls to section when nav item is clicked', () => {
    renderWithProviders(<Navigation />)
    
    const aboutButton = screen.getByText('About')
    fireEvent.click(aboutButton)
    
    // Verify scrollTo was called
    expect(window.scrollTo).toHaveBeenCalled()
  })

  it('renders More dropdown button', () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByText('More')).toBeInTheDocument()
  })
})









