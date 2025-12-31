import { renderHook, act, waitFor } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

// Mock window.matchMedia
const mockMatchMedia = jest.fn()
const mockMediaQueryList = {
  matches: false,
  media: '',
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}

describe('useIsMobile', () => {
  beforeEach(() => {
    mockMatchMedia.mockReturnValue(mockMediaQueryList)
    window.matchMedia = mockMatchMedia
    // Reset innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return false for desktop width', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsMobile())

    // Wait for useEffect to run
    await waitFor(() => {
      expect(result.current).toBe(false)
    })
  })

  it('should return true for mobile width', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const { result } = renderHook(() => useIsMobile())

    // Wait for useEffect to run
    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })

  it('should add event listener on mount', () => {
    renderHook(() => useIsMobile())

    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
  })

  it('should remove event listener on unmount', () => {
    const { unmount } = renderHook(() => useIsMobile())

    const removeListener = mockMediaQueryList.removeEventListener
    unmount()

    expect(removeListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should update when window width changes', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsMobile())

    await waitFor(() => {
      expect(result.current).toBe(false)
    })

    // Simulate window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    // Get the change handler
    const changeHandler = mockMediaQueryList.addEventListener.mock.calls[0][1]

    act(() => {
      changeHandler()
    })

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })
})

