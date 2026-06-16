import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { htmlToCanonicalDocument } from "../../packages/document-processing/src/html-to-canonical-document.mjs";
import { extractFoundryCandidates } from "../../packages/extraction/src/deterministic-foundry-extractor.mjs";
import { loadDomainPack } from "../../packages/ontology/src/domain-pack.mjs";
import { loadJson } from "../../packages/source-acquisition-contracts/src/registry.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const html = readFileSync(resolve(repoRoot, "tests/fixtures/document-processing/foundry-overview.html"), "utf8");
const sourceRecord = loadJson(resolve(repoRoot, "schemas/source-acquisition/v1/examples/source-record.fetched.json"));
const document = htmlToCanonicalDocument({ sourceRecord, html, now: "2026-06-16T22:00:00Z" });
const domainPack = loadDomainPack();

test("deterministic Foundry extractor returns evidence-linked candidates", () => {
  const run = extractFoundryCandidates({
    document,
    domainPack,
    now: "2026-06-16T23:00:00Z"
  });

  assert.equal(run.schemaVersion, "extraction.v1");
  assert.equal(run.domainPackId, "foundry");
  assert.deepEqual(run.nodeCandidates.map((candidate) => candidate.name).sort(), ["AIP", "Foundry", "Ontology"]);
  assert.deepEqual(run.edgeCandidates.map((candidate) => candidate.edgeType), ["PROVIDES_CONTEXT_TO"]);

  for (const candidate of [...run.nodeCandidates, ...run.edgeCandidates]) {
    assert.ok(candidate.confidence > 0 && candidate.confidence <= 1);
    assert.ok(candidate.evidenceSpans.length > 0);
    for (const span of candidate.evidenceSpans) {
      assert.equal(document.text.slice(span.startOffset, span.endOffset), span.quote);
    }
  }
});

test("deterministic Foundry extraction is stable for the same input", () => {
  const first = extractFoundryCandidates({ document, domainPack, now: "2026-06-16T23:00:00Z" });
  const second = extractFoundryCandidates({ document, domainPack, now: "2026-06-16T23:00:00Z" });
  assert.deepEqual(first, second);
});

