# PRD Addendum: Brand, Design System, and User Experience Guidelines

## Purpose

This document defines the visual identity, user experience principles, navigation model, interaction patterns, and design language for Knowledge OS.

The objective is to ensure the platform presents itself as an enterprise intelligence system rather than a graph database, search engine, or documentation browser.

---

# Brand Positioning

## Core Brand Statement

Knowledge OS transforms organizational knowledge into actionable context.

The platform helps users understand domains, accelerate decisions, generate project spaces, and deploy AI assistants grounded in enterprise knowledge.

---

## Brand Attributes

### Primary Attributes

* Intelligent
* Structured
* Confident
* Calm
* Technical

### Secondary Attributes

* Insightful
* Modern
* Operational
* Precise
* Trustworthy

---

## Brand Characteristics to Avoid

The platform should not feel:

* Playful
* Consumer-focused
* Startup gimmicky
* Crypto-inspired
* Gaming-oriented
* Cyberpunk
* Experimental

---

# Product Identity

Knowledge OS is a:

**Knowledge Operating System**

It is not a:

* Graph Database
* Documentation Browser
* Search Engine
* Data Catalog
* Visualization Tool

The user experience should emphasize:

* Understanding
* Context
* Relationships
* Decisions
* Outcomes

Rather than:

* Nodes
* Edges
* Queries
* Graph Mechanics

---

# Design Philosophy

## Principle 1: The Graph is Invisible

Users should never feel they are interacting with a graph database.

The graph exists to power understanding.

Users should interact with:

* Domains
* Concepts
* Dependencies
* Workflows
* Project Spaces
* Assistants

---

## Principle 2: Understanding Over Visualization

Every screen should answer:

1. What is this?
2. Why does it matter?
3. What is connected to it?
4. What should I do next?

---

## Principle 3: Project-Centric Experience

The destination is not a graph.

The destination is a Project Space.

Every workflow should ultimately help users:

* Understand
* Plan
* Execute
* Deliver

---

## Principle 4: AI-Native Interaction

Every major page should support:

* Explain
* Summarize
* Explore
* Generate

---

# Design Inspiration

The platform should feel closer to:

* Linear
* OpenAI Platform
* Vercel
* Stripe Dashboard
* Palantir AIP

The platform should not resemble:

* Neo4j Browser
* Generic BI Tools
* Traditional Enterprise Portals
* Network Visualization Software

---

# Color System

## Theme Strategy

Knowledge OS is designed as a dark-first experience.

Dark mode should be considered the primary and default experience.

Future light mode support is optional and not required for MVP.

---

## Primary Background

```css
--bg-primary: #0B1020;
```

Purpose:

* Application shell
* Main background
* Navigation regions

---

## Secondary Background

```css
--bg-secondary: #12192B;
```

Purpose:

* Cards
* Panels
* Containers

---

## Tertiary Surface

```css
--bg-surface: #1B2336;
```

Purpose:

* Hover states
* Expanded panels
* Nested containers

---

# Brand Accent Color

The accent color derives directly from the Knowledge OS logo.

## Primary Accent

```css
--brand-primary: #4DA3FF;
```

Used for:

* Active navigation
* Primary actions
* AI actions
* Links
* Selection states

---

## Hover Accent

```css
--brand-hover: #67B3FF;
```

---

## Dark Accent

```css
--brand-dark: #2E7FE8;
```

---

# Semantic Colors

## Success

```css
--success: #2ECC71;
```

---

## Warning

```css
--warning: #F5A623;
```

---

## Error

```css
--error: #FF5C5C;
```

---

## Information

Use:

```css
--brand-primary
```

---

# Typography

Typography is a core component of the product experience.

Knowledge is primarily consumed through reading and understanding.

---

## Primary Font

Preferred:

```text
Inter
```

Alternative:

```text
Geist
```

---

## Body Text

```text
Inter
```

---

## Monospace

```text
JetBrains Mono
```

Used for:

* Relationships
* Queries
* Identifiers
* Technical references

---

# Layout Philosophy

## Information Density

Target:

```text
70% whitespace
20% content
10% decoration
```

The interface should feel calm and intentional.

---

## Spacing

Generous spacing is preferred.

Content should never feel compressed.

---

## Containers

Use:

* Cards
* Panels
* Sections

Avoid excessive nesting.

---

# Global Navigation

Top-level navigation is intentionally constrained.

## Primary Navigation

```text
Dashboard

Sources

Knowledge Model

Domains

Project Spaces

Assistants
```

No additional top-level items should be introduced without review.

---

# Dashboard Design

## Purpose

Provide visibility into organizational knowledge.

---

## Key Metrics

Display:

* Domains
* Concepts
* Relationships
* Sources
* Project Spaces
* Assistants
* Coverage

---

## Coverage Visualization

Example:

```text
Ontology      ██████████

Security      ████████░░

AIP           ██████░░░░

Applications  █████░░░░░
```

---

## Quick Actions

Primary actions:

* Add Source
* Create Project Space
* Generate Assistant
* Explore Domain

---

# Sources Page

## Purpose

Manage knowledge ingestion.

---

## Source Cards

Each source displays:

* Name
* Type
* Pages Discovered
* Pages Processed
* Coverage
* Last Crawl
* Extraction Status

---

# Knowledge Model Page

## Purpose

Explore extracted knowledge.

This replaces traditional graph exploration interfaces.

---

## Concepts Tab

Displays:

* Concept
* Definition
* Relationships
* Dependencies
* Source Documents

---

## Relationships Tab

Displays:

* Source
* Relationship
* Target
* Confidence
* Evidence

---

## Architecture Tab

Displays:

* Architecture Layers
* Dependencies
* Capability Maps

---

# Domains Page

## Purpose

Automatically generated domain encyclopedia.

---

## Domain Structure

Overview

Concepts

Capabilities

Dependencies

Personas

Governance

Security

Use Cases

Administrative Actions

---

## Example Domain

Ontology

Contains:

* Object Types
* Link Types
* Properties
* Actions
* Functions

---

# Project Spaces

## Purpose

Primary workspace experience.

This is where users spend most of their time.

---

## Project Space Structure

Overview

Knowledge Context

Relevant Concepts

Relevant Relationships

Relevant Documents

Architecture Recommendations

Constraints

Risks

Suggested Assistants

---

# Assistants

## Purpose

Deploy domain-aware AI assistants.

Assistants inherit context from:

* Domains
* Project Spaces
* Context Packs

---

## Assistant Types

* Domain Assistant
* Architecture Assistant
* Security Assistant
* Developer Assistant
* Project Assistant
* Support Assistant

---

# Data Visualization Guidelines

## Preferred Visualizations

### Architecture Layers

```text
Applications

AI

Semantic

Data

Infrastructure
```

---

### Dependency Trees

```text
Ontology

├─ AIP
├─ Applications
└─ Workflows
```

---

### Coverage Heatmaps

```text
Ontology      100%

Security       82%

Applications   67%
```

---

### Relationship Tables

Structured relationship views are preferred over graph diagrams.

---

## Visualizations to Avoid

Do not use:

* Force-directed graphs
* Hairball diagrams
* 3D graph visualizations
* Animated network clouds
* Complex node-link diagrams

These provide poor comprehension at enterprise scale.

---

# Motion Design

Motion should be subtle and purposeful.

Inspired by:

* Linear
* Vercel

---

## Animation Guidelines

Duration:

```text
150ms - 250ms
```

Preferred animations:

* Fade
* Slide
* Expand

Avoid:

* Bounce
* Elastic
* Excessive motion

---

# AI Interaction Model

Every major screen should provide AI actions.

## Required Actions

Explain

Summarize

Explore Related Concepts

Show Dependencies

Generate Project Space

Generate Assistant

---

# User Experience Success Criteria

Users should be able to:

* Understand a domain within five minutes
* Create a Project Space within three minutes
* Generate an assistant within two minutes
* Identify dependencies within one minute

---

# UX North Star

Users should never think:

> "I am building a knowledge graph."

Users should think:

> "The system understands my domain and helps me solve problems faster."

The knowledge graph remains invisible infrastructure powering enterprise understanding, context generation, project spaces, and AI-native workflows.
