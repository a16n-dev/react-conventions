---
title: "React context conventions"
date: 2026-07-13
tags: [react, file structure]
published: true
---

## Description
Prefer following this set of conventions when creating and consuming React contexts.
* Co-locate the context, the context type, and the hook that consumes the context in a single file, named after the hook, such as `useAuth.tsx`
* Providers should live in their own file, named after the provider, such as `AuthProvider.tsx`
* Prefer giving context a type of `ContextType | undefined` and throwing an error in the hook if the context is undefined, rather than providing a default value.
* Only the provider should import the context, other consumers should use the hook

### Example setup
```tsx
// useAuth.tsx
import { createContext, useContext } from "react";

export type AuthContextType = {/*...*/};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
} 
```

```tsx
// AuthProvider.tsx
import { AuthContext, AuthContextType } from "./useAuth";
import { ReactNode } from "react";

export function AuthProvider({children}: {children: ReactNode}) {
  const authContextValue: AuthContextType = {/*...*/};

  return (
    <AuthContext value={authContextValue}>
      {children}
      </AuthContext>
    );
}
```