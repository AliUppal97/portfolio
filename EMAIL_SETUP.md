# Email Setup Guide

This guide will help you configure email functionality for your portfolio contact form.

## Quick Setup Checklist

- [ ] Create Resend account at [resend.com](https://resend.com)
- [ ] Get your API key from Resend dashboard
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add your `RESEND_API_KEY` to `.env.local`
- [ ] Verify `CONTACT_EMAIL=aliuppal9797@gmail.com` is correct (check for typos!)
- [ ] Restart your dev server
- [ ] Test email sending

## Step-by-Step Setup

### 1. Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log into Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Copy the API key (starts with `re_`)

### 3. Configure Environment Variables

**Option 1: Copy the example file (Recommended)**
```bash
# Copy the example file
cp .env.example .env.local

# Then edit .env.local and add your actual Resend API key
```

**Option 2: Create manually**

Create a `.env.local` file in your project root with:

```env
# Required: Your Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Required: Email address where contact form submissions will be sent
# ⚠️  IMPORTANT: Make sure this email is correct!
CONTACT_EMAIL=aliuppal9797@gmail.com
```

**⚠️  Note:** I noticed your email has `gmail.com` - please verify if this is correct or if it should be `gmail.com`. Make sure the email address is accurate!

**Important Notes:**
- Never commit `.env.local` to git (it's already in `.gitignore`)
- For production (Vercel, etc.), add these variables in your hosting platform's environment variables settings
- The `CONTACT_EMAIL` should be a real email address you can access

### 4. Verify Configuration

You can check if your email is configured correctly by visiting:

```
http://localhost:3000/api/contact
```

This will show you:
- Whether `RESEND_API_KEY` is configured
- Whether `CONTACT_EMAIL` is configured
- Any configuration issues

### 5. Test Email Sending

1. Start your development server: `pnpm dev`
2. Navigate to the contact form on your site
3. Fill out and submit the form
4. Check your email inbox (and spam folder)
5. Check the server console for email sending logs

## Troubleshooting

### No Emails Received

#### Check 1: Environment Variables
```bash
# In your terminal, check if variables are set:
echo $RESEND_API_KEY
echo $CONTACT_EMAIL
```

If nothing shows, your `.env.local` file might not be loaded. Make sure:
- File is named exactly `.env.local` (not `.env` or `.env.local.txt`)
- File is in the project root directory
- You've restarted your dev server after adding variables

#### Check 2: API Configuration
Visit `http://localhost:3000/api/contact` to see diagnostic information.

#### Check 3: Server Logs
Check your terminal/console where you're running `pnpm dev`. Look for:
- ✅ `Email sent successfully:` - Email was sent
- ❌ `Email sending failed:` - There was an error
- ⚠️ `RESEND_API_KEY not configured` - Missing API key

#### Check 4: Resend Dashboard
1. Log into [resend.com](https://resend.com)
2. Go to **Emails** section
3. Check if emails appear there (even if they don't reach your inbox)
4. Check for any error messages

### Common Issues

#### Issue: "RESEND_API_KEY not configured"
**Solution:** 
- Make sure `.env.local` exists in project root
- Add `RESEND_API_KEY=re_xxxxx` to `.env.local`
- Restart your dev server

#### Issue: "CONTACT_EMAIL is using default value"
**Solution:**
- Add `CONTACT_EMAIL=your-real-email@example.com` to `.env.local`
- Make sure it's not `hello@example.com`
- Restart your dev server

#### Issue: "Invalid API key" or "Unauthorized"
**Solution:**
- Verify your API key is correct (starts with `re_`)
- Make sure there are no extra spaces or quotes
- Regenerate API key in Resend dashboard if needed

#### Issue: Emails sent but not received
**Possible causes:**
- Check spam/junk folder
- Verify `CONTACT_EMAIL` is correct
- Check Resend dashboard for delivery status
- The `onboarding@resend.dev` sender might be blocked by some email providers

#### Issue: "Domain not verified" (Production)
**Solution:**
- For production, you need to verify your domain in Resend
- Go to Resend dashboard → Domains
- Add your domain and follow DNS setup instructions
- Update the `from` address in `lib/email.ts` to use your verified domain

## Production Setup

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `RESEND_API_KEY` = `re_xxxxx`
   - `CONTACT_EMAIL` = `your-email@example.com`
4. Redeploy your application

### For Other Platforms

Add the environment variables in your hosting platform's settings:
- Netlify: Site settings → Environment variables
- Railway: Variables tab
- Render: Environment section

## Using Your Own Domain (Advanced)

For production, you should use your own verified domain instead of `onboarding@resend.dev`:

1. **Verify Domain in Resend:**
   - Go to Resend dashboard → Domains
   - Add your domain (e.g., `yourportfolio.com`)
   - Add the DNS records Resend provides
   - Wait for verification (usually a few minutes)

2. **Update Email From Address:**
   Edit `lib/email.ts` and change:
   ```typescript
   from: 'Portfolio Contact <onboarding@resend.dev>',
   ```
   To:
   ```typescript
   from: 'Portfolio Contact <contact@yourportfolio.com>',
   ```

## Testing

### Test Email Configuration
```bash
# Check configuration
curl http://localhost:3000/api/contact
```

### Test Email Sending
1. Fill out contact form on your site
2. Submit the form
3. Check:
   - Browser console for any errors
   - Server terminal for email logs
   - Your email inbox
   - Resend dashboard for email status

## Email Limits

**Resend Free Tier:**
- 3,000 emails/month
- 100 emails/day
- Perfect for portfolio contact forms

**Resend Pro Tier:**
- 50,000 emails/month
- Higher rate limits
- Custom domains included

## Security Notes

- ✅ Never commit `.env.local` to git
- ✅ Never expose your API key in client-side code
- ✅ Use environment variables for all sensitive data
- ✅ Rotate API keys if compromised
- ✅ Monitor email sending in Resend dashboard

## Support

If you're still having issues:
1. Check Resend documentation: https://resend.com/docs
2. Check server logs for detailed error messages
3. Verify configuration using `/api/contact` endpoint
4. Check Resend dashboard for email delivery status

