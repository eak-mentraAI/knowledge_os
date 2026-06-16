# SPEC 02: Canonical Document Model

## Purpose

Define the normalized document representation consumed by extraction, embeddings, retrieval, and evidence rendering.

## Business-Goal Trace

Supports grounded assistants, impact analysis, onboarding paths, dependency mapping, and organizational memory by making source evidence consistent.

## Scope

The canonical document model includes:

- Document metadata.
- Sections and heading hierarchy.
- Text blocks.
- Tables.
- Links.
- Source evidence anchors.
- Processing status.
- Content hashes and version metadata.

## Required Behavior

- Preserve source URL, title, headings, text, tables, links, and metadata.
- Assign stable section IDs.
- Produce evidence anchors usable by graph nodes, graph edges, context packs, and answers.
- Record extraction quality signals such as empty content, parse failures, or low text density.

## Interfaces

Output:

- `CanonicalDocument`
- `DocumentSection`
- `EvidenceSpan`
- `DocumentTable`
- `DocumentLink`

Contract location:

- `schemas/document-processing/v1/canonical-document.schema.json`
- `packages/document-processing/src/html-to-canonical-document.mjs`

## Security and Privacy

- Treat all content as untrusted.
- Strip or quarantine active scripts from canonical content.
- Preserve enough source context for audit without leaking credentials.

## Performance

- Processing must stream or chunk large documents.
- Hashing must allow change detection.

## Acceptance Criteria

- Canonical output is deterministic for the same source content.
- Section anchors are stable across non-substantive crawl changes.
- Extraction can cite exact evidence spans.
- Empty or failed documents cannot silently pass as complete.
