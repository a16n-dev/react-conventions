---
title: "Prefer type over interface"
date: 2026-10-16
tags: [code style, typescript]
published: true
---

## Description
Declare object shapes, props and other named types with `type` aliases rather than `interface`. Having one way to declare a type keeps codebases consistent and removes a decision that otherwise gets made differently in every file.

`type` aliases can express everything an object type needs, and more: unions, intersections, mapped and conditional types, and aliases for primitives and tuples. Interfaces are open to declaration merging, so two declarations with the same name silently combine into one. That is an easy way to accidentally extend a type from another file, and it's rarely what the author intended. Extending a type is done with an intersection (`type A = B & { ... }`) rather than `extends`.

Use `interface` only when it is strictly necessary:

* Augmenting a third-party module or a global, such as adding a key to `ProcessEnv` or extending a library's theme type, where declaration merging is the required mechanism.
* Declaring a type that a class must `implements`, where the library or pattern requires an interface.

This should be enforced by `@typescript-eslint/consistent-type-definitions` with the `"type"` option, as an error. Add a disable comment with a short reason in the rare file that needs an interface.

### Failing example
```tsx
// RecipeCard.tsx

// ❌ Object shape declared with interface
interface Recipe {
  id: string;
  title: string;
}

// ❌ Extending with interface inheritance
interface RecipeCardProps extends Recipe {
  onSelect: (id: string) => void;
}

export function RecipeCard({ id, title, onSelect }: RecipeCardProps) { /*...*/ }
```

### Passing Example
```tsx
// RecipeCard.tsx

// ✅ Object shape declared with a type alias
type Recipe = {
  id: string;
  title: string;
};

// ✅ Extending with an intersection
type RecipeCardProps = Recipe & {
  onSelect: (id: string) => void;
};

export function RecipeCard({ id, title, onSelect }: RecipeCardProps) { /*...*/ }
```

```ts
// theme.d.ts
import "styled-components";

// ✅ Interface is strictly necessary here: declaration merging is how the library's theme type is augmented
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- module augmentation requires an interface
declare module "styled-components" {
  export interface DefaultTheme {
    colors: { primary: string };
  }
}
```
