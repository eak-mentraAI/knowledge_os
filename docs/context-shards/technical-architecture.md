# Technical Architecture Shard

Subsystems:

- Source acquisition.
- Document processing.
- Extraction.
- Ontology and domain packs.
- Entity resolution.
- Graph storage.
- Embedding storage.
- Hybrid retrieval.
- Context generation.
- Project spaces.
- Assistant generation.
- Context delivery layer.
- Product UX.
- Evaluation and observability.

Core contracts:

- `SourceRecord`
- `CanonicalDocument`
- `NodeCandidate`
- `EdgeCandidate`
- `ResolvedEntity`
- `ResolvedRelationship`
- `EmbeddingRecord`
- `RetrievalResult`
- `ContextPack`
- `ProjectSpace`
- `AssistantConfig`
- `ProjectSpacePackage`
- `RuntimeExport`
- `KnowledgeFile`

Architecture rule:

Adapters are replaceable. Domain logic is not hidden in routes, tasks, prompts, or UI components.
