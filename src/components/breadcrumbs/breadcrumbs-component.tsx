import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbsComponentProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/**
 * A generic breadcrumb trail. The last item is treated as the current page
 * (never a link, marked with `aria-current`). Pair with BreadcrumbList
 * structured data on the page for search-result breadcrumbs.
 */
export function BreadcrumbsComponent({
  items,
  className,
}: BreadcrumbsComponentProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="no-underline transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(isLast && "text-body")}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRight className="size-3.5 shrink-0" aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
