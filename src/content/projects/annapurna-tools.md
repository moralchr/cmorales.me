---
title: "Engineering Foundation"
description: "Implemented a monorepo of React/TypeScript apps on Power Platform, with the documentation vault in the same tree. The Obsidian vault links decisions, system docs, and handoffs, so the reasoning behind every choice stays findable."
date: 2025-01-01
kicker: "Architecture · Infrastructure"
tech: ["React 19", "TypeScript", "Vite", "Power Platform", "Dataverse", "GitHub Actions", "Obsidian", "Git"]
highlights:
  - "Monorepo of React SPAs deployed to Power Platform as Code Apps"
  - "Every app inherits one shared package for SDK setup, theming, and API resilience"
  - "CI gate in GitHub Actions runs typecheck, tests, and build on every change; branches merge on green"
  - "Docs vault beside the code: 27+ decision records, system docs, and session handoffs"
images:
  - src: "/images/projects/knowledge-base-graph.webp"
    alt: "Obsidian graph view of the knowledge base, hundreds of linked notes radiating from a central hub"
    caption: "Engineering knowledge base: decision log, systems docs, daily handoffs"
order: 1
---

Designed and built a monorepo architecture for a suite of line-of-business apps at a mid-size commercial construction company. Each app is a standalone React SPA deployed to Power Platform as a Code App, sharing a common utility package for SDK bootstrapping, theming, offline resilience, and Dataverse type coercion. The documentation vault lives in the same tree, so the record of *why* ships in the same commit as the *what*.

### Architecture

- **Monorepo with workspace dependencies**: shared package resolved at build time via Vite aliases, no separate build step
- **Shared utility package as the pattern library**: offline queue, timeout wrappers, type coercion, error extraction, so every new app inherits reliability instead of re-learning it
- **Automated quality gate**: every change runs typecheck, the full test suite, and a production build in GitHub Actions; merge happens only on green. The suite includes a schema-drift integration test and a data-source registration test that catch whole classes of silent failures
- **Dataverse foundation**: led a schema migration of **39K+ records** across legacy and new tables, resolving duplicate data and scaling limits while preserving relationships and validating production readiness

### The documentation vault

Documentation is bound to events, not intentions: an architecture choice triggers a numbered decision record (**27+ to date**), a hard debugging session triggers a postmortem, every working session ends with a handoff note recording state, next steps, and landmines.

- **Decision records**: one numbered file per architecture choice, with the context and the alternatives that were rejected, so the reasoning survives the decision
- **Postmortems with a cost signal**: each carries an hours-lost estimate, rolled up into a "Pain Index" that ranks defect classes by operational cost, so preventive work goes where the pain actually is
- **Session handoffs**: state, next steps, and known landmines at the end of every session, so picking work back up doesn't start from zero
- **Dense cross-linking**: notes reference each other, so the graph surfaces which decisions and systems are actually connected

Notes are plain Markdown; Obsidian provides the linking and the graph view over them, and the same VS Code workspace holds the code and the docs, so nothing is locked to a proprietary format.

### What made it interesting

Power Platform Code Apps are a relatively new capability, building production React apps on the platform means working within its SDK constraints while still writing modern TypeScript. The challenge was creating an architecture that feels like a normal React project but deploys to and integrates with the Power Platform ecosystem.
