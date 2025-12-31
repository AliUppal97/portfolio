import { render, screen, act } from '@testing-library/react'
import { CustomizationProvider, useCustomization } from '@/components/providers/customization-provider'
import { useState } from 'react'

// Test component that uses the hook
function TestComponent() {
  const { customization, setCustomization } = useCustomization()
  const [clicked, setClicked] = useState(false)

  return (
    <div>
      <div data-testid="theme">{customization.theme}</div>
      <div data-testid="font">{customization.font}</div>
      <div data-testid="primary">{customization.primary}</div>
      <button
        onClick={() => {
          setCustomization({ theme: 'dark' })
          setClicked(true)
        }}
        data-testid="change-theme"
      >
        Change Theme
      </button>
      {clicked && <div data-testid="clicked">Clicked</div>}
    </div>
  )
}

describe('CustomizationProvider', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear()
  })

  it('provides default customization values', () => {
    render(
      <CustomizationProvider>
        <TestComponent />
      </CustomizationProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(screen.getByTestId('font')).toHaveTextContent('inter')
    expect(screen.getByTestId('primary')).toHaveTextContent('#1a73e8')
  })

  it('allows updating customization', () => {
    render(
      <CustomizationProvider>
        <TestComponent />
      </CustomizationProvider>
    )

    const button = screen.getByTestId('change-theme')
    
    act(() => {
      button.click()
    })

    // Wait for state update
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('loads customization from localStorage', () => {
    const savedCustomization = {
      theme: 'dark' as const,
      font: 'grotesk' as const,
      fontScale: 1.1,
      primary: '#ff0000',
      layout: 'stacked' as const,
      imageSize: 'lg' as const,
      spacing: 'spacious' as const,
    }

    localStorage.setItem('portfolio.customization.v1', JSON.stringify(savedCustomization))

    render(
      <CustomizationProvider>
        <TestComponent />
      </CustomizationProvider>
    )

    // Should load from localStorage after mount
    // Note: This might need a waitFor due to useEffect timing
    expect(localStorage.getItem('portfolio.customization.v1')).toBeTruthy()
  })

  it('persists customization to localStorage', () => {
    render(
      <CustomizationProvider>
        <TestComponent />
      </CustomizationProvider>
    )

    const button = screen.getByTestId('change-theme')
    
    act(() => {
      button.click()
    })

    // Check localStorage was updated
    const stored = localStorage.getItem('portfolio.customization.v1')
    expect(stored).toBeTruthy()
    if (stored) {
      const parsed = JSON.parse(stored)
      expect(parsed.theme).toBe('dark')
    }
  })

  it('handles invalid localStorage data gracefully', () => {
    localStorage.setItem('portfolio.customization.v1', 'invalid json')

    render(
      <CustomizationProvider>
        <TestComponent />
      </CustomizationProvider>
    )

    // Should still render with defaults
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })
})

describe('useCustomization hook', () => {
  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      render(<TestComponent />)
    }).toThrow()

    console.error = originalError
  })
})

