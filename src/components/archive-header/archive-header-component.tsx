import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PageHeadingComponent } from "@/components/page-heading";

export type ArchiveHeaderComponentProps = {
  title: string;
  count?: number;
  children?: ReactNode;
  className?: string;
};

/**
 * Generic archive header: a page title with an optional item count and a short
 * intro. Reused across archive surfaces (articles today, bookshelf or
 * papershelf later), so it stays content-agnostic.
 */
export function ArchiveHeaderComponent({
  title,
  count,
  children,
  className,
}: ArchiveHeaderComponentProps) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <PageHeadingComponent>
        {title}
        {typeof count === "number" ? (
          <span className="ml-4 align-baseline font-heading text-3xl font-normal text-ink sm:text-4xl">
            ({count})
          </span>
        ) : null}
      </PageHeadingComponent>
      {children ? (
        <div className="mt-4 text-lg leading-relaxed text-body [&_a]:font-medium">
          {children}
        </div>
      ) : null}
    </header>
  );
}
