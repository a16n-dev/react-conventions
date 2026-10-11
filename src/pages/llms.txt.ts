import type { APIRoute } from "astro";
import { getMarkdownPath, getPublishedGuardrails, getSummary } from "../lib/guardrails";
import { readmeSummary } from "../lib/readme";

export const GET: APIRoute = async ({ site }) => {
  const guardrails = await getPublishedGuardrails();
  const links = guardrails.map((guardrail) => {
    const url = new URL(getMarkdownPath(guardrail), site);
    return `- [${guardrail.data.title}](${url}): ${getSummary(guardrail)}`;
  });

  const body = [
    "# React Conventions",
    `> ${readmeSummary}`,
    `Every convention in a single file: ${new URL("/llms-full.txt", site)}`,
    "## Conventions",
    links.join("\n"),
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
