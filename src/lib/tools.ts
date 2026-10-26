import { readdirSync } from "node:fs";
import path from "node:path";

export type ToolDefinition = {
  slug: string;
  title: string;
  description: string;
};

export const TOOL_CATALOG: readonly ToolDefinition[] = [
  {
    slug: "ai-text-cleaner",
    title: "AI Text Cleaner",
    description: "Remove invisible characters and normalize spaces, dashes and quotes. Choose the cleanup rules, compare the result and copy it. Your text stays in your browser.",
  },
];

/** Called by both the tools index and sitemap during the static build. */
export function getTools(
  toolsDirectory = path.join(process.cwd(), "src", "app", "tools"),
  catalog: readonly ToolDefinition[] = TOOL_CATALOG,
) {
  const pages = new Set<string>();
  function collect(directory: string, segments: string[]) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (/^[_.@]/.test(entry.name)) continue;
        const grouped = entry.name.startsWith("(") && entry.name.endsWith(")");
        collect(path.join(directory, entry.name), grouped ? segments : [...segments, entry.name]);
      } else if (/^page\.(tsx?|jsx?)$/.test(entry.name) && segments.length > 0) pages.add(segments.join("/"));
    }
  }
  collect(toolsDirectory, []);
  const registered = new Set(catalog.map((tool) => tool.slug));
  if (registered.size !== catalog.length) throw new Error("Duplicate tool slugs in TOOL_CATALOG.");
  const missing = [...pages].filter((slug) => !registered.has(slug));
  if (missing.length > 0) throw new Error(`Unregistered tool pages: ${missing.sort().join(", ")}. Add them to TOOL_CATALOG in src/lib/tools.ts.`);
  const stale = [...registered].filter((slug) => !pages.has(slug));
  if (stale.length > 0) throw new Error(`Catalog tool pages not found: ${stale.sort().join(", ")}. Remove stale entries or restore their pages.`);
  return catalog.map((tool) => ({ ...tool, href: `/tools/${tool.slug}/` }));
}
