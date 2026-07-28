import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type SectionHeaderAction = { label: string; href: string };

export type SectionHeaderComponentProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  action?: SectionHeaderAction;
  headingLevel?: 2 | 3;
  headingId?: string;
  className?: string;
};

export function SectionHeaderComponent({
  title,
  eyebrow,
  description,
  action,
  headingLevel = 2,
  headingId,
  className,
}: SectionHeaderComponentProps) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {eyebrow ? (
        <p className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <Heading
          id={headingId}
          className={cn(
            "font-heading font-bold tracking-tight text-brand",
            headingLevel === 3 ? "text-2xl" : "text-3xl",
          )}
        >
          {title}
        </Heading>
        {action ? (
          <>
            <span aria-hidden className="text-sm text-muted-foreground">
              •
            </span>
            <Link
              href={action.href}
              className="inline-flex items-center gap-1 text-sm font-medium text-link no-underline hover:underline"
            >
              {action.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </>
        ) : null}
      </div>
      {description ? (
        <p className="max-w-[60ch] text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
