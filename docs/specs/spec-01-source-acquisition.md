# SPEC 01: Source Acquisition

## Purpose

Acquire source documents from URL lists and documentation portals while preserving provenance and respecting security constraints.

## Business-Goal Trace

Supports automated project space generation, living enterprise architecture, knowledge gap detection, and organizational memory preservation.

## Scope

MVP inputs:

- CSV URL list.
- Root documentation URL.
- Sitemap where available.

Future inputs:

- PDF collection.
- Markdown repository.
- GitHub.
- Confluence.
- SharePoint.

## Required Behavior

- Accept a source definition with type, location, domain pack, crawl limits, and allowlist.
- Discover URLs.
- Deduplicate normalized URLs.
- Capture fetch status, content type, last modified, hash, and discovered links.
- Produce a crawl inventory.
- Mark each URL as discovered, fetched, skipped, failed, or blocked.

## Interfaces

Input:

- `SourceDefinition`
- `CrawlPolicy`

Output:

- `SourceRecord`
- `CrawlInventory`
- raw content reference

Contract location:

- `schemas/source-acquisition/v1/source-definition.schema.json`
- `schemas/source-acquisition/v1/crawl-policy.schema.json`
- `schemas/source-acquisition/v1/source-record.schema.json`
- `schemas/source-acquisition/v1/crawl-inventory.schema.json`
- `packages/source-acquisition-contracts/src/registry.mjs`
- `packages/source-acquisition/src/url-list-ingestion.mjs`
- `packages/source-acquisition/src/documentation-portal-discovery.mjs`

## Security and Privacy

- Enforce domain allowlists.
- Respect robots policy where configured.
- Bound crawl depth and total pages.
- Never execute downloaded code except through approved rendering sandbox.
- Redact credentials from URLs and logs.

## Performance

- Crawl concurrency must be configurable.
- Retries must be bounded.
- Jobs must checkpoint progress.

## Acceptance Criteria

- 95%+ URL discovery on controlled test corpus.
- Every fetched document has source provenance and content hash.
- Failed and skipped pages are visible in inventory.
- Crawl can be resumed without duplicating records.
