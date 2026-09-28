---
title: "Fast Refresh safe components"
date: 2026-09-28
tags: [react, fast refresh]
published: true
---

## Description
Fast Refresh keeps component state across edits by recognising each component by its name and the order of its hook calls. Code that hides a component's identity or changes its hooks between renders forces a remount on every edit, and usually has runtime bugs too. Prefer following these rules when defining components.

* Never define a component inside another component. The inner component is a new type on every render, so React unmounts and remounts it, losing its state. Move it to the top level of the file, or to its own file.
* Give every component a name. Anonymous components, such as `export default () => {/*...*/}` or `memo(() => {/*...*/})`, can't be registered by Fast Refresh and show up as `Anonymous` in the React DevTools. Use a named function declaration instead.
* Follow the rules of hooks. Only call hooks at the top level of a component or custom hook, never inside a condition, loop or callback.

These should be enforced by `react-x/no-nested-component-definitions`, `react/display-name` and `react-hooks/rules-of-hooks` as errors.

### Failing example
```tsx
// RecipeList.tsx
import { memo, useState } from "react";

// ❌ Anonymous component
export const RecipeRow = memo(({ recipe }: RecipeRowProps) => {/*...*/});

export function RecipeList({ recipes, showFilter }: RecipeListProps) {
  // ❌ Hook called conditionally
  const [query, setQuery] = showFilter ? useState("") : ["", () => {}];

  // ❌ Component defined inside another component
  function EmptyState() {
    return <Text>No recipes</Text>;
  }

  /*...*/
}
```

### Passing Example
```tsx
// RecipeList.tsx
import { memo, useState } from "react";

// ✅ Named function declaration
export const RecipeRow = memo(function RecipeRow({ recipe }: RecipeRowProps) {/*...*/});

export function RecipeList({ recipes, showFilter }: RecipeListProps) {
  // ✅ Hook always called, the condition applies to its value
  const [query, setQuery] = useState("");

  /*...*/
}

// ✅ Component defined at the top level of the file
function EmptyState() {
  return <Text>No recipes</Text>;
}
```
