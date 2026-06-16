# Documentation Sharding Strategy

The documentation system is designed to reduce context waste and keep implementation agents focused.

## Sharding Principles

- Smallest sufficient context wins.
- Source-of-truth docs are preserved, but agents usually receive summaries and relevant specs.
- Business audit agents receive strategic-use-case context and changed docs, not implementation chatter.
- Implementation agents receive only the wave, spec, contracts, standards, and fixtures they need.
- Cross-cutting agents receive architecture and standards shards but should not own feature implementation.

## Standard Shard Types

- Product vision shard: product identity, user outcomes, product navigation, non-goals.
- Business use cases shard: strategic use cases, business ontology, acceptance criteria, outcomes.
- Technical architecture shard: subsystem boundaries and shared contracts.
- UX principles shard: product experience rules and navigation constraints.
- Brand design shard: logo usage, dark-first tokens, typography, motion, and product feel.
- Context delivery shard: compiler/runtime boundary, export targets, package outputs, and delivery constraints.
- Security and performance shard: requirements, review triggers, budgets, observability.
- Execution rules shard: anti-slop standards, branching rules, spec ownership, test expectations.
- Wave shard: wave objective, specs, deliverables, gates, parallelization notes.
- Spec shard: single engineering spec and directly referenced contracts.
- Fixture shard: examples and expected input/output records for the task.
- Audit shard: rubric, traceability matrix, and changed docs under review.

## Agent Seed Packs

Source acquisition agent:

- Execution rules shard.
- Security and performance shard.
- SPEC 01.
- SPEC 02 interface references.
- Wave 1 roadmap slice.

Extraction agent:

- Execution rules shard.
- Technical architecture shard.
- SPEC 03.
- SPEC 04.
- Foundry fixture shard.

Entity resolution agent:

- Execution rules shard.
- SPEC 05.
- SPEC 06 interface references.
- Alias evaluation fixture shard.

Context generation agent:

- Product vision shard.
- Business use cases shard.
- SPEC 08.
- SPEC 09 interface references.

Product UX agent:

- Product vision shard.
- Brand design shard.
- UX principles shard.
- SPEC 10.
- API contract shard for relevant screens.

Context delivery agent:

- Product vision shard.
- Context delivery shard.
- SPEC 12.
- SPEC 09 interface references.
- Runtime target fixture shard.

Independent business audit agent:

- Business use cases shard.
- Context delivery shard when runtime/export docs changed.
- Business goal rubric.
- Traceability matrix.
- Changed roadmap/spec/product docs only.

## Update Workflow

When a source document changes:

1. Update the source summary.
2. Update affected context shards.
3. Update traceability matrix.
4. Run independent business audit.
5. Only then seed implementation agents with revised shards.
