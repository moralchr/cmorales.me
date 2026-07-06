---
title: "Internal Tools Platform"
description: "A monorepo of React/TypeScript apps on Microsoft Power Platform — shared component library, automated CI, and Dataverse integration for a commercial construction company."
date: 2025-01-01
kicker: "Power Platform · Architecture"
tech: ["React 19", "TypeScript", "Vite", "Power Platform", "Dataverse", "Vitest", "GitHub Actions"]
featured: true
order: 1
---

Designed and built a monorepo architecture for a suite of line-of-business apps at a mid-size commercial construction company. Each app is a standalone React SPA deployed to Power Platform as a Code App, sharing a common utility package for SDK bootstrapping, theming, offline resilience, and Dataverse type coercion.

### Architecture

- **Monorepo with workspace dependencies** — shared package resolved at build time via Vite aliases, no separate build step
- **Automated quality gate** — GitHub Actions workflow runs typecheck, tests, and build on every push; auto-merges to main on green
- **Dataverse integration layer** — type coercion helpers for the all-strings SDK, GUID normalization, OData filter builders, and a two-tier availability pattern with mock fallback for local development
- **Git-managed security roles** — JSON specs checked into the repo, diffed and applied to Dataverse via a reconciler script

### What made it interesting

Power Platform Code Apps are a relatively new capability — building production React apps on the platform means working within its SDK constraints while still writing modern TypeScript. The challenge was creating an architecture that feels like a normal React project but deploys to and integrates with the Power Platform ecosystem.
