import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { htmlToCanonicalDocument } from "../../packages/document-processing/src/html-to-canonical-document.mjs";
import { extractFoundryCandidates } from "../../packages/extraction/src/deterministic-foundry-extractor.mjs";
import { createExtractionQualityReport } from "../../packages/extraction/src/extraction-quality-report.mjs";
import { loadDomainPack } from "../../packages/ontology/src/domain-pack.mjs";
import { loadJson } from "../../packages/source-acquisition-contracts/src/registry.mjs";
import { validate } from "../helpers/simple-schema-validator.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const schema = loadJson(resolve(repoRoot, "schemas/extraction/v1/extraction-quality-report.schema.json"));
const expected = loadJson(resolve(repoRoot, "evals/extraction/foundry-overview.expected.json"));
const html = readFileSync(resolve(repoRoot, expected.fixture), "utf8");
const sourceRecord = loadJson(resolve(repoRoot, "schemas/source-acquisition/v1/examples/source-record.fetched.json"));
const document = htmlToCanonicalDocument({ sourceRecord, html, now: "2026-06-16T22:00:00Z" });
const run = extractFoundryCandidates({
  document,
  domainPack: loadDomainPack(),
  now: "2026-06-16T23:00:00Z"
});

test("extraction quality report satisfies the v1 schema", () => {
  const report = createExtractionQualityReport({
    runs: [run],
    expectedNodes: expected.expectedNodes,
    expectedEdges: expected.expectedEdges,
    now: "2026-06-16T23:10:00Z"
  });

  assert.deepEqual(validate(schema, report), []);
});

test("extraction quality report requires completion, precision, failure, and evidence coverage sections", () => {
  assert.ok(schema.required.includes("corpus"));
  assert.ok(schema.required.includes("precision"));
  assert.ok(schema.required.includes("failures"));
  assert.ok(schema.required.includes("evidenceCoverage"));
});
