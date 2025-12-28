# Environment Variables Setup

## Quick Setup for Email Configuration

Follow these steps to configure email sending to `aliuppal9797@gmail.com`:

### Step 1: Create `.env.local` file

Create a file named `.env.local` in your project root directory (same folder as `package.json`).

### Step 2: Add these variables

Copy and paste this into your `.env.local` file:

```env
# Required: Your Resend API Key
# Get it from https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Required: Email address where contact form submissions will be sent
CONTACT_EMAIL=aliuppal9797@gmail.com
```

### Step 3: Get Your Resend API Key

1. Go to [resend.com](https://resend.com) and sign up/login
2. Go to **API Keys** in the dashboard
3. Click **Create API Key**
4. Copy the key (starts with `re_`)
5. Replace `re_xxxxxxxxxxxxxxxxxxxxxxxxxx` in your `.env.local` file with your actual key

### Step 4: Verify Email Address

⚠️ **IMPORTANT:** Please double-check your email address:
- You wrote: `aliuppal9797@gmail.com`
- Did you mean: `aliuppal9797@gmail.com` (with 'gmail' not 'gmail')?

Make sure the email address in `.env.local` is correct!

### Step 5: Restart Your Server

After creating/updating `.env.local`:
1. Stop your dev server (Ctrl+C)
2. Start it again: `pnpm dev`

### Step 6: Test Configuration

Visit: `http://localhost:3000/api/contact`

This will show you if everything is configured correctly.

### Step 7: Test Email Sending

1. Go to your contact form
2. Fill it out and submit
3. Check your email inbox (and spam folder)
4. Check server console for email logs

## Complete `.env.local` Example

```env
# Email Configuration
RESEND_API_KEY=re_abc123xyz789your_actual_key_here
CONTACT_EMAIL=aliuppal9797@gmail.com

# Optional: Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Troubleshooting

**If emails aren't being sent:**
1. Check `.env.local` exists in project root
2. Verify `RESEND_API_KEY` starts with `re_`
3. Verify `CONTACT_EMAIL` is correct (no typos!)
4. Restart your dev server
5. Check `/api/contact` endpoint for diagnostics

**Common mistakes:**
- File named `.env` instead of `.env.local`
- File in wrong directory (should be in project root)
- Extra spaces or quotes around values
- Forgot to restart server after adding variables


