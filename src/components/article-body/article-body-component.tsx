import { cn } from "@/lib/utils";

export type ArticleBodyComponentProps = {
  html: string;
  className?: string;
};

/**
 * Renders the article body HTML produced by the build-time markdown pipeline.
 * The `article-prose` class (in globals.css) styles the rendered elements to
 * the editorial design system. The HTML is first-party content rendered at
 * build time, so injecting it here is safe.
 */
export function ArticleBodyComponent({
  html,
  className,
}: ArticleBodyComponentProps) {
  return (
    <div
      className={cn("article-prose", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
