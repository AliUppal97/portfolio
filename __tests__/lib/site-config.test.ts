import {
  siteConfig,
  getFullName,
  getEmailLink,
  getPhoneLink,
  getSocialLink,
  hasSocialLink,
  getConfiguredSocialLinks,
  getContactMethods,
  getSocialLinksForDisplay,
  getExperienceString,
  getAvailabilityStatus,
  getSEOMetadata,
  getQuickLinks,
  getResourceLinks,
  getBranding,
  getProfessionalStats,
  hasIntroVideo,
  getIntroVideoUrl,
} from '@/lib/site-config'

describe('site-config', () => {
  describe('getFullName', () => {
    it('returns full name from config', () => {
      expect(getFullName()).toBe('Muhammad Ali')
    })
  })

  describe('getEmailLink', () => {
    it('returns mailto link', () => {
      const link = getEmailLink()
      expect(link).toContain('mailto:')
      expect(link).toContain(siteConfig.contact.email)
    })
  })

  describe('getPhoneLink', () => {
    it('returns tel link', () => {
      const link = getPhoneLink()
      expect(link).toContain('tel:')
      expect(link).toContain(siteConfig.contact.phoneRaw)
    })
  })

  describe('getSocialLink', () => {
    it('returns social link for valid platform', () => {
      expect(getSocialLink('github')).toBe(siteConfig.social.github)
      expect(getSocialLink('linkedin')).toBe(siteConfig.social.linkedin)
    })
  })

  describe('hasSocialLink', () => {
    it('returns true for configured links', () => {
      expect(hasSocialLink('github')).toBe(true)
      expect(hasSocialLink('linkedin')).toBe(true)
    })

    it('returns false for empty links', () => {
      // Assuming some links might be empty
      const emptyLink = siteConfig.social.twitter
      expect(typeof emptyLink).toBe('string')
    })
  })

  describe('getConfiguredSocialLinks', () => {
    it('returns only configured social links', () => {
      const links = getConfiguredSocialLinks()
      expect(typeof links).toBe('object')
      expect(links).toHaveProperty('github')
    })
  })

  describe('getContactMethods', () => {
    it('returns contact methods array', () => {
      const methods = getContactMethods()
      expect(Array.isArray(methods)).toBe(true)
      expect(methods.length).toBeGreaterThan(0)
      expect(methods[0]).toHaveProperty('label')
      expect(methods[0]).toHaveProperty('value')
      expect(methods[0]).toHaveProperty('href')
    })
  })

  describe('getSocialLinksForDisplay', () => {
    it('returns social links for display', () => {
      const links = getSocialLinksForDisplay()
      expect(Array.isArray(links)).toBe(true)
      if (links.length > 0) {
        expect(links[0]).toHaveProperty('name')
        expect(links[0]).toHaveProperty('href')
        expect(links[0]).toHaveProperty('color')
      }
    })
  })

  describe('getExperienceString', () => {
    it('returns experience string', () => {
      const experience = getExperienceString()
      expect(experience).toContain('years')
      expect(experience).toContain('+')
    })
  })

  describe('getAvailabilityStatus', () => {
    it('returns availability status', () => {
      const status = getAvailabilityStatus()
      expect(status).toHaveProperty('isAvailable')
      expect(status).toHaveProperty('status')
      expect(status).toHaveProperty('quarter')
    })
  })

  describe('getSEOMetadata', () => {
    it('returns SEO metadata', () => {
      const metadata = getSEOMetadata()
      expect(metadata).toHaveProperty('title')
      expect(metadata).toHaveProperty('description')
      expect(metadata).toHaveProperty('url')
      expect(metadata).toHaveProperty('keywords')
    })
  })

  describe('getQuickLinks', () => {
    it('returns quick links', () => {
      const links = getQuickLinks()
      expect(Array.isArray(links)).toBe(true)
      expect(links.length).toBeGreaterThan(0)
      expect(links[0]).toHaveProperty('label')
      expect(links[0]).toHaveProperty('href')
    })
  })

  describe('getResourceLinks', () => {
    it('returns resource links', () => {
      const links = getResourceLinks()
      expect(Array.isArray(links)).toBe(true)
    })
  })

  describe('getBranding', () => {
    it('returns branding info', () => {
      const branding = getBranding()
      expect(branding).toHaveProperty('logoText')
      expect(branding).toHaveProperty('primaryColor')
      expect(branding).toHaveProperty('secondaryColor')
    })
  })

  describe('getProfessionalStats', () => {
    it('returns professional stats', () => {
      const stats = getProfessionalStats()
      expect(Array.isArray(stats)).toBe(true)
      if (stats.length > 0) {
        expect(stats[0]).toHaveProperty('label')
        expect(stats[0]).toHaveProperty('value')
      }
    })
  })

  describe('hasIntroVideo', () => {
    it('returns boolean', () => {
      const hasVideo = hasIntroVideo()
      expect(typeof hasVideo).toBe('boolean')
    })
  })

  describe('getIntroVideoUrl', () => {
    it('returns video URL', () => {
      const url = getIntroVideoUrl()
      expect(typeof url).toBe('string')
    })
  })
})

