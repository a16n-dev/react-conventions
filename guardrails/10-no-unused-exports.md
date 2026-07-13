---
title: "No unused exports"
date: 2026-06-29
tags: [code implementation, exports]
published: true
---

## Description
No symbols should be exported unless they are consumed by other modules. Symbols should be promoted to exports only when they are actually used by other modules, and removed from exports when they are no longer used. 

