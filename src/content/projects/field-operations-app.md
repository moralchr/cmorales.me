---
title: "Field Operations App"
description: "A tablet-first app for field supervisors — crew management, daily logging, photo uploads, and Gantt scheduling, all with offline support."
date: 2025-03-01
kicker: "Power Platform · Field"
tech: ["React", "TypeScript", "CSS Modules", "Dataverse", "Power Automate", "SharePoint"]
featured: true
order: 2
---

Built a three-pane tablet-optimized app for field supervisors to manage their day without needing cell signal. The app handles crew assignments, daily log entries, schedule visualization, and photo documentation — all resilient to the spotty connectivity typical on construction sites.

### Key patterns

- **Three-pane layout** — left navigation, center list, right detail panel. Responsive down to phone screens but designed for iPad-sized tablets
- **Offline-first architecture** — in-memory queue captures writes when offline, flushes on reconnect with retry logic. Network status detection with timeout wrappers around SDK calls that hang indefinitely when connectivity drops
- **Photo upload pipeline** — photos queue as Dataverse records, picked up by a Power Automate flow that moves them to SharePoint document libraries organized by date and job
- **Custom Gantt chart** — SVG-based schedule visualization showing crew assignments across a timeline, with drag interaction for rescheduling
- **CSS Modules theming** — full light/dark mode support via CSS custom properties, no runtime theme switching overhead

### Offline challenge

The Power Apps SDK doesn't have built-in offline support. When the device loses signal, SDK calls hang forever — no timeout, no error. The solution was a timeout wrapper (`withTimeout`) around every SDK call plus an in-memory queue that captures failed writes and replays them when the network comes back.
