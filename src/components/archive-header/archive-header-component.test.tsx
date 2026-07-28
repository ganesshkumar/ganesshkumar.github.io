import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArchiveHeaderComponent } from "./archive-header-component";

describe("ArchiveHeaderComponent", () => {
  it("renders the title as a level-1 heading", () => {
    render(<ArchiveHeaderComponent title="Articles" />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Articles/ }),
    ).toBeInTheDocument();
  });

  it("renders the count when provided", () => {
    render(<ArchiveHeaderComponent title="Articles" count={53} />);
    expect(screen.getByText("(53)")).toBeInTheDocument();
  });

  it("omits the count when not provided", () => {
    render(<ArchiveHeaderComponent title="Articles" />);
    expect(screen.queryByText(/^\(\d+\)$/)).not.toBeInTheDocument();
  });

  it("renders intro content", () => {
    render(
      <ArchiveHeaderComponent title="Articles">
        <p>Intro copy here.</p>
      </ArchiveHeaderComponent>,
    );
    expect(screen.getByText("Intro copy here.")).toBeInTheDocument();
  });
});
