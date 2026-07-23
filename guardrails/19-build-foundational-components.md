---
title: "Build foundational components"
date: 2026-07-23
tags: [react]
published: true
---

When building UI, don't create one-off components for well-known UI patterns. Instead look to a component library already in the project, or if the project is using custom components, build out a design-system level component that can be reused across the project.

Some examples include but are not limited to: buttons, icon buttons, switch, checkbox, dropdowns, inputs, chips, badges, avatars, navigation menus, tables, tabs, alerts, dialogs, tooltips.

When creating foundational components, you may providing some of the following props
* Use `variant` as a prop to distinguish visual styles of the same component (filled, outlined)
* Use `size` as a prop to distinguish sizes of the same component (small, medium, large)
* Use `color` as a prop to distinguish color schemes of the same component (primary, secondary, success, error)