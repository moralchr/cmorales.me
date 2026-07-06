---
title: "Webhook-Driven Data Pipelines"
description: "Lessons from syncing an accounting platform into a CRM via webhooks, Power Automate, and a lot of entity mapping."
date: 2026-05-20
tags: ["data", "power-automate", "integration"]
draft: false
---

Syncing data between two systems that weren't designed to talk to each other is a solved problem in theory and a mess in practice. Here's what I learned building a pipeline that mirrors an accounting platform's data into a CRM in near-real-time.

## Architecture: dispatcher + child flows

A single HTTP-triggered flow receives webhook events. It inspects the event type and routes to one of twelve entity-specific child flows — one each for customers, vendors, invoices, bills, and so on. Each child handles creates, updates, and deletes for its entity, managing line items and linked transactions as child records.

The dispatcher pattern keeps each child flow focused and testable. When something breaks with invoice sync, you're debugging one flow, not a monolith.

## The hard part: entity mapping

The accounting system's "customers" don't map 1:1 to the CRM's "projects." Older records use a three-level hierarchy (parent company → sub-customer → project) while newer ones are flat (parent → project). The sync had to handle both shapes, walk parent references to find related records, and avoid double-counting in financial rollups.

## CloudEvents migration

Halfway through, the webhook provider changed their event format. Instead of a big-bang migration, I built a shim layer that normalizes both formats into a common shape, ran both in parallel for a transition period, then cut over. The lesson: always normalize webhook payloads at the edge before your business logic sees them.

## What catches you off guard

**Idempotency.** Webhooks fire more than once. Every handler has to be safe to replay. Upsert-by-external-ID instead of blind creates.

**Ordering.** Events arrive out of order. A line item update can arrive before the parent invoice create. The child flows handle this with retry — if the parent doesn't exist yet, wait and try again.

**Schema drift.** The accounting platform adds fields without notice. The pipeline ignores unknown fields rather than failing on them.
