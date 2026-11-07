# Aniket Jumde — Portfolio

A dark, violet-accented developer portfolio for **Aniket Jumde**, software
developer and Java engineer. Built with React 19, Vite 7, Tailwind CSS v4 and
Framer Motion.

**Live:** https://aniketjumdeportfolio.vercel.app/

---

## Design language

Modelled on the reference portfolio's structure and feel: a near-black field
(`#0b0b0b`), one violet signal colour (`#a855f7`), translucent glass cards with
soft glow, a faint 56px grid, and centred section headings with an accented
clause.

**Inter** carries everything — 800/900 for headings, 400/500 for body — with
**JetBrains Mono** for numerals, dates and small labels. That pairing keeps the
page feeling engineered rather than decorative.

Ambient violet blooms drift behind the content on an 18–26s cycle; every
animation is gated behind `prefers-reduced-motion`.

---

## Sections

| # | Section | What it does |
|---|---|---|
| — | Nav | Fixed bar, blurs in on scroll, active-link indicator, scroll-progress hairline, mobile sheet |
| — | Hero | Availability pill, reference-style intro line, name, typewriter role, CTAs, socials, metric strip |
| 01 | About | Narrative, four pillar cards, full technology marquee |
| 02 | Projects | Alternating full-width cards, each with a vector application screen, stack and live links |
| 03 | Skills | Filterable icon grid — All / Languages / Frontend / Backend / Databases / Tools |
| 04 | Experience | Centre rail that fills with the accent as you scroll, alternating entries |
| 05 | Certifications | Achievement rail plus the full ledger, grouped by issuer |
| 06 | Profiles | LinkedIn, GitHub, LeetCode, Email cards |
| 07 | Contact | Channels, copy-to-clipboard email, validated form with focus-managed confirmation |
| — | Footer | Brand, navigation, contact block, résumé download |

---

## Content provenance

Every fact is transcribed from `public/AniketCV.pdf`. Nothing is invented.

- **Projects** — the two systems under *Professional Experience & Projects*.
- **Links** — only the Student Management System has a public repo **and** a
  documented live deployment (per its own README). The examination system is
  labelled "Demo on request"; no URL is fabricated.
- **Certifications** — grouped by subject and issuer exactly as the résumé
  lists them. No certificate IDs, issue dates or verify links are invented,
  and the section says so.
- **HackerRank** — the résumé claims 5★ ratings but names no profile handle,
  so no HackerRank card is shown rather than guessing a URL.
- **Metrics** — 1+ years Java, 150+ LeetCode, 5★ HackerRank, 8.22 CGPA.

### Data files

```
src/data/profile.ts      identity, summary, metrics, socials, navigation
src/data/work.ts         the two projects
src/data/skills.ts       icon grid + grouped view
src/data/timeline.ts     education and applied practice
src/data/credentials.ts  certifications and achievements
```

---

## Implementation notes

**Icons are inlined.** Paths from Simple Icons (CC0) live in
`components/ui/tech-icons.tsx` — about 20 paths — rather than pulling the 16 MB
`simple-icons` package or hitting a CDN. They cannot 404 and add no dependency.
Skills with no honest brand mark render as a typed monogram instead of borrowing
a logo.

**Project screens are vector.** `components/ui/project-mocks.tsx` rebuilds the
real application interfaces from the actual JSP sources, so labels and field
names are authentic. They stay sharp at any DPI and ship zero image bytes.

**The résumé opens in a viewer.** A shared dialog renders the PDF in a native
`<iframe>` — no pdf.js. On phones, where in-frame PDFs are unreliable, it swaps
to explicit open/download actions.

---

## Accessibility

- Every text colour verified at **WCAG AA** on the page background:
  white 19.7:1, ash 9.6:1, fog 5.7:1, violet 5.0:1
- Single `<h1>`, skip link, landmark regions, labelled nav
- Skills filters are real `role="tab"` buttons with `aria-selected`
- Form fields are label-associated with `aria-invalid` / `aria-describedby`
- Focus rings visible on every interactive element
- `prefers-reduced-motion` disables the preloader, drifting blooms and all
  transitions

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Motion | Framer Motion 12 |
| Icons | Lucide + inlined brand paths |
| API | Vercel serverless function + Nodemailer |

Production bundle: ~55 kB CSS, ~451 kB JS across three chunks.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

`npm run dev` also boots `script/dev-api.ts` so the real contact handler runs
locally.

### Contact form

Copy `.env.example` to `.env`:

```
EMAIL_USER=you@gmail.com
EMAIL_PASS=your-16-char-gmail-app-password
```

Without these the API returns a clear 500 rather than silently succeeding.

### Assets

`public/og.png` is generated from `public/og.svg` by Pillow (this environment
has no SVG rasteriser):

```bash
pip install pillow numpy fonttools brotli
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

Import the repo at <https://vercel.com/new>, select the Vite preset, add
`EMAIL_USER` and `EMAIL_PASS`, deploy. `vercel.json` handles the SPA rewrite,
immutable asset caching and baseline security headers.

---

## Licence

Content and personal data © Aniket Jumde. Code released under the MIT Licence.
