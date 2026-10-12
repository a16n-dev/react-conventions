---
title: "Use semantic color tokens"
date: 2026-10-12
tags: [styling, design system]
published: true
---

## Description
Colors should be defined in two layers of tokens:

* **Primitive tokens** describe the raw palette, named by hue and shade rather than purpose (`blue-500`, `neutral-100`, `red-600`). They're the only place raw color values (hex, rgb, etc.) should be defined.
* **Semantic tokens** describe the role a color plays in the UI (`background`, `surface`, `foreground`, `foreground-muted`, `border`, `accent`, `error`). Every semantic token should map to a primitive token rather than a raw color value.

Most components should use semantic tokens. Only reach for a primitive token, or a raw color value, in genuine one-off cases where no semantic role applies, such as an illustration or a brand graphic.

Keep semantic tokens general enough to be reused across many components. Avoid hyper specific tokens that are tied to a single component or screen, such as `checkout-button-hover-background` or `profile-card-border`. If a component needs a color that no existing semantic token covers, prefer adding a general purpose role that other components could also use. Otherwise treat it as a one-off case.

If using Tailwind, don't repeat the utility in the token name, as this produces awkward classes like `text-text-primary` or `bg-background-surface`. Name tokens so they read naturally after any utility prefix, for example `text-foreground`, `text-foreground-muted` and `bg-surface`.
