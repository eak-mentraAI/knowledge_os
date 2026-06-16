import { createHash } from "node:crypto";

const schemaVersion = "source-acquisition.v1";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === "\"" && quoted && next === "\"") {
      current += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  cells.push(current.trim());
  return cells;
}

export function parseUrlListCsv(csvText) {
  const rows = csvText
    .split(/\r?\n/)
    .map((line, index) => ({ line, lineNumber: index + 1 }))
    .filter(({ line }) => line.trim() && !line.trim().startsWith("#"));

  if (rows.length === 0) return [];

  const firstCells = parseCsvLine(rows[0].line);
  const hasHeader = firstCells.some((cell) => cell.toLowerCase() === "url");
  const urlIndex = hasHeader ? firstCells.findIndex((cell) => cell.toLowerCase() === "url") : 0;
  const dataRows = hasHeader ? rows.slice(1) : rows;

  return dataRows.map(({ line, lineNumber }) => {
    const cells = parseCsvLine(line);
    return {
      lineNumber,
      url: cells[urlIndex] ?? "",
      raw: line
    };
  });
}

export function normalizeUrl(input) {
  const url = new URL(input);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only http and https URLs are supported.");
  }

  url.username = "";
  url.password = "";
  url.hash = "";
  url.protocol = url.protocol.toLowerCase();
  url.hostname = url.hostname.toLowerCase();

  if ((url.protocol === "https:" && url.port === "443") || (url.protocol === "http:" && url.port === "80")) {
    url.port = "";
  }

  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }

  return url.toString();
}

export function isAllowedDomain(normalizedUrl, allowedDomains) {
  const { hostname } = new URL(normalizedUrl);
  return allowedDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
}

function recordFor({ sourceDefinition, crawlJobId, row, normalizedUrl, status, error }) {
  const stableIdInput = `${sourceDefinition.sourceId}:${row.lineNumber}:${normalizedUrl ?? row.url}`;
  return {
    schemaVersion,
    recordId: `${sourceDefinition.sourceId}-${sha256(stableIdInput).slice(0, 16)}`,
    sourceId: sourceDefinition.sourceId,
    crawlJobId,
    url: row.url,
    normalizedUrl: normalizedUrl ?? `urn:invalid:url-list-line:${row.lineNumber}`,
    status,
    discoveredAt: row.discoveredAt,
    fetchedAt: null,
    httpStatus: null,
    contentType: null,
    lastModified: null,
    contentHashSha256: null,
    rawContentRef: null,
    discoveredLinks: [],
    error,
    provenance: {
      sourceType: sourceDefinition.sourceType,
      sourceLocation: sourceDefinition.location.uri,
      domainPackId: sourceDefinition.domainPack.id,
      policyId: sourceDefinition.crawlPolicy.policyId
    }
  };
}

export function ingestUrlList({ csvText, sourceDefinition, crawlJobId, now = "2026-06-16T00:00:00Z" }) {
  const rows = parseUrlListCsv(csvText).map((row) => ({ ...row, discoveredAt: now }));
  const seen = new Set();
  const records = [];
  const allowedDomains = sourceDefinition.crawlPolicy.allowedDomains;

  for (const row of rows) {
    let normalizedUrl;
    try {
      normalizedUrl = normalizeUrl(row.url);
    } catch (error) {
      records.push(recordFor({
        sourceDefinition,
        crawlJobId,
        row,
        normalizedUrl: null,
        status: "skipped",
        error: {
          code: "INVALID_URL",
          message: error.message,
          retryable: false
        }
      }));
      continue;
    }

    if (!isAllowedDomain(normalizedUrl, allowedDomains)) {
      records.push(recordFor({
        sourceDefinition,
        crawlJobId,
        row,
        normalizedUrl,
        status: "blocked",
        error: {
          code: "DOMAIN_NOT_ALLOWED",
          message: "URL is outside the configured domain allowlist.",
          retryable: false
        }
      }));
      continue;
    }

    if (seen.has(normalizedUrl)) {
      records.push(recordFor({
        sourceDefinition,
        crawlJobId,
        row,
        normalizedUrl,
        status: "skipped",
        error: {
          code: "DUPLICATE_URL",
          message: "URL normalized to a previously discovered URL.",
          retryable: false
        }
      }));
      continue;
    }

    seen.add(normalizedUrl);
    records.push(recordFor({
      sourceDefinition,
      crawlJobId,
      row,
      normalizedUrl,
      status: "discovered",
      error: null
    }));
  }

  const totals = {
    discovered: records.filter((record) => record.status === "discovered").length,
    fetched: 0,
    skipped: records.filter((record) => record.status === "skipped").length,
    failed: records.filter((record) => record.status === "failed").length,
    blocked: records.filter((record) => record.status === "blocked").length
  };

  const inventoryHashInput = records
    .map((record) => `${record.status}:${record.normalizedUrl}`)
    .sort()
    .join("\n");

  return {
    schemaVersion,
    crawlJobId,
    sourceId: sourceDefinition.sourceId,
    status: totals.skipped > 0 || totals.blocked > 0 || totals.failed > 0 ? "completed_with_errors" : "completed",
    startedAt: now,
    completedAt: now,
    totals,
    records,
    checkpoint: {
      cursor: null,
      contentHash: sha256(inventoryHashInput)
    }
  };
}

