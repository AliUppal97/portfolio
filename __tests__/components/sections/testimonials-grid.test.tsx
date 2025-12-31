import { render, screen } from '@testing-library/react'
import { TestimonialsGridSection } from '@/components/sections/testimonials-grid'
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

describe('TestimonialsGridSection', () => {
  it('renders testimonials grid section', () => {
    renderWithProviders(<TestimonialsGridSection />)

    expect(screen.getByText('What People Say')).toBeInTheDocument()
  })

  it('renders testimonial cards in grid', () => {
    renderWithProviders(<TestimonialsGridSection />)

    const articles = screen.getAllByRole('article')
    expect(articles.length).toBeGreaterThan(0)
  })

  it('renders testimonial content', () => {
    const { container } = renderWithProviders(<TestimonialsGridSection />)

    // Check for testimonial section by id
    const section = container.querySelector('#testimonials')
    expect(section).toBeInTheDocument()
  })

  it('renders grid layout', () => {
    const { container } = renderWithProviders(<TestimonialsGridSection />)

    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
  })
})

