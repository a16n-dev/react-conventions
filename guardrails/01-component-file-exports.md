---
title: "Component file exports"
date: 2026-06-29
tags: [exports, react]
published: true
---

## Description
Files that export a component should export only the component and it's types. Any helper functions, sub-components or other code should never be exported. If any other code requires reuse, move it to a seperate file

### Failing example
```tsx
// Button.tsx

// ❌ Constant variable exported from the same file
export const BUTTON_VARIANTS = { /*...*/ }

export type ButtonProps = { /*...*/ }

export function Button(props: ButtonProps) { /*...*/ }
```

### Passing Example
```tsx
// Button.tsx

// ✅ Constant variable exported from a seperate file
import { BUTTON_VARIANTS } from './variants';

export type ButtonProps = { /*...*/ }

export function Button(props: ButtonProps) { /*...*/ }
```