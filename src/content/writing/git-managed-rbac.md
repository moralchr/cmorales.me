---
title: "Git-Managed RBAC for Dataverse"
description: "Treating security role definitions as code — version-controlled, reviewable, and reconciled automatically."
date: 2026-05-10
tags: ["security", "dataverse", "devops"]
draft: false
---

Dataverse security roles are configured through a web UI — a matrix of checkboxes for each table × privilege × depth. It works for small setups, but once you have multiple roles across dozens of tables, it becomes unmanageable. Changes are invisible, unreviewable, and have no audit trail beyond "someone clicked something."

## The approach

Move the role definitions into JSON files in the repo — one file per role. Each file declares the tables and their privilege levels. A reconciler script diffs the spec against live Dataverse and applies changes.

```
security-roles/
├── ops-role.json
├── exec-role.json
├── viewer-role.json
└── schema-names.json
```

The `schema-names.json` file maps logical table names to Dataverse's internal privilege names (which are inconsistent — some PascalCase, some lowercase, some completely different from the table name).

## The workflow

1. Edit the JSON file
2. Run the reconciler in dry-run mode — it shows what would change
3. Review the diff
4. Run with `--apply` to push changes to Dataverse
5. Commit the JSON changes

Role changes now go through pull requests. You can see exactly what privilege was added or removed, who approved it, and when.

## What broke along the way

**Organization-owned tables** reject Business Unit depth — the API returns a generic error that doesn't mention ownership type. Had to detect the table's ownership model and enforce the correct depth.

**The privilege naming convention is lying to you.** Most tables follow PascalCase, but a handful use all-lowercase names in the privilege table. The only reliable source is querying the live privilege definitions.

**Delete privileges are excluded by policy**, not by accident. The company uses soft deletes (deactivate records) to preserve audit trails. This is a business rule encoded in the default JSON template, not a missing feature.
