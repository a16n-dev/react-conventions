import readme from "../../README.md?raw";

/** The README with its top-level heading removed */
export const readmeBody = readme.replace(/^# .*\n/, "").trim();

/** The README's opening paragraph, used as the site summary */
export const readmeSummary = readmeBody.split(/\n\s*\n/)[0]?.replace(/\s+/g, " ").trim() ?? "";
