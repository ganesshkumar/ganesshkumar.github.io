import { afterEach, describe, expect, it, vi } from "vitest";
import * as tools from "@/lib/tools";
import { render, screen } from "@testing-library/react";
import CleanerPage, { metadata } from "./ai-text-cleaner/page";
import ToolsPage from "./page";
import sitemap from "@/app/sitemap";
import { getShowcaseProjects } from "@/lib/home-content";
import { FOOTER_QUICK_LINKS, PRIMARY_NAV } from "@/lib/navigation";

afterEach(() => vi.restoreAllMocks());

describe("tools routes", () => {
  it("automatically lists and sitemaps a future catalog tool exactly once", () => {
    const catalog = [...tools.getTools(), {
      slug: "future-tool", title: "Future tool", description: "A future catalog entry.", href: "/tools/future-tool/",
    }];
    // Simulate a catalog expansion without creating routes in the real repository.
    vi.spyOn(tools, "getTools").mockReturnValue(catalog);
    render(<ToolsPage />);
    expect(screen.getByRole("link", { name: "Future tool" })).toHaveAttribute("href", "/tools/future-tool");
    const urls = sitemap().map((entry) => entry.url);
    for (const tool of catalog) {
      expect(urls.filter((url) => url === `https://www.ganesshkumar.com${tool.href}`)).toHaveLength(1);
    }
    expect(urls.filter((url) => url === "https://www.ganesshkumar.com/tools/")).toHaveLength(1);
  });
  it("renders an honest, accessible cleaner page with canonical metadata", () => {
    render(<CleanerPage />);
    expect(screen.getByRole("heading", { level: 1, name: "AI Text Cleaner" })).toBeInTheDocument();
    expect(screen.getByLabelText("Original text")).toBeInTheDocument();
    expect(screen.getByText(/does not guarantee removal/i)).toBeInTheDocument();
    expect(metadata.alternates?.canonical).toBe("/tools/ai-text-cleaner/");
    expect(metadata.description).toContain("emoji");
    expect(screen.getByText(/conservative cleanup preserves punctuation/i)).toBeInTheDocument();
    expect(screen.getByText(/does not protect code blocks/i)).toBeInTheDocument();
  });
  it("provides a tools index and discoverable links without changing primary navigation", () => {
    render(<ToolsPage />);
    expect(screen.getByRole("link", { name: "AI Text Cleaner" })).toHaveAttribute("href", "/tools/ai-text-cleaner");
    expect(FOOTER_QUICK_LINKS).toContainEqual({ label: "Tools", href: "/tools/" });
    expect(PRIMARY_NAV).toHaveLength(5);
    expect(getShowcaseProjects().find((project) => project.slug === "exort")?.liveUrl).toBe("/tools/ai-text-cleaner/");
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://www.ganesshkumar.com/tools/");
    expect(urls).toContain("https://www.ganesshkumar.com/tools/ai-text-cleaner/");
  });
});
