import {
  initGA,
  trackPageView,
  trackEvent,
  analytics,
  initScrollTracking,
  initTimeTracking,
  trackWebVitals,
} from '@/lib/analytics'

describe('analytics', () => {
  beforeEach(() => {
    // Reset window object
    delete (window as any).gtag
    delete (window as any).va
    delete (window as any).dataLayer
    
    // Mock console methods
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(console, 'warn').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('initGA', () => {
    it('initializes Google Analytics', () => {
      const measurementId = 'G-TEST123'
      
      // Mock document.createElement
      const createElementSpy = jest.spyOn(document, 'createElement')
      const appendChildSpy = jest.spyOn(document.head, 'appendChild')
      
      initGA(measurementId)
      
      expect(createElementSpy).toHaveBeenCalledWith('script')
      expect(appendChildSpy).toHaveBeenCalled()
      expect(window.dataLayer).toBeDefined()
      expect(window.gtag).toBeDefined()
    })

    it('does nothing in server environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      
      initGA('G-TEST123')
      
      // Should not throw
      expect(true).toBe(true)
      
      global.window = originalWindow
    })
  })

  describe('trackPageView', () => {
    it('tracks page view with gtag', () => {
      window.gtag = jest.fn()
      
      trackPageView({ url: '/test', title: 'Test Page' })
      
      expect(window.gtag).toHaveBeenCalledWith(
        'config',
        process.env.NEXT_PUBLIC_GA_ID,
        expect.objectContaining({
          page_path: '/test',
          page_title: 'Test Page',
        })
      )
    })

    it('tracks page view with Vercel Analytics', () => {
      window.va = jest.fn()
      
      trackPageView({ url: '/test' })
      
      expect(window.va).toHaveBeenCalledWith('pageview', { url: '/test' })
    })

    it('logs in development mode', () => {
      const originalEnv = process.env.NODE_ENV
      // Use type assertion to allow modification for testing
      ;(process.env as { NODE_ENV: string }).NODE_ENV = 'development'
      
      trackPageView({ url: '/test' })
      
      expect(console.log).toHaveBeenCalledWith('📊 Page View:', { url: '/test' })
      
      // Restore original value
      ;(process.env as { NODE_ENV: string }).NODE_ENV = originalEnv
    })
  })

  describe('trackEvent', () => {
    it('tracks event with gtag', () => {
      window.gtag = jest.fn()
      
      trackEvent({
        action: 'click',
        category: 'Button',
        label: 'Submit',
        value: 1,
      })
      
      expect(window.gtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'Button',
        event_label: 'Submit',
        value: 1,
      })
    })

    it('tracks event with Vercel Analytics', () => {
      window.va = jest.fn()
      
      trackEvent({
        action: 'click',
        category: 'Button',
      })
      
      expect(window.va).toHaveBeenCalledWith('event', {
        action: 'click',
        category: 'Button',
      })
    })
  })

  describe('analytics object', () => {
    beforeEach(() => {
      window.gtag = jest.fn()
    })

    it('tracks navigation click', () => {
      analytics.navClick('about')
      
      expect(window.gtag).toHaveBeenCalledWith('event', 'nav_click', {
        event_category: 'Navigation',
        event_label: 'about',
      })
    })

    it('tracks project view', () => {
      analytics.projectView('Test Project')
      
      expect(window.gtag).toHaveBeenCalledWith('event', 'project_view', {
        event_category: 'Projects',
        event_label: 'Test Project',
      })
    })

    it('tracks contact form submit', () => {
      analytics.contactFormSubmit(true)
      
      expect(window.gtag).toHaveBeenCalledWith('event', 'form_submit_success', {
        event_category: 'Contact',
        event_label: 'contact_form',
      })
    })

    it('tracks theme change', () => {
      analytics.themeChange('dark')
      
      expect(window.gtag).toHaveBeenCalledWith('event', 'theme_change', {
        event_category: 'Customization',
        event_label: 'dark',
      })
    })
  })

  describe('initScrollTracking', () => {
    it('returns cleanup function', () => {
      const cleanup = initScrollTracking()
      expect(typeof cleanup).toBe('function')
    })

    it('tracks scroll depth', () => {
      window.gtag = jest.fn()
      
      initScrollTracking()
      
      // Simulate scroll
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        value: 1000,
        writable: true,
      })
      Object.defineProperty(window, 'innerHeight', {
        value: 500,
        writable: true,
      })
      Object.defineProperty(window, 'scrollY', {
        value: 250,
        writable: true,
      })
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'))
      
      // Should track 25% depth
      expect(window.gtag).toHaveBeenCalled()
    })
  })

  describe('initTimeTracking', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('returns cleanup function', () => {
      const cleanup = initTimeTracking()
      expect(typeof cleanup).toBe('function')
    })

    it('tracks time on page', () => {
      window.gtag = jest.fn()
      
      initTimeTracking()
      
      // Fast-forward time
      jest.advanceTimersByTime(31000) // 31 seconds
      
      expect(window.gtag).toHaveBeenCalled()
    })
  })

  describe('trackWebVitals', () => {
    it('tracks web vitals', () => {
      window.gtag = jest.fn()
      
      trackWebVitals({
        name: 'CLS',
        value: 0.1,
        id: 'test-id',
      })
      
      expect(window.gtag).toHaveBeenCalledWith('event', 'CLS', {
        event_category: 'Web Vitals',
        event_label: 'test-id',
        value: 100, // CLS is multiplied by 1000
      })
    })
  })
})

