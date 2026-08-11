import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BookListComponent } from "./book-list-component";

describe("BookListComponent", () => {
  it("renders an unlinked title and its author", () => {
    render(
      <BookListComponent
        books={[{ title: "A Book", authors: ["An Author"] }]}
      />,
    );

    expect(screen.getByText("A Book")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "A Book" })).not.toBeInTheDocument();
    expect(screen.getByText("by An Author")).toBeInTheDocument();
  });

  it("links a title and discloses an affiliate relationship to user agents", () => {
    render(
      <BookListComponent
        books={[
          {
            title: "A Book",
            authors: ["An Author"],
            links: [
              {
                url: "https://example.com/book",
                affiliate: true,
                priority: 10,
              },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "A Book" })).toHaveAttribute(
      "href",
      "https://example.com/book",
    );
    expect(screen.getByRole("link", { name: "A Book" })).toHaveAttribute(
      "rel",
      "sponsored",
    );
  });

  it("formats multiple authors as a readable list", () => {
    render(
      <BookListComponent
        books={[
          {
            title: "A Book",
            authors: ["First Author", "Second Author"],
          },
        ]}
      />,
    );

    expect(
      screen.getByText("by First Author, Second Author"),
    ).toBeInTheDocument();
  });
});