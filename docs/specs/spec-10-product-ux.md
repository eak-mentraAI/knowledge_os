# SPEC 10: Product UX

## Purpose

Define the Knowledge OS product experience that hides graph complexity and focuses users on understanding, decisions, project spaces, and assistants.

## Business-Goal Trace

Supports domain understanding, project space generation, generated assistants, onboarding, dependency discovery, and decision acceleration.

## Scope

Top-level navigation is limited to:

- Dashboard.
- Sources.
- Knowledge Model.
- Domains.
- Project Spaces.
- Assistants.

No additional top-level navigation is permitted without review.

## Brand System

The current brand guide makes Knowledge OS dark-first for MVP.

Core tokens:

- `--bg-primary: #0B1020`
- `--bg-secondary: #12192B`
- `--bg-surface: #1B2336`
- `--brand-primary: #4DA3FF`
- `--brand-hover: #67B3FF`
- `--brand-dark: #2E7FE8`
- `--success: #2ECC71`
- `--warning: #F5A623`
- `--error: #FF5C5C`

Typography:

- Inter preferred.
- Geist acceptable.
- JetBrains Mono for technical identifiers and relationship references.

Brand feel:

- Intelligent, structured, confident, calm, technical, precise, trustworthy.
- Not playful, gimmicky, cyberpunk, gaming-oriented, or graph-tool-like.

## Product Boundary

Knowledge OS is the control plane and context-generation platform. ChatGPT Projects, GPTs, SharePoint, Copilot, and similar environments may be the primary execution runtime for collaboration, editing, iteration, and deliverables.

## Required Behavior

- Users should never need to understand graph internals to complete primary workflows.
- Every major page supports contextual AI actions: explain, summarize, find related concepts, show dependencies, generate workspace, and generate assistant.
- Project-space and assistant screens must support runtime export paths when the Context Delivery Layer is enabled.
- Avoid force-directed graph visualizations for primary UX.
- Prefer architecture layers, dependency trees, coverage heatmaps, relationship tables, and domain maps.
- Use the approved Knowledge OS logo asset from `docs/source/brand_assets/knowledge_os_logo.png`; do not recreate the logo in code.

## UX Workflows

1. Add Knowledge: add source, select domain pack, extract knowledge, review results.
2. Explore Domain: select domain, explore concepts, dependencies, governance.
3. Create Project Space: define goal, generate context, generate workspace, refine workspace.
4. Generate Assistant: select project space, select domains, generate assistant, deploy assistant.

## Security and Privacy

- UI must not expose unauthorized sources, evidence, context packs, project spaces, or assistants.
- Internal node IDs and edge IDs are hidden unless explicitly requested in an advanced view.

## Performance

- Domain overview and dashboard pages must load progressively.
- Long-running generation flows must show status and partial progress without exposing internals.

## Acceptance Criteria

- User can understand a domain within five minutes.
- User can create a project space within three minutes.
- User can generate an assistant within two minutes.
- User can find critical dependencies within one minute.
- User can understand where a generated project space should be used: inside Knowledge OS or exported into an execution runtime.
