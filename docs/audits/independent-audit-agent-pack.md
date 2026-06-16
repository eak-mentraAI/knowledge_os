# Independent Audit Agent Pack

Independent audit agents review whether product docs and specs achieve business goals if implemented faithfully.

They are deliberately separate from authoring and implementation agents.

## Seed Context

Give audit agents:

- [Business Use Cases Shard](../context-shards/business-use-cases.md)
- [Business Goal Rubric](business-goal-rubric.md)
- [Traceability Matrix](traceability-matrix.md)
- [Brand Design Shard](../context-shards/brand-design.md) for UX-facing documentation.
- [Context Delivery Shard](../context-shards/context-delivery.md) for runtime/export documentation.
- Changed roadmap/spec/product docs under review.

Do not give audit agents:

- Full repo context by default.
- Implementation logs.
- Author rationale.
- Drafts they helped write in the same pass.

## Audit Prompt

Review the supplied product documentation as an independent business-goal auditor.

Use the strategic use cases and business ontology as the review frame. Determine whether the docs, if executed faithfully, would create a Knowledge Operating System that accelerates decision-making rather than a generic documentation search or graph visualization tool.

Return:

- Pass/fail recommendation.
- Top risks by severity.
- Missing business outcomes.
- Missing acceptance criteria.
- Places where docs invite god code, forks, or unclear ownership.
- Security or performance gaps.
- Traceability gaps by strategic use case.
- Concrete edits required before implementation agents proceed.

## Audit Cadence

Run independent audit:

- After roadmap changes.
- After any spec is created or materially changed.
- Before a wave moves into implementation.
- Before generated assistants or project spaces are considered demo-ready.
- After parallel documentation work is reconciled.

## Audit Independence Rule

An audit agent cannot approve an artifact it helped author in the same work pass.
