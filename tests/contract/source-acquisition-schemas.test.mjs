import assert from "node:assert/strict";
import test from "node:test";
import {
  loadExamples,
  loadSchemas
} from "../../packages/source-acquisition-contracts/src/registry.mjs";

const schemasByTitle = new Map(loadSchemas().map((schema) => [schema.title, schema]));
const examplesByKind = new Map(loadExamples().map((example) => {
  if ("sourceType" in example && "location" in example) return ["SourceDefinition", example];
  if ("allowedDomains" in example && "policyId" in example) return ["CrawlPolicy", example];
  if ("recordId" in example) return ["SourceRecord", example];
  return ["CrawlInventory", example];
}));

function validate(schema, value, path = schema.title) {
  const errors = [];

  if (schema.const !== undefined && value !== schema.const) {
    errors.push(`${path} must equal ${schema.const}`);
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${path} must be one of ${schema.enum.join(", ")}`);
  }

  if (schema.type) {
    const allowed = Array.isArray(schema.type) ? schema.type : [schema.type];
    const actual = value === null ? "null" : Array.isArray(value) ? "array" : Number.isInteger(value) ? "integer" : typeof value;
    const compatible = allowed.includes(actual) || (actual === "integer" && allowed.includes("number"));
    if (!compatible) {
      errors.push(`${path} expected ${allowed.join("|")} but received ${actual}`);
      return errors;
    }
  }

  if (typeof value === "string" && schema.pattern) {
    const re = new RegExp(schema.pattern);
    if (!re.test(value)) errors.push(`${path} does not match ${schema.pattern}`);
  }

  if (typeof value === "number") {
    if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${path} is below minimum`);
    if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${path} is above maximum`);
  }

  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errors.push(`${path} needs at least ${schema.minItems} item(s)`);
    if (schema.uniqueItems && new Set(value.map((item) => JSON.stringify(item))).size !== value.length) errors.push(`${path} must contain unique items`);
    if (schema.items) {
      value.forEach((item, index) => errors.push(...validate(schema.items, item, `${path}[${index}]`)));
    }
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const required of schema.required ?? []) {
      if (!(required in value)) errors.push(`${path}.${required} is required`);
    }
    for (const [key, child] of Object.entries(schema.properties ?? {})) {
      if (key in value) errors.push(...validate(child, value[key], `${path}.${key}`));
    }
    if (schema.additionalProperties === false) {
      const allowed = new Set(Object.keys(schema.properties ?? {}));
      for (const key of Object.keys(value)) {
        if (!allowed.has(key)) errors.push(`${path}.${key} is not allowed`);
      }
    }
  }

  return errors;
}

test("source acquisition examples satisfy their schemas", () => {
  for (const [title, schema] of schemasByTitle) {
    const example = examplesByKind.get(title);
    assert.ok(example, `Missing example for ${title}`);
    assert.deepEqual(validate(schema, example), []);
  }
});

test("source definition requires allowlist and crawl limits", () => {
  const schema = schemasByTitle.get("SourceDefinition");
  const crawlPolicy = schema.properties.crawlPolicy;
  assert.ok(crawlPolicy.required.includes("allowedDomains"));
  assert.ok(crawlPolicy.required.includes("maxDepth"));
  assert.ok(crawlPolicy.required.includes("maxPages"));
  assert.ok(crawlPolicy.required.includes("maxConcurrency"));
});

test("source records model every required crawl status", () => {
  const schema = schemasByTitle.get("SourceRecord");
  assert.deepEqual(schema.properties.status.enum, [
    "discovered",
    "fetched",
    "skipped",
    "failed",
    "blocked"
  ]);
});

test("crawl inventory makes failure and resume state visible", () => {
  const schema = schemasByTitle.get("CrawlInventory");
  assert.ok(schema.properties.totals.required.includes("failed"));
  assert.ok(schema.properties.totals.required.includes("blocked"));
  assert.ok(schema.required.includes("checkpoint"));
});

test("source records require provenance and content hash fields", () => {
  const schema = schemasByTitle.get("SourceRecord");
  assert.ok(schema.required.includes("contentHashSha256"));
  assert.ok(schema.required.includes("rawContentRef"));
  assert.ok(schema.required.includes("provenance"));
  assert.deepEqual(schema.properties.provenance.required, [
    "sourceType",
    "sourceLocation",
    "domainPackId",
    "policyId"
  ]);
});

