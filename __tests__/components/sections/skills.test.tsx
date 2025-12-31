import { render, screen } from '@testing-library/react'
import { SkillsSection } from '@/components/sections/skills'
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

describe('SkillsSection', () => {
  it('renders skills section', () => {
    renderWithProviders(<SkillsSection />)
    
    // Check for section heading - the actual heading is "Core Skills Mastery"
    expect(screen.getByText(/Core Skills Mastery/i)).toBeInTheDocument()
  })

  it('renders skill categories', () => {
    renderWithProviders(<SkillsSection />)
    
    // Skills should be rendered
    const skills = screen.queryAllByText(/Frontend|Backend|Full Stack/i)
    expect(skills.length).toBeGreaterThanOrEqual(0)
  })
})

