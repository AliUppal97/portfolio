# Quick Start Guide - Email Configuration

## ✅ Files Created

I've created the following files for you:

1. **`.env.local`** - Your actual environment file (gitignored, won't be committed)
2. **`env.example`** - Template file (can be committed to git)

## 🚀 Next Steps

### Step 1: Get Your Resend API Key

1. Go to [resend.com](https://resend.com) and sign up (it's free)
2. Once logged in, go to **API Keys** section
3. Click **Create API Key**
4. Copy the API key (it starts with `re_`)

### Step 2: Update `.env.local`

Open `.env.local` file and replace:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

With your actual API key:
```
RESEND_API_KEY=re_your_actual_key_here
```

### Step 3: Verify Your Email Address

Your email is currently set to: `aliuppal9797@gmail.com`

⚠️ **Please verify:**
- Is it `gmail.com` or `gmail.com`?
- Make sure the email address is correct in `.env.local`

### Step 4: Restart Your Server

After updating `.env.local`:
1. Stop your dev server (press `Ctrl+C` in the terminal)
2. Start it again: `pnpm dev`

### Step 5: Test Configuration

Visit this URL to check if everything is configured:
```
http://localhost:3000/api/contact
```

You should see:
- `hasApiKey: true` if your API key is set
- `hasContactEmail: true` if your email is configured
- Any issues will be listed in the `issues` array

### Step 6: Test Email Sending

1. Go to your contact form on the website
2. Fill it out with test data
3. Submit the form
4. Check:
   - Your email inbox (and spam folder)
   - Server console for email logs
   - Look for `✅ Email sent successfully:` message

## 📋 Current Configuration

Your `.env.local` file contains:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx  ← Replace with your actual key
CONTACT_EMAIL=aliuppal9797@gmail.com          ← Verify this is correct
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🔍 Troubleshooting

**If emails aren't being sent:**

1. **Check API Key:**
   - Visit `/api/contact` endpoint
   - Look for `hasApiKey: true`
   - If false, make sure you added your API key to `.env.local`

2. **Check Email Address:**
   - Visit `/api/contact` endpoint
   - Look for `hasContactEmail: true`
   - Verify the email address is correct (no typos!)

3. **Check Server Logs:**
   - Look in your terminal where `pnpm dev` is running
   - You should see email sending logs
   - Errors will be clearly marked with ❌

4. **Common Issues:**
   - Forgot to restart server after adding variables
   - API key has extra spaces or quotes
   - Email address has a typo
   - `.env.local` file is in wrong location (should be in project root)

## 📝 Notes

- `.env.local` is gitignored (won't be committed to git)
- `env.example` is a template (can be committed)
- Never share your `RESEND_API_KEY` publicly
- The email address `aliuppal9797@gmail.com` is already configured - just verify it's correct!

## ✨ You're All Set!

Once you:
1. ✅ Add your Resend API key to `.env.local`
2. ✅ Verify your email address is correct
3. ✅ Restart your server

Your contact form will send emails to `aliuppal9797@gmail.com` whenever someone submits it!




