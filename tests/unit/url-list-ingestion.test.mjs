import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import {
  ingestUrlList,
  isAllowedDomain,
  normalizeUrl,
  parseUrlListCsv
} from "../../packages/source-acquisition/src/url-list-ingestion.mjs";
import { loadJson } from "../../packages/source-acquisition-contracts/src/registry.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const fixtureCsv = readFileSync(resolve(repoRoot, "tests/fixtures/source-acquisition/urls.csv"), "utf8");
const sourceDefinition = loadJson(resolve(repoRoot, "schemas/source-acquisition/v1/examples/source-definition.foundry-docs.json"));

test("parses url list CSV rows with header line numbers", () => {
  const rows = parseUrlListCsv(fixtureCsv);
  assert.equal(rows.length, 5);
  assert.deepEqual(rows.map((row) => row.lineNumber), [2, 3, 4, 5, 6]);
});

test("normalizes URLs for dedupe without leaking credentials or fragments", () => {
  assert.equal(
    normalizeUrl("https://user:secret@EXAMPLE.com:443/foundry/docs/platform-overview/#section"),
    "https://example.com/foundry/docs/platform-overview"
  );
});

test("enforces explicit domain allowlists", () => {
  assert.equal(isAllowedDomain("https://example.com/docs", ["example.com"]), true);
  assert.equal(isAllowedDomain("https://docs.example.com/path", ["example.com"]), true);
  assert.equal(isAllowedDomain("https://example.org/docs", ["example.com"]), false);
});

test("ingests URL list into transparent crawl inventory records", () => {
  const inventory = ingestUrlList({
    csvText: fixtureCsv,
    sourceDefinition,
    crawlJobId: "crawl-foundry-docs-fixture",
    now: "2026-06-16T20:00:00Z"
  });

  assert.equal(inventory.status, "completed_with_errors");
  assert.deepEqual(inventory.totals, {
    discovered: 2,
    fetched: 0,
    skipped: 2,
    failed: 0,
    blocked: 1
  });

  assert.deepEqual(inventory.records.map((record) => record.status), [
    "discovered",
    "skipped",
    "discovered",
    "blocked",
    "skipped"
  ]);

  assert.equal(inventory.records[1].error.code, "DUPLICATE_URL");
  assert.equal(inventory.records[3].error.code, "DOMAIN_NOT_ALLOWED");
  assert.equal(inventory.records[4].error.code, "INVALID_URL");
  assert.match(inventory.checkpoint.contentHash, /^[a-f0-9]{64}$/);
});

