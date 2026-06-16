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
| W0-S2 | 0 | Quality command contract and test skeleton | complete | Root quality commands documented and wired to placeholder-safe checks |
| W1-S1 | 1 | Source definition and crawl inventory contracts | complete | Unit and contract tests for source/crawl schemas |
| W1-S2 | 1 | URL list ingestion | complete | Unit tests plus local ingestion fixture |
| W1-S3 | 1 | Documentation portal discovery | complete | Discovery integration test with controlled fixture site |
| W1-S4 | 1 | Canonical document generation | complete | Canonical document contract tests and evidence anchors |
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

### W0-S2 Completion Note

Date: 2026-06-16
Agent: Codex
Commit: W0-S2 completion commit
Scope: Added root quality command contract, dependency-free Node gate runner, PowerShell wrapper, initial unit self-test, test/eval directory skeletons, and command documentation.
Local deployment: `npm run dev` contract exists; no local app implementation exists yet, so the dev gate reports not applicable.
Unit tests: `node tools/quality/run-gate.mjs unit` passed.
Contract tests: `node tools/quality/run-gate.mjs contract` passed as not applicable because no schema implementation exists yet.
Integration tests: `node tools/quality/run-gate.mjs integration` passed as not applicable because no cross-boundary implementation exists yet.
E2e tests: `node tools/quality/run-gate.mjs e2e` passed as not applicable because no app/workflow implementation exists yet.
Security/performance checks: `node tools/quality/run-gate.mjs quality` passed; no security-sensitive runtime behavior exists yet.
Open debt: Global `node` and `npm` are not reliable in the current shell; gates were verified with the Codex bundled Node executable. Future implementation should install/configure Node LTS on PATH or continue using `NODE_EXE`.
Next sprint: W1-S1.

### W1-S1 Completion Note

Date: 2026-06-16
Agent: Codex
Commit: W1-S1 completion commit
Scope: Added versioned source acquisition schemas for `SourceDefinition`, `CrawlPolicy`, `SourceRecord`, and `CrawlInventory`; added examples, a schema registry package, unit tests, and contract tests.
Local deployment: Not applicable. This sprint defines contracts and does not add app or service runtime behavior.
Unit tests: `node tools/quality/run-gate.mjs unit` passed with 5 tests.
Contract tests: `node tools/quality/run-gate.mjs contract` passed with 5 tests.
Integration tests: `node tools/quality/run-gate.mjs integration` passed as not applicable because no deployable app/service implementation exists yet.
E2e tests: `node tools/quality/run-gate.mjs e2e` passed as not applicable because no app/workflow implementation exists yet.
Security/performance checks: Full `node tools/quality/run-gate.mjs quality` passed. Schemas require allowlists, crawl limits, provenance, content hash fields, failure totals, and checkpoint state.
Open debt: JSON Schema validation is currently enforced by dependency-free contract tests; if a future sprint adds a full JSON Schema validator, update the quality contract and tests together.
Next sprint: W1-S2.

### W1-S2 Completion Note

Date: 2026-06-16
Agent: Codex
Commit: W1-S2 completion commit
Scope: Added URL list CSV ingestion package with parsing, normalization, credential/fragment removal, deduplication, domain allowlist enforcement, transparent skipped/blocked records, and crawl inventory output.
Local deployment: Not applicable. This sprint is a package-level ingestion unit with no app or service runtime.
Unit tests: `node tools/quality/run-gate.mjs unit` passed with 9 tests.
Contract tests: `node tools/quality/run-gate.mjs contract` passed with 6 tests, including validation that ingestion output satisfies `CrawlInventory` and `SourceRecord` contracts.
Integration tests: `node tools/quality/run-gate.mjs integration` passed as not applicable because no deployable app/service implementation exists yet.
E2e tests: `node tools/quality/run-gate.mjs e2e` passed as not applicable because no app/workflow implementation exists yet.
Security/performance checks: Full `node tools/quality/run-gate.mjs quality` passed. URL normalization strips credentials and fragments; allowlist enforcement blocks out-of-domain URLs.
Open debt: CSV parser is intentionally scoped to URL-list ingestion and should not be generalized until another source type needs it.
Next sprint: W1-S3.

### W1-S3 Completion Note

Date: 2026-06-16
Agent: Codex
Commit: W1-S3 completion commit
Scope: Added documentation portal discovery over a provided page loader, HTML link extraction, relative URL resolution, deduplication, allowlist blocking, and crawl inventory output.
Local deployment: Not applicable. This sprint uses a controlled local fixture site and does not add a deployed app or network crawler.
Unit tests: `node tools/quality/run-gate.mjs unit` passed with 10 tests.
Contract tests: `node tools/quality/run-gate.mjs contract` passed with 6 tests.
Integration tests: `node tools/quality/run-gate.mjs integration` passed with 1 controlled fixture portal test.
E2e tests: `node tools/quality/run-gate.mjs e2e` passed as not applicable because no app/workflow implementation exists yet.
Security/performance checks: Full `node tools/quality/run-gate.mjs quality` passed. Discovery ignores non-web links, strips fragments, dedupes URLs, and blocks out-of-allowlist domains.
Open debt: This sprint intentionally accepts a supplied page loader; real network fetching, robots handling, and JavaScript rendering remain later source acquisition work.
Next sprint: W1-S4.

### W1-S4 Completion Note

Date: 2026-06-16
Agent: Codex
Commit: W1-S4 completion commit
Scope: Added canonical document schema, controlled HTML-to-canonical-document processor, stable document/section IDs, normalized text, links, simple table extraction, content hashes, and evidence spans.
Local deployment: Not applicable. This sprint is package-level document processing and does not add app or service runtime behavior.
Unit tests: `node tools/quality/run-gate.mjs unit` passed with 12 tests.
Contract tests: `node tools/quality/run-gate.mjs contract` passed with 8 tests, including generated canonical document schema validation.
Integration tests: `node tools/quality/run-gate.mjs integration` passed with 1 existing controlled fixture portal test.
E2e tests: `node tools/quality/run-gate.mjs e2e` passed as not applicable because no app/workflow implementation exists yet.
Security/performance checks: Full `node tools/quality/run-gate.mjs quality` passed. Empty content is explicit, content hash is generated, and evidence spans are attached to sections, links, and tables.
Open debt: HTML processing is intentionally fixture-oriented and does not replace a browser renderer, PDF parser, or production HTML extraction library.
Next sprint: W2-S1.
