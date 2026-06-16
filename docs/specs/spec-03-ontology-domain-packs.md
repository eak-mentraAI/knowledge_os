# SPEC 03: Ontology and Domain Packs

## Purpose

Define the base ontology and domain-pack model used to extract and reason over enterprise knowledge.

## Business-Goal Trace

Supports capability mapping, architecture impact analysis, context generation, project spaces, generated assistants, and strategic portfolio planning.

## Scope

Base ontology includes:

- Domain
- Capability
- Component
- Workflow
- Decision
- Constraint
- Policy
- Persona
- Project
- Dependency
- Risk
- Outcome
- Document
- Section
- Concept
- UseCase
- SecurityBoundary
- GovernanceControl

Foundry domain pack includes concepts such as Foundry, Apollo, Rubix, Ontology, AIP, Multimodal Data Plane, Workflow Automation, Access Control, Policy Enforcement, Change Management, and Data Governance.

## Required Behavior

- Domain packs define node types, edge types, aliases, extraction guidance, validation rules, and examples.
- Base ontology remains domain-agnostic.
- Domain packs extend, not fork, the base ontology.
- Ontology changes require migration notes and eval updates.

## Interfaces

Inputs:

- `DomainPack`
- `OntologySchema`

Outputs:

- extraction instructions
- validation rules
- node and edge type definitions

Contract location:

- `schemas/ontology/v1/ontology-schema.schema.json`
- `schemas/ontology/v1/base-ontology.json`
- `packages/ontology/src/base-ontology.mjs`

## Security and Privacy

- Security boundaries, authentication methods, authorization models, governance controls, and policies are first-class ontology concepts.

## Performance

- Domain-pack lookup must be cached and versioned per extraction run.

## Acceptance Criteria

- Foundry domain pack can validate sample nodes and edges.
- Base ontology can represent all strategic business entities.
- No domain pack can redefine a base concept incompatibly without review.
