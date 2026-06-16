import { createHash } from "node:crypto";
import { isAllowedDomain, normalizeUrl } from "./url-list-ingestion.mjs";

const schemaVersion = "source-acquisition.v1";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function extractLinks(html, baseUrl) {
  const links = [];
  const anchorPattern = /<a\s+[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = anchorPattern.exec(html)) !== null) {
    const href = match[1].trim();
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      continue;
    }

    try {
      links.push(normalizeUrl(new URL(href, baseUrl).toString()));
    } catch {
      continue;
    }
  }

  return [...new Set(links)];
}

function recordFor({ sourceDefinition, crawlJobId, url, status, discoveredAt, discoveredLinks = [], error = null }) {
  const normalizedUrl = normalizeUrl(url);
  return {
    schemaVersion,
    recordId: `${sourceDefinition.sourceId}-${sha256(`${crawlJobId}:${normalizedUrl}`).slice(0, 16)}`,
    sourceId: sourceDefinition.sourceId,
    crawlJobId,
    url,
    normalizedUrl,
    status,
    discoveredAt,
    fetchedAt: null,
    httpStatus: null,
    contentType: null,
    lastModified: null,
    contentHashSha256: null,
    rawContentRef: null,
    discoveredLinks,
    error,
    provenance: {
      sourceType: sourceDefinition.sourceType,
      sourceLocation: sourceDefinition.location.uri,
      domainPackId: sourceDefinition.domainPack.id,
      policyId: sourceDefinition.crawlPolicy.policyId
    }
  };
}

export async function discoverDocumentationPortal({
  sourceDefinition,
  crawlJobId,
  loadPage,
  rootUrl = sourceDefinition.location.uri,
  now = "2026-06-16T00:00:00Z"
}) {
  const allowedDomains = sourceDefinition.crawlPolicy.allowedDomains;
  const maxDepth = sourceDefinition.crawlPolicy.maxDepth;
  const maxPages = sourceDefinition.crawlPolicy.maxPages;
  const queue = [{ url: normalizeUrl(rootUrl), depth: 0 }];
  const queued = new Set(queue.map((item) => item.url));
  const visited = new Set();
  const records = [];

  while (queue.length > 0 && visited.size < maxPages) {
    const current = queue.shift();
    if (visited.has(current.url)) continue;
    visited.add(current.url);

    if (!isAllowedDomain(current.url, allowedDomains)) {
      records.push(recordFor({
        sourceDefinition,
        crawlJobId,
        url: current.url,
        status: "blocked",
        discoveredAt: now,
        error: {
          code: "DOMAIN_NOT_ALLOWED",
          message: "URL is outside the configured domain allowlist.",
          retryable: false
        }
      }));
      continue;
    }

    let html;
    try {
      html = await loadPage(current.url);
      if (typeof html !== "string") throw new Error("Page loader returned no HTML.");
    } catch (error) {
      records.push(recordFor({
        sourceDefinition,
        crawlJobId,
        url: current.url,
        status: "failed",
        discoveredAt: now,
        error: {
          code: "PAGE_LOAD_FAILED",
          message: error.message,
          retryable: true
        }
      }));
      continue;
    }

    const links = extractLinks(html, current.url);
    records.push(recordFor({
      sourceDefinition,
      crawlJobId,
      url: current.url,
      status: "discovered",
      discoveredAt: now,
      discoveredLinks: links
    }));

    if (current.depth >= maxDepth) continue;
    for (const link of links) {
      if (!queued.has(link)) {
        queued.add(link);
        queue.push({ url: link, depth: current.depth + 1 });
      }
    }
  }

  const totals = {
    discovered: records.filter((record) => record.status === "discovered").length,
    fetched: 0,
    skipped: records.filter((record) => record.status === "skipped").length,
    failed: records.filter((record) => record.status === "failed").length,
    blocked: records.filter((record) => record.status === "blocked").length
  };

  const inventoryHashInput = records
    .map((record) => `${record.status}:${record.normalizedUrl}:${record.discoveredLinks.join(",")}`)
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

