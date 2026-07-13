---
title: "Component File Structure"
date: 2026-07-07
tags: [file structure, react]
published: true
---

## Description

Prefer using a standard structure for React component files. This order is based on what makes the file most readable from top to bottom.

```
1. Imports

2. Module-level constants and types shared across the file

3. Props type (use Type, never Interface)

4. The main component 

5. Extracted subcomponents (each with its own props type directly above it)

6. Pure utility functions

7. Styles
```