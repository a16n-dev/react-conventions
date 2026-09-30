---
title: "Sparse comments"
date: 2026-10-01
tags: [comments, code style]
published: true
---

## Description
Code comments should be used sparingly, prefer writing self-documenting code and following common conventions to 
make code easy to understand. Never use comments to narrate an implemetation

Code comments should only be used when one of the following is true:
* The code is written in an unusual way that would cause a reader to pause and wonder why. In this case, give clear 
  rationale why the more conventional or expected approach was not used
* There is some non-obvious behavior or side effect associated with this code that a future maintainer editing it 
  should be aware of
* The code was taken verbatim, or adapted from, from an external source such as a documentation 
  site or StackOverflow. In this case, directly to the snippet in the comment. 
* The code is a component, functions or type that sits at an API boundary, and it is established convention for 
  the project to leave doc comments for these surfaces. If developers would be expected to be familiar with the 
  precise implementation when using the API then a comment likely isn't necessary. Never reference implementation 
  details and avoid restating any information already conveyed by the code itself
* A piece of code is intentionally being stubbed or left unfinished temporarily, with a clear intention to revisit 
  it. In this case, leave a TODO comment that references who (always a developer, never an agent) should be 
  responsible for this task, and a very brief description of what is missing/needs doing. 

Comments should always appear directly above the code it is referencing, and should be reviewed against these 
guidelines before raising a PR or passing the code to other team members for review.

