# Test Strategy

The test strategy maps product acceptance criteria into repeatable local proof.

## Test Layers

Unit tests:

- Validate pure functions, models, mappers, prompt builders, parsers, policy checks, and UI components.
- Required for every implemented unit.

Contract tests:

- Validate versioned schemas, API payloads, adapter interfaces, generated artifacts, runtime export packages, and cross-package boundaries.
- Required when any shared contract changes.

Integration tests:

- Validate behavior across services or adapters, such as crawl to canonical document, extraction to resolution, graph write to retrieval, or project space to export package.

E2e workflow tests:

- Validate user-visible workflows on a locally deployed app or service stack.
- Required for workflow-level completion.

Evaluation tests:

- Validate extraction quality, canonicalization accuracy, edge precision, groundedness, hallucination rate, context-pack usefulness, project-space usefulness, and export package completeness.

## Required Workflow Suites

Add Knowledge:

- Add source.
- Select domain pack.
- Extract knowledge.
- Review status, coverage, and failures.

Explore Domain:

- Open domain.
- Review concepts, dependencies, governance, security, and evidence.

Create Project Space:

- Enter business objective.
- Generate relevant domains, personas, dependencies, constraints, risks, and documents.
- Verify evidence and under-target latency for MVP fixture.

Generate Assistant:

- Select project space.
- Select domains.
- Generate assistant config.
- Verify context pack, retrieval strategy, and governance constraints.

Export Runtime Package:

- Select project space or assistant config.
- Preview runtime package.
- Export package for target runtime.
- Verify evidence index, permissions, instructions, and receipt.

Architecture Impact Analysis:

- Ask impact question.
- Retrieve affected systems, workflows, governance, security implications, and evidence.

Knowledge Gap Detection:

- Analyze graph/domain.
- Surface weakly connected concepts, missing ownership, missing workflows, and missing use cases.

## Local Deployment Rule

E2e tests must run against the locally deployed app or service stack. Mock-only workflow tests are not enough for sprint completion once the affected surface exists.

Each e2e run must record:

- Start command.
- Local URL.
- Fixture or seed corpus.
- Test command.
- Result.
- Failure artifacts when applicable.

## Quality Command Contract

W0-S2 must establish root-level commands for:

- Unit tests.
- Contract tests.
- Integration tests.
- E2e tests.
- Full quality gate.
- Local app start.

Until those commands exist, implementation sprints should not begin.

The command contract is defined in [Quality Command Contract](quality-command-contract.md).
