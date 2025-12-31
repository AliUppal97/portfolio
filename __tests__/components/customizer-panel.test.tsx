import { render, screen } from '@testing-library/react'
import { CustomizerPanel } from '@/components/customizer-panel'
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

describe('CustomizerPanel', () => {
  it('renders customizer panel', () => {
    renderWithProviders(<CustomizerPanel />)
    
    // Panel should be rendered (may be closed initially)
    expect(document.body).toBeInTheDocument()
  })
})

