# Tooling Baseline

Verified on 2026-06-16. Re-verify before creating lockfiles or implementation branches.

## Version Policy

- Use the newest stable production-suitable version.
- Prefer LTS over Current for production runtimes when the runtime project recommends LTS for production.
- Pin exact versions in lockfiles.
- Record tool upgrades with rationale, migration notes, and rollback plan.
- Do not introduce parallel tooling stacks without an explicit decision record.

## Baseline Choices

| Area | Baseline | Rationale |
| --- | --- | --- |
| Python runtime | Python 3.14.6 | Python.org lists 3.14.6 as the latest stable source release and 3.14 in bugfix status. Source: https://www.python.org/downloads/ |
| Node runtime | Node.js 24.16.0 LTS | Node.js lists 24.16.0 as latest LTS. Node's release page says production applications should use Active LTS or Maintenance LTS releases. Sources: https://nodejs.org/en/download and https://nodejs.org/en/about/previous-releases |
| Frontend framework | Next.js 16.2.9 | Next.js docs list latest version 16.2.9. Source: https://nextjs.org/docs |
| UI runtime | React 19.2 line | React versions page identifies latest version 19.2 and release entries in the 19.2 line. Source: https://react.dev/versions |
| API framework | FastAPI 0.137.1 | PyPI shows FastAPI 0.137.1 uploaded on 2026-06-15. Source: https://pypi.org/project/fastapi/ |
| Data validation | Pydantic 2.13.0 | PyPI shows Pydantic v2.13.0 released 2026-04-13. Source: https://pypi.org/project/pydantic/ |

## Proposed Stack Shape

- Frontend: Next.js App Router, React, TypeScript, server-first rendering where practical.
- API: FastAPI with Pydantic models and OpenAPI-first contract review.
- Workers: Python workers for crawling, processing, extraction, entity resolution, embeddings, and graph writes.
- Graph: Neo4j first for MVP, with graph-store interface to evaluate Kuzu, Memgraph, or Neptune later.
- Vector: provider interface; storage target selected through a separate decision after retrieval and deployment constraints are known.
- Evals: extraction, canonicalization, edge precision, retrieval grounding, answer hallucination, and business-goal acceptance.

## Upgrade Gate

Before a tool upgrade:

- Confirm official stable release status.
- Run compatibility tests.
- Check known security advisories.
- Verify dependency ecosystem support.
- Update this file and any lockfiles together.

