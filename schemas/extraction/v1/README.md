# Extraction Schemas v1

These schemas define extraction run outputs.

Contracts:

- `extraction-run.schema.json`: extraction run metadata, node candidates, edge candidates, metrics, and evidence spans.

Rules:

- Every node and edge candidate must include source evidence.
- Extraction remains separate from entity resolution.
- Confidence is explicit.
- Extraction version is recorded.

