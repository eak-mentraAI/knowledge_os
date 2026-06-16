# SPEC 07: Hybrid Retrieval

## Purpose

Combine vector retrieval, entity resolution, graph expansion, and evidence-aware context assembly.

## Business-Goal Trace

Supports grounded assistants, AI context generation, architecture impact analysis, project copilots, and hallucination reduction.

## Scope

Retrieval workflow:

1. User question or generation objective.
2. Vector retrieval.
3. Entity resolution against graph concepts.
4. Graph expansion.
5. Relevance and evidence ranking.
6. Context assembly.
7. Answer or generated asset.

## Required Behavior

- Return source evidence with all retrieval results.
- Expand graph neighborhoods with bounded depth and relation filters.
- Prioritize constraints, governance, security, dependencies, and definitions when relevant.
- Provide enough trace data to explain why context was selected.

## Interfaces

Input:

- `RetrievalQuery`
- `RetrievalPolicy`

Output:

- `RetrievalResult`
- `ContextAssembly`
- `EvidenceBundle`

## Security and Privacy

- Retrieval must enforce caller permissions before context assembly.
- Assistant-visible context must never include inaccessible source evidence.

## Performance

- Retrieval latency budgets must be split across vector search, graph expansion, ranking, and context assembly.

## Acceptance Criteria

- Retrieval evals measure groundedness, relevance, evidence coverage, and hallucination.
- Hallucination target is below 5% for curated evaluation set.
- Graph expansion cannot produce unbounded context.

