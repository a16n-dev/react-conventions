import { defineConfig } from "astro/config";
import hazel from "./src/themes/hazel.json" with { type: "json" };

export default defineConfig({
  site: "https://react-conventions.a16n.dev",
  trailingSlash: "never",
  build: {
    // Emit `foo.html` rather than `foo/index.html` so pages live at `/guardrails/foo`
    format: "file",
  },
  markdown: {
    shikiConfig: {
      theme: hazel,
    },
  },
});
