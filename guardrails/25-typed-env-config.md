---
title: "Typed env config"
date: 2026-10-12
tags: [project setup, typescript, code implementation]
published: true
---

## Description
Prefer reading environment variables in a single place, and validate them against a schema. Nothing outside this file should touch `process.env` or `import.meta.env`.

This ensures missing envs are caught early and avoids conditionals or `!` syntax leaking throughout the codebase. 

When it comes to parsing env variables:

* Parse values into their real types in the schema, such as numbers, booleans, URLs and string unions, so consumers never call `Number()` or compare against `"true"`.
* Only give a variable a default when it's genuinely optional. A required variable should fail validation rather than fall back to a placeholder.

### Failing example
```tsx
// feature/recipes/useRecipes.ts

export function useRecipes() {
  // ❌ Untyped env read in feature code, with parsing and a fallback repeated at every use
  const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";
  const timeout = Number(process.env.EXPO_PUBLIC_API_TIMEOUT);

  /*...*/
}
```

### Passing Example
```ts
// lib/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.url(),
  EXPO_PUBLIC_API_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
  EXPO_PUBLIC_ENVIRONMENT: z.enum(["development", "staging", "production"]),
});

// ✅ Each variable referenced by its full name so build-time inlining works
export const env = envSchema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_API_TIMEOUT_MS: process.env.EXPO_PUBLIC_API_TIMEOUT_MS,
  EXPO_PUBLIC_ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT,
});
```

```tsx
// feature/recipes/useRecipes.ts
import { env } from "@/lib/config/env";

export function useRecipes() {
  // ✅ Typed, validated values from the single env module
  const apiUrl = env.EXPO_PUBLIC_API_URL;
  const timeoutMs = env.EXPO_PUBLIC_API_TIMEOUT_MS;

  /*...*/
}
```
