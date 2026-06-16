# Agent Orchestration Strategy

The project should use dedicated agents to create focus and reduce context overload. Agents are not interchangeable generalists; each one receives a narrow seed pack and produces bounded deliverables.

Implementation work follows the sprint loop in `docs/strategy/implementation-completion-loop.md` and the ledger in `docs/roadmap/sprint-backlog.md`.

## Agent Classes

Implementation agents:

- Build or modify code and tests for one spec or wave slice.
- Receive only relevant shards, interfaces, fixtures, and standards.
- Must return changed files, tests run, open risks, and contract changes.

Architecture agents:

- Review boundaries, data contracts, dependency direction, and anti-slop compliance.
- Do not add features.

Security/performance agents:

- Review threat model, authorization, data handling, performance budgets, observability, and failure behavior.
- Can block implementation until mandatory gates are addressed.

Independent business audit agents:

- Review whether roadmap, specs, and generated product docs achieve strategic business goals if faithfully executed.
- Must not help write the docs they audit in the same pass.
- Must use the strategic use-case summary as the review frame.

## Orchestration Rules

- Start every wave with a single owner agent for interfaces and fixtures.
- Work the first incomplete sprint in the sprint backlog unless the user changes priority.
- Do not parallelize implementation until shared contracts are approved.
- Parallelize adapters, UI surfaces, eval fixtures, and docs only when their interfaces are stable.
- Keep audit independent: audit agents should receive outputs, not live drafts or author rationale.
- Require a reconciliation pass after parallel work to catch drift.
- Prefer one agent per logical seam: crawler, document model, ontology, extraction, resolution, storage, retrieval, context generation, project spaces, context delivery, UX, evals.
- Treat runtime-specific exporters as adapters behind the Context Delivery Layer, not forks of project-space or assistant-generation logic.

## Standard Agent Output Contract

Each agent returns:

- Scope completed.
- Files changed.
- Contracts changed.
- Tests or evals added.
- Tests or evals run.
- Security and performance considerations.
- Known risks or debt.
- Suggested next shard.
- Sprint ledger update.

## Responsible Parallelization

Parallel work is allowed when:

- Interfaces are stable.
- Fixture data exists.
- Ownership is clear.
- Merge order is known.
- Contract tests can detect drift.
- Audit gates are independent.

Parallel work is not allowed when:

- Agents would invent incompatible schemas.
- Business goals are unresolved.
- Security model is undecided.
- Data ownership or permission boundaries are unclear.
- The only speedup comes from duplicating context-heavy reasoning.
