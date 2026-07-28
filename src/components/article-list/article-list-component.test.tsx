import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleListComponent } from "./article-list-component";
import type { ArticleSummary } from "@/lib/content";

const articles: ArticleSummary[] = [
  {
    slug: "first",
    title: "First Post",
    description: "",
    pubDate: "2026-02-04",
    tags: ["x"],
  },
  {
    slug: "second",
    title: "Second Post",
    description: "",
    pubDate: "2026-01-15",
    tags: ["y"],
  },
];

describe("ArticleListComponent", () => {
  it("renders the section heading", () => {
    render(<ArticleListComponent articles={articles} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Recent Articles" }),
    ).toBeInTheDocument();
  });

  it("renders each article as a dated link", () => {
    render(<ArticleListComponent articles={articles} />);
    expect(screen.getByRole("link", { name: /First Post/ })).toHaveAttribute(
      "href",
      "/articles/first",
    );
    expect(screen.getByRole("link", { name: /Second Post/ })).toHaveAttribute(
      "href",
      "/articles/second",
    );
    expect(screen.getByText("Feb 04, 2026")).toBeInTheDocument();
  });

  it("renders a view-all action", () => {
    render(<ArticleListComponent articles={articles} />);
    expect(
      screen.getByRole("link", { name: /all articles/i }),
    ).toHaveAttribute("href", "/articles");
  });

  it("renders nothing when there are no articles", () => {
    const { container } = render(<ArticleListComponent articles={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
