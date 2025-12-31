import { renderHook, act } from '@testing-library/react'
import { useToast, toast } from '@/hooks/use-toast'

// Mock setTimeout and clearTimeout
jest.useFakeTimers()

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
  })

  it('should initialize with empty toasts', () => {
    const { result } = renderHook(() => useToast())

    expect(result.current.toasts).toEqual([])
  })

  it('should add a toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'This is a test',
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Test Toast')
    expect(result.current.toasts[0].description).toBe('This is a test')
    expect(result.current.toasts[0].open).toBe(true)
  })

  it('should dismiss a toast by id', () => {
    const { result } = renderHook(() => useToast())

    let toastId: string

    act(() => {
      const toastResult = result.current.toast({
        title: 'Test Toast',
      })
      toastId = toastResult.id
    })

    expect(result.current.toasts).toHaveLength(1)

    act(() => {
      result.current.dismiss(toastId!)
    })

    expect(result.current.toasts[0].open).toBe(false)
  })

  it('should dismiss all toasts when no id provided', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: 'Toast 1' })
      result.current.toast({ title: 'Toast 2' })
    })

    // TOAST_LIMIT is 1, so only the last toast should be present
    expect(result.current.toasts.length).toBeGreaterThanOrEqual(1)

    act(() => {
      result.current.dismiss()
    })

    result.current.toasts.forEach((toast) => {
      expect(toast.open).toBe(false)
    })
  })

  it('should update a toast', () => {
    const { result } = renderHook(() => useToast())

    let toastId: string
    let updateFn: (props: any) => void

    act(() => {
      const toastResult = result.current.toast({
        title: 'Original Title',
      })
      toastId = toastResult.id
      updateFn = toastResult.update
    })

    expect(result.current.toasts[0].title).toBe('Original Title')

    act(() => {
      updateFn!({
        title: 'Updated Title',
      })
    })

    expect(result.current.toasts[0].title).toBe('Updated Title')
  })

  it('should limit toasts to TOAST_LIMIT', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: 'Toast 1' })
      result.current.toast({ title: 'Toast 2' })
      result.current.toast({ title: 'Toast 3' })
    })

    // TOAST_LIMIT is 1, so only the last toast should be present
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Toast 3')
  })

  it('should auto-dismiss toast when open changes to false', () => {
    const { result } = renderHook(() => useToast())

    let toastId: string

    act(() => {
      const toastResult = result.current.toast({
        title: 'Test Toast',
      })
      toastId = toastResult.id
    })

    expect(result.current.toasts).toHaveLength(1)

    act(() => {
      // Simulate onOpenChange(false)
      const toast = result.current.toasts[0]
      if (toast.onOpenChange) {
        toast.onOpenChange(false)
      }
    })

    expect(result.current.toasts[0].open).toBe(false)
  })
})

describe('toast function', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  it('should return dismiss and update functions', () => {
    const result = toast({
      title: 'Test',
    })

    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('dismiss')
    expect(result).toHaveProperty('update')
    expect(typeof result.dismiss).toBe('function')
    expect(typeof result.update).toBe('function')
  })

  it('should generate unique ids', () => {
    const toast1 = toast({ title: 'Toast 1' })
    const toast2 = toast({ title: 'Toast 2' })

    expect(toast1.id).not.toBe(toast2.id)
  })
})

