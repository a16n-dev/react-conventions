---
title: "No react namespace"
date: 2026-07-13
tags: [code style, react]
published: true
---

## Description
Prefer named imports from React, rather than importing the entire React namespace: `useState()` not `React.useState()`. This also applies to types: use `ReactNode` not `React.ReactNode`.