# cmorales.me — Personal Site

## What This Is

Chris Morales's personal site — a viewport-locked "deck" in the style of gagev.dev: the page never scrolls vertically; wheel/swipe/keys snap between full-screen sections, and projects slide horizontally within their section. Plus a /resume page embedding the PDF. Deployed to Cloudflare Pages at `https://cmorales.me`. Public — no gate, no noindex.

**No header bar** — Chris rejected it as clashing with the design. The only chrome is a fixed top-right corner cluster (Resume/Home link + theme toggle) rendered by BaseLayout, plus the deck's own dots and slide arrows.

## Tech Stack

- **Framework:** Astro 6 (static output, no SSR, no ClientRouter — plain page loads)
- **Styling:** Tailwind CSS v4 via Vite plugin
- **Deployment:** Cloudflare Pages (GitHub → auto-deploy on push to `main`)
- **Content:** Astro content collections (Markdown in `src/content/`)
- **TypeScript:** Strict mode

## Structure

```
cmorales.me/
├── src/
│   ├── layouts/BaseLayout.astro  # Head, fonts, no-flash theme script, corner controls
│   ├── pages/
│   │   ├── index.astro           # The deck: intro / projects slider / background + all deck JS
│   │   ├── resume.astro          # PDF embed + download
│   │   └── 404.astro
│   ├── content/
│   │   ├── projects/             # 7 project files (frontmatter drives the slides)
│   │   └── writing/              # Draft posts kept for the future — NO routes render them
│   ├── content.config.ts         # Zod schemas
│   └── styles/global.css         # Tokens, pill/label utilities, deck styles
├── public/
│   ├── images/projects/          # Slide photos
│   └── resume/                   # Christopher-Morales-Resume.pdf (deployed copy)
├── docs/                         # GITIGNORED — handoffs, daily notes, reference/
│   └── reference/                # Private: interview-prep doc, original resume PDF
└── astro.config.mjs              # redirects: /about → /, /projects → /#projects
```

## The Deck

Three screens in `index.astro`: `#intro` (name, one-liner, tools pills, Email/LinkedIn links), `#projects` (horizontal slides, one project each), `#background` (career timeline + certs + ©). Contact info lives on the intro screen — don't add a screen that repeats it. All deck behavior is one inline `<script>` in `index.astro`:

- Wheel accumulates deltas (threshold 30) with a 700ms lock so trackpad inertia doesn't skip screens; touch swipes (horizontal = slides when on projects, vertical = screens); arrow keys/PageUp/PageDown/Home/End
- Inside the projects screen, the gesture advances slides until they run out, then the deck moves to the next screen (gagev.dev behavior)
- `history.replaceState` keeps the hash in sync; `/#projects`, `/#background`, and `/#<project-id>` deep links jump on load
- Screen dots (fixed right), slide counter + arrow buttons (bottom center)
- CSS: `html.js body:has(.deck-viewport) { overflow: hidden }`, screens move via `translateY`, slides via `translateX`. **No-JS fallback:** without `html.js` the sections stack and scroll normally
- `prefers-reduced-motion` kills the transitions (navigation becomes instant)
- Content must FIT each screen — Chris explicitly wants zero vertical scrolling. If content grows, shrink it (fewer bullets, smaller type). `.slide-media` hides below 620px viewport height

## Design System

White paper + cool steel-blue accent; near-black cool dark variant behind the corner toggle (class `.dark`, no-flash inline script in BaseLayout, localStorage + `prefers-color-scheme` fallback). **Theme switches run through `document.startViewTransition`** so the whole page crossfades instead of cutting — keep that wrapper if the toggle handler moves. All colors are `--c-*` vars in `global.css` mapped through `@theme`.

- `paper` #ffffff / #0f1419 · `ink` #0f172a / #e2e8f0 · `accent` #1a5c8a / #6aa8d4 · `rule` #e2e8f0 / #243040
- **Fonts:** Archivo everything (h1–h3 weight 650); IBM Plex Mono for `label` and `pill` utilities. No serif.
- Utilities: `label` (mono uppercase), `pill` (mono tag chip), `.link-underline`, `.hero-*` intro entrance, `.photo-frame`, deck classes (`.deck-*`, `.slides`, `.slide-*`)

### Copy rules (important)
- **Bare facts only.** Chris flagged earlier copy as sounding AI-written. No hook lines, no rule-of-three flourishes, no "X doesn't forgive Y" constructions. Short factual statements.
- **No job-seeker signals.** No "open to opportunities" badges or recruiting framing. It's a personal site that happens to have a resume page.
- No template ornament (grain, cursors, marquees, section numbering). No forced-casual slang ("gnarly" was vetoed).
- Don't write blog posts for him. Drafts in `src/content/writing/` stay drafts; no routes render them.

## Content Collections

### Projects (drives the deck slides)
```yaml
---
title: "Project Name"
description: "One or two factual sentences."   # shown on the slide
date: 2025-01-01
kicker: "Category · Subcategory"
tech: ["React", "TypeScript"]                  # pills on the slide
highlights:                                     # 3-4 bare-fact bullets on the slide
  - "What it does, stated plainly"
images:                                         # slide shows the FIRST image only
  - src: "/images/projects/shot.jpg"
    alt: "Description"
url: "https://..."                              # optional (not currently rendered)
order: 1
---
Longer markdown body — NOT rendered anywhere right now; kept for a
possible future detail view.
```
Omit `images` → "Photo coming soon" frame renders on the slide.

**Profile photo:** not currently in the layout (intro screen is text-only).

## Commands

```bash
npm run dev       # Dev server at http://localhost:4321
npm run build     # Production build to dist/
npm run preview   # Preview build locally
```

Headless screenshot tip: `msedge --headless --screenshot=... --virtual-time-budget=4000 --force-prefers-reduced-motion <url>` gives settled deck states; widths below ~500px get clamped by Edge's minimum window size (not a layout bug).

## GitHub / Deployment

Personal account `moralchr` (separate from the Annapurna org). Cloudflare Pages builds `npm run build` → `dist` on push to `main`.

## Notes Convention

All under gitignored `docs/`:
- `docs/handoffs/chris/YYYY-MM-DD-HHmm.md` — session handoffs
- `docs/daily/chris/YYYY-MM-DD.md` — end-of-day summaries
- `docs/reference/` — private reference material
