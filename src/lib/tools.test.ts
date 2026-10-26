import { afterEach, describe, expect, it } from "vitest";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { getTools } from "./tools";

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

function toolPages(slugs: string[]) {
  const root = mkdtempSync(path.join(tmpdir(), "site-tools-"));
  roots.push(root);
  for (const slug of ["", ...slugs]) {
    const directory = path.join(root, slug);
    mkdirSync(directory, { recursive: true });
    writeFileSync(path.join(directory, "page.tsx"), "export default function Page() { return null; }");
  }
  return root;
}

describe("getTools", () => {
  it("uses public URL paths for nested pages and route groups, ignoring private folders and slots", () => {
    const root = toolPages(["(text)/nested/second-tool", "_drafts/hidden", "@overlay/preview"]);
    const tools = getTools(root, [{ slug: "nested/second-tool", title: "Nested", description: "Nested tool." }]);
    expect(tools[0].href).toBe("/tools/nested/second-tool/");
    expect(getTools(toolPages([]), [])).toEqual([]);
  });
  it("rejects duplicate catalog slugs", () => {
    const root = toolPages(["first-tool"]);
    const tool = { slug: "first-tool", title: "First tool", description: "First." };
    expect(() => getTools(root, [tool, tool])).toThrow(/Duplicate tool slugs/);
  });
  it("rejects catalog entries without a real tool page", () => {
    const root = toolPages([]);
    expect(() => getTools(root, [{ slug: "missing-tool", title: "Missing", description: "Not a page." }])).toThrow(/Catalog tool pages not found: missing-tool/);
  });
  it("fails when a published tool page has no catalog entry", () => {
    const root = toolPages(["first-tool", "unregistered-tool"]);
    expect(() => getTools(root, [{ slug: "first-tool", title: "First tool", description: "First." }])).toThrow(/Unregistered tool pages: unregistered-tool/);
  });
  it("resolves every catalog entry to its canonical tool URL", () => {
    const catalog = [
      { slug: "first-tool", title: "First tool", description: "The first tool." },
      { slug: "second-tool", title: "Second tool", description: "The second tool." },
    ];
    const root = toolPages(catalog.map((tool) => tool.slug));
    expect(getTools(root, catalog)).toEqual(catalog.map((tool) => ({
      ...tool, href: `/tools/${tool.slug}/`,
    })));
  });
});
