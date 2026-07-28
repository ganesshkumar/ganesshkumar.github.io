import type { ReactNode } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeadingComponent } from "@/components/page-heading";
import { SOCIAL_ICONS } from "@/lib/social-icons";
import type { NavLink } from "@/lib/navigation";

export type IntroComponentProps = {
  title: string;
  tagline?: string;
  socials: NavLink[];
  children: ReactNode;
  className?: string;
};

export function IntroComponent({
  title,
  tagline,
  socials,
  children,
  className,
}: IntroComponentProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12",
        className,
      )}
    >
      <div className="max-w-3xl">
        <PageHeadingComponent>{title}</PageHeadingComponent>
        {tagline ? (
          <p className="mt-3 font-heading text-lg font-bold text-brand">
            {tagline}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-body [&_a]:font-medium">
          {children}
        </div>

        {socials.length > 0 ? (
          <ul className="mt-6 -ml-2.5 flex flex-wrap items-center gap-1">
            {socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.label] ?? Mail;
              return (
                <li key={social.href}>
                  <Link
                    href={social.href}
                    {...(social.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    aria-label={social.label}
                    className="inline-flex size-9 items-center justify-center rounded-md text-body transition-colors hover:text-brand"
                  >
                    <Icon className="size-4" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
