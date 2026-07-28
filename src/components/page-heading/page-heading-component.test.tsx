import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeadingComponent } from "./page-heading-component";

describe("PageHeadingComponent", () => {
  it("renders its children as a level-1 heading", () => {
    render(<PageHeadingComponent>About me</PageHeadingComponent>);
    expect(
      screen.getByRole("heading", { level: 1, name: "About me" }),
    ).toBeInTheDocument();
  });

  it("merges extra class names", () => {
    render(
      <PageHeadingComponent className="mt-4">Articles</PageHeadingComponent>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Articles" }),
    ).toHaveClass("mt-4");
  });
});
