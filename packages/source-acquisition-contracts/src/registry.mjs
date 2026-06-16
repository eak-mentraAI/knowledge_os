import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(packageDir, "..", "..", "..");
const schemaRoot = resolve(repoRoot, "schemas", "source-acquisition", "v1");

const schemaNames = [
  "source-definition",
  "crawl-policy",
  "source-record",
  "crawl-inventory"
];

const exampleNames = [
  "source-definition.foundry-docs",
  "crawl-policy.default",
  "source-record.fetched",
  "crawl-inventory.completed-with-errors"
];

export function listSchemaPaths() {
  return schemaNames.map((name) => resolve(schemaRoot, `${name}.schema.json`));
}

export function listExamplePaths() {
  return exampleNames.map((name) => resolve(schemaRoot, "examples", `${name}.json`));
}

export function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function loadSchemas() {
  return listSchemaPaths().map((path) => loadJson(path));
}

export function loadExamples() {
  return listExamplePaths().map((path) => loadJson(path));
}

export function listContracts() {
  return schemaNames.map((name) => ({
    name,
    path: resolve(schemaRoot, `${name}.schema.json`)
  }));
}

