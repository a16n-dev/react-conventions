import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://react-conventions.a16n.dev",
  trailingSlash: "never",
  build: {
    // Emit `foo.html` rather than `foo/index.html` so pages live at `/guardrails/foo`
    format: "file",
  },
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
});
