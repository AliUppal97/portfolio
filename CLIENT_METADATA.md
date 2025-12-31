# Client Metadata Collection

## Overview

The contact form now automatically collects and includes non-sensitive, publicly available information about clients when they submit the form. This information helps you understand your audience better and provides context about the inquiry.

## What Information is Collected

All information collected is **publicly available** and **non-sensitive**. No personal data beyond what the user explicitly provides is collected.

### 📍 Location Information
- **Country** - Based on IP address geolocation
- **Region/State** - Geographic region
- **City** - City location (when available)
- **Timezone** - Client's timezone

**Source:** IP-based geolocation via ipapi.co (free tier, no API key required)

### 💻 Device Information
- **Device Type** - Mobile, Desktop, or Tablet
- **Vendor** - Device manufacturer (e.g., Apple, Samsung)
- **Model** - Device model (when available)

**Source:** Parsed from User-Agent header

### 🖥️ Operating System
- **OS Name** - Windows, macOS, Linux, Android, iOS, iPadOS
- **OS Version** - Version number

**Source:** Parsed from User-Agent header

### 🌐 Browser Information
- **Browser Name** - Chrome, Firefox, Safari, Edge, Opera
- **Browser Version** - Version number

**Source:** Parsed from User-Agent header

### 🌍 Language Preference
- **Language** - Primary language preference (e.g., en-US, es-ES)

**Source:** Accept-Language HTTP header

### 🔗 Referer Information
- **Referer** - The page URL the user came from (if available)

**Source:** HTTP Referer header

### 📡 Network Information
- **IP Address** - Client's IP address (for location lookup only)
- **Timestamp** - When the form was submitted

**Source:** HTTP headers and server timestamp

## Privacy & Security

### ✅ What We Collect
- Only publicly available HTTP headers
- IP-based location (city-level, approximate)
- Browser/device information (standard web analytics)

### ❌ What We DON'T Collect
- No cookies or tracking pixels
- No personal information beyond form fields
- No precise GPS location
- No browsing history
- No stored personal data

### 🔒 Privacy Considerations
- IP addresses are used only for approximate location lookup
- All information is standard web server logs data
- No third-party tracking services
- Information is only included in the email notification
- No data is stored in databases

## How It Works

1. **Client submits form** → Form data is sent to API
2. **Server extracts metadata** → Reads HTTP headers and IP address
3. **Location lookup** → Queries ipapi.co for approximate location
4. **Email sent** → All information included in notification email
5. **No storage** → Information is only in the email, not stored

## Example Email Output

When a client submits the form, you'll receive an email with a section like this:

```
📊 Client Information
─────────────────────
Location: San Francisco, California, United States (America/Los_Angeles)
Device: Mobile • Apple • iPhone
Operating System: iOS 17.2
Browser: Safari 17.2
Language: en-US
IP Address: 192.168.1.1
Referer: https://example.com/page
Submitted: 1/15/2024, 2:30:45 PM
```

## Technical Details

### Files Modified
- `lib/client-metadata.ts` - Metadata extraction utility
- `lib/email.ts` - Email template with metadata display
- `app/api/contact/route.ts` - API route that collects metadata

### Dependencies
- **No additional dependencies** - Uses native Node.js APIs
- **ipapi.co** - Free IP geolocation API (no API key needed)

### Performance
- Location lookup adds ~200-500ms to request time
- Fails gracefully if location service is unavailable
- All other metadata is instant (from HTTP headers)

## Customization

### Disable Location Lookup
If you want to disable IP-based location lookup (for privacy or performance), edit `lib/client-metadata.ts`:

```typescript
// Comment out or remove the location lookup
// const location = await getLocationFromIP(ip)
const location = {}
```

### Add More Information
You can extend the metadata collection by:
1. Adding more HTTP headers in `extractClientMetadata()`
2. Using additional APIs for enrichment
3. Parsing more details from User-Agent

### Customize Email Display
Edit the `generateEmailHTML()` function in `lib/email.ts` to change how metadata is displayed in emails.

## Benefits

1. **Better Context** - Know where inquiries are coming from
2. **Device Insights** - Understand what devices your audience uses
3. **Time Zone Awareness** - Know when to respond based on client's timezone
4. **Language Preference** - Understand preferred communication language
5. **Referral Tracking** - See which pages drive contact form submissions

## Compliance

This metadata collection:
- ✅ Uses only publicly available information
- ✅ No cookies or tracking required
- ✅ GDPR-friendly (no personal data stored)
- ✅ Standard web server log information
- ✅ Transparent (information shown in email)

## Troubleshooting

### Location Not Showing
- IP might be localhost/private (development)
- Location service might be temporarily unavailable
- IP might not be geolocatable

**Solution:** This is normal and expected. Location is optional and the form works without it.

### Device Info Missing
- User-Agent might be blocked or modified
- Uncommon browser/device might not be recognized

**Solution:** Basic information (IP, timestamp) will still be available.

### Slow Form Submission
- Location lookup adds ~200-500ms
- This is normal and acceptable

**Solution:** If this is a concern, you can disable location lookup (see Customization section).

## Questions?

If you have questions about what data is collected or how it's used, check:
- `lib/client-metadata.ts` - See exactly what's collected
- `lib/email.ts` - See how it's displayed
- `app/api/contact/route.ts` - See when it's collected




