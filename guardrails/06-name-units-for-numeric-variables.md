---
title: "Name units for numeric variables"
date: 2026-06-29
tags: [code style, naming conventions]
published: true
---

## Description
When naming any variable or object property with a numeric value, if there is any chance that the unit may be ambiguous, suffix the identifier with the unit of the value.

### Failing Example

```ts
const timeSinceSignup = ...;

const distanceToTarget = ...;
```

### Passing Example

```ts
const timeSinceSignupMs = ...;

const distanceToTargetKm = ...;
```

