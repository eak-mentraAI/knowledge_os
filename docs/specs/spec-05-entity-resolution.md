# SPEC 05: Entity Resolution

## Purpose

Merge aliases and duplicates into canonical graph entities with stable IDs.

## Business-Goal Trace

Supports dependency mapping, impact analysis, capability mapping, generated assistants, and organizational memory.

## Scope

Resolution responsibilities:

- Alias detection.
- Duplicate candidate generation.
- Canonical naming.
- Stable ID assignment.
- Merge explanation.
- Human review workflow where confidence is low.

## Required Behavior

- Normalize obvious aliases such as "Ontology", "The Ontology", and "Ontology System".
- Preserve all source mentions and evidence.
- Never delete evidence during merge.
- Keep merge decisions auditable.
- Support undo or superseding merge decisions.

## Interfaces

Input:

- `NodeCandidate`
- `EdgeCandidate`
- `DomainPack`

Output:

- `ResolvedEntity`
- `ResolvedRelationship`
- `ResolutionDecision`

## Security and Privacy

- Do not merge across tenants, corpora, or permission boundaries without explicit policy support.

## Performance

- Blocking and candidate generation must scale to large corpora without all-pairs comparison.

## Acceptance Criteria

- 95%+ canonicalization target on curated Foundry aliases.
- Resolution output is deterministic for accepted merge decisions.
- Low-confidence merges are flagged rather than silently applied.

