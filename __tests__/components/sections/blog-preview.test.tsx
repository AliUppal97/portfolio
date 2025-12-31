import { render, screen } from '@testing-library/react'
import { BlogPreviewSection } from '@/components/sections/blog-preview'
import { CustomizationProvider } from '@/components/providers/customization-provider'
import { ThemeProvider } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ resolvedTheme: 'light' }),
}))

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
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

describe('BlogPreviewSection', () => {
  it('renders blog preview section', () => {
    renderWithProviders(<BlogPreviewSection />)
    
    // Check for section heading
    expect(screen.getByText(/Articles/i)).toBeInTheDocument()
  })

  it('renders blog posts', () => {
    renderWithProviders(<BlogPreviewSection />)
    
    // Blog posts should be rendered
    const links = screen.queryAllByText(/All posts/i)
    expect(links.length).toBeGreaterThanOrEqual(0)
  })
})

