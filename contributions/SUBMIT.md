# Contribution: add this portfolio to `emmabostian/developer-portfolios`

**Target repo:** https://github.com/emmabostian/developer-portfolios (27.5k★, 2,084 listed portfolios)
**Status:** ⚠️ **Prepared and validated locally — not submitted.** The sandbox's GitHub token cannot fork
or create repositories (`Resource not accessible by integration`), which is required to open a PR.
Submit it yourself with the steps below (about 2 minutes).

---

## What the target repo actually is

It is **not** a package, plugin, or installable tool. It is a curated **Markdown list** of developer
portfolios. There is no code to "install" — contributing means adding **one line** to `README.md`
and opening a pull request.

The relevant rules, from `CONTRIBUTING.md` and `.github/pull_request_template.md`:

1. Entry format: `- [Your Name](portfolio-link) [Your Title | Your Expertise]`
2. Must be in **strict alphabetical order by first name**
3. Portfolio link must load and must **not** be a domain-parking/error page
4. **Do not** edit `feed.json` — it is auto-generated
5. Flow: fork → branch → commit → pull request

---

## The change

Exactly **one line added**, positioned between `Aniket Joshi` and `Aniket Kshirsagar`:

```diff
 - [Aniket Joshi](https://aniketj.dev) [Software Architect]
+- [Aniket Jumde](https://aniketjumdeportfolio.vercel.app) [Java Developer & Software Engineer | Hibernate, SQL, REST APIs]
 - [Aniket Kshirsagar](https://aniketksh.github.io) [SRE Engineer]
 - [Aniket Kudale](https://aniket.co)
```

The title half (`Java Developer & Software Engineer`) is copied verbatim from the portfolio's own
hero section, so the directory listing and the site agree. The skills half (`Hibernate, SQL, REST APIs`)
deliberately avoids repeating "Java" — the left side already says it.

---

## Validation performed

Run against a fresh clone of upstream at `c141215`, using the repo's **own** utilities (`src/alphabetical.py`)
and test suite:

| Check | Result |
|---|---|
| `is_well_formed_url()` | ✅ `True` |
| `find_malformed_urls()` on entry | ✅ none |
| `validate_section_placement()` | ✅ 0 entries moved (correct `## A` section) |
| Local alphabetical order of `Aniket *` block | ✅ `Joshi → Jumde → Kshirsagar → Kudale → Patidar` |
| `remove_exact_duplicate_links()` | ✅ 0 duplicates (URL not already listed) |
| `python3 run_tests.py` | ✅ **39/39 pass — identical to pre-change baseline** |
| Live URL reachable | ✅ HTTP 200, renders "Aniket | Full Stack Developer" |

**One note for transparency:** `sort_lists_alphabetically()` reports the README as "not fully sorted",
but it does so **on the pristine upstream file too** (1,503 lines differ). That is pre-existing noise —
the sorter strips trailing slashes and reflows multi-line entries — not a defect introduced here.

⚠️ **Heads-up:** your site's `<title>` is still `Aniket | Full Stack Developer` while your hero says
`Java Developer & Software Engineer`. Neither the list nor the checker cares, but it's the one
inconsistency a visitor will see (see finding P0 in `ANALYSIS.md`).

---

## How to submit (do this yourself)

### Option A — plain git (recommended)

```bash
# 1. Fork on GitHub: https://github.com/emmabostian/developer-portfolios/fork
# 2. Clone your fork
git clone https://github.com/aniketjumde/developer-portfolios.git
cd developer-portfolios

# 3. Branch, apply the prepared patch
git checkout -b add/aniket-jumde
git am /path/to/portfolio/contributions/add-aniket-jumde.patch

# 4. Push
git push -u origin add/aniket-jumde
```

Then open the PR from the link GitHub prints, or via the web UI.

### Option B — GitHub web UI (no git needed)

1. Fork the repo.
2. Open `README.md`, click the **pencil** icon.
3. Find `Aniket Joshi` (line 277) and add this line directly beneath it:

```
- [Aniket Jumde](https://aniketjumdeportfolio.vercel.app) [Java Developer & Software Engineer | Hibernate, SQL, REST APIs]
```

4. Commit to a new branch, then **Compare & pull request**.

### PR description

Use the repo's own template — tick all three boxes, then add:

> Adds my portfolio, **Aniket Jumde** — Java Developer & Software Engineer.
> Placed between *Aniket Joshi* and *Aniket Kshirsagar* in the `A` section.
> Verified the link loads correctly (HTTP 200). `feed.json` untouched.

**PR title:** `Add Aniket Jumde portfolio`

---

## What happens after merge

- `feed.json` regenerates automatically — nothing to do.
- A scheduled link-checker runs **every Saturday**. Because your site is on Vercel and returns 200, it
  should pass. If it ever goes down (e.g. Vercel project paused), the entry gets flagged and removed,
  so keep the deployment alive.

---

## A note on what this gets you

This is a directory listing, not a backlink strategy. It puts your portfolio in front of people
browsing for design inspiration, and gives you a legitimate public open-source contribution to point
at. It will **not** meaningfully move search rankings — for that, the higher-leverage fixes are the
ones in `ANALYSIS.md`: add the missing `<title>` tag, add `og:image` for social cards, and add
`robots.txt`/`sitemap.xml`. Those are one-line-to-one-file changes on your own repo.
