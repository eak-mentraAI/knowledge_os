#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const gate = process.argv[2] ?? "quality";

const skipDirs = new Set([
  ".git",
  ".next",
  ".pytest_cache",
  ".ruff_cache",
  ".venv",
  "artifacts",
  "build",
  "coverage",
  "dist",
  "htmlcov",
  "logs",
  "node_modules",
  "out",
  "playwright-report",
  "tmp"
]);

const ignoredNames = new Set([".gitkeep", "README.md"]);
const implementationExts = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".py",
  ".ts",
  ".tsx",
  ".yml",
  ".yaml"
]);

const gates = {
  unit: {
    label: "unit tests",
    testDirs: ["tests/unit", "apps", "services", "packages", "schemas"],
    implementationDirs: ["apps", "services", "packages", "schemas"]
  },
  contract: {
    label: "contract tests",
    testDirs: ["tests/contract", "schemas"],
    implementationDirs: ["schemas"]
  },
  integration: {
    label: "integration tests",
    testDirs: ["tests/integration"],
    implementationDirs: ["apps", "services", "packages"]
  },
  e2e: {
    label: "e2e workflow tests",
    testDirs: ["tests/e2e"],
    implementationDirs: ["apps"]
  },
  eval: {
    label: "evaluation tests",
    testDirs: ["evals"],
    implementationDirs: ["evals"]
  }
};

const requiredDocs = [
  "AGENTS.md",
  "README.md",
  "docs/README.md",
  "docs/roadmap/roadmap.md",
  "docs/roadmap/sprint-backlog.md",
  "docs/strategy/implementation-completion-loop.md",
  "docs/testing/test-strategy.md",
  "docs/testing/e2e-acceptance-matrix.md",
  "docs/standards/anti-slop.md"
];

function rel(path) {
  return relative(repoRoot, path).replaceAll("\\", "/");
}

function log(message = "") {
  process.stdout.write(`${message}\n`);
}

function fail(message) {
  process.stderr.write(`FAIL: ${message}\n`);
  process.exitCode = 1;
}

function walk(dir) {
  const root = resolve(repoRoot, dir);
  if (!existsSync(root)) return [];
  const output = [];
  const visit = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (skipDirs.has(entry.name)) continue;
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) {
        visit(fullPath);
      } else if (entry.isFile()) {
        output.push(fullPath);
      }
    }
  };
  visit(root);
  return output;
}

function uniqueFiles(dirs) {
  return [...new Set(dirs.flatMap(walk))].sort();
}

function isJsTest(file) {
  const name = file.replaceAll("\\", "/");
  return /\.(test|spec)\.(mjs|js|cjs)$/.test(name);
}

function isPythonTest(file) {
  const name = file.replaceAll("\\", "/").split("/").at(-1) ?? "";
  return (name.startsWith("test_") || name.endsWith("_test.py")) && name.endsWith(".py");
}

function isImplementationFile(file) {
  const name = file.replaceAll("\\", "/").split("/").at(-1) ?? "";
  if (ignoredNames.has(name)) return false;
  if (isJsTest(file) || isPythonTest(file)) return false;
  return implementationExts.has(extname(file));
}

function spawn(command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    shell: false,
    stdio: "inherit"
  });
  if (result.error) {
    fail(`${command} ${args.join(" ")} could not start: ${result.error.message}`);
    return false;
  }
  if (result.status !== 0) {
    process.exitCode = result.status ?? 1;
    return false;
  }
  return true;
}

function runTestGate(name) {
  const config = gates[name];
  if (!config) {
    fail(`Unknown gate '${name}'.`);
    return false;
  }

  log(`\n== ${config.label} ==`);
  const testFiles = uniqueFiles(config.testDirs).filter((file) => isJsTest(file) || isPythonTest(file));
  const jsTests = testFiles.filter(isJsTest);
  const pyTests = testFiles.filter(isPythonTest);
  const implementationFiles = uniqueFiles(config.implementationDirs).filter(isImplementationFile);

  if (testFiles.length === 0) {
    if (implementationFiles.length === 0) {
      log(`PASS: no implementation files require ${config.label} yet.`);
      return true;
    }
    fail(`Implementation files exist but no ${config.label} were found.`);
    for (const file of implementationFiles.slice(0, 10)) log(`  - ${rel(file)}`);
    return false;
  }

  log(`Found ${testFiles.length} ${config.label} file(s).`);
  let ok = true;
  if (jsTests.length > 0) {
    ok = spawn(process.execPath, ["--test", ...jsTests.map((file) => rel(file))]) && ok;
  }
  if (pyTests.length > 0) {
    ok = spawn("python", ["-m", "unittest", "discover", "-s", config.testDirs[0], "-p", "*test*.py"]) && ok;
  }
  return ok;
}

function runDocsGate() {
  log("\n== documentation checks ==");
  let ok = true;
  for (const doc of requiredDocs) {
    const path = join(repoRoot, doc);
    if (!existsSync(path) || !statSync(path).isFile()) {
      fail(`Required documentation file is missing: ${doc}`);
      ok = false;
    }
  }

  const backlogPath = join(repoRoot, "docs/roadmap/sprint-backlog.md");
  if (existsSync(backlogPath)) {
    const backlog = readFileSync(backlogPath, "utf8");
    for (const required of ["W0-S2", "Quality command contract", "Completion Notes"]) {
      if (!backlog.includes(required)) {
        fail(`Sprint backlog does not include '${required}'.`);
        ok = false;
      }
    }
  }

  if (ok) log("PASS: required documentation and sprint ledger files are present.");
  return ok;
}

function runDevGate() {
  log("\n== local app start ==");
  const appFiles = uniqueFiles(["apps"]).filter(isImplementationFile);
  if (appFiles.length === 0) {
    log("PASS: no local app exists yet. W0-S2 only establishes the command contract.");
    return true;
  }
  const knownAppPackage = join(repoRoot, "apps/web/package.json");
  if (!existsSync(knownAppPackage)) {
    fail("App implementation exists, but no apps/web/package.json dev target is configured.");
    return false;
  }
  log("A local app exists. Run the app-specific dev command documented by its sprint.");
  return true;
}

function runQuality() {
  const sequence = ["docs", "unit", "contract", "integration", "e2e", "eval"];
  let ok = true;
  for (const item of sequence) {
    ok = runGate(item) && ok;
  }
  if (ok) log("\nPASS: full quality gate completed.");
  return ok;
}

function runGate(name) {
  if (name === "quality") return runQuality();
  if (name === "docs") return runDocsGate();
  if (name === "dev") return runDevGate();
  return runTestGate(name);
}

const ok = runGate(gate);
if (!ok && process.exitCode === undefined) process.exitCode = 1;

