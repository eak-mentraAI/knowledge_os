# PRD Summary

Source: `PRD_Knowledge_OS.docx`

## Product Identity

The original product is the Knowledge Graph Extraction Harness, expanded into a Knowledge Operating System. It transforms documentation and knowledge sources into structured knowledge graphs, entity catalogs, relationship networks, GraphRAG-ready retrieval systems, semantic indexes, context packs, project spaces, and AI assistants.

Palantir Foundry documentation is the initial validation corpus and the first domain pack.

## Core Goals

- Convert arbitrary URL collections and documentation portals into a structured knowledge graph.
- Support pluggable domain ontologies.
- Support graph retrieval and vector retrieval.
- Support incremental updates as source documentation changes.
- Enable AI assistants to answer questions using graph traversal and evidence.
- Generate AI-ready context packs, project spaces, assistant configurations, domain maps, persona maps, and architecture maps.
- Deliver generated assets into execution runtimes without turning Knowledge OS into a collaboration, document-management, or task-management product.

## Core Architecture

1. Source Acquisition: URL lists, sitemaps, portals, PDFs, markdown repositories, Confluence, SharePoint, GitHub.
2. Document Processing: crawl, render JavaScript, extract text, headings, tables, links, and metadata.
3. Extraction Engine: entities, relationships, definitions, constraints, security, administrative actions.
4. Ontology Engine: base ontology plus domain packs such as Foundry, AWS, Salesforce, ServiceNow, Azure, healthcare, legal, and custom packs.
5. Entity Resolution: aliases, duplicate merges, canonical IDs.
6. Graph Storage: property graph targets such as Neo4j, Kuzu, Memgraph, Neptune.
7. Embedding Layer: embeddings for documents, concepts, capabilities, and use cases.
8. Retrieval Layer: vector retrieval, entity resolution, graph expansion, context assembly, LLM response.
9. Context Generation Layer: context packs, project spaces, assistant configurations, domain maps, persona maps, architecture maps.
10. Context Delivery Layer: runtime-ready packaging for ChatGPT Projects, custom GPTs, SharePoint workspaces, Copilot agents, and markdown repositories.

## Product Experience

The graph is invisible infrastructure. Users should feel like they are teaching the platform a domain and generating usable workspaces, not managing a graph database.

Top-level navigation is limited to:

- Dashboard
- Sources
- Knowledge Model
- Domains
- Project Spaces
- Assistants

## Initial Foundry Domain

Initial corpus:

- Architecture Center
- Getting Started
- Getting Help
- Platform Overview
- Guides and Workflows

Future domains include administration, IAM, resource management, ontology, data integration, pipelines, applications, security, governance, APIs, SDKs, AIP, Agent Studio, and Marketplace.

## Success Measures

- 95%+ URL discovery.
- 90%+ extraction completion.
- 95%+ canonicalization accuracy.
- 90%+ edge precision.
- Hallucination rate below 5%.
- Domain context packs, persona context packs, architecture maps, project spaces, and assistant configurations generated with minimal manual intervention.
