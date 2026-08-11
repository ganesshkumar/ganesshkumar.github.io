import books from "@/content/books.json";
import type { Book, BookLink } from "@/lib/content";

export function getBooks(): Book[] {
  return books;
}

export function selectBookLink(book: Book): BookLink | undefined {
  return book.links?.toSorted(
    (first, second) =>
      (first.priority ?? Number.MAX_SAFE_INTEGER) -
      (second.priority ?? Number.MAX_SAFE_INTEGER),
  )[0];
}

export function formatBookAuthors(authors: string[]): string {
  return authors.join(", ");
}