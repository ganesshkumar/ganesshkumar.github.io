import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProofStripComponent } from "./proof-strip-component";

const items = [
  { value: "50+", label: "Articles" },
  { value: "8 yrs", label: "Writing" },
];

describe("ProofStripComponent", () => {
  it("renders each proof value and label", () => {
    render(<ProofStripComponent items={items} />);
    expect(screen.getByText("50+")).toBeInTheDocument();
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("8 yrs")).toBeInTheDocument();
    expect(screen.getByText("Writing")).toBeInTheDocument();
  });

  it("exposes an accessible region label", () => {
    render(<ProofStripComponent items={items} label="Proof" />);
    expect(screen.getByRole("region", { name: "Proof" })).toBeInTheDocument();
  });

  it("renders nothing when empty", () => {
    const { container } = render(<ProofStripComponent items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
