# Knowledge OS Agent Workflow

This repo is run by a completion loop. Agents should not wander across the roadmap or start broad rewrites.

## Required Loop

1. Read the current sprint in `docs/roadmap/sprint-backlog.md`.
2. Read only the relevant context shards, specs, standards, and fixtures for that sprint.
3. Confirm the sprint acceptance criteria and quality gates before changing code.
4. Implement in the smallest logical chunk that can be tested independently.
5. Add or update unit tests for each unit touched.
6. Add or update contract, integration, or e2e tests when behavior crosses boundaries.
7. Run the required local quality gates.
8. If any gate fails, fix and repeat the same sprint loop.
9. Update the sprint ledger with evidence: commands run, local app URL if applicable, e2e workflow proof, open risks, and next sprint.
10. Commit only when the sprint gates pass.

## Completion Definition

The roadmap is complete only when:

- Every sprint in `docs/roadmap/sprint-backlog.md` is marked complete.
- Unit tests pass for every implemented unit.
- Contract and integration tests pass for every subsystem boundary.
- A locally deployed app passes e2e workflow tests based on product acceptance criteria and strategic use cases.
- Independent business audit has no blocking findings.
- Security and performance gates have no blocking findings.
- The repo is clean, organized, and free of undocumented forks or god-code seams.

## Context Discipline

- Use `docs/context-shards/` to seed focused work.
- Do not load the whole repo into a task unless the sprint requires cross-cutting review.
- Runtime-specific exporters are adapters behind the Context Delivery Layer, not forks of project-space or assistant-generation logic.
- Product UX must follow the dark-first brand guide and approved logo usage.

## Stop Conditions

Pause and ask for direction if:

- Required credentials or external services are unavailable.
- A sprint requires a product decision not covered by the PRD, strategic use cases, brand guide, or context delivery positioning.
- A security gate blocks implementation.
- Local deployment cannot be made testable after three focused attempts.

