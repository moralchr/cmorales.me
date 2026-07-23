---
title: "Project Management App"
description: "Internal tool for tracking contracts, budgets, change orders, T&M tickets, and subcontractor relationships across commercial construction projects."
date: 2025-06-01
kicker: "Power Platform · Office"
tech: ["React", "TypeScript", "Power Platform", "Dataverse", "Power Automate", "DocuSign", "Power BI"]
highlights:
  - "Job dashboard clicks through to every contract, COR, and budget record"
  - "Daily logs, crew hours, and T&M tickets flow in from the field app"
  - "Generates Word contracts client-side and integrates with DocuSign"
  - "Compliance blocks in place to ensure current MSA, W-9, and insurance"
collage:
  - { src: "/images/projects/new-pm-app1.webp", alt: "Project management app job overview" }
  - { src: "/images/projects/pa-flow1.webp", alt: "Power Automate flow driving the app" }
  - { src: "/images/projects/pa-flow2.webp", alt: "Power Automate flow detail" }
order: 3
---

A unified project management app that replaced a patchwork of spreadsheets, emails, and manual tracking for a commercial drywall and finishes contractor. Covers the full lifecycle of a construction project, from initial contract through daily field operations to final billing.

### Modules

- **Job dashboard**: central view of all active projects with status, financial summary, and team contacts
- **Budget tracking**: three-layer architecture (on-site budgets, internal change orders, labor budgets) that rolls up to a unified financial view while each layer keeps its granularity for auditing
- **Change order workflow**: COR creation, revision tracking, approval status, conversion to executed change orders
- **T&M tickets**: time and materials documentation with labor and material line items
- **Subcontractor management**: contract tracking, insurance compliance, job assignments

### Controls encoded in the system

- **Compliance gating on subcontract issuance**: the issuance wizard blocks until the subcontractor has a current master agreement, W-9, and certificate of insurance on file. A preventive control enforced in software at the point of action, not a policy memo
- **A cycle-time KPI the business didn't have**: days from "signed T&M ticket sent to the GC" to "change order request billed," with agreed amber (≥ 7 days) and red (≥ 14 days) thresholds surfaced in the app, so billing lag is monitored continuously instead of computed once for a slide

### Launched as a designed experiment

The T&M capture pilot launched with **five success metrics written into the spec before go-live**: review latency, PM adjustment rate, offline reliability, GC sign-off completion, invoice cycle time, a named pilot user trained from a checklist, an explicit one-week parallel run alongside the old spreadsheets, and a written rollback plan with a dated commit-or-extend decision.

### Subcontract issuance

A wizard walks coordinators through scoping a subcontract, then generates the actual Word contract document client-side in TypeScript (via the `docx` library), no server round-trip, no template drift. A five-stage tracker follows the document through DocuSign signing.

### Orchestration behind the app

Power Automate flows do the work the app can't do from the browser. Code Apps run under a strict Content Security Policy that blocks direct calls to external services, so documents route to SharePoint and DocuSign through Dataverse file columns and flows, indirection imposed by the platform that turned a simple feature into a real design problem. The flows follow a Try/Catch scope pattern: business steps wrapped in scopes, failures written back to the record itself, so a coordinator can see why a document didn't route without anyone opening flow run history. The same pattern carries COR dispatch to the GC.
