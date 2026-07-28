import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RelatedArticlesComponent } from "./related-articles-component";
import type { ArticleSummary } from "@/lib/content";

const articles: ArticleSummary[] = [
  {
    slug: "a",
    title: "Article A",
    description: "About A",
    pubDate: "2025-01-01",
    tags: ["x"],
  },
];

describe("RelatedArticlesComponent", () => {
  it("renders nothing when there are no suggestions", () => {
    const { container } = render(<RelatedArticlesComponent articles={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("links each suggested post to its route", () => {
    render(<RelatedArticlesComponent articles={articles} />);
    expect(screen.getByRole("link", { name: "Article A" })).toHaveAttribute(
      "href",
      "/articles/a",
    );
    expect(
      screen.getByRole("heading", { name: "Suggested posts" }),
    ).toBeInTheDocument();
  });

  it("shows tags as plain text rather than links", () => {
    render(<RelatedArticlesComponent articles={articles} />);
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "x" })).toBeNull();
  });
});
