---
title: "Field Operations App"
description: "A tablet-first app for field supervisors — crew management, daily logging, photo uploads, and Gantt scheduling, all with offline support."
date: 2025-03-01
kicker: "Power Platform · Field"
tech: ["React", "TypeScript", "CSS Modules", "Dataverse", "Power Automate", "AI Builder", "SharePoint"]
featured: true
order: 2
---

Built a three-pane tablet-optimized app for field supervisors to manage their day without needing cell signal. The app handles crew assignments, daily log entries, schedule visualization, and photo documentation — all resilient to the spotty connectivity typical on construction sites.

### Measured redesign

- **Baseline before building** — measured the current state in the user's own units: a typical day's manpower entry took **~65 taps** (13 taps × 5 crew entries). That number became the shared acceptance criterion with the process owner
- **65 taps → 3–8** for daily manpower entry after the redesign; "who's on site" went from 3 taps to 0, photo capture from 4–5 taps to 2–3, submission from 3–4 to 2
- **12 numbered improvement items** came out of a live field review with a superintendent — each triaged straight into the backlog
- Shipped to a pilot group of foremen with **251 automated tests passing**, each trained from a written Day-1 field guide with its own troubleshooting table and escalation path

### Key patterns

- **Offline-first architecture** — in-memory queue captures writes when offline, flushes on reconnect with retry logic. The Power Apps SDK has no built-in offline support and its calls hang forever without signal, so every call is wrapped in a timeout (`withTimeout`) with queued replay
- **AI daily-log narrative** — an AI Builder prompt drafts the day's narrative from structured log data; when input is ambiguous the model returns clarification questions the app surfaces to the foreman before finalizing. The human approves; the AI drafts
- **Adoption monitored behaviorally** — a reminder flow flags unsubmitted daily logs at 3pm to the foreman and escalates at 5pm to the production manager, cross-checked against time-clock data — so "is the team actually using it" is a report, not a feeling
- **Photo upload pipeline** — photos queue as Dataverse records, picked up by a Power Automate flow that files them into SharePoint libraries organized by date and job
- **Custom Gantt chart** — SVG-based schedule visualization showing crew assignments across a timeline, with drag interaction for rescheduling
