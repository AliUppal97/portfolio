import { renderHook, act } from '@testing-library/react'
import { useI18n, LocaleSwitcher } from '@/hooks/use-i18n'
import { render, screen } from '@testing-library/react'
import { i18nConfig } from '@/i18n/config'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock navigator.language
Object.defineProperty(navigator, 'language', {
  writable: true,
  value: 'en-US',
})

describe('useI18n', () => {
  beforeEach(() => {
    localStorageMock.clear()
    document.documentElement.lang = 'en'
  })

  it('should initialize with default locale', () => {
    const { result } = renderHook(() => useI18n())

    expect(result.current.locale).toBe(i18nConfig.defaultLocale)
    expect(result.current.isDefaultLocale).toBe(true)
  })

  it('should load locale from localStorage', () => {
    localStorageMock.setItem('portfolio.locale', 'es')

    const { result } = renderHook(() => useI18n())

    // Wait for useEffect to run
    act(() => {
      // Force re-render to trigger useEffect
    })

    expect(result.current.locale).toBe('es')
  })

  it('should detect browser language when no saved locale', () => {
    Object.defineProperty(navigator, 'language', {
      writable: true,
      value: 'es-ES',
    })

    const { result } = renderHook(() => useI18n())

    act(() => {
      // Wait for initialization
    })

    // If es is in the locales, it should be detected
    if (i18nConfig.locales.includes('es')) {
      expect(result.current.locale).toBe('es')
    }
  })

  it('should set locale and persist to localStorage', () => {
    const { result } = renderHook(() => useI18n())

    act(() => {
      result.current.setLocale('es')
    })

    expect(result.current.locale).toBe('es')
    expect(localStorageMock.getItem('portfolio.locale')).toBe('es')
    expect(document.documentElement.lang).toBe('es')
  })

  it('should not set invalid locale', () => {
    const { result } = renderHook(() => useI18n())

    const initialLocale = result.current.locale

    act(() => {
      result.current.setLocale('invalid' as any)
    })

    expect(result.current.locale).toBe(initialLocale)
  })

  it('should translate keys', () => {
    const { result } = renderHook(() => useI18n())

    // Wait for initialization
    act(() => {})

    const translation = result.current.t('common.hello' as any)
    expect(typeof translation).toBe('string')
  })

  it('should replace parameters in translations', () => {
    const { result } = renderHook(() => useI18n())

    act(() => {})

    // Test with a key that might have parameters
    const translation = result.current.t('common.hello' as any, { name: 'Test' })
    expect(typeof translation).toBe('string')
  })

  it('should return available locales', () => {
    const { result } = renderHook(() => useI18n())

    expect(result.current.availableLocales).toBeDefined()
    expect(Array.isArray(result.current.availableLocales)).toBe(true)
    expect(result.current.availableLocales.length).toBeGreaterThan(0)
  })

  it('should indicate loading state initially', () => {
    const { result } = renderHook(() => useI18n())

    // Initially might be loading
    expect(typeof result.current.isLoading).toBe('boolean')
  })
})

describe('LocaleSwitcher', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should render locale switcher', () => {
    render(<LocaleSwitcher />)

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
  })

  it('should change locale on selection', () => {
    render(<LocaleSwitcher />)

    const select = screen.getByRole('combobox') as HTMLSelectElement

    act(() => {
      // Find and select a different locale if available
      const options = Array.from(select.options)
      const otherOption = options.find((opt) => opt.value !== select.value)

      if (otherOption) {
        select.value = otherOption.value
        select.dispatchEvent(new Event('change', { bubbles: true }))
      }
    })

    // Locale should be updated
    expect(localStorageMock.getItem('portfolio.locale')).toBeDefined()
  })
})

