// Client Metadata Extraction
// Extracts non-sensitive, publicly available information about the client

export interface ClientMetadata {
  ip: string
  userAgent: string
  browser?: {
    name: string
    version: string
  }
  os?: {
    name: string
    version: string
  }
  device?: {
    type: string
    vendor?: string
    model?: string
  }
  location?: {
    country?: string
    region?: string
    city?: string
    timezone?: string
  }
  referer?: string
  timestamp: string
  language?: string
}

// Simple User-Agent parser (basic parsing without external dependencies)
function parseUserAgent(userAgent: string): {
  browser?: { name: string; version: string }
  os?: { name: string; version: string }
  device?: { type: string; vendor?: string; model?: string }
} {
  const result: {
    browser?: { name: string; version: string }
    os?: { name: string; version: string }
    device?: { type: string; vendor?: string; model?: string }
  } = {}

  // Browser detection
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    const match = userAgent.match(/Chrome\/([\d.]+)/)
    result.browser = { name: 'Chrome', version: match ? match[1] : 'Unknown' }
  } else if (userAgent.includes('Firefox')) {
    const match = userAgent.match(/Firefox\/([\d.]+)/)
    result.browser = { name: 'Firefox', version: match ? match[1] : 'Unknown' }
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    const match = userAgent.match(/Version\/([\d.]+).*Safari/)
    result.browser = { name: 'Safari', version: match ? match[1] : 'Unknown' }
  } else if (userAgent.includes('Edg')) {
    const match = userAgent.match(/Edg\/([\d.]+)/)
    result.browser = { name: 'Edge', version: match ? match[1] : 'Unknown' }
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    const match = userAgent.match(/(?:Opera|OPR)\/([\d.]+)/)
    result.browser = { name: 'Opera', version: match ? match[1] : 'Unknown' }
  }

  // OS detection
  if (userAgent.includes('Windows')) {
    if (userAgent.includes('Windows NT 10.0')) {
      result.os = { name: 'Windows', version: '10/11' }
    } else if (userAgent.includes('Windows NT 6.3')) {
      result.os = { name: 'Windows', version: '8.1' }
    } else if (userAgent.includes('Windows NT 6.2')) {
      result.os = { name: 'Windows', version: '8' }
    } else {
      result.os = { name: 'Windows', version: 'Unknown' }
    }
  } else if (userAgent.includes('Mac OS X')) {
    const match = userAgent.match(/Mac OS X ([_\d]+)/)
    result.os = { name: 'macOS', version: match ? match[1].replace(/_/g, '.') : 'Unknown' }
  } else if (userAgent.includes('Linux')) {
    result.os = { name: 'Linux', version: 'Unknown' }
  } else if (userAgent.includes('Android')) {
    const match = userAgent.match(/Android ([\d.]+)/)
    result.os = { name: 'Android', version: match ? match[1] : 'Unknown' }
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    const match = userAgent.match(/OS ([\d_]+)/)
    result.os = { name: userAgent.includes('iPad') ? 'iPadOS' : 'iOS', version: match ? match[1].replace(/_/g, '.') : 'Unknown' }
  }

  // Device detection
  if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    result.device = { type: 'Mobile' }
    
    if (userAgent.includes('iPhone')) {
      result.device.vendor = 'Apple'
      result.device.model = 'iPhone'
    } else if (userAgent.includes('iPad')) {
      result.device.vendor = 'Apple'
      result.device.model = 'iPad'
    } else if (userAgent.includes('Android')) {
      result.device.vendor = 'Android'
      // Try to extract device model
      const match = userAgent.match(/\(Linux; Android [^;]+; ([^)]+)\)/)
      if (match) {
        result.device.model = match[1]
      }
    }
  } else {
    result.device = { type: 'Desktop' }
  }

  return result
}

// Get location from IP (using free IP geolocation API)
async function getLocationFromIP(ip: string): Promise<{
  country?: string
  region?: string
  city?: string
  timezone?: string
}> {
  // Skip if IP is localhost or private
  if (ip === 'unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return {}
  }

  try {
    // Using ipapi.co free tier (no API key required for basic info)
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'Portfolio-Contact-Form/1.0'
      }
    })

    if (response.ok) {
      const data = await response.json()
      return {
        country: data.country_name,
        region: data.region,
        city: data.city,
        timezone: data.timezone,
      }
    }
  } catch (error) {
    // Silently fail - location is optional
    console.warn('Failed to fetch location:', error)
  }

  return {}
}

export async function extractClientMetadata(req: Request): Promise<ClientMetadata> {
  // Get IP address
  const forwarded = req.headers.get("x-forwarded-for")
  const realIp = req.headers.get("x-real-ip")
  const ip = forwarded ? forwarded.split(",")[0].trim() : (realIp || "unknown")

  // Get User-Agent
  const userAgent = req.headers.get("user-agent") || "Unknown"

  // Get Referer
  const referer = req.headers.get("referer") || undefined

  // Get Accept-Language
  const acceptLanguage = req.headers.get("accept-language") || undefined
  const language = acceptLanguage ? acceptLanguage.split(",")[0].split(";")[0].trim() : undefined

  // Parse User-Agent
  const parsedUA = parseUserAgent(userAgent)

  // Get location (async, but we'll await it)
  const location = await getLocationFromIP(ip)

  return {
    ip: ip === "unknown" ? "Not available" : ip,
    userAgent,
    browser: parsedUA.browser,
    os: parsedUA.os,
    device: parsedUA.device,
    location,
    referer,
    timestamp: new Date().toISOString(),
    language,
  }
}

