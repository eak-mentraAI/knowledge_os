# Sprint Backlog and Completion Ledger

Status values:

- `not_started`
- `in_progress`
- `blocked`
- `complete`

This backlog is the source of truth for the completion loop. Agents should work the first incomplete sprint unless the user explicitly changes priority.

## Sprint Ledger

| ID | Wave | Sprint | Status | Primary proof |
| --- | --- | --- | --- | --- |
| W0-S1 | 0 | Standards, repo shape, and agent workflow | complete | Docs scaffold, anti-slop standards, audit pack, completion loop |
| W0-S2 | 0 | Quality command contract and test skeleton | not_started | Root quality commands documented and wired to placeholder-safe checks |
| W1-S1 | 1 | Source definition and crawl inventory contracts | not_started | Unit and contract tests for source/crawl schemas |
| W1-S2 | 1 | URL list ingestion | not_started | Unit tests plus local ingestion fixture |
| W1-S3 | 1 | Documentation portal discovery | not_started | Discovery integration test with controlled fixture site |
| W1-S4 | 1 | Canonical document generation | not_started | Canonical document contract tests and evidence anchors |
| W2-S1 | 2 | Base ontology package | not_started | Ontology schema unit tests and examples |
| W2-S2 | 2 | Foundry domain pack | not_started | Domain pack validation tests and fixture coverage |
| W2-S3 | 2 | Extraction candidate pipeline | not_started | Extraction eval fixture with evidence-linked nodes and edges |
| W2-S4 | 2 | Extraction quality reporting | not_started | Completion, precision, failure, and evidence coverage reports |
| W3-S1 | 3 | Entity resolution contracts | not_started | Alias and canonical ID unit tests |
| W3-S2 | 3 | Merge decision audit trail | not_started | Resolution decision tests and undo/supersede fixtures |
| W3-S3 | 3 | Neo4j graph writer adapter | not_started | Idempotent graph write integration test |
| W3-S4 | 3 | Graph export artifacts | not_started | `nodes.json` and `edges.json` contract tests |
| W4-S1 | 4 | Embedding record pipeline | not_started | Chunking and embedding metadata tests |
| W4-S2 | 4 | Vector-store adapter interface | not_started | Adapter contract tests |
| W4-S3 | 4 | Hybrid retrieval pipeline | not_started | Retrieval unit and integration tests |
| W4-S4 | 4 | Evidence-first context assembly | not_started | Groundedness eval and hallucination checks |
| W5-S1 | 5 | Context pack schema and generator | not_started | Context pack contract and generation tests |
| W5-S2 | 5 | Domain, persona, and architecture maps | not_started | Map generation tests with evidence |
| W5-S3 | 5 | Dependency, risk, and gap reports | not_started | Gap detection evals |
| W6-S1 | 6 | Project objective intake | not_started | Objective parsing and domain matching tests |
| W6-S2 | 6 | Project space generator | not_started | Project space e2e fixture under target latency |
| W6-S3 | 6 | Assistant config generator | not_started | Assistant config contract tests |
| W6-S4 | 6 | Project copilot context | not_started | Project context e2e workflow test |
| W7-S1 | 7 | Runtime export contracts | not_started | `ProjectSpacePackage`, `RuntimeExport`, and `DeliveryPolicy` tests |
| W7-S2 | 7 | Markdown repository package exporter | not_started | Local export package fixture and evidence index |
| W7-S3 | 7 | ChatGPT Project and custom GPT package shapes | not_started | Instruction and knowledge-file package tests |
| W7-S4 | 7 | SharePoint and Copilot package shapes | not_started | Package preview and receipt tests |
| W8-S1 | 8 | Design system implementation | not_started | Brand token tests and UI snapshot/e2e checks |
| W8-S2 | 8 | Dashboard and Sources UX | not_started | Local UI e2e for Add Knowledge |
| W8-S3 | 8 | Knowledge Model and Domains UX | not_started | Local UI e2e for Explore Domain |
| W8-S4 | 8 | Project Spaces and Assistants UX | not_started | Local UI e2e for Create Project Space and Generate Assistant |
| W8-S5 | 8 | Runtime export UX | not_started | Local UI e2e for Export Runtime Package |
| W9-S1 | 9 | Change detection contracts | not_started | Hash and versioning unit tests |
| W9-S2 | 9 | Incremental crawling and graph update semantics | not_started | Incremental update integration tests |
| W9-S3 | 9 | Enterprise connector hardening plan | not_started | Security review and connector contract tests |
| W9-S4 | 9 | Drift, memory, and governance reporting | not_started | Drift/gap e2e workflow tests |

## Ledger Update Template

For each completed sprint, append a note under this section:

```text
### W?-S? Completion Note

Date:
Agent:
Commit:
Scope:
Local deployment:
Unit tests:
Contract tests:
Integration tests:
E2e tests:
Security/performance checks:
Open debt:
Next sprint:
```

## Completion Notes

### W0-S1 Completion Note

Date: 2026-06-16
Agent: Codex
Commit: 1ee91dc
Scope: Initial docs-first project scaffold, anti-slop standards, roadmap, specs, audit pack, brand integration, and context delivery positioning.
Local deployment: Not applicable. No app implementation exists yet.
Unit tests: Not applicable. No code implementation exists yet.
Contract tests: Not applicable. Contracts documented but not implemented.
Integration tests: Not applicable.
E2e tests: Not applicable.
Security/performance checks: Standards and gates documented.
Open debt: W0-S2 must create executable quality command contract before implementation sprints begin.
Next sprint: W0-S2.

