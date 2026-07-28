import type { Metadata } from "next";
import { ArchiveHeaderComponent } from "@/components/archive-header";
import { ArticleArchiveComponent } from "@/components/article-archive";
import { getAllArticles, groupArticlesByYear } from "@/lib/articles";
import { buildSocialMetadata } from "@/lib/seo";

const description =
  "Practical notes on full-stack development, distributed systems, developer tooling and whatever else I had to figure out. Every article I have published, by year.";

export const metadata: Metadata = {
  title: "Articles",
  description,
  alternates: { canonical: "/articles" },
  ...buildSocialMetadata({ title: "Articles", description, path: "/articles" }),
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const groups = groupArticlesByYear(articles);

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <ArchiveHeaderComponent title="Articles" count={articles.length}>
          <p>
            I write about what I build, break and debug: full-stack
            development, distributed systems, developer tooling and whatever
            else I had to figure out along the way. Here is everything I have
            published to date.
          </p>
        </ArchiveHeaderComponent>

        <ArticleArchiveComponent groups={groups} className="mt-12" />
      </div>
    </main>
  );
}
