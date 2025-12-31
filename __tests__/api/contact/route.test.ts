import { POST, GET } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'
import * as emailModule from '@/lib/email'
import * as metadataModule from '@/lib/client-metadata'

// Mock dependencies
jest.mock('@/lib/email')
jest.mock('@/lib/client-metadata')

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset environment variables
    delete process.env.RESEND_API_KEY
    delete process.env.CONTACT_EMAIL
  })

  describe('POST', () => {
    it('returns 400 for invalid data', async () => {
      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'A', // Too short
          email: 'invalid-email',
          message: 'Short', // Too short
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.ok).toBe(false)
      expect(data.error).toBeDefined()
    })

    it('returns 429 for rate limit exceeded', async () => {
      // Make multiple requests to trigger rate limit
      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.1.1',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a valid message that is long enough',
        }),
      })

      // Mock email to succeed
      jest.spyOn(emailModule, 'sendEmailWithResend').mockResolvedValue({
        success: true,
        messageId: 'test-id',
      })
      jest.spyOn(metadataModule, 'extractClientMetadata').mockResolvedValue({
        ip: '192.168.1.1',
        userAgent: 'test',
        timestamp: new Date().toISOString(),
      })

      // Make 6 requests (limit is 5)
      for (let i = 0; i < 6; i++) {
        await POST(request)
      }

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.ok).toBe(false)
      expect(data.error).toContain('Too many requests')
    })

    it('returns 500 when email sending fails', async () => {
      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.1.2',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a valid message that is long enough',
        }),
      })

      jest.spyOn(emailModule, 'sendEmailWithResend').mockResolvedValue({
        success: false,
        error: 'Email service unavailable',
      })
      jest.spyOn(metadataModule, 'extractClientMetadata').mockResolvedValue({
        ip: '192.168.1.2',
        userAgent: 'test',
        timestamp: new Date().toISOString(),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.ok).toBe(false)
      expect(data.error).toBeDefined()
    })

    it('returns 200 for valid request', async () => {
      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.1.3',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a valid message that is long enough',
          company: 'Test Company',
          website: 'https://test.com',
        }),
      })

      jest.spyOn(emailModule, 'sendEmailWithResend').mockResolvedValue({
        success: true,
        messageId: 'test-message-id',
      })
      jest.spyOn(emailModule, 'sendAutoReply').mockResolvedValue({
        success: true,
        messageId: 'auto-reply-id',
      })
      jest.spyOn(metadataModule, 'extractClientMetadata').mockResolvedValue({
        ip: '192.168.1.3',
        userAgent: 'test',
        timestamp: new Date().toISOString(),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ok).toBe(true)
      expect(data.message).toBeDefined()
      expect(data.emailSent).toBe(true)
    })

    it('rejects honeypot field', async () => {
      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.1.4',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a valid message that is long enough',
          honeypot: 'spam', // Should be rejected
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.ok).toBe(false)
    })
  })

  describe('GET', () => {
    it('returns diagnostics', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.status).toBe('ok')
      expect(data.email).toBeDefined()
      expect(data.email.configured).toBeDefined()
    })

    it('reports missing API key', async () => {
      delete process.env.RESEND_API_KEY
      
      const response = await GET()
      const data = await response.json()

      expect(data.email.issues).toContain(
        'RESEND_API_KEY environment variable is missing'
      )
    })

    it('reports missing contact email', async () => {
      delete process.env.CONTACT_EMAIL
      
      const response = await GET()
      const data = await response.json()

      expect(data.email.issues.length).toBeGreaterThan(0)
    })
  })
})

