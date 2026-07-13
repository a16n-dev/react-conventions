---
title: "Use suspense for fetching primary data"
date: 2026-06-29
tags: [code implementation, react]
published: true
---

## Description
When fetching data required by the whole app (auth, feature flags, ...) or data required by a whole route or screen (entity data, ...) prefer using suspense to offload loading and error state handling to the routing layer. This keeps screens and feature logic focused on their own responsibilities and avoids boilerplate code while also reducing unnecessary optional chaining and null checks.

### Failing Example

```tsx
// hooks/useAuth.ts

export function useAuth() {
  const { data } = useQuery(/*...*/);
  
  // ❌ No suspense offloads loading and error handling to every consumer
  if(!data) {
    return { loading: true, user: null }
  }
  
  return { loading: false, user: data.user }
}
```

### Passing Example

```tsx
// hooks/useAuth.ts

export function useAuth() {
  // ✅ Suspense offloads loading and erro handling to higher up the component tree
  const { data } = useSuspenseQuery(/*...*/);
  
  return { user: data.user }
}
```
