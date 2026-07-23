---
title: "Engineering Environment & Documentation"
description: "The platform's code and its documentation in one version-controlled tree, a monorepo committed to GitHub, edited in VS Code, with a densely cross-linked Obsidian vault of decision records and session handoffs living beside the code."
date: 2026-06-01
kicker: "Systems · Infrastructure"
tech: ["Obsidian", "Markdown", "Git", "GitHub", "VS Code"]
highlights:
  - "Monorepo structure: apps, shared packages, and the docs vault in one tree"
  - "Everything committed to git and pushed to GitHub; docs ship in the same commit as the code"
  - "Authored in Obsidian, edited in the same VS Code workspace as the code it documents"
  - "Numbered decision records and session handoffs capture the why and the current state"
images:
  - src: "/images/projects/knowledge-base-graph.webp"
    alt: "Obsidian graph view of the knowledge base, hundreds of linked notes radiating from a central hub"
    caption: "Engineering knowledge base: decision log, systems docs, daily handoffs"
order: 8
---

Code and documentation treated as one version-controlled system. The platform lives in a monorepo committed to GitHub and edited in VS Code; the documentation vault lives in the same tree, so the record of *why* ships in the same commit as the *what*. Documentation is bound to events rather than intentions: an architecture choice triggers a numbered decision record, a hard debugging session triggers a postmortem, every working session ends with a handoff note recording current state, next steps, and landmines.

### How it stays useful

- **Decision records**: one numbered file per architecture choice, with the context and the alternatives that were rejected, so the reasoning survives the decision
- **Postmortems with a cost signal**: each carries an hours-lost estimate, rolled up into a "Pain Index" that ranks defect classes by operational cost, so preventive work goes where the pain actually is
- **Session handoffs**: state, next steps, and known landmines at the end of every session, so picking work back up doesn't start from zero
- **Dense cross-linking**: notes reference each other, so the graph surfaces which decisions and systems are actually connected

### How it's built

The vault lives in the same monorepo as the code, committed to git and pushed to GitHub, and opened in the same VS Code workspace the code is written in, so the record of *why* sits next to the *what*, and a documentation change ships in the same commit as the change it explains. Notes are plain Markdown; Obsidian provides the linking and the graph view over them, so nothing is locked to a proprietary format.
