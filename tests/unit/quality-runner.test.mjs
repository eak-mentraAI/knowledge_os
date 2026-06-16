import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const repoRoot = resolve(import.meta.dirname, "..", "..");
const runner = resolve(repoRoot, "tools/quality/run-gate.mjs");

test("quality runner exists", () => {
  assert.equal(existsSync(runner), true);
});

test("documentation gate passes for the scaffold", () => {
  const result = spawnSync(process.execPath, [runner, "docs"], {
    cwd: repoRoot,
    encoding: "utf8"
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /PASS: required documentation/);
});

