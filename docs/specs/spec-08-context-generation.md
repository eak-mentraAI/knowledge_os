# SPEC 08: Context Generation

## Purpose

Generate AI-ready context packs and maps from graph, embedding, ontology, and evidence data.

## Business-Goal Trace

Supports automated project space generation, AI context generation, onboarding, architecture impact analysis, capability mapping, knowledge gap detection, and organizational memory.

## Scope

Generated assets:

- Domain context packs.
- Persona context packs.
- Architecture context packs.
- Security context packs.
- Project context packs.
- Application context packs.
- Domain maps.
- Persona maps.
- Architecture maps.
- Dependency maps.
- Risk maps.
- Knowledge gap reports.

## Required Behavior

- Generate bounded, evidence-linked context.
- Include concepts, capabilities, relationships, constraints, governance, security, source evidence, and confidence.
- Rank importance by graph centrality, relationship strength, source evidence quality, and business relevance.
- Mark missing evidence or weakly connected concepts as gaps.
- Produce context assets that can be packaged by the Context Delivery Layer without changing their source meaning or provenance.

## Interfaces

Input:

- graph query result
- embeddings
- domain pack
- generation objective

Output:

- `ContextPack`
- `DomainMap`
- `PersonaMap`
- `ArchitectureMap`
- `RiskMap`
- `GapReport`

## Security and Privacy

- Context packs inherit the permissions of their evidence sources.
- Generated context must include provenance.

## Performance

- Context generation must be incremental where possible.
- Re-generation must use content hashes and graph version IDs.

## Acceptance Criteria

- Context packs can be used by assistant generation without manual prompt assembly.
- Context packs can be handed to the Context Delivery Layer for runtime-specific packaging.
- Generated maps include evidence and constraints.
- Knowledge gaps identify missing ownership, relationships, workflows, or use cases.
