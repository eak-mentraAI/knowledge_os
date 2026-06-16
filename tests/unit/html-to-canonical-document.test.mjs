import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import {
  htmlToCanonicalDocument,
  stripTags
} from "../../packages/document-processing/src/html-to-canonical-document.mjs";
import { loadJson } from "../../packages/source-acquisition-contracts/src/registry.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const html = readFileSync(resolve(repoRoot, "tests/fixtures/document-processing/foundry-overview.html"), "utf8");
const sourceRecord = loadJson(resolve(repoRoot, "schemas/source-acquisition/v1/examples/source-record.fetched.json"));

test("stripTags normalizes text and decodes common entities", () => {
  assert.equal(stripTags("<p>Ontology &amp; AIP</p>"), "Ontology & AIP");
});

test("htmlToCanonicalDocument creates stable sections, links, tables, and evidence spans", () => {
  const document = htmlToCanonicalDocument({
    sourceRecord,
    html,
    now: "2026-06-16T22:00:00Z"
  });

  assert.equal(document.schemaVersion, "document-processing.v1");
  assert.equal(document.processingStatus, "processed");
  assert.equal(document.title, "Foundry Platform Overview");
  assert.equal(document.sections.length, 3);
  assert.deepEqual(document.sections.map((section) => section.title), [
    "Foundry Platform Overview",
    "Architecture Layers",
    "Related Concepts"
  ]);
  assert.equal(document.links[0].text, "AIP");
  assert.equal(document.links[0].url, "https://example.com/foundry/docs/aip");
  assert.deepEqual(document.tables[0].headers, ["Layer", "Purpose"]);
  assert.deepEqual(document.tables[0].rows, [["Semantic", "Ontology and relationships"]]);

  for (const section of document.sections) {
    assert.ok(section.sectionId.startsWith(document.documentId));
    assert.ok(section.evidenceSpans.length > 0);
    for (const span of section.evidenceSpans) {
      assert.equal(document.text.slice(span.startOffset, span.endOffset), span.quote);
    }
  }
});

