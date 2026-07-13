# React Conventions

This is a collection of conventions that guide code style, structure, and other rules for React codebases. 

The point of these conventions isn't to be the "proven best way" to write React code, but rather a highly opinionated set of rules:

* All projects developed under these rules should feel mostly the same
* Remove any ambiguity around how to structure the project that would require an agent to make it's own decisions, which leads to inconsistency and drift over time.
* Build projects in a scalable way, that keeps complexity manageable with hundreds of thousands of lines of agent generated code.
* Minimise the testing burden to verify that new code works as intended, by making it easy to reason about the code and its dependencies.
* Guide projects towards idiomatic React patterns so that code is easier to read and maintain for both developers and agents

They're also intended for projects that make heavy use of coding agents.

### How to use these conventions

Don't paste them verbatim into your project, instead you may want to:

* Distill them into a concise CLAUDE.md file 
* Feed them to a review agent 
* Get an agent to generate mechanical checks that enforce some of these rules in CI through tools like ESLint, Prettier, Typescript, Knip, Konsistent or custom scripts