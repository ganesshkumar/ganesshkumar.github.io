import Link from "next/link";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";
import { tagHref } from "@/lib/content";

export type TagListComponentProps = {
  tags: string[];
  max?: number;
  getHref?: (tag: string) => string;
  label?: string;
  className?: string;
};

export function TagListComponent({
  tags,
  max,
  getHref = tagHref,
  label = "Tags",
  className,
}: TagListComponentProps) {
  if (tags.length === 0) return null;

  const visible = typeof max === "number" ? tags.slice(0, max) : tags;
  const remaining = tags.length - visible.length;

  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {visible.map((tag) => (
        <li key={tag}>
          <Link
            href={getHref(tag)}
            className={cn(badgeVariants({ variant: "outline" }))}
          >
            {tag}
          </Link>
        </li>
      ))}
      {remaining > 0 ? (
        <li>
          <span className={cn(badgeVariants({ variant: "default" }))}>
            +{remaining}
          </span>
        </li>
      ) : null}
    </ul>
  );
}
