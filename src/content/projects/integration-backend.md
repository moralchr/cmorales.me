---
title: "Integration Backend"
description: "A TypeScript Azure Functions backend (~25 functions) connecting accounting, signatures, timekeeping, and procurement to the operational platform, built with infrastructure as code, tracing, and contract tests."
date: 2025-12-01
kicker: "Azure · Integrations"
tech: ["TypeScript", "Azure Functions", "Bicep", "Key Vault", "Service Bus", "Application Insights", "QuickBooks API", "DocuSign API", "SharePoint"]
highlights:
  - "Syncs to QuickBooks Online, DocuSign, QuickBooks Time, and Kojo"
  - "Infrastructure as code with Bicep; secrets in Key Vault, queued work in Service Bus"
  - "OpenTelemetry tracing into Application Insights"
  - "Contract tests replay recorded HTTP; schema-drift test fails the build"
images:
  - src: "/images/projects/azure-app-insight.webp"
    alt: "Azure Application Insights application map showing the integration backend's dependency graph and call latencies"
order: 4
---

The connective tissue of the platform: a TypeScript Azure Functions app (~25 functions) that moves data between the operational system and the tools the business already runs on, QuickBooks Online for accounting, DocuSign for signatures, QuickBooks Time for payroll hours, and Kojo for material procurement.

The busiest integration is QuickBooks Online: bidirectional, webhook-driven, and defensive, with QBO staying the financial source of truth. The pipeline itself is its own project; this layer is the engineering around it.

### Documents and signatures

- **DocuSign envelopes tracked through a five-stage lifecycle** from generation to executed record
- T&M ticket PDFs assembled with `pdf-lib`, lien waiver overlays, and change order package assembly
- HMAC-signed intake links let subcontractors submit onboarding paperwork through a public form without an account

### Records architecture, provisioned by automation

- **Two-site SharePoint model** separating formal project documents (contracts, change orders, the auditable record) from high-volume field uploads (daily photos, ticket attachments), different audiences, retention needs, and access patterns, separated structurally
- **Project folder structures, the Teams team, and its channels are created by a provisioning flow**, with the folder URL written back to the system of record, structure is consistent because no human builds it
- Solved and documented the URL-encoding failure where folder names containing `#`, `&`, or `%` silently produce broken stored links (the connector returns a site-relative path that must be percent-encoded in the right order, `%` first)

The whole thing is infrastructure-as-code with Bicep: Key Vault for secrets, Service Bus for queued work, OpenTelemetry into Application Insights for tracing. Contract tests replay recorded HTTP against the third-party APIs, and a schema-drift test fails the build if Dataverse changes underneath the code.
