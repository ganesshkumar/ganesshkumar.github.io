import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleMetaComponent } from "./article-meta-component";

describe("ArticleMetaComponent", () => {
  it("shows the author, publish date and reading time", () => {
    render(
      <ArticleMetaComponent
        author="Ganessh Kumar"
        pubDate="2026-02-04"
        readingTimeMinutes={5}
        tags={["obsidian"]}
      />,
    );
    expect(screen.getByText("Ganessh Kumar")).toBeInTheDocument();
    expect(screen.getByText(/5 min read/i)).toBeInTheDocument();
    expect(screen.getByText("Feb 04, 2026")).toHaveAttribute(
      "datetime",
      "2026-02-04",
    );
  });

  it("renders tags as plain text rather than links", () => {
    render(
      <ArticleMetaComponent
        author="X"
        pubDate="2026-02-04"
        readingTimeMinutes={1}
        tags={["obsidian"]}
      />,
    );
    expect(screen.getByText("obsidian")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "obsidian" })).toBeNull();
  });

  it("shows an updated date only when it differs from the publish date", () => {
    render(
      <ArticleMetaComponent
        author="X"
        pubDate="2026-02-04"
        updatedDate="2026-03-01"
        readingTimeMinutes={1}
        tags={[]}
      />,
    );
    expect(screen.getByText(/Updated/)).toBeInTheDocument();
  });
});
