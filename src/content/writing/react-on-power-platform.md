---
title: "Building React Apps on Power Platform"
description: "What it's like writing production TypeScript on Microsoft's low-code platform — the good, the weird, and the workarounds."
date: 2026-06-15
tags: ["react", "power-platform", "typescript"]
draft: false
---

Power Platform Code Apps let you write standalone React SPAs that deploy to Power Platform and talk to Dataverse through a provided SDK. It's a relatively new capability and the developer experience has sharp edges.

## The good

You get a real React project — Vite, TypeScript, npm, whatever libraries you want. The SDK provides typed access to Dataverse tables. Deployment is a single `push` command. Your app runs inside Power Platform's security model, so authentication and authorization are handled.

## The weird

**Every Dataverse field comes back as a string.** Numbers, booleans, dates, GUIDs — all strings. You need a coercion layer (`num()`, `int()`, `bool()`, `guid()`) between the SDK and your business logic, or you'll get silent type bugs everywhere.

**GUIDs are case-sensitive in unexpected ways.** The SDK returns uppercase GUIDs but OData filters expect lowercase. A lookup that works in the admin UI fails in code because the casing doesn't match. Normalizing with `guid()` on every comparison is non-negotiable.

**The local dev experience has a gap.** The SDK's `LocalPlay` mode gives you a browser preview, but data sources aren't available until you've pushed at least once. First-time setup requires a deploy-then-dev cycle that's unintuitive.

**Schema JSON controls what gets written.** The SDK uses `.power/schemas/` JSON files to decide which fields to include in create/update calls. If a field isn't in the schema file, it's silently dropped on writes. No error, no warning — just missing data.

## The workaround pattern

For local development, I built a two-tier availability system: the app tries the SDK first, and if it's not available (local dev without connectivity), it falls back to mock data. This means the app always renders something, and you can develop UI without a live Dataverse connection.

## Would I recommend it?

For internal tools at a company already on Microsoft 365 — yes. The security model, deployment pipeline, and Dataverse integration save a lot of infrastructure work you'd otherwise build yourself. For anything else, probably not.
