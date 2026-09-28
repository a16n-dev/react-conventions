---
title: "React context conventions"
date: 2026-07-13
tags: [react, file structure, fast refresh]
published: true
---

## Description
Prefer following this set of conventions when creating and consuming React contexts.

A context and the component that provides it live in separate files. Fast Refresh can only hot-swap a module that exports nothing but components. If a module also exports a context or a hook, every edit to it forces a full remount of the subtree, which throws away the provider's state and the state of everything beneath it. Keeping the provider in a file of its own means editing it refreshes in place.

* Put the context, its value type, and the hook that consumes it in one file, named after the context, such as `AuthContext.ts`.
  * Use `.ts`, not `.tsx`. The file has no JSX, and the extension makes it a compile error to add some.
  * Do not declare any component in this file, exported or not.
  * Contexts that are created and provided together, such as a state context and an actions context split so that consumers of the actions don't re-render on state changes, may share one file.
* Put the provider in its own file, named after the provider, such as `AuthProvider.tsx`. It imports the context and exports only the provider component.
* Give the context a type of `ContextType | null`, default it to `null`, and throw in the hook when the value is `null`, rather than providing a default value.
  * When a consumer should genuinely work outside the provider, give the hook a return type of `ContextType | null` and let the caller handle the absent case. Do not invent a no-op default value to avoid it.
* Render the context directly as its own provider: `<AuthContext value={...}>`. Do not use `<AuthContext.Provider>`, which is deprecated since React 19, and do not alias it with `export const AuthProvider = AuthContext.Provider`.
* The context object is exported only so the provider can import it. It is not public API: do not re-export it from a package or feature entry point. Every other consumer uses the hook, which is where the null check lives.
* Enforce the split with `eslint-plugin-react-refresh`'s `react-refresh/only-export-components` rule as an error.

### Example setup
```ts
// AuthContext.ts
import { createContext, useContext } from "react";

export type AuthContextType = {/*...*/};

export const AuthContext = createContext<AuthContextType | null>(null);

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
import { AuthContext, type AuthContextType } from "./AuthContext";
import type { ReactNode } from "react";

export function AuthProvider({children}: {children: ReactNode}) {
  const authContextValue: AuthContextType = {/*...*/};

  return (
    <AuthContext value={authContextValue}>
      {children}
    </AuthContext>
  );
}
```

### Optional consumer
```ts
// PagerScrollContext.ts
import { createContext, useContext } from "react";

export type PagerScrollControls = {
    setScrollEnabled: (enabled: boolean) => void;
};

export const PagerScrollContext = createContext<PagerScrollControls | null>(null);

export function usePagerScroll(): PagerScrollControls | null {
    return useContext(PagerScrollContext);
}
```
