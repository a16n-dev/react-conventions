import type { APIRoute } from "astro";
import { getPublishedGuardrails, toMarkdown } from "../lib/guardrails";
import { readmeBody } from "../lib/readme";

/** Demote headings one level so each convention nests under the document title */
function demoteHeadings(markdown: string) {
  let inCodeBlock = false;
  return markdown
    .split("\n")
    .map((line) => {
      if (line.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
      }
      return !inCodeBlock && /^#+ /.test(line) ? `#${line}` : line;
    })
    .join("\n");
}

export const GET: APIRoute = async () => {
  const guardrails = await getPublishedGuardrails();

  const sections = guardrails.map((guardrail) => demoteHeadings(toMarkdown(guardrail)).trim());
  const body = [`# React Conventions\n\n${readmeBody}`, ...sections].join("\n\n---\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
