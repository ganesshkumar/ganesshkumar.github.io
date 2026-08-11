import type { Metadata } from "next";
import { ArchiveHeaderComponent } from "@/components/archive-header";
import { BookListComponent } from "@/components/book-list";
import { getBooks } from "@/lib/books";
import { buildSocialMetadata } from "@/lib/seo";

const description =
  "Books I have read and liked, collected in one compact reading list.";

export const metadata: Metadata = {
  title: "Bookshelf",
  description,
  alternates: { canonical: "/bookshelf" },
  ...buildSocialMetadata({
    title: "Bookshelf",
    description,
    path: "/bookshelf",
  }),
};

export default function BookshelfPage() {
  const books = getBooks();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <ArchiveHeaderComponent title="Bookshelf" count={books.length}>
          <p>
            These are books I have read and liked. This is a compact list for
            now, and I will add notes when I have something useful to say about
            a book.
          </p>
        </ArchiveHeaderComponent>

        <BookListComponent books={books} className="mt-8 max-w-3xl" />
      </div>
    </main>
  );
}