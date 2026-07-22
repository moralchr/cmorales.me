# cmorales.me — Personal Site

## What This Is

Chris Morales's personal website — a single-page portfolio (layout modeled on gagev.dev) focused on his software inventory and project work, plus a resume tab. Deployed to Cloudflare Pages at `https://cmorales.me`. Site is public — no gate, no noindex.

## Tech Stack

- **Framework:** Astro 6 (static output, no SSR)
- **Styling:** Tailwind CSS v4 via Vite plugin
- **Deployment:** Cloudflare Pages (GitHub → auto-deploy on push to `main`)
- **Content:** Astro content collections (Markdown in `src/content/`)
- **TypeScript:** Strict mode

No Cloudflare adapter needed — static files deploy natively to Cloudflare Pages.

## Structure

```
cmorales.me/
├── src/
│   ├── components/         # Astro components (Header, Footer)
│   ├── layouts/            # Page layouts (Base, Post)
│   ├── pages/              # File-based routing
│   │   ├── index.astro     # THE page — hero+about, skills, experience, projects, contact
│   │   ├── resume.astro    # Embedded PDF viewer + download link
│   │   ├── writing/        # Blog index + [slug] routes (kept, but out of the nav)
│   │   └── 404.astro
│   ├── content/            # Content collection source files
│   │   ├── writing/        # Blog posts (Markdown, all drafts)
│   │   └── projects/       # Project case studies (Markdown)
│   ├── content.config.ts   # Collection schemas (Zod)
│   └── styles/
│       └── global.css      # Tailwind theme + typography + utilities
├── public/
│   ├── images/projects/    # Project gallery photos
│   └── resume/             # Christopher-Morales-Resume.pdf (deployed copy)
├── docs/                   # GITIGNORED — handoffs, daily notes, and reference/
│   └── reference/          # Private source docs (interview prep, resume PDF original)
├── astro.config.mjs        # includes redirects for old /about and /projects routes
├── tsconfig.json
└── package.json
```

## Design System

Single-page portfolio in the style of gagev.dev, re-themed: white paper, cool blue accents, clean bold sans headings, mono pill tags. Sections stack vertically on the home page; the top nav is anchor links plus a Resume tab.

### Fonts
- **Headings + body:** Archivo (variable). Base h1–h3 rule sets weight 650 — headings are bold sans (Instrument Serif was removed in the 2026-07 redesign; `--font-serif` now aliases Archivo)
- **Mono:** IBM Plex Mono (labels, dates, pills, code)

### Colors
Light and dark themes, both defined as CSS custom properties in `global.css` (`:root` = light, `.dark` = dark). Tailwind `@theme` tokens reference these vars, so utilities respond to the theme class at runtime.
- `paper` (#ffffff / #0f1419) — white / cool near-black background; `paper-alt` (#f4f7fa / #161d24)
- `ink` (#0f172a / #e2e8f0) — slate text
- `ink-muted` / `ink-faint` — secondary/tertiary text (slate grays)
- `accent` (#1a5c8a / #6aa8d4) — steel blue for links, highlights, pills
- `rule` (#e2e8f0 / #243040) — dividers

Theme toggle lives in the Header; a no-flash inline script in `BaseLayout` applies `.dark` before paint (localStorage, falls back to `prefers-color-scheme`).

### Key utilities
- `label` — mono uppercase annotation (section heads, kickers)
- `pill` — mono tag chip (`bg-accent-subtle`, hairline border, rounded-full); used for skills groups and project tech lists
- `.link-underline`, `.arrow-link`, `.section-head`, `.gallery`, `.photo-frame` — carried over from the previous design

### Motion system
- Hero: CSS-only staggered reveal (`.hero-mask`/`.hero-line`) + delayed fades (`.hero-fade`, `--d` custom property); ambient `.hero-glow` radial accent
- Scroll reveals: add `data-reveal` to any element; an `IntersectionObserver` script in `BaseLayout` fades it up on entry, auto-staggering siblings. Requires `html.js` (set by inline script) so no-JS visitors see content. Don't use `data-reveal` on utility pages like `/resume` — they should render instantly
- Page transitions: Astro `<ClientRouter />`; scripts re-init on `astro:page-load`, theme re-applies on `astro:after-swap`
- Header hides on scroll-down, reveals on scroll-up
- Everything respects `prefers-reduced-motion`

### Principles
- One page, top to bottom: who Chris is (hero + about merged — he doesn't want many tabs), what he works with (pill inventory), where he's worked, what he's built, how to reach him
- Projects render fully expanded with bold metric bullets — no disclosures, no clicks to see the work
- No template ornament: no grain overlay, custom cursors, magnetic hovers, marquees, or "(01)" section numbering — these read as AI-generated and were deliberately removed
- Motion is quiet and eased (`--ease-out-expo`), never blocking
- Copy stays professional — no forced-casual words (Chris vetoed "gnarly")
- Footer is conventional on purpose — professional personal sites end quietly

## Commands

```bash
npm run dev       # Dev server at http://localhost:4321
npm run build     # Production build to dist/
npm run preview   # Preview build locally
```

## Content Collections

### Writing (blog posts)
Create `src/content/writing/<slug>.md` with frontmatter:
```yaml
---
title: "Post Title"
description: "One-line summary."
date: 2026-07-06
tags: ["tag1", "tag2"]
draft: false
---
```

### Projects
Create `src/content/projects/<slug>.md` with frontmatter:
```yaml
---
title: "Project Name"
description: "What it does and why."
date: 2025-01-01
kicker: "Category · Subcategory"
tech: ["React", "TypeScript"]
url: "https://..."
github: "https://github.com/..."
featured: true
order: 1
---
```

All projects render expanded in the home page **Projects** section (sorted by `order`), each `<article>` carrying `id={slug}` so `/#slug` deep-links work (old `/projects#slug` links redirect). Project bodies are markdown with bold-metric bullets sourced from Chris's documented work — the private source doc lives in `docs/reference/bank-ops-interview-prep.html` (gitignored). Verify figures against their sources before changing them; the site is public.

**Project photos:** drop files in `public/images/projects/`, then list them in the project's frontmatter:
```yaml
images:
  - src: "/images/projects/field-app-gantt.jpg"
    alt: "Gantt schedule view on iPad"
    caption: "Schedule view in the field app"   # optional
```
Omit `images` entirely → placeholder frames render ("Photo coming soon"). Set `images: []` → no gallery section at all.

**Profile photo:** drop `public/images/profile.jpg` and the hero picks it up automatically (build-time `fs.existsSync` check in `index.astro`); until then a placeholder frame renders.

## Page structure

- Home (`/`) = hero (status dot, name, title, about paragraphs, photo slot, Email/LinkedIn/Resume links) → `#skills` (pill clusters: Microsoft stack, Engineering, Integrations, AI tooling, Practices) → `#experience` (flat entries with resume bullets + certs/education) → `#projects` (all projects expanded) → `#contact`
- Resume (`/resume`) = `<object>` PDF embed of `public/resume/Christopher-Morales-Resume.pdf` with download link and non-PDF-browser fallback
- Nav = `/#skills`, `/#experience`, `/#projects`, `/#contact`, `/resume` (anchor links hidden on mobile widths; Resume always visible)
- Redirects (astro.config): `/about` → `/`, `/projects` → `/#projects`
- Writing pages exist but are out of the nav; posts are all `draft: true` — Chris does not want generated articles published; he'll write his own. Drafts are excluded from routes, lists, and the sitemap
- Footer (all pages) = conventional: name, role/location, short availability line, email + LinkedIn links, copyright

## GitHub

Personal account: `moralchr`. This repo is separate from the Annapurna org.

## Deployment

Cloudflare Pages connected to the `moralchr/cmorales.me` GitHub repo.
- Build command: `npm run build`
- Output directory: `dist`
- Branch: `main`

## Notes Convention

Same pattern as annapurna-website (all under gitignored `docs/`):
- `docs/handoffs/chris/YYYY-MM-DD-HHmm.md` — session handoffs
- `docs/daily/chris/YYYY-MM-DD.md` — end-of-day summaries
- `docs/reference/` — private reference material (interview prep doc, original resume PDF)
