# Aniket Jumde — Portfolio

A high-end, animated personal portfolio for **Aniket Jumde**, Java Developer & Software Engineer.
Built with React 19, Vite 7, Tailwind CSS v4 and Framer Motion.

**Live:** https://aniketjumdeportfolio.vercel.app/

---

## Highlights

- **Custom design system** — no template. Ink-black base with a jade → cyan → violet accent
  spectrum, driven entirely by CSS custom properties so dark and light themes stay consistent.
- **Mixed typography** — Sora for display, Inter for body, *Instrument Serif* italics for accents,
  JetBrains Mono for technical labels.
- **Purposeful motion** — word-by-word hero reveal, scroll-linked timeline rail, staggered section
  reveals, magnetic hover states, 3D project-card tilt, animated ambient backdrop.
- **Accessible by default** — skip link, labelled icon-only controls, focus-visible rings, focus-trapped
  contact dialog, `prefers-reduced-motion` respected throughout, no pinch-zoom blocking.
- **Fast** — single-page, CSS-only project "screenshots" (no image payload), code-split vendor chunks.
- **Hardened contact API** — HTML-escaped email body, per-IP throttling, field length caps, and
  payload rejection for script/header-injection attempts.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Motion | Framer Motion 12 |
| Icons | Lucide + hand-drawn brand SVGs |
| Routing | Wouter |
| API | Vercel serverless function + Nodemailer (Gmail SMTP) |

Only **13 runtime dependencies**. The previous codebase carried 88, most of them unused
(Express, Passport, Drizzle, Recharts, 41 orphaned Radix primitives).

---

## Project structure

```
.
├── api/
│   └── contact.ts            # Serverless handler: validation, throttle, email
├── lib/
│   └── mail.ts               # Nodemailer transport + escaped HTML template
├── public/
│   ├── favicon.svg           # Monogram mark
│   ├── og.svg                # Social card source (1200×630)
│   ├── robots.txt
│   └── sitemap.xml
├── script/
│   └── dev-api.ts            # Local adapter so `npm run dev` can exercise api/
├── src/
│   ├── App.tsx               # Route shell
│   ├── index.css             # Design tokens, utilities, keyframes
│   ├── data/                 # Typed content — single source of truth
│   │   ├── site.ts           # Identity, contact, nav, socials
│   │   ├── projects.ts       # Projects + stats
│   │   ├── skills.ts         # Skill groups, concepts, soft skills
│   │   ├── experience.ts     # Timeline + education (one canonical CGPA)
│   │   ├── achievements.ts   # Certifications, achievements, stats
│   │   └── services.ts       # Expertise + process
│   ├── hooks/
│   │   ├── use-theme.tsx     # Theme context (localStorage + OS preference)
│   │   └── use-portfolio.ts  # Scroll, active-section, reduced-motion, in-view
│   ├── components/
│   │   ├── layout/           # Navbar, footer, animated backdrop
│   │   ├── motion/           # Reveal, SplitText, Counter primitives
│   │   ├── sections/         # Hero, About, Skills, Experience, Projects,
│   │   │                     # Services, Achievements, Contact
│   │   └── ui/               # Button, icons, section shell
│   └── pages/                # Home, 404
├── index.html                # Meta, fonts, JSON-LD, pre-paint theme script
├── vercel.json               # Rewrites, caching, security headers
└── vite.config.ts            # Path aliases, chunking, dev API proxy
```

### Editing content

All copy lives in `src/data/*`. To update a project, a certification, or your résumé link,
edit the corresponding file — every section reads from there, so numbers and facts never
drift out of sync.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

`npm run dev` also boots a small adapter (`script/dev-api.ts`) so the real contact handler in
`api/contact.ts` runs locally. Without it, Vite would serve the SPA for `/api/contact` and the
form would fail silently.

### Contact form setup

Copy `.env.example` to `.env` and fill in:

```
EMAIL_USER=you@gmail.com
EMAIL_PASS=your-16-char-gmail-app-password
```

Generate an app password at <https://myaccount.google.com/apppasswords> (2-Step Verification
must be on). Without these, the API returns a 500 and logs the reason.

### Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server + local API adapter |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run check` | TypeScript, no emit |

---

## Deploying to Vercel

1. Import the repo at <https://vercel.com/new>; the framework preset is Vite.
2. Add `EMAIL_USER` and `EMAIL_PASS` under **Settings → Environment Variables**.
3. Deploy.

`vercel.json` handles the SPA rewrite (excluding `/api`), immutable caching for hashed
assets, and baseline security headers.

> **Note on the social card:** `og:image` points at `/og.png`. `public/og.svg` is the source —
> rasterise it to `og.png` at 1200×630 before sharing (some scrapers don't accept SVG).

---

## Accessibility & motion

- Skip-to-content link, landmark regions, and a single `<h1>`.
- Every icon-only button has an `aria-label`; the mobile menu exposes `aria-expanded`.
- Contact dialog has `role="dialog"`, `aria-modal`, Escape handling, backdrop dismissal and a
  focus trap that restores focus on close.
- Form inputs are label-associated with `aria-invalid` / `aria-describedby` hints.
- `prefers-reduced-motion` disables transforms, parallax and spring animations.

---

## Licence

Content and personal data © Aniket Jumde. Code released under the MIT Licence.
