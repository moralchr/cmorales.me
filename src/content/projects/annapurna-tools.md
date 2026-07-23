---
title: "Internal Tools Platform"
description: "A monorepo of React/TypeScript apps on Microsoft Power Platform: shared component library, automated CI, and Dataverse integration for a commercial construction company."
date: 2025-01-01
kicker: "Power Platform · Architecture"
tech: ["React 19", "TypeScript", "Vite", "Power Platform", "Dataverse", "Vitest", "GitHub Actions"]
highlights:
  - "Monorepo of React SPAs deployed to Power Platform as Code Apps"
  - "Shared package: offline queue, timeout wrappers, Dataverse type coercion"
  - "CI gate runs typecheck, tests, and build on every change; merge on green"
  - "39K+ record schema migration across legacy and new tables"
order: 1
---

Designed and built a monorepo architecture for a suite of line-of-business apps at a mid-size commercial construction company. Each app is a standalone React SPA deployed to Power Platform as a Code App, sharing a common utility package for SDK bootstrapping, theming, offline resilience, and Dataverse type coercion.

### Architecture

- **Monorepo with workspace dependencies**: shared package resolved at build time via Vite aliases, no separate build step
- **Shared utility package as the pattern library**: offline queue, timeout wrappers, type coercion, error extraction, so every new app inherits reliability instead of re-learning it
- **Automated quality gate**: every change runs typecheck, the full test suite, and a production build; merge happens only on green. The suite includes a schema-drift integration test and a data-source registration test that catch whole classes of silent failures
- **Dataverse foundation**: led a schema migration of **39K+ records** across legacy and new tables, resolving duplicate data and scaling limits while preserving relationships and validating production readiness

### Knowledge base as infrastructure

Documentation is bound to events, not intentions: a hard debugging session triggers a postmortem, an architecture choice triggers a decision record (**27+ numbered decision records to date**), every working session ends with a handoff note recording state, next steps, and landmines. Postmortems carry an hours-lost estimate, rolled up into a "Pain Index" that ranks defect classes by operational cost, so preventive work goes where the pain actually is.

### What made it interesting

Power Platform Code Apps are a relatively new capability, building production React apps on the platform means working within its SDK constraints while still writing modern TypeScript. The challenge was creating an architecture that feels like a normal React project but deploys to and integrates with the Power Platform ecosystem.
