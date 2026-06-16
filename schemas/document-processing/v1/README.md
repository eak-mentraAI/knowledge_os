# Document Processing Schemas v1

These schemas define the canonical document representation consumed by extraction, embeddings, retrieval, context generation, and evidence rendering.

Contracts:

- `canonical-document.schema.json`: normalized document, sections, links, tables, quality signals, and evidence spans.

Rules:

- Preserve source provenance.
- Keep stable document and section IDs.
- Make evidence spans explicit.
- Mark empty or failed parsing states instead of silently passing incomplete content.

