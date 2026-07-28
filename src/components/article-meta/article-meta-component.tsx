import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";

export type ArticleMetaComponentProps = {
  author: string;
  pubDate: string;
  updatedDate?: string;
  readingTimeMinutes: number;
  tags: string[];
  className?: string;
};

/**
 * The byline row shown directly under the article hero: author, publish (and
 * optional update) date, reading time and the tag set. Tags render as plain
 * badges rather than links until dedicated tag pages exist.
 */
export function ArticleMetaComponent({
  author,
  pubDate,
  updatedDate,
  readingTimeMinutes,
  tags,
  className,
}: ArticleMetaComponentProps) {
  const published = formatDate(pubDate);
  const updated = updatedDate ? formatDate(updatedDate) : "";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
        <span>
          By <span className="font-medium text-body">{author}</span>
        </span>
        {published ? (
          <>
            <span aria-hidden>·</span>
            <time dateTime={pubDate}>{published}</time>
          </>
        ) : null}
        {updated && updated !== published ? (
          <>
            <span aria-hidden>·</span>
            <span>
              Updated <time dateTime={updatedDate}>{updated}</time>
            </span>
          </>
        ) : null}
        <span aria-hidden>·</span>
        <span>{readingTimeMinutes} min read</span>
      </div>

      {tags.length > 0 ? (
        <ul aria-label="Tags" className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <span className={badgeVariants({ variant: "outline" })}>
                {tag}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
