# Anti-Slop Engineering Standards

These standards exist to prevent god code, hidden coupling, vague ownership, security drift, performance rot, and documentation that sounds polished but cannot guide implementation.

## Non-Negotiables

- No god modules. Any module that grows beyond one clear responsibility must be split before new behavior is added.
- No anonymous architecture. Every subsystem has an owner, public contracts, data boundaries, failure modes, and test strategy.
- No undocumented forks. Forking a dependency, model, prompt, schema, generated artifact, or workflow requires an owner, reason, review date, and exit plan.
- No "just this once" security bypasses. Temporary exceptions require an expiry date and issue owner.
- No unbounded context blobs. Agents receive relevant shards, not the whole repo, unless an explicit cross-cutting review requires it.
- No hidden data contracts. All cross-boundary payloads need schemas, examples, validation, and contract tests.
- No speculative abstractions. Add an abstraction only when it removes real duplication, isolates a volatile boundary, or expresses an established domain concept.
- No silent degradation. Fall back explicitly, emit telemetry, and preserve evidence when extraction, resolution, retrieval, or context generation is incomplete.

## Code Shape

- Prefer small packages organized by domain capability, not by technical layer alone.
- Keep orchestration thin. Business rules belong in named services or domain modules, not route handlers, CLIs, tasks, or UI components.
- Keep adapters replaceable. Crawlers, renderers, LLM providers, embedding providers, graph stores, vector stores, and auth providers sit behind interfaces.
- Keep data models stable. Version schemas when external consumers, persisted artifacts, or generated context packs depend on them.
- Keep prompts and extraction instructions versioned as product assets with tests, examples, and evaluation data.

## Module Budget

Use these as review triggers, not arbitrary contests:

- A function over 60 lines requires a reason.
- A file over 400 lines requires a split review.
- A package without a README, tests, and public contract cannot be reused by another package.
- A route, CLI command, or worker task may orchestrate but should not hold extraction, resolution, retrieval, or ranking logic directly.

## Required Project Boundaries

- `apps/`: user-facing applications and thin entry points.
- `services/`: deployable back-end services and workers.
- `packages/`: reusable domain packages and adapters.
- `schemas/`: versioned data contracts and generated type artifacts.
- `docs/`: product, standards, architecture, specs, audits, and context shards.
- `tests/`: cross-package integration and contract tests.
- `evals/`: extraction, resolution, retrieval, assistant, and business-goal evaluations.
- `data/`: local sample data only; no secrets or proprietary dumps.

## Review Expectations

Every meaningful change must answer:

- What user or system outcome does this advance?
- Which spec owns this behavior?
- Which public contract changed?
- Which security and privacy assumptions were reviewed?
- Which performance budget could be affected?
- Which tests or evals prove the behavior?
- What was deliberately left out?

## Debt Policy

Debt is allowed only when it is explicit.

Each debt item needs:

- Owner
- Reason
- Impact
- Removal condition
- Review date
- Link to the affected spec or decision

