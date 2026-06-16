# Source Documents

This folder stores source-of-truth product documents and distilled summaries for agent seeding.

Original source files expected here:

- `PRD_Knowledge_OS.docx`
- `Strategic_use_cases.docx`
- `brand_assets/fe_brand_design_guide.md`
- `brand_assets/knowledge_os_logo.png`

Rules:

- Do not edit original source documents in place.
- If a source document changes, regenerate the relevant summaries and update the traceability matrix.
- Audit agents should receive the strategic use-case summary and the changed product docs they are reviewing, not the full implementation workspace.
- Implementation agents should receive only the source shards needed for their wave or spec.
- UX and frontend agents should receive the brand-assets summary, brand-design shard, and source logo reference before creating UI.
