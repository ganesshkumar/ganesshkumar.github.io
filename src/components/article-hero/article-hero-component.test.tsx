import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleHeroComponent } from "./article-hero-component";

describe("ArticleHeroComponent", () => {
  it("renders the title as the page h1", () => {
    render(<ArticleHeroComponent title="My Article Title" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "My Article Title" }),
    ).toBeInTheDocument();
  });

  it("renders the cover image with its alt text when provided", () => {
    render(
      <ArticleHeroComponent
        title="T"
        image={{ src: "/assets/images/x/cover.webp", alt: "cover alt" }}
      />,
    );
    expect(screen.getByAltText("cover alt")).toHaveAttribute(
      "src",
      "/assets/images/x/cover.webp",
    );
  });

  it("shows the eyebrow category when provided", () => {
    render(<ArticleHeroComponent title="T" eyebrow="technology" />);
    expect(screen.getByText("technology")).toBeInTheDocument();
  });

  it("links the eyebrow when it identifies a series", () => {
    render(
      <ArticleHeroComponent
        title="T"
        eyebrow="A series · Part 2"
        eyebrowHref="/series/a-series"
      />,
    );
    expect(
      screen.getByRole("link", { name: "A series · Part 2" }),
    ).toHaveAttribute("href", "/series/a-series");
  });
});
