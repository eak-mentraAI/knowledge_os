# Context Shards

Context shards are compact seed files for agents. They are intentionally narrower than the full docs tree.

Agents should receive:

- One product or business shard if needed.
- The brand design shard for UI, frontend, or presentation-facing work.
- The context delivery shard for export, runtime, or assistant packaging work.
- One execution/standards shard.
- One engineering spec.
- Relevant fixtures or contracts.

Agents should not receive:

- The entire repository by default.
- Irrelevant specs.
- Audit instructions unless they are audit agents.
- Strategic source documents unless the summary is insufficient.
