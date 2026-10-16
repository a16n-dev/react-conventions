---
title: "Prefer const arrays over enums"
date: 2026-10-16
tags: [code style, typescript]
published: true
---

## Description
Model a fixed set of values as a readonly const array with a union type derived from it, rather than a TypeScript `enum`. Declare the array with `as const`, then derive the type with `(typeof ARRAY)[number]`.

Enums are a TypeScript-only runtime construct that compiles to a generated object. They don't erase like other types, numeric enums are unsound (any number is assignable), and they can't be iterated without filtering the reverse mapping. A const array gives a plain string union for the type and a real array for the values, so the same declaration can be used for both. The values can be mapped over to build select options, validated against with `includes`, and passed to a schema library's `enum` method without any conversion.

Use `enum` only when strictly necessary, such as matching a third-party API that exposes enums you must pass by reference, or in generated code you don't own.

This should be enforced by the `no-restricted-syntax` rule with a `TSEnumDeclaration` selector, as an error.

### Failing example
```tsx
// recipeStatus.ts

// ❌ Enum generates a runtime object and a separate type that can't be used as a string union
export enum RecipeStatus {
  Draft = "draft",
  Published = "published",
  Archived = "archived",
}
```

```tsx
// StatusSelect.tsx
import { RecipeStatus } from "./recipeStatus";

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <Select value={value} onChange={onChange}>
      {/* ❌ Iterating an enum goes through Object.values on the generated object */}
      {Object.values(RecipeStatus).map((status) => (
        <Option key={status} value={status}>{status}</Option>
      ))}
    </Select>
  );
}
```

### Passing Example
```tsx
// recipeStatus.ts

// ✅ One declaration gives both the runtime values and the type
export const RECIPE_STATUSES = ["draft", "published", "archived"] as const;

export type RecipeStatus = (typeof RECIPE_STATUSES)[number];
```

```tsx
// StatusSelect.tsx
import { RECIPE_STATUSES, type RecipeStatus } from "./recipeStatus";

type StatusSelectProps = {
  value: RecipeStatus;
  onChange: (status: RecipeStatus) => void;
};

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <Select value={value} onChange={onChange}>
      {/* ✅ The array is iterated directly */}
      {RECIPE_STATUSES.map((status) => (
        <Option key={status} value={status}>{status}</Option>
      ))}
    </Select>
  );
}
```
