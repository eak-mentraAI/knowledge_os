# SPEC 09: Project Spaces and Assistants

## Purpose

Generate AI-ready project workspaces and assistant configurations from enterprise knowledge.

## Business-Goal Trace

Supports automated project space generation, auto-generated domain assistants, project copilot, AI context generation, dependency mapping, and faster decision-making.

## Scope

Project spaces include:

- Overview.
- Objective.
- Relevant domains.
- Relevant personas.
- Key concepts.
- Critical relationships.
- Relevant documents.
- Architecture recommendations.
- Open questions.
- Risks and constraints.
- Suggested assistants.

Assistant configurations include:

- Assistant name.
- Description.
- Knowledge domains.
- Project space.
- Retrieval strategy.
- Context pack.
- Security and governance constraints.

Project spaces and assistant configurations are primary Knowledge OS artifacts. They may be consumed inside Knowledge OS, but the preferred workflow may deliver them into execution runtimes such as ChatGPT Projects, custom GPTs, SharePoint workspaces, Copilot agents, or markdown repositories through the Context Delivery Layer.

## Required Behavior

- Accept a natural-language project objective.
- Identify relevant domains, concepts, personas, dependencies, constraints, policies, and risks.
- Generate a project workspace with evidence.
- Generate assistant configurations from project and domain context.
- Keep assistant generation separate from assistant deployment.
- Keep project and assistant generation separate from runtime export packaging.

## Interfaces

Input:

- `ProjectObjective`
- `ContextPack`
- `AssistantPolicy`

Output:

- `ProjectSpace`
- `AssistantConfig`
- `ProjectSpacePackage` handoff request for SPEC 12.

## Security and Privacy

- Assistant configs must not bypass source permissions.
- Deployment requires separate approval and policy checks.

## Performance

- MVP target: generate a project space in under 60 seconds for target corpus size.

## Acceptance Criteria

- Project space includes relevant domains, personas, constraints, dependencies, risks, and evidence.
- Generated assistant has a bounded context pack and retrieval policy.
- Generated project spaces and assistant configs can be packaged by the Context Delivery Layer without losing evidence, permissions, or provenance.
- Independent business audit confirms project output advances the stated initiative.
