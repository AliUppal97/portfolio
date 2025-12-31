import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactSection } from '@/components/sections/contact'
import { CustomizationProvider } from '@/components/providers/customization-provider'
import { ThemeProvider } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ resolvedTheme: 'light', theme: 'light' }),
}))

// Mock fetch
global.fetch = jest.fn()

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light">
      <CustomizationProvider>
        {component}
      </CustomizationProvider>
    </ThemeProvider>
  )
}

describe('ContactSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders contact section', () => {
    renderWithProviders(<ContactSection />)
    
    // Check for section heading - the actual heading is "Let's Build Something Amazing"
    expect(screen.getByText(/Let's Build Something Amazing/i)).toBeInTheDocument()
  })

  it('renders contact form', () => {
    renderWithProviders(<ContactSection />)
    
    // Form fields should be rendered
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    // The label is "Project Details" not "Message"
    expect(screen.getByLabelText(/Project Details/i)).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, message: 'Success' }),
    })

    renderWithProviders(<ContactSection />)
    
    await user.type(screen.getByLabelText(/Name/i), 'Test User')
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
    // The label is "Project Details" not "Message"
    await user.type(screen.getByLabelText(/Project Details/i), 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /Send/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object))
    })
  })
})

