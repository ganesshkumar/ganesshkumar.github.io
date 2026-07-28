import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TagListComponent } from "./tag-list-component";

describe("TagListComponent", () => {
  it("renders each tag as a link to its tag page", () => {
    render(<TagListComponent tags={["docker", "azure"]} />);
    expect(screen.getByRole("link", { name: "docker" })).toHaveAttribute(
      "href",
      "/tags/docker",
    );
    expect(screen.getByRole("link", { name: "azure" })).toHaveAttribute(
      "href",
      "/tags/azure",
    );
  });

  it("limits tags with max and shows an overflow count", () => {
    render(<TagListComponent tags={["a", "b", "c", "d"]} max={2} />);
    expect(screen.getByRole("link", { name: "a" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "b" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "c" })).not.toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("exposes an accessible list label", () => {
    render(<TagListComponent tags={["docker"]} label="Article tags" />);
    expect(
      screen.getByRole("list", { name: "Article tags" }),
    ).toBeInTheDocument();
  });

  it("renders nothing when there are no tags", () => {
    const { container } = render(<TagListComponent tags={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
