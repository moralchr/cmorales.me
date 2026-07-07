---
title: "Building This Site"
description: "Astro 6, Tailwind v4, Cloudflare Pages — and the two dependency bugs that broke the first three deploys."
date: 2026-07-06
tags: ["astro", "web", "deployment"]
draft: true
---

This site is intentionally boring infrastructure: Astro 6 with static output, Tailwind CSS v4, Markdown content collections, deployed to Cloudflare Pages on every push to `main`. No SSR, no framework runtime, no database. A personal site is mostly text; the stack should get out of the way of the text.

The design is typography-first — an Instrument Serif display layer over Archivo, with IBM Plex Mono annotations on a warm paper-and-ink palette. The motion layer (staggered hero reveal, scroll-triggered fades) is CSS and a few dozen lines of vanilla JS with `IntersectionObserver`. No animation library; `prefers-reduced-motion` turns all of it off.

Getting the first deploy green was the interesting part. Two dependency bugs, neither of them in my code:

## Two Vites, one build

`astro build` failed with `Missing field 'tsconfigPaths' on BindingViteResolvePluginConfig.resolveOptions` — deep in native bundler bindings. The cause: Astro pinned Vite 7, but `@tailwindcss/vite` resolved Vite 8 (the new Rolldown-based one). Both ended up in `node_modules`, and the Tailwind plugin passed Vite 7-shaped config into Vite 8's native binding, which rejected it.

The fix is one npm `overrides` entry forcing a single Vite major across the tree:

```json
"overrides": {
  "vite": "^7.3.6"
}
```

## The lockfile that only worked on Windows

With the build fixed locally, Cloudflare still failed — `npm ci` refused to install because `@emnapi/runtime` and `@emnapi/core` were "missing from lock file." Those are WASM-side helpers for native binaries that Windows never needs, and npm has a long-standing bug where a lockfile regenerated on one platform can silently drop another platform's optional dependencies.

Local builds passed (Windows never asks for them); Cloudflare's Linux builder did and found holes in the lockfile. Fix: delete `node_modules` and `package-lock.json`, one clean `npm install`, commit the result.

Both failures shared a lesson: the build that matters is the one that runs on someone else's machine.
