import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { htmlToCanonicalDocument } from "../../packages/document-processing/src/html-to-canonical-document.mjs";
import { extractFoundryCandidates } from "../../packages/extraction/src/deterministic-foundry-extractor.mjs";
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

test("Foundry overview eval extracts expected evidence-linked nodes", () => {
  assert.deepEqual(run.nodeCandidates.map((candidate) => candidate.name).sort(), expected.expectedNodes.sort());
  for (const candidate of run.nodeCandidates) {
    assert.ok(candidate.evidenceSpans.length > 0);
  }
});

test("Foundry overview eval extracts expected evidence-linked edges", () => {
  const actualEdges = run.edgeCandidates.map(({ edgeType, sourceName, targetName }) => ({ edgeType, sourceName, targetName }));
  assert.deepEqual(actualEdges, expected.expectedEdges);
  for (const candidate of run.edgeCandidates) {
    assert.ok(candidate.evidenceSpans.length > 0);
  }
});

