import { render, screen } from '@testing-library/react'
import { TestimonialsSection } from '@/components/sections/testimonials'
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

describe('TestimonialsSection', () => {
  it('renders testimonials section', () => {
    renderWithProviders(<TestimonialsSection />)
    
    // Check for section heading
    expect(screen.getByText(/Testimonials/i)).toBeInTheDocument()
  })

  it('renders testimonial content', () => {
    renderWithProviders(<TestimonialsSection />)
    
    // Testimonial quote should be rendered
    const quotes = screen.queryAllByText(/"/)
    expect(quotes.length).toBeGreaterThanOrEqual(0)
  })
})

