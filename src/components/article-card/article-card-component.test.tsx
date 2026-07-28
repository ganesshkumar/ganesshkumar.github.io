import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleCardComponent } from "./article-card-component";
import type { ArticleSummary } from "@/lib/content";

const article: ArticleSummary = {
  slug: "docker-timezone",
  title: "Set the Timezone in a Docker Container",
  description: "A short, reliable way to fix container time.",
  pubDate: "2016-07-16",
  tags: ["docker", "linux"],
  readingTimeMinutes: 3,
};

describe("ArticleCardComponent", () => {
  it("links the title to the article route", () => {
    render(<ArticleCardComponent article={article} />);
    expect(screen.getByRole("link", { name: article.title })).toHaveAttribute(
      "href",
      "/articles/docker-timezone",
    );
  });

  it("renders the title at the requested heading level", () => {
    render(<ArticleCardComponent article={article} headingLevel={2} />);
    expect(
      screen.getByRole("heading", { level: 2, name: article.title }),
    ).toBeInTheDocument();
  });

  it("shows the description and tags", () => {
    render(<ArticleCardComponent article={article} />);
    expect(screen.getByText(article.description)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "docker" })).toHaveAttribute(
      "href",
      "/tags/docker",
    );
  });

  it("shows reading time when provided", () => {
    render(<ArticleCardComponent article={article} />);
    expect(screen.getByText(/3 min read/i)).toBeInTheDocument();
  });
});
