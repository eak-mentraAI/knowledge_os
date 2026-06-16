# SPEC 00: Platform Architecture

## Purpose

Define the platform seams that prevent god code and enable focused parallel implementation.

## Business-Goal Trace

Supports all strategic use cases by creating a reliable substrate for project spaces, impact analysis, context generation, assistants, gap detection, and organizational memory.

## Scope

The platform is organized into bounded subsystems:

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
- Context delivery.
- Product UX.
- Evaluation and observability.

## Architecture Rules

- Entry points orchestrate; domain packages decide.
- Every persisted artifact is versioned and provenance-aware.
- Every subsystem publishes schemas and examples.
- Every adapter has contract tests.
- LLM calls are isolated behind provider interfaces with structured inputs and outputs.
- Generated context is treated as product data with evidence, confidence, version, and source lineage.

## Interfaces

Initial shared contracts:

- `SourceRecord`
- `CrawlJob`
- `CanonicalDocument`
- `DocumentSection`
- `ExtractionRun`
- `NodeCandidate`
- `EdgeCandidate`
- `ResolvedEntity`
- `GraphMutation`
- `EmbeddingRecord`
- `RetrievalResult`
- `ContextPack`
- `ProjectSpace`
- `AssistantConfig`
- `ProjectSpacePackage`
- `RuntimeExport`
- `KnowledgeFile`

## Non-Goals

- No multi-tenant federation in MVP.
- No automatic ontology generation in MVP.
- No generated diagrams in MVP.
- No source-system mutation.
- No replacing ChatGPT Projects, SharePoint, Copilot, or similar runtime collaboration environments.

## Security and Privacy

- Source content is untrusted.
- Provenance must be preserved.
- Secrets must never enter generated artifacts.
- Authorization must be enforced at API and data-access boundaries.

## Performance

Every subsystem must emit latency, throughput, retry, failure, and cost metrics.

## Acceptance Criteria

- All subsystem boundaries have specs.
- Shared contracts have examples.
- Cross-boundary data validation exists before implementation.
- Architecture audit confirms no wave requires a monolithic god service.
