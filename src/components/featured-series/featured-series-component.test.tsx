import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ArticleSummary, SeriesWithArticles } from "@/lib/content";
import { FeaturedSeriesComponent } from "./featured-series-component";

const article: ArticleSummary = {
  slug: "part-1",
  title: "Part 1",
  description: "The first article.",
  pubDate: "2026-10-11",
  tags: ["gpt-2"],
  series: {
    name: "Learning LLMs",
    slug: "learning-llms",
    order: 1,
  },
};

const data: SeriesWithArticles = {
  series: {
    name: "Learning LLMs",
    slug: "learning-llms",
    description: "A learning series.",
    status: "ongoing",
    featured: true,
    project: {
      name: "Pico GPT",
      description: "A minimal GPT-2-inspired model.",
      url: "https://github.com/ganesshkumar/pico-gpt",
    },
  },
  articles: [article],
  firstArticle: article,
  latestArticle: article,
};

describe("FeaturedSeriesComponent", () => {
  it("shows the series build as external proof", () => {
    render(<FeaturedSeriesComponent data={data} />);

    const project = screen.getByRole("link", { name: /Pico GPT/ });
    expect(project).toHaveAttribute(
      "href",
      "https://github.com/ganesshkumar/pico-gpt",
    );
    expect(project).toHaveAttribute("target", "_blank");
    expect(screen.getByText("Series build")).toBeInTheDocument();
  });
});
