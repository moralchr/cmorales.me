---
title: "Git-Managed Security Roles"
description: "A declarative system for managing Dataverse security roles from version-controlled JSON specs — diff, review, and apply RBAC changes like code."
date: 2026-04-01
kicker: "Infrastructure · Security"
tech: ["TypeScript", "Dataverse Web API", "MSAL", "Node.js", "Entra ID"]
featured: false
order: 7
---

Built a reconciler that treats Dataverse security role definitions as code. Role specs live as JSON files in the repo — one per role — with a script that diffs the spec against live Dataverse and applies changes.

### Three-layer access model

The reconciler manages the middle layer of a deliberate access architecture: **Entra ID security groups** (who you are) → **Dataverse security roles** (what data you can touch) → **application-level checks** (what the app shows you). Least privilege by default — business-unit scope unless the platform requires organization scope, with exceptions documented.

### How it works

Each role's JSON file declares the table-level privileges (Create, Read, Write, Append, AppendTo, Delete) and their depth (Business Unit, Organization, or User). The reconciler reads the spec, fetches the live role definition, diffs them, prints what would change (dry run by default), and applies with `--apply`.

### Why this approach

The Dataverse admin UI for security roles is a matrix of checkboxes — easy to misconfigure, impossible to review, no audit trail beyond "someone changed something." Moving the definitions into git means role changes go through pull requests, get reviewed, and have a clear history. **"Who was granted what privilege, when, and who approved it" is answerable from history in minutes** — access administration as a controlled, auditable process instead of checkbox archaeology.

Company retention policy is encoded here too: records are deactivated, never destroyed, so **the Delete privilege is excluded from the default role template** — the platform itself enforces the policy for every table and every user.

### Gotchas discovered

- **Organization-owned tables** reject Business Unit depth — the API returns an unhelpful error. Had to detect table ownership type and enforce the right depth
- **Privilege naming is inconsistent** — most custom tables use PascalCase but some use all-lowercase. The live privilege table is the only source of truth
