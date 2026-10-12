---
title: "Event handler naming"
date: 2026-10-12
tags: [code style, naming conventions, react]
published: true
---

## Description
Name event handler props and the functions that handle them using a consistent prefix, so it's always clear which side of the relationship a name is on.

* Props that accept an event handler are prefixed with `on`, followed by the event in the present tense, such as `onClick`, `onChange` or `onSelect`. Avoid past tense names like `onSelected`.
* Functions that handle an event are prefixed with `handle`, followed by the event, such as `handleSubmit`. When a component handles the same event from more than one source, include the source: `handleEmailChange`, `handlePasswordChange`.
* Never use the `handle` prefix for a prop, or the `on` prefix for a function declared inside a component.
* Name custom event props after what happened from the component's point of view, not after how it happened or what the parent will do with it. Prefer `onSelect` over `onRowClick`, and `onDelete` over `onRemoveFromList`.
* When a prop is passed straight through to a child, pass it directly rather than wrapping it in a `handle` function that only calls it.

This should be enforced by `react/jsx-handler-names` as an error.

### Failing example
```tsx
// RecipeForm.tsx

export type RecipeFormProps = {
  // ❌ Handler prop uses the handle prefix and is named after the parent's intent
  handleSave: (recipe: Recipe) => void;
};

export function RecipeForm({ handleSave }: RecipeFormProps) {
  // ❌ Local handler uses the on prefix
  function onTitleChange(title: string) { /*...*/ }

  /*...*/
}
```

### Passing Example
```tsx
// RecipeForm.tsx

export type RecipeFormProps = {
  // ✅ Handler prop uses the on prefix and describes what happened
  onSubmit: (recipe: Recipe) => void;
};

export function RecipeForm({ onSubmit }: RecipeFormProps) {
  // ✅ Local handler uses the handle prefix
  function handleTitleChange(title: string) { /*...*/ }

  /*...*/
}
```
