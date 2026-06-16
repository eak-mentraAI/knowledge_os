import assert from "node:assert/strict";
import { resolve } from "node:path";
import test from "node:test";
import { loadBaseOntology } from "../../packages/ontology/src/base-ontology.mjs";
import { loadJson } from "../../packages/source-acquisition-contracts/src/registry.mjs";
import { validate } from "../helpers/simple-schema-validator.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const schema = loadJson(resolve(repoRoot, "schemas/ontology/v1/ontology-schema.schema.json"));

test("base ontology satisfies the ontology schema", () => {
  assert.deepEqual(validate(schema, loadBaseOntology()), []);
});

test("base ontology includes source and knowledge node types needed by extraction", () => {
  const nodeNames = new Set(loadBaseOntology().nodeTypes.map((nodeType) => nodeType.name));
  for (const required of ["Document", "Section", "Concept", "UseCase"]) {
    assert.equal(nodeNames.has(required), true, `${required} must be present`);
  }
});

test("base ontology contains graph relationships needed for business reasoning", () => {
  const edgeNames = new Set(loadBaseOntology().edgeTypes.map((edgeType) => edgeType.name));
  for (const required of ["DEPENDS_ON", "REQUIRES", "HAS_RISK", "HAS_OUTCOME", "PROVIDES_CONTEXT_TO"]) {
    assert.equal(edgeNames.has(required), true, `${required} must be present`);
  }
});

