# Source Acquisition Schemas v1

These schemas define the W1-S1 contracts for source acquisition.

Contracts:

- `source-definition.schema.json`: user-supplied source configuration.
- `crawl-policy.schema.json`: crawl limits, allowlists, rendering, and retry policy.
- `source-record.schema.json`: per-URL crawl inventory record with provenance.
- `crawl-inventory.schema.json`: crawl job inventory and resumable checkpoint state.

Rules:

- Preserve provenance for every source record.
- Keep allowlists and crawl limits explicit.
- Treat source content as untrusted.
- Do not store credentials or secrets in these payloads.
- Version schema changes. Do not mutate v1 in incompatible ways.

