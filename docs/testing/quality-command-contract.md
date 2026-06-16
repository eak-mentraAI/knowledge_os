# Quality Command Contract

W0-S2 establishes the root commands that every implementation sprint must use.

## Preferred Commands

Run from the repo root:

```bash
npm run quality
npm run test:unit
npm run test:contract
npm run test:integration
npm run test:e2e
npm run test:eval
npm run check:docs
npm run dev
```

## Windows Fallback

If Node is installed but not on `PATH`, set `NODE_EXE` and use the PowerShell wrapper:

```powershell
$env:NODE_EXE = "C:\Program Files\nodejs\node.exe"
.\tools\quality\run-gate.ps1 quality
```

## Gate Meaning

`quality` runs:

1. Documentation checks.
2. Unit tests.
3. Contract tests.
4. Integration tests.
5. E2e workflow tests.
6. Evaluation tests.

`dev` is the local app start command. It is allowed to report "no app exists yet" only while `apps/` contains no implementation files.

## Placeholder-Safe Behavior

The gate runner is intentionally strict once implementation begins:

- If a gate has no implementation files in scope, it may pass as not applicable.
- If implementation files exist but the matching tests do not, the gate fails.
- If test files exist, the gate executes them.
- Runtime-specific exporters are tested through contract and e2e gates once implemented.

## Current Runner

The first runner uses Node's built-in test runner for `.test.mjs`, `.test.js`, `.spec.mjs`, and `.spec.js` files.

Python test support initially uses stdlib `unittest` for matching Python test files. If future sprints introduce `pytest`, they must update this contract and the runner in the same sprint.

