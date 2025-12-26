# 🚀 Quick Deploy Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Setup
- [ ] Created `.env` file locally (copy from `.env.example`)
- [ ] Added Gmail credentials to `.env`
- [ ] Tested contact form locally

### 2. Git Repository
- [ ] All changes committed
- [ ] Pushed to GitHub/GitLab/Bitbucket
- [ ] Repository is public or accessible to Vercel

### 3. Build Test
```bash
npm run build
```
- [ ] Build completes successfully
- [ ] `dist/` folder is created

---

## 🎯 Deploy to Vercel - 3 Steps

### Step 1: Import Project
1. Go to https://vercel.com/new
2. Import your Git repository
3. Select framework: **Vite**
4. Keep defaults:
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Step 2: Add Environment Variables
Before deploying, click **Environment Variables** and add:
```
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your-gmail-app-password
```

💡 **Get Gmail App Password:**
- Go to https://myaccount.google.com/apppasswords
- Enable 2-Step Verification first
- Generate new app password
- Copy the 16-character password

### Step 3: Deploy
Click **Deploy** and wait 2-3 minutes!

---

## 🧪 Test Your Deployment

1. Visit your deployed URL
2. Navigate to Contact section
3. Fill and submit the form
4. Check your email inbox

---

## 🔄 Auto-Deploy

Every time you push to your main branch, Vercel will automatically deploy!

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

---

## 📊 Project Configuration

Your project is configured with:

- **Frontend:** React + Vite + TypeScript
- **API:** Vercel Serverless Functions
- **Email:** Nodemailer + Gmail SMTP
- **Deployment:** Vercel

### Key Files:
- `vercel.json` - Vercel configuration
- `api/contact.ts` - Serverless API endpoint
- `lib/mail.ts` - Email service
- `.env.example` - Environment variables template

---

## 🐛 Common Issues

### Build Failed
```bash
# Test locally first
npm run build
```

### Contact Form Not Working
- Check environment variables in Vercel Dashboard
- Verify Gmail App Password is correct
- Check Function logs in Vercel Dashboard

### Email Not Received
- Check spam folder
- Verify EMAIL_USER and EMAIL_PASS in Vercel
- Ensure 2-Step Verification is enabled on Gmail

---

## 📚 More Info

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🎉 That's It!

Your portfolio is now live with a working contact form! 🚀
