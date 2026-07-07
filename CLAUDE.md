# cmorales.me — Personal Site

## What This Is

Chris Morales's personal website — portfolio, blog/notes, about page. Deployed to Cloudflare Pages at `https://cmorales.me`.

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
│   │   ├── index.astro     # Home — hero + selected work + recent writing
│   │   ├── about.astro     # Bio and contact
│   │   ├── projects.astro  # All projects from content collection
│   │   ├── writing/        # Blog index + dynamic [slug] routes
│   │   └── 404.astro
│   ├── content/            # Content collection source files
│   │   ├── writing/        # Blog posts (Markdown)
│   │   └── projects/       # Project case studies (Markdown)
│   ├── content.config.ts   # Collection schemas (Zod)
│   └── styles/
│       └── global.css      # Tailwind theme + typography + utilities
├── public/                 # Static assets (images, robots.txt)
├── docs/                   # Handoffs and daily notes (same as annapurna-website)
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Design System

Editorial-technical hybrid: a big Instrument Serif hero and page titles over an information-dense body — flat index rows, heavy ink rules under section heads, hairlines between rows, mono uppercase annotations (`label` utility). The footer is deliberately conventional (name, contact links, copyright): Chris rejected both a marquee CTA and a construction-drawing title block there. No sheet-number conceit anywhere.

### Fonts
- **Display (serif):** Instrument Serif — hero name, page h1s, header wordmark, footer name. Always pair `font-serif font-normal` (it only ships weight 400; the base h1–h3 rule sets 500 for Archivo)
- **Interface + body:** Archivo (variable: weight + width)
- **Mono:** IBM Plex Mono (labels, dates, code)

### Colors
Light and dark themes, both defined as CSS custom properties in `global.css` (`:root` = light, `.dark` = dark). Tailwind `@theme` tokens reference these vars, so utilities respond to the theme class at runtime.
- `paper` (#f8f7f4 / #151312) — warm off-white / warm near-black background
- `ink` (#1c1917 / #ece9e4) — text
- `ink-muted` / `ink-faint` — secondary/tertiary text
- `accent` (#b45309 / #e8853d) — warm amber for links, highlights
- `rule` (#e7e5e4 / #2b2724) — dividers

Theme toggle lives in the Header; a no-flash inline script in `BaseLayout` applies `.dark` before paint (localStorage, falls back to `prefers-color-scheme`).

### Motion system
- Hero: CSS-only staggered line reveal (`.hero-mask`/`.hero-line`) + delayed fades (`.hero-fade`, `--d` custom property); ambient `.hero-glow` radial accent + scroll cue
- Scroll reveals: add `data-reveal` to any element; an `IntersectionObserver` script in `BaseLayout` fades it up on entry, auto-staggering siblings. Requires `html.js` (set by inline script) so no-JS visitors see content
- Page transitions: Astro `<ClientRouter />`; scripts re-init on `astro:page-load`, theme re-applies on `astro:after-swap`
- Micro-interactions: `.link-underline` (animated underline), `.arrow-link`/`.arrow` (used sparingly), `.index-row` hover draws a 2px accent tick in the page margin, header hides on scroll-down/reveals on scroll-up
- Everything respects `prefers-reduced-motion`

### Principles
- Big serif name hero for the first impression; the systems index follows immediately — one scroll from name to work, flat rows, no clicks
- Rule hierarchy carries structure: heavy ink rules for section heads, hairline `rule` color between rows
- No template ornament: no grain overlay, custom cursors, magnetic hovers, marquees, or "(01)" section numbering — these read as AI-generated and were deliberately removed
- No cards, no rounded containers
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
tech: ["React", "TypeScript"]
url: "https://..."
github: "https://github.com/..."
featured: true
order: 1
---
```

The home-page **Systems** index lists *all* projects (sorted by `order`), each row deep-linking to `/projects#slug`. The `featured` flag is currently unused by the layout but kept in the schema.

**Project photos:** drop files in `public/images/projects/`, then list them in the project's frontmatter:
```yaml
images:
  - src: "/images/projects/field-app-gantt.jpg"
    alt: "Gantt schedule view on iPad"
    caption: "Schedule view in the field app"   # optional
```
Omit `images` entirely → placeholder frames render ("Photo coming soon"). Set `images: []` → no gallery section at all.

## Page structure

- Home = full-viewport serif name hero → **Systems** (all projects, flat rows, no disclosure) → **Experience** (one-line `<details>` per employer, bullets inside) → **Writing** (recent posts; section auto-hides while all posts are drafts)
- Projects = one expandable `<details>` row per project (summary: title/kicker/description; body: tech, prose, photo gallery). Deep links `#project-id` auto-open via script
- About = bio + toolbox + contact (experience lives on home, not here)
- Footer (all pages) = conventional: serif name, role/location, short availability line, email + LinkedIn links, copyright
- Writing posts are all `draft: true` — Chris does not want generated articles published; he'll write his own. Drafts are excluded from routes, lists, and the sitemap

## GitHub

Personal account: `moralchr`. This repo is separate from the Annapurna org.

## Deployment

Cloudflare Pages connected to the `moralchr/cmorales.me` GitHub repo.
- Build command: `npm run build`
- Output directory: `dist`
- Branch: `main`

## Notes Convention

Same pattern as annapurna-website:
- `docs/handoffs/chris/YYYY-MM-DD-HHmm.md` — session handoffs
- `docs/daily/chris/YYYY-MM-DD.md` — end-of-day summaries
