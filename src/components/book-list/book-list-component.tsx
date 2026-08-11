import { formatBookAuthors, selectBookLink } from "@/lib/books";
import type { Book } from "@/lib/content";
import { cn } from "@/lib/utils";

export type BookListComponentProps = {
  books: Book[];
  className?: string;
};

export function BookListComponent({
  books,
  className,
}: BookListComponentProps) {
  if (books.length === 0) return null;

  return (
    <ul
      className={cn(
        "list-disc space-y-2 pl-6 text-lg leading-relaxed text-body marker:text-muted-foreground",
        className,
      )}
    >
      {books.map((book) => {
        const link = selectBookLink(book);
        const title = link ? (
          <a
            href={link.url}
            rel={link.affiliate ? "sponsored" : undefined}
            className="text-link underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            {book.title}
          </a>
        ) : (
          book.title
        );

        return (
          <li key={`${book.title}-${book.authors.join("-")}`}>
            <span className="font-medium text-ink">{title}</span>{" "}
            <span className="text-muted-foreground">
              by {formatBookAuthors(book.authors)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}