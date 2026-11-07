# Aniket Jumde — Portfolio

A dark-editorial portfolio for **Aniket Jumde**, Java developer and problem solver.
Built with React 19, Vite 7, Tailwind CSS v4 and Framer Motion.

**Live:** https://aniketjumdeportfolio.vercel.app/

---

## The concept

Dark editorial meets creative technology. Instead of the default developer-portfolio
language — navy gradients, glass cards, a grid of identical thumbnails — this treats the
page like a printed poster that happens to be interactive.

Deep charcoal stock (`#0B0B0A`), **electric lime** (`#D4FF38`) as the single signal colour,
off-white type, and hairline rules at 1.44:1 so structure reads without shouting. A 72px
grid and a 3.5% noise screen sit under the content to give it grain. Ambient blooms drift
behind the hero and the closing section.

Type carries the identity: **Anton** at poster scale for display, **Bricolage Grotesque**
for headings, **Inter Tight** for body copy, and **JetBrains Mono** for the metadata that
frames every section.

The result reads as a designed object, not a template.

---

## Structure

| # | Section | What it does |
|---|---|---|
| — | Floating nav | Monogram, condensed-on-scroll bar, sliding active indicator, scroll-progress hairline, résumé viewer |
| 01 | Hero | Poster headline, availability status, standfirst, magnetic CTAs, metric rail, socials |
| 02 | Selected work | Full editorial spreads, alternating sides — each project with two vector screens, contribution, stack and links |
| 03 | About | Sticky fact ledger, narrative, focus list, education, technology ticker |
| 04 | Skills | Rotating word-sphere over a six-category ledger; isolate a category by hover, tap or keyboard |
| 05 | Experience & education | Four-stage rail with a scroll-linked lime fill |
| 06 | Credentials | Achievement rail and the full certification ledger, grouped by issuer |
| 07 | Contact | Copy-to-clipboard email, social index, validated form with focus-trapped confirmation dialog |
| — | Footer | Oversized sign-off, index columns, contact block, colophon |

---

## Content provenance

Every fact on the site is transcribed from `public/AniketCV.pdf`. Nothing is invented.

- **Projects** — the two systems listed under *Professional Experience & Projects*
  (Online Examination System, Student Management System).
- **Links** — only `Student-Managment-System` has a public repository, so only that
  project shows a source link. The examination system is labelled "Demo on request".
  No demo URL is fabricated.
- **Certifications** — grouped by subject and issuer exactly as the résumé lists them,
  rather than inventing individual certificate titles.
- **Metrics** — 1+ years Java, 150+ LeetCode, 5★ HackerRank in C/C++/Java/SQL, 8.22 CGPA.
- **HackerRank profile** — the résumé references one but doesn't state the handle, so no
  guessed URL is included.

If a number changes on the résumé, change it in `src/data/` and it updates everywhere.

### Data files

```
src/data/profile.ts      identity, summary, metrics, socials, navigation
src/data/work.ts         the two projects, contribution bullets, stack
src/data/skills.ts       six skill groups
src/data/timeline.ts     education and applied-practice timeline
src/data/credentials.ts  certifications, achievements
```

---

## Signature interactions

- **Preloader** — 0→100 counter with a BUILD / SHIP / REFINE word cycle, then a wipe up.
  Runs once per session and is skipped entirely for reduced-motion users.
- **Custom cursor** — an instant dot plus a lagging ring that grows over interactive
  elements. Desktop/fine-pointer only; never applied to touch.
- **Pointer-following project preview** — the work section floats a scaled project plate
  that trails the cursor and tilts with horizontal position.
- **Scroll-linked rail** — the experience timeline fills in step with scroll progress.
- **Magnetic CTAs** — hero buttons lean toward the pointer by a few pixels.
- **Masked line reveals** — every display heading rises out of an overflow mask.

All motion uses `transform` / `opacity` / `clip-path` only — nothing triggers layout.
Every effect is gated behind `prefers-reduced-motion`.

---

## Accessibility

- Body text verified at **WCAG AA (≥ 4.5:1)**; the faintest token (`--fog`) sits at
  **4.66:1** on the lightest dark surface
- Skip link, a single `<h1>`, landmark regions, ordered heading levels
- Keyboard focus is always visible — 2px lime ring, 3px offset
- Icon-only controls carry `aria-label`; the mobile sheet exposes `aria-expanded`
- Contact dialog traps focus, closes on Escape, restores focus on dismissal
- Form fields are label-associated with `aria-invalid` / `aria-describedby` hints
- Decorative layers are `aria-hidden`; pinch-zoom is not blocked

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

Production bundle: 43 kB CSS, ~411 kB JS across three chunks (react / motion / app).

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

### Résumé viewer

Every "Résumé" control opens one shared dialog (`components/experience/resume-dialog.tsx`)
that renders the PDF in a native `<iframe>` — no pdf.js, nothing to bundle. On phones,
where in-frame PDFs are unreliable, it swaps to explicit open/download actions instead of
showing an empty box. The provider is mounted once in `pages/home.tsx`, so three buttons
share a single document load.

### Assets

`public/og.png` is the social card. `public/og.svg` is its source; this sandbox has no SVG
rasteriser, so the PNG is generated directly with Pillow from the same design tokens:

```bash
pip install pillow numpy
python3 tools/render-og.py
```

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

---

## Licence

Content and personal data © Aniket Jumde. Code released under the MIT Licence.
