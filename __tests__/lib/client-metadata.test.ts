import { extractClientMetadata } from '@/lib/client-metadata'

// Mock fetch globally
global.fetch = jest.fn()

describe('client-metadata', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('extracts basic metadata from request', async () => {
    const mockRequest = new Request('http://example.com', {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'x-forwarded-for': '192.168.1.1',
        'referer': 'https://example.com',
        'accept-language': 'en-US,en;q=0.9',
      },
    })

    const metadata = await extractClientMetadata(mockRequest)
    
    expect(metadata).toHaveProperty('ip')
    expect(metadata).toHaveProperty('userAgent')
    expect(metadata).toHaveProperty('timestamp')
    expect(metadata.referer).toBe('https://example.com')
    expect(metadata.language).toBe('en-US')
  })

  it('handles missing headers gracefully', async () => {
    const mockRequest = new Request('http://example.com', {
      headers: {},
    })

    const metadata = await extractClientMetadata(mockRequest)
    
    expect(metadata).toHaveProperty('ip')
    expect(metadata).toHaveProperty('userAgent')
    expect(metadata.userAgent).toBe('Unknown')
  })

  it('parses Chrome user agent correctly', async () => {
    const mockRequest = new Request('http://example.com', {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })

    const metadata = await extractClientMetadata(mockRequest)
    
    expect(metadata.browser?.name).toBe('Chrome')
    expect(metadata.os?.name).toBe('Windows')
  })

  it('parses Firefox user agent correctly', async () => {
    const mockRequest = new Request('http://example.com', {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
      },
    })

    const metadata = await extractClientMetadata(mockRequest)
    
    expect(metadata.browser?.name).toBe('Firefox')
  })

  it('parses mobile device correctly', async () => {
    const mockRequest = new Request('http://example.com', {
      headers: {
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      },
    })

    const metadata = await extractClientMetadata(mockRequest)
    
    expect(metadata.device?.type).toBe('Mobile')
    expect(metadata.device?.vendor).toBe('Apple')
    expect(metadata.device?.model).toBe('iPhone')
    expect(metadata.os?.name).toBe('iOS')
  })

  it('skips location fetch for localhost IP', async () => {
    const mockRequest = new Request('http://example.com', {
      headers: {
        'x-forwarded-for': '127.0.0.1',
      },
    })

    const metadata = await extractClientMetadata(mockRequest)
    
    expect(metadata.location).toEqual({})
  })

  it('handles location fetch errors gracefully', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    
    const mockRequest = new Request('http://example.com', {
      headers: {
        'x-forwarded-for': '8.8.8.8',
      },
    })

    const metadata = await extractClientMetadata(mockRequest)
    
    // Should still return metadata even if location fetch fails
    expect(metadata).toHaveProperty('ip')
    expect(metadata.location).toEqual({})
  })
})

