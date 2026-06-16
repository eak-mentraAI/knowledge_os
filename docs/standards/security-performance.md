# Security and Performance Standards

Security and performance are acceptance criteria, not late-stage polish.

## Security Standards

- Treat all source content as untrusted input.
- Preserve source evidence without executing arbitrary source scripts outside the rendering sandbox.
- Never store secrets in source, generated context packs, logs, traces, screenshots, or evaluation fixtures.
- Require allowlists for crawled domains in production.
- Enforce tenant and project isolation before enabling multi-corpus or enterprise connectors.
- Record provenance for every extracted node, edge, context-pack item, and assistant answer.
- Enforce authorization at API boundaries and again at data-access boundaries.
- Redact sensitive content in logs by default.
- Validate all inbound and outbound payloads with versioned schemas.
- Run dependency, container, and secret scans in CI before merge.

## Security Review Triggers

Security review is mandatory for:

- New source connectors.
- JavaScript rendering or browser automation changes.
- New storage targets.
- New LLM, embedding, reranking, or tool-use providers.
- Assistant generation, deployment, or export.
- Context delivery exports to ChatGPT Projects, custom GPTs, SharePoint workspaces, Copilot agents, markdown repositories, or other execution runtimes.
- Any feature that crosses tenant, workspace, project, or corpus boundaries.

## Performance Standards

Every wave must define budgets before implementation.

Baseline budget categories:

- Crawl throughput: pages per minute by source type.
- Extraction latency: p50, p95, and failure rate per document size bucket.
- Entity resolution latency: per document and per corpus batch.
- Graph write throughput: nodes and edges per second.
- Embedding throughput: chunks per minute and cost per 1,000 documents.
- Retrieval latency: p50 and p95 for hybrid retrieval.
- Project space generation latency: must target under 60 seconds for MVP-size corpora.
- Assistant answer latency: budgeted by retrieval, graph expansion, context assembly, and generation.

## Observability Standards

All production services and long-running workers must emit:

- Structured logs with correlation IDs.
- Metrics for throughput, latency, cost, retries, and failure modes.
- Traces across crawl, processing, extraction, resolution, storage, retrieval, and generation.
- Audit events for source ingestion, generated assets, assistant configuration, and data access.
- Audit events for runtime export previews, package generation, and publication receipts.

## Failure Policy

Failures should be typed, observable, and recoverable where possible.

- Partial extraction must produce an explicit incomplete state.
- Generated outputs must include evidence coverage and confidence.
- Retries must be bounded and idempotent.
- Batch jobs must resume from checkpoints.
- User-facing screens should communicate status without exposing internal graph details.
