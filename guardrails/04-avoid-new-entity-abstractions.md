---
title: "Avoid new entity abstractions"
date: 2026-06-29
tags: [code implementation]
published: true
---

## Description
Avoid creating new abstraction types that are derived from already well-defined entity types. Instead create reusable pure functions that operate on the well-defined entity type to extract the desired information.

### Failing Example

```ts
// api/user.ts
type User = {
  id: string;
  name?: string;
  email?: string;
};
```
```ts
// data/userWithDisplayName.ts
// ❌ New abstraction type that is derived from the well-defined User entity type
type UserWithDisplayName = {
  id: string;
  email: string;
  displayName: string;
}

function userToUseWithDisplayName(user: User): UserWithDisplayName {
  return {
    id: user.id,
    email: user.email,
    displayName: user.name ?? user.email?.split('@')[0] ?? user.id
  }
}
```

### Passing Example

```ts
// api/user.ts
type User = {
  id: string;
  name?: string;
  email?: string;
};
```
```ts
// utils/user.ts
// ✅ Pure function that operates on the well-defined User entity type
function getDisplayname(user: User): string {
  if(user.name) return user.name;
  if(user.email) return user.email.split('@')[0];
  return user.id;
}
```