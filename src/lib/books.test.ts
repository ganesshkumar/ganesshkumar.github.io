import { describe, expect, it } from "vitest";
import { getBooks, selectBookLink } from "./books";

describe("getBooks", () => {
  it("returns the curated books in source order", () => {
    expect(getBooks()).toEqual([
      {
        title: "Zero to One",
        authors: ["Peter Thiel", "Blake Masters"],
      },
      {
        title: "Atomic Habits",
        authors: ["James Clear"],
      },
      {
        title: "Designing Data-Intensive Applications",
        authors: ["Martin Kleppmann"],
      },
    ]);
  });
});

describe("selectBookLink", () => {
  it("selects the link with the lowest priority number", () => {
    expect(
      selectBookLink({
        title: "A Book",
        authors: ["An Author"],
        links: [
          { url: "https://example.com/second", priority: 20 },
          { url: "https://example.com/first", priority: 10 },
        ],
      }),
    ).toEqual({ url: "https://example.com/first", priority: 10 });
  });

  it("returns undefined when a book has no links", () => {
    expect(selectBookLink({ title: "A Book", authors: ["An Author"] })).toBe(
      undefined,
    );
  });
});