import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleRowComponent } from "./article-row-component";
import type { ArticleSummary } from "@/lib/content";

const article: ArticleSummary = {
  slug: "2026-02-04-clean-obsidian-vault",
  title: "Clean Obsidian Vault",
  description: "",
  pubDate: "2026-02-04",
  tags: ["obsidian"],
};

describe("ArticleRowComponent", () => {
  it("renders a dated link to the article", () => {
    render(<ArticleRowComponent article={article} />);
    const link = screen.getByRole("link", { name: /Clean Obsidian Vault/ });
    expect(link).toHaveAttribute(
      "href",
      "/articles/2026-02-04-clean-obsidian-vault",
    );
    expect(screen.getByText("Feb 04, 2026")).toBeInTheDocument();
  });
});
