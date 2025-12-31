import { sendEmailWithResend, sendAutoReply } from '@/lib/email'

// Mock fetch globally
global.fetch = jest.fn()

describe('email utilities', () => {
  const mockPayload = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message',
    company: 'Test Company',
    website: 'https://test.com',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset environment variables
    delete process.env.RESEND_API_KEY
    delete process.env.CONTACT_EMAIL
  })

  describe('sendEmailWithResend', () => {
    it('returns error when RESEND_API_KEY is not configured', async () => {
      const result = await sendEmailWithResend(mockPayload)
      expect(result.success).toBe(false)
      expect(result.error).toContain('RESEND_API_KEY')
    })

    it('returns error when CONTACT_EMAIL is not configured', async () => {
      process.env.RESEND_API_KEY = 'test_key'
      process.env.CONTACT_EMAIL = 'hello@example.com'
      
      const result = await sendEmailWithResend(mockPayload)
      expect(result.success).toBe(false)
      expect(result.error).toContain('CONTACT_EMAIL')
    })

    it('sends email successfully when configured', async () => {
      process.env.RESEND_API_KEY = 'test_key'
      process.env.CONTACT_EMAIL = 'contact@example.com'
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'test-message-id' }),
      })

      const result = await sendEmailWithResend(mockPayload)
      expect(result.success).toBe(true)
      expect(result.messageId).toBe('test-message-id')
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.resend.com/emails',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test_key',
          }),
        })
      )
    })

    it('handles API errors', async () => {
      process.env.RESEND_API_KEY = 'test_key'
      process.env.CONTACT_EMAIL = 'contact@example.com'
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: { message: 'Invalid API key' } }),
      })

      const result = await sendEmailWithResend(mockPayload)
      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('handles network errors', async () => {
      process.env.RESEND_API_KEY = 'test_key'
      process.env.CONTACT_EMAIL = 'contact@example.com'
      
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const result = await sendEmailWithResend(mockPayload)
      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })

  describe('sendAutoReply', () => {
    it('returns error when RESEND_API_KEY is not configured', async () => {
      const result = await sendAutoReply(mockPayload)
      expect(result.success).toBe(false)
      expect(result.error).toContain('RESEND_API_KEY')
    })

    it('sends auto-reply successfully when configured', async () => {
      process.env.RESEND_API_KEY = 'test_key'
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'auto-reply-id' }),
      })

      const result = await sendAutoReply(mockPayload)
      expect(result.success).toBe(true)
      expect(result.messageId).toBe('auto-reply-id')
    })

    it('handles auto-reply errors', async () => {
      process.env.RESEND_API_KEY = 'test_key'
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: { message: 'Invalid request' } }),
      })

      const result = await sendAutoReply(mockPayload)
      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })
})

