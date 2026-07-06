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

### Fonts
- **Display:** Instrument Serif (headings — elegant, warm, distinctive)
- **Body:** Space Grotesk (clean geometric sans-serif)
- **Mono:** JetBrains Mono (code blocks, metadata labels)

### Colors
- `paper` (#f8f7f4) — warm off-white background
- `ink` (#1c1917) — warm black text
- `ink-muted` (#78716c) — secondary text
- `ink-faint` (#a8a29e) — tertiary/metadata
- `accent` (#b45309) — warm amber for links, highlights
- `rule` (#e7e5e4) — dividers

### Principles
- Typography IS the design — large confident headings, generous whitespace
- No cards, no rounded containers, no gradients
- Thin rules (not dashed) to separate content
- Asymmetric layouts — not everything centered
- Content-first — the text and spacing do the work

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

Set `featured: true` to show on the home page. `order` controls home page sort.

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
