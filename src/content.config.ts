import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const guardrails = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./guardrails",
    // Drop the ordering prefix so URLs survive reordering: `01-foo.md` -> `foo`
    generateId: ({ entry }) => entry.replace(/^\d+-/, "").replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    published: z.boolean(),
  }),
});

export const collections = { guardrails };
