# SPEC 04: Extraction Engine

## Purpose

Extract evidence-linked nodes and edges from canonical documents using domain-pack guidance.

## Business-Goal Trace

Supports AI context generation, dependency mapping, impact analysis, knowledge gap detection, and assistant grounding.

## Scope

Extraction targets:

- Entities.
- Relationships.
- Definitions.
- Constraints.
- Security concepts.
- Governance controls.
- Administrative actions.
- Capabilities.
- Workflows.
- Risks.

## Required Behavior

- Accept canonical documents and a domain pack.
- Produce node and edge candidates with evidence spans, confidence, extraction version, and source references.
- Preserve uncertainty instead of inventing certainty.
- Separate extraction from entity resolution.
- Support deterministic re-runs for the same document and extractor version where possible.

## Interfaces

Input:

- `CanonicalDocument`
- `DomainPack`
- `ExtractionPolicy`

Output:

- `NodeCandidate`
- `EdgeCandidate`
- `ExtractionRun`

## Security and Privacy

- Prompt inputs must be bounded and evidence-based.
- Sensitive source data must not be logged.
- LLM provider calls must be observable without exposing raw secrets.

## Performance

- Extraction runs must support batching and checkpoints.
- Token and cost budgets must be recorded per run.

## Acceptance Criteria

- 90%+ extraction completion on MVP corpus.
- Entity and edge precision measured against curated eval set.
- Every candidate has source evidence.
- Failed extractions are resumable and visible.

