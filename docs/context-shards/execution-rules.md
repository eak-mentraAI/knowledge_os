# Execution Rules Shard

Anti-slop rules:

- No god modules.
- No undocumented forks.
- No hidden contracts.
- No unbounded context blobs.
- No silent security bypasses.
- No implementation without a relevant spec.
- No generated product output without source evidence.

Security and performance:

- Treat all source content as untrusted.
- Preserve provenance.
- Enforce permissions at API and data boundaries.
- Define performance budgets before implementation.
- Emit logs, metrics, traces, and audit events for production services and workers.

Agent rules:

- Receive the smallest sufficient shard.
- Return changed files, contract changes, tests, risks, and next steps.
- Do not redefine shared schemas without spec updates.
- Reconcile parallel work through contract tests and audit gates.

