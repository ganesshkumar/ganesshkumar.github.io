import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { TagListComponent } from "@/components/tag-list";
import { articleHref, type ArticleSummary } from "@/lib/content";
import { formatDate } from "@/lib/format";

export type ArticleCardComponentProps = {
  article: ArticleSummary;
  headingLevel?: 2 | 3;
  className?: string;
};

export function ArticleCardComponent({
  article,
  headingLevel = 3,
  className,
}: ArticleCardComponentProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = articleHref(article.slug);
  const published = formatDate(article.pubDate);

  return (
    <Card
      className={cn(
        "flex flex-col gap-3 p-6 transition-colors hover:border-brand/40",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
        {published ? <time dateTime={article.pubDate}>{published}</time> : null}
        {article.readingTimeMinutes ? (
          <>
            <span aria-hidden>·</span>
            <span>{article.readingTimeMinutes} min read</span>
          </>
        ) : null}
      </div>

      <Heading className="font-heading text-lg font-bold leading-snug text-ink">
        <Link href={href} className="no-underline hover:text-brand">
          {article.title}
        </Link>
      </Heading>

      <p className="text-sm leading-relaxed text-body">{article.description}</p>

      {article.tags.length > 0 ? (
        <TagListComponent
          tags={article.tags}
          max={3}
          label="Article tags"
          className="mt-1"
        />
      ) : null}
    </Card>
  );
}
