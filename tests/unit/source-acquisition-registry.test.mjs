import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import {
  listContracts,
  listExamplePaths,
  listSchemaPaths,
  loadExamples,
  loadSchemas
} from "../../packages/source-acquisition-contracts/src/registry.mjs";

test("source acquisition registry exposes four stable contracts", () => {
  const contracts = listContracts();
  assert.deepEqual(
    contracts.map((contract) => contract.name),
    ["source-definition", "crawl-policy", "source-record", "crawl-inventory"]
  );
});

test("source acquisition schema and example files exist and parse", () => {
  for (const path of [...listSchemaPaths(), ...listExamplePaths()]) {
    assert.equal(existsSync(path), true, `${path} should exist`);
  }

  assert.equal(loadSchemas().length, 4);
  assert.equal(loadExamples().length, 4);
});

test("source acquisition schemas use the v1 schema namespace", () => {
  for (const schema of loadSchemas()) {
    assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
    assert.match(schema.$id, /\/source-acquisition\/v1\//);
    assert.equal(schema.properties.schemaVersion.const, "source-acquisition.v1");
  }
});

