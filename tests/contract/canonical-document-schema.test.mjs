import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { htmlToCanonicalDocument } from "../../packages/document-processing/src/html-to-canonical-document.mjs";
import { loadJson } from "../../packages/source-acquisition-contracts/src/registry.mjs";
import { validate } from "../helpers/simple-schema-validator.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const schema = loadJson(resolve(repoRoot, "schemas/document-processing/v1/canonical-document.schema.json"));
const sourceRecord = loadJson(resolve(repoRoot, "schemas/source-acquisition/v1/examples/source-record.fetched.json"));
const html = readFileSync(resolve(repoRoot, "tests/fixtures/document-processing/foundry-overview.html"), "utf8");

test("generated canonical document satisfies the v1 schema", () => {
  const document = htmlToCanonicalDocument({
    sourceRecord,
    html,
    now: "2026-06-16T22:00:00Z"
  });

  assert.deepEqual(validate(schema, document), []);
});

test("canonical document schema requires evidence-bearing sections, links, and tables", () => {
  assert.ok(schema.required.includes("sections"));
  assert.ok(schema.required.includes("links"));
  assert.ok(schema.required.includes("tables"));
  assert.ok(schema.properties.sections.items.$ref.includes("DocumentSection"));
  assert.ok(schema.properties.links.items.$ref.includes("DocumentLink"));
  assert.ok(schema.properties.tables.items.$ref.includes("DocumentTable"));
});

