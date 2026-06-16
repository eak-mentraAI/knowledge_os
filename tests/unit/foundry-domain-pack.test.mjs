import assert from "node:assert/strict";
import test from "node:test";
import {
  knownEdgeTypes,
  knownNodeTypes,
  loadDomainPack,
  validateDomainPackExtension
} from "../../packages/ontology/src/domain-pack.mjs";

const requiredSeeds = [
  "Foundry",
  "Apollo",
  "Rubix",
  "Ontology",
  "AIP",
  "Multimodal Data Plane",
  "Workflow Automation",
  "Access Control",
  "Policy Enforcement",
  "Change Management",
  "Data Governance"
];

test("Foundry domain pack loads as v1", () => {
  const domainPack = loadDomainPack();
  assert.equal(domainPack.schemaVersion, "ontology-domain-pack.v1");
  assert.equal(domainPack.domainPackId, "foundry");
  assert.equal(domainPack.version, "v1");
});

test("Foundry domain pack extends base without validation errors", () => {
  assert.deepEqual(validateDomainPackExtension(loadDomainPack()), []);
});

test("Foundry domain pack includes required initial seed coverage", () => {
  const seedNames = new Set(loadDomainPack().seedEntities.map((entity) => entity.name));
  for (const seed of requiredSeeds) {
    assert.equal(seedNames.has(seed), true, `${seed} must be seeded`);
  }
});

test("Foundry domain pack adds domain-specific architecture and ontology types", () => {
  const nodeTypes = knownNodeTypes(loadDomainPack());
  assert.equal(nodeTypes.has("ArchitectureLayer"), true);
  assert.equal(nodeTypes.has("OntologyObject"), true);
  assert.equal(nodeTypes.has("OntologyAction"), true);

  const edgeTypes = knownEdgeTypes(loadDomainPack());
  assert.equal(edgeTypes.has("BELONGS_TO_LAYER"), true);
  assert.equal(edgeTypes.has("AUTHENTICATED_BY"), true);
});

