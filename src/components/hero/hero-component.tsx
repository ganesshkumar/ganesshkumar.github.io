import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type HeroCta = { label: string; href: string };

export type HeroComponentProps = {
  title: string;
  description: string;
  eyebrow?: string;
  currentFocus?: string[];
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
};

export function HeroComponent({
  title,
  description,
  eyebrow,
  currentFocus,
  primaryCta,
  secondaryCta,
}: HeroComponentProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      {eyebrow ? (
        <p className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}

      <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>

      <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-body">
        {description}
      </p>

      {currentFocus && currentFocus.length > 0 ? (
        <div className="mt-6">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
            Currently
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {currentFocus.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border px-3 py-1 text-sm text-body"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href={primaryCta.href}
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          {primaryCta.label}
        </Link>
        {secondaryCta ? (
          <Link
            href={secondaryCta.href}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
