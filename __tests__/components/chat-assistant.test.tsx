import { render, screen } from '@testing-library/react'
import { ChatAssistant } from '@/components/chat-assistant'
import { CustomizationProvider } from '@/components/providers/customization-provider'
import { ThemeProvider } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ resolvedTheme: 'light', theme: 'light' }),
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

describe('ChatAssistant', () => {
  it('renders chat assistant button', () => {
    renderWithProviders(<ChatAssistant />)
    
    // Chat button should be rendered
    const button = screen.getByRole('button', { name: /chat|assistant/i })
    expect(button).toBeInTheDocument()
  })
})

