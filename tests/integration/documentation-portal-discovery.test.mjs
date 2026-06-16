import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { discoverDocumentationPortal } from "../../packages/source-acquisition/src/documentation-portal-discovery.mjs";
import { loadJson } from "../../packages/source-acquisition-contracts/src/registry.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const sourceDefinition = loadJson(resolve(repoRoot, "schemas/source-acquisition/v1/examples/source-definition.foundry-docs.json"));
sourceDefinition.location.uri = "https://example.com/foundry/docs";
sourceDefinition.crawlPolicy.maxDepth = 2;
sourceDefinition.crawlPolicy.maxPages = 10;

const pages = new Map([
  ["https://example.com/foundry/docs", "index.html"],
  ["https://example.com/foundry/getting-started", "getting-started.html"],
  ["https://example.com/foundry/ontology", "ontology.html"]
].map(([url, file]) => [
  url,
  readFileSync(resolve(repoRoot, "tests/fixtures/portal-site", file), "utf8")
]));

test("discovers documentation portal pages from controlled fixture site", async () => {
  const inventory = await discoverDocumentationPortal({
    sourceDefinition,
    crawlJobId: "crawl-foundry-portal-fixture",
    loadPage: async (url) => pages.get(url),
    now: "2026-06-16T21:00:00Z"
  });

  assert.equal(inventory.status, "completed_with_errors");
  assert.deepEqual(inventory.totals, {
    discovered: 3,
    fetched: 0,
    skipped: 0,
    failed: 0,
    blocked: 1
  });

  assert.deepEqual(inventory.records.map((record) => record.normalizedUrl).sort(), [
    "https://example.com/foundry/docs",
    "https://example.com/foundry/getting-started",
    "https://example.com/foundry/ontology",
    "https://outside.example.org/private"
  ]);

  const blocked = inventory.records.find((record) => record.status === "blocked");
  assert.equal(blocked.error.code, "DOMAIN_NOT_ALLOWED");

  const root = inventory.records.find((record) => record.normalizedUrl === "https://example.com/foundry/docs");
  assert.deepEqual(root.discoveredLinks, [
    "https://example.com/foundry/getting-started",
    "https://example.com/foundry/ontology",
    "https://outside.example.org/private"
  ]);
  assert.match(inventory.checkpoint.contentHash, /^[a-f0-9]{64}$/);
});

