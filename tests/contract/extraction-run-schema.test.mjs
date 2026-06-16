import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { htmlToCanonicalDocument } from "../../packages/document-processing/src/html-to-canonical-document.mjs";
import { extractFoundryCandidates } from "../../packages/extraction/src/deterministic-foundry-extractor.mjs";
import { loadDomainPack } from "../../packages/ontology/src/domain-pack.mjs";
import { loadJson } from "../../packages/source-acquisition-contracts/src/registry.mjs";
import { validate } from "../helpers/simple-schema-validator.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const schema = loadJson(resolve(repoRoot, "schemas/extraction/v1/extraction-run.schema.json"));
const html = readFileSync(resolve(repoRoot, "tests/fixtures/document-processing/foundry-overview.html"), "utf8");
const sourceRecord = loadJson(resolve(repoRoot, "schemas/source-acquisition/v1/examples/source-record.fetched.json"));
const document = htmlToCanonicalDocument({ sourceRecord, html, now: "2026-06-16T22:00:00Z" });
const domainPack = loadDomainPack();

test("extraction run satisfies the v1 schema", () => {
  const run = extractFoundryCandidates({
    document,
    domainPack,
    now: "2026-06-16T23:00:00Z"
  });

  assert.deepEqual(validate(schema, run), []);
});

test("extraction candidates require evidence and confidence", () => {
  const nodeSchema = schema.$defs.NodeCandidate;
  const edgeSchema = schema.$defs.EdgeCandidate;
  assert.ok(nodeSchema.required.includes("evidenceSpans"));
  assert.ok(nodeSchema.required.includes("confidence"));
  assert.ok(edgeSchema.required.includes("evidenceSpans"));
  assert.ok(edgeSchema.required.includes("confidence"));
});

