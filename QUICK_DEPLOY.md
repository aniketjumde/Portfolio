# Quick Deployment Checklist for Vercel

## 🚀 Quick Start (5 Minutes)

### 1. Prepare Gmail App Password
- Go to https://myaccount.google.com/apppasswords
- Generate a new App Password
- Copy the 16-character password

### 2. Deploy to Vercel

**Via Vercel Dashboard:**
1. Go to https://vercel.com/new
2. Import your repository
3. Add environment variables:
   - `EMAIL_USER` = your-email@gmail.com
   - `EMAIL_PASS` = your-16-character-app-password
4. Click Deploy ✅

**Via CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add EMAIL_USER production
vercel env add EMAIL_PASS production

# Deploy to production
vercel --prod
```

### 3. Test Your Deployment
Visit: `https://your-domain.vercel.app`
Try the contact form!

## 📁 Important Files for Deployment

✅ **Already configured:**
- `vercel.json` - Vercel configuration
- `api/contact.ts` - Serverless API endpoint
- `lib/mail.ts` - Email logic
- `.env.example` - Environment template
- `.gitignore` - Prevents committing secrets
- `.vercelignore` - Deployment ignore rules

## 🔧 Project Structure

```
Portfolio/
├── api/
│   └── contact.ts          # Serverless API endpoint
├── lib/
│   └── mail.ts             # Email sending logic
├── src/
│   ├── components/
│   │   └── contact.tsx     # Contact form component
│   └── ...
├── vercel.json             # Vercel configuration
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
└── package.json            # Dependencies
```

## 🌐 How It Works

1. **Frontend (Vite + React)**: Built and served as static files
2. **API (`/api/contact`)**: Runs as serverless function on Vercel
3. **Email**: Sent via Gmail SMTP using nodemailer

## 🔐 Environment Variables Required

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

## 📝 Post-Deployment

### Test API Endpoint
```bash
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello!"}'
```

Expected response:
```json
{"success": true, "message": "Message sent successfully"}
```

## 🐛 Troubleshooting

**API not working?**
- Check environment variables in Vercel Dashboard
- Verify Gmail App Password (not regular password)
- Check function logs: Dashboard → Your Project → Functions

**Build failing?**
- Ensure all dependencies are installed
- Check build logs in Vercel Dashboard
- Verify `package.json` scripts are correct

**Email not sending?**
- Verify 2-Step Verification is enabled on Google Account
- Use App Password, not regular password
- Check Vercel Function logs for errors

## 📚 Full Documentation
See `DEPLOYMENT.md` for detailed deployment guide.

## 🎉 You're Done!
Your portfolio with serverless email is now live on Vercel!

Visit your site and test the contact form. 🚀
