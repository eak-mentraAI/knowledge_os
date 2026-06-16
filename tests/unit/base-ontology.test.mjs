import assert from "node:assert/strict";
import test from "node:test";
import {
  duplicateNames,
  findEdgeType,
  findNodeType,
  listEdgeTypes,
  listNodeTypes,
  loadBaseOntology
} from "../../packages/ontology/src/base-ontology.mjs";

const businessEntities = [
  "Domain",
  "Capability",
  "Component",
  "Workflow",
  "Decision",
  "Constraint",
  "Policy",
  "Persona",
  "Project",
  "Dependency",
  "Risk",
  "Outcome"
];

test("base ontology loads as v1", () => {
  const ontology = loadBaseOntology();
  assert.equal(ontology.schemaVersion, "ontology.v1");
  assert.equal(ontology.ontologyId, "base");
  assert.equal(ontology.version, "v1");
});

test("base ontology represents strategic business entities", () => {
  const names = new Set(listNodeTypes().map((nodeType) => nodeType.name));
  for (const entity of businessEntities) {
    assert.equal(names.has(entity), true, `${entity} must be a base node type`);
  }
});

test("security and governance are first-class ontology concepts", () => {
  assert.equal(findNodeType("SecurityBoundary").category, "security");
  assert.equal(findNodeType("GovernanceControl").category, "governance");
  assert.ok(findEdgeType("SECURES"));
  assert.ok(findEdgeType("GOVERNS"));
  assert.ok(findEdgeType("CONSTRAINED_BY"));
});

test("base ontology has no duplicate node or edge type names", () => {
  assert.deepEqual(duplicateNames(listNodeTypes()), []);
  assert.deepEqual(duplicateNames(listEdgeTypes()), []);
});

test("domain packs may extend but not redefine base types", () => {
  const ontology = loadBaseOntology();
  assert.equal(ontology.extensionRules.domainPacksMayAddTypes, true);
  assert.equal(ontology.extensionRules.domainPacksMayRedefineBaseTypes, false);
  assert.equal(ontology.extensionRules.requiresMigrationNotes, true);
});

