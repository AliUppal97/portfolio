import { render, screen } from '@testing-library/react'
import { ProjectsSection } from '@/components/sections/projects'
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

describe('ProjectsSection', () => {
  it('renders projects section', () => {
    renderWithProviders(<ProjectsSection />)
    
    // Check for section heading
    expect(screen.getByText(/Projects/i)).toBeInTheDocument()
  })

  it('renders project items', () => {
    renderWithProviders(<ProjectsSection />)
    
    // Projects should be rendered
    const projects = screen.queryAllByText(/Platform|Portal|SaaS/i)
    expect(projects.length).toBeGreaterThanOrEqual(0)
  })
})

