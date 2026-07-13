---
title: "Sparse comments"
date: 2026-07-13
tags: [react]
published: true
---

## Description
Comments can be split into two groups: code comments and doc comments.

### Code comments
Use `//` style

Code comments should be used sparingly, as in most cases code should be self-documenting. When comments are required, keep them concise and relevant. Some cases where a comment may be necessary include (but are not limited to):
- Explaining why a particular approach was taken, especially if a reader may expect a simpler or more idiomatic approach.
- Code snippets copied verbatim from external sources such as forums or documentation sites. In these cases include a URL to the source.
- Flagging that modifying or removing some code may have unintended consequences, or require additional non-obvious code changes elsewhere

### Doc comments
Use `/** */` style

Doc comments should only be used for public APIs rather than in feature code. Avoid specifics about the parameters or return types (including JSDOC annontations) as this is defined by the Typescript types. 

