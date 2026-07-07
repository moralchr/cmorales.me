---
title: "MCP Servers for Enterprise Systems"
description: "Building custom Model Context Protocol servers that connect AI coding assistants to Dataverse, SharePoint, Teams, and Power Automate."
date: 2026-06-01
tags: ["ai", "mcp", "developer-tools"]
draft: true
---

The Model Context Protocol (MCP) is a standard for connecting AI assistants to external tools. Instead of the AI guessing at API shapes or asking you to paste data, it can query systems directly through structured tool calls.

I built four MCP servers that connect to the Microsoft enterprise stack. Here's what that looks like in practice and why it matters.

## What each server does

**Dataverse** — the most impactful one. The AI can describe table schemas, query records, and inspect live data. Before writing service code, it reads the actual column names, types, and relationships. This eliminated an entire class of bugs where field names were guessed wrong.

**SharePoint** — list libraries, browse folders, search files. When the AI needs to understand how documents are organized or find a reference file, it searches SharePoint instead of asking me to navigate the UI and paste paths.

**Teams** — find teams by project ID, list channels and members. This is useful when building notification flows — the AI can look up who's on a team and which channel to target.

**Power Automate** — list, read, create, and modify cloud flows. The AI can inspect existing automation, understand what triggers and actions are in use, and create new flows through the API.

## Authentication

All four use MSAL with device code flow for initial setup. You run the server, it gives you a code, you enter it in a browser, and the token is cached locally. After that, the server starts automatically when you open the project — no per-session auth.

## The real value

It's not about the AI doing things you can't do. It's about the AI doing things faster because it has direct access to the context it needs. Looking up a Dataverse schema takes 30 seconds through the admin UI and 0 seconds when the AI has an MCP tool for it. Multiply that by dozens of lookups per session and it adds up.
