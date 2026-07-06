---
title: "Project Management App"
description: "Unified PM tool for tracking contracts, budgets, change orders, T&M tickets, and subcontractor relationships across commercial construction projects."
date: 2025-06-01
kicker: "Power Platform · Office"
tech: ["React", "TypeScript", "Power Platform", "Dataverse", "DocuSign", "Power BI"]
featured: true
order: 3
---

A unified project management app that replaced a patchwork of spreadsheets, emails, and manual tracking for a commercial drywall and finishes contractor. Covers the full lifecycle of a construction project — from initial contract through daily field operations to final billing.

### Modules

- **Job dashboard** — central view of all active projects with status, financial summary, and team contacts
- **Budget tracking** — three-layer architecture (on-site budgets, internal change orders, labor budgets) that rolls up to a unified financial view
- **Change order workflow** — COR creation, revision tracking, approval status, conversion to executed change orders
- **T&M tickets** — time and materials documentation with labor and material line items
- **Subcontractor management** — contract tracking, insurance compliance, job assignments

### Three-layer budget architecture

The budget system uses three interconnected layers rather than a single flat budget table. On-site field budgets capture what's happening in the field. Internal change orders track scope changes that affect cost. Labor budgets break down the work by category. Each layer syncs upward so the PM sees a single rolled-up number, but the source data maintains its granularity for auditing and reporting.

### Subcontract issuance

A wizard walks coordinators through scoping a subcontract, then generates the actual Word contract document client-side in TypeScript (via the `docx` library) — no server round-trip, no template drift. A five-stage tracker follows the document through DocuSign signing, and compliance gating blocks issuance until the subcontractor has a current MSA, W-9, and certificate of insurance on file.

One platform constraint shaped this feature: Code Apps run under a strict Content Security Policy that blocks direct calls to external services, so documents route to SharePoint and DocuSign through Dataverse file columns and Power Automate flows — indirection imposed by the platform that turned a simple feature into a real design problem.
