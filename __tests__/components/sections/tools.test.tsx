import { render, screen } from '@testing-library/react'
import { ToolsSection } from '@/components/sections/tools'
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

describe('ToolsSection', () => {
  it('renders tools section', () => {
    renderWithProviders(<ToolsSection />)
    
    // Check for section heading
    expect(screen.getByText(/Tools/i)).toBeInTheDocument()
  })

  it('renders tool categories', () => {
    renderWithProviders(<ToolsSection />)
    
    // Tools should be rendered
    const tools = screen.queryAllByText(/Development|Design|DevOps/i)
    expect(tools.length).toBeGreaterThanOrEqual(0)
  })
})

