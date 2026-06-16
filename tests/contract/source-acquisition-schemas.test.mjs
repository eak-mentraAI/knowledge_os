import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { ingestUrlList } from "../../packages/source-acquisition/src/url-list-ingestion.mjs";
import { validate } from "../helpers/simple-schema-validator.mjs";
import {
  loadJson,
  loadExamples,
  loadSchemas
} from "../../packages/source-acquisition-contracts/src/registry.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const schemasByTitle = new Map(loadSchemas().map((schema) => [schema.title, schema]));
const examplesByKind = new Map(loadExamples().map((example) => {
  if ("sourceType" in example && "location" in example) return ["SourceDefinition", example];
  if ("allowedDomains" in example && "policyId" in example) return ["CrawlPolicy", example];
  if ("recordId" in example) return ["SourceRecord", example];
  return ["CrawlInventory", example];
}));

test("source acquisition examples satisfy their schemas", () => {
  for (const [title, schema] of schemasByTitle) {
    const example = examplesByKind.get(title);
    assert.ok(example, `Missing example for ${title}`);
    assert.deepEqual(validate(schema, example), []);
  }
});

test("source definition requires allowlist and crawl limits", () => {
  const schema = schemasByTitle.get("SourceDefinition");
  const crawlPolicy = schema.properties.crawlPolicy;
  assert.ok(crawlPolicy.required.includes("allowedDomains"));
  assert.ok(crawlPolicy.required.includes("maxDepth"));
  assert.ok(crawlPolicy.required.includes("maxPages"));
  assert.ok(crawlPolicy.required.includes("maxConcurrency"));
});

test("source records model every required crawl status", () => {
  const schema = schemasByTitle.get("SourceRecord");
  assert.deepEqual(schema.properties.status.enum, [
    "discovered",
    "fetched",
    "skipped",
    "failed",
    "blocked"
  ]);
});

test("crawl inventory makes failure and resume state visible", () => {
  const schema = schemasByTitle.get("CrawlInventory");
  assert.ok(schema.properties.totals.required.includes("failed"));
  assert.ok(schema.properties.totals.required.includes("blocked"));
  assert.ok(schema.required.includes("checkpoint"));
});

test("source records require provenance and content hash fields", () => {
  const schema = schemasByTitle.get("SourceRecord");
  assert.ok(schema.required.includes("contentHashSha256"));
  assert.ok(schema.required.includes("rawContentRef"));
  assert.ok(schema.required.includes("provenance"));
  assert.deepEqual(schema.properties.provenance.required, [
    "sourceType",
    "sourceLocation",
    "domainPackId",
    "policyId"
  ]);
});

test("URL list ingestion output satisfies inventory and source record contracts", () => {
  const csvText = readFileSync(resolve(repoRoot, "tests/fixtures/source-acquisition/urls.csv"), "utf8");
  const sourceDefinition = loadJson(resolve(repoRoot, "schemas/source-acquisition/v1/examples/source-definition.foundry-docs.json"));
  const inventory = ingestUrlList({
    csvText,
    sourceDefinition,
    crawlJobId: "crawl-foundry-docs-fixture",
    now: "2026-06-16T20:00:00Z"
  });

  assert.deepEqual(validate(schemasByTitle.get("CrawlInventory"), inventory), []);
  for (const record of inventory.records) {
    assert.deepEqual(validate(schemasByTitle.get("SourceRecord"), record), []);
  }
});
