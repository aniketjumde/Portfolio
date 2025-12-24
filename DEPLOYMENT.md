# Vercel Deployment Guide

This guide will help you deploy your portfolio with serverless email functionality to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional, but recommended)
3. Gmail account with App Password enabled

## Setup Email Configuration

### Step 1: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Select **Security** from the left menu
3. Under "Signing in to Google," select **2-Step Verification** (enable it if not already)
4. Scroll down and select **App passwords**
5. Select "Mail" and "Other (Custom name)"
6. Name it "Portfolio Contact Form"
7. Click **Generate**
8. Copy the 16-character password (you'll need it in Step 3)

### Step 2: Prepare Your Project

Make sure all dependencies are installed:

```bash
npm install
```

### Step 3: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended for First Time)

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your Git repository (GitHub/GitLab/Bitbucket)
3. Configure your project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - Click on "Environment Variables"
   - Add the following variables:
     - `EMAIL_USER` = your-email@gmail.com
     - `EMAIL_PASS` = your-16-character-app-password (from Step 1)

5. Click **Deploy**

#### Option B: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? **portfolio** (or your preferred name)
   - In which directory is your code located? **./

5. Add environment variables:
```bash
vercel env add EMAIL_USER
# Enter your email when prompted

vercel env add EMAIL_PASS
# Enter your app password when prompted
```

6. Deploy to production:
```bash
vercel --prod
```

## Post-Deployment

### Verify API Endpoint

After deployment, your contact API will be available at:
```
https://your-domain.vercel.app/api/contact
```

Test it with curl:
```bash
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

### Update Environment Variables

If you need to update environment variables later:

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Edit or add new variables
4. Redeploy for changes to take effect

Or via CLI:
```bash
vercel env rm EMAIL_USER
vercel env add EMAIL_USER
```

## Troubleshooting

### API Not Working

1. **Check Environment Variables**: Make sure `EMAIL_USER` and `EMAIL_PASS` are set correctly
2. **Check Logs**: In Vercel Dashboard → Your Project → Functions → View Logs
3. **Gmail App Password**: Ensure you're using an App Password, not your regular password
4. **CORS Issues**: The API handler includes CORS headers, but if you face issues, check browser console

### Build Fails

1. Check your `package.json` scripts
2. Ensure all dependencies are listed in `dependencies`, not `devDependencies`
3. Check build logs in Vercel Dashboard

### Email Not Sending

1. Verify Gmail App Password is correct
2. Check if 2-Step Verification is enabled on your Google account
3. Make sure "Less secure app access" is NOT enabled (use App Password instead)
4. Check Vercel Function logs for specific error messages

## Local Development

To test the API locally:

1. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

2. Add your credentials to `.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

3. Install dependencies:
```bash
npm install
```

4. Run development server:
```bash
npm run dev
```

**Note**: The API endpoint won't work in local development with Vite alone. To test the API locally, you'll need to:

1. Use Vercel CLI:
```bash
vercel dev
```

This will run both your frontend and API functions locally.

## Custom Domain

To add a custom domain:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Follow the DNS configuration instructions

## Important Files

- `vercel.json` - Vercel configuration
- `api/contact.ts` - Serverless API endpoint
- `lib/mail.ts` - Email sending logic
- `.env.example` - Environment variables template
- `.vercelignore` - Files to ignore during deployment

## Security Notes

- Never commit `.env` file to git
- Use environment variables for sensitive data
- Gmail App Passwords are safer than regular passwords
- Consider rate limiting for production (not included in this basic setup)

## Support

If you encounter issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review [Vercel Functions Guide](https://vercel.com/docs/functions)
- Check your deployment logs in Vercel Dashboard
