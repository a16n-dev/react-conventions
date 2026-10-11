import { defineConfig } from "astro/config";

export default defineConfig({
  // TODO: replace with the custom domain once it's set up in Cloudflare
  site: "https://react-conventions.example.com",
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
