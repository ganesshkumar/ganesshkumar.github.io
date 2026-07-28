import Link from "next/link";
import { cn } from "@/lib/utils";
import { articleHref, type ArticleSummary } from "@/lib/content";
import { formatDate } from "@/lib/format";

export type ArticleRowComponentProps = {
  article: ArticleSummary;
  className?: string;
};

/**
 * A single scannable article line: date plus title link. Shared primitive for
 * the home recent list and the articles archive so the two never diverge.
 */
export function ArticleRowComponent({
  article,
  className,
}: ArticleRowComponentProps) {
  return (
    <Link
      href={articleHref(article.slug)}
      className={cn(
        "group flex flex-col gap-0.5 py-3 no-underline sm:flex-row sm:items-baseline sm:gap-4",
        className,
      )}
    >
      <time
        dateTime={article.pubDate}
        className="shrink-0 font-mono text-xs text-muted-foreground sm:w-28"
      >
        {formatDate(article.pubDate)}
      </time>
      <span className="text-body transition-colors group-hover:text-brand">
        {article.title}
      </span>
    </Link>
  );
}
