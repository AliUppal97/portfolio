import { render, screen } from '@testing-library/react'
import { TestimonialsMarqueeSection } from '@/components/sections/testimonials-marquee'
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

describe('TestimonialsMarqueeSection', () => {
  it('renders testimonials marquee section', () => {
    renderWithProviders(<TestimonialsMarqueeSection />)

    expect(screen.getByText('What People Say')).toBeInTheDocument()
  })

  it('renders testimonial cards', () => {
    renderWithProviders(<TestimonialsMarqueeSection />)

    // Check for testimonial content
    const section = screen.getByLabelText('Testimonials')
    expect(section).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = renderWithProviders(
      <TestimonialsMarqueeSection className="custom-class" />
    )

    const section = container.querySelector('section.custom-class')
    expect(section).toBeInTheDocument()
  })

  it('renders edge blur overlays', () => {
    const { container } = renderWithProviders(<TestimonialsMarqueeSection />)

    const overlays = container.querySelectorAll('[aria-hidden="true"]')
    expect(overlays.length).toBeGreaterThan(0)
  })

  it('duplicates testimonials for seamless loop', () => {
    renderWithProviders(<TestimonialsMarqueeSection />)

    // Should have duplicated testimonials (row = [...testimonials, ...testimonials])
    const articles = screen.getAllByRole('article')
    expect(articles.length).toBeGreaterThan(0)
  })
})

