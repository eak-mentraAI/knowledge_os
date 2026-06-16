import assert from "node:assert/strict";
import test from "node:test";
import { extractLinks } from "../../packages/source-acquisition/src/documentation-portal-discovery.mjs";

test("extractLinks resolves links, strips fragments, dedupes, and ignores non-web links", () => {
  const html = `
    <a href="./getting-started#intro">Getting Started</a>
    <a href="./getting-started">Duplicate</a>
    <a href="https://outside.example.org/private">External</a>
    <a href="mailto:help@example.com">Email</a>
    <a href="javascript:alert('x')">Script</a>
  `;

  assert.deepEqual(extractLinks(html, "https://example.com/foundry/docs"), [
    "https://example.com/foundry/getting-started",
    "https://outside.example.org/private"
  ]);
});

