import assert from "node:assert/strict";
import { resolve } from "node:path";
import test from "node:test";
import { loadDomainPack, validateDomainPackExtension } from "../../packages/ontology/src/domain-pack.mjs";
import { loadJson } from "../../packages/source-acquisition-contracts/src/registry.mjs";
import { validate } from "../helpers/simple-schema-validator.mjs";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const schema = loadJson(resolve(repoRoot, "schemas/ontology/v1/domain-pack.schema.json"));

test("Foundry domain pack satisfies the domain pack schema", () => {
  assert.deepEqual(validate(schema, loadDomainPack()), []);
});

test("Foundry domain pack cannot redefine base ontology types", () => {
  const domainPack = loadDomainPack();
  const invalid = {
    ...domainPack,
    nodeTypes: [
      ...domainPack.nodeTypes,
      {
        name: "Domain",
        extends: "Concept",
        description: "Invalid redefinition."
      }
    ]
  };

  assert.match(validateDomainPackExtension(invalid).join("\n"), /redefines base node type Domain/);
});

test("Foundry examples use known node and edge types", () => {
  assert.deepEqual(validateDomainPackExtension(loadDomainPack()), []);
});

