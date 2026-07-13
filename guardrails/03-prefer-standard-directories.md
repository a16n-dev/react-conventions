---
title: "Prefer standard directories"
date: 2026-06-29
tags: [file structure, project setup]
published: true
---

## Description
Prefer placing code in one of the following directories that have a well-defined purpose.

### `feature/<feature-name>/`
Code that related to a specific feature of the application. Houses related hooks, components, screens and utilities. Where possible, avoiding cross-feature dependencies. If a feature has many other features that consume it, consider if it (or a part of it) would be better of in `lib/` instead.

### `lib/<lib-name>/`
Code that would exist regardless of the product's feature set and is not directly to any specific feature. Examples include authentication, navigation, tracking, config, error handling.

### `utils/`
Shared utility code that exists purely to avoid code duplication. Utilities should be constrained to a single file. If a utility would be complex enough to warrant multiple files, it should probably live in `lib/` instead.

### `data/`
Shared code that comprises the data layer of the application. Think entity schemas, API clients, caching and data fetching hooks. This exists as data shouldn't be siloed to specific features.

### Additional directories

In addition to the guidelines above, prefer the idiomatic structure for the frameworks and libraries in use in the project. For example Next.js has `app/`, storybook has `.storybook/`, etc... 

## Enforcement strategy

Manual