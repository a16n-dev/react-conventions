---
title: "Lightweight screen components"
date: 2026-07-01
tags: [file structure, react]
published: true
---

## Description

Screens are the unit of composition that make up an app. They are the only components that should concern themselves with url/query params, and they should primarily be responsible for composing UI, rarely reaching for low level or design-system level components.