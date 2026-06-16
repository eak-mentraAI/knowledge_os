# SPEC 12: Context Delivery Layer

## Purpose

Transform Knowledge OS assets into runtime-ready packages for the environments where teams execute work.

This is not a product pivot. Knowledge OS remains the intelligence and context-generation platform. The Context Delivery Layer clarifies how generated assets are consumed in ChatGPT Projects, custom GPTs, SharePoint, Copilot, markdown repositories, and similar runtimes.

## Business-Goal Trace

Supports automated project space generation, AI context generation, project copilots, generated assistants, onboarding, organizational memory, and faster execution by delivering generated context into existing collaboration and AI workspaces.

## Scope

Knowledge OS owns:

- Discovery.
- Extraction.
- Ontology.
- Graph.
- Reasoning.
- Context generation.
- Project generation.
- Assistant generation.
- Context delivery packaging.

Runtime environments own:

- Collaboration.
- Editing.
- Execution.
- Iteration.
- Deliverables.

Initial runtime targets:

- ChatGPT Projects.
- Custom GPTs.
- SharePoint workspaces.
- Copilot agents.
- Markdown repositories.

## Required Behavior

- Package project spaces, context packs, assistant instructions, knowledge files, architecture packs, and persona packs.
- Preserve evidence, provenance, permissions, and generation metadata.
- Render runtime-specific formats without forking the underlying knowledge model.
- Support dry-run previews before export.
- Record export receipts and runtime target metadata.
- Keep export packaging separate from runtime deployment or publication where external approval is required.

## Interfaces

Input:

- `ProjectSpace`
- `ContextPack`
- `AssistantConfig`
- `RuntimeTarget`
- `DeliveryPolicy`

Output:

- `ProjectSpacePackage`
- `RuntimeExport`
- `KnowledgeFile`
- `AssistantInstructions`
- `ArchitecturePack`
- `PersonaPack`
- export receipt

## Runtime Package Shapes

ChatGPT Project package:

- Project overview.
- Goal and scope.
- Context files.
- Instructions.
- Source evidence index.
- Risks and constraints.
- Suggested prompts or tasks.

Custom GPT package:

- GPT instructions.
- Knowledge files.
- Retrieval guidance.
- Safety and governance constraints.
- Domain/persona scope.

SharePoint workspace package:

- Folder structure.
- Markdown or document files.
- Knowledge asset index.
- Evidence references.
- Owner and review metadata.

Copilot agent package:

- Agent instructions.
- Grounding files or connectors.
- Security constraints.
- Action boundaries.

Markdown repository package:

- README.
- Context pack files.
- Architecture and persona packs.
- Evidence index.
- Changelog.

## Security and Privacy

- Runtime exports must enforce caller permissions before packaging.
- Exported packages must not include inaccessible source content.
- Sensitive fields must be redacted or excluded according to delivery policy.
- Export receipts must record who exported what, when, to which runtime target, and under which source graph/context versions.
- Runtime-specific constraints must be documented before enabling live publication.

## Performance

- Packaging should be deterministic and cacheable by asset version and runtime target.
- Large packages should stream or chunk file generation.
- Export preview should be fast enough for interactive review on MVP-size project spaces.

## Observability

Track:

- Export target.
- Asset versions.
- Package size.
- File count.
- Generation latency.
- Policy exclusions.
- Export failures.
- Runtime publication status, if applicable.

## Acceptance Criteria

- A generated project space can be exported as a runtime-ready package without changing the project-space source model.
- Export includes context, instructions, knowledge files, evidence index, constraints, and risks.
- Runtime packages preserve provenance and permission boundaries.
- Package previews are reviewable before publication.
- Independent business audit confirms the delivery layer improves execution workflow without expanding Knowledge OS into collaboration, task management, chat, or document management.

