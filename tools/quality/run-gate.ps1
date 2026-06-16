param(
  [ValidateSet("quality", "docs", "unit", "contract", "integration", "e2e", "eval", "dev")]
  [string] $Gate = "quality"
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Resolve-Path (Join-Path $ScriptDir "..\..")
$Runner = Join-Path $ScriptDir "run-gate.mjs"

$Node = $env:NODE_EXE
if (-not $Node) {
  $Command = Get-Command node -ErrorAction SilentlyContinue
  if ($Command) {
    $Node = $Command.Source
  }
}

if (-not $Node -or -not (Test-Path -LiteralPath $Node)) {
  throw "Node.js was not found. Install Node.js LTS or set NODE_EXE to a node.exe path."
}

Push-Location $RepoRoot
try {
  & $Node $Runner $Gate
  exit $LASTEXITCODE
}
finally {
  Pop-Location
}

