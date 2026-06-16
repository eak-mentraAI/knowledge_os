import { createHash } from "node:crypto";
import { normalizeUrl } from "../../source-acquisition/src/url-list-ingestion.mjs";

const schemaVersion = "document-processing.v1";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'");
}

export function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function slug(value) {
  const cleaned = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return cleaned || "section";
}

function titleFromHtml(html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) return stripTags(titleMatch[1]);
  const headingMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (headingMatch) return stripTags(headingMatch[1]);
  return "Untitled Document";
}

function blocksFromHtml(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  const blockPattern = /<(h[1-6]|p|table)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const blocks = [];
  let match;

  while ((match = blockPattern.exec(body)) !== null) {
    blocks.push({
      tag: match[1].toLowerCase(),
      html: match[2],
      text: stripTags(match[2])
    });
  }

  return blocks.filter((block) => block.text);
}

function linksFromHtml(html, baseUrl, documentId, sourceRecordId, text) {
  const linkPattern = /<a\s+[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const links = [];
  let match;

  while ((match = linkPattern.exec(html)) !== null) {
    const label = stripTags(match[2]);
    if (!label) continue;
    try {
      const url = normalizeUrl(new URL(match[1], baseUrl).toString());
      links.push({
        url,
        text: label,
        evidenceSpan: evidenceSpan({ documentId, sourceRecordId, text, quote: label })
      });
    } catch {
      continue;
    }
  }

  return links;
}

function tablesFromHtml(html, documentId, sourceRecordId, text) {
  const tablePattern = /<table\b[^>]*>([\s\S]*?)<\/table>/gi;
  const tables = [];
  let match;

  while ((match = tablePattern.exec(html)) !== null) {
    const tableHtml = match[1];
    const rowMatches = [...tableHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
    const rows = rowMatches.map((rowMatch) => {
      const cells = [...rowMatch[1].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)];
      return cells.map((cell) => stripTags(cell[1]));
    }).filter((row) => row.length > 0);
    if (rows.length === 0) continue;

    const headers = rows[0];
    const bodyRows = rows.slice(1);
    const quote = rows.map((row) => row.join(" ")).join(" ");
    tables.push({
      caption: "",
      headers,
      rows: bodyRows,
      evidenceSpan: evidenceSpan({ documentId, sourceRecordId, text, quote })
    });
  }

  return tables;
}

function evidenceSpan({ documentId, sourceRecordId, text, quote }) {
  const normalizedQuote = quote.replace(/\s+/g, " ").trim();
  const startOffset = Math.max(0, text.indexOf(normalizedQuote));
  return {
    documentId,
    sourceRecordId,
    startOffset,
    endOffset: startOffset + normalizedQuote.length,
    quote: normalizedQuote
  };
}

function sectionsFromBlocks(blocks, documentId, sourceRecordId, text) {
  const sections = [];
  const path = [];
  let current = null;

  for (const block of blocks) {
    const headingMatch = block.tag.match(/^h([1-6])$/);
    if (headingMatch) {
      const level = Number(headingMatch[1]);
      path.splice(level - 1, path.length, block.text);
      current = {
        sectionId: `${documentId}-${slug(block.text)}-${sha256(`${level}:${block.text}`).slice(0, 8)}`,
        headingLevel: level,
        title: block.text,
        path: path.slice(0, level),
        text: "",
        evidenceSpans: [
          evidenceSpan({ documentId, sourceRecordId, text, quote: block.text })
        ]
      };
      sections.push(current);
      continue;
    }

    if (!current) {
      current = {
        sectionId: `${documentId}-overview`,
        headingLevel: 0,
        title: "Overview",
        path: ["Overview"],
        text: "",
        evidenceSpans: []
      };
      sections.push(current);
    }

    current.text = [current.text, block.text].filter(Boolean).join("\n\n");
    current.evidenceSpans.push(evidenceSpan({ documentId, sourceRecordId, text, quote: block.text }));
  }

  return sections;
}

export function htmlToCanonicalDocument({ sourceRecord, html, now = "2026-06-16T00:00:00Z" }) {
  const contentHashSha256 = sha256(html);
  const title = titleFromHtml(html);
  const documentId = `${sourceRecord.sourceId}-${sha256(sourceRecord.normalizedUrl).slice(0, 16)}`;
  const blocks = blocksFromHtml(html);
  const text = blocks.map((block) => block.text).join("\n\n");
  const sections = sectionsFromBlocks(blocks, documentId, sourceRecord.recordId, text);
  const parseWarnings = [];

  if (text.length === 0) parseWarnings.push("NO_TEXT_CONTENT");
  if (sections.length === 0) parseWarnings.push("NO_SECTIONS");

  return {
    schemaVersion,
    documentId,
    sourceRecordId: sourceRecord.recordId,
    sourceId: sourceRecord.sourceId,
    url: sourceRecord.normalizedUrl,
    title,
    contentHashSha256,
    processingStatus: text.length === 0 ? "empty" : "processed",
    text,
    sections,
    links: linksFromHtml(html, sourceRecord.normalizedUrl, documentId, sourceRecord.recordId, text),
    tables: tablesFromHtml(html, documentId, sourceRecord.recordId, text),
    quality: {
      emptyContent: text.length === 0,
      textLength: text.length,
      parseWarnings
    },
    createdAt: now
  };
}

