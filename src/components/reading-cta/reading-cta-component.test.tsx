import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReadingCtaComponent } from "./reading-cta-component";

describe("ReadingCtaComponent", () => {
  it("renders the heading and description", () => {
    render(
      <ReadingCtaComponent
        title="New Posts, Straight to Your Inbox"
        description="Occasional deep-dives. No spam."
        primaryCta={{ label: "Subscribe", href: "/newsletter" }}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: /New Posts/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/No spam/i)).toBeInTheDocument();
  });

  it("renders the primary CTA to the newsletter route", () => {
    render(
      <ReadingCtaComponent
        title="Title"
        description="Desc"
        primaryCta={{ label: "Subscribe", href: "/newsletter" }}
      />,
    );
    expect(screen.getByRole("link", { name: "Subscribe" })).toHaveAttribute(
      "href",
      "/newsletter",
    );
  });

  it("renders an optional secondary CTA", () => {
    render(
      <ReadingCtaComponent
        title="Title"
        description="Desc"
        primaryCta={{ label: "Subscribe", href: "/newsletter" }}
        secondaryCta={{ label: "Read Articles", href: "/articles" }}
      />,
    );
    expect(screen.getByRole("link", { name: "Read Articles" })).toHaveAttribute(
      "href",
      "/articles",
    );
  });
});
