import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadBaseOntology } from "./base-ontology.mjs";

const packageDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(packageDir, "..", "..", "..");
const foundryPackPath = resolve(repoRoot, "domain-packs", "foundry", "v1", "domain-pack.json");

export function loadDomainPack(path = foundryPackPath) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function knownNodeTypes(domainPack, baseOntology = loadBaseOntology()) {
  return new Set([
    ...baseOntology.nodeTypes.map((nodeType) => nodeType.name),
    ...domainPack.nodeTypes.map((nodeType) => nodeType.name)
  ]);
}

export function knownEdgeTypes(domainPack, baseOntology = loadBaseOntology()) {
  return new Set([
    ...baseOntology.edgeTypes.map((edgeType) => edgeType.name),
    ...domainPack.edgeTypes.map((edgeType) => edgeType.name)
  ]);
}

export function validateDomainPackExtension(domainPack, baseOntology = loadBaseOntology()) {
  const errors = [];
  const baseNodeNames = new Set(baseOntology.nodeTypes.map((nodeType) => nodeType.name));
  const baseEdgeNames = new Set(baseOntology.edgeTypes.map((edgeType) => edgeType.name));
  const nodeNames = knownNodeTypes(domainPack, baseOntology);
  const edgeNames = knownEdgeTypes(domainPack, baseOntology);

  if (domainPack.extendsOntology.ontologyId !== baseOntology.ontologyId) {
    errors.push(`Domain pack extends ${domainPack.extendsOntology.ontologyId}, expected ${baseOntology.ontologyId}.`);
  }

  for (const nodeType of domainPack.nodeTypes) {
    if (baseNodeNames.has(nodeType.name)) errors.push(`Domain pack redefines base node type ${nodeType.name}.`);
    if (!baseNodeNames.has(nodeType.extends)) errors.push(`Domain node type ${nodeType.name} extends unknown base type ${nodeType.extends}.`);
  }

  for (const edgeType of domainPack.edgeTypes) {
    if (baseEdgeNames.has(edgeType.name)) errors.push(`Domain pack redefines base edge type ${edgeType.name}.`);
  }

  for (const alias of domainPack.aliases) {
    if (!nodeNames.has(alias.targetNodeType)) errors.push(`Alias ${alias.canonical} targets unknown node type ${alias.targetNodeType}.`);
  }

  for (const entity of domainPack.seedEntities) {
    if (!nodeNames.has(entity.nodeType)) errors.push(`Seed entity ${entity.name} uses unknown node type ${entity.nodeType}.`);
  }

  for (const node of domainPack.examples.nodes) {
    if (!nodeNames.has(node.type)) errors.push(`Example node ${node.id} uses unknown type ${node.type}.`);
  }

  for (const edge of domainPack.examples.edges) {
    if (!edgeNames.has(edge.type)) errors.push(`Example edge ${edge.type} is unknown.`);
  }

  return errors;
}

