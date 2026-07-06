---
title: "Git-Managed Security Roles"
description: "A declarative system for managing Dataverse security roles from version-controlled JSON specs — diff, review, and apply RBAC changes like code."
date: 2026-04-01
kicker: "Infrastructure · Security"
tech: ["TypeScript", "Dataverse Web API", "MSAL", "Node.js"]
featured: false
order: 7
---

Built a reconciler that treats Dataverse security role definitions as code. Role specs live as JSON files in the repo — one per role — with a script that diffs the spec against live Dataverse and applies changes.

### How it works

Each role's JSON file declares the table-level privileges (Create, Read, Write, Append, AppendTo, Delete) and their depth (Business Unit, Organization, or User). A schema-names mapping file handles the translation between logical table names and Dataverse's internal privilege naming.

The reconciler script:
1. Reads the JSON spec
2. Fetches the current role definition from Dataverse
3. Diffs them
4. Prints what would change (dry run by default)
5. Applies with `--apply` flag

### Why this approach

The Dataverse admin UI for security roles is a matrix of checkboxes — easy to misconfigure, impossible to review, no audit trail beyond "someone changed something." Moving the definitions into git means role changes go through pull requests, get reviewed, and have a clear history.

### Gotchas discovered

- **Organization-owned tables** reject Business Unit depth — the API returns an unhelpful error. Had to detect table ownership type and enforce the right depth
- **Privilege naming is inconsistent** — most custom tables use PascalCase (`aspire_Job`) but some use all-lowercase. The live privilege table is the only source of truth
- **Delete is intentionally excluded** from most roles — company policy is soft deletes (deactivate records) to preserve audit trails
