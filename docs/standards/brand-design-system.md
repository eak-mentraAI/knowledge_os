# Brand and Design System Standards

These standards translate the brand guide into rules for implementation agents.

## Source of Truth

Brand source files live in `docs/source/brand_assets/`.

- `fe_brand_design_guide.md`
- `knowledge_os_logo.png`

The brand guide supersedes earlier light-first language for MVP. Knowledge OS is dark-first unless a later approved decision changes that.

## Brand Promise

Knowledge OS transforms organizational knowledge into actionable context.

The product should feel:

- Intelligent.
- Structured.
- Confident.
- Calm.
- Technical.
- Precise.
- Trustworthy.

The product must not feel:

- Playful.
- Consumer-focused.
- Gimmicky.
- Cyberpunk.
- Gaming-oriented.
- Experimental for its own sake.

## Design Tokens

```css
:root {
  --bg-primary: #0B1020;
  --bg-secondary: #12192B;
  --bg-surface: #1B2336;
  --brand-primary: #4DA3FF;
  --brand-hover: #67B3FF;
  --brand-dark: #2E7FE8;
  --success: #2ECC71;
  --warning: #F5A623;
  --error: #FF5C5C;
}
```

Use `--brand-primary` for active navigation, primary actions, AI actions, links, and selection states.

## Typography

- Primary font: Inter.
- Acceptable alternative: Geist.
- Monospace: JetBrains Mono for relationships, queries, identifiers, and technical references.

## Layout

- Target a calm, spacious interface.
- Use cards, panels, and sections with restraint.
- Avoid excessive nesting.
- Do not make the interface feel like a dense enterprise portal.
- Do not overdecorate; the brand guide targets 70% whitespace, 20% content, and 10% decoration.

## Navigation

Top-level navigation is fixed unless reviewed:

- Dashboard.
- Sources.
- Knowledge Model.
- Domains.
- Project Spaces.
- Assistants.

## Visualization Rules

Prefer:

- Architecture layer diagrams.
- Dependency trees.
- Coverage heatmaps.
- Relationship tables.
- Domain and capability maps.

Avoid:

- Force-directed graphs.
- Hairball diagrams.
- 3D graph views.
- Animated network clouds.
- Complex node-link diagrams.

## Motion

Motion must be subtle and purposeful.

- Duration: 150ms to 250ms.
- Prefer fade, slide, and expand.
- Avoid bounce, elastic motion, and excessive animation.

## Logo Usage

- Use the approved logo asset from `docs/source/brand_assets/knowledge_os_logo.png`.
- Do not redraw the logo in CSS, SVG, or canvas unless a future brand package explicitly provides vector construction rules.
- Do not crop the wordmark so tightly that the icon or "Knowledge OS" text loses breathing room.
- Place logo usage on dark or cool-neutral surfaces that preserve contrast.

