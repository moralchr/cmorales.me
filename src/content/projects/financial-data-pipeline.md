---
title: "Financial Data Pipeline"
description: "Webhook-driven sync between QuickBooks Online and Dataverse, real-time financial mirrors powering dashboards and automated billing."
date: 2026-01-01
kicker: "Automation · Finance"
tech: ["Power Automate", "Dataverse", "QBO Webhooks", "CloudEvents", "Power BI", "Power Query"]
highlights:
  - "QuickBooks webhooks routed through a dispatcher to 12 entity child flows"
  - "Handlers are idempotent and tolerate out-of-order events"
  - "Migrated to CloudEvents with a parallel run before cutover"
  - "Feeds Power BI dashboards and live job cost data in the PM app"
images:
  - src: "/images/projects/dataverse-qbo-mirror.webp"
    alt: "Dataverse table designer showing the QBO mirror tables and columns"
order: 5
---

Designed a webhook-driven data pipeline that mirrors QuickBooks Online entities into Dataverse in near-real-time. The pipeline powers financial dashboards in Power BI and lets the PM app show live cost and billing data alongside operational project data.

### Architecture

- **A single HTTP-triggered dispatcher flow routes QBO webhook events to 12 entity-specific child flows**: customers, vendors, invoices, bills, purchase orders, estimates, journal entries, and more, plus dedicated delete and void handlers
- **Designed for failure first**: handlers are idempotent (upsert by external ID, because webhooks fire more than once), tolerate out-of-order events (retry when a line item arrives before its parent), and ignore unknown fields so upstream schema drift doesn't break the pipeline
- **Try/Catch error architecture**: business steps wrapped in Scopes with catch scopes writing failures back to the record itself, so support can see why a sync failed without opening flow run history
- **Estate-level governance**: audited the full environment (**55 flows** at last count) with triggers, states, and connection ownership mapped; connections migrated to service accounts so automations survive personnel changes

### CloudEvents migration

Led a live migration of the dispatcher to the CloudEvents envelope format using a shim layer and a **parallel-run cutover with a documented decommission date**: both formats processed side by side until the old one was retired.

### Reconciliation finds

Never trust a rollup you haven't reconciled against the source of record:

- Found **$2.9M in costs that had lost project attribution** during a data-source migration, traced the root cause in the M/DAX bridge logic, and fixed it
- Identified and fixed **~1,479 mis-priced legacy rows** in a pricing cleanup
- Diagnosed a silent gap where "print later" bill payments never surfaced in the changes feed, shipped a re-sync fix, backfilled **25 bills** whose paid-status had drifted, and documented the failure mode so it's institutional knowledge

The trickiest ongoing problem is entity mapping: the accounting system's customers don't map 1:1 to construction projects, older records use a three-level hierarchy (GC → sub-customer → project) while newer ones are flat, and the resolver handles both shapes so rollups don't double-count.
