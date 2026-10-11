import type { APIRoute, GetStaticPaths } from "astro";
import { getPublishedGuardrails, toMarkdown, type Guardrail } from "../../lib/guardrails";

export const getStaticPaths = (async () => {
  const guardrails = await getPublishedGuardrails();
  return guardrails.map((guardrail) => ({
    params: { id: guardrail.id },
    props: { guardrail },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ guardrail: Guardrail }> = ({ props }) =>
  new Response(toMarkdown(props.guardrail), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
