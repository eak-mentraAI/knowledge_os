# Implementation Completion Loop

This workflow defines how the roadmap is worked until completion.

The loop is designed for focused agents, small logical chunks, hard quality gates, and local e2e proof. It is not a promise to skip judgment. It is a control system that keeps implementation moving while preventing sloppy expansion.

## Loop Contract

Each loop pass works one sprint-sized chunk.

1. Select the next incomplete sprint from `docs/roadmap/sprint-backlog.md`.
2. Load only the relevant shards, specs, standards, and fixtures.
3. Confirm the sprint's acceptance criteria.
4. Write or update tests before or alongside implementation.
5. Implement the smallest cohesive unit of work.
6. Run unit tests for touched units.
7. Run contract and integration tests for affected boundaries.
8. Start or update the local deployment.
9. Run e2e workflow tests mapped to acceptance criteria and strategic use cases.
10. Fix failures and repeat the same sprint until gates pass.
11. Update the sprint ledger with proof.
12. Commit and proceed to the next sprint.

## Required Gates Per Sprint

Every sprint must pass:

- Unit tests for each implemented unit.
- Contract tests for changed schemas, APIs, adapters, or package boundaries.
- Integration tests for cross-subsystem behavior.
- Security checks for source ingestion, auth, storage, LLM calls, exports, or runtime delivery when touched.
- Performance checks when the sprint affects crawling, extraction, resolution, embeddings, retrieval, generation, export, or UI workflow latency.
- Documentation updates for changed behavior, contracts, commands, or known debt.

Sprints that touch product workflows must also pass local e2e tests.

## Local Deployment Gate

Any sprint that changes user-facing behavior, APIs, workers, retrieval, context generation, project spaces, assistants, or context delivery must prove behavior through a locally deployed app or service stack.

The proof must include:

- Local start command.
- Local app or API URL.
- Seed data or fixture used.
- E2e command run.
- Passing test output.
- Screenshots or traces when UI behavior is material.

## E2e Workflow Basis

E2e tests are derived from:

- PRD acceptance criteria.
- Strategic use cases.
- Wave gates.
- SPEC acceptance criteria.
- UX workflow success metrics.

Primary workflow suites:

- Add Knowledge.
- Explore Domain.
- Create Project Space.
- Generate Assistant.
- Export Runtime Package.
- Architecture Impact Analysis.
- Knowledge Gap Detection.

## Completion Definition

The implementation loop is complete when all of these are true:

- All sprints are complete.
- All unit tests pass.
- All contract tests pass.
- All integration tests pass.
- All local e2e workflow tests pass.
- Local deployment is reproducible from documented commands.
- Independent business audit passes.
- Security and performance audit gates pass.
- No critical or undocumented debt remains.

## Resume Protocol

After an interruption, an agent should:

1. Read `docs/roadmap/sprint-backlog.md`.
2. Read the latest git status and recent commits.
3. Identify the first incomplete sprint.
4. Re-run the last recorded quality gate if the sprint is in progress.
5. Continue the same sprint before starting a new one.

