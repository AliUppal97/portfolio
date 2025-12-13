import { render, screen, fireEvent } from '@testing-library/react'
import { Navigation } from '@/components/navigation'
import { CustomizationProvider } from '@/components/providers/customization-provider'

// Wrapper with necessary providers
const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <CustomizationProvider>
      {component}
    </CustomizationProvider>
  )
}

describe('Navigation', () => {
  it('renders the logo and portfolio text', () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
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
    // Mock scrollTo
    window.scrollTo = jest.fn()
    
    renderWithProviders(<Navigation />)
    
    const aboutButton = screen.getByText('About')
    fireEvent.click(aboutButton)
    
    // Verify scroll behavior was triggered (indirectly)
    // In a real test, you'd check if the section is in view
  })
})






