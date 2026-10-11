import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { VisualDeck } from "@/lib/content";
import { VisualDeckComponent } from "./visual-deck-component";

const deck: VisualDeck = {
  title: "System maps",
  cards: [
    {
      id: "first",
      title: "First card",
      image: { src: "/first.webp", alt: "First diagram" },
    },
    {
      id: "second",
      title: "Second card",
      image: { src: "/second.webp", alt: "Second diagram" },
    },
  ],
};

describe("VisualDeckComponent", () => {
  it("renders one card without carousel controls", () => {
    render(
      <VisualDeckComponent deck={{ ...deck, cards: [deck.cards[0]] }} />,
    );
    expect(screen.getByAltText("First diagram")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Show next visual note" }),
    ).toBeNull();
  });

  it("moves between cards without looping", async () => {
    const user = userEvent.setup();
    render(<VisualDeckComponent deck={deck} />);

    const next = screen.getByRole("button", {
      name: "Show next visual note",
    });
    await user.click(next);

    expect(screen.getByAltText("Second diagram")).toBeInTheDocument();
    expect(screen.getByText("Card 2 of 2")).toBeInTheDocument();
    expect(next).toBeDisabled();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<VisualDeckComponent deck={deck} />);

    const region = screen.getByRole("region", { name: "System maps" });
    region.focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByAltText("Second diagram")).toBeInTheDocument();
  });
});
