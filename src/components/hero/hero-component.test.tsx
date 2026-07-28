import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroComponent } from "./hero-component";

describe("HeroComponent", () => {
  it("renders the title as the page heading", () => {
    render(
      <HeroComponent
        title="Ganessh Kumar"
        description="A developer knowledge platform."
        primaryCta={{ label: "Read Articles", href: "/articles" }}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Ganessh Kumar" }),
    ).toBeInTheDocument();
  });

  it("renders the primary and secondary CTAs with hrefs", () => {
    render(
      <HeroComponent
        title="Title"
        description="Desc"
        primaryCta={{ label: "Read Articles", href: "/articles" }}
        secondaryCta={{ label: "View Projects", href: "/projects" }}
      />,
    );
    expect(screen.getByRole("link", { name: "Read Articles" })).toHaveAttribute(
      "href",
      "/articles",
    );
    expect(screen.getByRole("link", { name: "View Projects" })).toHaveAttribute(
      "href",
      "/projects",
    );
  });

  it("lists current focus items when provided", () => {
    render(
      <HeroComponent
        title="Title"
        description="Desc"
        currentFocus={["Distributed systems", "AI agents"]}
        primaryCta={{ label: "Read Articles", href: "/articles" }}
      />,
    );
    expect(screen.getByText("Distributed systems")).toBeInTheDocument();
    expect(screen.getByText("AI agents")).toBeInTheDocument();
  });
});
