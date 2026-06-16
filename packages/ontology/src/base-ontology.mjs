import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(packageDir, "..", "..", "..");
const baseOntologyPath = resolve(repoRoot, "schemas", "ontology", "v1", "base-ontology.json");

export function loadBaseOntology() {
  return JSON.parse(readFileSync(baseOntologyPath, "utf8"));
}

export function listNodeTypes() {
  return loadBaseOntology().nodeTypes;
}

export function listEdgeTypes() {
  return loadBaseOntology().edgeTypes;
}

export function findNodeType(name) {
  return listNodeTypes().find((nodeType) => nodeType.name === name) ?? null;
}

export function findEdgeType(name) {
  return listEdgeTypes().find((edgeType) => edgeType.name === name) ?? null;
}

export function duplicateNames(items) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of items) {
    if (seen.has(item.name)) duplicates.add(item.name);
    seen.add(item.name);
  }
  return [...duplicates].sort();
}

