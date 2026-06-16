import { createHash } from "node:crypto";

export const extractionVersion = "deterministic-foundry-v1";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function evidenceSpan(document, quote) {
  let startOffset = document.text.toLowerCase().indexOf(quote.toLowerCase());
  let actualQuote = startOffset >= 0 ? document.text.slice(startOffset, startOffset + quote.length) : null;

  if (startOffset < 0) {
    const flexiblePattern = quote
      .trim()
      .split(/\s+/)
      .map(escapeRegExp)
      .join("\\s+");
    const match = new RegExp(flexiblePattern, "i").exec(document.text);
    if (match) {
      startOffset = match.index;
      actualQuote = match[0];
    }
  }

  if (startOffset < 0) return null;
  return {
    documentId: document.documentId,
    sourceRecordId: document.sourceRecordId,
    startOffset,
    endOffset: startOffset + actualQuote.length,
    quote: actualQuote
  };
}

function findMention(document, entity) {
  const names = [entity.name, ...(entity.aliases ?? [])];
  for (const name of names) {
    const pattern = new RegExp(`(^|[^A-Za-z0-9])(${escapeRegExp(name)})(?=$|[^A-Za-z0-9])`, "i");
    const match = pattern.exec(document.text);
    if (match) {
      const quote = match[2];
      return {
        quote,
        confidence: quote.toLowerCase() === entity.name.toLowerCase() ? 0.92 : 0.84
      };
    }
  }
  return null;
}

function sentenceEvidence(document, sourceName, phrase, targetName) {
  const sentences = document.text.match(/[^.!?]+[.!?]?/g) ?? [];
  const wanted = `${sourceName} ${phrase} ${targetName}`.toLowerCase();
  for (const sentence of sentences) {
    const normalized = sentence.replace(/\s+/g, " ").trim();
    if (normalized.toLowerCase().includes(wanted)) {
      return evidenceSpan(document, normalized);
    }
  }
  return null;
}

function nodeCandidate(document, entity, mention) {
  const span = evidenceSpan(document, mention.quote);
  return {
    candidateId: `node-${sha256(`${document.documentId}:${entity.name}`).slice(0, 16)}`,
    nodeType: entity.nodeType,
    name: entity.name,
    sourceDocumentId: document.documentId,
    sourceRecordId: document.sourceRecordId,
    evidenceSpans: [span],
    confidence: mention.confidence,
    extractionVersion,
    properties: {
      summary: entity.summary,
      matchedText: mention.quote
    }
  };
}

function edgeCandidate(document, edgeType, sourceName, targetName, span) {
  return {
    candidateId: `edge-${sha256(`${document.documentId}:${edgeType}:${sourceName}:${targetName}`).slice(0, 16)}`,
    edgeType,
    sourceName,
    targetName,
    sourceDocumentId: document.documentId,
    sourceRecordId: document.sourceRecordId,
    evidenceSpans: [span],
    confidence: 0.86,
    extractionVersion,
    properties: {
      extractionRule: "sentence-pattern"
    }
  };
}

export function extractFoundryCandidates({ document, domainPack, now = "2026-06-16T00:00:00Z" }) {
  const nodeCandidates = [];
  for (const entity of domainPack.seedEntities) {
    const mention = findMention(document, entity);
    if (!mention) continue;
    const candidate = nodeCandidate(document, entity, mention);
    if (candidate.evidenceSpans[0]) nodeCandidates.push(candidate);
  }

  const names = new Set(nodeCandidates.map((candidate) => candidate.name));
  const edgeCandidates = [];
  if (names.has("Ontology") && names.has("AIP")) {
    const span = sentenceEvidence(document, "Ontology", "provides context to", "AIP");
    if (span) {
      edgeCandidates.push(edgeCandidate(document, "PROVIDES_CONTEXT_TO", "Ontology", "AIP", span));
    }
  }

  return {
    schemaVersion: "extraction.v1",
    runId: `extract-${sha256(`${document.documentId}:${domainPack.domainPackId}:${extractionVersion}`).slice(0, 16)}`,
    extractionVersion,
    domainPackId: domainPack.domainPackId,
    documentId: document.documentId,
    status: "completed",
    nodeCandidates,
    edgeCandidates,
    metrics: {
      documentsProcessed: 1,
      nodeCandidateCount: nodeCandidates.length,
      edgeCandidateCount: edgeCandidates.length,
      failedDocumentCount: 0
    },
    createdAt: now
  };
}
