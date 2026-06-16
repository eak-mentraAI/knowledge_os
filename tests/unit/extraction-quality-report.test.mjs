import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { htmlToCanonicalDocument } from "../../packages/document-processing/src/html-to-canonical-document.mjs";
import { extractFoundryCandidates } from "../../packages/extraction/src/deterministic-foundry-extractor.mjs";
import { createExtractionQualityReport } from "../../packages/extraction/src/extraction-quality-report.mjs";
import { loadDomainPack } from "../../packages/ontology/src/domain-pack.mjs";
import { loadJson } from "../../packages/source-acquisition-contracts/src/registry.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const expected = loadJson(resolve(repoRoot, "evals/extraction/foundry-overview.expected.json"));
const html = readFileSync(resolve(repoRoot, expected.fixture), "utf8");
const sourceRecord = loadJson(resolve(repoRoot, "schemas/source-acquisition/v1/examples/source-record.fetched.json"));
const document = htmlToCanonicalDocument({ sourceRecord, html, now: "2026-06-16T22:00:00Z" });
const run = extractFoundryCandidates({
  document,
  domainPack: loadDomainPack(),
  now: "2026-06-16T23:00:00Z"
});

test("extraction quality report summarizes completion, precision, and evidence coverage", () => {
  const report = createExtractionQualityReport({
    runs: [run],
    expectedNodes: expected.expectedNodes,
    expectedEdges: expected.expectedEdges,
    now: "2026-06-16T23:10:00Z"
  });

  assert.equal(report.status, "passed");
  assert.equal(report.corpus.completionRate, 1);
  assert.equal(report.precision.nodes.precisionRate, 1);
  assert.equal(report.precision.edges.precisionRate, 1);
  assert.equal(report.precision.overallExpectedCoverageRate, 1);
  assert.equal(report.evidenceCoverage.evidenceCoverageRate, 1);
  assert.deepEqual(report.failures, []);
  assert.deepEqual(report.warnings, []);
});

test("extraction quality report exposes failures, missing expectations, and missing evidence", () => {
  const degraded = structuredClone(run);
  degraded.status = "completed_with_errors";
  degraded.metrics.failedDocumentCount = 1;
  degraded.nodeCandidates[0].evidenceSpans = [];

  const report = createExtractionQualityReport({
    runs: [degraded],
    expectedNodes: [...expected.expectedNodes, "Missing Product"],
    expectedEdges: expected.expectedEdges,
    now: "2026-06-16T23:10:00Z"
  });

  assert.equal(report.status, "failed");
  assert.equal(report.corpus.failedDocumentCount, 1);
  assert.equal(report.evidenceCoverage.candidatesMissingEvidenceCount, 1);
  assert.equal(report.failures.length, 1);
  assert.ok(report.precision.nodes.missingExpected.includes("Missing Product"));
  assert.ok(report.warnings.some((warning) => warning.includes("Missing expected node candidates")));
});
