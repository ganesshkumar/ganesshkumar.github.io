import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type ReadingCtaAction = { label: string; href: string };

export type ReadingCtaComponentProps = {
  title: string;
  description: string;
  primaryCta: ReadingCtaAction;
  secondaryCta?: ReadingCtaAction;
  headingLevel?: 2 | 3;
  className?: string;
};

export function ReadingCtaComponent({
  title,
  description,
  primaryCta,
  secondaryCta,
  headingLevel = 2,
  className,
}: ReadingCtaComponentProps) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-surface px-6 py-8 sm:px-10",
        className,
      )}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-4">
        <Heading className="font-heading text-2xl font-bold tracking-tight text-ink">
          {title}
        </Heading>
        <p className="max-w-[60ch] text-base leading-relaxed text-body">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href={primaryCta.href}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            {primaryCta.label}
          </Link>
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
