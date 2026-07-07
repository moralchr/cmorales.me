---
title: "Offline-First Architecture on Power Platform"
description: "How I built offline resilience into a React app where the SDK hangs forever when connectivity drops."
date: 2026-06-28
tags: ["architecture", "power-platform", "offline"]
draft: true
---

When you're building apps for construction sites, you can't assume reliable internet. Crews work in basements, behind concrete walls, in rural areas with one bar of signal. The app needs to keep working.

The problem is that the Power Apps SDK doesn't have built-in offline support. When the device loses connectivity, SDK calls don't fail — they hang. No timeout, no error, just silence. The UI freezes and the user thinks the app is broken.

## The solution: three layers

**1. Timeout wrapper.** Every SDK call goes through a `withTimeout` function that races the call against a timer. If the SDK doesn't respond in time, the wrapper throws a `TimeoutError`. This turns an invisible hang into a catchable error.

**2. Network detection.** A hook monitors online/offline state and exposes a reconnect callback. The UI shows a status indicator so field users know when they're offline — no guessing.

**3. In-memory write queue.** When a write fails due to a network error, it goes into a queue instead of being lost. When connectivity returns, the queue flushes automatically with retry logic. Reads fall back to the last-known state.

## What I'd do differently

The queue is in-memory, which means it's lost if the user closes the browser tab. IndexedDB or localStorage persistence would survive that scenario. For the current use case — field supervisors on tablets who keep the app open all day — in-memory has been fine, but it's the obvious next improvement.

## The pattern generalizes

This isn't specific to Power Platform. Any app that calls an API that might hang (as opposed to fail cleanly) benefits from the timeout-wrapper pattern. The SDK's behavior was the forcing function, but the architecture works anywhere.
