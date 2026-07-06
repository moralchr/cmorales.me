---
title: "Financial Data Pipeline"
description: "Webhook-driven sync between QuickBooks Online and Dataverse — real-time financial mirrors powering dashboards and automated billing."
date: 2026-01-01
kicker: "Automation · Finance"
tech: ["Power Automate", "Dataverse", "QBO Webhooks", "CloudEvents", "Power BI"]
featured: false
order: 5
---

Designed a webhook-driven data pipeline that mirrors QuickBooks Online entities into Dataverse in near-real-time. The pipeline powers financial dashboards in Power BI and enables the PM app to show live cost and billing data alongside operational project data.

### Architecture

A single dispatcher flow receives QBO webhook events and routes them to entity-specific child flows — one each for customers, vendors, invoices, bills, purchase orders, estimates, and journal entries. Each child flow handles creates, updates, and deletes for its entity type, with line items and linked transactions managed as child records.

### CloudEvents migration

Migrated the webhook dispatcher from a legacy format to CloudEvents — a standardized envelope for event data. Built a shim layer so the new format could be processed alongside the old one during a parallel-run period. The migration was driven by a change in the accounting platform's webhook API, not an elective refactoring choice.

### Bridging financial and operational data

The trickiest part wasn't the sync itself but mapping financial entities to operational ones. The accounting system's "customers" don't map 1:1 to construction projects — older records use a three-level hierarchy (GC → sub-customer → project) while newer ones are flat. The resolver had to handle both shapes.
