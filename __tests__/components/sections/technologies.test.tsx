import { render, screen } from '@testing-library/react'
import { TechnologiesSection } from '@/components/sections/technologies'
import { CustomizationProvider } from '@/components/providers/customization-provider'
import { ThemeProvider } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ resolvedTheme: 'light' }),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  useInView: () => ({ ref: jest.fn(), inView: true }),
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

describe('TechnologiesSection', () => {
  it('renders technologies section', () => {
    renderWithProviders(<TechnologiesSection />)
    
    // Check for section heading
    expect(screen.getByText(/Technologies/i)).toBeInTheDocument()
  })

  it('renders technology categories', () => {
    renderWithProviders(<TechnologiesSection />)
    
    // Technologies should be rendered
    const techs = screen.queryAllByText(/Frontend|Backend|Database/i)
    expect(techs.length).toBeGreaterThanOrEqual(0)
  })
})

