---
title: "Integration Backend"
description: "An Azure Functions layer (~25 functions) keeping QuickBooks, DocuSign, timekeeping, and procurement in sync with the operational platform — built for idempotency and drift detection."
date: 2025-12-01
kicker: "Azure · Integrations"
tech: ["TypeScript", "Azure Functions", "Bicep", "Key Vault", "Service Bus", "QuickBooks API", "DocuSign API", "SharePoint"]
featured: false
order: 4
---

The connective tissue of the platform: a TypeScript Azure Functions app (~25 functions) that moves data between the operational system and the tools the business already runs on — QuickBooks Online for accounting, DocuSign for signatures, QuickBooks Time for payroll hours, and Kojo for material procurement.

The core of it is the **QuickBooks Online sync**. Accounting data has to reconcile exactly, so the sync is bidirectional and defensive: webhook-driven updates, idempotent writers so retries can't double-post, a drift detector that compares systems and flags divergence, and an audit trail for every mutation. QBO stays the financial source of truth; the platform never overwrites it blindly.

### Documents and signatures

- **DocuSign envelopes tracked through a five-stage lifecycle** from generation to executed record
- T&M ticket PDFs assembled with `pdf-lib`, lien waiver overlays, and change order package assembly
- HMAC-signed intake links let subcontractors submit onboarding paperwork through a public form without an account

### Records architecture, provisioned by automation

- **Two-site SharePoint model** separating formal project documents (contracts, change orders — the auditable record) from high-volume field uploads (daily photos, ticket attachments) — different audiences, retention needs, and access patterns, separated structurally
- **Project folder structures, the Teams team, and its channels are created by a provisioning flow**, with the folder URL written back to the system of record — structure is consistent because no human builds it
- Solved and documented the URL-encoding failure where folder names containing `#`, `&`, or `%` silently produce broken stored links (the connector returns a site-relative path that must be percent-encoded in the right order, `%` first)

The whole thing is infrastructure-as-code with Bicep: Key Vault for secrets, Service Bus for queued work, OpenTelemetry into Application Insights for tracing. Contract tests replay recorded HTTP against the third-party APIs, and a schema-drift test fails the build if Dataverse changes underneath the code.
