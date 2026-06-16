# Parallel Execution Strategy

The project should maximize wall-clock speed only after quality constraints are secured.

## Sequence

1. Secure source context.
2. Secure standards.
3. Secure interfaces and fixtures.
4. Assign focused agents.
5. Run responsible work in parallel.
6. Run unit, contract, integration, and e2e gates for affected work.
7. Reconcile contracts.
8. Run independent audits.
9. Merge only after gates pass.

## Good Parallel Work

- Source connector adapter implementation after `SourceRecord` and `CanonicalDocument` contracts exist.
- Eval fixture creation alongside implementation when expected outputs are defined.
- UI screens for separate navigation sections after API contracts and design system are stable.
- Storage adapters after graph mutation contracts are stable.
- Domain maps, persona maps, and architecture maps after context-pack schema is stable.
- Runtime-specific exporters after `ProjectSpacePackage`, `RuntimeExport`, and `DeliveryPolicy` contracts are stable.

## Bad Parallel Work

- Multiple agents defining the same schema independently.
- UI work before the product workflow is settled.
- Extraction prompt changes without eval ownership.
- Storage implementation before identity and provenance semantics are agreed.
- Assistant generation before retrieval authorization is settled.
- Runtime exports before permissions, provenance, and package contract rules are settled.

## Merge Discipline

- Merge shared contracts first.
- Merge adapters second.
- Merge orchestration third.
- Merge UX last unless UI is using mocked approved contracts.
- Run contract tests after every merge touching shared schemas.

## Wall-Clock Metrics

Track:

- Agent wait time caused by missing contracts.
- Rework caused by incompatible schemas.
- Audit failures by wave.
- Parallel branch merge conflicts.
- Context seed size per agent.
- Time from spec approval to passing evals.
