# Business Goal Rubric

Independent audit agents use this rubric to review roadmap, specs, generated docs, and major product decisions.

## Primary Question

If executed faithfully, does this work make Knowledge OS better at accelerating enterprise decision-making?

## Scoring

Use 0 to 3 for each category:

- 0: Missing or actively contradicted.
- 1: Mentioned but weak, vague, or untestable.
- 2: Mostly satisfied with minor gaps.
- 3: Strong, testable, and tied to product behavior.

## Categories

Strategic alignment:

- Advances one or more strategic use cases.
- Treats retrieval as a means, not the final product.
- Produces actionable context, decisions, dependencies, maps, project spaces, or assistants.
- Preserves the compiler/runtime boundary: Knowledge OS generates intelligence assets, while external runtimes handle collaboration and execution.

Business ontology:

- Models domains, capabilities, components, workflows, decisions, constraints, policies, personas, projects, dependencies, risks, and outcomes where relevant.

Decision acceleration:

- Reduces discovery time, review cycles, scoping uncertainty, context switching, or dependency misses.

Grounding and evidence:

- Preserves source evidence.
- Makes confidence and provenance visible.
- Reduces hallucination risk.

Governance and risk:

- Surfaces security, governance, policy, ownership, and operational constraints.

Project-first value:

- Moves users toward project spaces, assistant configurations, learning paths, impact analysis, or capability maps.

Usability:

- Hides graph complexity.
- Uses product language that business users, architects, engineers, analysts, and AI practitioners can understand.
- Applies the dark-first Knowledge OS brand without drifting into graph-tool, BI-dashboard, cyberpunk, gaming, or generic enterprise-portal aesthetics.
- Makes runtime delivery paths understandable without making Knowledge OS feel like it owns collaboration, editing, task management, chat, or file storage.

Measurability:

- Includes acceptance criteria, evals, telemetry, or observable success metrics.

## Fail Conditions

Fail the reviewed artifact if:

- It centers graph visualization over business understanding.
- It cannot trace to any strategic use case.
- It omits evidence/provenance for generated knowledge.
- It creates implementation ambiguity likely to cause god code.
- It ignores security, permission boundaries, or performance budgets.
- It creates parallel forks of concepts, schemas, prompts, or workflows without ownership.
- It turns Knowledge OS into a clone of Notion, Confluence, ChatGPT, SharePoint, or a graph visualization tool.
