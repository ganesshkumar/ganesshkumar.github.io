import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeaderComponent } from "./section-header-component";

describe("SectionHeaderComponent", () => {
  it("renders an h2 by default", () => {
    render(<SectionHeaderComponent title="Featured Articles" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Featured Articles" }),
    ).toBeInTheDocument();
  });

  it("can render an h3 when requested", () => {
    render(<SectionHeaderComponent title="Sub" headingLevel={3} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Sub" }),
    ).toBeInTheDocument();
  });

  it("renders an action link when provided", () => {
    render(
      <SectionHeaderComponent
        title="Featured Articles"
        action={{ label: "View All", href: "/articles" }}
      />,
    );
    expect(screen.getByRole("link", { name: "View All" })).toHaveAttribute(
      "href",
      "/articles",
    );
  });

  it("shows an optional description", () => {
    render(
      <SectionHeaderComponent
        title="Featured Articles"
        description="Recent writing worth your time."
      />,
    );
    expect(
      screen.getByText("Recent writing worth your time."),
    ).toBeInTheDocument();
  });
});
