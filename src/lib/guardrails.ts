import { getCollection, type CollectionEntry } from "astro:content";

export type Guardrail = CollectionEntry<"guardrails">;

function orderOf(guardrail: Guardrail) {
  const prefix = guardrail.filePath?.match(/(\d+)-[^/]+$/)?.[1];
  return prefix ? Number(prefix) : Number.MAX_SAFE_INTEGER;
}

export async function getPublishedGuardrails() {
  const guardrails = await getCollection("guardrails", ({ data }) => data.published);
  return guardrails.sort((a, b) => orderOf(a) - orderOf(b));
}

export function getHtmlPath(guardrail: Guardrail) {
  return `/guardrails/${guardrail.id}`;
}

export function getMarkdownPath(guardrail: Guardrail) {
  return `/guardrails/${guardrail.id}.md`;
}

/** First paragraph of the description, as plain text */
export function getSummary(guardrail: Guardrail) {
  const body = guardrail.body ?? "";
  const description = body.split(/^## Description\s*$/m)[1] ?? body;
  const paragraph = description.trim().split(/\n\s*\n/)[0] ?? "";
  return paragraph
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** The convention as a standalone markdown document, titled but without frontmatter */
export function toMarkdown(guardrail: Guardrail) {
  const tags = guardrail.data.tags.join(", ");
  return `# ${guardrail.data.title}\n\nTags: ${tags}\n\n${(guardrail.body ?? "").trim()}\n`;
}

export function getAllTags(guardrails: Guardrail[]) {
  return [...new Set(guardrails.flatMap((guardrail) => guardrail.data.tags))].sort();
}
