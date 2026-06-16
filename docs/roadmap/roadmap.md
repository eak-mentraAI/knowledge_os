# Roadmap

The roadmap is organized around logical seams: source ingestion, document model, ontology, extraction, resolution, storage, retrieval, context generation, project spaces, assistants, context delivery, and product experience.

Each wave has a business goal, engineering specs, parallelization guidance, and an audit gate.

## Wave 0: Foundation, Standards, and Audit Harness

Objective: Establish enough structure that implementation can proceed without creating debt.

Business outcomes:

- Reduces delivery risk.
- Prevents architecture drift.
- Gives independent audit agents a clear product-goal standard.

Specs:

- [SPEC 00: Platform Architecture](../specs/spec-00-platform-architecture.md)
- [SPEC 11: Evaluation and Observability](../specs/spec-11-evaluation-observability.md)

Deliverables:

- Anti-slop standards.
- Security and performance standards.
- Tooling baseline.
- Documentation sharding strategy.
- Agent orchestration strategy.
- Independent audit pack.

Parallelization: Product docs, technical architecture, and audit rubric can be drafted in parallel after the PRD and strategic-use-case shards are frozen.

Gate: Audit agents confirm docs preserve the strategic goal: accelerated decision-making, not document retrieval theater.

## Wave 1: Source Acquisition and Canonical Documents

Objective: Ingest URL lists and documentation portals into normalized document objects with provenance.

Business outcomes:

- Enables automated knowledge acquisition.
- Creates evidence substrate for all downstream graph and assistant work.

Specs:

- [SPEC 01: Source Acquisition](../specs/spec-01-source-acquisition.md)
- [SPEC 02: Canonical Document Model](../specs/spec-02-canonical-document-model.md)

Deliverables:

- URL list ingestion.
- Documentation portal discovery.
- Crawl inventory.
- Canonical document schema.
- Source evidence model.

Parallelization: Source connector adapters and canonical schema validation can run in parallel once document contracts are approved.

Gate: 95%+ URL discovery target for controlled test corpus; every document has provenance, content hash, and extraction state.

## Wave 2: Foundry Ontology Pack and Extraction Engine

Objective: Extract Foundry-specific entities, relationships, definitions, constraints, security concepts, and administrative actions.

Business outcomes:

- Supports AI context generation.
- Starts the enterprise ontology with a meaningful reference domain.

Specs:

- [SPEC 03: Ontology and Domain Packs](../specs/spec-03-ontology-domain-packs.md)
- [SPEC 04: Extraction Engine](../specs/spec-04-extraction-engine.md)

Deliverables:

- Base ontology.
- Foundry domain pack.
- Extraction prompts/rules.
- Evidence-linked nodes and edges.
- Evaluation set for entity and edge quality.

Parallelization: Ontology modeling, extraction adapter contracts, and eval fixture creation can run in parallel after node and edge schemas are locked.

Gate: 90%+ extraction completion, tracked precision for entities and edges, and no generated entity without source evidence.

## Wave 3: Entity Resolution and Graph Storage

Objective: Canonicalize entities, merge aliases, assign stable IDs, and write the graph to Neo4j.

Business outcomes:

- Reduces duplicate concepts.
- Enables dependency and impact analysis.
- Creates the substrate for organizational memory.

Specs:

- [SPEC 05: Entity Resolution](../specs/spec-05-entity-resolution.md)
- [SPEC 06: Graph and Embedding Storage](../specs/spec-06-graph-embedding-storage.md)

Deliverables:

- Alias detection.
- Duplicate-merge workflow.
- Canonical IDs.
- Neo4j graph writer.
- Graph export artifacts.

Parallelization: Resolution evaluation and graph writer implementation can run in parallel against shared fixture contracts.

Gate: 95%+ canonicalization target on curated aliases; graph writes are idempotent and provenance-preserving.

## Wave 4: Embeddings and Hybrid Retrieval

Objective: Add semantic retrieval, graph expansion, and context assembly.

Business outcomes:

- Improves grounded answers.
- Reduces hallucinations.
- Makes architecture impact questions possible.

Specs:

- [SPEC 06: Graph and Embedding Storage](../specs/spec-06-graph-embedding-storage.md)
- [SPEC 07: Hybrid Retrieval](../specs/spec-07-hybrid-retrieval.md)

Deliverables:

- Chunking and embedding pipeline.
- Vector-store interface.
- Hybrid retrieval workflow.
- Evidence-first context assembly.
- Retrieval evals.

Parallelization: Embedding pipeline and graph expansion ranking can run in parallel after retrieval contract fixtures are approved.

Gate: Answers are grounded in graph evidence; hallucination rate target below 5% in evaluation set.

## Wave 5: Context Generation, Maps, and Business Reasoning

Objective: Generate domain context packs, persona maps, architecture maps, dependency maps, risk maps, and capability maps.

Business outcomes:

- Supports AI context generation.
- Enables onboarding, impact analysis, requirement dependency mapping, and capability planning.

Specs:

- [SPEC 08: Context Generation](../specs/spec-08-context-generation.md)
- [SPEC 11: Evaluation and Observability](../specs/spec-11-evaluation-observability.md)

Deliverables:

- Domain context packs.
- Persona context packs.
- Architecture maps.
- Dependency maps.
- Risk and gap detection reports.

Parallelization: Domain maps, persona maps, and architecture maps can proceed in parallel after shared context-pack schema is approved.

Gate: Generated assets include evidence, confidence, constraints, and business use-case traceability.

## Wave 6: Project Spaces and Generated Assistants

Objective: Turn graph and context outputs into project-first user workspaces and generated assistant configurations.

Business outcomes:

- Reduces discovery and alignment time from weeks to minutes.
- Reduces context switching.
- Makes expertise accessible through domain-aware assistants.

Specs:

- [SPEC 09: Project Spaces and Assistants](../specs/spec-09-project-spaces-assistants.md)
- [SPEC 10: Product UX](../specs/spec-10-product-ux.md)

Deliverables:

- Project space generation workflow.
- Assistant configuration generation.
- Project copilot context.
- Security and governance constraints surfaced in each workspace.

Parallelization: Project-space generation and assistant configuration can run in parallel only after context-pack schemas and permission rules are locked.

Gate: MVP project space generated in under 60 seconds for target corpus and includes domains, personas, constraints, dependencies, risks, and evidence.

## Wave 7: Context Delivery Layer

Objective: Package project spaces, context packs, assistant instructions, and knowledge assets for execution runtimes.

Business outcomes:

- Lets teams consume Knowledge OS outputs where they already collaborate and execute.
- Avoids expanding Knowledge OS into document management, task management, chat, file storage, or full collaboration suite.
- Supports project copilots and generated assistants in ChatGPT Projects, custom GPTs, SharePoint, Copilot, and markdown repositories.

Specs:

- [SPEC 12: Context Delivery Layer](../specs/spec-12-context-delivery-layer.md)
- [SPEC 09: Project Spaces and Assistants](../specs/spec-09-project-spaces-assistants.md)

Deliverables:

- Project space package.
- Context pack export.
- Assistant instructions.
- Knowledge files.
- Architecture pack.
- Persona pack.
- Export preview and receipt.

Parallelization: Runtime-specific package renderers can run in parallel after the shared `ProjectSpacePackage`, `RuntimeExport`, and `DeliveryPolicy` contracts are approved.

Gate: Package export preserves evidence, permissions, provenance, constraints, and runtime target metadata without forking the source knowledge model.

## Wave 8: Product UX and Operational Readiness

Objective: Deliver the user-facing Knowledge OS experience with dashboard, sources, knowledge model, domains, project spaces, and assistants.

Business outcomes:

- Makes graph complexity invisible.
- Enables non-graph users to understand domains and create workspaces.

Specs:

- [SPEC 10: Product UX](../specs/spec-10-product-ux.md)
- [SPEC 11: Evaluation and Observability](../specs/spec-11-evaluation-observability.md)

Deliverables:

- Dashboard.
- Sources.
- Knowledge Model.
- Domains.
- Project Spaces.
- Assistants.
- Runtime export paths.
- Observability dashboard.

Parallelization: UI surfaces can be parallelized by top-level navigation section after shared design system, API contracts, and loading/error states are approved.

Gate: Users can understand a domain within five minutes, create a project space within three minutes, generate an assistant within two minutes, and find critical dependencies within one minute.

## Wave 9: Incremental Updates and Enterprise Sources

Objective: Add change detection, incremental graph updates, enterprise source connectors, and multi-corpus readiness.

Business outcomes:

- Reduces documentation drift.
- Preserves organizational memory.
- Enables broader enterprise adoption.

Specs:

- Future connector specs.
- Future incremental-update spec.
- Future multi-corpus authorization spec.

Deliverables:

- Change detection.
- Incremental crawling.
- Connector hardening.
- Drift and gap reports.
- Multi-corpus governance.

Parallelization: Only after tenant isolation, connector security rules, and graph update semantics are proven.

Gate: Updates are idempotent, auditable, permission-aware, and do not corrupt existing graph identity.
