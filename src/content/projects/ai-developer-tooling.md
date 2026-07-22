---
title: "AI Tooling & Document Intelligence"
description: "Production AI features — document extraction, summarization, translation — plus custom MCP servers that give AI coding assistants direct access to the Microsoft enterprise stack."
date: 2026-05-01
kicker: "AI · Automation"
tech: ["AI Builder", "TypeScript", "MCP Protocol", "MSAL", "Microsoft Graph API", "Dataverse Web API"]
highlights:
  - "Insurance certificate and W-9 data extraction with strict JSON output"
  - "Spanish to English T&M ticket translation in production"
  - "Every AI output passes a human review gate before it becomes a record"
  - "MCP servers for Dataverse, SharePoint, Teams, and Power Automate"
order: 6
---

Two halves of the same discipline: AI features running in production business workflows, and AI tooling that accelerates how the platform itself gets built. Every production AI feature ships with three properties — structured output parsed deterministically, explicit error handling for malformed responses, and a human review gate before anything becomes a record.

### Production document AI

- **Insurance certificate extraction** — ACORD 25 certificates of insurance are processed by an AI Builder GPT flow using an ~80-line prompt that returns strict JSON (carrier, general-liability limits, effective/expiration dates, endorsement flags). Output goes through Parse JSON with run-after error handling for malformed responses, then supersession logic deactivates the prior certificate so only the current one is active. A parallel flow does W-9 extraction
- **AI daily-log summarization with a clarification loop** — the model drafts the field narrative from structured data, returns clarification questions when input is ambiguous, and the foreman approves before anything is finalized
- **Spanish→English T&M ticket translation** pipeline, live in production since July 2026
- **Prompts managed as versioned configuration** — model updates publish via the Dataverse Web API (`UnpublishAIConfiguration` → `PublishAIConfiguration`), so flows referencing the model by ID need no changes on republish

### Custom MCP servers

A set of Model Context Protocol servers connect AI coding assistants to the enterprise stack, so the assistant queries live systems instead of guessing:

- **Dataverse MCP** — query tables, describe schema, create/update records, run search. The AI inspects live table structure before writing service code, eliminating schema guesswork
- **SharePoint MCP** — list libraries and folders, search files, get metadata
- **Teams MCP** — find teams by project ID, list channels and members
- **Power Automate MCP** — list, read, create, update, and toggle cloud flows through the API rather than the visual designer

Each server authenticates with MSAL device-code flow and caches tokens locally, configured via the repo's `.mcp.json` so they activate automatically when a developer opens the project.
