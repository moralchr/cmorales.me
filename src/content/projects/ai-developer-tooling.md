---
title: "AI Developer Tooling"
description: "Custom MCP servers that give AI coding assistants direct access to Dataverse, SharePoint, Teams, and Power Automate — turning enterprise systems into AI-accessible tools."
date: 2026-05-01
kicker: "Developer Tooling · AI"
tech: ["TypeScript", "MCP Protocol", "MSAL", "Microsoft Graph API", "Dataverse Web API"]
featured: false
order: 6
---

Built a set of custom Model Context Protocol (MCP) servers that connect AI coding assistants to the Microsoft enterprise stack. Instead of manually looking up schema definitions, checking SharePoint for documents, or navigating the Power Automate designer, the AI assistant can query these systems directly through structured tool calls.

### Servers

- **Dataverse MCP** — query tables, describe schema, create/update/delete records, run search. The AI can inspect live table structure before writing service code, eliminating schema guesswork
- **SharePoint MCP** — list libraries and folders, search files, get file metadata. Useful for understanding document organization and finding reference files
- **Teams MCP** — find teams by project ID, list channels and members. Enables the AI to understand team structure when building notification flows
- **Power Automate MCP** — list, read, create, update, toggle, and delete cloud flows. The AI can inspect existing automation and create new flows through the API rather than the visual designer

### Authentication pattern

Each server uses MSAL (Microsoft Authentication Library) with device code flow for initial setup, then caches tokens locally. The servers are configured via the repo's `.mcp.json` so they activate automatically when a developer opens the project — no per-session setup after the initial auth.

### Impact on development

The biggest win is schema accuracy. Before the Dataverse MCP server, writing service code meant guessing at column names and types, then fixing errors after deployment. Now the AI reads the live schema before writing a single line, and the code is correct on the first push.
