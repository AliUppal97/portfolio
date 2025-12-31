import { render, screen, fireEvent } from '@testing-library/react'
import { ScrollToTop } from '@/components/scroll-to-top'

// Mock window.scrollTo
window.scrollTo = jest.fn()

describe('ScrollToTop', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock pageYOffset
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    })
  })

  it('renders scroll to top button', () => {
    render(<ScrollToTop />)
    
    const button = screen.getByLabelText(/Scroll to top/i)
    expect(button).toBeInTheDocument()
  })

  it('scrolls to top when clicked', () => {
    render(<ScrollToTop />)
    
    const button = screen.getByLabelText(/Scroll to top/i)
    fireEvent.click(button)
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('shows button when scrolled down', () => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 600,
    })
    
    render(<ScrollToTop />)
    
    const button = screen.getByLabelText(/Scroll to top/i)
    expect(button).toBeInTheDocument()
  })
})

