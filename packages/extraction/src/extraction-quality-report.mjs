import { createHash } from "node:crypto";

export const qualityReportSchemaVersion = "extraction-quality-report.v1";

export const defaultQualityThresholds = Object.freeze({
  minCompletionRate: 0.9,
  minNodePrecisionRate: 0.8,
  minEdgePrecisionRate: 0.8,
  minOverallExpectedCoverageRate: 1,
  minEvidenceCoverageRate: 1
});

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableRate(numerator, denominator) {
  if (denominator === 0) return 1;
  return Number((numerator / denominator).toFixed(6));
}

function edgeKey(edge) {
  return `${edge.edgeType}:${edge.sourceName}->${edge.targetName}`;
}

function uniqueSorted(values) {
  return [...new Set(values)].sort();
}

function compareCandidates(expectedValues, actualValues) {
  const expected = new Set(uniqueSorted(expectedValues));
  const actual = new Set(uniqueSorted(actualValues));
  const matched = [...actual].filter((value) => expected.has(value)).sort();
  const unexpected = [...actual].filter((value) => !expected.has(value)).sort();
  const missingExpected = [...expected].filter((value) => !actual.has(value)).sort();

  return {
    expectedCount: expected.size,
    actualCount: actual.size,
    matchedCount: matched.length,
    unexpectedCount: unexpected.length,
    missingExpectedCount: missingExpected.length,
    precisionRate: stableRate(matched.length, actual.size),
    expectedCoverageRate: stableRate(matched.length, expected.size),
    unexpected,
    missingExpected
  };
}

function hasEvidence(candidate) {
  return (candidate.evidenceSpans ?? []).some(
    (span) =>
      span &&
      Number.isInteger(span.startOffset) &&
      Number.isInteger(span.endOffset) &&
      span.endOffset >= span.startOffset &&
      typeof span.quote === "string" &&
      span.quote.length > 0
  );
}

function normalizeExpectedEdges(expectedEdges) {
  return expectedEdges.map((edge) => edgeKey(edge));
}

function failureRecords(runs) {
  return runs
    .filter((run) => run.status !== "completed" || (run.metrics?.failedDocumentCount ?? 0) > 0)
    .map((run) => ({
      runId: run.runId,
      documentId: run.documentId,
      status: run.status,
      failedDocumentCount: run.metrics?.failedDocumentCount ?? 0,
      message: run.error?.message ?? "Extraction run did not complete cleanly."
    }));
}

export function createExtractionQualityReport({
  runs,
  expectedNodes = [],
  expectedEdges = [],
  thresholds = {},
  now = "2026-06-16T00:00:00Z",
  reportId
}) {
  if (!Array.isArray(runs) || runs.length === 0) {
    throw new Error("createExtractionQualityReport requires at least one extraction run.");
  }

  const activeThresholds = { ...defaultQualityThresholds, ...thresholds };
  const nodeCandidates = runs.flatMap((run) => run.nodeCandidates ?? []);
  const edgeCandidates = runs.flatMap((run) => run.edgeCandidates ?? []);
  const candidateCount = nodeCandidates.length + edgeCandidates.length;
  const candidatesWithEvidenceCount = [...nodeCandidates, ...edgeCandidates].filter(hasEvidence).length;
  const failedDocumentCount = runs.reduce((total, run) => total + (run.metrics?.failedDocumentCount ?? 0), 0);
  const documentCount = runs.reduce((total, run) => total + (run.metrics?.documentsProcessed ?? 1), 0);
  const completedDocumentCount = Math.max(0, documentCount - failedDocumentCount);

  const nodes = compareCandidates(expectedNodes, nodeCandidates.map((candidate) => candidate.name));
  const edges = compareCandidates(normalizeExpectedEdges(expectedEdges), edgeCandidates.map(edgeKey));
  const failures = failureRecords(runs);
  const precision = {
    nodes,
    edges,
    overallPrecisionRate: stableRate(nodes.matchedCount + edges.matchedCount, nodes.actualCount + edges.actualCount),
    overallExpectedCoverageRate: stableRate(
      nodes.matchedCount + edges.matchedCount,
      nodes.expectedCount + edges.expectedCount
    )
  };
  const evidenceCoverage = {
    candidateCount,
    candidatesWithEvidenceCount,
    candidatesMissingEvidenceCount: candidateCount - candidatesWithEvidenceCount,
    evidenceCoverageRate: stableRate(candidatesWithEvidenceCount, candidateCount)
  };
  const corpus = {
    documentCount,
    completedDocumentCount,
    failedDocumentCount,
    completionRate: stableRate(completedDocumentCount, documentCount)
  };
  const warnings = [];

  if (nodes.unexpectedCount > 0) warnings.push(`Unexpected node candidates: ${nodes.unexpected.join(", ")}`);
  if (edges.unexpectedCount > 0) warnings.push(`Unexpected edge candidates: ${edges.unexpected.join(", ")}`);
  if (nodes.missingExpectedCount > 0) warnings.push(`Missing expected node candidates: ${nodes.missingExpected.join(", ")}`);
  if (edges.missingExpectedCount > 0) warnings.push(`Missing expected edge candidates: ${edges.missingExpected.join(", ")}`);

  const passed =
    corpus.completionRate >= activeThresholds.minCompletionRate &&
    precision.nodes.precisionRate >= activeThresholds.minNodePrecisionRate &&
    precision.edges.precisionRate >= activeThresholds.minEdgePrecisionRate &&
    precision.overallExpectedCoverageRate >= activeThresholds.minOverallExpectedCoverageRate &&
    evidenceCoverage.evidenceCoverageRate >= activeThresholds.minEvidenceCoverageRate &&
    failures.length === 0;

  const runIds = uniqueSorted(runs.map((run) => run.runId));
  return {
    schemaVersion: qualityReportSchemaVersion,
    reportId: reportId ?? `quality-${sha256(runIds.join(":")).slice(0, 16)}`,
    extractionVersion: runs[0].extractionVersion,
    domainPackId: runs[0].domainPackId,
    runIds,
    status: passed ? "passed" : "failed",
    corpus,
    precision,
    evidenceCoverage,
    failures,
    thresholds: activeThresholds,
    warnings,
    createdAt: now
  };
}
