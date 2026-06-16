# Knowledge OS Platform

Knowledge OS is an enterprise reasoning platform that converts documentation, knowledge bases, wikis, architecture artifacts, and operational processes into a living knowledge substrate for humans and AI systems.

The product goal is not document retrieval. The product goal is faster, better-grounded decision-making through domain models, context packs, project spaces, architecture maps, and generated assistants.

## Current Project State

This repository starts docs-first on purpose. Implementation should not begin until the standards, roadmap, engineering specs, sharding strategy, and independent audit gates are in place.

Primary entry points:

- [Docs Index](docs/README.md)
- [Anti-Slop Engineering Standards](docs/standards/anti-slop.md)
- [Brand and Design System Standards](docs/standards/brand-design-system.md)
- [Roadmap](docs/roadmap/roadmap.md)
- [Sprint Backlog and Completion Ledger](docs/roadmap/sprint-backlog.md)
- [Engineering Specs](docs/specs/README.md)
- [Implementation Completion Loop](docs/strategy/implementation-completion-loop.md)
- [Test Strategy](docs/testing/test-strategy.md)
- [Documentation Sharding Strategy](docs/strategy/documentation-sharding.md)
- [Agent Orchestration Strategy](docs/strategy/agent-orchestration.md)
- [Independent Business Audit Pack](docs/audits/independent-audit-agent-pack.md)

## Product Outputs

Knowledge OS produces four primary output families:

- Knowledge graph: canonical nodes, relationships, definitions, dependencies, governance structures, and source evidence.
- Embedding layer: semantic indexes for documents, concepts, components, capabilities, and use cases.
- Context packs: bounded AI-ready knowledge bundles for domains, personas, architecture, security, projects, and applications.
- Project spaces: generated workspaces that assemble goals, domains, personas, concepts, relationships, documents, risks, constraints, and suggested assistants.
- Context delivery packages: exported project space packages, assistant instructions, knowledge files, architecture packs, and persona packs for ChatGPT Projects, GPTs, SharePoint, Copilot, and markdown repositories.

## Operating Principles

- Business goals drive architecture, not the other way around.
- The graph is infrastructure; users experience domains, dependencies, decisions, project spaces, and assistants.
- Knowledge OS is the compiler and intelligence layer; ChatGPT Projects, GPTs, SharePoint, Copilot, and similar environments are execution runtimes.
- Product UX is dark-first, calm, precise, and brand-led by the Knowledge OS logo and design guide.
- Code must be modular, testable, observable, replaceable at boundaries, and small enough to understand.
- Security, privacy, governance, and performance are first-class acceptance criteria.
- Forks require explicit approval, an owner, an exit plan, and documented upstream divergence.
- Parallel work is encouraged only after interfaces, fixtures, contracts, and audit gates are secured.
- Roadmap work proceeds through the sprint completion loop: test, implement, locally deploy where applicable, run e2e, fix, record proof, commit, and continue.

## Tooling Baseline

The first implementation baseline is documented in [Tooling Baseline](docs/standards/tooling-baseline.md). Before creating lockfiles, implementation agents must re-verify current stable versions and document any changes through the decision process.
