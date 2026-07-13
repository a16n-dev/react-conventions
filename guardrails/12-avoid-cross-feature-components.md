---
title: "Avoid cross-feature components"
date: 2026-06-30
tags: [file structure, react]
published: true
---

## Description

Reusing an existing component from another feature to avoid repetition even if they look at the same is often bad for the long-term maintainability of the codebase. It can lead to unintentional regressions as small changes result in a larger change surface area, and divergent requirements over time lead to "swiss army knife components" that accept many props to serve many different states. 

Instead, prefer duplicating the component code, leaning heavily on foundational code that lives above the feature level (design system components, shared hooks, data layer code, etc...).

If duplicating the code would lead to significant code duplication, consider if:
- Some subcomponents could be extracted into the design system
- Some logic is feature-agnostic and would make sense as a shared library or utility

