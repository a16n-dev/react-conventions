---
title: "Clean up unused code"
date: 2026-06-29
tags: [code implementation]
published: true
---

## Description
Unused code should be cleaned up as it's found. When making a change, remove any code that the change leaves unused, and remove other unused code you come across nearby when it's safe to do so.

This is a best effort practice rather than a strictly enforced rule. It doesn't need to be enforced through lint or CI checks, and it's fine for code to exist ahead of being used, for example to support functionality that will be used in the near future.
