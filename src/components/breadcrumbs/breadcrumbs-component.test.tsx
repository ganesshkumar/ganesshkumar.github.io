import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BreadcrumbsComponent } from "./breadcrumbs-component";

describe("BreadcrumbsComponent", () => {
  it("links non-current items and marks the last as the current page", () => {
    render(
      <BreadcrumbsComponent
        items={[
          { label: "Home", href: "/" },
          { label: "Articles", href: "/articles" },
          { label: "Post" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Articles" })).toHaveAttribute(
      "href",
      "/articles",
    );
    expect(screen.queryByRole("link", { name: "Post" })).toBeNull();
    expect(screen.getByText("Post")).toHaveAttribute("aria-current", "page");
  });

  it("exposes a breadcrumb navigation landmark", () => {
    render(<BreadcrumbsComponent items={[{ label: "Home", href: "/" }]} />);
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
  });
});
