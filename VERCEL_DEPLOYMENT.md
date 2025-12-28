# 🚀 Vercel Deployment Guide

This guide will walk you through deploying your Senior Portfolio Pro to Vercel step-by-step.

## Prerequisites

Before deploying, make sure you have:

- ✅ A GitHub account (or GitLab/Bitbucket)
- ✅ Your portfolio code pushed to a Git repository
- ✅ A Resend account (for email functionality) - [Sign up here](https://resend.com)
- ✅ (Optional) A custom domain (if you want to use your own domain)

---

## Step 1: Prepare Your Repository

### 1.1 Push Your Code to GitHub

If you haven't already, push your code to a Git repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Portfolio ready for deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/senior-portfolio-pro.git

# Push to GitHub
git push -u origin main
```

**Note:** Make sure `.env.local` is in your `.gitignore` file (it should be by default). Never commit environment variables to your repository!

---

## Step 2: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub** (recommended) to connect your GitHub account
4. Authorize Vercel to access your repositories

---

## Step 3: Deploy Your Project

### 3.1 Import Your Repository

1. After logging in, click **Add New...** → **Project**
2. You'll see a list of your GitHub repositories
3. Find and click **Import** next to `senior-portfolio-pro`
4. If you don't see your repository:
   - Click **Adjust GitHub App Permissions**
   - Grant access to the repository
   - Refresh the page

### 3.2 Configure Project Settings

Vercel will auto-detect Next.js, but verify these settings:

- **Framework Preset:** Next.js (should be auto-detected)
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build` (or `pnpm build` if using pnpm)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (or `pnpm install`)

**Note:** If you're using `pnpm`, you may need to add a `.npmrc` file or configure Vercel to use pnpm. Vercel usually auto-detects package managers.

### 3.3 Environment Variables

**⚠️ IMPORTANT:** Before deploying, add your environment variables:

1. In the project configuration page, scroll down to **Environment Variables**
2. Add the following variables:

#### Required Variables:

```
RESEND_API_KEY
```
- **Value:** Your Resend API key (starts with `re_`)
- **Environment:** Production, Preview, Development (select all)
- **How to get it:**
  1. Go to [resend.com](https://resend.com)
  2. Log in to your dashboard
  3. Navigate to **API Keys**
  4. Click **Create API Key**
  5. Copy the key (it starts with `re_`)

```
CONTACT_EMAIL
```
- **Value:** Your email address where contact form submissions will be sent
- **Example:** `your-email@gmail.com`
- **Environment:** Production, Preview, Development (select all)

#### Optional Variables:

```
NEXT_PUBLIC_BASE_URL
```
- **Value:** Your production URL (e.g., `https://yourportfolio.vercel.app`)
- **Environment:** Production only
- **Note:** You can update this after deployment with your actual Vercel URL

```
NEXT_PUBLIC_GA_ID
```
- **Value:** Your Google Analytics ID (e.g., `G-XXXXXXXXXX`)
- **Environment:** Production only
- **Note:** Only add this if you're using Google Analytics

### 3.4 Deploy

1. Click **Deploy** button
2. Wait for the build to complete (usually 1-3 minutes)
3. You'll see a success message with your deployment URL

---

## Step 4: Verify Your Deployment

### 4.1 Check Your Live Site

1. Click the deployment URL (e.g., `https://senior-portfolio-pro.vercel.app`)
2. Verify your site loads correctly
3. Test all major sections:
   - Navigation
   - Contact form
   - Theme switching
   - Responsive design

### 4.2 Test Contact Form

1. Navigate to the contact section
2. Fill out and submit the form
3. Check your email inbox (and spam folder)
4. Verify you received the email

**Troubleshooting:**
- If emails aren't sending, check:
  - Environment variables are set correctly in Vercel
  - Resend API key is valid
  - Contact email is correct
  - Check Vercel function logs for errors

---

## Step 5: Configure Custom Domain (Optional)

If you want to use your own domain (e.g., `yourname.com`):

### 5.1 Add Domain in Vercel

1. Go to your project dashboard in Vercel
2. Click **Settings** → **Domains**
3. Enter your domain (e.g., `yourname.com`)
4. Click **Add**

### 5.2 Configure DNS

Vercel will provide DNS records to add:

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Navigate to DNS settings
3. Add the DNS records Vercel provides:
   - Usually an `A` record or `CNAME` record
4. Wait for DNS propagation (can take up to 24 hours, usually 5-30 minutes)

### 5.3 Update Environment Variables

After your domain is configured:

1. Go to **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_BASE_URL` to your custom domain:
   ```
   https://yourname.com
   ```
3. Redeploy your application

---

## Step 6: Automatic Deployments

Vercel automatically deploys on every push to your main branch:

- **Production:** Deploys from `main` branch
- **Preview:** Deploys from other branches and pull requests
- **Automatic:** No manual action needed

### 6.1 Branch Protection (Recommended)

To ensure only tested code goes to production:

1. Go to **Settings** → **Git**
2. Configure branch protection:
   - Require pull request reviews
   - Require status checks to pass

---

## Step 7: Monitoring & Analytics

### 7.1 Vercel Analytics

Vercel provides built-in analytics:

1. Go to **Analytics** tab in your project
2. View:
   - Page views
   - Unique visitors
   - Performance metrics
   - Geographic data

### 7.2 Function Logs

Monitor your API routes:

1. Go to **Deployments** tab
2. Click on a deployment
3. Click **Functions** tab
4. View logs for `/api/contact` and other API routes

---

## Troubleshooting

### Build Fails

**Issue:** Build fails with errors

**Solutions:**
1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Fix any TypeScript or linting errors
4. Ensure all dependencies are in `package.json`

### Environment Variables Not Working

**Issue:** Environment variables not accessible

**Solutions:**
1. Verify variables are added in Vercel dashboard
2. Make sure you selected the correct environment (Production/Preview/Development)
3. Redeploy after adding variables
4. Check variable names match exactly (case-sensitive)

### Images Not Loading

**Issue:** Images show broken or don't load

**Solutions:**
1. Verify images are in the `public` folder
2. Check image paths in your code
3. Ensure `next.config.mjs` has correct image configuration
4. Check Vercel build logs for image optimization errors

### Contact Form Not Working

**Issue:** Contact form doesn't send emails

**Solutions:**
1. Verify `RESEND_API_KEY` is set in Vercel
2. Verify `CONTACT_EMAIL` is set and correct
3. Check Vercel function logs for errors
4. Test Resend API key is valid
5. Check Resend dashboard for email delivery status

### Slow Performance

**Issue:** Site loads slowly

**Solutions:**
1. Enable Vercel's Edge Network (automatic)
2. Optimize images (use Next.js Image component)
3. Check bundle size: `npm run analyze`
4. Enable caching headers
5. Use Vercel's Speed Insights

---

## Best Practices

### 1. Environment Variables

- ✅ Never commit `.env.local` to git
- ✅ Use different API keys for development and production
- ✅ Rotate API keys periodically
- ✅ Use Vercel's environment variable encryption

### 2. Performance

- ✅ Optimize images before uploading
- ✅ Use Next.js Image component
- ✅ Enable automatic image optimization
- ✅ Monitor bundle size

### 3. Security

- ✅ Keep dependencies updated
- ✅ Use environment variables for secrets
- ✅ Enable Vercel's security headers
- ✅ Regularly audit your dependencies

### 4. Monitoring

- ✅ Set up error tracking (Sentry, etc.)
- ✅ Monitor function logs
- ✅ Set up uptime monitoring
- ✅ Track performance metrics

---

## Quick Reference

### Essential Commands

```bash
# Build locally
npm run build

# Test production build
npm run start

# Check for issues
npm run lint
npm run type-check
```

### Vercel CLI (Optional)

You can also deploy using Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Important URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Resend Dashboard:** https://resend.com/emails
- **Project Settings:** `https://vercel.com/your-username/senior-portfolio-pro/settings`

---

## Next Steps

After successful deployment:

1. ✅ Share your portfolio URL
2. ✅ Update your resume with the live URL
3. ✅ Set up Google Analytics (optional)
4. ✅ Configure custom domain (optional)
5. ✅ Set up monitoring and alerts
6. ✅ Regularly update dependencies
7. ✅ Monitor performance metrics

---

## Support

If you encounter issues:

1. **Vercel Documentation:** https://vercel.com/docs
2. **Vercel Community:** https://github.com/vercel/vercel/discussions
3. **Next.js Documentation:** https://nextjs.org/docs
4. **Check Build Logs:** Vercel dashboard → Deployments → View logs

---

## Summary Checklist

Before deploying, ensure:

- [ ] Code is pushed to GitHub
- [ ] `.env.local` is NOT committed to git
- [ ] Resend account is created
- [ ] Resend API key is obtained
- [ ] Environment variables are ready:
  - [ ] `RESEND_API_KEY`
  - [ ] `CONTACT_EMAIL`
  - [ ] `NEXT_PUBLIC_BASE_URL` (optional)
  - [ ] `NEXT_PUBLIC_GA_ID` (optional)
- [ ] Local build works: `npm run build`
- [ ] All tests pass: `npm test`

After deployment:

- [ ] Site loads correctly
- [ ] Contact form works
- [ ] All sections display properly
- [ ] Theme switching works
- [ ] Mobile responsive design works
- [ ] Custom domain configured (if applicable)
- [ ] Analytics set up (if applicable)

---

**Congratulations! 🎉 Your portfolio is now live on Vercel!**


