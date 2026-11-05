# Aniket Jumde — Portfolio

An editorial-print portfolio for **Aniket Jumde**, Java developer and problem solver.
Built with React 19, Vite 7, Tailwind CSS v4 and Framer Motion.

**Live:** https://aniketjumdeportfolio.vercel.app/

---

## The concept

Most developer portfolios reach for the same visual language: dark navy, glassmorphism,
neon gradients, a grid of identical project cards. This one deliberately goes the other way.

The design language is **printed matter** — a warm paper stock (`#F4F0E7`), ink-black type,
hairline rules, registration marks, figure captions and a numbered section index. Two signal
colours carry all the emphasis: a burnt **oxide** for accents and a deep **ultramarine** for
secondary marks. A fine dot screen sits over everything at 5% to give the page the texture of
offset printing rather than a screen.

Typography does the heavy lifting: **Fraunces** (a variable optical-size serif) for display,
**Inter Tight** for body copy, and **JetBrains Mono** for the metadata, labels and numbering
that frame each section the way a magazine sets its furniture.

It reads as a designed document rather than a templated site.

---

## Structure

| # | Section | What it does |
|---|---|---|
| — | Masthead | Fixed index with section numbers, active tracking, reading progress |
| 01 | Introduction | Oversized name, discipline slab, portrait plate, metric ledger |
| 02 | About | Sticky sidebar of current facts, objectives ledger, pull quote |
| 03 | Expertise | Accordion skill index — six categories from the résumé |
| 04 | Experience & Education | Timeline with a scroll-linked oxide rail |
| 05 | Selected Projects | Full-width editorial rows with CSS-drawn project plates |
| 06 | Achievements | Metric cards, grouped certification ledger, verify links |
| 07 | Let's Connect | Copy-to-clipboard email, social index, working contact form |
| — | Footer | Oversized sign-off, two index columns, colophon |

---

## Content provenance

Every fact on the site is transcribed from `public/AniketCV.pdf`. Nothing is invented.

- **Projects** — the two systems listed under *Professional Experience & Projects*
  (Online Examination System, Student Management System). No demo or repository URL is
  fabricated; the site says "Live demo on request" where no link exists.
- **Certifications** — grouped by subject and issuer exactly as the résumé lists them,
  rather than inventing individual certificate titles.
- **Metrics** — 1+ years Java, 150+ LeetCode, 5★ HackerRank in C/C++/Java/SQL, 8.22 CGPA.
- **HackerRank profile** — the résumé references one but doesn't state the handle, so no
  guessed URL is included. Add it to `src/data/credentials.ts` when you have it.

If a number changes on the résumé, change it in `src/data/` and it updates everywhere.

### Data files

```
src/data/profile.ts      identity, summary, metrics, socials, navigation
src/data/work.ts         the two projects
src/data/skills.ts       six skill groups
src/data/timeline.ts     education and applied-practice timeline
src/data/credentials.ts  certifications, achievements, verify links
```

---

## Motion

Framer Motion throughout, tuned to feel typeset rather than animated:

- **Masked line reveals** — display headings rise out of an overflow mask, line by line
- **Draw-on rules** — hairline rules scale from zero as they enter view
- **Scroll-linked timeline rail** — the oxide line fills in step with scroll position
- **Parallax portrait** — the plate drifts slightly slower than the page
- **Pointer-tracked tilt** — project plates rotate a few degrees toward the cursor
- **Hover ink underlines** — links draw a rule from the left
- **Full-screen mobile index** — clip-path wipe, staggered items

All motion is `transform` / `clip-path` / `opacity` — nothing triggers layout. Every animated
element is gated behind `prefers-reduced-motion` where it isn't purely decorative.

---

## Accessibility

- All body-text colour pairs verified at **WCAG AA (≥ 4.5:1)** in both themes
- Skip link, single `<h1>`, landmark regions, ordered heading levels
- Icon-only controls have `aria-label`; accordion triggers expose `aria-expanded`
- Contact dialog traps focus, closes on Escape, restores focus on dismissal
- Form fields are label-associated with `aria-invalid` / `aria-describedby` hints
- Pinch-zoom is not blocked; focus-visible outlines use the oxide accent

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
| API | Vercel serverless function + Nodemailer |

**12 runtime dependencies.** Production bundle: 41 kB CSS, ~412 kB JS (three chunks).

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

`npm run dev` also boots a small adapter (`script/dev-api.ts`) so the real contact handler in
`api/contact.ts` runs locally.

### Contact form

Copy `.env.example` to `.env`:

```
EMAIL_USER=you@gmail.com
EMAIL_PASS=your-16-char-gmail-app-password
```

Generate one at <https://myaccount.google.com/apppasswords> (2-Step Verification required).
Without these the API returns a clear 500 rather than failing silently.

### Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server + local API adapter |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run check` | TypeScript, no emit |

---

## Deploying

Import the repo at <https://vercel.com/new> (Vite preset), add `EMAIL_USER` and `EMAIL_PASS`
under environment variables, deploy. `vercel.json` handles the SPA rewrite, immutable asset
caching and baseline security headers.

`public/og.png` is rasterised from `public/og.svg` at 1200×630 — regenerate it if the SVG
changes.

---

## Licence

Content and personal data © Aniket Jumde. Code released under the MIT Licence.
