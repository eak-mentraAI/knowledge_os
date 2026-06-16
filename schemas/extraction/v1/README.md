# Extraction Schemas v1

These schemas define extraction run and quality reporting outputs.

Contracts:

- `extraction-run.schema.json`: extraction run metadata, node candidates, edge candidates, metrics, and evidence spans.
- `extraction-quality-report.schema.json`: completion, precision, failure visibility, and evidence coverage reporting.

Rules:

- Every node and edge candidate must include source evidence.
- Extraction remains separate from entity resolution.
- Confidence is explicit.
- Extraction version is recorded.
- Quality reports must make failed runs, missing expected candidates, unexpected candidates, and missing evidence visible.
