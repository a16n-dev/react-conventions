---
title: "Type-only imports"
date: 2026-09-28
tags: [code style, typescript]
published: true
---

## Description
When an imported name is only used as a type, mark it with an inline `type` specifier, such as `import { type User } from "./user"`. Type-only imports are removed at build time, so bundlers can drop the import entirely, and references that are only types can't create import cycles at runtime.

If every name in an import is a type, use a top-level `import type { A, B }` instead. With inline specifiers alone, some compiler settings keep the statement as a bare `import "./module"`, which still loads the module at runtime.

This should be enforced by `@typescript-eslint/consistent-type-imports` with `fixStyle: "inline-type-imports"`, and `@typescript-eslint/no-import-type-side-effects`, as errors.

### Failing example
```tsx
// UserCard.tsx

// ❌ User is only used as a type, but is imported as a value
import { User, getDisplayName } from "@/utils/user";

export type UserCardProps = { user: User };

export function UserCard({ user }: UserCardProps) { /*...*/ }
```

### Passing Example
```tsx
// UserCard.tsx

// ✅ Type-only name is marked with an inline type specifier
import { type User, getDisplayName } from "@/utils/user";

export type UserCardProps = { user: User };

export function UserCard({ user }: UserCardProps) { /*...*/ }
```
