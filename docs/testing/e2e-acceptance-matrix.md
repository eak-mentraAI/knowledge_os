# E2e Acceptance Matrix

This matrix maps strategic use cases and product workflows to e2e test suites.

| Use case or workflow | E2e suite | Required proof |
| --- | --- | --- |
| Automated project space generation | Create Project Space | Generated project space includes domains, personas, dependencies, constraints, risks, documents, and evidence |
| Architecture impact analysis | Architecture Impact Analysis | Affected systems, workflows, governance implications, security implications, and evidence are returned |
| AI context generation | Generate Assistant | Context pack includes relationships, constraints, governance, evidence, and retrieval policy |
| Intelligent employee onboarding | Explore Domain | Domain learning path or overview prioritizes concepts, dependencies, workflows, architecture, and governance |
| Requirement dependency mapping | Create Project Space | Requirement maps to impacted domains, systems, ownership, and constraints |
| Feature impact analysis | Architecture Impact Analysis | Capability dependencies, governance impacts, and security implications are surfaced |
| Living enterprise architecture | Explore Domain | Architecture map reflects current graph relationships and source evidence |
| Capability mapping | Explore Domain | Capability inventory identifies supporting systems and gaps |
| Auto-generated domain assistants | Generate Assistant | Assistant config includes bounded context pack and graph-grounded retrieval |
| Project copilot | Create Project Space | Project context includes requirements, architecture, constraints, dependencies, risks, and suggested prompts |
| Knowledge gap detection | Knowledge Gap Detection | Missing relationships, ownership, workflows, or use cases are identified |
| Organizational memory preservation | Add Knowledge and Explore Domain | Historical knowledge, relationships, decisions, constraints, and evidence remain searchable |
| Context delivery layer | Export Runtime Package | Runtime package includes context, instructions, knowledge files, evidence index, constraints, risks, and receipt |

## Acceptance Thresholds

- No critical workflow may pass without evidence references.
- No workflow may expose unauthorized source content.
- Project space generation target is under 60 seconds for the MVP fixture.
- Assistant generation target is under two minutes for the MVP fixture.
- Domain understanding workflow must make critical dependencies discoverable within one minute in the local e2e path.

