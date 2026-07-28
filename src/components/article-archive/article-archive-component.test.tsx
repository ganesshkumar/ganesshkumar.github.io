import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleArchiveComponent } from "./article-archive-component";
import type { ArticleYearGroup } from "@/lib/content";

const groups: ArticleYearGroup[] = [
  {
    year: 2026,
    articles: [
      {
        slug: "2026-02-04-a",
        title: "Post A",
        description: "",
        pubDate: "2026-02-04",
        tags: [],
      },
    ],
  },
  {
    year: 2025,
    articles: [
      {
        slug: "2025-01-07-b",
        title: "Post B",
        description: "",
        pubDate: "2025-01-07",
        tags: [],
      },
    ],
  },
];

describe("ArticleArchiveComponent", () => {
  it("renders a heading for each year", () => {
    render(<ArticleArchiveComponent groups={groups} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "2026" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "2025" }),
    ).toBeInTheDocument();
  });

  it("renders each article as a dated link", () => {
    render(<ArticleArchiveComponent groups={groups} />);
    expect(screen.getByRole("link", { name: /Post A/ })).toHaveAttribute(
      "href",
      "/articles/2026-02-04-a",
    );
    expect(screen.getByRole("link", { name: /Post B/ })).toHaveAttribute(
      "href",
      "/articles/2025-01-07-b",
    );
  });

  it("renders nothing when there are no groups", () => {
    const { container } = render(<ArticleArchiveComponent groups={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
