---
title: "Custom Gantt Charts in React"
description: "Why I built a Gantt chart from scratch instead of using a library, and what the SVG-based approach looks like."
date: 2026-04-15
tags: ["react", "svg", "data-viz"]
draft: true
---

The field operations app needed a schedule view, crews assigned to jobs across a timeline. Gantt chart territory. I looked at the usual React Gantt libraries and none of them fit: too heavy, wrong interaction model, or impossible to style within the existing design system.

So I built one from scratch with SVG.

## Why SVG

Canvas would have been faster for rendering, but SVG gives you DOM elements for each bar, which means CSS styling, event handlers, and accessibility attributes without a custom hit-testing layer. For a schedule with ~50 bars visible at once, SVG performance is fine.

## The layout algorithm

Each row is a crew. Each bar is a job assignment with start/end dates. The tricky part is horizontal positioning, the timeline needs to scroll, zoom, and snap to day boundaries.

The approach: compute a `pxPerDay` scale factor from the viewport width and visible date range. Each bar's `x` and `width` are derived from its dates × the scale factor. When the user zooms (changes the visible range), every bar recalculates.

## Interactions

Drag to reschedule. The bar follows the cursor horizontally, snaps to day boundaries on drop, and fires an update to Dataverse. Vertical dragging (reassigning to a different crew) was scoped out, too many edge cases around crew availability and qualifications.

## What I'd do differently

The date handling is fiddly. Time zones, DST transitions, and "does this job end at midnight or at 11:59 PM" created subtle off-by-one bugs. A dedicated date library (or at least a helper that encapsulates the day-boundary logic) would have saved debugging time.
